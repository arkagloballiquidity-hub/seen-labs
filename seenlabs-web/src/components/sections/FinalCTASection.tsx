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

      {/* CTA — centered, dramatic, lets video show through */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '40px 0 60px',
          }}>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 28 }}
            >
              <span style={{
                fontFamily: 'var(--font-sub)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}>
                <span style={{ width: 32, height: 1, background: 'var(--purple)', display: 'inline-block' }} />
                El Camino
                <span style={{ width: 32, height: 1, background: 'var(--purple)', display: 'inline-block' }} />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 7vw, 96px)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
                marginBottom: 28,
                maxWidth: 860,
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Es hora de salir</span>
              <br />
              <span className="text-chrome">de la oscuridad.</span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.45)',
                maxWidth: 500,
                marginBottom: 44,
              }}
            >
              Tu competencia ya está construyendo su sistema. Cada día que esperas es un día que ellos crecen.
              <br />
              <strong style={{ color: 'rgba(255,255,255,0.75)' }}>En 7 días hábiles, tu sistema está funcionando.</strong>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <a href="/precios" className="btn-primary" style={{ fontSize: 15, padding: '16px 40px' }}>
                Iniciar el Camino
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://wa.me/message/seen-labs" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: 15, padding: '16px 40px' }}>
                Agendar Llamada
              </a>
            </motion.div>

            {/* Guarantee note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                marginTop: 24,
                fontFamily: 'var(--font-sub)',
                fontSize: 12,
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.05em',
              }}
            >
              🔒 Garantía Hotmart 7 días · Sin riesgo · Sin contratos
            </motion.p>

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
              fontSize: 13, fontWeight: 800,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--text-primary)',
            }}>SEEN LABS</span>
            <span style={{
              fontFamily: 'var(--font-sub)', fontSize: 10,
              color: 'var(--text-dim)', letterSpacing: '0.15em',
              textTransform: 'uppercase', marginLeft: 4,
            }}>Out of the Dark</span>
          </div>

          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} style={{
                fontFamily: 'var(--font-sub)', fontSize: 12,
                color: 'var(--text-dim)', textDecoration: 'none',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
              >{link.label}</a>
            ))}
          </div>

          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-dim)' }}>
            © 2025 Seen Labs. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}
