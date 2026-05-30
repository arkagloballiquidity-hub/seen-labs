import { motion } from 'framer-motion'
import { PILLARS } from '../../data/pillars'

export function SolutionSection() {
  return (
    <section id="solution" className="section" style={{ background: 'var(--carbon)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'start',
        }}>
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-label">La Solución</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: 24,
            }}>
              Un sistema digital{' '}
              <span className="text-chrome">completo</span>{' '}
              que trabaja por ti.
            </h2>
            <p style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--text-muted)',
              marginBottom: 32,
            }}>
              No vendemos páginas web. Construimos sistemas de conversión: la web, el embudo, los anuncios y la automatización, todos conectados y optimizados para vender.
            </p>
            <a href="#" className="btn-primary">
              Ver Precios
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          {/* Right: Pillars grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 20px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(255,255,255,0.01)',
                  cursor: 'default',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(123,97,255,0.3)'
                  e.currentTarget.style.background = 'rgba(123,97,255,0.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.01)'
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-sub)',
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'var(--purple)',
                  letterSpacing: '0.1em',
                  minWidth: 24,
                }}>
                  {pillar.num}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'var(--font-sub)',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: 2,
                  }}>
                    {pillar.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
                    {pillar.subtitle}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #solution .container > div,
          section[id] .container > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  )
}
