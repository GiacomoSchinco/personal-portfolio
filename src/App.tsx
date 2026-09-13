import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Hero } from "@/sections/Hero"
import { About } from "@/sections/About"
import { Skills } from "@/sections/Skills"
import { Projects } from "@/sections/Projects"
import { Experience } from "@/sections/Experience"
import { Contact } from "@/sections/Contact"

function App() {
  return (
    <TooltipProvider>
      {/*
        `overflow-x-clip` è una guardia, non una decorazione.

        Gli aloni decorativi sporgono di proposito fuori dalla sezione (es.
        SectionGlow in About, a -left-32 = -128px). Se nessun antenato li taglia,
        il documento diventa più largo della viewport: su mobile il browser
        rimpicciolisce e ricentra tutto il layout, e la pagina sembra "storta".

        Si usa `clip` e NON `hidden`: `overflow-x: hidden` con `overflow-y:
        visible` viene forzato dal browser a `auto`, crea un contenitore di
        scroll e può rompere scroll fluido e `position: sticky`. `clip` taglia
        senza creare un contesto di scroll.

        Gli elementi `position: fixed` (Navbar, MobileMenu) NON vengono tagliati:
        il loro containing block è la viewport, non questo div.
      */}
      <div className="min-h-screen overflow-x-clip bg-background text-foreground">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <Footer />

        <Toaster />
      </div>
    </TooltipProvider>
  )
}

export default App