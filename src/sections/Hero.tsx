import { useRef } from "react"
import { ArrowRight, ArrowUpRight, Download, MapPin } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ButtonLink } from "@/components/custom/ButtonLink"
import { StarfieldBackground } from "@/components/three/StarfieldBackground"
import { site } from "@/data"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from("[data-hero-badge]", { y: 16, opacity: 0, duration: 0.6 })
        .from(
          "[data-hero-line]",
          { yPercent: 110, duration: 0.9, stagger: 0.1 },
          "-=0.25"
        )
        .from("[data-hero-copy]", { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(
          "[data-hero-cta]",
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 },
          "-=0.4"
        )
        .from(
          "[data-hero-meta]",
          { y: 14, opacity: 0, duration: 0.5, stagger: 0.06 },
          "-=0.35"
        )
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* Sfondo: campo stellato */}
      <div className="absolute inset-0 z-0">
        <StarfieldBackground count={2000} />
      </div>

      {/*
        Velo: con il MeshGradient serviva a scurire un fondo chiaro e rendere
        leggibile il testo. Con il campo stellato lo sfondo è già scuro, quindi
        il velo resta solo in basso per fondere la Hero nella sezione successiva.
      */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-24">
        <div className="max-w-3xl">
          {/* Stato di disponibilità */}
          <div
            data-hero-badge
            className="glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-tertiary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-tertiary" />
            </span>
            <span className="text-xs text-muted-foreground">
              {site.availabilityLabel}
            </span>
          </div>

          {/* Titolo con reveal a maschera */}
          <h1 className="mt-6 text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block">
                Ciao, sono {site.name}.
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span
                data-hero-line
                className="block bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary bg-clip-text text-transparent"
              >
                {site.role}.
              </span>
            </span>
          </h1>

          <p
            data-hero-copy
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {site.tagline}
          </p>

          {/* Call to action */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink
              data-hero-cta
              href="#projects"
              size="lg"
              className="h-11 rounded-full px-6"
            >
              Guarda i progetti
              <ArrowRight data-icon="inline-end" />
            </ButtonLink>

            <ButtonLink
              data-hero-cta
              href="#contact"
              variant="outline"
              size="lg"
              className="h-11 rounded-full px-6 backdrop-blur-md"
            >
              Parliamone
              <ArrowUpRight data-icon="inline-end" />
            </ButtonLink>
          </div>

          {/* Meta: luogo + CV */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span data-hero-meta className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-accent-tertiary" />
              {site.location}
            </span>

            <a
              data-hero-meta
              href={site.cvHref}
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Download size={16} className="text-accent-tertiary" />
              Scarica il CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}