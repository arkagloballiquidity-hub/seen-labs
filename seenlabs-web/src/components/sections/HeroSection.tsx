import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_SRC      = '/seen-labs-reel.mp4'
const VIDEO_DURATION = 15 // seconds
const SCROLL_PER_SEC = 150 // px of scroll per second of video

const CYCLING_SOLUTIONS = [
  'en 7 días hábiles.',
  'con IA.',
  'sin excusas.',
  'o te devolvemos el 100%.',
]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const reduced    = useReducedMotion()
  const [solutionIdx, setSolutionIdx] = useState(0)

  /* ── Entrance stagger ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.05 }
      )
    }, contentRef)
    return () => ctx.revert()
  }, [])

  /* ── ScrollTrigger: pin + video scrub ── */
  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    // Force preload
    video.load()

    if (reduced) {
      // Static: just show frame 1
      video.currentTime = 1
      return
    }

    const totalScroll = VIDEO_DURATION * SCROLL_PER_SEC

    const ctx = gsap.context(() => {

      /* Main timeline: pin section, scrub video */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end:   `+=${totalScroll}`,
          pin:   true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      })

      // 1. Video currentTime 0 → duration
      tl.to(video, {
        currentTime: VIDEO_DURATION,
        ease: 'none',
      })

      // 2. Overlay fades in as video progresses (darkens at the end)
      tl.to(overlayRef.current, {
        opacity: 0.75,
        ease: 'none',
      }, 0)

      // 3. Content fades out in the last 30% of the video
      tl.to(contentRef.current, {
        y: -60,
        opacity: 0,
        ease: 'power2.in',
      }, 0.7)   // starts at 70% of timeline

    }, section)

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
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ── VIDEO ── */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          willChange: 'transform',
        }}
      />

      {/* ── OVERLAYS ── */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 1,
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 25%, transparent 65%, rgba(0,0,0,0.9) 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(123,97,255,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* ── CONTENT ── */}
      <div
        className="container"
        ref={contentRef}
        style={{ position: 'relative', zIndex: 10, paddingTop: 120, paddingBottom: 80 }}
      >
        {/* Label */}
        <div className="hero-anim" style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28,
        }}>
          <span style={{ width: 24, height: 1, background: 'var(--purple)', display: 'inline-block' }} />
          <span style={{
            fontFamily: 'var(--font-sub)', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--purple)',
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
          maxWidth: 780,
          textShadow: '0 2px 40px rgba(0,0,0,0.8)',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>La oscuridad es el</span>
          <br />
          <span className="text-chrome">enemigo #1</span>
          <br />
          <span style={{ color: '#fff' }}>de las ideas que cambian al mundo.</span>
        </h1>

        {/* Pain */}
        <div className="hero-anim" style={{
          borderLeft: '3px solid var(--purple)', paddingLeft: 20, marginBottom: 28,
        }}>
          <p style={{
            fontFamily: 'var(--font-sub)', fontSize: 'clamp(15px, 1.8vw, 20px)',
            fontWeight: 600, color: '#fff', lineHeight: 1.45, marginBottom: 4,
            textShadow: '0 1px 20px rgba(0,0,0,0.8)',
          }}>
            Los más exitosos no siempre son los mejores.
          </p>
          <p style={{
            fontFamily: 'var(--font-sub)', fontSize: 'clamp(15px, 1.8vw, 20px)',
            fontWeight: 600, lineHeight: 1.45,
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
          maxWidth: 480, marginBottom: 16,
        }}>
          Tu competencia, con la mitad de calidad, te está ganando clientes. No porque sea mejor. Porque la ven. Nosotros te sacamos de la oscuridad —
        </p>

        {/* Cycling solution */}
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
          fontFamily: 'var(--font-display)', fontSize: 'clamp(13px, 1.2vw, 16px)',
          fontWeight: 600, color: 'rgba(255,255,255,0.15)',
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
          ].map(stat => (
            <div key={stat.label}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 2.5vw, 32px)',
                fontWeight: 800, color: 'var(--purple)',
                letterSpacing: '-0.03em',
                textShadow: '0 0 20px rgba(123,97,255,0.4)',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-sub)', fontSize: 11, fontWeight: 500,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 8, marginTop: 48,
          }}
        >
          <div style={{ width: 1, height: 32, background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.3))' }} />
          <span style={{
            fontFamily: 'var(--font-sub)', fontSize: 10,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}>
            SCROLL
          </span>
        </motion.div>
      </div>
    </section>
  )
}
