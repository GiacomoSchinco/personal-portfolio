import { cn } from "cn"
import { accentClasses } from "@/lib/accents"
import type { Accent } from "@/lib/accents"

type SectionGlowProps = {
  accent?: Accent
  className?: string
}

/**
 * Alone sfocato da mettere dietro una sezione.
 *
 * Serve a due cose: dare profondità alla pagina e — non secondario — dare
 * qualcosa da sfocare alle superfici in vetro. `backdrop-filter` su uno sfondo
 * piatto è invisibile: senza un alone dietro, il glassmorphism non si vede.
 *
 * Va posizionato dall'esterno (`className`), perché `Section` è `relative`.
 */
export function SectionGlow({ accent = "primary", className }: SectionGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-80 w-80 rounded-full opacity-60 blur-[120px]",
        accentClasses[accent].glow,
        className
      )}
    />
  )
}
