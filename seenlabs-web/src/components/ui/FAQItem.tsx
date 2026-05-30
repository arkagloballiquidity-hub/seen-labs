import { AnimatePresence, motion } from 'framer-motion'
import type { FAQEntry } from '../../data/faq'

interface Props {
  entry: FAQEntry
  isOpen: boolean
  onToggle: () => void
}

export function FAQItem({ entry, isOpen, onToggle }: Props) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
      >
        <span style={{ flex: 1 }}>{entry.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: `1px solid ${isOpen ? 'var(--purple)' : 'rgba(255,255,255,0.15)'}`,
            background: isOpen ? 'var(--purple)' : 'transparent',
            color: isOpen ? '#fff' : 'var(--text-muted)',
            flexShrink: 0,
            fontSize: 18,
            lineHeight: 1,
            transition: 'background 0.2s, border-color 0.2s',
          }}
          aria-hidden
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontSize: 15,
              lineHeight: 1.75,
              color: 'var(--text-muted)',
              paddingBottom: 24,
              paddingRight: 44,
            }}>
              {entry.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
