import { Suspense, lazy, useRef } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ButtonLink } from "@/components/custom/ButtonLink"
import { StatusDot } from "@/components/custom/StatusDot"
import { site } from "@/data"

/**
 * Lo sfondo WebGL si carica a richiesta, non insieme alla pagina.
 *
 * `three` pesa più di tutto il resto del sito messo insieme ed è anche la
 * parte meno urgente: è una decorazione dietro al testo. Importandolo in cima
 * al file finiva nel bundle iniziale, quindi il browser doveva scaricarlo e
 * analizzarlo **prima** di disegnare il titolo.
 *
 * Con `lazy` Vite lo sposta in un chunk separato: la pagina si disegna subito,
 * le stelle arrivano un istante dopo. Non si vede nessun lampo, perché dietro
 * c'è già `bg-background`: al massimo il cielo si accende dopo.
 *
 * Il `.then()` non è pignoleria: il modulo esporta `StarfieldBackground` come
 * export **nominato**, mentre `lazy` si aspetta `{ default }`. Senza il
 * rimpacchettamento React riceve `undefined` e la scena non si monta, in
 * silenzio.
 */
const StarfieldBackground = lazy(() =>
  import("@/components/three/StarfieldBackground").then((module) => ({
    default: module.StarfieldBackground,
  }))
)

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      /*
        Tutti i reveal usano `fromTo` e non `from`.

        `from` ricava il valore finale leggendo lo stato corrente dell'elemento:
        con StrictMode l'effetto gira due volte, e se il primo passaggio lascia
        i valori di partenza ancora scritti addosso all'elemento, la seconda
        tween li registra come valori di arrivo. Risultato: la tween va da 0 a 0
        e l'elemento resta invisibile per sempre — è quello che succedeva ai CTA
        (`opacity: 0` in linea, pulsanti cliccabili ma non visibili).

        Con `fromTo` partenza e arrivo sono entrambi espliciti: la tween non
        dipende da quello che trova nell'elemento.
      */
      tl.fromTo(
        "[data-hero-badge]",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          "[data-hero-line]",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.1 },
          "-=0.25"
        )
        .fromTo(
          "[data-hero-copy]",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-cta]",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
          "-=0.4"
        )

      /*
        Nessun tween su `[data-hero-meta]`: la riga "luogo" non sta più nella
        Hero, la località si legge in Contatti. Un tween che cerca un elemento
        che non esiste non fa danni, ma GSAP avvisa in console a ogni
        caricamento — ed è rumore che nasconde i problemi veri.
      */
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      {/*
        Sfondo: campo stellato.

        Il `Suspense` serve solo a dire a React che può disegnare il resto della
        Hero mentre il chunk di `three` sta ancora arrivando: senza, l'intera
        sezione resterebbe sospesa e la pagina apparirebbe vuota fino alla fine
        del download.
      */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <StarfieldBackground count={2000} />
        </Suspense>
      </div>

      {/*
        Velo: serviva a scurire un fondo chiaro e rendere leggibile il testo,
        quando lo sfondo della Hero era il `MeshGradient` (poi rimosso dal
        progetto). Con il campo stellato lo sfondo è già scuro, quindi il velo
        resta solo in basso per fondere la Hero nella sezione successiva.
      */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-24">
        <div className="max-w-3xl">
          {/* Stato di disponibilità */}
          <div
            data-hero-badge
            className="glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5"
          >
            <StatusDot />
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

          {/*
            Call to action.

            `transition-colors` sostituisce il `transition-all` di base dei
            bottoni (`cn` scarta il conflitto): GSAP anima `transform` e
            `opacity`, e una transizione CSS sulle stesse proprietà riscrive a
            ogni frame ciò che l'animazione ha appena impostato.
          */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink
              data-hero-cta
              href="#projects"
              size="lg"
              className="h-11 rounded-full px-6 transition-colors"
            >
              Guarda i progetti
              <ArrowRight data-icon="inline-end" />
            </ButtonLink>

            <ButtonLink
              data-hero-cta
              href="#contact"
              variant="outline"
              size="lg"
              className="h-11 rounded-full px-6 backdrop-blur-md transition-colors"
            >
              Parliamone
              <ArrowUpRight data-icon="inline-end" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}