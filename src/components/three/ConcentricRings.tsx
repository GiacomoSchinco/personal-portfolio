import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

type RingsProps = {
  colorA?: string
  colorB?: string
  speed?: number
  ringDensity?: number
  ringWidth?: number
  centerX?: number
  centerY?: number
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uSpeed;
  uniform float uRingDensity;
  uniform float uRingWidth;
  uniform vec2 uCenter;

  varying vec2 vUv;

  void main() {
    // Centro dello schermo, corretto per aspect ratio
    vec2 uv = vUv - uCenter;
    uv.x *= 1.6; // compensa l'aspect ratio orizzontale

    float dist = length(uv);

    // Anelli multipli sovrapposti a diverse frequenze
    float r1 = fract(dist * uRingDensity - uTime * uSpeed);
    float r2 = fract(dist * uRingDensity * 0.6 + uTime * uSpeed * 0.7);
    float r3 = fract(dist * uRingDensity * 1.4 - uTime * uSpeed * 1.3);

    // Smoothstep per bordi morbidi
    float w = uRingWidth;
    float ring1 = smoothstep(0.0, w, r1) * smoothstep(w * 2.0, w, r1);
    float ring2 = smoothstep(0.0, w, r2) * smoothstep(w * 2.0, w, r2);
    float ring3 = smoothstep(0.0, w, r3) * smoothstep(w * 2.0, w, r3);

    float rings = ring1 * 0.5 + ring2 * 0.3 + ring3 * 0.2;

    // Falloff: gli anelli sbiadiscono verso i bordi
    float falloff = 1.0 - smoothstep(0.1, 1.2, dist);
    rings *= falloff;

    // Colore base scuro con mix dei colori
    vec3 baseColor = mix(uColorA, uColorB, 0.15);
    vec3 ringColor = mix(uColorA, uColorB, rings);
    vec3 color = mix(baseColor, ringColor, rings);

    // Bagliore al centro
    float coreGlow = exp(-dist * 4.0) * 0.4;
    color += uColorB * coreGlow;

    gl_FragColor = vec4(color, 1.0);
  }
`

function RingsPlane({
  colorA,
  colorB,
  speed,
  ringDensity,
  ringWidth,
  centerX,
  centerY,
}: RingsProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(colorA || "#0a0a1f") },
      uColorB: { value: new THREE.Color(colorB || "#3b82f6") },
      uSpeed: { value: speed ?? 0.3 },
      uRingDensity: { value: ringDensity ?? 15.0 },
      uRingWidth: { value: ringWidth ?? 0.04 },
      uCenter: { value: new THREE.Vector2(centerX ?? 0.5, centerY ?? 0.5) },
    }),
    [colorA, colorB, speed, ringDensity, ringWidth, centerX, centerY]
  )

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta
    }
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export function ConcentricRings(props: RingsProps) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <RingsPlane {...props} />
    </Canvas>
  )
}