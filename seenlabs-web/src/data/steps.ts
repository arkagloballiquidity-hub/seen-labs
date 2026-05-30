export interface PathStep {
  num: string
  title: string
  description: string
  highlight?: boolean
}

export const steps: PathStep[] = [
  { num: '01', title: 'Choose your program', description: 'Select the package that matches your growth stage.' },
  { num: '02', title: 'Fill the pre-contract', description: 'A brief form to align scope, goals, and deliverables.' },
  { num: '03', title: 'Process payment', description: 'Crypto, credit card, MSI, debit, or cash (where applicable).' },
  { num: '04', title: 'Sign the contract', description: 'Both parties sign. Everything is documented and protected.' },
  { num: '05', title: 'Form A — Brand intake', description: 'We capture your brand identity, voice, and vision.' },
  { num: '06', title: 'Form B — Technical intake', description: 'Assets, integrations, domains, and technical requirements.' },
  { num: '07', title: 'Elite team call', description: 'Strategy session. We align on every detail before building.' },
  { num: '08', title: 'Revision round 1', description: 'First build delivered. Your feedback shapes the final product.' },
  { num: '09', title: 'Revision round 2', description: 'Final refinements. Every detail is precision-calibrated.' },
  { num: '10', title: 'Pre-launch', description: 'Final QA, testing, and launch preparation complete.' },
  { num: '11', title: 'Day 7 — Launch', description: 'Your system goes live. The door opens.', highlight: true },
  { num: '12', title: 'First client invoiced.', description: 'Welcome to the light.', highlight: true },
]
