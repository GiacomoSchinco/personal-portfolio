export type ExperienceItem = {
  role: string
  company: string
  period: string
  /** Facoltativo: il CV non indica la sede delle aziende. */
  location?: string
  description: string
  /** Punti di dettaglio dal CV. */
  highlights?: string[]
  tags: string[]
  /** true disegna l'indicatore "in corso". */
  current?: boolean
  type: "work" | "education"
  /**
   * "tech"  → sviluppo e prodotto digitale
   * "other" → percorso precedente, non tecnico
   *
   * Serve a raggruppare la timeline: le voci non tecniche restano visibili
   * (raccontano come lavoro) ma non vengono confuse con l'esperienza di
   * sviluppo.
   */
  field: "tech" | "other"
}

export type ExperienceGroup = {
  id: "tech" | "other"
  title: string
  description: string
  items: ExperienceItem[]
}

/**
 * Esperienze e formazione.
 * Fonte: sezioni `work` e `education` di `src/data/resume.json`.
 */
const allExperiences: ExperienceItem[] = [
  {
    role: "Programmatore Informatico — Full Stack Java",
    company: "Accademia Informatica",
    period: "2026",
    description:
      "Corso di qualificazione professionale (EQF 5) su architetture Full Stack, orientato allo sviluppo d'impresa e al ciclo di vita del software.",
    highlights: [
      "Backend & architettura: Java (OOP), Spring Boot, Spring MVC, API RESTful, Design Patterns, JDBC",
      "Database & data modeling: progettazione ER, normalizzazione, SQL, MySQL e Oracle",
      "Frontend & UI: Angular, JavaScript, HTML5, CSS3, UX e Universal Design",
    ],
    tags: ["Java", "Spring Boot", "SQL", "Angular"],
    type: "education",
    field: "tech",
  },
  {
    role: "Product Owner",
    company: "NODE Soc. Coop.",
    period: "2024 — 2025",
    description:
      "Gestione del backlog e coordinamento dei progetti con metodologie Agile/Scrum.",
    highlights: [
      "Gestione delle priorità di prodotto e ottimizzazione del backlog di team",
      "Punto di contatto tra stakeholder e team tecnico",
      "Monitoraggio delle iterazioni e dello stato di avanzamento della progettazione",
    ],
    tags: ["Scrum", "Jira", "Confluence", "Stakeholder Management"],
    type: "work",
    field: "tech",
  },
  {
    role: "Frontend Developer",
    company: "Duskrise",
    period: "2021 — 2024",
    description:
      "Interfacce web responsive e architetture micro-frontend per soluzioni di cybersecurity e gestione logistica.",
    highlights: [
      "Piattaforma micro-frontend da zero con Single-SPA e Angular per la logistica e il magazzino dei device",
      "Security Dashboard: monitoraggio in tempo reale di stato di sicurezza, eventi malevoli e vulnerabilità",
      "Marketplace Puntocyber: marketplace per l'erogazione di servizi di cybersecurity",
    ],
    tags: ["React", "Next.js", "Angular", "TanStack Query", "Single-SPA"],
    type: "work",
    field: "tech",
  },
  {
    role: "Front-end Developer",
    company: "EPICODE SCHOOL",
    period: "2021",
    description:
      "Percorso intensivo su sviluppo web moderno, architetture client-side e metodologie di lavoro pratiche.",
    highlights: [
      "Core web: HTML5, CSS3, JavaScript (ES6+) e manipolazione del DOM",
      "Framework e UI: React, jQuery e Bootstrap per interfacce responsive",
      "Project work settimanali con live coding guidato",
    ],
    tags: ["JavaScript", "React", "HTML5", "CSS3"],
    type: "education",
    field: "tech",
  },
  {
    role: "Titolare / Event Manager",
    company: "Loverprint",
    period: "2019 — 2021",
    description:
      "Pianificazione e organizzazione di eventi ed esperienze personalizzate.",
    highlights: [
      "Pianificazione degli aspetti logistici, operativi e delle tempistiche di ogni evento",
      "Individuazione, negoziazione e coordinamento dei fornitori",
      "Gestione diretta dell'attività: preventivi, budget e rapporto con i clienti",
    ],
    tags: ["Organizzazione", "Negoziazione", "Coordinamento"],
    type: "work",
    field: "other",
  },
  {
    role: "Responsabile Commerciale & Product Designer",
    company: "Schinco Parquet S.r.l.",
    period: "2014 — 2019",
    description:
      "Progettazione di prodotto, analisi di mercato e gestione delle attività commerciali.",
    highlights: [
      "Ideazione, progettazione e deposito del brevetto Woodencarpet (n. IT 102012902068013)",
      "Analisi delle preferenze dei clienti, dei trend di mercato e delle performance di prodotto",
      "Allestimento degli stand a London Design Fair (2016) e MADE Expo Milano (2017)",
    ],
    tags: ["Design di prodotto", "Brevetti", "Vendite", "Formazione"],
    type: "work",
    field: "other",
  },
]

/**
 * Le esperienze vengono presentate in due gruppi: prima il percorso
 * tecnico, poi quello precedente. Dentro ogni gruppo, dal più recente.
 */
export const experienceGroups: ExperienceGroup[] = [
  {
    id: "tech",
    title: "Sviluppo & prodotto",
    description: "Dove ho imparato a costruire software.",
    items: allExperiences.filter((item) => item.field === "tech"),
  },
  {
    id: "other",
    title: "Percorso precedente",
    description:
      "Ruoli non tecnici, ma è da qui che viene il modo in cui lavoro con prodotto e clienti.",
    items: allExperiences.filter((item) => item.field === "other"),
  },
]
