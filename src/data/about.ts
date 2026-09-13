import { Award, Briefcase, Layers } from "lucide-react"
import type { IconType } from "@/lib/icons"

export type Stat = {
  icon: IconType
  value: string
  label: string
}

export type MethodPoint = {
  /** Prima frase, evidenziata. */
  lead: string
  /** Spiegazione. */
  text: string
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

  /**
   * Come uso l'AI nel lavoro.
   *
   * ⚠️ Questa formulazione è stata confermata dal committente. Non è una
   * competenza nel CV: è la descrizione di un metodo, quindi non va spostata
   * tra le competenze senza una sua nuova conferma.
   *
   * Nota: NON si elencano gli strumenti (Copilot, modelli locali…). Il punto
   * non è quali tool usa — è come li usa. Un elenco di nomi sarebbe la solita
   * lista di loghi che non dice niente.
   *
   * ⚠️ Vincolo di scrittura: il titolo e OGNI punto devono nominare l'AI.
   * Senza il riferimento esplicito, frasi come "il giudizio resta mio" si
   * leggono come metodo di lavoro generico invece che come uso dell'AI.
   */
  method: {
    title: "Come uso l'AI",
    intro:
      "Nel 2026 non usarla sarebbe anacronistico. La differenza non è se la usi: è cosa non le deleghi.",
    points: [
      {
        lead: "Consulente tecnico, prima del codice.",
        text: "La interrogo per studiare le tecnologie, analizzare i requisiti, progettare il database e dividere il lavoro. Quando apro l'editor ho già un piano preciso: non improvviso.",
      },
      {
        lead: "Operatore, ma solo sul ripetitivo.",
        text: "Ripetizioni, boilerplate, trasformazioni: quelle le lascio alla macchina. Mai ciò che richiede una decisione.",
      },
      {
        lead: "Il giudizio resta mio.",
        text: "Architettura, scelte tecniche e revisione finale. L'AI propone, io decido — e quello che esce porta la mia firma.",
      },
    ] satisfies MethodPoint[],
  },
}
