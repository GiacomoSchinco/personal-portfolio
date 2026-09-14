import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ReactLenis } from "lenis/react"
import type { LenisOptions } from "lenis"
import "./index.css"
import App from "./App.tsx"

/**
 * Scroll fluido con inerzia (Lenis), per tutto il sito.
 *
 * `anchors: true` è quello che sostituisce `scroll-behavior: smooth`, tolto da
 * `index.css`: Lenis intercetta i link interni (`href="#..."`) e rispetta lo
 * `scroll-margin-top` che `Section` imposta, quindi l'atterraggio sotto la
 * navbar resta quello di prima.
 *
 * Due comportamenti contano e sono già attivi di default, da **non**
 * disattivare:
 *
 * - `respectReducedMotion: true` → con `prefers-reduced-motion` annulla
 *   l'inerzia e rende istantanei gli scorrimenti programmatici (AGENTS §6.4);
 * - `autoRaf: true` → Lenis guida il proprio `requestAnimationFrame`; il
 *   binding React lo imposta da sé.
 *
 * Sta qui e non in `App.tsx` perché con `root` il componente non aggiunge
 * nessun nodo al DOM: fornisce solo il contesto con l'istanza, che `useLenis()`
 * legge da qualsiasi componente (a `MobileMenu` serve per fermarla).
 */
const lenisOptions: LenisOptions = {
  anchors: true,
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactLenis root options={lenisOptions}>
      <App />
    </ReactLenis>
  </StrictMode>,
)
