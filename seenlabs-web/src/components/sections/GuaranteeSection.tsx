import { motion } from 'framer-motion'

export function GuaranteeSection() {
  return (
    <section className="section" style={{ background: 'var(--carbon)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.04)' }}>

          {/* Left: main guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            style={{
              padding: '56px 48px',
              background: 'var(--carbon)',
              position: 'relative',
            }}
          >
            {/* Corner accents */}
            {[{ top: 0, left: 0 }, { top: 0, right: 0 }, { bottom: 0, left: 0 }, { bottom: 0, right: 0 }].map((style, i) => (
              <div key={i} style={{
                position: 'absolute',
                ...style,
                width: 20,
                height: 20,
                borderTop: i < 2 ? '2px solid rgba(123,97,255,0.4)' : 'none',
                borderBottom: i >= 2 ? '2px solid rgba(123,97,255,0.4)' : 'none',
                borderLeft: i % 2 === 0 ? '2px solid rgba(123,97,255,0.4)' : 'none',
                borderRight: i % 2 !== 0 ? '2px solid rgba(123,97,255,0.4)' : 'none',
              }} />
            ))}

            <div className="section-label">Nuestra Garantía</div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 3vw, 40px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: 20,
            }}>
              Si no te gusta lo que hacemos,
              <br />
              <span className="text-chrome">recuperas el 100%.</span>
            </h2>

            <p style={{
              fontSize: 15,
              lineHeight: 1.75,
              color: 'var(--text-muted)',
              marginBottom: 32,
              maxWidth: 420,
            }}>
              Cada proyecto tiene un brief firmado con objetivos claros. Si al entregar el sistema no cumple lo acordado, hacemos todas las correcciones necesarias sin costo extra.
            </p>

            <p style={{
              fontSize: 15,
              lineHeight: 1.75,
              color: 'var(--text-muted)',
              marginBottom: 36,
              maxWidth: 420,
            }}>
              Y si al cliente no le convence el camino, tiene <strong style={{ color: 'var(--text-primary)' }}>7 días de devolución 100% garantizada</strong> — respaldada por Hotmart y firmada en contrato.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[
                { icon: '◎', label: 'Brief firmado' },
                { icon: '◈', label: 'Revisiones ilimitadas' },
                { icon: '⊕', label: '7 días cashback' },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: 13,
                }}>
                  <span style={{ color: 'var(--purple)' }}>{item.icon}</span>
                  <span style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Hotmart badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              padding: '56px 48px',
              background: 'rgba(123,97,255,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              borderLeft: '1px solid rgba(123,97,255,0.15)',
            }}
          >
            {/* Hotmart logo area */}
            <div style={{
              padding: '20px 28px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 2,
              marginBottom: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              {/* Hotmart-style badge */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF6B35, #FF3A5C)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 20px rgba(255,58,92,0.3)',
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.5 7.5L18 8.3L14 12.2L14.9 18L10 15.3L5.1 18L6 12.2L2 8.3L7.5 7.5L10 2Z" fill="white" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-sub)', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                  Hotmart
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.03em' }}>
                  Plataforma de respaldo de pago
                </div>
              </div>
            </div>

            {/* Big number */}
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(64px, 8vw, 100px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'var(--purple)',
              textShadow: '0 0 40px rgba(123,97,255,0.3)',
              marginBottom: 8,
            }}>
              7
            </div>
            <div style={{
              fontFamily: 'var(--font-sub)',
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 16,
            }}>
              días de devolución total
            </div>
            <p style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: 'var(--text-muted)',
              maxWidth: 360,
            }}>
              Hotmart garantiza el reembolso del 100% en los primeros 7 días. Sin preguntas, sin procesos complicados. Porque confiamos tanto en nuestro trabajo que lo respaldamos con su prestigio.
            </p>

            <div style={{
              marginTop: 28,
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              width: '100%',
            }}>
              <div style={{
                fontFamily: 'var(--font-sub)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
              }}>
                Nuestro diferenciador frente a todos los demás
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .guarantee-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
