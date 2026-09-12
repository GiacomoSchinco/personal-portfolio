import { useState, useRef } from "react"
import { Menu } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { MobileMenu } from "./MobileMenu"
import { navLinks, site } from "@/data"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      })
    },
    { scope: navRef }
  )

  return (
    <>
      <nav
        ref={navRef}
        className="glass-nav fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-auto flex min-h-[var(--nav-height)] max-w-7xl items-center justify-between px-6 py-3">
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-2 text-sm font-medium tracking-tight text-foreground"
            aria-label={`${site.name} — torna all'inizio`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-tertiary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-tertiary" />
            </span>
            {site.name}
          </a>

          {/* Link desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 scale-95 rounded-full bg-glass-bg opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA desktop */}
          <a
            href="#contact"
            className="group relative hidden overflow-hidden rounded-full border border-accent-primary/35 bg-accent-primary/10 px-5 py-2 text-sm text-foreground backdrop-blur-md transition-all hover:border-accent-primary/60 hover:bg-accent-primary/20 md:inline-block"
          >
            <span className="relative z-10">Parliamone</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass-bg text-foreground backdrop-blur-md transition-colors hover:bg-glass-bg-strong md:hidden"
            aria-label="Apri menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  )
}