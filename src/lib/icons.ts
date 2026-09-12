import type { ComponentType } from "react"

/**
 * Tipo delle icone usabili nei dati delle sezioni.
 *
 * Non usiamo il tipo `LucideIcon` esportato dalla libreria per non dipendere
 * dai suoi export di tipo.
 *
 * ⚠️ In lucide v1 le icone di brand (`Github`, `Linkedin`, …) sono state
 * rimosse: quelle le ridisegniamo a mano in `components/custom/BrandIcons.tsx`.
 */
export type IconType = ComponentType<{
  className?: string
  size?: number
  strokeWidth?: number
}>
