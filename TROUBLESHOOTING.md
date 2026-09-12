# Troubleshooting — note tecniche

Appunti sui problemi già incontrati in questo progetto e su come risolverli.
**Non rimuovere questo file**: serve a evitare di perdere ore sugli stessi errori.

Ultimo aggiornamento: 2026-09-12

---

## ⚠️ Regole d'oro (leggere prima di toccare le dipendenze)

1. **Non lanciare mai `npm install react@19.2.8`** così com'è: npm scriverebbe `"^19.2.8"` in `package.json`
   e al successivo `npm install` tornerebbe a React **19.3.0**, rompendo il progetto.
   Usa `npm pkg set` (mantiene il `~`) oppure `npm install -E react@19.2.8`.
2. **Non lanciare `npm install react@latest`** né `npm update react react-dom`.
3. **Non usare `--legacy-peer-deps`** per aggirare il problema: nasconde il conflitto invece di risolverlo
   e va poi ricordato ad ogni install futuro.
4. Prima di aggiungere una libreria nuova, controlla che supporti React 19.2.x (vedi sezione 5).
5. Dopo ogni modifica alle dipendenze, verifica con `npm run build` (vedi sezione 6).

---

## 1. `npm install` fallisce con `ERESOLVE` — React 19.3 vs `@react-three/fiber`

### Sintomo

```text
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error While resolving: personal-portfolio@0.0.0
npm error Found: react@19.3.0
npm error Could not resolve dependency:
npm error peer react@">=19 <19.3" from @react-three/fiber@9.7.0
```

### Causa

`@react-three/fiber@9.7.0` (attualmente la versione `latest`) dichiara come peer dependency:

```json
"react": ">=19 <19.3",
"react-dom": ">=19 <19.3"
```

Il range `>=19 <19.3` **esclude la 19.3**.

Il progetto aveva `"react": "^19.2.8"`, che però **accetta anche le 19.3.x**:
npm installava quindi React `19.3.0`, fuori dal range consentito → conflitto e install annullato.

> **Nota:** nell'errore compaiono `expo`, `expo-gl`, `react-native`, `@expo/metro-runtime`…
> **Sono falsi allarmi.** Sono *peer opzionali* che `@react-three/fiber` dichiara per il supporto
> React Native. npm li elenca nel report del conflitto anche se non sono installati e non servono
> a questo progetto (che è web/Vite).

### Soluzione attualmente applicata

React è stato **fissato a 19.2.x** in `package.json`:

| Pacchetto | Versione in `package.json` | Motivo |
|---|---|---|
| `react` | `~19.2.8` | `~` impedisce di superare la 19.2.x (max `19.2.8`) |
| `react-dom` | `~19.2.8` | deve restare allineato a `react` |
| `@types/react` | `~19.2.18` | allineato ai tipi di React 19.2 |
| `@types/react-dom` | `~19.2.7` | allineato ai tipi di React 19.2 |
| `@react-three/fiber` | `^9.7.0` | richiede React `<19.3` |
| `@react-three/drei` | `^10.7.8` | richiede React `^19` |
| `three` | `^0.186.0` | richiede `three >=0.156` |
| `@types/three` | `^0.186.0` | three.js **non** include i tipi: servono |

Il `~` è la parte importante: **tiene la 19.2.x anche dopo un futuro `npm install`**.

### Verifica che sia tutto a posto

```powershell
npm ls react react-dom three @react-three/fiber @react-three/drei --depth=0
```

Atteso:

```text
├── @react-three/drei@10.7.8
├── @react-three/fiber@9.7.0
├── react-dom@19.2.8
├── react@19.2.8
└── three@0.186.0
```

### Quando si potrà togliere il pin

Quando `@react-three/fiber` supporterà React 19.3 in una versione **stabile**.
Al 2026-09-12 la `latest` è `9.7.0` (`<19.3`); esiste solo `10.0.0-alpha.5`, che è una **alpha**
e non va usata in un portfolio.

