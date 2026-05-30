import { motion } from 'framer-motion'
import { TEAM } from '../../data/team'

export function TeamSection() {
  return (
    <section className="section" style={{ background: 'var(--carbon)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <div className="section-label">El Equipo Elite</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: 560,
          }}>
            Las personas que te sacan de la oscuridad.
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'rgba(255,255,255,0.04)',
        }}>
          {TEAM.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: '40px 32px',
                background: 'var(--carbon)',
                transition: 'all 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(123,97,255,0.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--carbon)'
              }}
            >
              {/* Area badge */}
              <div style={{
                display: 'inline-block',
                fontFamily: 'var(--font-sub)',
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--purple)',
                border: '1px solid rgba(123,97,255,0.25)',
                padding: '3px 8px',
                marginBottom: 20,
              }}>
                {member.area}
              </div>

              {/* Avatar */}
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(123,97,255,0.25), rgba(91,65,223,0.08))',
                border: '1px solid rgba(123,97,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: 24,
                fontWeight: 700,
                color: 'var(--purple)',
                marginBottom: 20,
                boxShadow: '0 0 20px rgba(123,97,255,0.1)',
              }}>
                {member.initial}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-sub)',
                fontSize: 20,
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: 8,
                letterSpacing: '-0.01em',
              }}>
                {member.name}
              </h3>

              <p style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: 'var(--text-dim)',
              }}>
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
