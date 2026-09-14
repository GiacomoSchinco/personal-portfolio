import type { ComponentProps } from "react"
import { cn } from "cn"

type IconButtonProps = ComponentProps<"button">

/**
 * Bottone tondo in vetro con la sola icona.
 *
 * Le due occorrenze erano già identiche carattere per carattere: l'hamburger
 * della Navbar e la chiusura del menu mobile. Qui ci vivono anche i token del
 * vetro (bordo + fondo traslucido), così le due copie non possono più
 * divergere come era successo con i pallini degli elenchi.
 *
 * L'icona non è un'etichetta: serve sempre un `aria-label` (o un
 * `<span className="sr-only">`) che dica cosa fa il bottone.
 */
export function IconButton({ className, children, ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass-bg text-foreground backdrop-blur-md transition-colors hover:bg-glass-bg-strong",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
