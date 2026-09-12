import { ArrowUpRight, ExternalLink } from "lucide-react"
import { cn } from "cn"
import { Section } from "@/components/custom/Section"
import { SectionHeading } from "@/components/custom/SectionHeading"
import { SurfaceCard } from "@/components/custom/SurfaceCard"
import { TagList } from "@/components/custom/Chip"
import { PillLink } from "@/components/custom/PillLink"
import { GithubIcon } from "@/components/custom/BrandIcons"
import { projects, socials } from "@/data"
import { accentClasses } from "@/lib/accents"
import type { Accent } from "@/lib/accents"

/**
 * Gradienti di copertina per accent.
 * Devono essere classi statiche: Tailwind non risolve `from-accent-${x}`.
 */
const coverGradients: Record<Accent, string> = {
  primary: "from-accent-primary/35 via-accent-secondary/15 to-transparent",
  secondary: "from-accent-secondary/35 via-accent-primary/15 to-transparent",
  tertiary: "from-accent-tertiary/35 via-accent-primary/15 to-transparent",
}

export function Projects() {
  const github = socials.find((social) => social.label === "GitHub")

  return (
    <Section id="projects">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Progetti"
          title="Cose che ho costruito"
          description="Una selezione di lavori tra prodotti, side project e librerie open source."
        />

        {github && (
          <PillLink href={github.href} external className="group">
            <GithubIcon size={16} />
            Tutti i repository
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </PillLink>
        )}
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {projects.map((project) => {
          const accent = accentClasses[project.accent]

          return (
            <SurfaceCard
              key={project.slug}
              as="article"
              interactive
              className={cn(
                "flex flex-col",
                project.featured && "md:col-span-2 md:flex-row"
              )}
            >
              {/* Copertina: gradiente brand + alone accent (nessuna immagine caricata) */}
              <div
                className={cn(
                  "relative h-36 shrink-0 overflow-hidden border-b border-glass-border",
                  project.featured && "md:h-auto md:w-72 md:border-b-0 md:border-r"
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    coverGradients[project.accent]
                  )}
                />
                <div
                  className={cn(
                    "absolute -right-8 -bottom-12 h-40 w-40 rounded-full blur-[70px]",
                    accent.glow
                  )}
                />
                <span className="absolute top-4 left-4 rounded-full border border-glass-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground backdrop-blur-md">
                  {project.year}
                </span>
              </div>

              {/* Contenuto */}
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3
                    className={cn(
                      "font-medium tracking-tight text-foreground transition-colors",
                      project.featured ? "text-xl md:text-2xl" : "text-lg"
                    )}
                  >
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>

                  <span className={cn("text-xs whitespace-nowrap", accent.text)}>
                    {project.role}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <TagList items={project.tags} className="mt-5" />

                {/* Link: z-10 per restare cliccabili sopra l'overlay del titolo */}
                {(project.href ?? project.repo) && (
                  <div className="relative z-10 mt-5 flex items-center gap-4 pt-1">
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ExternalLink size={14} />
                        Vedi il progetto
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <GithubIcon size={14} />
                        Codice
                      </a>
                    )}
                  </div>
                )}
              </div>
            </SurfaceCard>
          )
        })}
      </div>
    </Section>
  )
}
