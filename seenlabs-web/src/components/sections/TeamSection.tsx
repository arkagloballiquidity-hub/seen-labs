import { motion } from 'framer-motion'
import { team } from '../../data/team'

export function TeamSection() {
  return (
    <section id="equipo" style={{ background: 'var(--dark-2)' }}>
      <div className="container mx-auto max-w-[1100px]">
        <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}>
          The Team
        </motion.span>
        <motion.h2
          className="mb-16"
          style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--white)' }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}
        >
          The team behind <span className="text-accent-gradient">the light.</span>
        </motion.h2>
        <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              className="text-center py-10 px-7"
              style={{ background: 'var(--carbon)', border: '1px solid rgba(255,255,255,0.05)' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ borderColor: 'rgba(155,92,246,0.3)' }}
            >
              <div
                className="w-18 h-18 rounded-full mx-auto mb-5 flex items-center justify-center"
                style={{
                  width: 72, height: 72,
                  border: '2px solid rgba(155,92,246,0.3)',
                  background: 'linear-gradient(135deg, var(--carbon-2), rgba(155,92,246,0.2))',
                  fontFamily: 'Sora, sans-serif', fontSize: '1.6rem', fontWeight: 800, color: 'var(--purple)',
                }}
              >
                {member.photoUrl ? (
                  <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  member.initial
                )}
              </div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--white)', marginBottom: 8 }}>{member.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--mid-gray)', lineHeight: 1.6 }}>{member.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
