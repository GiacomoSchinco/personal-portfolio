import type { ComponentProps, ElementType } from "react"
import { cn } from "cn"
import { accentClasses } from "@/lib/accents"
import type { Accent } from "@/lib/accents"

type SurfaceCardProps = ComponentProps<"div"> & {
  /** Elemento da renderizzare: `article` quando la card è un contenuto a sé. */
  as?: "div" | "article"
  /**
   * "flat"  → superficie traslucida SENZA `backdrop-filter` (default).
   * "glass" → vetro smerigliato vero.
   *
   * Regola del progetto: usa "glass" con parsimonia. Ogni `backdrop-filter`
   * è un layer da comporre a ogni scroll, e su uno sfondo piatto non si vede
   * nemmeno. Con decine di card l'effetto è identico ma il costo no.
   */
  variant?: "flat" | "glass"
  /** Alone accent nell'angolo, più intenso al passaggio del mouse. */
  glow?: boolean
  /** Lift + bordo più chiaro in hover. */
  interactive?: boolean
  accent?: Accent
}

/** Contenitore riutilizzabile per card, pannelli e form. */
export function SurfaceCard({
  as = "div",
  variant = "flat",
  glow = false,
  interactive = false,
  accent = "primary",
  className,
  children,
  ...props
}: SurfaceCardProps) {
  const Tag: ElementType = as

  // Niente wrapper interno: i figli devono restare figli diretti della card,
  // altrimenti `flex`, `flex-1` e `justify-between` usati dalle sezioni non
  // funzionano più. L'alone viene messo dietro al contenuto con `-z-10`,
  // reso prevedibile da `isolate` (crea uno stacking context dedicato).
  return (
    <Tag
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl",
        variant === "glass"
          ? "glass-panel"
          : "border border-glass-border bg-glass-bg",
        interactive &&
          "transition-colors hover:border-white/20 hover:bg-glass-bg-strong",
        className
      )}
      {...props}
    >
      {glow && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-24 -right-16 -z-10 h-56 w-56 rounded-full opacity-60 blur-[90px] transition-opacity duration-500 group-hover:opacity-100",
            accentClasses[accent].glow
          )}
        />
      )}
      {children}
    </Tag>
  )
}
