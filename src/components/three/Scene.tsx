import { Canvas } from "@react-three/fiber"
// import { StarfieldParticles } from "./StarfieldParticles"
// import { useIsMobile } from "@/hooks/useIsMobile"
import { AuroraBackground } from "./AuroraBackground"

export function Scene() {
  // const isMobile = useIsMobile()

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <ambientLight intensity={0.5} />
      <AuroraBackground colorA="#0f172a" colorB="#f97316" speed={0.8} />
      {/*<StarfieldParticles count={isMobile ? 500 : 2000} />*/}
    </Canvas>
  )
}