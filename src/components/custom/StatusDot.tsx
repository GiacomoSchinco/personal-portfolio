import { cn } from "cn"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

const sizes = {
  /** Accanto a un testo `text-xs`: badge della Hero. */
  sm: "h-1.5 w-1.5",
  /** Accanto a un nome: logo in Navbar e nel piè di pagina. */
  md: "h-2 w-2",
} as const

type StatusDotProps = {
  size?: keyof typeof sizes
  className?: string
}

/**
 * Pallino accent con l'onda che si allarga.
 *
 * Era copiato in tre punti — badge della Hero, logo della Navbar, logo del piè
 * di pagina — in due misure. È lo stesso segno in tutti e tre: "sono qui e sono
 * disponibile", oppure il marchio accanto al nome.
 *
 * L'onda è un'animazione **continua**, quindi rispetta `prefers-reduced-motion`
 * (AGENTS.md §6.4): con le animazioni ridotte resta il punto pieno, senza
 * battito. Prima `animate-ping` girava sempre.
 */
export function StatusDot({ size = "sm", className }: StatusDotProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <span className={cn("relative flex", sizes[size], className)}>
      {!reducedMotion && (
        <span
          aria-hidden="true"
          className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-tertiary opacity-75"
        />
      )}
      <span
        className={cn(
          "relative inline-flex rounded-full bg-accent-tertiary",
          sizes[size]
        )}
      />
    </span>
  )
}
