export { site, navLinks, socials } from "./site"
export type { NavLink, Social } from "./site"

export { about } from "./about"
export type { Stat } from "./about"

export { skillGroups } from "./skills"
export type { SkillGroup } from "./skills"

export { projects } from "./projects"
export type { Project } from "./projects"

export { experienceGroups } from "./experience"
export type { ExperienceItem, ExperienceGroup } from "./experience"

// I tipi di stile vivono in `@/lib`: i componenti non devono dipendere da `@/data`.
export { accentClasses } from "@/lib/accents"
export type { Accent } from "@/lib/accents"
export type { IconType } from "@/lib/icons"
