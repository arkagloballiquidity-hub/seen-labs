import { motion } from 'framer-motion'
import { pillars } from '../../data/pillars'

export function SolutionSection() {
  return (
    <section id="solucion" style={{ background: 'var(--dark-2)' }}>
      <div className="container mx-auto max-w-[1100px]">
        <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}>
          The Solution
        </motion.span>
        <motion.h2
          className="mb-6"
          style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--white)' }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}
        >
          Seen Labs builds your<br /><span className="text-accent-gradient">door to the light.</span>
        </motion.h2>

        {/* Intro grid */}
        <div className="grid gap-20 mb-20 items-center" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <motion.p
            style={{ fontSize: '1rem', color: 'var(--light-gray)', maxWidth: 560, lineHeight: 1.75 }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}
          >
            We don't make pretty pages. We build visibility machines, trust systems, and sales engines.
          </motion.p>
          <motion.div
            style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--white)', lineHeight: 1.4, borderLeft: '3px solid var(--purple)', paddingLeft: 24 }}
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}
          >
            "No hacemos páginas bonitas. Construimos máquinas de visibilidad, confianza y ventas."
          </motion.div>
        </div>

        {/* Pillars grid */}
        <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              className="flex items-start gap-3 p-7 transition-all duration-300 group"
              style={{ background: 'var(--carbon)', border: '1px solid rgba(255,255,255,0.05)' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ borderColor: 'rgba(155,92,246,0.4)' }}
            >
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: 'var(--purple)', letterSpacing: '0.1em', minWidth: 22, marginTop: 3 }}>{p.num}</span>
              <div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: 'var(--off-white)', lineHeight: 1.4 }}>{p.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--mid-gray)', marginTop: 4 }}>{p.subtitle}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
