import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_DURATION = 15 // seconds

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const labelRef   = useRef<HTMLDivElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const reduced    = useReducedMotion()

  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    // Pre-load so scrubbing is smooth
    video.load()

    if (reduced) {
      // Just show the video statically
      video.currentTime = 2
      return
    }

    const ctx = gsap.context(() => {

      /* ── 1. PIN + VIDEO SCRUB ─────────────────────────────── */
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${VIDEO_DURATION * 120}`,   // ~120px per second → smooth
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      scrubTl.to(video, {
        currentTime: VIDEO_DURATION,
        ease: 'none',
      })

      /* ── 2. OVERLAY FADE OUT as video starts playing ─────── */
      gsap.to(overlayRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300',
          scrub: true,
        },
      })

      /* ── 3. LABEL slides in from left ────────────────────── */
      gsap.fromTo(labelRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=400',
            scrub: 1,
          },
        }
      )

      /* ── 4. TEXT slides up in the second half of the video ── */
      gsap.fromTo(textRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: `+=${VIDEO_DURATION * 60}`,  // mid-point
            end:   `+=${VIDEO_DURATION * 100}`,
            scrub: 1,
          },
        }
      )

    }, section)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src="/seen-labs-reel.mp4"
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* DARK GRADIENT OVERLAY — top & bottom */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.75) 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* INITIAL OVERLAY — fades out as scroll starts */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* LABEL — top left */}
      <div
        ref={labelRef}
        style={{
          position: 'absolute',
          top: 40,
          left: 40,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div style={{
          width: 6, height: 6,
          borderRadius: '50%',
          background: 'var(--purple)',
          boxShadow: '0 0 12px rgba(123,97,255,0.8)',
        }} />
        <span style={{
          fontFamily: 'var(--font-sub)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)',
        }}>
          SEEN LABS — OUT OF THE DARK
        </span>
      </div>

      {/* SCROLL INDICATOR — visible at entry */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          pointerEvents: 'none',
        }}
      >
        <div style={{
          width: 1, height: 32,
          background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.4))',
        }} />
        <span style={{
          fontFamily: 'var(--font-sub)',
          fontSize: 10,
          letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
        }}>
          SCROLL
        </span>
      </div>

      {/* CENTER TEXT — appears mid-video */}
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          bottom: 80,
          left: 0,
          right: 0,
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
          opacity: 0,
        }}
      >
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4.5vw, 64px)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: 12,
        }}>
          <span className="text-chrome">De 0 a fuera de la oscuridad</span>
          <br />
          <span style={{ color: 'rgba(255,255,255,0.9)' }}>en 15 días hábiles.</span>
        </h2>
        <p style={{
          fontFamily: 'var(--font-sub)',
          fontSize: 'clamp(13px, 1.4vw, 16px)',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.05em',
          maxWidth: 480,
          margin: '0 auto',
        }}>
          Seen Labs · Out of the Dark
        </p>
      </div>
    </section>
  )
}
