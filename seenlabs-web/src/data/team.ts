export interface TeamMember {
  id: string
  initial: string
  name: string
  role: string
  photoUrl?: string
}

export const TEAM: TeamMember[] = [
  { id: 'g', initial: 'G', name: 'Gabriel López',   role: 'CEO & Estrategia Digital' },
  { id: 'l', initial: 'L', name: 'Luis Ramírez',     role: 'Director de Desarrollo' },
  { id: 'd', initial: 'D', name: 'Diana Morales',    role: 'Head of AI & Automation' },
  { id: 'a', initial: 'A', name: 'Alejandro Torres', role: 'Performance & Ads' },
]
