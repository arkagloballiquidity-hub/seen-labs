import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import { DoorVisual } from '../ui/DoorVisual'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const CYCLING_SOLUTIONS = [
  'en 7 días hábiles.',
  'con IA.',
  'sin excusas.',
  'o te devolvemos el 100%.',
]

export function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const overlayRef  = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const doorRef     = useRef<HTMLDivElement>(null)
  const reduced     = useReducedMotion()
  const [solutionIdx, setSolutionIdx] = useState(0)

  /* ── GSAP entrance (children stagger) ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.05 }
      )
    }, contentRef)
    return () => ctx.revert()
  }, [])

  /* ── GSAP ScrollTrigger ── */
  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const ctx = gsap.context(() => {

      /* 1. Video subtle zoom-in on scroll */
      gsap.to(videoRef.current, {
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      /* 2. Overlay darkens as you scroll */
      gsap.to(overlayRef.current, {
        opacity: 0.85,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      /* 3. Content floats up + fades on scroll */
      gsap.to(contentRef.current, {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '20% top',
          end: 'bottom top',
          scrub: true,
        },
      })

      /* 4. Door parallax — moves slower than content */
      gsap.to(doorRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  /* ── Cycle solution text ── */
  useEffect(() => {
    const id = setInterval(() => setSolutionIdx(i => (i + 1) % CYCLING_SOLUTIONS.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ── VIDEO BACKGROUND ── */}
      <video
        ref={videoRef}
        src="/seen-labs-reel.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      />

      {/* ── OVERLAYS ── */}
      {/* Base dark overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.55)',
          zIndex: 1,
        }}
      />
      {/* Gradient — top fade to black (for navbar) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 25%, transparent 60%, rgba(0,0,0,0.85) 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      {/* Subtle purple tint at center */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(123,97,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* ── CONTENT ── */}
      <div
        className="container"
        ref={contentRef}
        style={{ position: 'relative', zIndex: 10, paddingTop: 120, paddingBottom: 80 }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 60,
          alignItems: 'center',
        }}>

          {/* Left: copy */}
          <div>
            {/* Label */}
            <div className="hero-anim" style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28,
            }}>
              <span style={{
                width: 24, height: 1,
                background: 'var(--purple)',
                display: 'inline-block',
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--font-sub)',
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--purple)',
              }}>
                OUT OF THE DARK
              </span>
            </div>

            {/* Villain headline */}
            <h1 className="hero-anim" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              marginBottom: 24,
              textShadow: '0 2px 40px rgba(0,0,0,0.8)',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>La oscuridad es el</span>
              <br />
              <span className="text-chrome">enemigo #1</span>
              <br />
              <span style={{ color: '#fff' }}>de las ideas que</span>
              <br />
              <span style={{ color: '#fff' }}>cambian al mundo.</span>
            </h1>

            {/* Pain statement */}
            <div className="hero-anim" style={{
              borderLeft: '3px solid var(--purple)',
              paddingLeft: 20,
              marginBottom: 28,
            }}>
              <p style={{
                fontFamily: 'var(--font-sub)',
                fontSize: 'clamp(15px, 1.8vw, 20px)',
                fontWeight: 600,
                color: '#fff',
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                marginBottom: 4,
                textShadow: '0 1px 20px rgba(0,0,0,0.8)',
              }}>
                Los más exitosos no siempre son los mejores.
              </p>
              <p style={{
                fontFamily: 'var(--font-sub)',
                fontSize: 'clamp(15px, 1.8vw, 20px)',
                fontWeight: 600,
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                textShadow: '0 1px 20px rgba(0,0,0,0.8)',
              }}>
                Son los que{' '}
                <span style={{ color: 'var(--purple)', textShadow: '0 0 20px rgba(123,97,255,0.6)' }}>
                  más exposición tienen
                </span>.
              </p>
            </div>

            {/* Bridge */}
            <p className="hero-anim" style={{
              fontSize: 15, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.65)',
              maxWidth: 480,
              marginBottom: 16,
              textShadow: '0 1px 10px rgba(0,0,0,0.6)',
            }}>
              Tu competencia, con la mitad de calidad, te está ganando clientes. No porque sea mejor. Porque la ven. Nosotros te sacamos de la oscuridad —
            </p>

            {/* Cycling solution */}
            <div className="hero-anim" style={{
              fontFamily: 'var(--font-sub)',
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              fontWeight: 700,
              marginBottom: 36,
              height: '1.6em',
              display: 'flex',
              alignItems: 'center',
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
            <div className="hero-anim" style={{
              display: 'flex', gap: 14, flexWrap: 'wrap',
              alignItems: 'center', marginBottom: 48,
            }}>
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

            {/* Emotional close */}
            <div className="hero-anim" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(13px, 1.2vw, 16px)',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.15)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}>
              Tu negocio merece ser visto.
            </div>

            {/* Stats */}
            <div className="hero-anim" style={{
              display: 'flex', gap: 40,
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}>
              {[
                { value: '7',    label: 'días hábiles' },
                { value: '3x',   label: 'ROI promedio' },
                { value: '100%', label: 'cashback garantizado' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    fontWeight: 800,
                    color: 'var(--purple)',
                    letterSpacing: '-0.03em',
                    textShadow: '0 0 20px rgba(123,97,255,0.4)',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-sub)',
                    fontSize: 11, fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Door */}
          <div ref={doorRef} className="hero-door" style={{ display: 'flex', justifyContent: 'center' }}>
            <DoorVisual size="lg" />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 8, marginTop: 64,
          }}
        >
          <div style={{
            width: 1, height: 32,
            background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.3))',
          }} />
          <span style={{
            fontFamily: 'var(--font-sub)',
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}>
            SCROLL
          </span>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #hero .container > div { grid-template-columns: 1fr !important; }
          .hero-door { display: none !important; }
        }
      `}</style>
    </section>
  )
}
