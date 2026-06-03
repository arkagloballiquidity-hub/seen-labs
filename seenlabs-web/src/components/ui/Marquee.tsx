import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const TEXT = 'OUT OF THE DARK'
const ITEMS = Array(12).fill(TEXT)

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !trackRef.current) return
    const el = trackRef.current
    const totalWidth = el.scrollWidth / 2
    const tween = gsap.to(el, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
    })
    return () => { tween.kill() }
  }, [reduced])

  return (
    <div style={{ overflow: 'hidden', width: '100%', padding: '24px 0' }}>
      <div ref={trackRef} style={{ display: 'flex', width: 'max-content' }}>
        {ITEMS.map((text, i) => (
          <span
            key={i}
            className="marquee-item"
            style={i % 2 === 0 ? {
              color: 'rgba(255,255,255,0.22)',
              WebkitTextStroke: 'none',
            } : {
              WebkitTextStroke: '1px rgba(255,255,255,0.28)',
            }}
          >
            {text}&nbsp;&nbsp;•&nbsp;&nbsp;
          </span>
        ))}
      </div>
    </div>
  )
}
