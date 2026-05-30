import { motion } from 'framer-motion'

export function PainSection() {
  return (
    <section style={{
      padding: '100px 0',
      background: 'var(--black)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Big background text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(80px, 15vw, 200px)',
        fontWeight: 800,
        letterSpacing: '-0.05em',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(255,255,255,0.03)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        OSCURIDAD
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            {/* Philosophy label */}
            <div style={{
              fontFamily: 'var(--font-sub)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--purple)',
              marginBottom: 32,
            }}>
              La filosofía
            </div>

            {/* Main pain statement */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4.5vw, 60px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: 24,
              color: 'var(--text-primary)',
            }}>
              La oscuridad es el
              <br />
              <span style={{ color: 'var(--text-dim)' }}>enemigo #1 de las ideas</span>
              <br />
              que cambian al mundo.
            </h2>
          </motion.div>

          {/* Pain divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              width: 80,
              height: 1,
              background: 'linear-gradient(90deg, transparent, var(--purple), transparent)',
              margin: '40px auto',
            }}
          />

          {/* B2B Pain Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              padding: '40px 48px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              position: 'relative',
            }}
          >
            {/* Left accent bar */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: 3,
              background: 'linear-gradient(180deg, var(--purple), transparent)',
            }} />

            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              fontWeight: 700,
              lineHeight: 1.4,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
              marginBottom: 8,
            }}>
              Los más exitosos no siempre son los mejores.
            </p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              fontWeight: 700,
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
              marginBottom: 28,
            }}>
              Son los que{' '}
              <span className="text-chrome">más exposición tienen</span>.
            </p>

            <p style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--text-muted)',
              maxWidth: 520,
              margin: '0 auto 32px',
            }}>
              Tu competidor con un producto inferior está ganando más que tú. No porque sea mejor. Porque lo ven. Seen Labs es tu puerta a la luz.
            </p>

            <a href="/precios" className="btn-primary" style={{ fontSize: 15 }}>
              Quiero ser visible
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
