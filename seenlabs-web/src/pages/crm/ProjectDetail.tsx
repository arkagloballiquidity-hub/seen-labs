import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { supabase, STATUS_LABELS, STATUS_COLORS, PLAN_LABELS, type Project, type ProjectStep, type Note, type ProjectStatus, type PlanType } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import { ArrowLeft, Check, MessageSquare, Send, LogOut } from 'lucide-react'

const S = {
  page:   { minHeight:'100vh', background:'#0A0A0F', fontFamily:'sans-serif' },
  card:   { background:'#18181F', border:'1px solid rgba(255,255,255,.06)', padding:'20px 24px', marginBottom:16 },
  label:  { fontSize:10, color:'#6B6880', letterSpacing:'0.08em', textTransform:'uppercase' as const, marginBottom:4 },
}

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [project, setProject] = useState<Project | null>(null)
  const [steps,   setSteps]   = useState<ProjectStep[]>([])
  const [notes,   setNotes]   = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')
  const [saving,  setSaving]  = useState(false)

  // Author derived from logged-in user's email (security: no dropdown)
  const authorName = user?.email?.split('@')[0] ?? 'equipo'

  useEffect(() => { fetchAll() }, [id])

  async function fetchAll() {
    const [{ data: p }, { data: s }, { data: n }] = await Promise.all([
      supabase.from('projects').select('*, clients(*)').eq('id', id!).single(),
      supabase.from('project_steps').select('*').eq('project_id', id!).order('step_number'),
      supabase.from('notes').select('*').eq('project_id', id!).order('created_at'),
    ])
    if (p) setProject(p as Project)
    if (s) setSteps(s as ProjectStep[])
    if (n) setNotes(n as Note[])
  }

  async function toggleStep(step: ProjectStep) {
    const completed = !step.completed
    await supabase.from('project_steps')
      .update({ completed, completed_at: completed ? new Date().toISOString() : null })
      .eq('id', step.id)
    const newSteps = steps.map(s => s.id === step.id ? { ...s, completed } : s)
    const completedCount = newSteps.filter(s => s.completed).length
    await supabase.from('projects').update({ current_step: completedCount }).eq('id', id!)
    fetchAll()
  }

  async function addNote() {
    if (!newNote.trim()) return
    setSaving(true)
    await supabase.from('notes').insert({
      project_id: id,
      author_name: authorName,
      content: newNote.trim(),
      type: 'note',
    })
    setNewNote('')
    setSaving(false)
    fetchAll()
  }

  async function updateStatus(status: ProjectStatus) {
    await supabase.from('projects').update({ status }).eq('id', id!)
    fetchAll()
  }

  async function updatePlan(plan: PlanType) {
    const amounts: Record<PlanType, number> = { ootd: 2630, partner_light: 983, enterprise: 0 }
    await supabase.from('projects').update({ plan, payment_amount: amounts[plan] }).eq('id', id!)
    fetchAll()
  }

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  if (!project) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#0A0A0F', color:'#6B6880', fontSize:13, fontFamily:'sans-serif' }}>
      Cargando...
    </div>
  )

  const client = (project as any).clients
  const completedSteps = steps.filter(s => s.completed).length

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={{ borderBottom:'1px solid rgba(255,255,255,.06)', background:'#111118', padding:'16px 24px', display:'flex', alignItems:'center', gap:16, position:'sticky' as const, top:0, zIndex:10 }}>
        <Link to="/crm" style={{ color:'#9A98B0', display:'flex', alignItems:'center', gap:6, fontSize:13, textDecoration:'none' }}>
          <ArrowLeft size={15}/> Pipeline
        </Link>
        <span style={{ color:'#6B6880' }}>/</span>
        <span style={{ fontWeight:700, fontSize:15, color:'#fff' }}>
          {client?.brand_name || client?.company_name || 'Proyecto'}
        </span>
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:8,height:8,borderRadius:'50%',background:STATUS_COLORS[project.status] }}/>
            <select value={project.status} onChange={e => updateStatus(e.target.value as ProjectStatus)}
              style={{ background:'#202028', border:'1px solid rgba(255,255,255,.1)', color:'#fff', padding:'6px 12px', fontSize:12, cursor:'pointer' }}>
              {(Object.keys(STATUS_LABELS) as ProjectStatus[]).map(s => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>
          <button onClick={handleSignOut} style={{ background:'transparent', border:'none', color:'#6B6880', cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontSize:12 }}>
            <LogOut size={14}/>
          </button>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:0, maxWidth:1200, margin:'0 auto', padding:24 }}>
        {/* Left */}
        <div style={{ paddingRight:24 }}>
          {/* Client info */}
          <div style={S.card}>
            <div style={{ fontWeight:700, fontSize:16, marginBottom:4, color:'#fff' }}>{client?.company_name}</div>
            <div style={{ fontSize:12, color:'#9A98B0', marginBottom:12 }}>{client?.industry} · {client?.city}</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
              {[
                { label:'Email',  value: client?.client_email || '—' },
                { label:'Plan',   value: project.plan ? PLAN_LABELS[project.plan] : '—' },
                { label:'Pago',   value: project.payment_status || '—' },
              ].map(f => (
                <div key={f.label}>
                  <div style={S.label}>{f.label}</div>
                  <div style={{ fontSize:13, color:'#C8C6DC' }}>{f.value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:16 }}>
              <div style={S.label}>Plan contratado</div>
              <select value={project.plan || ''} onChange={e => updatePlan(e.target.value as PlanType)}
                style={{ background:'#202028', border:'1px solid rgba(255,255,255,.1)', color:'#fff', padding:'8px 12px', fontSize:12, cursor:'pointer', width:'100%' }}>
                <option value="">Sin plan</option>
                <option value="ootd">OOTD — $2,630</option>
                <option value="partner_light">Partner Light — $983</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>

          {/* Steps */}
          <div style={S.card}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <span style={{ fontWeight:700, fontSize:14, color:'#fff' }}>Los 10 Pasos</span>
              <span style={{ fontSize:12, color:'#7B61FF', fontWeight:700 }}>{completedSteps}/10</span>
            </div>
            <div style={{ height:4, background:'#28283A', marginBottom:16, borderRadius:2, overflow:'hidden' }}>
              <div style={{ height:'100%', background:'#7B61FF', width:`${(completedSteps/10)*100}%`, transition:'width .3s' }}/>
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, gap:4 }}>
              {steps.map(step => (
                <button key={step.id} onClick={() => toggleStep(step)} style={{
                  display:'flex', alignItems:'center', gap:12, padding:'10px 14px',
                  background: step.completed ? 'rgba(123,97,255,.08)' : '#202028',
                  border: `1px solid ${step.completed ? 'rgba(123,97,255,.25)' : 'rgba(255,255,255,.05)'}`,
                  cursor:'pointer', textAlign:'left' as const, transition:'all .2s',
                }}>
                  <div style={{ width:20, height:20, borderRadius:3, border:`2px solid ${step.completed ? '#7B61FF' : '#6B6880'}`,
                    background: step.completed ? '#7B61FF' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {step.completed && <Check size={12} color="#fff"/>}
                  </div>
                  <span style={{ fontSize:13, color: step.completed ? '#fff' : '#9A98B0' }}>
                    {step.step_number}. {step.step_name}
                  </span>
                  {step.completed_at && (
                    <span style={{ marginLeft:'auto', fontSize:10, color:'#6B6880' }}>
                      {new Date(step.completed_at).toLocaleDateString('es-MX')}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div style={{ ...S.card, marginBottom:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
              <MessageSquare size={14} color="#7B61FF"/>
              <span style={{ fontWeight:700, fontSize:14, color:'#fff' }}>Log de comunicación</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, gap:8, marginBottom:16, maxHeight:300, overflowY:'auto' as const }}>
              {notes.length === 0 && <div style={{ fontSize:12, color:'#6B6880', textAlign:'center' as const, padding:20 }}>Sin notas aún</div>}
              {notes.map(n => (
                <div key={n.id} style={{ background:'#202028', padding:'10px 14px', borderLeft:'2px solid #7B61FF' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontSize:11, color:'#7B61FF', fontWeight:700 }}>{n.author_name}</span>
                    <span style={{ fontSize:10, color:'#6B6880' }}>{new Date(n.created_at).toLocaleString('es-MX',{dateStyle:'short',timeStyle:'short'})}</span>
                  </div>
                  <div style={{ fontSize:13, color:'#C8C6DC', lineHeight:1.5 }}>{n.content}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <input value={newNote} onChange={e => setNewNote(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addNote()}
                placeholder="Agregar nota, llamada, decisión..."
                style={{ flex:1, background:'#202028', border:'1px solid rgba(255,255,255,.1)', color:'#fff', padding:'8px 12px', fontSize:13, outline:'none' }}/>
              <button onClick={addNote} disabled={saving || !newNote.trim()}
                style={{ background:'#7B61FF', color:'#fff', border:'none', padding:'8px 14px', cursor:'pointer', display:'flex', alignItems:'center', opacity: saving ? 0.6 : 1 }}>
                <Send size={14}/>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Brief */}
        <div>
          <div style={{ ...S.card, marginBottom:0, position:'sticky' as const, top:90 }}>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:16, color:'#7B61FF' }}>Brief del Cliente</div>
            {[
              { label:'¿Qué hace?',    value: client?.what_they_do },
              { label:'UVP',           value: client?.uvp },
              { label:'Cliente ideal', value: client?.icp_description },
              { label:'Tono',          value: Array.isArray(client?.tone) ? client.tone.join(', ') : client?.tone },
              { label:'Competidores',  value: client?.competitors },
              { label:'Meta revenue',  value: client?.revenue_goal },
            ].map(f => f.value ? (
              <div key={f.label} style={{ marginBottom:14 }}>
                <div style={S.label}>{f.label}</div>
                <div style={{ fontSize:12, color:'#C8C6DC', lineHeight:1.55 }}>{f.value}</div>
              </div>
            ) : null)}
          </div>
        </div>
      </div>
    </div>
  )
}
