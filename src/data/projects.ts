import type { Accent } from "@/lib/accents"

export type Project = {
  slug: string
  title: string
  description: string
  /** Anno di realizzazione, mostrato come etichetta. */
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
 * Progetti del portfolio.
 * ⚠️ PLACEHOLDER: titoli e descrizioni sono inventati. Non essendoci immagini,
 * la card mostra un gradiente brand basato su `accent`.
 */
export const projects: Project[] = [
  {
    slug: "aurora-design-system",
    title: "Aurora Design System",
    description:
      "Design system a tema scuro con 60+ componenti accessibili, token di colore in OKLCH e documentazione Storybook. Adottato da tre team di prodotto.",
    year: "2026",
    role: "Lead frontend",
    tags: ["React", "TypeScript", "Design tokens", "Storybook"],
    href: "https://example.com",
    repo: "https://github.com/giacomo",
    featured: true,
    accent: "primary",
  },
  {
    slug: "atlante-data-viz",
    title: "Atlante",
    description:
      "Dashboard di data visualization per dati geografici: 50.000 punti renderizzati a 60 fps grazie a canvas e Web Workers.",
    year: "2025",
    role: "Frontend developer",
    tags: ["Three.js", "WebGL", "Canvas", "Web Workers"],
    href: "https://example.com",
    featured: true,
    accent: "secondary",
  },
  {
    slug: "metrica-storefront",
    title: "Metrica Storefront",
    description:
      "E-commerce headless con checkout in tre passaggi. LCP sceso da 4,1 s a 1,2 s e conversione +23%.",
    year: "2025",
    role: "Frontend developer",
    tags: ["Next.js", "Performance", "Stripe"],
    repo: "https://github.com/giacomo",
    accent: "tertiary",
  },
  {
    slug: "vega-portfolio-engine",
    title: "Vega",
    description:
      "Generatore di portfolio statici: si scrive un file di configurazione, lui produce un sito ottimizzato e accessibile.",
    year: "2024",
    role: "Side project",
    tags: ["Vite", "Node", "CLI", "Open source"],
    repo: "https://github.com/giacomo",
    accent: "primary",
  },
  {
    slug: "kanso-ui",
    title: "Kanso UI",
    description:
      "Libreria di componenti minimal ispirata a iOS: vetro smerigliato, gesture e transizioni fluide. 1.200 stelle su GitHub.",
    year: "2024",
    role: "Autore",
    tags: ["React", "Glassmorphism", "Animazioni"],
    href: "https://example.com",
    repo: "https://github.com/giacomo",
    accent: "secondary",
  },
  {
    slug: "solaris-campaign",
    title: "Solaris",
    description:
      "Landing page per il lancio di un prodotto con scena 3D interattiva. 120.000 visite nel primo mese.",
    year: "2023",
    role: "Frontend & motion",
    tags: ["GSAP", "Three.js", "ScrollTrigger"],
    href: "https://example.com",
    accent: "tertiary",
  },
]
