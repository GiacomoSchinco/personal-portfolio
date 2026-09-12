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
      <div className="min-h-screen bg-background text-foreground">
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