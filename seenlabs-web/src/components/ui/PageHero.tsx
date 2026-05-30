import { motion } from 'framer-motion'

interface Props {
  label: string
  title: string
  subtitle?: string
}

export function PageHero({ label, title, subtitle }: Props) {
  return (
    <section style={{
      paddingTop: 160,
      paddingBottom: 80,
      background: 'var(--black)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Radial gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(123,97,255,0.1) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      {/* Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-label" style={{ marginBottom: 16 }}>{label}</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: subtitle ? 20 : 0,
            maxWidth: 800,
          }}>
            <span className="text-chrome">{title}</span>
          </h1>
          {subtitle && (
            <p style={{
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              lineHeight: 1.7,
              color: 'var(--text-muted)',
              maxWidth: 560,
            }}>
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        background: 'linear-gradient(180deg, transparent, var(--black))',
        pointerEvents: 'none',
      }} />
    </section>
  )
}
