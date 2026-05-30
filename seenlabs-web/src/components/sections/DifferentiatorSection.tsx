import { motion } from 'framer-motion'
import { comparison } from '../../data/comparison'

export function DifferentiatorSection() {
  return (
    <section id="diferenciador" style={{ background: 'var(--dark)' }}>
      <div className="container mx-auto max-w-[1100px]">
        <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}>
          Why Seen Labs
        </motion.span>
        <motion.h2
          className="mb-3"
          style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--white)' }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}
        >
          We don't ask permission<br /><span className="text-accent-gradient">to compete.</span>
        </motion.h2>
        <motion.p
          className="mb-16"
          style={{ fontSize: '1rem', color: 'var(--light-gray)', maxWidth: 560, lineHeight: 1.75 }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.1 }}
        >
          Seen Labs enters the market with aggressive pricing, fast execution, and a solution far above any traditional agency. While others sell design, we build exposure, automation, and closing systems.
        </motion.p>

        <motion.div
          style={{ border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}
        >
          {/* Header row */}
          <div className="grid" style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
            {['Feature', 'Traditional Agency', 'Seen Labs'].map((h, i) => (
              <div key={h} className="px-6 py-4" style={{ background: i === 2 ? 'rgba(155,92,246,0.05)' : 'var(--carbon)', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: i === 2 ? 'var(--purple)' : 'var(--white)' }}>
                {h}
              </div>
            ))}
          </div>
          {/* Data rows */}
          {comparison.map((row, i) => (
            <div key={i} className="grid hover:bg-white/[0.01] transition-colors" style={{ gridTemplateColumns: '2fr 1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="px-6 py-4" style={{ fontSize: '0.875rem', color: 'var(--light-gray)' }}>{row.feature}</div>
              <div className="px-6 py-4 flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--mid-gray)' }}>
                <span style={{ color: '#FF4444', fontSize: '0.8rem' }}>✕</span> {row.traditional}
              </div>
              <div className="px-6 py-4 flex items-center gap-2 font-semibold" style={{ fontSize: '0.875rem', color: 'var(--white)', background: 'rgba(155,92,246,0.05)' }}>
                <span style={{ color: 'var(--purple)', fontSize: '0.9rem' }}>✓</span> {row.seenLabs}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
