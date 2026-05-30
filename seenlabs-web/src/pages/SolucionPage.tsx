import { PageHero } from '../components/ui/PageHero'
import { ProblemSection } from '../components/sections/ProblemSection'
import { SolutionSection } from '../components/sections/SolutionSection'
import { SystemSection } from '../components/sections/SystemSection'
import { DifferentiatorSection } from '../components/sections/DifferentiatorSection'

export function SolucionPage() {
  return (
    <>
      <PageHero
        label="La Solución"
        title="Del problema al sistema."
        subtitle="Entendemos por qué tu negocio no está creciendo — y sabemos exactamente cómo arreglarlo."
      />
      <ProblemSection />
      <SolutionSection />
      <SystemSection />
      <DifferentiatorSection />
    </>
  )
}
