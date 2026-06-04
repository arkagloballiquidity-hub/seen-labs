import { useEffect } from 'react'
import { motion } from 'framer-motion'

export function AgendarPage() {
  // Load Calendly widget script
  useEffect(() => {
    const existing = document.getElementById('calendly-script')
    if (existing) return
    const script = document.createElement('script')
    script.id = 'calendly-script'
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)
    return () => {
      // leave script in DOM for SPA navigation
    }
  }, [])

  return (
    <section className="section" style={{ minHeight: '100vh', paddingTop: 120 }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 860, margin: '0 auto' }}
        >
          {/* Header */}
          <div className="section-label">Agendar Llamada</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            marginBottom: 16,
          }}>
            Hablemos.{' '}
            <span className="text-chrome">Sin compromiso.</span>
          </h1>
          <p style={{
            fontSize: 16,
            lineHeight: 1.75,
            color: 'var(--text-muted)',
            maxWidth: 520,
            marginBottom: 48,
          }}>
            30 minutos para entender tu negocio y mostrarte exactamente cómo te sacamos de la oscuridad.
          </p>

          {/* Calendly inline widget */}
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/seenlabs?hide_landing_page_details=1&hide_gdpr_banner=1"
            style={{
              minWidth: 320,
              height: 700,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
