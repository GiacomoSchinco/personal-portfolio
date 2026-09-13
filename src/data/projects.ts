import type { Accent } from "@/lib/accents"

export type Project = {
  slug: string
  title: string
  description: string
  /** Periodo in cui è stato realizzato (il CV non indica l'anno del singolo progetto). */
  year: string
  role: string
  tags: string[]
  /** Se presente, la card diventa cliccabile. */
  href?: string
  repo?: string
  /** I progetti in evidenza occupano più spazio nella griglia. */
  featured?: boolean
  accent: Accent
}

/**
 * Progetti.
 *
 * I primi tre sono progetti software reali ricavati dai punti di Duskrise in
 * `src/data/resume.json`; il quarto è un prodotto fisico brevettato e non ha
 * nulla a che vedere con lo sviluppo — è qui perché racconta comunque come
 * lavoro (design, ingegnerizzazione, business).
 *
 * ⚠️ Nessun progetto ha link pubblici: sono lavori per clienti/azienda, quindi
 * le card non sono cliccabili. Se hai un case study o un repo pubblico,
 * aggiungi `href` o `repo` e la card diventa un link da sola.
 */
export const projects: Project[] = [
  {
    slug: "security-dashboard",
    title: "Security Dashboard",
    description:
      "Piattaforma in tempo reale per il monitoraggio dello stato di sicurezza, degli eventi malevoli e delle vulnerabilità aziendali.",
    year: "2021 — 2024",
    role: "Frontend Developer",
    tags: ["React", "TanStack Query", "JavaScript", "Bootstrap", "C#", "Python"],
    featured: true,
    accent: "primary",
  },
  {
    slug: "piattaforma-micro-frontend",
    title: "Piattaforma logistica micro-frontend",
    description:
      "Sviluppata da zero: architettura a micro-frontend per la gestione della logistica e del magazzino dei device aziendali.",
    year: "2021 — 2024",
    role: "Frontend Developer",
    tags: ["Single-SPA", "Angular", "Micro-frontend", "Architettura", "PrimeNG"],
    featured: true,
    accent: "tertiary",
  },
  {
    slug: "marketplace-puntocyber",
    title: "Marketplace Puntocyber",
    description:
      "Marketplace per l'erogazione di servizi di cybersecurity a protezione di dati e sistemi.",
    year: "2021 — 2024",
    role: "Frontend Developer",
    tags: ["React", "Next.js", "TanStack Query", "JavaScript", "Tailwind CSS"],
    accent: "secondary",
  },
  {
    slug: "woodencarpet",
    title: "Woodencarpet",
    description:
      "Prodotto brevettato che coniuga design, ingegnerizzazione dei materiali e sviluppo commerciale. Presentato a London Design Fair (2016) e MADE Expo Milano (2017).",
    year: "2014 — 2019",
    role: "Ideatore e titolare del brevetto",
    tags: [
      "Design di prodotto",
      "Brevetti",
      "Business development",
      "Fiere internazionali",
    ],
    accent: "primary",
  },
]
