import { motion } from 'framer-motion'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = { sm: 140, md: 220, lg: 320 }

export function DoorVisual({ size = 'md', className = '' }: Props) {
  const w = sizes[size]
  const h = Math.round(w * 1.78)

  return (
    <div
      className={className}
      style={{
        width: w,
        height: h,
        position: 'relative',
        perspective: '800px',
      }}
    >
      {/* Light spill behind door */}
      <motion.div
        className="door-light"
        style={{
          position: 'absolute',
          inset: 12,
          background: 'radial-gradient(ellipse at 50% 35%, rgba(255,220,120,0.85) 0%, rgba(200,150,60,0.6) 25%, rgba(123,97,255,0.35) 55%, transparent 80%)',
          filter: 'blur(4px)',
        }}
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Door frame outer glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        border: '1px solid rgba(255,220,120,0.5)',
        boxShadow: '0 0 25px rgba(255,200,80,0.35), 0 0 60px rgba(255,200,80,0.15), inset 0 0 25px rgba(255,200,80,0.08)',
      }} />

      {/* Door frame inner detail */}
      <div style={{
        position: 'absolute',
        inset: 12,
        border: '1px solid rgba(255,220,120,0.25)',
      }} />

      {/* Knob */}
      <div style={{
        position: 'absolute',
        right: 18,
        top: '52%',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'rgba(255,200,80,0.8)',
        boxShadow: '0 0 8px rgba(255,200,80,0.6)',
      }} />

      {/* Silhouette */}
      <svg
        style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
        width={Math.round(w * 0.28)}
        height={Math.round(h * 0.5)}
        viewBox="0 0 60 106"
        fill="none"
      >
        {/* Head */}
        <ellipse cx="30" cy="12" rx="10" ry="12" fill="rgba(0,0,0,0.85)" />
        {/* Shoulder / body silhouette */}
        <path d="M10 35 Q12 24 30 24 Q48 24 50 35 L54 106 H6 Z" fill="rgba(0,0,0,0.85)" />
      </svg>

      {/* Volumetric light rays */}
      {[15, 30, 50, 70, 85].map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: 0,
            left: `${pos}%`,
            width: 1,
            height: '60%',
            background: `linear-gradient(180deg, rgba(255,220,120,${0.06 + i * 0.015}) 0%, transparent 100%)`,
            transform: `rotate(${(pos - 50) * 0.3}deg)`,
            transformOrigin: 'bottom center',
          }}
        />
      ))}
    </div>
  )
}
