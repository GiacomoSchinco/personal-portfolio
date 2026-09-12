import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

type MeshGradientProps = {
  color1?: string
  color2?: string
  color3?: string
  color4?: string
  speed?: number
  softness?: number
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
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform float uSpeed;
  uniform float uSoftness;

  varying vec2 vUv;

  // Hash per noise
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)),
             dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453123) * 2.0 - 1.0;
  }

  // Noise morbido
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

  // FBM con ampiezza che cala dolcemente
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency);
      frequency *= 1.7;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    // Coordinate centrate, aspect ratio compensato
    vec2 uv = (vUv - 0.5) * vec2(1.6, 1.0);

    // Tempo molto lento per movimento da "nuvola"
    float t = uTime * 0.08 * uSpeed;

    // Tre blob indipendenti che fluttuano in direzioni diverse
    // Blob 1: si muove in alto-destra
    vec2 p1 = uv + vec2(t * 0.3, sin(t) * 0.2);
    float blob1 = fbm(p1 * 1.2 + vec2(0.0, 0.0));

    // Blob 2: si muove in basso-sinistra
    vec2 p2 = uv + vec2(-t * 0.2, cos(t * 0.8) * 0.25);
    float blob2 = fbm(p2 * 1.5 + vec2(5.2, 1.3));

    // Blob 3: si muove in alto-sinistra
    vec2 p3 = uv + vec2(-t * 0.25, sin(t * 1.2) * 0.15);
    float blob3 = fbm(p3 * 1.0 + vec2(1.7, 9.2));

    // Blob 4: si muove in basso-destra
    vec2 p4 = uv + vec2(t * 0.15, cos(t * 0.6) * 0.3);
    float blob4 = fbm(p4 * 1.8 + vec2(8.3, 2.8));

    // Normalizza i blob in [0, 1]
    blob1 = blob1 * 0.5 + 0.5;
    blob2 = blob2 * 0.5 + 0.5;
    blob3 = blob3 * 0.5 + 0.5;
    blob4 = blob4 * 0.5 + 0.5;

    // Ammorbidisci con smoothstep
    // uSoftness controlla quanto sono sfumati i bordi (0.1 = netti, 0.5 = molto soft)
    float s = uSoftness;
    blob1 = smoothstep(0.5 - s, 0.5 + s, blob1);
    blob2 = smoothstep(0.5 - s, 0.5 + s, blob2);
    blob3 = smoothstep(0.5 - s, 0.5 + s, blob3);
    blob4 = smoothstep(0.5 - s, 0.5 + s, blob4);

    // Mix dei colori: ogni blob "accende" il suo colore
    vec3 color = vec3(0.02, 0.02, 0.05); // base scura

    color = mix(color, uColor1, blob1 * 0.7);
    color = mix(color, uColor2, blob2 * 0.7);
    color = mix(color, uColor3, blob3 * 0.6);
    color = mix(color, uColor4, blob4 * 0.5);

    // Bagliore additivo per profondità
    color += uColor1 * blob1 * 0.15;
    color += uColor2 * blob2 * 0.15;
    color += uColor3 * blob3 * 0.1;
    color += uColor4 * blob4 * 0.1;

    // Vignettatura morbida
    float vignette = 1.0 - smoothstep(0.5, 1.3, length(uv));
    color *= mix(0.6, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`

function MeshGradientPlane({
  color1,
  color2,
  color3,
  color4,
  speed,
  softness,
}: MeshGradientProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(color1 || "#1e3a8a") },
      uColor2: { value: new THREE.Color(color2 || "#8b5cf6") },
      uColor3: { value: new THREE.Color(color3 || "#06b6d4") },
      uColor4: { value: new THREE.Color(color4 || "#f97316") },
      uSpeed: { value: speed ?? 1.0 },
      uSoftness: { value: softness ?? 0.25 },
    }),
    [color1, color2, color3, color4, speed, softness]
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

export function MeshGradient(props: MeshGradientProps) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <MeshGradientPlane {...props} />
    </Canvas>
  )
}