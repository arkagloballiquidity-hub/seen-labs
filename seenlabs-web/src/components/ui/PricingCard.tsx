import { motion } from 'framer-motion'
import type { PricingPlan } from '../../data/pricing'
import { openCalendly } from '../../lib/calendly'

interface Props {
  plan: PricingPlan
  index: number
}

export function PricingCard({ plan, index }: Props) {
  const isFeatured = !!plan.featured

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={`pricing-card glass${isFeatured ? '-purple' : ''}`}
      style={{
        borderRadius: 2,
        border: isFeatured ? '1px solid rgba(123,97,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        marginTop: isFeatured ? -16 : 0,
        marginBottom: isFeatured ? -16 : 0,
        boxShadow: isFeatured ? '0 0 60px rgba(123,97,255,0.15)' : 'none',
      }}
    >
      {isFeatured && (
        <div style={{
          position: 'absolute',
          top: -1,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--purple)',
          color: '#fff',
          fontSize: 10,
          fontFamily: 'var(--font-sub)',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          padding: '4px 16px',
          clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
        }}>
          {plan.badge}
        </div>
      )}

      <div style={{ marginBottom: 8 }}>
        <span style={{
          fontFamily: 'var(--font-sub)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: isFeatured ? 'var(--purple)' : 'var(--text-muted)',
        }}>
          {plan.name}
        </span>
      </div>

      <div style={{ marginBottom: 4 }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 4vw, 48px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
        }}>
          {plan.price}
        </span>
      </div>

      {plan.tagline && (
        <p style={{
          fontFamily: 'var(--font-sub)',
          fontSize: 12,
          fontWeight: 600,
          color: isFeatured ? 'rgba(123,97,255,0.8)' : 'var(--text-dim)',
          letterSpacing: '0.04em',
          marginBottom: 6,
          fontStyle: 'italic',
        }}>
          {plan.tagline}
        </p>
      )}

      <p style={{
        fontFamily: 'var(--font-sub)',
        fontSize: 12,
        color: 'var(--text-dim)',
        letterSpacing: '0.05em',
        marginBottom: 20,
      }}>
        {plan.period}
      </p>

      <p style={{
        fontSize: 14,
        lineHeight: 1.65,
        color: 'var(--text-muted)',
        marginBottom: 28,
      }}>
        {plan.description}
      </p>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, marginBottom: 32 }}>
        {plan.features.map((f, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            marginBottom: 10,
            fontSize: 14,
            color: 'var(--text-muted)',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
              <path d="M2 7L5.5 10.5L12 3.5" stroke="var(--purple)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </div>
        ))}
      </div>

      <a
        href={plan.ctaHref?.startsWith('http') ? plan.ctaHref : '#'}
        className={plan.ctaStyle === 'main' ? 'btn-primary' : plan.ctaStyle === 'outline' ? 'btn-outline' : 'btn-ghost'}
        style={{ display: 'block', textAlign: 'center' }}
        target={plan.ctaHref?.includes('hotmart.com') ? '_blank' : undefined}
        rel={plan.ctaHref?.includes('hotmart.com') ? 'noopener noreferrer' : undefined}
        onClick={plan.ctaHref?.startsWith('http') ? undefined : openCalendly}
      >
        {plan.ctaLabel}
      </a>
    </motion.div>
  )
}
