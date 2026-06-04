export interface PricingPlan {
  id: string
  name: string
  price: string
  period: string
  tagline: string
  description: string
  features: string[]
  ctaLabel: string
  ctaHref: string
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
    tagline: 'De 0 a fuera de la oscuridad en 7 días hábiles.',
    description: 'Tu sistema digital completo. Entregado, lanzado y generando resultados en una semana.',
    features: [
      'Website top 1 en tu industria',
      'Chat IA en website + agentes inteligentes',
      'Funnels de conversión automatizados',
      'WhatsApp API integrado',
      '1 closer humano incluido',
      'Audiovisuales de alto impacto',
      'Campañas de ads con IA activadas',
      'Las primeras 3–5 ventas corren por Seen Labs',
      'Entrega garantizada en 7 días hábiles',
    ],
    ctaLabel: 'Iniciar el Camino',
    ctaHref: 'https://pay.hotmart.com/W106114116M?checkoutMode=2',
    ctaStyle: 'ghost',
  },
  {
    id: 'partner-light',
    name: 'Partner Light',
    price: '$983',
    period: 'USD + 18% de ventas',
    tagline: 'Socios, no proveedores. Ganamos cuando tú ganas.',
    description: 'Todo lo de OOTD, más un closer permanente de Seen Labs operando tu sistema mes a mes.',
    features: [
      'Todo lo incluido en OOTD',
      'Closer humano de Seen Labs permanente',
      'Gestión continua de campañas ads',
      'Optimización mensual de funnels',
      'Reportes de conversión semanales',
      'Estrategia de escalado incluida',
      'Priority support 24/7',
      'El costo de ads corre por el cliente',
    ],
    ctaLabel: 'Iniciar el Camino',
    ctaHref: 'https://pay.hotmart.com/W106114116M?checkoutMode=2',
    ctaStyle: 'main',
    featured: true,
    badge: 'Más Elegido',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'Una puerta a la medida',
    tagline: 'Para empresas que necesitan un sistema sin límites.',
    description: 'Solución completamente personalizada para operaciones complejas, múltiples productos y equipos.',
    features: [
      'Arquitectura de sistema a medida',
      'Múltiples funnels y productos',
      'Equipo Elite dedicado asignado',
      'Integración con CRM/ERP existente',
      'SLA con tiempo de respuesta garantizado',
      'Estrategia de mercado personalizada',
      'Onboarding ejecutivo presencial',
      'Contrato personalizado',
    ],
    ctaLabel: 'Agendar Llamada',
    ctaHref: '/agendar',
    ctaStyle: 'outline',
  },
]
