import type { ReactNode } from "react"
import { ArrowUpRight, ExternalLink, X } from "lucide-react"
import { cn } from "cn"
import { Section } from "@/components/custom/Section"
import { SectionHeading } from "@/components/custom/SectionHeading"
import { SurfaceCard } from "@/components/custom/SurfaceCard"
import { MicroLabel } from "@/components/custom/MicroLabel"
import { BulletList } from "@/components/custom/BulletList"
import { TagList } from "@/components/custom/Chip"
import { PillLink } from "@/components/custom/PillLink"
import { GithubIcon } from "@/components/custom/BrandIcons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { projects, socials } from "@/data"
import type { Project, ProjectImage } from "@/data"
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

/** Classi condivise dai link esterni (card e modale). */
const linkClass =
  "inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"

/** Blocco del modale: titoletto + contenuto. */
function DetailSection({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <section>
      <h4>
        <MicroLabel>{label}</MicroLabel>
      </h4>
      <div className="mt-3">{children}</div>
    </section>
  )
}

/**
 * Galleria immagini del modale.
 *
 * Con una sola immagine la mostra a tutta larghezza: in mezza colonna sarebbe
 * una miniatura illeggibile. E nessun ritaglio — qui `object-cover` taglierebbe
 * pezzi di interfaccia dagli screenshot. Le proporzioni naturali vanno bene
 * perché il modale scorre.
 */
