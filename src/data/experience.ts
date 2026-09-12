export type ExperienceItem = {
  role: string
  company: string
  period: string
  location: string
  description: string
  tags: string[]
  /** true disegna l'indicatore "in corso". */
  current?: boolean
  type: "work" | "education"
}

/**
 * Timeline di esperienze lavorative e formative.
 * ⚠️ PLACEHOLDER: aziende, date e descrizioni sono inventate.
 */
export const experiences: ExperienceItem[] = [
  {
    role: "Senior Frontend Developer",
    company: "Studio Lumen",
    period: "2023 — oggi",
    location: "Milano (ibrido)",
    description:
      "Guido il frontend di tre prodotti SaaS. Ho introdotto un design system condiviso che ha ridotto del 40% il tempo di sviluppo di una nuova feature.",
    tags: ["React", "TypeScript", "Design system", "Team lead"],
    current: true,
    type: "work",
  },
  {
    role: "Frontend Developer",
    company: "Nordic Digital",
    period: "2021 — 2023",
    location: "Remote",
    description:
      "Sviluppo di interfacce per clienti enterprise nel settore energetico. Mi sono occupato di accessibilità portando due progetti a conformità WCAG 2.1 AA.",
    tags: ["Vue", "React", "Accessibilità", "SCSS"],
    type: "work",
  },
  {
    role: "Junior Frontend Developer",
    company: "Pixel Forge",
    period: "2020 — 2021",
    location: "Torino",
    description:
      "Primo ruolo professionale: template, landing page e piccoli e-commerce. Qui ho imparato a fondo HTML semantico e CSS moderno.",
    tags: ["JavaScript", "CSS", "WordPress"],
    type: "work",
  },
  {
    role: "Laurea in Informatica",
    company: "Università degli Studi di Milano",
    period: "2017 — 2020",
    location: "Milano",
    description:
      "Tesi sull'usabilità delle interfacce web per persone con disabilità visive. Voto 108/110.",
    tags: ["Algoritmi", "HCI", "Basi di dati"],
    type: "education",
  },
]
