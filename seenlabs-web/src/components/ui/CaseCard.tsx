import { motion } from 'framer-motion'
import type { CaseStudy } from '../../data/cases'

export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <motion.div
      className="overflow-hidden"
      style={{ background: 'var(--carbon)', border: '1px solid rgba(255,255,255,0.06)' }}
      whileHover={{ y: -4, borderColor: 'rgba(155,92,246,0.3)' }}
      transition={{ duration: 0.4 }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: '#0e0e15', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: '#FFBD2E' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: '#28C840' }} />
        </div>
        <div className="flex-1 flex items-center px-2.5 h-5 text-[0.65rem]" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--mid-gray)', letterSpacing: '0.05em' }}>
          {study.domain}
        </div>
      </div>

      {/* Screenshot placeholder */}
      <div className="flex items-center justify-center h-[200px]" style={{ background: 'linear-gradient(135deg, var(--dark-3) 0%, var(--carbon-2) 100%)' }}>
        {study.photoUrl ? (
          <img src={study.photoUrl} alt={study.label} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center">
            <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: 'rgba(155,92,246,0.4)', letterSpacing: '0.05em' }}>{study.label}</div>
            <div style={{ fontSize: '0.7rem', marginTop: 8, color: 'rgba(155,92,246,0.3)' }}>[Screenshot coming soon]</div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-7">
        <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--purple)', textTransform: 'uppercase', marginBottom: 12 }}>
          {study.domain}
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--light-gray)', lineHeight: 1.7, marginBottom: 16 }}>"{study.quote}"</p>
        <div style={{ fontSize: '0.78rem', color: 'var(--mid-gray)' }}>{study.author}</div>
      </div>
    </motion.div>
  )
}
