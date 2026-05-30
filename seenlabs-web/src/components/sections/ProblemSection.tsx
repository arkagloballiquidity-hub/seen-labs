import { motion } from 'framer-motion'
import { problems } from '../../data/problems'
import { ProblemCard } from '../ui/ProblemCard'

export function ProblemSection() {
  return (
    <section id="problema" style={{ background: 'var(--dark)' }}>
      <div className="container mx-auto max-w-[1100px]">
        <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}>
          The Problem
        </motion.span>
        <motion.h2
          className="mb-16"
          style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--white)' }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}
        >
          You are not invisible because<br />you are not valuable.<br />
          <span className="text-accent-gradient">Your system is broken.</span>
        </motion.h2>
        <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {problems.map((card, i) => (
            <motion.div key={card.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: i * 0.08 }}>
              <ProblemCard card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
