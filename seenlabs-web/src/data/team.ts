export interface TeamMember {
  id: string
  initial: string
  name: string
  role: string
  area: string
  photoUrl?: string
}

export const TEAM: TeamMember[] = [
  {
    id: 'gabriel',
    initial: 'G',
    name: 'Gabriel',
    role: 'Código, Website & CRMs',
    area: 'Dev & Systems',
  },
  {
    id: 'luis',
    initial: 'L',
    name: 'Luis',
    role: 'Audiovisuales, Videos & Ads',
    area: 'Creative & Media',
  },
  {
    id: 'david',
    initial: 'D',
    name: 'David',
    role: 'AI Automations, Copywriting & Closer Strategy',
    area: 'AI & Growth',
  },
  {
    id: 'alejandro',
    initial: 'A',
    name: 'Alejandro',
    role: 'Soporte, Testing & QA en cada avance',
    area: 'Quality & Ops',
  },
]
