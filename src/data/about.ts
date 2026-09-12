import { Briefcase, Rocket, Sparkles } from "lucide-react"
import type { IconType } from "@/lib/icons"

export type Stat = {
  icon: IconType
  value: string
  label: string
}

/**
 * Contenuti della sezione "Chi sono".
 * ⚠️ PLACEHOLDER: la bio è inventata, sostituiscila con la tua.
 */
export const about = {
  eyebrow: "Chi sono",
  title: "Frontend developer con l'ossessione del dettaglio",
  paragraphs: [
    "Mi chiamo Giacomo e da oltre cinque anni trasformo design in interfacce che le persone usano volentieri. Lavoro principalmente con React e TypeScript, ma la parte che mi appassiona di più è il punto in cui l'animazione smette di essere decorazione e diventa comunicazione.",
    "Ho un approccio maniacale all'accessibilità e alle performance: un sito bello ma lento o inutilizzabile da tastiera è, per me, un lavoro fatto a metà. Quando non scrivo codice mi perdo tra tipografia, palette di colori e package manager.",
  ],
  stats: [
    { icon: Briefcase, value: "5+", label: "Anni di esperienza" },
    { icon: Rocket, value: "30+", label: "Progetti consegnati" },
    { icon: Sparkles, value: "12", label: "Tecnologie padroneggiate" },
  ] satisfies Stat[],
}
