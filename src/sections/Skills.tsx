import { Section } from "@/components/custom/Section"
import { SectionHeading } from "@/components/custom/SectionHeading"
import { SectionGlow } from "@/components/custom/SectionGlow"
import { SurfaceCard } from "@/components/custom/SurfaceCard"
import { MicroLabel } from "@/components/custom/MicroLabel"
import {
  CardCarousel,
  type CarouselCardData,
} from "@/components/custom/CardCarousel"
import { method, skillGroups } from "@/data"

/** Adatta i gruppi di competenze al formato richiesto dal carosello. */
const cards: CarouselCardData[] = skillGroups.map((group, index) => ({
  id: group.title,
  subtitle: `${String(index + 1).padStart(2, "0")} / ${String(skillGroups.length).padStart(2, "0")}`,
  title: group.title,
  description: group.description,
  icon: group.icon,
  tags: group.skills,
}))

/**
 * Le competenze sono presentate come carosello 3D: una card per gruppo.
 *
 * Nota sulle performance: le card del carosello NON usano `backdrop-filter`.
 * Otto card impilate nella stessa area sarebbero otto layer da comporre a
 * ogni frame, ed è il caso peggiore per `backdrop-filter` (tutte sovrapposte,
 * in movimento). La profondità qui la dà la prospettiva (scale + rotateY),
 * non la sfocatura.
 */
export function Skills() {
  return (
    <Section id="skills">
      {/*
        L'alone va DIETRO la card del metodo, altrimenti il suo `glass-panel`
        non ha niente da sfocare e risulta identico a una superficie piatta:
        `backdrop-filter` agisce su ciò che sta dietro l'elemento, e su un
        fondo uniforme non produce nulla di visibile. Vedi AGENTS.md §5.3.
      */}
      <SectionGlow accent="primary" className="right-0 bottom-16" />

      <SectionHeading
        eyebrow="Competenze"
        title="Gli strumenti con cui lavoro ogni giorno"
        description="Non è un elenco di loghi: sotto ogni gruppo c'è quello che so farci davvero."
      />

      <CardCarousel cards={cards} label="Competenze" className="mt-12" />

      {/*
        Metodo: come usa l'AI.
        `variant="glass"` funziona solo grazie all'alone qui sopra: senza,
        sarebbe indistinguibile dalla variante `flat`.
      */}
      <SurfaceCard variant="glass" glow className="mt-16 p-6 md:p-8">
        <h3>
          <MicroLabel tone="accent">{method.title}</MicroLabel>
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {method.intro}
        </p>

        <ul className="mt-6 flex flex-col gap-5">
          {method.points.map((point) => (
            <li key={point.lead}>
              <p className="text-sm font-medium text-foreground">
                {point.lead}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {point.text}
              </p>
            </li>
          ))}
        </ul>
      </SurfaceCard>
    </Section>
  )
}
