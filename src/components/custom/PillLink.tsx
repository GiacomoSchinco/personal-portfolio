import type { ComponentProps } from "react"
import { cn } from "cn"

const sizes = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-4 py-2 text-sm",
} as const

const variants = {
  /** Neutro: bordo e fondo in vetro, testo muted. */
  glass:
    "border-glass-border bg-glass-bg text-muted-foreground hover:text-foreground",
  /** Accent: bordo e fondo tinti sul blu primario. */
  accent:
    "border-accent-primary/35 bg-accent-primary/10 text-foreground hover:border-accent-primary/60 hover:bg-accent-primary/20",
} as const

type PillLinkProps = ComponentProps<"a"> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  /** Apre in una nuova scheda con i `rel` di sicurezza. */
  external?: boolean
}

/**
 * Link a pillola, usato per azioni secondarie ("Tutta la repository",
 * "Torna su"). I CTA principali della navbar e del menu restano scritti a
 * mano perché hanno bisogno di controllo sul `display` (`hidden md:flex`,
 * larghezza piena) che non si combina bene con una classe base condivisa.
 */
export function PillLink({
  variant = "glass",
  size = "md",
  external = false,
  className,
  children,
  ...props
}: PillLinkProps) {
  return (
    <a
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
