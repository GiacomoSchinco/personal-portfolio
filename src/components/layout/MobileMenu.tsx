import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import type { NavLink } from "@/data"
import { MicroLabel } from "@/components/custom/MicroLabel"

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  links: NavLink[]
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLLIElement[]>([])
  const ctaRef = useRef<HTMLAnchorElement>(null)

  // Blocco scroll body
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // ESC per chiudere
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Animazione apertura
  useGSAP(
    () => {
      if (!open) return

      const tl = gsap.timeline()

      tl.from(menuRef.current, {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.6,
        ease: "power3.inOut",
      })
        .from(
          linksRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        )
    },
    { dependencies: [open], scope: menuRef }
  )

  if (!open) return null

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-[60] bg-background md:hidden"
      style={{ clipPath: "circle(150% at 100% 0%)" }}
    >
      {/* Sfondo brand: base + aloni accent (palette "Aurora notturna") */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
      <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-accent-primary/25 blur-[120px]" />
      <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent-secondary/20 blur-[120px]" />

      {/* Contenuto */}
      <div className="relative flex h-full flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <MicroLabel>Menu</MicroLabel>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass-bg text-foreground backdrop-blur-md transition-colors hover:bg-glass-bg-strong"
            aria-label="Chiudi menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Link */}
        <ul className="mt-16 flex flex-col gap-2">
          {links.map((link, i) => (
            <li
              key={link.href}
              ref={(el) => {
                if (el) linksRef.current[i] = el
              }}
            >
              <a
                href={link.href}
                onClick={onClose}
                className="group flex items-baseline gap-4 py-3 text-4xl font-medium tracking-tight text-foreground transition-colors hover:text-accent-tertiary"
              >
                <span className="text-xs font-medium text-accent-primary">
                  0{i + 1}
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA in fondo */}
        <a
          ref={ctaRef}
          href="#contact"
          onClick={onClose}
          className="mt-auto flex items-center justify-center rounded-full border border-accent-primary/35 bg-accent-primary/15 px-6 py-4 text-base font-medium text-foreground backdrop-blur-md transition-colors hover:border-accent-primary/60 hover:bg-accent-primary/25"
        >
          Parliamone
        </a>
      </div>
    </div>
  )
}