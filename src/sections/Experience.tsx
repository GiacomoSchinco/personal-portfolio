import { Briefcase, GraduationCap, MapPin } from "lucide-react"
import { cn } from "cn"
import { Section } from "@/components/custom/Section"
import { SectionHeading } from "@/components/custom/SectionHeading"
import { MicroLabel } from "@/components/custom/MicroLabel"
import { TagList } from "@/components/custom/Chip"
import { experienceGroups } from "@/data"
import type { ExperienceItem } from "@/data"

function TimelineItem({ item }: { item: ExperienceItem }) {
  const Icon = item.type === "work" ? Briefcase : GraduationCap
  const isTech = item.field === "tech"

  return (
    <li className="relative pb-12 pl-8 last:pb-0">
      {/* Indicatore sulla linea */}
      <span
        className={cn(
          "absolute top-0.5 -left-[9px] flex h-4 w-4 items-center justify-center rounded-full border",
          item.current
            ? "animate-pulse border-accent-tertiary/60 bg-accent-tertiary/20"
            : "border-glass-border bg-background"
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            item.current
              ? "bg-accent-tertiary"
              : isTech
                ? "bg-accent-primary/70"
                : "bg-muted-foreground/40"
          )}
        />
      </span>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <MicroLabel tone={isTech ? "accent" : "muted"}>{item.period}</MicroLabel>
        {item.current && (
          <span className="rounded-full border border-accent-tertiary/30 bg-accent-tertiary/10 px-2 py-0.5 text-xs text-accent-tertiary">
            in corso
          </span>
        )}
      </div>

      <h4 className="mt-2 text-lg font-medium tracking-tight text-foreground">
        {item.role}
      </h4>

      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Icon
            size={15}
            className={isTech ? "text-accent-tertiary" : "text-muted-foreground"}
          />
          {item.company}
        </span>
        {/* `location` è facoltativo: il CV non indica la sede delle aziende */}
        {item.location && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={15} />
            {item.location}
          </span>
        )}
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>

      {item.highlights && (
        <ul className="mt-4 flex max-w-2xl flex-col gap-2">
          {item.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "mt-2 h-1 w-1 shrink-0 rounded-full",
                  isTech ? "bg-accent-primary/60" : "bg-muted-foreground/40"
                )}
              />
              {highlight}
            </li>
          ))}
        </ul>
      )}

      <TagList items={item.tags} className="mt-4" />
    </li>
  )
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Esperienze"
        title="Il percorso fin qui"
        description="Dieci anni di lavoro, non tutti nello sviluppo. Li ho divisi in due: prima ciò che riguarda software e prodotto, poi quello che c'era prima."
      />

      <div className="mt-14 flex flex-col gap-16">
        {experienceGroups.map((group) => (
          <div key={group.id}>
            <h3 className="text-xl font-medium tracking-tight text-foreground">
              {group.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {group.description}
            </p>

            <ol className="relative mt-8 border-l border-glass-border">
              {group.items.map((item) => (
                <TimelineItem key={`${item.company}-${item.period}`} item={item} />
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Section>
  )
}
