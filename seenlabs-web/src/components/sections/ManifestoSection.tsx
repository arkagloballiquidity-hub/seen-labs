import { motion } from 'framer-motion'

const lines = [
  {
    num: '01',
    text: 'Cada negocio tiene algo real que ofrecer. El problema no es el producto. Es la invisibilidad.',
  },
  {
    num: '02',
    text: 'Un sistema digital bien construido no es un gasto. Es el activo más rentable que puedes tener.',
  },
  {
    num: '03',
    text: 'No necesitas más esfuerzo. Necesitas que tu esfuerzo sea visible, automatizado y escalable.',
  },
]

export function ManifestoSection() {
  return (
    <section id="manifesto" className="section" style={{ background: 'var(--carbon)' }}>
      <div className="container">
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">Manifiesto</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: 64,
            }}>
              Creemos en negocios que{' '}
              <span className="text-chrome">salen a la luz</span>.
            </h2>
          </motion.div>

          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 28,
                alignItems: 'start',
                paddingBottom: i < lines.length - 1 ? 40 : 0,
                marginBottom: i < lines.length - 1 ? 40 : 0,
                borderBottom: i < lines.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-sub)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'var(--purple)',
                paddingTop: 4,
              }}>
                {line.num}
              </span>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(18px, 2.2vw, 28px)',
                fontWeight: 600,
                lineHeight: 1.5,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
              }}>
                {line.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
