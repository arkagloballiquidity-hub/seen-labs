import { motion } from 'framer-motion'

export function GuaranteeSection() {
  return (
    <section className="section" style={{ background: 'var(--carbon)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: 800,
            margin: '0 auto',
            textAlign: 'center',
            padding: '60px 48px',
            background: 'rgba(123,97,255,0.04)',
            border: '1px solid rgba(123,97,255,0.2)',
            position: 'relative',
          }}
        >
          {/* Corner accents */}
          {[{ top: -1, left: -1 }, { top: -1, right: -1 }, { bottom: -1, left: -1 }, { bottom: -1, right: -1 }].map((style, i) => (
            <div key={i} style={{
              position: 'absolute',
              ...style,
              width: 20,
              height: 20,
              borderTop: i < 2 ? '2px solid var(--purple)' : 'none',
              borderBottom: i >= 2 ? '2px solid var(--purple)' : 'none',
              borderLeft: i % 2 === 0 ? '2px solid var(--purple)' : 'none',
              borderRight: i % 2 !== 0 ? '2px solid var(--purple)' : 'none',
            }} />
          ))}

          <div style={{
            fontFamily: 'var(--font-sub)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--purple)',
            marginBottom: 20,
          }}>
            Garantía
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 3.5vw, 44px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 20,
          }}>
            Si no cumple lo acordado,
            <br />
            <span className="text-chrome">lo arreglamos. Sin costo.</span>
          </h2>

          <p style={{
            fontSize: 16,
            lineHeight: 1.75,
            color: 'var(--text-muted)',
            maxWidth: 560,
            margin: '0 auto 32px',
          }}>
            Cada proyecto tiene un brief firmado con objetivos claros. Si al entregar el sistema no cumple con lo especificado, realizamos todas las correcciones necesarias sin costo adicional. Sin letra pequeña. Sin excusas.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {[
              { icon: '◎', label: 'Revisiones ilimitadas' },
              { icon: '◈', label: 'Brief firmado' },
              { icon: '⊕', label: 'Entrega garantizada' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--purple)', fontSize: 16 }}>{item.icon}</span>
                <span style={{ fontFamily: 'var(--font-sub)', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
