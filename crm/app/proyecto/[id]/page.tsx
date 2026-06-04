'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase, STATUS_LABELS, STATUS_COLORS, PLAN_LABELS, type Project, type ProjectStep, type Note, type ProjectStatus, type PlanType, type PaymentStatus } from '@/lib/supabase'
import { ArrowLeft, Check, MessageSquare, Send } from 'lucide-react'
import Link from 'next/link'

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [project, setProject]   = useState<Project | null>(null)
  const [steps,   setSteps]     = useState<ProjectStep[]>([])
  const [notes,   setNotes]     = useState<Note[]>([])
  const [newNote, setNewNote]   = useState('')
  const [author,  setAuthor]    = useState('Gabriel')
  const [saving,  setSaving]    = useState(false)

  useEffect(() => { fetchAll() }, [id])

  async function fetchAll() {
    const [{ data: p }, { data: s }, { data: n }] = await Promise.all([
      supabase.from('projects').select('*, clients(*)').eq('id', id).single(),
      supabase.from('project_steps').select('*').eq('project_id', id).order('step_number'),
      supabase.from('notes').select('*').eq('project_id', id).order('created_at'),
    ])
    if (p) setProject(p as Project)
    if (s) setSteps(s as ProjectStep[])
    if (n) setNotes(n as Note[])
  }

  async function toggleStep(step: ProjectStep) {
    const completed = !step.completed
    await supabase.from('project_steps').update({ completed, completed_at: completed ? new Date().toISOString() : null }).eq('id', step.id)
    const completedCount = steps.filter((s,i) => s.id === step.id ? completed : s.completed).filter(Boolean).length
    await supabase.from('projects').update({ current_step: completedCount }).eq('id', id)
    fetchAll()
  }

  async function addNote() {
    if (!newNote.trim()) return
    setSaving(true)
    await supabase.from('notes').insert({ project_id: id, author_name: author, content: newNote, type: 'note' })
    setNewNote('')
    setSaving(false)
    fetchAll()
  }

  async function updateStatus(status: ProjectStatus) {
    await supabase.from('projects').update({ status }).eq('id', id)
    fetchAll()
  }

  async function updatePlan(plan: PlanType) {
    const amounts: Record<PlanType, number> = { ootd: 2630, partner_light: 983, enterprise: 0 }
    await supabase.from('projects').update({ plan, payment_amount: amounts[plan] }).eq('id', id)
    fetchAll()
  }

  if (!project) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', color:'var(--g1)' }}>Cargando...</div>

  const client = (project as any).clients
  const completedSteps = steps.filter(s => s.completed).length

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0F' }}>
      {/* Header */}
      <div style={{ borderBottom:'1px solid rgba(255,255,255,.06)', background:'var(--d1)', padding:'16px 24px', display:'flex', alignItems:'center', gap:16, position:'sticky', top:0, zIndex:10 }}>
        <Link href="/" style={{ color:'var(--g2)', display:'flex', alignItems:'center', gap:6, fontSize:13, textDecoration:'none' }}>
          <ArrowLeft size={15}/> Pipeline
        </Link>
        <span style={{ color:'var(--g1)' }}>/</span>
        <span style={{ fontFamily:'var(--font-sora)', fontWeight:700, fontSize:15 }}>
          {client?.brand_name || client?.company_name || 'Proyecto'}
        </span>
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:8,height:8,borderRadius:'50%',background:STATUS_COLORS[project.status] }}/>
          <select value={project.status} onChange={e => updateStatus(e.target.value as ProjectStatus)}
            style={{ background:'var(--d3)', border:'1px solid rgba(255,255,255,.1)', color:'#fff', padding:'6px 12px', fontSize:12, fontFamily:'var(--font-sora)', cursor:'pointer' }}>
            {(Object.keys(STATUS_LABELS) as ProjectStatus[]).map(s => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:0, maxWidth:1200, margin:'0 auto', padding:24 }}>
        {/* Left */}
        <div style={{ paddingRight:24 }}>
          {/* Client info */}
          <div style={{ background:'var(--d2)', border:'1px solid rgba(255,255,255,.06)', padding:'20px 24px', marginBottom:16 }}>
            <div style={{ fontFamily:'var(--font-sora)', fontWeight:700, fontSize:16, marginBottom:4 }}>{client?.company_name}</div>
            <div style={{ fontSize:12, color:'var(--g2)', marginBottom:12 }}>{client?.industry} · {client?.city}</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
              {[
                { label:'Email',  value: client?.client_email || '—' },
                { label:'Plan',   value: project.plan ? PLAN_LABELS[project.plan] : '—' },
                { label:'Pago',   value: project.payment_status || '—' },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontSize:10, color:'var(--g1)', fontFamily:'var(--font-sora)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:4 }}>{f.label}</div>
                  <div style={{ fontSize:13, color:'var(--g3)' }}>{f.value}</div>
                </div>
              ))}
            </div>
            {/* Plan selector */}
            <div style={{ marginTop:16 }}>
              <div style={{ fontSize:10, color:'var(--g1)', fontFamily:'var(--font-sora)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6 }}>Plan contratado</div>
              <select value={project.plan || ''} onChange={e => updatePlan(e.target.value as PlanType)}
                style={{ background:'var(--d3)', border:'1px solid rgba(255,255,255,.1)', color:'#fff', padding:'8px 12px', fontSize:12, fontFamily:'var(--font-sora)', cursor:'pointer', width:'100%' }}>
                <option value="">Sin plan</option>
                <option value="ootd">OOTD — $2,630</option>
                <option value="partner_light">Partner Light — $983</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>

          {/* 10 Steps */}
          <div style={{ background:'var(--d2)', border:'1px solid rgba(255,255,255,.06)', padding:'20px 24px', marginBottom:16 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <span style={{ fontFamily:'var(--font-sora)', fontWeight:700, fontSize:14 }}>Los 10 Pasos</span>
              <span style={{ fontSize:12, color:'var(--p)', fontFamily:'var(--font-sora)', fontWeight:700 }}>{completedSteps}/10</span>
            </div>
            {/* Progress bar */}
            <div style={{ height:4, background:'var(--d4)', marginBottom:16, borderRadius:2, overflow:'hidden' }}>
              <div style={{ height:'100%', background:'var(--p)', width:`${(completedSteps/10)*100}%`, transition:'width .3s' }}/>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              {steps.map(step => (
                <button key={step.id} onClick={() => toggleStep(step)}
                  style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', background: step.completed ? 'rgba(123,97,255,.08)' : 'var(--d3)',
                    border: `1px solid ${step.completed ? 'rgba(123,97,255,.25)' : 'rgba(255,255,255,.05)'}`,
                    cursor:'pointer', textAlign:'left', transition:'all .2s' }}>
                  <div style={{ width:20, height:20, borderRadius:3, border:`2px solid ${step.completed ? 'var(--p)' : 'var(--g1)'}`,
                    background: step.completed ? 'var(--p)' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {step.completed && <Check size={12} color="#fff"/>}
                  </div>
                  <span style={{ fontSize:13, color: step.completed ? '#fff' : 'var(--g2)', fontFamily:'var(--font-sora)',
                    textDecoration: step.completed ? 'none' : 'none' }}>
                    {step.step_number}. {step.step_name}
                  </span>
                  {step.completed_at && (
                    <span style={{ marginLeft:'auto', fontSize:10, color:'var(--g1)' }}>
                      {new Date(step.completed_at).toLocaleDateString('es-MX')}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notes / Log */}
          <div style={{ background:'var(--d2)', border:'1px solid rgba(255,255,255,.06)', padding:'20px 24px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
              <MessageSquare size={14} color="var(--p)"/>
              <span style={{ fontFamily:'var(--font-sora)', fontWeight:700, fontSize:14 }}>Log de comunicación</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16, maxHeight:300, overflowY:'auto' }}>
              {notes.length === 0 && <div style={{ fontSize:12, color:'var(--g1)', textAlign:'center', padding:20 }}>Sin notas aún</div>}
              {notes.map(n => (
                <div key={n.id} style={{ background:'var(--d3)', padding:'10px 14px', borderLeft:'2px solid var(--p)' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontSize:11, color:'var(--p)', fontFamily:'var(--font-sora)', fontWeight:700 }}>{n.author_name}</span>
                    <span style={{ fontSize:10, color:'var(--g1)' }}>{new Date(n.created_at).toLocaleString('es-MX',{dateStyle:'short',timeStyle:'short'})}</span>
                  </div>
                  <div style={{ fontSize:13, color:'var(--g3)', lineHeight:1.5 }}>{n.content}</div>
                </div>
              ))}
            </div>
            {/* Add note */}
            <div style={{ display:'flex', gap:8 }}>
              <select value={author} onChange={e => setAuthor(e.target.value)}
                style={{ background:'var(--d3)', border:'1px solid rgba(255,255,255,.1)', color:'var(--g2)', padding:'8px 10px', fontSize:12, fontFamily:'var(--font-sora)', cursor:'pointer' }}>
                {['Gabriel','David','Luis','Alejandro'].map(m => <option key={m}>{m}</option>)}
              </select>
              <input value={newNote} onChange={e => setNewNote(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addNote()}
                placeholder="Agregar nota, llamada, decisión..."
                style={{ flex:1, background:'var(--d3)', border:'1px solid rgba(255,255,255,.1)', color:'#fff', padding:'8px 12px', fontSize:13, fontFamily:'var(--font-manrope)', outline:'none' }}/>
              <button onClick={addNote} disabled={saving || !newNote.trim()}
                style={{ background:'var(--p)', color:'#fff', border:'none', padding:'8px 14px', cursor:'pointer', display:'flex', alignItems:'center' }}>
                <Send size={14}/>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Client brief summary */}
        <div>
          <div style={{ background:'var(--d2)', border:'1px solid rgba(255,255,255,.06)', padding:'20px', position:'sticky', top:90 }}>
            <div style={{ fontFamily:'var(--font-sora)', fontWeight:700, fontSize:13, marginBottom:16, color:'var(--p)' }}>Brief del Cliente</div>
            {[
              { label:'¿Qué hace?',      value: client?.what_they_do },
              { label:'UVP',             value: client?.uvp },
              { label:'Cliente ideal',   value: client?.icp_description },
              { label:'Tono',            value: Array.isArray(client?.tone) ? client.tone.join(', ') : client?.tone },
              { label:'Competidores',    value: client?.competitors },
              { label:'Meta revenue',    value: client?.revenue_goal },
            ].map(f => f.value ? (
              <div key={f.label} style={{ marginBottom:14 }}>
                <div style={{ fontSize:9, color:'var(--g1)', fontFamily:'var(--font-sora)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:3 }}>{f.label}</div>
                <div style={{ fontSize:12, color:'var(--g3)', lineHeight:1.55 }}>{f.value}</div>
              </div>
            ) : null)}
            <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid rgba(255,255,255,.06)' }}>
              <Link href={`/clientes/${client?.id}`}
                style={{ fontSize:12, color:'var(--p)', fontFamily:'var(--font-sora)', textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
                Ver brief completo →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
