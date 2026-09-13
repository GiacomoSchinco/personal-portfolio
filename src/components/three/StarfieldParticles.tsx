import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

type Props = { count?: number }

/* ------------------------------------------------------------------ */
/* Regolazioni — cambia qui, non nel JSX                               */
/* ------------------------------------------------------------------ */

/** Accenti del brand in esadecimale (WebGL non legge le variabili CSS). */
const ACCENTS = ["#3b5bff", "#8b5cf6", "#22d3ee"]

/**
 * Percentuale di stelle colorate con un accento.
 * 0.15 ≈ una su sette. Alzala per più colore, metti 0 per il bianco puro.
 */
const TINTED_RATIO = 0.15

/** Quante stelle grandi e luminose compongono il secondo strato. */
const BRIGHT_COUNT = 120

/** Dimensione dei punti, in unità di scena. */
const SIZE_MAIN = 0.045
const SIZE_BRIGHT = 0.1

/** Lato in px della texture della stella. Più alta = bordo più morbido. */
const SPRITE_SIZE = 64

/*
 * Due strati invece di uno.
 *
 * `pointsMaterial` ha una sola `size`: per avere stelle di dimensioni diverse
 * servirebbe uno shader custom. Con due `<points>` separati — molte piccole e
 * deboli, poche grandi e luminose — si ottiene lo stesso effetto a costo
 * praticamente nullo. Ruotano a velocità diverse, quindi la differenza di
 * velocità crea anche parallasse tra i due livelli.
 */

const WHITE = new THREE.Color("#ffffff")
const TINTS = ACCENTS.map((hex) => new THREE.Color(hex))

/**
 * Texture circolare con caduta morbida, generata a runtime.
 *
 * ⚠️ Serve perché `gl_PointSize` disegna **quadrati pieni**: è così che
 * funzionano i punti in WebGL, non esiste un'opzione "cerchio". Mappando una
 * texture radiale sul punto, il quadrato diventa un cerchio che sfuma verso il
 * bordo — cioè una stella accesa, non un pixel quadrato.
 *
 * Il bianco pieno sta solo al centro, poi la caduta fa il resto: è quella
 * parte a dare l'alone, che è ciò che rende le stelle credibili.
 *
 * Generarla qui evita di aggiungere un file immagine al progetto.
 */
function createStarTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = SPRITE_SIZE
  canvas.height = SPRITE_SIZE

  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  const r = SPRITE_SIZE / 2
  const gradient = ctx.createRadialGradient(r, r, 0, r, r, r)
  gradient.addColorStop(0, "rgba(255,255,255,1)")
  gradient.addColorStop(0.35, "rgba(255,255,255,0.85)")
  gradient.addColorStop(0.7, "rgba(255,255,255,0.2)")
  gradient.addColorStop(1, "rgba(255,255,255,0)")

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/** Genera posizioni, colori e luminosità per uno strato di stelle. */
function makeField(count: number, spread: number, minBrightness: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread

    const base =
      Math.random() < TINTED_RATIO
        ? TINTS[Math.floor(Math.random() * TINTS.length)]
        : WHITE

    // Luminosità diversa per ogni stella: è questa che dà profondità al campo.
    const brightness = minBrightness + Math.random() * (1 - minBrightness)

    colors[i * 3] = base.r * brightness
    colors[i * 3 + 1] = base.g * brightness
    colors[i * 3 + 2] = base.b * brightness
  }

  return { positions, colors }
}

export function StarfieldParticles({ count = 2000 }: Props) {
  const reducedMotion = usePrefersReducedMotion()
  const mainRef = useRef<THREE.Points>(null)
  const brightRef = useRef<THREE.Points>(null)

  // Il campo principale arriva a stelle molto deboli (0.15), quello luminoso no.
  const main = useMemo(() => makeField(count, 15, 0.15), [count])
  const bright = useMemo(() => makeField(BRIGHT_COUNT, 13, 0.7), [])
  const sprite = useMemo(() => createStarTexture(), [])

  useFrame((_, delta) => {
    // Con "riduci animazioni" attivo lo sfondo resta fermo.
    if (reducedMotion) return

    if (mainRef.current) {
      mainRef.current.rotation.y += delta * 0.05
      mainRef.current.rotation.x += delta * 0.02
    }

    // Il secondo strato ruota più lentamente: la differenza di velocità tra i
    // due livelli è ciò che crea la sensazione di profondità.
    if (brightRef.current) {
      brightRef.current.rotation.y += delta * 0.025
      brightRef.current.rotation.x += delta * 0.01
    }
  })

  return (
    <group>
      <points ref={mainRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[main.positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[main.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          map={sprite}
          size={SIZE_MAIN}
          sizeAttenuation
          transparent
          // Senza `depthWrite: false` le stelle si nasconderebbero a vicenda
          // invece di sommarsi.
          depthWrite={false}
          // `AdditiveBlending`: le stelle che si sovrappongono si sommano e
          // diventano più luminose, come farebbe la luce vera.
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={brightRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[bright.positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[bright.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          map={sprite}
          size={SIZE_BRIGHT}
          sizeAttenuation
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
