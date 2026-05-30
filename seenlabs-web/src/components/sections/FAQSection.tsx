import { useState } from 'react'
import { motion } from 'framer-motion'
import { FAQItem } from '../ui/FAQItem'
import { FAQ } from '../../data/faq'

export function FAQSection({ hideHero }: { hideHero?: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="section" style={{ background: 'var(--black)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: hideHero ? '1fr 1.8fr' : '1fr 1.6fr',
          gap: 80,
          alignItems: 'start',
        }}>
          {/* Left sticky panel */}
          {!hideHero && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              style={{ position: 'sticky', top: 120 }}
            >
              <div className="section-label">FAQ</div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3vw, 40px)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: 20,
              }}>
                Preguntas que te estás haciendo.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: 32 }}>
                Resolvemos las dudas más comunes antes de que empieces el camino.
              </p>
              <a href="#" className="btn-ghost" style={{ fontSize: 13, padding: '10px 20px' }}>
                Hablar con un humano
              </a>
            </motion.div>
          )}

          {/* FAQ list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            style={{ gridColumn: hideHero ? '1 / -1' : undefined }}
          >
            {hideHero && (
              <div style={{ marginBottom: 16, textAlign: 'right' }}>
                <a href="#" className="btn-ghost" style={{ fontSize: 13, padding: '10px 20px' }}>
                  Hablar con un humano
                </a>
              </div>
            )}
            {FAQ.map(entry => (
              <FAQItem
                key={entry.id}
                entry={entry}
                isOpen={openId === entry.id}
                onToggle={() => setOpenId(prev => prev === entry.id ? null : entry.id)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
