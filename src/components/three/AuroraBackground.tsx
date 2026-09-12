import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

type AuroraProps = {
  colorA?: string
  colorB?: string
  speed?: number
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

  varying vec2 vUv;

  // Funzione di rumore pseudo-casuale
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)),
             dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  // Noise di Perlin semplificato
  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;

    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;

    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(
      dot(a, hash(i)),
      dot(b, hash(i + o)),
      dot(c, hash(i + 1.0))
    );

    return dot(n, vec3(70.0));
  }

  // Fractal Brownian Motion per il fluido
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;

    // Distorsione del dominio: crea il movimento fluido
    vec2 q = vec2(
      fbm(uv + uTime * 0.1 * uSpeed),
      fbm(uv + vec2(5.2, 1.3) + uTime * 0.1 * uSpeed)
    );

    vec2 r = vec2(
      fbm(uv + 4.0 * q + vec2(1.7, 9.2) + uTime * 0.15 * uSpeed),
      fbm(uv + 4.0 * q + vec2(8.3, 2.8) + uTime * 0.15 * uSpeed)
    );

    float f = fbm(uv + 4.0 * r);

    // Mix dei colori basato sul rumore
    vec3 color = mix(uColorA, uColorB, clamp(f * 0.5 + 0.5, 0.0, 1.0));

    // Aggiungi profondità con il secondo strato
    color = mix(color, uColorA * 0.5, clamp(length(q), 0.0, 1.0));
    color = mix(color, uColorB * 0.8, clamp(r.x, 0.0, 1.0));

    // Vignettatura: scurisce i bordi
    float vignette = smoothstep(0.9, 0.2, length(uv - 0.5));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`

function AuroraPlane({ colorA, colorB, speed }: AuroraProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(colorA || "#1e3a8a") },
      uColorB: { value: new THREE.Color(colorB || "#f97316") },
      uSpeed: { value: speed ?? 1.0 },
    }),
    [colorA, colorB, speed]
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

export function AuroraBackground(props: AuroraProps) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <AuroraPlane {...props} />
    </Canvas>
  )
}