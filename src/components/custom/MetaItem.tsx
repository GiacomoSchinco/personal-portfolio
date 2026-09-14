import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"
import type { IconType } from "@/lib/icons"

/*
 * `ComponentPropsWithoutRef` e non `ComponentProps`: senza il `ref` nel tipo,
 * gli stessi attributi si possono spalmare sia sul `<span>` sia sul `<a>`.
 * Con `ref` incluso i due tipi sono incompatibili (un `Ref<HTMLSpanElement>`
 * non è un `Ref<HTMLAnchorElement>`) e TypeScript rifiuta lo spread sul `<a>`.
 */
type MetaItemProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  icon: IconType
  children: ReactNode
  /** Con `href` la voce diventa un link; senza, resta un semplice testo. */
  href?: string
  /** Apre in una nuova scheda con i `rel` di sicurezza. */
  external?: boolean
}

/**
 * Voce "icona + testo": luogo, email, download.
 *
 * Con o senza `href` è la stessa cosa a vedersi — stessa icona accent a 16px,
 * stesso `gap` — e cambia solo la semantica. È deliberatamente **una** voce e
 * non una lista: il contenitore (riga di meta, colonna, griglia) resta alla
 * sezione, che è l'unica a sapere come sono disposte.
 *
 * Le occorrenze nel piè di pagina e nella timeline delle Esperienze **non**
 * usano questo componente: lì l'icona è più piccola (`15`) e passa da un
 * `SocialIcon` o da un colore condizionale. Servire anche quei casi avrebbe
 * voluto dire quattro prop opzionali per risparmiare tre righe.
 */
export function MetaItem({
  icon: Icon,
  href,
  external = false,
  className,
  children,
  ...props
}: MetaItemProps) {
  const classes = cn(
    "inline-flex items-center gap-2",
    href && "transition-colors hover:text-foreground",
    className
  )

  const content = (
    <>
      <Icon size={16} className="text-accent-tertiary" />
      {children}
    </>
  )

  if (!href) {
    return (
      <span className={classes} {...props}>
        {content}
      </span>
    )
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={classes}
      {...props}
    >
      {content}
    </a>
  )
}
