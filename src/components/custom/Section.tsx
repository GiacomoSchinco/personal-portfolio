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
        // sotto la navbar invece di lasciare ~120px di vuoto.
        // Nota: gli spazi in un arbitrary value Tailwind si scrivono con `_`,
        // perché CSS richiede spazi attorno al meno dentro calc().
        "relative mx-auto w-full max-w-7xl scroll-mt-[calc(var(--nav-height)_-_2.5rem)] px-6",
        !flush && "py-24 md:py-32",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
