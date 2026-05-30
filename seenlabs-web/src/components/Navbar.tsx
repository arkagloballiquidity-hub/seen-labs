import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollNavbar } from '../hooks/useScrollNavbar'
import { NAV_LINKS } from '../lib/constants'

export function Navbar() {
  const scrolled = useScrollNavbar()
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          width: 'calc(100% - 48px)',
          maxWidth: 980,
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          background: scrolled ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${scrolled ? 'rgba(123,97,255,0.2)' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 2,
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(123,97,255,0.1)' : 'none',
          transition: 'all 0.3s ease',
        }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <motion.div
              animate={{ boxShadow: ['0 0 8px rgba(123,97,255,0.6)', '0 0 18px rgba(123,97,255,1)', '0 0 8px rgba(123,97,255,0.6)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--purple)',
                flexShrink: 0,
              }}
            />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
            }}>
              SEEN LABS
            </span>
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hidden-mobile">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-sub)',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="#" className="btn-primary hidden-mobile" style={{ padding: '9px 20px', fontSize: 12 }}>
              Iniciar el Camino
            </a>
            {/* Hamburger */}
            <button
              onClick={() => setOpen(v => !v)}
              aria-label="Menú"
              className="show-mobile"
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                borderRadius: 2,
              }}
            >
              <span style={{ display: 'block', width: 18, height: 1.5, background: 'currentColor' }} />
              <span style={{ display: 'block', width: 18, height: 1.5, background: 'currentColor' }} />
              <span style={{ display: 'block', width: 12, height: 1.5, background: 'currentColor' }} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(16px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 32,
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: 24,
                cursor: 'pointer',
              }}
              aria-label="Cerrar menú"
            >
              ✕
            </button>
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <a href="#" className="btn-primary" onClick={() => setOpen(false)}>
              Iniciar el Camino
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 901px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
