export interface PricingPlan {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  ctaLabel: string
  ctaStyle: 'ghost' | 'main' | 'outline'
  featured?: boolean
  badge?: string
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'ootd',
    name: 'OOTD',
    price: '$2,630',
    period: 'USD · pago único',
    description: 'Tu sistema digital completo entregado en 7 días hábiles. Web de conversión + embudo de IA + anuncios activados.',
    features: [
      'Web de conversión (hasta 8 secciones)',
      'Embudo de IA personalizado',
      'Configuración de anuncios (Meta/Google)',
      'Automatización de seguimiento',
      'Integración de pagos',
      'Soporte 30 días post-entrega',
      'Revisiones ilimitadas durante el proceso',
    ],
    ctaLabel: 'Iniciar el Camino',
    ctaStyle: 'ghost',
  },
  {
    id: 'partner-light',
    name: 'Partner Light',
    price: '$983',
    period: 'USD + 18% de ventas',
    description: 'Asociación estratégica. Construimos y operamos tu sistema digital mientras crecemos juntos.',
    features: [
      'Todo lo incluido en OOTD',
      'Gestión mensual de anuncios',
      'Optimización continua de embudos',
      'Reportes de conversión semanales',
      'Sesiones estratégicas mensuales',
      'Escalado de campañas incluido',
      'Priority support 24/7',
    ],
    ctaLabel: 'Iniciar el Camino',
    ctaStyle: 'main',
    featured: true,
    badge: 'Más Elegido',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'Contactar para pricing',
    description: 'Para empresas con operaciones complejas que necesitan un sistema digital a medida y soporte dedicado.',
    features: [
      'Arquitectura de sistema personalizada',
      'Múltiples embudos y productos',
      'Integración con CRM/ERP',
      'Equipo dedicado asignado',
      'SLA garantizado',
      'Onboarding ejecutivo',
      'Contrato personalizado',
    ],
    ctaLabel: 'Agendar Llamada',
    ctaStyle: 'outline',
  },
]
