import { motion } from 'framer-motion'
import type { PricingPlan } from '../../data/pricing'

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const isMain = plan.ctaStyle === 'main'
  const isOutline = plan.ctaStyle === 'outline'

  return (
    <motion.div
      className="relative flex flex-col p-11"
      style={{
        background: plan.featured
          ? 'linear-gradient(160deg, var(--carbon-2) 0%, rgba(155,92,246,0.08) 100%)'
          : 'var(--carbon)',
        border: plan.featured ? '1px solid rgba(155,92,246,0.5)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: plan.featured ? '0 0 60px rgba(155,92,246,0.12), inset 0 0 60px rgba(155,92,246,0.03)' : 'none',
        marginTop: plan.featured ? -20 : 0,
        marginBottom: plan.featured ? -20 : 0,
        paddingTop: plan.featured ? 64 : 44,
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
    >
      {plan.badge && (
        <div
          className="absolute -top-[1px] left-1/2 -translate-x-1/2 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.14em]"
          style={{ background: 'var(--purple)', color: '#fff', fontFamily: 'Sora, sans-serif' }}
        >
          {plan.badge}
        </div>
      )}

      <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--purple)', marginBottom: 12 }}>
        {plan.name}
      </div>
      <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: plan.featured ? '2rem' : '2.6rem', color: 'var(--white)', lineHeight: 1, marginBottom: 4 }}>
        {plan.price}
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--mid-gray)', marginBottom: 8 }}>{plan.period}</div>
      <div style={{ fontSize: '0.875rem', color: 'var(--light-gray)', marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.06)', lineHeight: 1.6 }}>
        {plan.description}
      </div>

      <ul className="flex-1 flex flex-col gap-3 mb-9" style={{ listStyle: 'none' }}>
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2" style={{ fontSize: '0.85rem', color: 'var(--light-gray)' }}>
            <span style={{ color: 'var(--purple)', fontSize: '0.75rem', marginTop: 3, flexShrink: 0 }}>→</span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#final-cta"
        className="block text-center py-3.5 text-sm font-bold uppercase tracking-[0.12em] no-underline transition-all duration-300"
        style={{
          fontFamily: 'Sora, sans-serif',
          background: isMain ? 'var(--purple)' : 'transparent',
          border: isMain ? 'none' : isOutline ? '1px solid var(--purple)' : '1px solid rgba(255,255,255,0.15)',
          color: isMain ? '#fff' : isOutline ? 'var(--purple)' : 'var(--off-white)',
          boxShadow: isMain ? '0 0 24px var(--purple-glow)' : 'none',
        }}
        onMouseEnter={e => {
          if (isMain) e.currentTarget.style.boxShadow = '0 0 40px var(--purple-glow)'
          if (isOutline) e.currentTarget.style.background = 'rgba(155,92,246,0.1)'
          if (!isMain && !isOutline) { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--white)' }
        }}
        onMouseLeave={e => {
          if (isMain) e.currentTarget.style.boxShadow = '0 0 24px var(--purple-glow)'
          if (isOutline) e.currentTarget.style.background = 'transparent'
          if (!isMain && !isOutline) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'var(--off-white)' }
        }}
      >
        {plan.ctaLabel}
      </a>
    </motion.div>
  )
}
