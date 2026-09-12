import {
  Boxes,
  Code,
  Cpu,
  Database,
  GitBranch,
  MonitorSmartphone,
  Palette,
  Sparkles,
  Users,
} from "lucide-react"
import type { IconType } from "@/lib/icons"

export type SkillGroup = {
  icon: IconType
  title: string
  description: string
  skills: string[]
}

/**
 * Gruppi di competenze mostrati come card del carosello.
 *
 * ⚠️ Tutte le voci vengono da `src/data/resume.json`, ma il CV le raggruppa in
 * modo diverso (4 gruppi in `skills`, 3 in `skillsCompact`). Qui i gruppi sono
 * stati riorganizzati per coerenza interna, senza aggiungere nulla che non sia
 * scritto nel CV.
 *
 * Criterio: ogni card deve contenere cose **della stessa famiglia**. Per questo
 * Docker sta con il backend (e non con Git), mentre TanStack Query e Zustand
 * stanno con React (e non tra gli "strumenti").
 *
 * Fonti:
 * - Linguaggi / Frontend / Backend / Database → `skills` + corso Accademia Informatica
 * - Architettura                             → corso + highlight di `Duskrise`
 * - UX & Design                              → corso + `skillsCompact` + Schinco Parquet
 * - Product & Metodologie                    → `skills` + `skillsCompact`
 * - Versionamento & Workflow                 → `skills` + `skillsCompact` (CI/CD)
 * - Soft Skills                              → `skills`
 */
export const skillGroups: SkillGroup[] = [
  {
    icon: Code,
    title: "Linguaggi",
    description: "Le basi su cui costruisco, dal frontend al backend.",
    skills: ["JavaScript", "TypeScript", "Java", "Python (basi)", "C# (basi)"],
  },
  {
    icon: MonitorSmartphone,
    title: "Frontend",
    description: "React come strumento principale, con Angular come secondo binario.",
    skills: [
      "React",
      "Next.js",
      "TanStack Query",
      "Zustand",
      "Angular",
      "HTML5",
      "CSS3",
      "Tailwind",
      "Bootstrap",
      "jQuery",
    ],
  },
  {
    icon: Cpu,
    title: "Backend",
    description: "Servizi e API, dal percorso di qualificazione Full Stack Java.",
    skills: [
      "Spring Boot",
      "Spring MVC",
      "API RESTful",
      "JDBC",
      "Docker (basi)",
    ],
  },
  {
    icon: Database,
    title: "Database & Dati",
    description: "Modellare i dati prima di scriverci sopra.",
    skills: ["SQL", "MySQL", "Oracle", "Progettazione ER"],
  },
  {
    icon: Boxes,
    title: "Architettura",
    description: "Il modo in cui strutturo un'applicazione, non solo il codice.",
    skills: [
      "Micro-frontend",
      "Single-SPA",
      "Design Patterns",
      "Architetture client-side",
    ],
  },
  {
    icon: Palette,
    title: "UX & Design",
    description: "Progettare prima di scrivere, dal prodotto al dettaglio.",
    skills: ["UX", "Universal Design", "Responsive design", "Design di prodotto"],
  },
  {
    icon: Users,
    title: "Product & Metodologie",
    description: "Portare un prodotto dal backlog al rilascio.",
    skills: [
      "Scrum / Agile",
      "Product Ownership",
      "Gestione Backlog",
      "Stakeholder Management",
      "Jira",
      "Confluence",
    ],
  },
  {
    icon: GitBranch,
    title: "Versionamento & Workflow",
    description: "Come collaboro e porto il codice in produzione.",
    skills: ["Git", "GitLab", "GitHub", "CI/CD"],
  },
  {
    icon: Sparkles,
    title: "Soft Skills",
    description: "Le competenze che non si vedono nel codice.",
    skills: [
      "Problem Solving",
      "Spirito di squadra",
      "Adattabilità",
      "Flessibilità nell'apprendimento",
      "Autonomia nello studio di nuove tecnologie",
    ],
  },
]
