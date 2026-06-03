import { motion } from 'framer-motion'
import { Marquee } from '../ui/Marquee'

export function FinalCTASection() {
  return (
    <footer style={{ background: 'transparent' }}>
      {/* Marquee band — visible as you scroll to the bottom */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Marquee />
      </div>

      {/* Empty space — video logo shows through */}
      <div style={{ height: 360 }} />

      {/* CTA — hero style: text directly on video, left-aligned */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: 700 }}
          >
            {/* Eyebrow — same as hero label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <span style={{ width: 24, height: 1, background: 'var(--purple)', display: 'inline-block' }} />
              <span style={{
                fontFamily: 'var(--font-sub)', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--purple)',
              }}>El Camino</span>
            </div>

            {/* Headline — hero scale */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5.5vw, 76px)',
              fontWeight: 800, lineHeight: 1.04,
              letterSpacing: '-0.04em', marginBottom: 24,
              textShadow: '0 2px 40px rgba(0,0,0,0.6)',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>Es hora de salir</span>
              <br />
              <span className="text-chrome">de la oscuridad.</span>
            </h2>

            {/* Pain line — same style as hero */}
            <div style={{ borderLeft: '3px solid var(--purple)', paddingLeft: 20, marginBottom: 24 }}>
              <p style={{
                fontFamily: 'var(--font-sub)', fontSize: 'clamp(15px, 1.8vw, 19px)',
                fontWeight: 600, color: '#fff', lineHeight: 1.45,
              }}>
                Tu competencia ya está construyendo su sistema.
              </p>
              <p style={{
                fontFamily: 'var(--font-sub)', fontSize: 'clamp(15px, 1.8vw, 19px)',
                fontWeight: 600, lineHeight: 1.45,
              }}>
                Cada día que esperas es{' '}
                <span style={{ color: 'var(--purple)', textShadow: '0 0 20px rgba(123,97,255,0.5)' }}>
                  un día que ellos crecen.
                </span>
              </p>
            </div>

            <p style={{
              fontSize: 15, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: 480, marginBottom: 36,
            }}>
              En 7 días hábiles tienes tu sistema completo funcionando —
              <strong style={{ color: 'rgba(255,255,255,0.85)' }}> o te devolvemos el 100%.</strong>
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 40 }}>
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

            {/* Stats — same as hero */}
            <div style={{
              display: 'flex', gap: 40,
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}>
              {[
                { value: '7',    label: 'días hábiles' },
                { value: '100%', label: 'cashback garantizado' },
                { value: '3x',   label: 'ROI promedio' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 800,
                    color: 'var(--purple)', letterSpacing: '-0.03em',
                    textShadow: '0 0 20px rgba(123,97,255,0.4)',
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: 'var(--font-sub)', fontSize: 10,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)',
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer bar — solid dark */}
      <div style={{
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '28px 0',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
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
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
            © 2025 Seen Labs · Todos los derechos reservados
          </span>
        </div>
      </div>
    </footer>
  )
}
