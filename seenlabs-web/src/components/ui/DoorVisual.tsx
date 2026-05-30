interface DoorVisualProps {
  size?: 'small' | 'large'
}

export function DoorVisual({ size = 'small' }: DoorVisualProps) {
  const w = size === 'large' ? 400 : 260
  const h = size === 'large' ? 600 : 420

  return (
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
      style={{ width: w, height: h }}
      aria-hidden="true"
    >
      {/* Glow beneath door */}
      <div
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 animate-door-breath"
        style={{
          width: w + 20,
          height: h / 2,
          background: 'radial-gradient(ellipse at 50% 100%, rgba(155,92,246,0.5) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
      {/* Door frame */}
      <div
        className="absolute inset-0"
        style={{ border: '2px solid rgba(155,92,246,0.5)', borderBottom: 'none' }}
      />
      {/* Door light */}
      <div
        className="absolute animate-door-breath"
        style={{
          inset: '4px 4px 0',
          background: 'linear-gradient(to top, rgba(155,92,246,0.35) 0%, rgba(200,160,255,0.15) 40%, rgba(255,255,255,0.05) 100%)',
          filter: 'blur(2px)',
        }}
      />
      {/* Horizontal divider */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: '50%',
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(155,92,246,0.4), transparent)',
        }}
      />
      {/* Door knob */}
      <div
        className="absolute right-5 animate-pulse-purple"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--purple)',
          boxShadow: '0 0 10px var(--purple)',
        }}
      />
      {/* Silhouette */}
      <svg
        className="absolute bottom-[2px] left-1/2 -translate-x-1/2 opacity-60"
        width="40"
        height="130"
        viewBox="0 0 40 130"
        fill="none"
      >
        <ellipse cx="20" cy="12" rx="8" ry="8" fill="rgba(155,92,246,0.5)" />
        <rect x="13" y="22" width="14" height="50" rx="4" fill="rgba(155,92,246,0.4)" />
        <rect x="8" y="24" width="10" height="34" rx="4" fill="rgba(155,92,246,0.3)" />
        <rect x="22" y="24" width="10" height="34" rx="4" fill="rgba(155,92,246,0.3)" />
        <rect x="15" y="70" width="8" height="50" rx="4" fill="rgba(155,92,246,0.35)" />
        <rect x="17" y="70" width="8" height="50" rx="4" fill="rgba(155,92,246,0.35)" />
      </svg>
    </div>
  )
}
