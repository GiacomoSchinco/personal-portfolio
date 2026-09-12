import {
  Accessibility,
  Boxes,
  Gauge,
  Layers,
  MonitorSmartphone,
  Palette,
  Terminal,
  TestTube,
} from "lucide-react"
import type { IconType } from "@/lib/icons"

export type SkillGroup = {
  icon: IconType
  title: string
  description: string
  skills: string[]
}

/**
 * Gruppi di competenze mostrati come chip di vetro.
 * ⚠️ PLACEHOLDER: adatta i gruppi e le voci alle tue competenze reali.
 */
export const skillGroups: SkillGroup[] = [
  {
    icon: Layers,
    title: "Frontend",
    description: "Il cuore del mio lavoro quotidiano.",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Vite",
      "Next.js",
    ],
  },
  {
    icon: Palette,
    title: "Interazione & grafica",
    description: "Movimento e 3D al servizio del racconto.",
    skills: [
      "GSAP",
      "Three.js",
      "React Three Fiber",
      "Framer Motion",
      "Lenis",
      "Canvas",
    ],
  },
  {
    icon: Gauge,
    title: "Performance",
    description: "Velocità misurata, non dichiarata.",
    skills: [
      "Core Web Vitals",
      "Lazy loading",
      "Code splitting",
      "Lighthouse",
      "Ottimizzazione bundle",
    ],
  },
  {
    icon: Accessibility,
    title: "Accessibilità",
    description: "Se non è usabile da tutti, non è finito.",
    skills: [
      "WCAG 2.2 AA",
      "ARIA",
      "Navigazione da tastiera",
      "Screen reader",
      "Contrasto colori",
    ],
  },
  {
    icon: Boxes,
    title: "Architettura",
    description: "Codice che resta leggibile nel tempo.",
    skills: [
      "Design system",
      "Componenti riutilizzabili",
      "CSS variables",
      "State management",
      "Monorepo",
    ],
  },
  {
    icon: Terminal,
    title: "Strumenti",
    description: "L'ambiente in cui mi muovo ogni giorno.",
    skills: [
      "Git",
      "GitHub Actions",
      "VS Code",
      "Figma",
      "Storybook",
      "Vitest",
    ],
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive",
    description: "Dal watch al 4K, senza sorprese.",
    skills: ["Mobile first", "Container queries", "Fluid typography"],
  },
  {
    icon: TestTube,
    title: "Qualità",
    description: "Prevenire è meglio che debuggare.",
    skills: ["Testing", "Linting", "Code review", "Type safety"],
  },
]
