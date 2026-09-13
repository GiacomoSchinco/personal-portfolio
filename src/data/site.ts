import avatarUrl from "@/assets/avatar.jpeg"

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
   * "/avatar.jpeg": quella sintassi funziona solo per i file in `public/`).
   * Così Vite la elabora e le aggiunge un hash al nome.
   *
   * ⚠️ Pesa 163 KB per essere mostrata a 56px: conviene ridimensionarla.
   */
  avatarUrl,
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
