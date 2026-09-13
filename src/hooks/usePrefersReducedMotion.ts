import { useEffect, useState } from "react"

/**
 * `true` se l'utente ha chiesto di ridurre le animazioni a livello di sistema.
 *
 * Va rispettato per qualsiasi movimento **continuo o automatico**: rotazioni
 * dello sfondo, parallasse, autoplay di un carosello. Non per le transizioni
 * innescate da un'azione dell'utente (un hover, un click).
 *
 * Vedi AGENTS.md §6.4.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(query.matches)

    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return reduced
}
