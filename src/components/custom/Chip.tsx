import type { ComponentProps } from "react"
import { cn } from "cn"

/**
 * Pillola singola: tag di tecnologia, competenza, anno.
 *
 * È un `<li>` di proposito: tutte le occorrenze nel progetto stanno dentro
 * una lista, così gli screen reader annunciano correttamente il numero di
 * elementi. Usala con `ChipList` o `TagList`.
 *
 * Nota: `bg-glass-bg` NON è vetro smerigliato — è solo un fondo traslucido
 * senza `backdrop-filter`. Su decine di chip il blur sarebbe un costo inutile.
 */
export function Chip({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      className={cn(
        "rounded-full border border-glass-border bg-glass-bg px-2.5 py-1 text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/** Contenitore per `Chip`: gestisce il wrap e la spaziatura. */
export function ChipList({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={cn("flex flex-wrap gap-1.5", className)} {...props} />
}

/**
 * `ChipList` + `Chip` a partire da un array di stringhe.
 * Evita di ripetere il `.map()` in ogni sezione.
 */
export function TagList({
  items,
  className,
}: {
  items: readonly string[]
  className?: string
}) {
  return (
    <ChipList className={className}>
      {items.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
    </ChipList>
  )
}
