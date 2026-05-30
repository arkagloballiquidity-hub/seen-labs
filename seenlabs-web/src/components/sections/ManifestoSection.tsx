import { motion } from 'framer-motion'

const lines = [
  {
    num: '01',
    title: 'No es falta de talento.',
    text: 'Negocios brillantes fracasan cada día porque nadie los ve. No porque su producto sea malo — sino porque están en la oscuridad digital mientras su competencia, con la mitad de calidad, acapara el mercado.',
  },
  {
    num: '02',
    title: 'Un sistema digital bien construido no es un gasto.',
    text: 'Es el activo más rentable que tu negocio puede tener. Una máquina que trabaja mientras duermes, que califica leads automáticamente, que vende antes de que hables con el cliente.',
  },
  {
    num: '03',
    title: 'No necesitas más tiempo. Necesitas un sistema.',
    text: 'De 0 a fuera de la oscuridad en 7 días hábiles. Esa es nuestra promesa, nuestra garantía y nuestra forma de penetrar el mercado: precios muy por debajo, soluciones 100,000 veces por encima.',
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
              <span className="text-chrome">salen a la luz.</span>
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
                flexShrink: 0,
              }}>
                {line.num}
              </span>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(17px, 1.8vw, 22px)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                  marginBottom: 10,
                }}>
                  {line.title}
                </h3>
                <p style={{
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: 'var(--text-muted)',
                }}>
                  {line.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
