import { cn } from "cn"
import { accentClasses } from "@/lib/accents"
import type { Accent } from "@/lib/accents"
import type { IconType } from "@/lib/icons"

const sizes = {
  sm: { box: "h-10 w-10", icon: 18 },
  md: { box: "h-11 w-11", icon: 20 },
} as const

type IconTileProps = {
  icon: IconType
  size?: keyof typeof sizes
  accent?: Accent
  /**
   * "surface" → riquadro neutro in vetro con bordo (default)
   * "tinted"  → solo fondo accent, senza bordo
   */
  variant?: "surface" | "tinted"
  className?: string
}

/**
 * Icona dentro un riquadro arrotondato.
 * Era ripetuto 4 volte (About, Skills, Contact ×2) con misure leggermente
 * diverse tra loro.
 */
export function IconTile({
  icon: Icon,
  size = "sm",
  accent = "primary",
  variant = "surface",
  className,
}: IconTileProps) {
  const { box, icon: iconSize } = sizes[size]
  const accentStyle = accentClasses[accent]

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl",
        box,
        variant === "surface"
          ? "border border-glass-border bg-glass-bg"
          : accentStyle.bg,
        className
      )}
    >
      <Icon size={iconSize} className={accentStyle.text} />
    </span>
  )
}
