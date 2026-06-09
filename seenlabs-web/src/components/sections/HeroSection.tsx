import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { AnimatePresence, motion } from 'framer-motion'

const CYCLING_SOLUTIONS = [
  'en 15 días hábiles.',
  'con IA.',
  'sin excusas.',
  'o te devolvemos el 100%.',
]

export function HeroSection() {
  const contentRef  = useRef<HTMLDivElement>(null)
  const [solutionIdx, setSolutionIdx] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      )
    }, contentRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const id = setInterval(() => setSolutionIdx(i => (i + 1) % CYCLING_SOLUTIONS.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        // Transparent — video shows through
        background: 'transparent',
      }}
    >

      <div className="container" ref={contentRef}
        style={{ position: 'relative', zIndex: 2, paddingTop: 140, paddingBottom: 100 }}
      >
        {/* Label */}
        <div className="hero-anim" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <span style={{ width: 24, height: 1, background: 'var(--purple)', display: 'inline-block' }} />
          <span style={{
            fontFamily: 'var(--font-sub)', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--purple)',
          }}>OUT OF THE DARK</span>
        </div>

        {/* Villain headline */}
        <h1 className="hero-anim" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5.5vw, 76px)',
          fontWeight: 800, lineHeight: 1.04,
          letterSpacing: '-0.04em',
          marginBottom: 24, maxWidth: 820,
          textShadow: '0 2px 40px rgba(0,0,0,0.6)',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.45)' }}>La oscuridad es el</span>
          <br />
          <span className="text-chrome">enemigo #1</span>
          <br />
          <span style={{ color: '#fff' }}>de las ideas que cambian al mundo.</span>
        </h1>

        {/* Pain */}
        <div className="hero-anim" style={{ borderLeft: '3px solid var(--purple)', paddingLeft: 20, marginBottom: 28 }}>
          <p style={{
            fontFamily: 'var(--font-sub)', fontSize: 'clamp(15px, 1.8vw, 20px)',
            fontWeight: 600, color: '#fff', lineHeight: 1.45, marginBottom: 4,
          }}>
            Los más exitosos no siempre son los mejores.
          </p>
          <p style={{
            fontFamily: 'var(--font-sub)', fontSize: 'clamp(15px, 1.8vw, 20px)',
            fontWeight: 600, lineHeight: 1.45,
          }}>
            Son los que{' '}
            <span style={{ color: 'var(--purple)', textShadow: '0 0 20px rgba(123,97,255,0.5)' }}>
              más exposición tienen
            </span>.
          </p>
        </div>

        {/* Bridge */}
        <p className="hero-anim" style={{
          fontSize: 15, lineHeight: 1.75,
          color: 'rgba(255,255,255,0.6)',
          maxWidth: 480, marginBottom: 16,
        }}>
          Tu competencia, con la mitad de calidad, te está ganando clientes. No porque sea mejor. Porque la ven. Nosotros te sacamos de la oscuridad —
        </p>

        {/* Cycling */}
        <div className="hero-anim" style={{
          fontFamily: 'var(--font-sub)', fontSize: 'clamp(15px, 1.5vw, 18px)',
          fontWeight: 700, marginBottom: 36, height: '1.6em',
          display: 'flex', alignItems: 'center',
        }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={CYCLING_SOLUTIONS[solutionIdx]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ color: 'var(--purple)', textShadow: '0 0 20px rgba(123,97,255,0.4)' }}
            >
              {CYCLING_SOLUTIONS[solutionIdx]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* CTAs */}
        <div className="hero-anim" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 48 }}>
          <Link to="/precios" className="btn-primary" style={{ fontSize: 14 }}>
            Quiero ser visible
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a href="/formularios.html" className="btn-ghost" style={{ fontSize: 14 }}>
            Empezar el Brief
          </a>
        </div>

        {/* Tagline */}
        <div className="hero-anim" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(13px, 1.2vw, 16px)',
          fontWeight: 600, color: 'rgba(255,255,255,0.12)',
          letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24,
        }}>
          Tu negocio merece ser visto.
        </div>

        {/* Stats */}
        <div className="hero-anim" style={{
          display: 'flex', gap: 40, paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          {[
            { value: '7',    label: 'días hábiles' },
            { value: '3x',   label: 'ROI promedio' },
            { value: '100%', label: 'cashback garantizado' },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 800,
                color: 'var(--purple)', letterSpacing: '-0.03em',
                textShadow: '0 0 20px rgba(123,97,255,0.4)',
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'var(--font-sub)', fontSize: 11,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 48 }}
        >
          <div style={{ width: 1, height: 32, background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.3))' }} />
          <span style={{ fontFamily: 'var(--font-sub)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
            SCROLL
          </span>
        </motion.div>
      </div>
    </section>
  )
}