Per controllare se è arrivato il momento:

```powershell
npm view "@react-three/fiber" dist-tags --json
npm view "@react-three/fiber@latest" peerDependencies.react
```

Se il range diventa `>=19 <20` o simile, si può riportare `react` / `react-dom` a `"^19"`.

---

## 2. `npx shadcn@latest init` → "Could not load the workspace config"

### Sintomo

```text
Could not load the workspace config in C:\...\personal-portfolio.
Add components.json to this workspace and configure its path aliases or package imports, then try again.
```

### Causa

La CLI di shadcn legge il **`tsconfig.json` nella root** per risolvere gli alias dichiarati in
`components.json` (`@/components`, `@/lib/utils`, …).
In questo progetto `tsconfig.json` è di tipo *solution-style* (`"files": []` + `references`)
e **non aveva nessun `compilerOptions`** → la CLI non trovava gli alias e si fermava.

Aggiungere i `paths` solo in `tsconfig.app.json` **non basta**: la CLI guarda la root.

### Soluzione applicata

Gli alias sono dichiarati in **entrambi** i file:

`tsconfig.json` (root)

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

`tsconfig.app.json` → stesso blocco `paths` dentro `compilerOptions`.

`vite.config.ts` (alias a runtime, per il bundler):

```ts
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
},
```

### ⚠️ Non aggiungere `"baseUrl"`

TypeScript 6 l'ha **deprecato** e `npx tsc -b` fallisce con:

```text
error TS5101: Option 'baseUrl' is deprecated and will stop functioning in TypeScript 7.0.
```

Con TypeScript ≥ 4.1 i `paths` funzionano **senza** `baseUrl` (i percorsi sono risolti
relativamente al file `tsconfig.json`). **Lascia solo `paths`.**

### Verifica

```powershell
npx shadcn@latest info
```

Deve stampare la sezione `Resolved Paths` con tutti i percorsi risolti dentro `src\`
(`utils`, `components`, `lib`, `hooks`, `ui`). `info` è **non distruttivo**: non installa nulla.

---

## 3. Vite: `__dirname` non supportato dal config loader nativo

### Sintomo

```text
(!) Your Vite config uses features that are unsupported by `configLoader: 'native'`,
which is planned to become the default in a future major version of Vite:
  - `__dirname` (vite.config.ts:10:25). Use `import.meta.dirname` instead
Set `VITE_CONFIG_NATIVE_IGNORE_WARNING=true` to suppress this warning.
```

### Causa

Vite sta passando a un *config loader* nativo (senza transpilazione), che non supporta le
variabili CommonJS come `__dirname` / `__filename`. Il progetto usa `"type": "module"`,
quindi i file `.ts` sono moduli ESM e devono usare gli equivalenti ESM.

### Soluzione applicata

In `vite.config.ts` `__dirname` è stato sostituito con `import.meta.dirname`:

```ts
resolve: {
  alias: {
    "@": path.resolve(import.meta.dirname, "./src"),
  },
},
```

> `import.meta.dirname` richiede Node **≥ 20.11**. Non va importato: è una proprietà
> built-in di `import.meta`.

### Alternative

- Usare `import.meta.url` + `fileURLToPath` (compatibile anche con Node più vecchi):
  ```ts
  import path from "node:path"
  import { fileURLToPath } from "node:url"

  const dirname = path.dirname(fileURLToPath(import.meta.url))
  ```
- **Non** sopprimere l'avviso con `VITE_CONFIG_NATIVE_IGNORE_WARNING=true`: rimanda solo il
  problema alla prossima major di Vite.

### Verifica

```powershell
npm run build
```

L'avviso non deve più comparire e la build deve concludersi con `✓ built in ...`.

---

## 4. Recupero dopo aver cancellato `node_modules`

Se hai rimosso `node_modules` (o `node_modules` + `package-lock.json`) e ti serve rifare tutto:

```powershell
# 1. Rimuovi i resti (solo se necessario)
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# 2. Reinstalla rispettando i pin di package.json
npm install

