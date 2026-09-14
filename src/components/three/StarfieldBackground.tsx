import { useEffect, useRef } from "react"
import type { ReactNode, RefObject } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useIsMobile } from "@/hooks/useIsMobile"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { StarfieldParticles } from "./StarfieldParticles"

/**
 * Quanto si sposta la scena seguendo il puntatore, in unità di scena.
 * Con 0 la parallasse è disattivata.
 */
const PARALLAX_STRENGTH = 0.35

type Pointer = { x: number; y: number }

function ParallaxRig({
  pointer,
  enabled,
  children,
}: {
  pointer: RefObject<Pointer>
  enabled: boolean
  children: ReactNode
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group || !enabled) return

    // Easing indipendente dal framerate: senza questo a 120 Hz la scena
    // inseguirebbe il puntatore il doppio più veloce che a 60 Hz.
    const ease = 1 - Math.pow(0.001, delta)
    const targetX = pointer.current.x * -PARALLAX_STRENGTH
    const targetY = pointer.current.y * PARALLAX_STRENGTH

    group.position.x += (targetX - group.position.x) * ease
    group.position.y += (targetY - group.position.y) * ease
  })

  return <group ref={groupRef}>{children}</group>
}

type StarfieldBackgroundProps = {
  /** Numero di particelle su desktop. Su mobile viene ridotto a un quarto. */
  count?: number
}

/**
 * Campo stellato pronto da usare come sfondo di una sezione.
 *
 * `StarfieldParticles` è un oggetto di scena (restituisce `<points>`), quindi
 * va montato dentro un `<Canvas>`: questo wrapper se ne occupa, così nella
 * sezione basta mettere il componente, senza configurare un Canvas in linea.
 *
 * `alpha: true` è voluto: lo sfondo del Canvas resta trasparente, così si vede
 * il colore della sezione (`bg-background`) e le stelle rimangono chiare.
 * Con `alpha: false` bisognerebbe disegnare un clear color a mano.
 */
export function StarfieldBackground({ count = 2000 }: StarfieldBackgroundProps) {
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const pointer = useRef<Pointer>({ x: 0, y: 0 })

  useEffect(() => {
    if (reducedMotion) return

    function onPointerMove(event: PointerEvent) {
      // Da -0.5 (angolo in alto a sinistra) a +0.5 (in basso a destra).
      pointer.current.x = event.clientX / window.innerWidth - 0.5
      pointer.current.y = event.clientY / window.innerHeight - 0.5
    }

    // `passive` perché non chiamiamo preventDefault: evita di bloccare lo scroll.
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    return () => window.removeEventListener("pointermove", onPointerMove)
  }, [reducedMotion])

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <ParallaxRig pointer={pointer} enabled={!reducedMotion}>
        <StarfieldParticles count={isMobile ? Math.round(count / 4) : count} />
      </ParallaxRig>
    </Canvas>
  )
}
