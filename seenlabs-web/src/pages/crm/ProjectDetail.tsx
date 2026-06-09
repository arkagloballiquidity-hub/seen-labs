import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { supabase, STATUS_LABELS, STATUS_COLORS, type Project, type ProjectStep, type Note, type ProjectStatus, type PlanType } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import { ArrowLeft, Check, MessageSquare, Send, LogOut, Eye, EyeOff } from 'lucide-react'

const S = {
  page:  { minHeight:'100vh', background:'#0A0A0F', fontFamily:'sans-serif' },
  card:  { background:'#18181F', border:'1px solid rgba(255,255,255,.06)', padding:'20px 24px', marginBottom:16 },
  label: { fontSize:10, color:'#6B6880', letterSpacing:'0.08em', textTransform:'uppercase' as const, marginBottom:4 },
}

const UPDATE_TYPES = [
  { value:'milestone',   label:'Hito',        color:'#7B61FF' },
  { value:'deliverable', label:'Entregable',   color:'#22C55E' },
  { value:'revision',    label:'Revisión',     color:'#F59E0B' },
  { value:'note',        label:'Nota interna', color:'#6B6880' },
  { value:'call',        label:'Llamada',      color:'#3B82F6' },
]

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const [project, setProject] = useState<Project | null>(null)
  const [steps,   setSteps]   = useState<ProjectStep[]>([])
  const [notes,   setNotes]   = useState<Note[]>([])

  // Note form state
  const [noteTitle,   setNoteTitle]   = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [noteType,    setNoteType]    = useState<string>('note')
  const [noteVisible, setNoteVisible] = useState(false)
  const [saving,      setSaving]      = useState(false)

  // Active tab: 'progress' | 'brief' | 'notes'
  const [tab, setTab] = useState<'progress'|'brief'|'notes'>('progress')

  const authorName = user?.email?.split('@')[0] ?? 'equipo'

  useEffect(() => { fetchAll() }, [id])

  async function fetchAll() {
    const [{ data: p }, { data: s }, { data: n }] = await Promise.all([
      supabase.from('projects').select('*, clients(*)').eq('id', id!).single(),
      supabase.from('project_steps').select('*').eq('project_id', id!).order('step_number'),
      supabase.from('notes').select('*').eq('project_id', id!).order('created_at', { ascending: false }),
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
    const updated = steps.map(s => s.id === step.id ? { ...s, completed } : s)
    const count   = updated.filter(s => s.completed).length
    await supabase.from('projects').update({ current_step: count }).eq('id', id!)
    fetchAll()
  }

  async function addNote() {
    if (!noteContent.trim()) return
    setSaving(true)
    await supabase.from('notes').insert({
      project_id:    id,
      author_name:   authorName,
      title:         noteTitle.trim() || null,
      content:       noteContent.trim(),
      type:          noteType,
      client_visible: noteVisible,
    })
    setNoteTitle('')
    setNoteContent('')
    setNoteType('note')
    setNoteVisible(false)
    setSaving(false)
    fetchAll()
  }

  async function toggleNoteVisibility(note: Note) {
    await supabase.from('notes').update({ client_visible: !note.client_visible }).eq('id', note.id)
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
    navigate('/acceso', { replace: true })
  }

  if (!project) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#0A0A0F', color:'#6B6880', fontSize:13, fontFamily:'sans-serif' }}>
      Cargando...
    </div>
  )

  const client         = (project as any).clients
  const completedSteps = steps.filter(s => s.completed).length
  const clientNotes    = notes.filter(n => n.client_visible)
  const internalNotes  = notes.filter(n => !n.client_visible)

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

      <div style={{ maxWidth:1200, margin:'0 auto', padding:24 }}>
        {/* Meta row */}
        <div style={{ ...S.card, display:'flex', alignItems:'center', gap:24, flexWrap:'wrap' as const }}>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:18, color:'#fff', marginBottom:2 }}>{client?.brand_name || client?.company_name}</div>
            <div style={{ fontSize:12, color:'#9A98B0' }}>{client?.industry} · {client?.city} · {client?.client_email}</div>
          </div>
          <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' as const }}>
            <select value={project.plan || ''} onChange={e => updatePlan(e.target.value as PlanType)}
              style={{ background:'#202028', border:'1px solid rgba(255,255,255,.1)', color:'#fff', padding:'7px 12px', fontSize:12, cursor:'pointer' }}>
              <option value="">Sin plan</option>
              <option value="ootd">OOTD — $2,630</option>
              <option value="partner_light">Partner Light — $983</option>
              <option value="enterprise">Enterprise</option>
            </select>
            <div style={{ background:'rgba(123,97,255,.12)', border:'1px solid rgba(123,97,255,.3)', padding:'6px 14px', fontSize:12, color:'#7B61FF', fontWeight:700 }}>
              {completedSteps}/10 pasos
            </div>
            <div style={{ fontSize:12, color: project.payment_status==='paid' ? '#22C55E' : '#F59E0B', fontWeight:700 }}>
              {project.payment_status==='paid' ? '✓ Pagado' : '⏳ Pendiente'}
              {project.payment_amount ? ` · $${project.payment_amount.toLocaleString()}` : ''}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:0, marginBottom:20, borderBottom:'1px solid rgba(255,255,255,.06)' }}>
          {([
            { key:'progress', label:'Pasos & Avances' },
            { key:'notes',    label:`Notas (${notes.length})` },
            { key:'brief',    label:'Brief del Cliente' },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding:'10px 20px', fontSize:13, fontWeight: tab===t.key ? 700 : 400,
              background:'transparent', border:'none', cursor:'pointer',
              color: tab===t.key ? '#fff' : '#6B6880',
              borderBottom: tab===t.key ? '2px solid #7B61FF' : '2px solid transparent',
              fontFamily:'inherit',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab: Pasos & Avances */}
        {tab === 'progress' && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:20 }}>
            <div>
              {/* Steps */}
              <div style={S.card}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                  <span style={{ fontWeight:700, fontSize:14, color:'#fff' }}>Los 10 Pasos</span>
                  <span style={{ fontSize:12, color:'#7B61FF', fontWeight:700 }}>{completedSteps}/10</span>
                </div>
                <div style={{ height:4, background:'#28283A', marginBottom:16, borderRadius:2, overflow:'hidden' }}>
                  <div style={{ height:'100%', background:'linear-gradient(90deg,#7B61FF,#a78bfa)', width:`${(completedSteps/10)*100}%`, transition:'width .3s' }}/>
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
                      <span style={{ fontSize:13, color: step.completed ? '#fff' : '#9A98B0', flex:1 }}>
                        {step.step_number}. {step.step_name}
                      </span>
                      {step.completed_at && (
                        <span style={{ fontSize:10, color:'#6B6880' }}>
                          {new Date(step.completed_at).toLocaleDateString('es-MX')}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Avances visibles al cliente */}
              {clientNotes.length > 0 && (
                <div style={S.card}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
                    <Eye size={14} color="#22C55E"/>
                    <span style={{ fontWeight:700, fontSize:13, color:'#fff' }}>Publicado al cliente</span>
                    <span style={{ fontSize:10, color:'#6B6880', marginLeft:'auto' }}>{clientNotes.length} actualización{clientNotes.length !== 1 ? 'es' : ''}</span>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column' as const, gap:8 }}>
                    {clientNotes.map(n => {
                      const t = UPDATE_TYPES.find(u => u.value === n.type)
                      return (
                        <div key={n.id} style={{ background:'#202028', padding:'12px 14px', borderLeft:`3px solid ${t?.color || '#7B61FF'}` }}>
                          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
                            <div>
                              {n.title && <div style={{ fontSize:13, fontWeight:700, color:'#fff', marginBottom:2 }}>{n.title}</div>}
                              <span style={{ fontSize:10, color: t?.color || '#7B61FF', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>{t?.label || n.type}</span>
                            </div>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                              <span style={{ fontSize:10, color:'#6B6880' }}>{new Date(n.created_at).toLocaleDateString('es-MX')}</span>
                              <button onClick={() => toggleNoteVisibility(n)} title="Ocultar al cliente"
                                style={{ background:'transparent', border:'none', color:'#6B6880', cursor:'pointer', padding:2 }}>
                                <EyeOff size={12}/>
                              </button>
                            </div>
                          </div>
                          <div style={{ fontSize:12, color:'#C8C6DC', lineHeight:1.6, marginTop:4 }}>{n.content}</div>
                          <div style={{ fontSize:10, color:'#6B6880', marginTop:6 }}>— {n.author_name}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Post avance */}
            <div>
              <div style={{ ...S.card, position:'sticky' as const, top:80 }}>
                <div style={{ fontWeight:700, fontSize:13, color:'#fff', marginBottom:16 }}>Publicar Avance</div>

                {/* Type selector */}
                <div style={{ marginBottom:12 }}>
                  <div style={S.label}>Tipo</div>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' as const }}>
                    {UPDATE_TYPES.map(t => (
                      <button key={t.value} onClick={() => setNoteType(t.value)} style={{
                        padding:'5px 10px', fontSize:11, fontWeight:600,
                        background: noteType===t.value ? t.color : 'transparent',
                        border: `1px solid ${noteType===t.value ? t.color : 'rgba(255,255,255,.12)'}`,
                        color: noteType===t.value ? '#fff' : '#9A98B0',
                        cursor:'pointer', borderRadius:3, fontFamily:'inherit',
                      }}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div style={{ marginBottom:10 }}>
                  <div style={S.label}>Título (opcional)</div>
                  <input value={noteTitle} onChange={e => setNoteTitle(e.target.value)}
                    placeholder="ej. Logo aprobado, Diseño entregado..."
                    style={{ width:'100%', background:'#202028', border:'1px solid rgba(255,255,255,.1)', color:'#fff', padding:'8px 12px', fontSize:12, outline:'none', boxSizing:'border-box' as const }}
                  />
                </div>

                {/* Content */}
                <div style={{ marginBottom:12 }}>
                  <div style={S.label}>Descripción</div>
                  <textarea value={noteContent} onChange={e => setNoteContent(e.target.value)}
                    placeholder="Describe el avance, decisión o entregable..."
                    rows={4} style={{ width:'100%', background:'#202028', border:'1px solid rgba(255,255,255,.1)', color:'#fff', padding:'8px 12px', fontSize:12, outline:'none', resize:'vertical' as const, fontFamily:'inherit', boxSizing:'border-box' as const }}
                  />
                </div>

                {/* Visibility toggle */}
                <button onClick={() => setNoteVisible(v => !v)} style={{
                  display:'flex', alignItems:'center', gap:10, width:'100%', padding:'10px 14px',
                  background: noteVisible ? 'rgba(34,197,94,.08)' : 'rgba(255,255,255,.03)',
                  border: `1px solid ${noteVisible ? 'rgba(34,197,94,.3)' : 'rgba(255,255,255,.08)'}`,
                  cursor:'pointer', marginBottom:12, color: noteVisible ? '#22C55E' : '#6B6880', fontFamily:'inherit',
                }}>
                  {noteVisible ? <Eye size={14}/> : <EyeOff size={14}/>}
                  <span style={{ fontSize:12, fontWeight:600 }}>
                    {noteVisible ? 'Visible al cliente ✓' : 'Solo interno (click para publicar al cliente)'}
                  </span>
                </button>

                <button onClick={addNote} disabled={saving || !noteContent.trim()} style={{
                  width:'100%', background: saving || !noteContent.trim() ? 'rgba(123,97,255,.4)' : '#7B61FF',
                  color:'#fff', border:'none', padding:'11px', fontSize:12, fontWeight:700,
                  letterSpacing:'0.08em', cursor: saving || !noteContent.trim() ? 'not-allowed' : 'pointer',
                  fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                }}>
                  <Send size={13}/>
                  {saving ? 'Publicando...' : noteVisible ? 'Publicar al cliente' : 'Guardar nota interna'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Notas internas */}
        {tab === 'notes' && (
          <div style={{ maxWidth:700 }}>
            <div style={S.card}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
                <MessageSquare size={14} color="#7B61FF"/>
                <span style={{ fontWeight:700, fontSize:14, color:'#fff' }}>Log interno ({internalNotes.length})</span>
              </div>
              {internalNotes.length === 0 && (
                <div style={{ fontSize:12, color:'#6B6880', textAlign:'center' as const, padding:20 }}>Sin notas internas</div>
              )}
              <div style={{ display:'flex', flexDirection:'column' as const, gap:8 }}>
                {internalNotes.map(n => {
                  const t = UPDATE_TYPES.find(u => u.value === n.type)
                  return (
                    <div key={n.id} style={{ background:'#202028', padding:'10px 14px', borderLeft:`2px solid ${t?.color || '#6B6880'}` }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <span style={{ fontSize:11, color: t?.color || '#6B6880', fontWeight:700 }}>{n.author_name}</span>
                          <span style={{ fontSize:10, color:'#6B6880', background:'#28283A', padding:'1px 6px', borderRadius:2 }}>{t?.label || n.type}</span>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <span style={{ fontSize:10, color:'#6B6880' }}>{new Date(n.created_at).toLocaleString('es-MX',{dateStyle:'short',timeStyle:'short'})}</span>
                          <button onClick={() => toggleNoteVisibility(n)} title="Publicar al cliente"
                            style={{ background:'transparent', border:'1px solid rgba(34,197,94,.3)', color:'#22C55E', cursor:'pointer', padding:'2px 6px', fontSize:10, display:'flex', alignItems:'center', gap:4 }}>
                            <Eye size={10}/> Publicar
                          </button>
                        </div>
                      </div>
                      {n.title && <div style={{ fontSize:12, fontWeight:700, color:'#fff', marginBottom:4 }}>{n.title}</div>}
                      <div style={{ fontSize:12, color:'#C8C6DC', lineHeight:1.5 }}>{n.content}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick note form */}
            <div style={S.card}>
              <div style={{ fontWeight:700, fontSize:13, color:'#fff', marginBottom:12 }}>Agregar nota</div>
              <textarea value={noteContent} onChange={e => setNoteContent(e.target.value)}
                placeholder="Nota rápida interna..."
                rows={3} style={{ width:'100%', background:'#202028', border:'1px solid rgba(255,255,255,.1)', color:'#fff', padding:'8px 12px', fontSize:13, outline:'none', resize:'vertical' as const, fontFamily:'inherit', boxSizing:'border-box' as const, marginBottom:8 }}
              />
              <button onClick={addNote} disabled={saving || !noteContent.trim()}
                style={{ background:'#7B61FF', color:'#fff', border:'none', padding:'8px 14px', cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontSize:12, fontWeight:700, fontFamily:'inherit' }}>
                <Send size={13}/> Guardar
              </button>
            </div>
          </div>
        )}

        {/* Tab: Brief */}
        {tab === 'brief' && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            {/* Brief: identity & audience */}
            <div style={S.card}>
              <div style={{ fontWeight:700, fontSize:13, color:'#7B61FF', marginBottom:14 }}>Identidad del negocio</div>
              {client?.form_progress != null && (
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
                  <div style={{ flex:1, height:3, background:'#28283A', borderRadius:2, overflow:'hidden' }}>
                    <div style={{ height:'100%', background:'#7B61FF', width:`${client.form_progress}%` }}/>
                  </div>
                  <span style={{ fontSize:11, color:'#6B6880' }}>Brief {client.form_progress}% completo</span>
                </div>
              )}
              {[
                { label:'¿Qué hace?',      value: client?.what_they_do },
                { label:'UVP',             value: client?.uvp },
                { label:'Slogan',          value: client?.slogan },
                { label:'Cliente ideal',   value: client?.icp_description },
                { label:'Dolor principal', value: client?.pain },
                { label:'Edad del ICP',    value: client?.age_range },
                { label:'NSE',             value: client?.ses },
                { label:'Ticket promedio', value: client?.ticket },
                { label:'Tono de voz',     value: Array.isArray(client?.tone) ? client.tone.join(', ') : client?.tone },
                { label:'Percepción deseada', value: Array.isArray(client?.perception) ? (client.perception as string[]).join(', ') : client?.perception },
                { label:'Objeciones comunes', value: Array.isArray(client?.objections) ? (client.objections as string[]).join(', ') : client?.objections },
              ].map(f => f.value ? (
                <div key={f.label} style={{ marginBottom:12 }}>
                  <div style={S.label}>{f.label}</div>
                  <div style={{ fontSize:12, color:'#C8C6DC', lineHeight:1.55 }}>{String(f.value)}</div>
                </div>
              ) : null)}
            </div>

            <div>
              {/* Brief: web & brand */}
              <div style={{ ...S.card }}>
                <div style={{ fontWeight:700, fontSize:13, color:'#7B61FF', marginBottom:14 }}>Web & Marca</div>
                {[
                  { label:'Sitio actual',   value: client?.current_url },
                  { label:'Dominio',        value: client?.domain_status },
                  { label:'Objetivos web',  value: Array.isArray(client?.goals) ? (client.goals as string[]).join(', ') : null },
                  { label:'Referentes',     value: client?.web_references },
                  { label:'Estilo visual',  value: Array.isArray(client?.style) ? (client.style as string[]).join(', ') : null },
                  { label:'Páginas',        value: Array.isArray(client?.pages) ? (client.pages as string[]).join(', ') : null },
                  { label:'Idiomas',        value: Array.isArray(client?.languages) ? (client.languages as string[]).join(', ') : null },
                  { label:'Tiene logo',     value: client?.has_logo },
                  { label:'Brandbook',      value: client?.has_brandbook },
                  { label:'Colores def.',   value: client?.colors_defined },
                  { label:'Paleta',         value: client?.palette },
                  { label:'Tipografías',    value: client?.fonts },
                ].map(f => f.value ? (
                  <div key={f.label} style={{ marginBottom:10 }}>
                    <div style={S.label}>{f.label}</div>
                    <div style={{ fontSize:12, color:'#C8C6DC', lineHeight:1.55 }}>{String(f.value)}</div>
                  </div>
                ) : null)}
              </div>

              {/* Brief: market & business */}
              <div style={S.card}>
                <div style={{ fontWeight:700, fontSize:13, color:'#7B61FF', marginBottom:14 }}>Mercado & Negocio</div>
                {[
                  { label:'Competidores',   value: client?.competitors },
                  { label:'Diferenciador',  value: client?.better_than },
                  { label:'Posicionamiento',value: client?.pricing_pos },
                  { label:'# Clientes',     value: client?.clients_count },
                  { label:'Revenue actual', value: client?.revenue },
                  { label:'Meta revenue',   value: client?.revenue_goal },
                  { label:'Nuevos/mes',     value: client?.new_clients_pm ? String(client.new_clients_pm) : null },
                  { label:'Notas extra',    value: client?.extra_notes },
                ].map(f => f.value ? (
                  <div key={f.label} style={{ marginBottom:10 }}>
                    <div style={S.label}>{f.label}</div>
                    <div style={{ fontSize:12, color:'#C8C6DC', lineHeight:1.55 }}>{String(f.value)}</div>
                  </div>
                ) : null)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
