import { useState } from "react"
import type { FormEvent } from "react"
import { ArrowUpRight, CircleCheck, Mail, MapPin, Send } from "lucide-react"
import { toast } from "sonner"
import { cn } from "cn"
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
import { site, socials } from "@/data"
import { accentClasses } from "@/lib/accents"

export function Contact() {
  const [sending, setSending] = useState(false)

  /**
   * Invio "senza backend": compone una mailto con i dati inseriti e apre il
   * client di posta. Per usare un servizio vero (Formspree, Resend, API tua)
   * sostituisci il corpo di questa funzione con una fetch verso l'endpoint.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const nome = String(data.get("nome") ?? "")
    const email = String(data.get("email") ?? "")
    const messaggio = String(data.get("messaggio") ?? "")

    setSending(true)

    const subject = encodeURIComponent(`Contatto dal portfolio — ${nome}`)
    const body = encodeURIComponent(
      `${messaggio}\n\n—\n${nome}\n${email}`
    )

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    toast.success("Ti si sta aprendo il client di posta", {
      description: "In alternativa scrivimi direttamente a " + site.email,
    })
    form.reset()
    setSending(false)
  }

  return (
    <Section id="contact">
      <SectionGlow accent="secondary" className="right-0 bottom-0" />

      <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* Colonna informativa */}
        <div>
          <SectionHeading
            eyebrow="Contatti"
            title="Parliamo del tuo progetto"
            description="Che sia una collaborazione, una consulenza o semplicemente una chiacchierata su frontend e design: scrivimi."
          />

          <div className="mt-8 flex flex-col gap-4 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconTile icon={Mail} />
              {site.email}
              <ArrowUpRight
                size={15}
                className="opacity-0 transition-opacity group-hover:opacity-100"
              />
            </a>

            <span className="inline-flex items-center gap-3 text-muted-foreground">
              <IconTile icon={MapPin} />
              {site.location}
            </span>

            {/* Terza voce della lista: non è un link né un luogo, è uno stato.
                Sta qui e non nella Hero di proposito — il perché è nel commento
                sopra `availabilityLabel` in `site.ts`. */}
            <span className="inline-flex items-center gap-3 text-muted-foreground">
              <IconTile icon={CircleCheck} />
              {site.availabilityLabel}
            </span>
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

        {/* Form */}
        <SurfaceCard variant="glass" glow className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
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

            <Button type="submit" size="lg" disabled={sending} className="h-11 rounded-full">
              {sending ? "Apertura…" : "Invia il messaggio"}
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
          </form>
        </SurfaceCard>
      </div>
    </Section>
  )
}
