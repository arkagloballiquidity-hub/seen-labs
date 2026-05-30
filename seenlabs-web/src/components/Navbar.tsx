import { useState } from 'react'
import { useScrollNavbar } from '../hooks/useScrollNavbar'
import { NAV_LINKS, CTA_START_PATH } from '../lib/constants'
import { MobileNav } from './MobileNav'

export function Navbar() {
  const scrolled = useScrollNavbar()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
        style={{
          padding: scrolled ? '14px 60px' : '20px 60px',
          background: 'rgba(10,10,15,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 no-underline"
          style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '0.12em', color: 'var(--white)' }}
        >
          <span
            className="inline-block rounded-full animate-pulse-purple"
            style={{ width: 8, height: 8, background: 'var(--purple)', flexShrink: 0 }}
          />
          SEEN LABS
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-9 list-none">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm uppercase tracking-[0.08em] no-underline transition-colors duration-200"
                style={{ color: 'var(--light-gray)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--light-gray)')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={CTA_START_PATH}
          className="hidden md:inline-block px-6 py-2 text-xs font-semibold uppercase tracking-[0.1em] no-underline transition-all duration-300"
          style={{
            fontFamily: 'Sora, sans-serif',
            border: '1px solid var(--purple)',
            color: 'var(--purple)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--purple)'
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.boxShadow = '0 0 24px var(--purple-glow)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--purple)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Start The Path
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer bg-transparent border-none p-1"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-[1.5px]" style={{ background: 'var(--white)' }} />
          <span className="block w-6 h-[1.5px]" style={{ background: 'var(--white)' }} />
          <span className="block w-6 h-[1.5px]" style={{ background: 'var(--white)' }} />
        </button>
      </nav>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
