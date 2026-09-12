/**
 * Accenti del brand.
 *
 * ⚠️ La mappa è statica di proposito: Tailwind analizza i sorgenti come testo,
 * quindi una classe costruita a runtime (`bg-accent-${accent}`) non verrebbe
 * generata e l'elemento resterebbe senza stile. Ogni accento deve comparire
 * come stringa letterale nel codice.
 */
export type Accent = "primary" | "secondary" | "tertiary"

export const accentClasses: Record<
  Accent,
  {
    /** Colore del testo/icona. */
    text: string
    /** Sfondo tenue. */
    bg: string
    /** Bordo tenue. */
    border: string
    /** Alone sfocato (da usare con `blur-[...]`). */
    glow: string
  }
> = {
  primary: {
    text: "text-accent-primary",
    bg: "bg-accent-primary/10",
    border: "border-accent-primary/30",
    glow: "bg-accent-primary/25",
  },
  secondary: {
    text: "text-accent-secondary",
    bg: "bg-accent-secondary/10",
    border: "border-accent-secondary/30",
    glow: "bg-accent-secondary/25",
  },
  tertiary: {
    text: "text-accent-tertiary",
    bg: "bg-accent-tertiary/10",
    border: "border-accent-tertiary/30",
    glow: "bg-accent-tertiary/25",
  },
}
