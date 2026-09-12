import { cn } from "cn"
import { MicroLabel } from "./MicroLabel"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

/**
 * Intestazione di sezione: etichetta piccola in maiuscolo + titolo grande.
 * L'etichetta riprende il linguaggio visivo del menu mobile.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <MicroLabel
          tone="accent"
          dot
          className={cn(align === "center" && "justify-center")}
        >
          {eyebrow}
        </MicroLabel>
      )}

      <h2 className="max-w-3xl text-3xl font-medium tracking-tight text-balance text-foreground md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
