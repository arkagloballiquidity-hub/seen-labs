import { PageHero } from '../components/ui/PageHero'
import { CasesSection } from '../components/sections/CasesSection'
import { TeamSection } from '../components/sections/TeamSection'

export function CasosPage() {
  return (
    <>
      <PageHero
        label="Casos de Éxito"
        title="Resultados reales, no promesas."
        subtitle="Negocios que salieron de la oscuridad con un sistema digital construido en 7 días."
      />
      <CasesSection hideHero />
      <TeamSection />
    </>
  )
}
