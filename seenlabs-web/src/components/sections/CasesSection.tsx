import { motion } from 'framer-motion'
import { cases } from '../../data/cases'
import { CaseCard } from '../ui/CaseCard'

export function CasesSection() {
  return (
    <section id="casos" style={{ background: 'var(--dark)' }}>
      <div className="container mx-auto max-w-[1100px]">
        <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}>
          Our Work
        </motion.span>
        <motion.h2
          className="mb-16"
          style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--white)' }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}
        >
          Results that <span className="text-accent-gradient">speak for themselves.</span>
        </motion.h2>
        <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {cases.map((study, i) => (
            <motion.div key={study.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <CaseCard study={study} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
