import { Mail } from "lucide-react"
import type { IconType } from "@/lib/icons"
import { GithubIcon, LinkedinIcon } from "./BrandIcons"

/**
 * Mappa etichetta social -> icona.
 *
 * Prima era duplicata (con contenuti diversi!) in `About`, `Contact` e `Footer`.
 * Qui è l'unica fonte: se aggiungi un social, aggiungilo solo qui.
 *
 * `Email` usa `Mail` di lucide perché non è un brand; GitHub e LinkedIn usano
 * le icone disegnate a mano in `BrandIcons.tsx`.
 */
export const socialIcons: Record<string, IconType> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: Mail,
}

type SocialIconProps = {
  /** Deve combaciare con una chiave di `socialIcons`, es. "GitHub". */
  label: string
  size?: number
  className?: string
}

/** Rende l'icona giusta per un social, o `null` se l'etichetta non è mappata. */
export function SocialIcon({ label, size = 18, className }: SocialIconProps) {
  const Icon = socialIcons[label]
  if (!Icon) return null

  return <Icon size={size} className={className} />
}