# 3. Verifica che React sia rimasto a 19.2.8
npm ls react react-dom --depth=0

# 4. Verifica che la build regga
npm run build
```

### Preferisci `npm install` a `npm ci`

`npm ci` cancella `node_modules` e installa **rigorosamente** dal `package-lock.json`.
Va bene **solo se** `package.json` e lock file sono perfettamente sincronizzati; se sono
disallineati (cosa frequente mentre si prova a sistemare le dipendenze) fallisce e ti
costringe a rigenerare il lock.

> Se il lock file è corrotto o disallineato, cancellare `package-lock.json` + `node_modules`
> e rilanciare `npm install` è la via più rapida. Il pin `~19.2.8` in `package.json`
> **garantisce** che npm non risalga alla 19.3.

---

## 5. Checklist prima di aggiungere una dipendenza nuova

```powershell
# Il pacchetto supporta React 19.2.x?
npm view <pacchetto> peerDependencies --json
```

Controlla che il range di `react` includa `19.2.8` (es. `^19`, `>=19 <19.3`, `^17 || ^18 || ^19`).

Altri controlli utili:

```powershell
npm view <pacchetto> version                          # versione latest
npm view "@react-three/fiber" peerDependencies --json # esempio su un pacchetto specifico
```

### Dry-run: prova l'install senza modificare nulla

Prima di installare qualcosa di "rischioso" puoi simulare e vedere se ci sono conflitti
**senza scrivere su disco**:

```powershell
npm install <pacchetto> --dry-run
```

---

## 6. Comandi di verifica rapida

| Comando | Cosa fa |
|---|---|
| `npm run dev` | avvia il server di sviluppo Vite |
| `npm run build` | `tsc -b && vite build` — type-check + build di produzione |
| `npm run lint` | `oxlint` |
| `npx tsc -b` | solo il type-check (più veloce della build completa) |
| `npx shadcn@latest info` | verifica config shadcn + alias (non distruttivo) |
| `npm ls react react-dom --depth=0` | controlla le versioni di React |
| `npm outdated` | mostra i pacchetti aggiornabili (**attenzione a `react`**) |

### Prima di un commit / deploy

```powershell
npx tsc -b
npm run lint
npm run build
```

---

## 7. Riepilogo errori e fix

| Errore | Causa | Fix |
|---|---|---|
| `ERESOLVE … peer react@">=19 <19.3"` | React 19.3.0 fuori dal range di `@react-three/fiber` | `react`/`react-dom` fissati a `~19.2.8` |
| `Could not load the workspace config` (shadcn) | `paths` assenti nel `tsconfig.json` di root | aggiunti `paths` in `tsconfig.json` **e** `tsconfig.app.json` |
| `error TS5101: Option 'baseUrl' is deprecated` | TS 6 ha deprecato `baseUrl` | rimosso `baseUrl`, tenuto solo `paths` |
| `(!) … unsupported by 'configLoader: native' … __dirname` | Vite passa al config loader nativo, che non supporta le variabili CJS | `__dirname` → `import.meta.dirname` in `vite.config.ts` |
| `@types/three` installato ma `three` no | il primo `npm install` era fallito per ERESOLVE | rilanciato `npm install three @react-three/fiber @react-three/drei` |

---

## 8. Falsi allarmi — consigli da NON seguire

Consigli trovati in giro (tutorial vecchi, risposte generate) che **sembrano sensati ma rompono il progetto**.
Verificare sempre prima di applicarli.

### ❌ "Rimuovi `cn` e installa `clsx` + `tailwind-merge`"

**Falso.** `cn` **è** il pacchetto ufficiale di shadcn, non un pacchetto omonimo a caso.

Prove:

```powershell
npm view cn repository.url description
```

```text
"git+https://github.com/shadcn-ui/cn.git"
"Fast, small, compiled class-name merging for Tailwind CSS. Drop-in replacement for clsx + tailwind-merge."
```

- Il repo è `github.com/shadcn-ui/cn`, **organizzazione ufficiale di shadcn**, owner `@shadcn`.
- Documentazione ufficiale: *"`cn` is a new engine for Tailwind class merging and conflict resolution.
  It **replaces `tailwind-merge` and `clsx`**. Same APIs. Full parity. And it is 30× faster."*
- Ha **zero dipendenze** e parità completa di output con `tailwind-merge` (verificata con test differenziali).
- La CLI di shadcn ha una migrazione nella **direzione opposta**:
  `npx shadcn@latest migrate cn` serve a passare **da** `clsx` + `tailwind-merge` **a** `cn`.

Cosa ha generato `npx shadcn@latest init` in questo progetto:

`src/lib/utils.ts`

```ts
export { cn } from "cn"
```

`src/components/ui/button.tsx`

```ts
import { cn } from "cn"
```

I componenti generati importano da `"cn"` **direttamente**: rimuovere il pacchetto
**romperebbe subito** la build.

> `clsx@2.1.1` presente in `node_modules` è solo una dipendenza **transitiva** di
> `class-variance-authority`, non una dipendenza diretta del progetto.

**Conclusione: lasciare `cn`.** È la soluzione più veloce, più piccola e quella attualmente
raccomandata da shadcn.

<details>
<summary>Se davvero si volesse tornare alla configurazione classica (sconsigliato)</summary>

```powershell
npm uninstall cn
npm install clsx tailwind-merge
```

`src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

