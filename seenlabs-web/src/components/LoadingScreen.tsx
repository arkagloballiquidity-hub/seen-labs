import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LOADING_WORDS } from '../lib/constants'

interface LoadingScreenProps {
  onComplete: () => void
}

const DURATION_MS = 2700

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / DURATION_MS, 1)
      const next = Math.floor(progress * 100)
      setCount(next)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setTimeout(onComplete, 400)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % LOADING_WORDS.length)
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: 'var(--dark)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top-left label */}
      <motion.div
        className="absolute top-8 left-10 text-xs tracking-[0.3em] uppercase"
        style={{ color: 'var(--mid-gray)', fontFamily: 'Sora, sans-serif' }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        SEEN LABS
      </motion.div>

      {/* Center cycling word */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-6xl md:text-8xl select-none"
            style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 800,
              color: 'rgba(248,248,248,0.8)',
              fontStyle: 'italic',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {LOADING_WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom: counter + progress bar */}
      <div className="pb-10 px-10">
        {/* Counter */}
        <div
          className="text-right mb-4 text-7xl md:text-9xl tabular-nums select-none"
          style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 800,
            color: 'var(--white)',
          }}
        >
          {String(count).padStart(3, '0')}
        </div>
        {/* Progress bar */}
        <div
          className="w-full h-[3px] rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <div
            className="h-full origin-left"
            style={{
              background: 'linear-gradient(90deg, #D4BAFF 0%, #9B5CF6 100%)',
              transform: `scaleX(${count / 100})`,
              transition: 'transform 0.05s linear',
              boxShadow: '0 0 8px rgba(155,92,246,0.5)',
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
