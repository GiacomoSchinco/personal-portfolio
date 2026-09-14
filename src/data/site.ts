import avatarUrl from "@/assets/avatar.jpg"

export type NavLink = {
  label: string
  href: string
}

export type Social = {
  label: string
  handle: string
  href: string
}

/**
 * Dati globali del sito.
 *
 * Fonte: il CV in `src/data/resume.json`. Il file NON viene importato di
 * proposito: serve solo come riferimento, così i campi che non vogliamo
 * pubblicare (il telefono, la clausola privacy) restano fuori dal bundle.
 */
export const site = {
  /** Nome breve mostrato nella navbar. */
  name: "Giacomo",
  fullName: "Giacomo Schinco",
  role: "Software Developer & Product Manager", // Oppure semplicemente "Full Stack Developer"
  tagline:
    "Dall'ideazione all'architettura software. Costruisco soluzioni web complete e trasformo visioni di business in prodotti digitali concreti.",
  email: "giacomoschinco87@gmail.com",
  location: "Roma, Italia",
  /**
   * Stato di disponibilità. Compare in **due** punti del sito:
   * - il badge in cima alla Hero (`data-hero-badge`);
   * - la terza voce della lista in Contatti.
   *
   * ⚠️ Sono due di proposito. Conseguenza da tenere a mente: svuotare o
   * togliere questo campo spegne **entrambi**. E se si toglie il badge dalla
   * Hero, va tolto anche il tween `[data-hero-badge]` dal timeline GSAP in
   * `Hero.tsx`, altrimenti resta un'animazione che cerca un elemento che
   * non esiste più.
   */
  availabilityLabel: "Disponibile per nuove opportunità",
  /** ⚠️ Il file non esiste ancora: `public/` contiene solo favicon e icone. */
  cvHref: "/cv.pdf",
  /**
   * Avatar per la sezione "Chi sono".
   * L'immagine sta in `src/assets/`, quindi va IMPORTATA (non referenziata come
   * "/avatar.jpg": quella sintassi funziona solo per i file in `public/`).
   * Così Vite la elabora e le aggiunge un hash al nome.
   *
   * ⚠️ Il file è ridimensionato a 168×168 e pesa 8 KB. È mostrato a 56px,
   * quindi 168 copre anche gli schermi a 3x: non serve altro. L'originale
   * pesava 163 KB, venti volte tanto, per la stessa immagine.
   */
  avatarUrl,
}

export type PrivacyClause = {
  /** Titolo della clausola, es. "Per quanto tempo". */
  label: string
  text: string
}

export type PrivacyNotice = {
  /** Riga sempre visibile sotto il bottone di invio. */
  summary: string
  /** Etichetta del comando che apre il testo esteso. */
  openLabel: string
  clauses: PrivacyClause[]
}

/**
 * Informativa privacy del modulo contatti.
 *
 * Sta qui e non dentro `Contact.tsx` perché è testo, e in questo progetto i
 * testi vivono in `@/data` (§6.1 di AGENTS.md): il componente decide solo dove
 * mostrarla.
 *
 * Serve perché il form non spedisce i dati a un server nostro, li consegna a
 * Web3Forms — un fornitore esterno che a sua volta li conserva. Chi compila
 * deve poterlo sapere **prima** di premere Invia, e il sito è una one-page
 * senza altre pagine dove metterlo.
 *
 * ⚠️ I dati di questa informativa vengono dal documento ufficiale di Web3Forms
 * (`web3forms.com/privacy`, aggiornato 13/07/2026): ruolo di responsabile del
 * trattamento, sottoproduttori, filtri antispam e conservazione massima di tre
 * anni. Se loro cambiano fornitori o tempistiche, questa è la sezione da
 * rileggere. Non aggiungere qui dettagli "per completezza": ogni frase deve
 * corrispondere a qualcosa che il modulo fa davvero.
 *
 * ⚠️ Da confermare: la base giuridica dichiarata è l'**interesse legittimo** a
 * rispondere a chi scrive, che non richiede una casella da spuntare. Se il
 * committente preferisce il consenso esplicito, va aggiunta una checkbox
 * obbligatoria prima del bottone: oggi non c'è, ed è una scelta.
 */
export const privacyNotice: PrivacyNotice = {
  summary: "Uso nome, email e messaggio solo per risponderti: nient'altro.",
  openLabel: "Come tratto i tuoi dati",
  clauses: [
    {
      label: "Titolare",
      text: "Il titolare del trattamento è Giacomo Schinco.",
    },
    {
      label: "Quali dati",
      text: "Solo quelli che scrivi tu: nome, email e il testo del messaggio. Il sito non usa cookie né strumenti di analisi.",
    },
    {
      label: "Per cosa",
      text: "Per leggere la tua richiesta e risponderti. Nessuna newsletter, nessun profilo, nessun uso pubblicitario. La base giuridica è l'interesse legittimo a rispondere a chi mi contatta.",
    },
    {
      label: "Dove finiscono",
      text: "Il modulo non ha un server mio: i dati passano da Web3Forms, che me li consegna via email. Web3Forms tratta i dati come responsabile e si appoggia ad Amazon Web Services, Cloudflare e Hetzner; indirizzo IP ed email possono inoltre essere confrontati con i filtri antispam Akismet e CleanTalk. Parte di questa infrastruttura è fuori dall'Unione Europea, con trasferimenti coperti dalle clausole contrattuali standard.",
    },
    {
      label: "Per quanto tempo",
      text: "Il messaggio resta nella mia casella per il tempo necessario a gestire la richiesta. Web3Forms cancella i dati che ha ricevuto entro un massimo di tre anni.",
    },
    {
      label: "Cosa puoi chiedermi",
      text: "Di vedere, correggere o cancellare i tuoi dati, di limitarne l'uso o di opporti al trattamento. Se ritieni che siano stati usati male puoi rivolgerti al Garante per la protezione dei dati personali (garanteprivacy.it).",
    },
  ],
}

/** Voci della navbar e del menu mobile. Tutte in italiano. */
export const navLinks: NavLink[] = [
  { label: "Chi sono", href: "#about" },
  { label: "Competenze", href: "#skills" },
  { label: "Progetti", href: "#projects" },
  { label: "Esperienze", href: "#experience" },
  { label: "Contatti", href: "#contact" },
]

/**
 * Link social.
 * Le icone di brand (GitHub, LinkedIn) sono in `src/components/custom/BrandIcons.tsx`
 * perché lucide v1 non le include più.
 *
 * ⚠️ `handle` è solo testo da mostrare: è lo slug reale del profilo, non una
 * versione abbreviata. Non "pulirlo" in `in/giacomo-schinco` — sarebbe un
 * indirizzo che non esiste. La riga che lo contiene ha `truncate` proprio
 * perché uno slug LinkedIn può essere lungo. Stesso discorso per `@GiacomoSchinco`:
 * l'utente GitHub è case-insensitive, ma si scrive con le maiuscole reali.
 */
export const socials: Social[] = [
  {
    label: "GitHub",
    handle: "@GiacomoSchinco",
    href: "https://github.com/GiacomoSchinco",
  },
  {
    label: "LinkedIn",
    handle: "in/giacomo-schinco-08416b1ba",
    href: "https://www.linkedin.com/in/giacomo-schinco-08416b1ba",
  },
  {
    label: "Email",
    handle: "giacomoschinco87@gmail.com",
    href: "mailto:giacomoschinco87@gmail.com",
  },
]