E **in ogni componente generato** cambiare `import { cn } from "cn"` in
`import { cn } from "@/lib/utils"`, altrimenti la build fallisce.
</details>

---

## 9. Base UI: avviso `nativeButton` quando un bottone è un link

### Sintomo

```text
Base UI: A component that acts as a button expected a native <button> because
the `nativeButton` prop is true. Rendering a non-<button> removes native button
semantics, which can impact forms and accessibility. Use a real <button> in the
`render` prop, or set `nativeButton` to `false`.
    at Button (button.tsx:49:5)
    at Hero (Hero.tsx:107:13)
```

### Causa

I componenti shadcn di questo progetto usano lo stile **base-nova**, costruito su
**Base UI** e non su Radix.

Base UI imposta `nativeButton` a `true` di default. Se passi `render={<a />}`,
l'elemento non è più un `<button>`: perde le semantiche native (invio form,
attivazione da tastiera, ruolo per gli screen reader) e Base UI avvisa in console.

### Soluzione

Usa il wrapper **`src/components/ButtonLink.tsx`**, che imposta
`nativeButton={false}` e gestisce anche i link esterni (`target` + `rel`):

```tsx
import { ButtonLink } from "@/components/ButtonLink"

<ButtonLink href="#projects">Guarda i progetti</ButtonLink>
<ButtonLink href="https://github.com/..." external>Repository</ButtonLink>
```

Se ti serve un altro tipo di elemento (non un link), passa `nativeButton={false}`
a mano:

```tsx
<Button nativeButton={false} render={<span />}>…</Button>
```

### ❌ Da non fare

```tsx
// Avviso in console a ogni render
<Button render={<a href="#projects" />}>Guarda i progetti</Button>
```

### ⚠️ Non "risolvere" con `asChild`

```tsx
<Button asChild>…</Button>
```

`asChild` **non esiste** in Base UI: è l'API di Radix. La sostituta è la prop
`render`. Lo stesso vale per Dialog, Sheet, Menu e tutti gli altri componenti
`ui/` di questo progetto.

### Regola generale

Ogni volta che passi `render` a un componente Base UI, chiediti se l'elemento
finale ha ancora il ruolo semantico atteso. Se no, dichiaralo con
`nativeButton={false}`.

