import { motion } from 'framer-motion'
import { STEPS } from '../../data/steps'

export function SystemSection() {
  return (
    <section id="system" className="section" style={{ background: 'var(--black)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            El Sistema
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 16,
          }}>
            Del cero al sistema en{' '}
            <span className="text-chrome">7 días</span>.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>
            Nuestro proceso probado que convierte tu visión en un sistema digital funcional.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 1,
          background: 'rgba(255,255,255,0.04)',
        }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
              style={{
                padding: '32px 28px',
                background: step.highlight ? 'rgba(123,97,255,0.06)' : 'var(--black)',
                border: step.highlight ? '1px solid rgba(123,97,255,0.2)' : '1px solid transparent',
                position: 'relative',
              }}
            >
              {step.highlight && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'linear-gradient(90deg, var(--purple), #a855f7)',
                }} />
              )}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 800,
                color: step.highlight ? 'rgba(123,97,255,0.4)' : 'rgba(255,255,255,0.05)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: 12,
              }}>
                {step.num}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-sub)',
                fontSize: 14,
                fontWeight: 700,
                color: step.highlight ? 'var(--purple)' : 'var(--text-primary)',
                marginBottom: 8,
                letterSpacing: '0.02em',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: 13,
                lineHeight: 1.65,
                color: 'var(--text-muted)',
              }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
