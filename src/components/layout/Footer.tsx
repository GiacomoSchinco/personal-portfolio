import { ArrowUp } from "lucide-react"
import { MicroLabel } from "@/components/custom/MicroLabel"
import { PillLink } from "@/components/custom/PillLink"
import { SocialIcon, socialIcons } from "@/components/custom/SocialIcon"
import { navLinks, site, socials } from "@/data"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-glass-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Identità */}
          <div className="max-w-xs">
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-sm font-medium tracking-tight text-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-tertiary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-tertiary" />
              </span>
              {site.name}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {site.role} — {site.location}
            </p>
          </div>

          {/* Navigazione */}
          <nav aria-label="Navigazione del piè di pagina">
            <h2>
              <MicroLabel>Sezioni</MicroLabel>
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h2>
              <MicroLabel>Contatti</MicroLabel>
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {site.email}
                </a>
              </li>
              {socials
                .filter((social) => social.label in socialIcons)
                .map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <SocialIcon label={social.label} size={15} />
                      {social.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-glass-border pt-6">
          <p className="text-xs text-brand-text-muted">
            © {year} {site.fullName}. Tutti i diritti riservati.
          </p>

          <PillLink href="#top" size="sm">
            <ArrowUp size={14} />
            Torna su
          </PillLink>
        </div>
      </div>
    </footer>
  )
}
