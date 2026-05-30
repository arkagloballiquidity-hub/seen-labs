import { motion } from 'framer-motion'
import type { ProblemCard as ProblemCardType } from '../../data/problems'

export function ProblemCard({ card }: { card: ProblemCardType }) {
  return (
    <motion.div
      className="relative overflow-hidden p-9 cursor-default group"
      style={{ background: 'var(--carbon)', border: '1px solid rgba(255,255,255,0.05)' }}
      whileHover={{ y: -3, borderColor: 'rgba(155,92,246,0.3)' }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(135deg, rgba(155,92,246,0.06) 0%, transparent 60%)' }}
      />
      <div
        className="w-10 h-10 mb-5 flex items-center justify-center text-xl relative z-10"
        style={{ border: '1px solid rgba(155,92,246,0.3)', color: 'var(--purple)' }}
      >
        {card.icon}
      </div>
      <div
        className="mb-2 relative z-10"
        style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: 'var(--white)' }}
      >
        {card.title}
      </div>
      <div className="relative z-10" style={{ fontSize: '0.875rem', color: 'var(--mid-gray)', lineHeight: 1.7 }}>
        {card.description}
      </div>
    </motion.div>
  )
}
