export interface ComparisonRow {
  feature: string
  traditional: string
  seenLabs: string
}

export const comparison: ComparisonRow[] = [
  { feature: 'Premium website', traditional: 'Generic', seenLabs: 'Conversion-built' },
  { feature: 'AI integration', traditional: 'None', seenLabs: 'Full stack AI' },
  { feature: 'Sales funnels', traditional: 'Not included', seenLabs: 'Included' },
  { feature: 'WhatsApp API', traditional: 'No', seenLabs: 'Yes' },
  { feature: 'Ad campaigns', traditional: 'Disconnected', seenLabs: 'AI-powered' },
  { feature: 'Audiovisuals', traditional: 'Extra cost', seenLabs: 'Included' },
  { feature: 'Human closer', traditional: 'Not offered', seenLabs: 'Integrated' },
  { feature: 'Launch strategy', traditional: 'Not offered', seenLabs: 'Day 1 momentum' },
  { feature: 'Guarantee', traditional: 'None', seenLabs: '7-day cash back' },
  { feature: 'Delivery time', traditional: '4–12 weeks', seenLabs: '7 business days' },
]
