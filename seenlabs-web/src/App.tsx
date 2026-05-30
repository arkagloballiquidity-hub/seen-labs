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
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
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
          </main>
          <FinalCTASection />
        </>
      )}
    </>
  )
}
