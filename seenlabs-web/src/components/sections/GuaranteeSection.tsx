import { motion } from 'framer-motion'

export function GuaranteeSection() {
  return (
    <section id="garantia" style={{ background: 'var(--dark-2)' }}>
      <div className="container mx-auto max-w-[700px] text-center">
        <motion.div
          className="mx-auto mb-10 flex flex-col items-center justify-center"
          style={{ width: 100, height: 100, borderRadius: '50%', border: '2px solid var(--purple)', boxShadow: '0 0 40px var(--purple-glow)' }}
          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
        >
          <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.6rem', fontWeight: 800, color: 'var(--white)', lineHeight: 1 }}>7</div>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--purple)' }}>Day Guarantee</div>
        </motion.div>

        <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>Risk-Free</span>

        <motion.h2
          className="mb-5"
          style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--white)' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}
        >
          7-Day Cash Back Guarantee.
        </motion.h2>

        <motion.p
          className="mb-9"
          style={{ fontSize: '1rem', color: 'var(--light-gray)', lineHeight: 1.8 }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1 }}
        >
          We are backed by Hotmart's infrastructure and trust. If during the first 7 days you are not satisfied with the process, you have a 100% refund guarantee, in accordance with the terms of the contract and the platform.
        </motion.p>

        <motion.a
          href="#paquetes"
          className="inline-block px-9 py-4 text-sm font-bold uppercase tracking-[0.1em] no-underline transition-all duration-300"
          style={{ fontFamily: 'Sora, sans-serif', background: 'var(--purple)', color: '#fff' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ boxShadow: '0 0 30px var(--purple-glow)' }}
        >
          Start Risk-Free
        </motion.a>
      </div>
    </section>
  )
}
