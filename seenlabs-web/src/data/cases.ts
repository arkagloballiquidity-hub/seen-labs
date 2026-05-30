export interface CaseStudy {
  id: string
  domain: string
  label: string
  quote: string
  author: string
  photoUrl?: string
}

export const cases: CaseStudy[] = [
  {
    id: 'arka-global',
    domain: 'arkaglobalinvestments.com',
    label: 'ARKA GLOBAL',
    quote: 'Seen Labs helped us transform our digital presence into a premium conversion experience that reflects the quality of our fund.',
    author: '— CEO / Founder, Arka Global Investments',
  },
  {
    id: 'alpha-drivers',
    domain: 'alphadrivers.mx',
    label: 'ALPHA DRIVERS',
    quote: 'The system Seen Labs built gave us a professional presence that immediately increased client trust and inbound inquiries.',
    author: '— Founder, Alpha Drivers',
  },
  {
    id: 'arka-ltd',
    domain: 'arkaltd.io',
    label: 'ARKA LTD',
    quote: 'From invisible to unmissable. Seen Labs delivered a world-class digital system that matches the ambition of our brand.',
    author: '— Founder, Arka Ltd',
  },
]
