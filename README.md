# React + TypeScript + Vite

> [!IMPORTANT]
> **Non aggiornare React.** `react` e `react-dom` sono fissati a `~19.2.8` (tilde, non caret)
> perché `@react-three/fiber@9` richiede `>=19 <19.3`. Con `^` npm installerebbe la 19.3.0
> e l'install fallirebbe con `ERESOLVE`.
>
> Vale anche per `@types/react` e `@types/react-dom`, fissati a `~19.2.18` e `~19.2.7`.
> Evita `--legacy-peer-deps` e `--force`: nascondono il problema invece di risolverlo.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
