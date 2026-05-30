import { motion } from 'framer-motion'
import { CaseCard } from '../ui/CaseCard'
import { CASES } from '../../data/cases'

export function CasesSection({ hideHero }: { hideHero?: boolean }) {
  return (
    <section id="cases" className="section" style={{ background: 'var(--black)' }}>
      <div className="container">
        {!hideHero && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 64 }}
          >
            <div className="section-label">Casos de Éxito</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: 580,
            }}>
              Resultados reales,
              <br />
              <span className="text-chrome">no promesas</span>.
            </h2>
          </motion.div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 1,
          background: 'rgba(255,255,255,0.04)',
        }}>
          {CASES.map((c, i) => (
            <CaseCard key={c.id} caseStudy={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
