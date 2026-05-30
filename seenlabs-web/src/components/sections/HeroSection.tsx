import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { AnimatePresence, motion } from 'framer-motion'
import { DoorVisual } from '../ui/DoorVisual'
import { HERO_ROLES } from '../../lib/constants'

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [roleIdx, setRoleIdx] = useState(0)

  /* GSAP entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      )
    }, contentRef)
    return () => ctx.revert()
  }, [])

  /* Role cycling */
  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % HERO_ROLES.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: 'var(--black)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(123,97,255,0.12) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div className="container" ref={contentRef} style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 60,
          alignItems: 'center',
        }}>
          {/* Text content */}
          <div>
            <div className="hero-anim" style={{ marginBottom: 24 }}>
              <span style={{
                fontFamily: 'var(--font-sub)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--purple)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}>
                <span style={{ width: 24, height: 1, background: 'var(--purple)', display: 'inline-block' }} />
                OUT OF THE DARK
              </span>
            </div>

            <h1 className="hero-anim" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: 8,
            }}>
              <span className="text-chrome">Tu negocio</span>
              <br />
              <span style={{ color: 'var(--text-primary)' }}>merece ser</span>
              <br />
              <span style={{ color: 'var(--text-primary)' }}>visto.</span>
            </h1>

            {/* Cycling role */}
            <div className="hero-anim" style={{
              fontFamily: 'var(--font-sub)',
              fontSize: 'clamp(18px, 2.5vw, 26px)',
              fontWeight: 600,
              color: 'var(--purple)',
              marginBottom: 28,
              height: '1.4em',
              display: 'flex',
              alignItems: 'center',
            }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={HERO_ROLES[roleIdx]}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  Haz tu negocio {HERO_ROLES[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </div>

            <p className="hero-anim" style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--text-muted)',
              maxWidth: 520,
              marginBottom: 40,
            }}>
              Construimos sistemas digitales completos —webs de conversión, embudos de IA, anuncios y automatización— en <strong style={{ color: 'var(--text-primary)' }}>7 días hábiles</strong>. No diseño genérico. Un sistema que vende.
            </p>

            <div className="hero-anim" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#" className="btn-primary">
                Iniciar el Camino
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#system" className="btn-ghost">
                Ver el Sistema
              </a>
            </div>

            {/* Stats row */}
            <div className="hero-anim" style={{
              display: 'flex',
              gap: 40,
              marginTop: 56,
              paddingTop: 32,
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              {[
                { value: '7', label: 'días hábiles' },
                { value: '3x', label: 'ROI promedio' },
                { value: '20+', label: 'proyectos entregados' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontWeight: 800,
                    color: 'var(--purple)',
                    letterSpacing: '-0.03em',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-sub)',
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-dim)',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Door Visual */}
          <div className="hero-anim" style={{ display: 'flex', justifyContent: 'center' }}>
            <DoorVisual size="lg" />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            marginTop: 80,
          }}
        >
          <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, transparent, var(--text-dim))' }} />
          <span style={{
            fontFamily: 'var(--font-sub)',
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--text-dim)',
          }}>
            SCROLL
          </span>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        background: 'linear-gradient(180deg, transparent, var(--black))',
        pointerEvents: 'none',
      }} />

      <style>{`
        @media (max-width: 900px) {
          #hero .container > div { grid-template-columns: 1fr !important; }
          #hero .container > div > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  )
}
