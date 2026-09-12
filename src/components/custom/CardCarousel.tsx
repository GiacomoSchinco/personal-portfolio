import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { cn } from "cn"
import { useIsMobile } from "@/hooks/useIsMobile"
import type { IconType } from "@/lib/icons"
import { MicroLabel } from "./MicroLabel"
import { TagList } from "./Chip"

export type CarouselCardData = {
  id: string
  title: string
  /** Riga piccola sopra il titolo (es. "01 / 08"). */
  subtitle?: string
  description: string
  icon?: IconType
  /** Immagine di copertina, opzionale. */
  image?: string
  tags?: string[]
}

type CardCarouselProps = {
  cards: CarouselCardData[]
  autoPlay?: boolean
  autoPlayDelay?: number
  className?: string
  /** Etichetta letta dagli screen reader. */
  label?: string
}

type CardConfig = {
  x: number
  rotateY: number
  scale: number
  opacity: number
  zIndex: number
}

/** Spostamento orizzontale per livello di distanza dal centro. */
const X_DESKTOP = [0, 200, 340, 450]
const X_MOBILE = [0, 110, 190, 240]
const ROTATE_Y = [0, 15, 25, 30]
const SCALE = [1, 0.85, 0.7, 0.6]
const OPACITY = [1, 0.6, 0.3, 0]
const Z_INDEX = [30, 20, 10, 0]

/** Quanti px di trascinamento servono per cambiare card. */
const DRAG_THRESHOLD = 50
/** Blocco anti-rimbalzo per la rotella: un gesto = una card. */
const WHEEL_LOCK_MS = 450

function getCardConfig(offset: number, isMobile: boolean): CardConfig {
  const level = Math.min(Math.abs(offset), 3)
  const sign = Math.sign(offset)

  return {
    x: sign * (isMobile ? X_MOBILE : X_DESKTOP)[level],
    rotateY: -sign * ROTATE_Y[level],
    scale: SCALE[level],
    opacity: OPACITY[level],
    zIndex: Z_INDEX[level],
  }
}

/**
 * Accorcia l'offset alla distanza più breve, rendendo il carosello infinito.
 *
 * Senza questo l'indice gira (`% total`) ma l'offset no: passando dall'ultima
 * card alla prima, la card 0 avrebbe offset -7 e rientrerebbe dal lato sbagliato
 * (o sarebbe già fuori schermo), dando l'impressione che il carosello riparta
 * da capo. Riportando l'offset in [-total/2, +total/2] è sempre la card più
 * vicina a essere usata, quindi la rotazione è continua nei due sensi.
 */
function wrappedOffset(index: number, activeIndex: number, total: number) {
  const raw = index - activeIndex
  const half = total / 2

  if (raw > half) return raw - total
  if (raw < -half) return raw + total
  return raw
}

/**
 * Carosello 3D a schede, navigabile con trascinamento, rotella, click sui
 * dot e frecce della tastiera.
 *
 * ⚠️ REGOLA IMPORTANTE — chi possiede il `transform`:
 * GSAP scrive `x`, `rotateY`, `scale` e `opacity` direttamente sullo stile
 * dell'elemento. Se anche la prop `style` di React scrivesse quelle stesse
 * proprietà, a ogni render React sovrascriverebbe i valori appena impostati
 * dall'animazione e il movimento non si vedrebbe (le card salterebbero al
 * risultato finale). Per questo la `style` contiene SOLO `transformStyle`.
 *
 * Nota: `z-index` non è animabile e non si interpola. Va impostato con
 * `gsap.set()`, non con `to()`.
 */
