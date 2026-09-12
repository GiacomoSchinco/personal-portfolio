import { Section } from "@/components/custom/Section"
import { SectionHeading } from "@/components/custom/SectionHeading"
import { SurfaceCard } from "@/components/custom/SurfaceCard"
import { IconTile } from "@/components/custom/IconTile"
import { TagList } from "@/components/custom/Chip"
import { skillGroups } from "@/data"

/**
 * Nota sulle performance: qui NON usiamo `backdrop-filter`.
 * Le card e i chip sono superfici semitrasparenti con lo stesso colore del
 * vetro (`bg-glass-bg` + `border-glass-border`) ma senza blur.
 *
 * Perché: la sfocatura è costosa e su uno sfondo piatto non si vede comunque.
 * Con 8 card e ~40 chip sarebbero decine di layer da comporre a ogni scroll.
 * Il vetro vero (`.glass-panel`, `.glass-chip`) resta dove ha senso: navbar,
 * badge della Hero e card "Chi sono", che hanno un gradiente dietro.
 *
 * In pratica: `SurfaceCard` (variante `flat`, che è il default) e `Chip`
 * non applicano blur. Per averlo serve `variant="glass"`.
 */
export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Competenze"
        title="Gli strumenti con cui lavoro ogni giorno"
        description="Non è un elenco di loghi: sotto ogni gruppo c'è quello che so farci davvero."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <SurfaceCard
            key={group.title}
            as="article"
            interactive
            className="flex flex-col p-5"
          >
            <IconTile icon={group.icon} variant="tinted" />

            <h3 className="mt-4 text-base font-medium text-foreground">
              {group.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {group.description}
            </p>

            <TagList items={group.skills} className="mt-4" />
          </SurfaceCard>
        ))}
      </div>
    </Section>
  )
}
