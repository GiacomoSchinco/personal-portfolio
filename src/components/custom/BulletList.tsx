import { cn } from "cn"

type BulletListProps = {
  items: readonly string[]
  /**
   * Classe del pallino.
   *
   * ⚠️ Deve essere una classe di **fondo** (`bg-…`). Il pallino è uno `<span>`
   * vuoto: passando una classe di testo (`text-…`) resta trasparente e quindi
   * invisibile — è successo davvero, vedi TROUBLESHOOTING §13.
   */
  dot: string
  className?: string
}

/**
 * Elenco puntato: pallino + testo muted.
 *
 * È il linguaggio dei punti elenco del sito — i contributi e le motivazioni nei
 * modali dei Progetti, le highlight delle Esperienze. Prima era scritto due
 * volte, e le due copie erano già divergenti: una passava il colore del pallino
 * come classe di testo.
 *
 * Il colore arriva da fuori (una prop, non un `accent`) perché non sempre
 * dipende dall'accento del progetto: nelle Esperienze distingue il percorso
 * tecnico da quello precedente.
 */
export function BulletList({ items, dot, className }: BulletListProps) {
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
        >
          <span
            aria-hidden="true"
            className={cn("mt-2 h-1 w-1 shrink-0 rounded-full", dot)}
          />
          {item}
        </li>
      ))}
    </ul>
  )
}
