import { motion } from 'framer-motion'
import { pricing } from '../../data/pricing'
import { PricingCard } from '../ui/PricingCard'

export function PricingSection() {
  return (
    <section id="paquetes" style={{ background: 'var(--dark-2)' }}>
      <div className="container mx-auto max-w-[1100px]">
        <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}>
          Choose Your Program
        </motion.span>
        <motion.h2
          className="mb-3"
          style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--white)' }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}
        >
          Investment in <span className="text-accent-gradient">visibility.</span>
        </motion.h2>
        <motion.p
          className="mb-16"
          style={{ fontSize: '1rem', color: 'var(--light-gray)', maxWidth: 560, lineHeight: 1.75 }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.1 }}
        >
          Three paths. One destination. Out of the dark.
        </motion.p>

        <div className="grid gap-[2px] items-stretch" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {pricing.map((plan, i) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
