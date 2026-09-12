import type { ComponentProps } from "react"
import { cn } from "cn"

/**
 * Wrapper di sezione: gestisce larghezza massima, padding orizzontale,
 * spaziatura verticale e offset di scroll per la navbar fissa.
 */
type SectionProps = ComponentProps<"section"> & {
  id: string
  /** Rimuove il padding verticale standard (utile per la Hero). */
  flush?: boolean
}

export function Section({ id, flush, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        // `scroll-mt` è volutamente MINORE dell'altezza navbar: così l'offset
        // "mangia" parte del padding della sezione e il titolo atterra subito
        // sotto la navbar invece di lasciare un vuoto.
        // Tarato sul padding attuale: se lo riduci ancora, riduci anche qui.
        // Nota: gli spazi in un arbitrary value Tailwind si scrivono con `_`,
        // perché CSS richiede spazi attorno al meno dentro calc().
        "relative mx-auto w-full max-w-7xl scroll-mt-[calc(var(--nav-height)_-_1rem)] px-6",
        // ⚠️ Il padding è SIMMETRICO, quindi al confine tra due sezioni i due
        // valori si SOMMANO: `py-14 md:py-18` dà 144px di vuoto tra una sezione
        // e l'altra su desktop (non 72px), 112px su mobile.
        //
        // Questo è l'unico punto di controllo della spaziatura verticale.
        // Valori utili (totale tra le sezioni, desktop):
        //   py-12 md:py-16 → 128px
        //   py-14 md:py-18 → 144px  ← attuale
        //   py-14 md:py-20 → 160px
        //   py-16 md:py-24 → 192px
        !flush && "py-14 md:py-14",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
