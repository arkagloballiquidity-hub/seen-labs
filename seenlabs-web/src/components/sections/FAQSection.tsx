import { useState } from 'react'
import { motion } from 'framer-motion'
import { faq } from '../../data/faq'
import { FAQItem } from '../ui/FAQItem'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" style={{ background: 'var(--dark)' }}>
      <div className="container mx-auto max-w-[1100px]">
        <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}>
          Common Questions
        </motion.span>
        <motion.h2
          className="mb-16"
          style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--white)' }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}
        >
          Before you <span className="text-accent-gradient">ask.</span>
        </motion.h2>

        <div className="max-w-[760px] mx-auto">
          {faq.map((entry, i) => (
            <FAQItem
              key={entry.id}
              entry={entry}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
