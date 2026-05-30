import { motion } from 'framer-motion'
import { PROBLEMS } from '../../data/problems'

export function ProblemSection() {
  return (
    <section className="section" style={{ background: 'var(--black)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <div className="section-label">El Problema</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: 640,
          }}>
            ¿Por qué tu negocio sigue{' '}
            <span style={{ color: 'var(--text-dim)' }}>en la oscuridad</span>?
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 1,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.04)',
        }}>
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{
                padding: '40px 36px',
                background: 'var(--black)',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--carbon)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--black)')}
            >
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 22,
                color: 'rgba(123,97,255,0.5)',
                marginBottom: 16,
              }}>
                {p.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-sub)',
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 10,
                letterSpacing: '-0.01em',
              }}>
                {p.title}
              </h3>
              <p style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: 'var(--text-muted)',
              }}>
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
