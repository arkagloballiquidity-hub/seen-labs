import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { HLSVideo } from '../ui/HLSVideo'
import { ParticleCanvas } from '../ui/ParticleCanvas'
import { DoorVisual } from '../ui/DoorVisual'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { HLS_PLACEHOLDER_URL, ROLE_WORDS, CTA_START_PATH } from '../../lib/constants'

gsap.registerPlugin()

export function HeroSection() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)

  useGSAP(() => {
    if (reduced) return
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo('.hero-headline', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
      .fromTo('.hero-blur-in', { opacity: 0, filter: 'blur(10px)', y: 20 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }, '-=0.8')
  }, { scope: containerRef })

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex(i => (i + 1) % ROLE_WORDS.length), 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center"
      style={{ padding: '120px 40px 80px' }}
    >
      {/* Video background */}
      <HLSVideo src={HLS_PLACEHOLDER_URL} overlay="light" />

      {/* Particles */}
      <ParticleCanvas />

      {/* Radial bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(124,58,237,0.18) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 20%, rgba(155,92,246,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--dark), transparent)' }}
      />

      {/* Door visual */}
      <DoorVisual size="small" />

      {/* Hero content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div
          className="hero-blur-in inline-flex items-center gap-2 mb-8 px-5 py-1.5 text-xs tracking-[0.18em] uppercase"
          style={{
            fontFamily: 'Sora, sans-serif',
            border: '1px solid rgba(155,92,246,0.3)',
            background: 'rgba(155,92,246,0.08)',
            color: 'var(--purple)',
            borderRadius: 2,
          }}
        >
          <span>◈</span> Out of the Dark
        </div>

        {/* Headline */}
        <h1
          className="hero-headline mb-6 leading-[1.05] tracking-tight"
          style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
            color: 'var(--white)',
          }}
        >
          Your business<br />
          <span className="text-accent-gradient">deserves to be seen.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-blur-in mb-4 mx-auto"
          style={{ fontSize: '1.15rem', color: 'var(--light-gray)', maxWidth: 600, lineHeight: 1.7 }}
        >
          The most successful companies are not always the best.<br />
          They are the most <strong style={{ color: 'var(--white)' }}>visible</strong>.
        </p>

        {/* Role cycling */}
        <p
          className="hero-blur-in mb-11 mx-auto text-sm"
          style={{ color: 'var(--mid-gray)', maxWidth: 560 }}
        >
          Seen Labs builds websites, AI funnels, ads, automation and conversion systems that take your business{' '}
          <strong
            key={roleIndex}
            className="animate-role-fade-in inline-block"
            style={{ color: 'var(--light-gray)' }}
          >
            {ROLE_WORDS[roleIndex].toLowerCase()}
          </strong>{' '}
          out of the dark in 7 business days.
        </p>

        {/* CTAs */}
        <div className="hero-blur-in flex gap-4 justify-center flex-wrap">
          <a
            href={CTA_START_PATH}
            className="inline-block px-9 py-4 text-sm font-bold uppercase tracking-[0.1em] no-underline transition-all duration-300 relative overflow-hidden"
            style={{ fontFamily: 'Sora, sans-serif', background: 'var(--purple)', color: '#fff' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px var(--purple-glow), 0 0 60px rgba(155,92,246,0.2)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
          >
            Start The Path
          </a>
          <a
            href="#solucion"
            className="inline-block px-9 py-4 text-sm font-semibold uppercase tracking-[0.1em] no-underline transition-all duration-300"
            style={{
              fontFamily: 'Sora, sans-serif',
              background: 'transparent',
              color: 'var(--off-white)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--purple)'
              e.currentTarget.style.color = 'var(--white)'
              e.currentTarget.style.background = 'rgba(155,92,246,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.color = 'var(--off-white)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            See The System
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--mid-gray)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
      >
        <div
          className="animate-scroll-down"
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--purple), transparent)' }}
        />
        <span>Scroll</span>
      </div>
    </section>
  )
}
