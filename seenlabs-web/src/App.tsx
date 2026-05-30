import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LoadingScreen } from './components/LoadingScreen'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/sections/HeroSection'
import { ManifestoSection } from './components/sections/ManifestoSection'
import { ProblemSection } from './components/sections/ProblemSection'
import { SolutionSection } from './components/sections/SolutionSection'
import { SystemSection } from './components/sections/SystemSection'
import { PricingSection } from './components/sections/PricingSection'
import { DifferentiatorSection } from './components/sections/DifferentiatorSection'
import { GuaranteeSection } from './components/sections/GuaranteeSection'
import { CasesSection } from './components/sections/CasesSection'
import { TeamSection } from './components/sections/TeamSection'
import { FAQSection } from './components/sections/FAQSection'
import { FinalCTASection } from './components/sections/FinalCTASection'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <ManifestoSection />
            <ProblemSection />
            <SolutionSection />
            <SystemSection />
            <PricingSection />
            <DifferentiatorSection />
            <GuaranteeSection />
            <CasesSection />
            <TeamSection />
            <FAQSection />
            <FinalCTASection />
          </main>
        </>
      )}
    </>
  )
}
