import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { AnimatePresence, motion } from 'framer-motion'
import { DoorVisual } from '../ui/DoorVisual'

const CYCLING_SOLUTIONS = ['en 7 días hábiles.', 'con IA.', 'sin excusas.', 'o te devolvemos el 100%.']

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [solutionIdx, setSolutionIdx] = useState(0)

  /* GSAP entrance — stagger children with class hero-anim */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.05 }
      )
    }, contentRef)
    return () => ctx.revert()
  }, [])

  /* Cycle closing solution */
  useEffect(() => {
    const id = setInterval(() => setSolutionIdx(i => (i + 1) % CYCLING_SOLUTIONS.length), 3000)
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
      {/* Background radial */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(123,97,255,0.1) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      {/* Large background word */}
      <div style={{
        position: 'absolute',
        bottom: -40,
        right: -40,
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(120px, 20vw, 260px)',
        fontWeight: 800,
        letterSpacing: '-0.05em',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(255,255,255,0.025)',
        userSelect: 'none',
        pointerEvents: 'none',
        lineHeight: 1,
      }}>
        DARK
      </div>

      <div className="container" ref={contentRef} style={{ paddingTop: 120, paddingBottom: 80, position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 60,
          alignItems: 'center',
        }}>

          {/* ── Left: Copy ── */}
          <div>

            {/* Label */}
            <div className="hero-anim" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 28,
            }}>
              <span style={{
                width: 24,
                height: 1,
                background: 'var(--purple)',
                display: 'inline-block',
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--font-sub)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--purple)',
              }}>
                OUT OF THE DARK
              </span>
            </div>

            {/* ── VILLAIN — main hook ── */}
            <h1 className="hero-anim" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              marginBottom: 24,
            }}>
              <span style={{ color: 'var(--text-dim)' }}>La oscuridad es el</span>
              <br />
              <span className="text-chrome">enemigo #1</span>
              <br />
              <span style={{ color: 'var(--text-primary)' }}>de las ideas que</span>
              <br />
              <span style={{ color: 'var(--text-primary)' }}>cambian al mundo.</span>
            </h1>

            {/* ── PAIN BUTTON — cognitive dissonance ── */}
            <div className="hero-anim" style={{
              borderLeft: '3px solid var(--purple)',
              paddingLeft: 20,
              marginBottom: 28,
            }}>
              <p style={{
                fontFamily: 'var(--font-sub)',
                fontSize: 'clamp(15px, 1.8vw, 20px)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                marginBottom: 4,
              }}>
                Los más exitosos no siempre son los mejores.
              </p>
              <p style={{
                fontFamily: 'var(--font-sub)',
                fontSize: 'clamp(15px, 1.8vw, 20px)',
                fontWeight: 600,
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
              }}>
                Son los que{' '}
                <span style={{ color: 'var(--purple)', textShadow: '0 0 20px rgba(123,97,255,0.4)' }}>
                  más exposición tienen
                </span>.
              </p>
            </div>

            {/* ── BRIDGE — name the situation ── */}
            <p className="hero-anim" style={{
              fontSize: 15,
              lineHeight: 1.75,
              color: 'var(--text-muted)',
              maxWidth: 480,
              marginBottom: 16,
            }}>
              Tu competencia, con la mitad de calidad, te está ganando clientes. No porque sea mejor. Porque la ven. Nosotros te sacamos de la oscuridad —
            </p>

            {/* ── SOLUTION — cycling close ── */}
            <div className="hero-anim" style={{
              fontFamily: 'var(--font-sub)',
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 36,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              height: '1.6em',
            }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={CYCLING_SOLUTIONS[solutionIdx]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: 'var(--purple)' }}
                >
                  {CYCLING_SOLUTIONS[solutionIdx]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* ── CTAs ── */}
            <div className="hero-anim" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 48 }}>
              <a href="/precios" className="btn-primary" style={{ fontSize: 14 }}>
                Quiero ser visible
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="/solucion" className="btn-ghost" style={{ fontSize: 14 }}>
                Ver el Sistema
              </a>
            </div>

            {/* ── EMOTIONAL CLOSE before stats ── */}
            <div className="hero-anim" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(13px, 1.2vw, 16px)',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}>
              Tu negocio merece ser visto.
            </div>

            {/* ── Stats ── */}
            <div className="hero-anim" style={{
              display: 'flex',
              gap: 40,
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              {[
                { value: '7',   label: 'días hábiles' },
                { value: '3x',  label: 'ROI promedio' },
                { value: '100%',label: 'cashback garantizado' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
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

          {/* ── Right: Door Visual ── */}
          <div className="hero-anim hero-door" style={{ display: 'flex', justifyContent: 'center' }}>
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
            marginTop: 64,
          }}
        >
          <div style={{ width: 1, height: 32, background: 'linear-gradient(180deg, transparent, var(--text-dim))' }} />
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
        height: 180,
        background: 'linear-gradient(180deg, transparent, var(--black))',
        pointerEvents: 'none',
      }} />

      <style>{`
        @media (max-width: 900px) {
          #hero .container > div { grid-template-columns: 1fr !important; }
          .hero-door { display: none !important; }
        }
      `}</style>
    </section>
  )
}
