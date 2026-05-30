import { motion } from 'framer-motion'
import { HLSVideo } from '../ui/HLSVideo'
import { DoorVisual } from '../ui/DoorVisual'
import { Marquee } from '../ui/Marquee'
import { HLS_PLACEHOLDER_URL, NAV_LINKS, CTA_START_PATH } from '../../lib/constants'

export function FinalCTASection() {
  return (
    <>
      {/* Final CTA */}
      <section
        id="final-cta"
        className="relative overflow-hidden text-center"
        style={{ padding: '160px 40px', background: 'var(--dark)' }}
      >
        {/* Video background */}
        <HLSVideo src={HLS_PLACEHOLDER_URL} overlay="heavy" />

        {/* Radial glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 600, height: 400,
            background: 'radial-gradient(ellipse at 50% 100%, rgba(155,92,246,0.35) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Large door */}
        <DoorVisual size="large" />

        {/* Content */}
        <div className="relative z-10">
          <motion.span
            className="section-label"
            style={{ display: 'block', textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}
          >
            The Path Awaits
          </motion.span>
          <motion.h2
            className="mb-5"
            style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--white)' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}
          >
            Your market is waiting.<br />Step out of the dark.
          </motion.h2>
          <motion.p
            className="mb-11 mx-auto"
            style={{ fontSize: '1.1rem', color: 'var(--light-gray)', maxWidth: 480 }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1 }}
          >
            Every day without visibility is a day your competitors take what's yours.
          </motion.p>
          <motion.a
            href={CTA_START_PATH}
            className="inline-block px-9 py-4 text-sm font-bold uppercase tracking-[0.1em] no-underline transition-all duration-300"
            style={{ fontFamily: 'Sora, sans-serif', background: 'var(--purple)', color: '#fff' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ boxShadow: '0 0 30px var(--purple-glow), 0 0 60px rgba(155,92,246,0.2)' }}
          >
            Begin The Path
          </motion.a>
        </div>
      </section>

      {/* Marquee band */}
      <Marquee />

      {/* Footer */}
      <footer
        className="flex items-center justify-between flex-wrap gap-5"
        style={{ background: 'var(--dark-2)', padding: 40, borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div>
          <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.12em', color: 'var(--white)' }}>
            SEEN LABS
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--mid-gray)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
            Out of the Dark
          </div>
        </div>

        <div className="flex gap-6 flex-wrap">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="no-underline transition-colors duration-200"
              style={{ fontSize: '0.8rem', color: 'var(--mid-gray)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--mid-gray)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--mid-gray)' }}>
          © 2025 Seen Labs · All rights reserved
        </div>
      </footer>
    </>
  )
}
