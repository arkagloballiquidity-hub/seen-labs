import { motion } from 'framer-motion'
import type { CaseStudy } from '../../data/cases'

interface Props {
  caseStudy: CaseStudy
  index: number
}

export function CaseCard({ caseStudy, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {/* Browser chrome + iframe */}
      <div style={{
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 2,
        overflow: 'hidden',
        background: 'var(--carbon-2)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        transition: 'box-shadow 0.3s, transform 0.3s',
      }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.boxShadow = '0 20px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(123,97,255,0.2)'
          el.style.transform = 'translateY(-4px)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)'
          el.style.transform = 'translateY(0)'
        }}
      >
        {/* Browser chrome bar */}
        <div style={{
          background: 'var(--carbon-3)',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', flexShrink: 0 }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', flexShrink: 0 }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C940', flexShrink: 0 }} />

          {/* URL bar */}
          <div style={{
            flex: 1,
            height: 24,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 3,
            marginLeft: 6,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 10,
            gap: 6,
          }}>
            {/* Lock icon */}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
              <rect x="1.5" y="4.5" width="7" height="5" rx="1" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <path d="M3 4.5V3a2 2 0 014 0v1.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            </svg>
            <span style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.01em',
            }}>
              {caseStudy.domain}
            </span>
          </div>

          {/* External link */}
          <a
            href={caseStudy.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(255,255,255,0.2)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
            title="Abrir sitio real"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7M8 1h3m0 0v3m0-3L5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* iframe viewport */}
        <div style={{
          position: 'relative',
          height: 320,
          overflow: 'hidden',
          background: 'var(--carbon)',
        }}>
          <iframe
            src={caseStudy.url}
            title={caseStudy.label}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
            }}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
          {/* Subtle overlay to capture mouse for card hover without blocking iframe scroll */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'transparent',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* Quote card */}
      <div style={{
        marginTop: 1,
        padding: '28px 28px 24px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderTop: '2px solid rgba(123,97,255,0.3)',
      }}>
        {/* Result badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(123,97,255,0.1)',
          border: '1px solid rgba(123,97,255,0.25)',
          padding: '4px 12px',
          marginBottom: 16,
          clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
        }}>
          <span style={{
            fontFamily: 'var(--font-sub)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--purple)',
          }}>
            {caseStudy.result}
          </span>
        </div>

        <p style={{
          fontSize: 14,
          lineHeight: 1.75,
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          marginBottom: 16,
        }}>
          "{caseStudy.quote}"
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(123,97,255,0.3), rgba(91,65,223,0.1))',
            border: '1px solid rgba(123,97,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--purple)',
            flexShrink: 0,
          }}>
            {caseStudy.label[0]}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-sub)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
              {caseStudy.author}
            </div>
            <div style={{ fontFamily: 'var(--font-sub)', fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
              {caseStudy.authorRole}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
