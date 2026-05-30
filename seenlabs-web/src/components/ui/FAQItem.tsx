import { motion, AnimatePresence } from 'framer-motion'
import type { FAQEntry } from '../../data/faq'

interface FAQItemProps {
  entry: FAQEntry
  isOpen: boolean
  onToggle: () => void
}

export function FAQItem({ entry, isOpen, onToggle }: FAQItemProps) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-5 py-6 text-left transition-colors duration-200"
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Sora, sans-serif', fontSize: '0.95rem', fontWeight: 600,
          color: isOpen ? 'var(--purple)' : 'var(--white)',
        }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.color = 'var(--purple)' }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.color = 'var(--white)' }}
      >
        {entry.question}
        <div
          className="flex-shrink-0 flex items-center justify-center transition-all duration-300"
          style={{
            width: 28, height: 28,
            border: `1px solid ${isOpen ? 'var(--purple)' : 'rgba(255,255,255,0.1)'}`,
            color: 'var(--purple)', fontSize: '1.1rem',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-5" style={{ fontSize: '0.875rem', color: 'var(--light-gray)', lineHeight: 1.75 }}>
              {entry.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
