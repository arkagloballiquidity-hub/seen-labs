import { PageHero } from '../components/ui/PageHero'
import { PricingSection } from '../components/sections/PricingSection'
import { GuaranteeSection } from '../components/sections/GuaranteeSection'

export function PreciosPage() {
  return (
    <>
      <PageHero
        label="Precios"
        title="Inversión, no gasto."
        subtitle="Cada plan incluye todo lo que necesitas para salir a la luz y generar resultados reales en 15 días hábiles."
      />
      <PricingSection hideHero />
      <GuaranteeSection />
    </>
  )
}
