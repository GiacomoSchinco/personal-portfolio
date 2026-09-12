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
 * ⚠️ PLACEHOLDER: sostituisci con i tuoi dati reali.
 */
export const site = {
  /** Nome breve mostrato nella navbar. */
  name: "Giacomo",
  fullName: "Giacomo Rossi",
  role: "Frontend Developer",
  tagline:
    "Costruisco interfacce veloci, accessibili e curate nel dettaglio — dove design e codice si incontrano.",
  email: "ciao@giacomo.dev",
  location: "Milano, Italia",
  /** true mostra il pallino "disponibile" nella navbar. */
  available: true,
  availabilityLabel: "Disponibile per nuove opportunità",
  cvHref: "/cv.pdf",
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
 */
export const socials: Social[] = [
  {
    label: "GitHub",
    handle: "@giacomo",
    href: "https://github.com/giacomo",
  },
  {
    label: "LinkedIn",
    handle: "in/giacomo",
    href: "https://linkedin.com/in/giacomo",
  },
  {
    label: "Email",
    handle: "ciao@giacomo.dev",
    href: "mailto:ciao@giacomo.dev",
  },
]
