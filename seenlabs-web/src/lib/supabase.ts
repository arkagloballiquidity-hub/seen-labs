import { createClient } from '@supabase/supabase-js'

const url  = import.meta.env.VITE_SUPABASE_URL  as string || 'https://placeholder.supabase.co'
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string || 'placeholder'

export const supabase = createClient(url, anon)

// Types
export type ProjectStatus = 'lead'|'brief_sent'|'brief_complete'|'proposal'|'closed_won'|'in_progress'|'delivered'|'closed_lost'
export type PlanType      = 'ootd'|'partner_light'|'enterprise'
export type PaymentStatus = 'pending'|'partial'|'paid'|'refunded'
export type NoteType      = 'call'|'message'|'decision'|'note'|'milestone'
export type TeamRole      = 'dev'|'ai'|'video'|'qa'|'sales'

export interface Client {
  id: string; created_at: string
  // Core identity
  company_name: string; brand_name: string; industry: string
  city: string; client_email: string; form_progress: number
  years_operation?: string; slogan?: string; plan?: string
  // What they do
  what_they_do?: string; uvp?: string; icp_description?: string
  pain?: string
  // Audiences
  age_range?: string; ses?: string; ticket?: string
  // Tone & perception
  tone?: string[]; perception?: string[]; objections?: string[]
  // Web brief
  current_url?: string; domain_status?: string; goals?: string[]
  web_references?: string; style?: string[]; pages?: string[]
  languages?: string[]
  // Brand assets
  has_logo?: string; has_brandbook?: string; colors_defined?: string
  palette?: string; fonts?: string
  // Content
  photos?: string; videos?: string; testimonials?: string; extra_comms?: string
  // Market
  competitors?: string; better_than?: string; pricing_pos?: string
  clients_count?: string; revenue?: string; revenue_goal?: string
  new_clients_pm?: number; extra_notes?: string
  // AI
  ai_analysis?: string
}

export interface Project {
  id: string; client_id: string; created_at: string
  status: ProjectStatus; plan: PlanType
  start_date: string; deadline: string
  current_step: number; payment_status: PaymentStatus
  payment_amount: number; internal_notes: string
  clients?: Client
  project_steps?: ProjectStep[]
}

export interface ProjectStep {
  id: string; project_id: string
  step_number: number; step_name: string
  completed: boolean; completed_at: string; notes: string
}

export interface Note {
  id: string; project_id: string; created_at: string
  author_name: string; content: string; type: NoteType
}

export interface TeamMember {
  id: string; name: string; role: TeamRole; email: string
}

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  lead:           'Lead',
  brief_sent:     'Brief enviado',
  brief_complete: 'Brief completo',
  proposal:       'Propuesta',
  closed_won:     'Cerrado',
  in_progress:    'En progreso',
  delivered:      'Entregado',
  closed_lost:    'Perdido',
}

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  lead:           '#6B6880',
  brief_sent:     '#F59E0B',
  brief_complete: '#3B82F6',
  proposal:       '#8B5CF6',
  closed_won:     '#22C55E',
  in_progress:    '#7B61FF',
  delivered:      '#10B981',
  closed_lost:    '#EF4444',
}

export const PLAN_LABELS: Record<PlanType, string> = {
  ootd:          'OOTD — $2,630',
  partner_light: 'Partner Light — $983',
  enterprise:    'Enterprise',
}
