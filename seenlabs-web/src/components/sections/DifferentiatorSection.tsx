import { motion } from 'framer-motion'

const DIFFERENTIATORS = [
  {
    title: 'Velocidad sin compromisos',
    description: '7 días hábiles de entrega no es un truco de marketing. Es el resultado de un proceso de producción en sprint que hemos probado y perfeccionado en más de 20 proyectos.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Todo en un solo equipo',
    description: 'Web + IA + Anuncios + Automatización. No necesitas contratar 4 agencias distintas ni coordinar freelancers. Un equipo, un sistema, un resultado.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M4.93 19.07L7.05 16.95M16.95 7.05L19.07 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Resultados medibles',
    description: 'Cada proyecto incluye métricas de conversión claras. No entregamos un sitio web bonito; entregamos un sistema con KPIs definidos y herramientas para monitorearlos.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 18L9 12L13 16L21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Alineación de incentivos',
    description: 'En el plan Partner Light, nuestros ingresos crecen con los tuyos. No tenemos razón para construir algo que no funcione — nuestro éxito depende directamente del tuyo.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
]

export function DifferentiatorSection() {
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
          <div className="section-label">Por qué Seen Labs</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: 600,
          }}>
            No somos una agencia más.
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 1,
          background: 'rgba(255,255,255,0.04)',
        }}>
          {DIFFERENTIATORS.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                padding: '48px 40px',
                background: 'var(--black)',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--carbon)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--black)')}
            >
              <div style={{
                color: 'var(--purple)',
                marginBottom: 20,
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(123,97,255,0.08)',
                border: '1px solid rgba(123,97,255,0.2)',
              }}>
                {d.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-sub)',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 12,
                letterSpacing: '-0.01em',
              }}>
                {d.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-muted)' }}>
                {d.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .differentiator-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
