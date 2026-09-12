import { Award, Briefcase, Layers } from "lucide-react"
import type { IconType } from "@/lib/icons"

export type Stat = {
  icon: IconType
  value: string
  label: string
}

/**
 * Contenuti della sezione "Chi sono".
 * Fonte: `src/data/resume.json` (il CV completo).
 */
export const about = {
  eyebrow: "Chi sono",
  title: "Capisco il prodotto, poi lo costruisco",
  paragraphs: [
    "Ho una sola grande qualità: la determinazione. Una volta fissato un obiettivo lo seguo nonostante le difficoltà che incontro. Il fallire non è sbagliato — smettere di tentare, sì.",
    "Negli ultimi anni mi sono mosso tra due mondi che di solito non si parlano. Ho scritto interfacce in React e Angular per piattaforme di cybersecurity e logistica, e ho fatto il Product Owner gestendo backlog e stakeholder con Scrum. È da questa doppia prospettiva che nasce il mio modo di lavorare: prima capire perché una cosa serve, poi decidere come costruirla.",
    "Ho iniziato molto lontano dal codice, progettando prodotto e gestendo clienti. Non è stato tempo perso: è la ragione per cui oggi non mi limito a implementare quello che mi viene chiesto.",
  ],
  stats: [
    { icon: Briefcase, value: "11", label: "Anni di esperienza professionale" },
    { icon: Layers, value: "3", label: "Piattaforme software realizzate" },
    { icon: Award, value: "1", label: "Brevetto industriale depositato" },
  ] satisfies Stat[],
}
