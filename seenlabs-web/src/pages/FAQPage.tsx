import { PageHero } from '../components/ui/PageHero'
import { FAQSection } from '../components/sections/FAQSection'

export function FAQPage() {
  return (
    <>
      <PageHero
        label="FAQ"
        title="Preguntas que te estás haciendo."
        subtitle="Resolvemos las dudas más comunes antes de que empieces el camino."
      />
      <FAQSection hideHero />
    </>
  )
}
