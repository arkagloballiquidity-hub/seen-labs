import { motion } from 'framer-motion'
import { PricingCard } from '../ui/PricingCard'
import { PRICING_PLANS } from '../../data/pricing'
import { COMPARISON } from '../../data/comparison'

export function PricingSection({ hideHero }: { hideHero?: boolean }) {
  return (
    <section id="pricing" className="section" style={{ background: 'var(--carbon)' }}>
      <div className="container">
        {!hideHero && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <div className="section-label" style={{ justifyContent: 'center' }}>Precios</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: 16,
            }}>
              Inversión, no gasto.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 440, margin: '0 auto' }}>
              Cada plan incluye todo lo que necesitas para salir a la luz y generar resultados reales.
            </p>
          </motion.div>
        )}

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'rgba(255,255,255,0.04)',
          marginBottom: 80,
          alignItems: 'stretch',
        }}>
          {PRICING_PLANS.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 2.5vw, 32px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            marginBottom: 32,
            color: 'var(--text-primary)',
          }}>
            Seen Labs vs. Agencia tradicional
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontFamily: 'var(--font-sub)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    Característica
                  </th>
                  <th style={{ padding: '12px 20px', textAlign: 'center', fontFamily: 'var(--font-sub)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    Agencia Tradicional
                  </th>
                  <th style={{ padding: '12px 20px', textAlign: 'center', fontFamily: 'var(--font-sub)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--purple)', borderBottom: '1px solid rgba(123,97,255,0.3)' }}>
                    Seen Labs
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-sub)', fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>
                      {row.feature}
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', fontSize: 14, color: 'var(--text-dim)' }}>
                      {row.traditional}
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', fontSize: 14, color: 'var(--purple)', fontWeight: 600 }}>
                      {row.seenLabs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #pricing .container > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
