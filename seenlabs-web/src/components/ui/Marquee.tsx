import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(() => {
    if (reduced || !marqueeRef.current) return
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })
  }, [reduced])

  const text = 'OUT OF THE DARK • '

  return (
    <div className="overflow-hidden py-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div ref={marqueeRef} className="flex whitespace-nowrap" style={{ width: 'max-content' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'rgba(155,92,246,0.3)',
              paddingRight: '2rem',
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
