import { ArrowUpRight, Mail, MapPin } from "lucide-react"
import { Section } from "@/components/custom/Section"
import { SectionHeading } from "@/components/custom/SectionHeading"
import { SectionGlow } from "@/components/custom/SectionGlow"
import { SurfaceCard } from "@/components/custom/SurfaceCard"
import { IconTile } from "@/components/custom/IconTile"
import { MicroLabel } from "@/components/custom/MicroLabel"
import { SocialIcon } from "@/components/custom/SocialIcon"
import { about, site, socials } from "@/data"

export function About() {
  return (
    <Section id="about">
      {/* Alone accent: dà profondità e qualcosa da sfocare alla card in vetro */}
      <SectionGlow accent="primary" className="top-1/4 -left-32" />

      <div className="relative grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* Colonna testo */}
        <div>
          {/* Avatar: immagine importata da src/assets, non da public/ */}
          <div className="mb-8 flex items-center gap-4">
            <img
              src={site.avatarUrl}
              alt={site.fullName}
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-full border border-glass-border object-cover"
            />
            <div>
              <p className="text-base font-medium text-foreground">
                {site.fullName}
              </p>
              <p className="text-sm text-muted-foreground">{site.role}</p>
            </div>
          </div>

          <SectionHeading eyebrow={about.eyebrow} title={about.title} />

          <div className="mt-8 flex flex-col gap-5">
            {about.paragraphs.map((paragraph:any) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-accent-tertiary" />
              {site.location}
            </span>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Mail size={16} className="text-accent-tertiary" />
              {site.email}
            </a>
          </div>
        </div>

        {/* Colonna card in vetro */}
        <SurfaceCard variant="glass" glow className="h-fit p-6 md:p-8">
          <h3>
            <MicroLabel>In numeri</MicroLabel>
          </h3>

          <dl className="mt-6 flex flex-col gap-6">
            {about.stats.map((stat:any) => (
              <div key={stat.label} className="flex items-center gap-4">
                <IconTile icon={stat.icon} size="md" />
                <div>
                  <dt className="text-2xl font-medium tracking-tight text-foreground">
                    {stat.value}
                  </dt>
                  <dd className="text-sm text-muted-foreground">{stat.label}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="my-7 h-px w-full bg-glass-border" />

          <h3>
            <MicroLabel>Dove trovarmi</MicroLabel>
          </h3>

          <ul className="mt-4 flex flex-col gap-1">
            {socials.map((social) => {
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-glass-bg hover:text-foreground"
                  >
                    <SocialIcon
                      label={social.label}
                      size={18}
                      className="text-accent-tertiary"
                    />
                    <span className="font-medium">{social.label}</span>
                    <span className="ml-auto text-xs text-brand-text-muted">
                      {social.handle}
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </SurfaceCard>
      </div>
    </Section>
  )
}
