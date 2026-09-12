import type { ComponentProps } from "react"
import { cn } from "cn"

type Tone = "muted" | "accent" | "tertiary"

const tones: Record<Tone, string> = {
  muted: "text-muted-foreground",
  accent: "text-accent-primary",
  tertiary: "text-accent-tertiary",
}

type MicroLabelProps = ComponentProps<"span"> & {
  tone?: Tone
  /** Punto accent davanti all'etichetta (eredita il colore del tono). */
  dot?: boolean
}

/**
 * Etichetta piccola, maiuscola, con spaziatura ampia.
 *
 * È il tono tipografico ricorrente del sito: eyebrow delle sezioni, titoletti
 * interni ("In numeri"), intestazioni del piè di pagina e del menu mobile.
 * Prima la stessa stringa di classi era ripetuta in 5 file.
 *
 * Rende uno `<span>`: se ti serve semantica di intestazione, avvolgila, es.
 * `<h2><MicroLabel>Sezioni</MicroLabel></h2>`.
 */
export function MicroLabel({
  tone = "muted",
  dot = false,
  className,
  children,
  ...props
}: MicroLabelProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase",
        tones[tone],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="h-1 w-1 shrink-0 rounded-full bg-current"
        />
      )}
      {children}
    </span>
  )
}
