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
  "La determinazione è il filo conduttore del mio percorso. Mi piace trasformare idee in soluzioni concrete, che si tratti di portare un progetto fino a un brevetto industriale o di accompagnare una piattaforma software dal concept al rilascio. Per me ogni errore è un dato da analizzare, migliorare e trasformare nel passo successivo.",
  "Negli ultimi anni ho unito sviluppo software e visione di prodotto, lavorando con React e Angular nei settori della cybersecurity, fino ad assumere responsabilità da Product Owner nella definizione di roadmap, backlog e priorità in contesti Agile/Scrum.",
"Il mio percorso nasce però prima della tecnologia: dalla gestione commerciale, dall’organizzazione di eventi e dalla creazione di Woodencarpet, un prodotto di design industriale che ho ideato e brevettato. Questa esperienza mi ha insegnato a leggere i bisogni delle persone e del business prima ancora di pensare alla soluzione tecnica.",
""
],
  
  stats: [
    { icon: Briefcase, value: "11", label: "Anni di esperienza professionale" },
    { icon: Layers, value: "3", label: "Piattaforme software realizzate" },
    { icon: Award, value: "1", label: "Brevetto industriale depositato" },
  ] satisfies Stat[],
}
