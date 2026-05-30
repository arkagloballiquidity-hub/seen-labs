import { motion } from 'framer-motion'

const lines = [
  'If they don\'t see you, they can\'t choose you.',
  'Visibility is not vanity. Visibility is survival.',
  'Out of the dark is not a slogan. It is a system.',
]

export function ManifestoSection() {
  return (
    <section id="manifesto" style={{ background: 'var(--dark-2)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="container mx-auto max-w-[820px] text-center">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}
        >
          Manifesto
        </motion.span>

        <motion.h2
          className="mb-10"
          style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--white)' }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}
        >
          Darkness kills more<br />businesses than{' '}
          <span style={{ color: 'var(--mid-gray)' }}>bad products.</span>
        </motion.h2>

        <motion.p
          className="mb-14 mx-auto"
          style={{ fontSize: '1.1rem', color: 'var(--light-gray)', lineHeight: 1.8, maxWidth: 700 }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.1 }}
        >
          Most entrepreneurs don't fail because their product is bad. They fail because the market never sees them, never understands them, and never remembers them. Seen Labs exists to change that.
        </motion.p>

        <div className="flex flex-col">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 py-6"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', fontFamily: 'Sora, sans-serif', fontSize: 'clamp(1rem, 2.2vw, 1.35rem)', fontWeight: 600, color: 'var(--off-white)' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <span style={{ color: 'var(--purple)', fontSize: '0.75rem', letterSpacing: '0.12em', minWidth: 24 }}>
                0{i + 1}
              </span>
              {line}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
