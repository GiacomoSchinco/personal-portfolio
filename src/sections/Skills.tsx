import { Section } from "@/components/custom/Section"
import { SectionHeading } from "@/components/custom/SectionHeading"
import {
  CardCarousel,
  type CarouselCardData,
} from "@/components/custom/CardCarousel"
import { skillGroups } from "@/data"

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
      <SectionHeading
        eyebrow="Competenze"
        title="Gli strumenti con cui lavoro ogni giorno"
        description="Non è un elenco di loghi: sotto ogni gruppo c'è quello che so farci davvero."
      />

      <CardCarousel cards={cards} label="Competenze" className="mt-12" />
    </Section>
  )
}
