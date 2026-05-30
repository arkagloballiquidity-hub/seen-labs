import { motion } from 'framer-motion'
import { steps } from '../../data/steps'

export function SystemSection() {
  return (
    <section id="sistema" style={{ background: 'var(--dark)' }}>
      <div className="container mx-auto max-w-[1100px]">
        <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}>
          The System
        </motion.span>
        <motion.h2
          className="mb-16"
          style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--white)' }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}
        >
          From zero to <span className="text-accent-gradient">out of the dark</span><br />in 7 business days.
        </motion.h2>

        <div className="flex flex-col max-w-[780px] mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="flex items-start gap-6 py-6"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              {/* Step number */}
              <div
                className="flex items-center justify-center flex-shrink-0 relative"
                style={{
                  minWidth: 56, height: 56,
                  border: step.highlight ? 'none' : '1px solid rgba(155,92,246,0.35)',
                  background: step.highlight ? 'var(--purple)' : 'transparent',
                  boxShadow: step.highlight ? '0 0 24px var(--purple-glow)' : 'none',
                  fontFamily: 'Sora, sans-serif', fontSize: '1.1rem', fontWeight: 800,
                  color: step.highlight ? '#fff' : 'var(--purple)',
                }}
              >
                {step.num}
                {i < steps.length - 1 && (
                  <div
                    className="absolute -bottom-[25px] left-1/2 -translate-x-1/2"
                    style={{ width: 1, height: 25, background: 'linear-gradient(to bottom, rgba(155,92,246,0.4), transparent)' }}
                  />
                )}
              </div>
              {/* Content */}
              <div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--white)', marginBottom: 4 }}>{step.title}</div>
                <div style={{ fontSize: '0.85rem', color: step.highlight ? 'var(--purple)' : 'var(--mid-gray)', fontWeight: step.highlight ? 600 : 400 }}>{step.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
