import { motion } from 'framer-motion'
import { Marquee } from '../ui/Marquee'

export function FinalCTASection() {
  return (
    <footer style={{ background: 'transparent' }}>
      {/* Marquee band */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Marquee />
      </div>

      {/* CTA — left-aligned text-card, leaves right side open for video logo */}
      <section className="section">
        <div className="container">
          <motion.div
            className="text-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: 580 }}
          >
            {/* Eyebrow */}
            <div style={{
              fontFamily: 'var(--font-sub)', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--purple)',
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
            }}>
              <span style={{ width: 24, height: 1, background: 'var(--purple)', display: 'inline-block' }} />
              El Camino
            </div>

            {/* Headline */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 800, lineHeight: 1.02,
              letterSpacing: '-0.04em', marginBottom: 20,
            }}>
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>Es hora de salir</span>
              <br />
              <span className="text-chrome">de la oscuridad.</span>
            </h2>

            <p style={{
              fontSize: 15, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 440, marginBottom: 32,
            }}>
              Tu competencia ya está construyendo su sistema.{' '}
              <strong style={{ color: 'rgba(255,255,255,0.72)' }}>
                En 7 días hábiles, el tuyo está funcionando.
              </strong>
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
              <a href="/precios" className="btn-primary" style={{ fontSize: 14 }}>
                Iniciar el Camino
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://wa.me/message/seen-labs" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: 14 }}>
                Agendar Llamada
              </a>
            </div>

            <p style={{
              fontFamily: 'var(--font-sub)', fontSize: 11,
              color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em',
            }}>
              Garantía Hotmart 7 días · Sin contratos · Sin riesgo
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer bar — solid dark so it's always readable */}
      <div style={{
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '28px 0',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--purple)', boxShadow: '0 0 8px var(--purple)' }} />
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800,
              letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)',
            }}>SEEN LABS</span>
            <span style={{
              fontFamily: 'var(--font-sub)', fontSize: 9,
              color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em',
              textTransform: 'uppercase', marginLeft: 4,
            }}>Out of the Dark</span>
          </div>

          {/* Copyright */}
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
            © 2025 Seen Labs · Todos los derechos reservados
          </span>
        </div>
      </div>
    </footer>
  )
}
