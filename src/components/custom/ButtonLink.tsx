import type { ComponentProps, ReactNode } from "react"
import { Button } from "@/components/ui/button"

type ButtonLinkProps = Omit<
  ComponentProps<typeof Button>,
  "render" | "nativeButton" | "children"
> & {
  href: string
  /** Apre in una nuova scheda con i rel di sicurezza. */
  external?: boolean
  children: ReactNode
}

/**
 * Un `Button` che in realtà è un link.
 *
 * Perché serve questo wrapper: Base UI imposta `nativeButton` a `true` di
 * default e avvisa in console quando il `render` non è un `<button>`, perché
 * l'elemento perderebbe le semantiche native (invio form, tastiera, screen
 * reader). Per un link la semantica corretta è `<a>`, quindi va dichiarato
 * esplicitamente con `nativeButton={false}`.
 *
 * Usalo ogni volta che un bottone deve navigare, invece di scrivere
 * `<Button render={<a />}>` a mano e dimenticarti la prop.
 */
export function ButtonLink({
  href,
  external = false,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Button
      nativeButton={false}
      render={
        external ? (
          <a href={href} target="_blank" rel="noreferrer noopener" />
        ) : (
          <a href={href} />
        )
      }
      {...props}
    >
      {children}
    </Button>
  )
}