export function CardCarousel({
  cards,
  autoPlay = false,
  autoPlayDelay = 4000,
  className,
  label = "Carosello",
}: CardCarouselProps) {
  const isMobile = useIsMobile()
  const [activeIndex, setActiveIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const dragStartX = useRef(0)
  const dragDelta = useRef(0)
  const isPointerDown = useRef(false)
  const wheelLocked = useRef(false)

  // Letto una volta sola: la preferenza non cambia durante la sessione.
  const reduceMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  const total = cards.length

  // Autoplay
  useEffect(() => {
    if (!autoPlay || total < 2) return

    const id = setInterval(
      () => setActiveIndex((i) => (i + 1) % total),
      autoPlayDelay
    )
    return () => clearInterval(id)
  }, [autoPlay, autoPlayDelay, total])

  // Posizionamento: GSAP è l'unico proprietario di transform e opacity.
  useGSAP(
    () => {
      const duration = reduceMotion.current ? 0 : 0.7

      cardRefs.current.forEach((card, index) => {
        if (!card) return

        const config = getCardConfig(
          wrappedOffset(index, activeIndex, total),
          isMobile
        )

        // z-index si imposta, non si anima.
        gsap.set(card, { zIndex: config.zIndex })

        gsap.to(card, {
          x: config.x,
          rotateY: config.rotateY,
          scale: config.scale,
          opacity: config.opacity,
          duration,
          ease: "power3.out",
          overwrite: "auto",
        })
      })
    },
    { dependencies: [activeIndex, isMobile], scope: containerRef }
  )

  if (total === 0) return null

  function step(direction: 1 | -1) {
    setActiveIndex((i) => (i + direction + total) % total)
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (total < 2) return
    isPointerDown.current = true
    dragStartX.current = e.clientX
    dragDelta.current = 0
    // Con il capture il rilascio arriva anche se esci dall'elemento.
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isPointerDown.current) return
    dragDelta.current = e.clientX - dragStartX.current
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!isPointerDown.current) return
    isPointerDown.current = false

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }

    if (Math.abs(dragDelta.current) < DRAG_THRESHOLD) return
    step(dragDelta.current > 0 ? -1 : 1)
  }

  /**
   * Il click arriva DOPO il pointerup, quindi non si può usare un flag
   * "sto trascinando" (sarebbe già false). Si guarda di quanto ci si è
   * spostati: sotto la soglia è un click, sopra è un trascinamento.
   */
  function handleCardClick(index: number) {
    if (Math.abs(dragDelta.current) >= DRAG_THRESHOLD) return
    setActiveIndex(index)
  }

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (total < 2) return
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    if (Math.abs(e.deltaX) < 20) return
    // Un solo gesto sul trackpad genera decine di eventi: senza lock si
    // salterebbero 3-4 card in una volta.
    if (wheelLocked.current) return

    wheelLocked.current = true
    step(e.deltaX > 0 ? 1 : -1)
    window.setTimeout(() => {
      wheelLocked.current = false
    }, WHEEL_LOCK_MS)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (total < 2) return
    if (e.key === "ArrowRight") {
      e.preventDefault()
      step(1)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      step(-1)
    }
  }

  return (
    <div
      ref={containerRef}
      role="group"
      aria-roledescription="carosello"
      aria-label={label}
      tabIndex={0}
      className={cn(
        "relative flex h-[460px] w-full touch-pan-y items-center justify-center overflow-hidden rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      style={{ perspective: "1500px" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
    >
      {cards.map((card, index) => {
        const distance = Math.abs(wrappedOffset(index, activeIndex, total))
        // Le card lontane sono invisibili: toglile agli screen reader.
        const hidden = distance > 2
        const isActive = index === activeIndex

        return (
          <div
            key={card.id}
            ref={(el) => {
              cardRefs.current[index] = el
            }}
            aria-hidden={hidden}
            onClick={() => handleCardClick(index)}
            className={cn(
              // `transition-colors` non tocca opacity né transform, quindi
              // non entra in conflitto con le animazioni GSAP.
              "absolute flex h-[400px] w-[280px] cursor-pointer flex-col rounded-2xl border p-6 transition-colors duration-500 md:w-[300px]",
              // Solo la card centrale è piena: le laterali restano traslucide
              // così si legge che stanno "dietro".
              isActive
                ? "border-white/20 bg-card"
                : "border-glass-border bg-glass-bg"
            )}
            // Solo proprietà statiche: transform e opacity sono di GSAP.
            style={{ transformStyle: "preserve-3d" }}
          >
            {card.image && (
              <div
                className="mb-4 h-40 w-full rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${card.image})` }}
              />
            )}

            {card.icon && (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10">
                <card.icon size={18} className="text-accent-primary" />
              </span>
            )}

            {card.subtitle && (
              <MicroLabel className="mt-4">{card.subtitle}</MicroLabel>
            )}

            <h3 className="mt-2 text-xl font-medium tracking-tight text-foreground">
              {card.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {card.description}
            </p>

            {card.tags && <TagList items={card.tags} className="mt-4" />}
          </div>
        )
      })}

      {/* Indicatori di posizione. `z-40` li tiene sopra le card: queste ultime
          ricevono z-index fino a 30 da GSAP e con la prospettiva possono
          estendersi oltre il proprio box, coprendo i dot. */}
      <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-2">
        {cards.map((card, index) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Vai a ${card.title}`}
            aria-current={index === activeIndex}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === activeIndex
                ? "w-8 bg-accent-primary"
                : "w-1.5 bg-brand-text-muted hover:bg-muted-foreground"
            )}
          />
        ))}
      </div>
    </div>
  )
}