function DetailGallery({ images }: { images: ProjectImage[] }) {
  return (
    <div className={cn("grid gap-3", images.length > 1 && "sm:grid-cols-2")}>
      {images.map((image) => (
        <figure
          key={image.src}
          className="self-start overflow-hidden rounded-xl border border-glass-border bg-glass-bg"
        >
          <img src={image.src} alt={image.alt} loading="lazy" className="w-full" />
          {image.caption && (
            <figcaption className="px-3 py-2 text-xs text-brand-text-muted">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

/**
 * Link esterni del progetto, condivisi tra card e modale.
 * Oggi nessun progetto ne ha: appena ne aggiungi uno in `projects.ts` compare
 * in entrambi i posti da solo.
 */
function ProjectLinks({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  if (!project.href && !project.repo) return null

  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer noopener"
          className={linkClass}
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
          className={linkClass}
        >
          <GithubIcon size={14} />
          Codice
        </a>
      )}
    </div>
  )
}

/**
 * Bottone "Dettagli" + modale.
 *
 * Il modale è quello di shadcn/Base UI, che porta con sé focus trap, chiusura
 * con ESC, ripristino del focus e blocco dello scroll: non va reimplementato.
 *
 * Niente `backdrop-filter` sul pannello: è già l'overlay a sfocare il fondo,
 * e il pannello deve restare leggibile più che trasparente.
 */
function ProjectDetailsDialog({ project }: { project: Project }) {
  const accent = accentClasses[project.accent]
  const details = project.details
  const images = project.media?.gallery ?? []

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        Dettagli
        <ArrowUpRight size={14} />
      </DialogTrigger>

      {/* `showCloseButton={false}` + bottone nostro: quello generato da shadcn
          annuncia "Close" agli screen reader, ed è l'unico testo non in
          italiano del sito. Il resto del comportamento (focus trap, ESC,
          ripristino del focus) resta di Base UI.

          `data-lenis-prevent`: il pannello ha uno scroll interno
          (`overflow-y-auto`) e senza l'attributo Lenis intercetterebbe la
          rotella, muovendo la pagina sotto il modale invece del contenuto. */}
      <DialogContent
        showCloseButton={false}
        data-lenis-prevent
        className="max-h-[85vh] gap-0 overflow-y-auto p-0 sm:max-w-2xl"
      >
        {/* Intestazione con lo stesso gradiente della copertina: il modale
            sembra la card che si è aperta, non un pannello estraneo. */}
        <div className="relative overflow-hidden border-b border-glass-border px-6 pt-8 pb-6">
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              coverGradients[project.accent]
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              "absolute -right-10 -bottom-20 h-48 w-48 rounded-full blur-[80px]",
              accent.glow
            )}
          />

          <div className="relative">
            <MicroLabel tone="accent">{project.year}</MicroLabel>
            <DialogTitle className="mt-2 text-xl font-medium tracking-tight text-foreground md:text-2xl">
              {project.title}
            </DialogTitle>
            {/* `DialogDescription` non è decorativo: senza, Base UI avvisa in
                console che il dialog non ha una descrizione accessibile. */}
            <DialogDescription className="mt-1 text-sm text-muted-foreground">
              {project.role}
              {project.company ? ` · ${project.company}` : ""}
            </DialogDescription>
          </div>
        </div>

        <div className="flex flex-col gap-6 px-6 py-6">
          {details?.context && (
            <DetailSection label="Il contesto">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {details.context}
              </p>
            </DetailSection>
          )}

          {!!details?.contributions?.length && (
            <DetailSection label="Cosa ho fatto">
              <BulletList items={details.contributions} dot={accent.dot} />
            </DetailSection>
          )}

          {!!details?.decisions?.length && (
            <DetailSection label="Perché queste scelte">
              <BulletList items={details.decisions} dot={accent.dot} />
            </DetailSection>
          )}

          {!!details?.facts?.length && (
            <DetailSection label="In sintesi">
              {/* Una colonna sul telefono, due da `sm` in su.

                  Due colonne fisse su 326px di modale lasciano ~108px di testo
                  per cella, e un codice come il numero di brevetto — un token
                  senza spazi — non ci sta: il `min-width: auto` delle griglie
                  lo fa uscire dal riquadro. È lo stesso bug dell'email in
                  "Chi sono" (TROUBLESHOOTING §10), in un altro vestito.

                  I riquadri restano 2 o 4, così su due colonne la riga è
                  sempre piena — vedi `ProjectFact` in `projects.ts`. */}
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {details.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="min-w-0 rounded-xl border border-glass-border bg-glass-bg px-3 py-2.5"
                  >
                    <dt className="text-xs text-brand-text-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium break-words text-foreground">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </DetailSection>
          )}

          <DetailSection label="Ambiti e tecnologie">
            <TagList items={project.tags} />
          </DetailSection>

          {/*
            Le immagini stanno in FONDO, dopo ogni blocco di testo, non in
            testa. Sotto l'intestazione si leggevano come un hero del modale e
            il pannello sembrava una figura con qualche didascalia, invece di
            un racconto con le prove in coda.

            È anche l'unico ordine che regge quando i testi non ci sono ancora:
            con `Immagini` prima di `Ambiti`, un progetto senza `context` (come
            Puntocyber oggi) apriva comunque su una fotografia a tutta
            larghezza. Le sezioni vuote spariscono, quindi l'unico blocco
            sempre presente è questo elenco di tecnologie: mettere le immagini
            dopo è l'unico modo di garantire che non finiscano mai in cima.
          */}
          {images.length > 0 && (
            <DetailSection label="Immagini">
              <DetailGallery images={images} />
            </DetailSection>
          )}

          {(details?.note || project.href || project.repo) && (
            <div className="flex flex-col gap-3 border-t border-glass-border pt-5">
              {details?.note && (
                <p className="text-xs leading-relaxed text-brand-text-muted">
                  {details.note}
                </p>
              )}
              <ProjectLinks project={project} />
            </div>
          )}
        </div>
        <DialogClose
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-2 right-2"
            />
          }
        >
          <X />
          <span className="sr-only">Chiudi</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export function Projects() {
  const github = socials.find((social) => social.label === "GitHub")

  return (
    <Section id="projects">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Progetti"
          title="Dal prototipo al prodotto"
          description="Alcuni dei progetti su cui ho lavorato nel tempo."
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
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  )
}

/**
 * Card di un progetto.
 *
 * Locale e non esportata: è il layout di questa sezione, non un componente
 * riutilizzabile, quindi non ha niente a che fare con `custom/`. Sta fuori dal
 * `map()` perché novanta righe di JSX dentro un `.map()` nascondono com'è fatta
 * la griglia — stessa scelta già fatta per `ProjectDetailsDialog`.
 */
function ProjectCard({ project }: { project: Project }) {
  const accent = accentClasses[project.accent]
  const cover = project.media?.cover

  /**
   * Con un'immagine la copertina ha bisogno di altezza.
   *
   * La banda fissa da 144px su una card larga ~600px è un rapporto
   * 4:1: `object-cover` ridurrebbe una foto a una striscia. Le
   * proporzioni 16:10 valgono 380px, abbastanza per far vedere
   * qualcosa. Senza immagine il gradiente è solo decorativo e 144px
   * bastano — anzi, di più sarebbe spazio vuoto.
   *
   * Su desktop le card in evidenza tengono la copertina come colonna
   * laterale: lì l'altezza la detta la card, quindi `md:aspect-auto`.
   */
  const coverBox = project.featured
    ? [
      "md:w-72 md:border-b-0 md:border-r",
      cover ? "aspect-[16/10] md:aspect-auto" : "h-36",
    ]
    : [cover ? "aspect-[16/10]" : "h-36"]

  return (
    <SurfaceCard
      as="article"
      interactive
      className={cn(
        "flex flex-col",
        project.featured && "md:col-span-2 md:flex-row"
      )}
    >
      {/* Copertina: l'immagine se c'è, altrimenti il gradiente brand */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden border-b border-glass-border",
          coverBox
        )}
      >
        {cover ? (
          <>
            {/* `alt` vuoto di proposito: il titolo è nella card accanto,
                quindi l'immagine è decorativa e non va annunciata due
                volte agli screen reader. */}
            <img
              src={cover.src}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Velo: senza, il badge dell'anno è illeggibile su una
                schermata chiara. */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/25 to-transparent" />
          </>
        ) : (
          <>
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
          </>
        )}
        <span className="absolute top-4 left-4 rounded-full border border-glass-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground backdrop-blur-md">
          {project.year}
        </span>
      </div>

      {/* Contenuto */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {/* `flex-wrap` e niente `whitespace-nowrap` sull'etichetta.
            Un ruolo lungo ("Ideatore e titolare del brevetto") non
            stava accanto al titolo, e siccome `SurfaceCard` ha
            `overflow-hidden` veniva tagliato invece di andare a capo. */}
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
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

          <span className={cn("text-xs", accent.text)}>{project.role}</span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <TagList items={project.tags} className="mt-5" />

        {/* Azioni: z-10 per restare cliccabili sopra l'overlay del
            titolo, quando la card è un link. */}
        <div className="relative z-10 mt-5 flex flex-wrap items-center gap-4 pt-1">
          <ProjectDetailsDialog project={project} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </SurfaceCard>
  )
}
