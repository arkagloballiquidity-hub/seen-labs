import { motion } from 'framer-motion'
import { NAV_LINKS, CTA_START_PATH } from '../lib/constants'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[998] flex flex-col items-center justify-center gap-8"
      style={{ background: 'rgba(10,10,15,0.98)' }}
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ duration: 0.4, ease: [0.77, 0, 0.18, 1] }}
    >
      {NAV_LINKS.map(link => (
        <a
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="text-2xl font-bold tracking-wide transition-colors duration-200"
          style={{
            fontFamily: 'Sora, sans-serif',
            color: 'var(--white)',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--white)')}
        >
          {link.label}
        </a>
      ))}
      <a
        href={CTA_START_PATH}
        onClick={onClose}
        className="mt-4 px-6 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300"
        style={{
          fontFamily: 'Sora, sans-serif',
          border: '1px solid var(--purple)',
          color: 'var(--purple)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--purple)'
          e.currentTarget.style.color = '#fff'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--purple)'
        }}
      >
        Start The Path
      </a>
    </motion.div>
  )
}
