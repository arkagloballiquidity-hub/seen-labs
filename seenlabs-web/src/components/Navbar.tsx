import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollNavbar } from '../hooks/useScrollNavbar'
import { NAV_LINKS } from '../lib/constants'
import { useAuth } from '../lib/auth'

export function Navbar() {
  const scrolled = useScrollNavbar()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { user, role, loading: authLoading } = useAuth()

  const dashboardHref  = role === 'admin' ? '/crm' : '/mi-proyecto'
  const dashboardLabel = role === 'admin' ? 'Dashboard' : 'Mi Proyecto'

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 16,
          left: 24,
          right: 24,
          margin: '0 auto',
          zIndex: 1000,
          maxWidth: 1100,
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '11px 20px',
          background: scrolled ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${scrolled ? 'rgba(123,97,255,0.25)' : 'rgba(255,255,255,0.07)'}`,
          borderRadius: 2,
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
          transition: 'all 0.3s ease',
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="Seen Labs"
              style={{ height: 32, width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden-mobile" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            {NAV_LINKS.map(link => {
              const active = location.pathname === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{
                    fontFamily: 'var(--font-sub)',
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    color: active ? 'var(--purple)' : 'var(--text-muted)',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-primary)' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  {link.label}
                  {active && (
                    <span style={{
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 1,
                      background: 'var(--purple)',
                    }} />
                  )}
                </Link>
              )
            })}
          </div>

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user && !authLoading ? (
              <Link to={dashboardHref} className="btn-primary hidden-mobile" style={{ padding: '8px 16px', fontSize: 11 }}>
                {dashboardLabel}
              </Link>
            ) : !user ? (
              <>
                <Link to="/acceso" className="hidden-mobile" style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
                >
                  Acceso
                </Link>
                <Link to="/precios" className="btn-primary hidden-mobile" style={{ padding: '8px 16px', fontSize: 11 }}>
                  Iniciar el Camino
                </Link>
              </>
            ) : null}
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
                display: 'none',
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
              background: 'rgba(0,0,0,0.96)',
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
              style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 24, cursor: 'pointer' }}
              aria-label="Cerrar menú"
            >
              ✕
            </button>
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 28,
                    fontWeight: 700,
                    color: location.pathname === link.href ? 'var(--purple)' : 'var(--text-primary)',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {user && !authLoading ? (
              <Link to={dashboardHref} className="btn-primary" onClick={() => setOpen(false)}>
                {dashboardLabel}
              </Link>
            ) : !user ? (
              <>
                <Link to="/precios" className="btn-primary" onClick={() => setOpen(false)}>
                  Iniciar el Camino
                </Link>
                <Link to="/acceso" onClick={() => setOpen(false)} style={{ fontSize: 13, color: 'var(--text-dim)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Acceso
                </Link>
              </>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 861px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
