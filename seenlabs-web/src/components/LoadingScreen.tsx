import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CYCLING_WORDS } from '../lib/constants'

interface Props {
  onComplete: () => void
}

const DURATION = 2700
const WORD_INTERVAL = 900

export function LoadingScreen({ onComplete }: Props) {
  const [count, setCount]   = useState(0)
  const [wordIdx, setWordIdx] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef   = useRef<number | null>(null)

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * 100))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setCount(100)
        setTimeout(onComplete, 400)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [onComplete])

  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % CYCLING_WORDS.length), WORD_INTERVAL)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Top label */}
      <div style={{
        position: 'absolute',
        top: 32,
        left: 40,
        fontFamily: 'var(--font-sub)',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'var(--text-dim)',
      }}>
        SEEN LABS
      </div>

      {/* Cycling word */}
      <div style={{
        position: 'absolute',
        top: 32,
        right: 40,
        fontFamily: 'var(--font-sub)',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--purple)',
        minWidth: 120,
        textAlign: 'right',
      }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={CYCLING_WORDS[wordIdx]}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {CYCLING_WORDS[wordIdx]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(80px, 18vw, 200px)',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.05em',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontVariantNumeric: 'tabular-nums',
          userSelect: 'none',
        }}
      >
        {String(count).padStart(2, '0')}
      </motion.div>

      {/* Tagline */}
      <div style={{
        fontFamily: 'var(--font-sub)',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.2)',
        marginTop: 16,
      }}>
        OUT OF THE DARK
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'rgba(255,255,255,0.06)',
      }}>
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--purple), #a855f7)',
            boxShadow: '0 0 8px var(--purple)',
            scaleX: count / 100,
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Corner decorators */}
      {[
        { top: 60, left: 32 },
        { top: 60, right: 32 },
        { bottom: 24, left: 32 },
        { bottom: 24, right: 32 },
      ].map((style, i) => (
        <div key={i} style={{
          position: 'absolute',
          ...style,
          width: 16,
          height: 16,
          borderTop: i < 2 ? '1px solid rgba(123,97,255,0.3)' : 'none',
          borderBottom: i >= 2 ? '1px solid rgba(123,97,255,0.3)' : 'none',
          borderLeft: i % 2 === 0 ? '1px solid rgba(123,97,255,0.3)' : 'none',
          borderRight: i % 2 !== 0 ? '1px solid rgba(123,97,255,0.3)' : 'none',
        }} />
      ))}
    </motion.div>
  )
}
