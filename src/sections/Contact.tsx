import { useEffect, useState } from "react"
import type { FormEvent, ReactNode } from "react"
import {
  ArrowUpRight,
  ChevronRight,
  CircleCheck,
  Mail,
  MapPin,
  Send,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "cn"
import { ButtonLink } from "@/components/custom/ButtonLink"
import { Section } from "@/components/custom/Section"
import { SectionHeading } from "@/components/custom/SectionHeading"
import { SectionGlow } from "@/components/custom/SectionGlow"
import { SurfaceCard } from "@/components/custom/SurfaceCard"
import { IconTile } from "@/components/custom/IconTile"
import { SocialIcon } from "@/components/custom/SocialIcon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { privacyNotice, site, socials } from "@/data"
import { accentClasses } from "@/lib/accents"
import type { IconType } from "@/lib/icons"

/** Endpoint del servizio che consegna i messaggi del form. */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

/**
 * Chiave di accesso di Web3Forms, da `VITE_WEB3FORMS_KEY`.
 *
 * In locale sta in `.env.local`, in produzione nelle variabili d'ambiente del
 * provider (su Vercel: Settings → Environment Variables). Vite la incorpora nel
 * bundle **al momento della build**, quindi su Vercel deve esistere prima di
 * costruire: aggiungerla dopo richiede un nuovo deploy.
 *
 * Non è un segreto: Web3Forms la vuole nel client e la tratta come un alias
 * dell'indirizzo che riceve i messaggi. Sta fuori dal repository solo per
 * poterla cambiare o revocare senza toccare il codice.
 *
 * Se manca, il modulo **non viene disegnato**: al suo posto resta la mail. Un
 * form che finge di inviare è peggio di nessun form.
 */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type FormStatus = "idle" | "sending" | "sent" | "error"

/** Etichetta del bottone per ogni stato: dice cosa sta succedendo, e se riprovare. */
const submitLabels: Record<FormStatus, string> = {
  idle: "Invia il messaggio",
  sending: "Invio…",
  sent: "Inviato",
  error: "Riprova",
}

/**
 * Riga "icona in riquadro + testo" della colonna contatti.
 *
 * Locale e non esportata: la usa solo questa sezione, e con `IconTile` ha un
 * peso visivo diverso dalle voci `MetaItem` di "Chi sono", dove l'icona è
 * 16px e senza riquadro. Una seconda sezione che ne avesse bisogno la farebbe
 * salire in `custom/`.
 *
 * Con `href` è un link e mostra la freccia al passaggio del mouse; senza, è
 * un semplice testo.
 */
function ContactRow({
  icon,
  href,
  children,
}: {
  icon: IconType
  href?: string
  children: ReactNode
}) {
  const content = (
    <>
      <IconTile icon={icon} />
      {children}
      {href && (
        <ArrowUpRight
          size={15}
          className="opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </>
  )

  if (!href) {
    return (
      <span className="inline-flex items-center gap-3 text-muted-foreground">
        {content}
      </span>
    )
  }

  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
    >
      {content}
    </a>
  )
}

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle")

  // Dopo un invio riuscito il bottone resta su "Inviato" qualche secondo, poi
  // torna disponibile: altrimenti chi vuole scrivere un secondo messaggio
  // rimane bloccato su un bottone disabilitato.
  useEffect(() => {
    if (status !== "sent") return
    const timeout = setTimeout(() => setStatus("idle"), 4000)
    return () => clearTimeout(timeout)
  }, [status])

  /**
   * Invio vero: i dati vanno a Web3Forms, che li consegna via email.
   *
   * Il testo scritto viene azzerato **solo** dopo una risposta positiva. Se
   * l'invio fallisce resta dov'è, insieme a un messaggio d'errore: prima
   * spariva comunque, sotto un toast di successo.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return

    const form = event.currentTarget
    const payload = Object.fromEntries(new FormData(form))

    setStatus("sending")

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = (await response.json()) as { message?: string }
      if (!response.ok) throw new Error(result.message)

      form.reset()
      setStatus("sent")
      toast.success("Messaggio inviato", {
        description:
          "Ti rispondo appena posso, di solito entro un paio di giorni.",
      })
    } catch {
      setStatus("error")
      toast.error("Il messaggio non è partito", {
        description: `Riprova tra poco, oppure scrivimi a ${site.email}`,
      })
    }
  }

  return (
    <Section id="contact">
      <SectionGlow accent="secondary" className="right-0 bottom-0" />

      <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* Colonna informativa */}
        <div>
          <SectionHeading
            eyebrow="Contatti"
            title="Scrivimi"
            description="Che sia una collaborazione, una consulenza o semplicemente due chiacchiere: sono qui."
          />

          <div className="mt-8 flex flex-col gap-4 text-sm">
            <ContactRow icon={Mail} href={`mailto:${site.email}`}>
              {site.email}
            </ContactRow>

            <ContactRow icon={MapPin}>{site.location}</ContactRow>

            {/* Terza voce della lista: non è un link né un luogo, è uno stato.
                Sta qui e non nella Hero di proposito — il perché è nel commento
                sopra `availabilityLabel` in `site.ts`. */}
            <ContactRow icon={CircleCheck}>
              {site.availabilityLabel}
            </ContactRow>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {socials.map((social) => {
              const accent =
                accentClasses[
                social.label === "GitHub"
                  ? "primary"
                  : social.label === "LinkedIn"
                    ? "secondary"
                    : "tertiary"
                ]

              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                      accent.border,
                      accent.bg
                    )}
                  >
                    <SocialIcon label={social.label} size={16} />
                    {social.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/*
          Form.

          Se la chiave non è configurata il modulo non viene nemmeno disegnato:
          al suo posto la strada che funziona sempre, la mail.
        */}
        <SurfaceCard variant="glass" glow className="p-6 md:p-8">
          {ACCESS_KEY ? (
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col gap-5"
            >
              <input type="hidden" name="access_key" value={ACCESS_KEY} />
              <input
                type="hidden"
                name="subject"
                value={`Contatto dal portfolio — ${site.fullName}`}
              />
              {/*
                Honeypot: un campo che nessun umano vede né compila, quindi se
                arriva compilato è un bot. La documentazione di Web3Forms lo dà
                per sconsigliato (preferiscono hCaptcha), ma è il campo del loro
                stesso esempio base e non costa niente.

                Il campo `email` invece non va configurato: Web3Forms lo usa da
                sé come `replyto`, quindi la risposta parte verso il visitatore
                e non verso te.
              */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    name="nome"
                    required
                    autoComplete="name"
                    placeholder="Come ti chiami"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="tu@azienda.it"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="messaggio">Messaggio</Label>
                <Textarea
                  id="messaggio"
                  name="messaggio"
                  required
                  rows={6}
                  placeholder="Raccontami cosa hai in mente…"
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === "sending" || status === "sent"}
                className="h-11 rounded-full"
              >
                {submitLabels[status]}
                <Send data-icon="inline-end" />
              </Button>

              <p className="text-xs text-brand-text-muted">
                Oppure scrivimi direttamente a{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-accent-tertiary hover:underline"
                >
                  {site.email}
                </a>
              </p>

              {/*
                Informativa privacy.

                La riga breve resta sempre visibile sotto il bottone; il testo
                esteso sta dietro un `<details>`. È contenuto nativo, quindi si
                apre con la tastiera e dagli screen reader senza una riga di
                JavaScript — e senza tirare in ballo l'`accordion` di shadcn,
                che il sito non usa da nessun'altra parte.

                La riga divisoria c'è perché sotto il bottone la piccola
                stampa non deve sembrare la continuazione della frase
                "oppure scrivimi a".
              */}
              <div className="border-t border-glass-border pt-4">
                <p className="text-xs leading-relaxed text-brand-text-muted">
                  {privacyNotice.summary}
                </p>

                <details className="group mt-2">
                  {/*
                    `list-none` + il marcatore di WebKit nascosto: altrimenti
                    compare il triangolino di sistema accanto al testo.
                  */}
                  <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-xs font-medium text-accent-tertiary [&::-webkit-details-marker]:hidden">
                    {privacyNotice.openLabel}
                    <ChevronRight
                      size={13}
                      aria-hidden="true"
                      className="transition-transform group-open:rotate-90 motion-reduce:transition-none"
                    />
                  </summary>

                  <dl className="mt-3 flex flex-col gap-3">
                    {privacyNotice.clauses.map((clause) => (
                      <div key={clause.label}>
                        <dt className="text-xs font-medium text-foreground">
                          {clause.label}
                        </dt>
                        <dd className="text-xs leading-relaxed text-brand-text-muted">
                          {clause.text}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-3 text-xs leading-relaxed text-brand-text-muted">
                    Per esercitarli scrivimi a{" "}
                    <a
                      href={`mailto:${site.email}`}
                      className="text-accent-tertiary hover:underline"
                    >
                      {site.email}
                    </a>
                    .
                  </p>
                </details>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-start gap-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Il modulo è momentaneamente fuori servizio. Scrivimi
                direttamente a{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-accent-tertiary hover:underline"
                >
                  {site.email}
                </a>
                : ti rispondo appena posso.
              </p>
              <ButtonLink
                href={`mailto:${site.email}`}
                size="lg"
                className="h-11 rounded-full"
              >
                <Mail />
                Scrivimi una mail
              </ButtonLink>
            </div>
          )}
        </SurfaceCard>
      </div>
    </Section>
  )
}
