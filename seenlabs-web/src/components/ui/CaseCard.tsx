import { motion } from 'framer-motion'
import type { CaseStudy } from '../../data/cases'

interface Props {
  caseStudy: CaseStudy
  index: number
}

export function CaseCard({ caseStudy, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="case-card glass"
      style={{ borderRadius: 2 }}
    >
      {/* Browser Chrome */}
      <div className="browser-chrome">
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C940' }} />
        <div style={{
          flex: 1,
          height: 22,
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 3,
          marginLeft: 8,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 8,
        }}>
          <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-body)' }}>
            {caseStudy.domain}
          </span>
        </div>
      </div>

      {/* Screenshot placeholder */}
      <div style={{
        aspectRatio: '16/9',
        background: `linear-gradient(135deg, #0A0A0A 0%, #111111 50%, rgba(123,97,255,0.08) 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.3em',
            color: 'rgba(123,97,255,0.4)',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}>
            {caseStudy.label}
          </div>
          <div style={{
            fontFamily: 'var(--font-sub)',
            fontSize: 28,
            fontWeight: 800,
            color: 'rgba(123,97,255,0.6)',
          }}>
            {caseStudy.result}
          </div>
        </div>
        {/* Purple corner accent */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 80,
          height: 80,
          background: 'radial-gradient(circle at 100% 100%, rgba(123,97,255,0.15) 0%, transparent 70%)',
        }} />
      </div>

      {/* Quote */}
      <div style={{ padding: '24px 28px' }}>
        <p style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          marginBottom: 16,
        }}>
          "{caseStudy.quote}"
        </p>
        <span style={{
          fontFamily: 'var(--font-sub)',
          fontSize: 12,
          color: 'var(--text-dim)',
          letterSpacing: '0.05em',
        }}>
          — {caseStudy.author}
        </span>
      </div>
    </motion.div>
  )
}
