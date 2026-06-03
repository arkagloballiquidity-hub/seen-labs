import { motion } from 'framer-motion'
import { Marquee } from '../ui/Marquee'
import { NAV_LINKS } from '../../lib/constants'

export function FinalCTASection() {
  return (
    <footer style={{ background: 'var(--carbon)' }}>
      {/* Marquee band */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <Marquee />
      </div>

      {/* CTA section */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 680 }}>
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
            >
              <div className="section-label">El Camino</div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 72px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: 24,
              }}>
                Es hora de salir
                <br />
                <span className="text-chrome">de la oscuridad.</span>
              </h2>
              <p style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: 'var(--text-muted)',
                maxWidth: 480,
                marginBottom: 40,
              }}>
                Tu competencia ya está construyendo su sistema. Cada día que esperas es un día que ellos crecen. Empieza hoy — en 7 días hábiles tienes tu sistema completo funcionando.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a href="#" className="btn-primary" style={{ fontSize: 15 }}>
                  Iniciar el Camino
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="#" className="btn-ghost" style={{ fontSize: 15 }}>
                  Agendar Llamada
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '24px 0',
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)' }} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
            }}>
              SEEN LABS
            </span>
            <span style={{
              fontFamily: 'var(--font-sub)',
              fontSize: 10,
              color: 'var(--text-dim)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginLeft: 4,
            }}>
              Out of the Dark
            </span>
          </div>

          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-sub)',
                  fontSize: 12,
                  color: 'var(--text-dim)',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: 'var(--text-dim)',
          }}>
            © 2025 Seen Labs. Todos los derechos reservados.
          </span>
        </div>
      </div>

    </footer>
  )
}
