export interface TeamMember {
  id: string
  initial: string
  name: string
  role: string
  photoUrl?: string
}

export const team: TeamMember[] = [
  { id: 'gabriel', initial: 'G', name: 'Gabriel', role: 'Code development, website architecture & CRM systems' },
  { id: 'luis', initial: 'L', name: 'Luis', role: 'Audiovisuals, website video, engagement & ad creative' },
  { id: 'david', initial: 'D', name: 'David', role: 'AI automation, copywriting, commercial strategy & closer systems' },
  { id: 'alejandro', initial: 'A', name: 'Alejandro', role: 'Full support, testing, quality control & implementation' },
]
