import { Briefcase, GraduationCap, MapPin } from "lucide-react"
import { cn } from "cn"
import { Section } from "@/components/custom/Section"
import { SectionHeading } from "@/components/custom/SectionHeading"
import { MicroLabel } from "@/components/custom/MicroLabel"
import { TagList } from "@/components/custom/Chip"
import { experiences } from "@/data"

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Esperienze"
        title="Il percorso fin qui"
        description="Ruoli, progetti e formazione, dal più recente al più lontano."
      />

      <ol className="relative mt-14 border-l border-glass-border">
        {experiences.map((item) => {
          const Icon = item.type === "work" ? Briefcase : GraduationCap

          return (
            <li key={`${item.company}-${item.period}`} className="relative pb-12 pl-8 last:pb-0">
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
                    item.current ? "bg-accent-tertiary" : "bg-muted-foreground/50"
                  )}
                />
              </span>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <MicroLabel tone="accent">{item.period}</MicroLabel>
                {item.current && (
                  <span className="rounded-full border border-accent-tertiary/30 bg-accent-tertiary/10 px-2 py-0.5 text-xs text-accent-tertiary">
                    in corso
                  </span>
                )}
              </div>

              <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground">
                {item.role}
              </h3>

              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Icon size={15} className="text-accent-tertiary" />
                  {item.company}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={15} />
                  {item.location}
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              <TagList items={item.tags} className="mt-4" />
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
