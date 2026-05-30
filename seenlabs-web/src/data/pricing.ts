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

export const pricing: PricingPlan[] = [
  {
    id: 'ootd',
    name: 'OOTD',
    price: '$2,630',
    period: 'USD · one-time',
    description: 'For companies ready to own their visibility.',
    features: [
      'Top-tier conversion website',
      'Strategic copywriting',
      'Premium design',
      'Complete automation system',
      'AI chat on website',
      'AI agents',
      'Sales funnels',
      'WhatsApp API integration',
      '1 human closer integrated',
      'Audiovisuals for website',
      'AI-powered ad campaigns',
      'First 3–5 sales run by Seen Labs',
      'Delivery in 7 business days',
    ],
    ctaLabel: 'Choose OOTD',
    ctaStyle: 'ghost',
  },
  {
    id: 'partner',
    name: 'Partner Light',
    price: '$983',
    period: 'USD + 18% of sales',
    description: 'We build it. We launch it. We help you sell it.',
    features: [
      'Everything in OOTD',
      'Closer operated by Seen Labs',
      'Commercial accompaniment',
      'Initial system optimization',
      'Greater performance alignment',
      'Shared risk model',
      'Delivery in 7 business days',
    ],
    ctaLabel: 'Become A Partner',
    ctaStyle: 'main',
    featured: true,
    badge: 'Most Chosen',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'Contact for pricing',
    description: 'A custom door to the light.',
    features: [
      'Custom strategy & infrastructure',
      'Multiple funnels & business units',
      'AI, CRM, campaigns & content',
      'Dedicated closers',
      'Custom reporting & analytics',
      'Ideal: real estate, luxury, brokers, academies, infoproducts, funds',
    ],
    ctaLabel: 'Request Enterprise Access',
    ctaStyle: 'outline',
  },
]
