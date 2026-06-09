import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, STATUS_LABELS, STATUS_COLORS, PLAN_LABELS, type Project, type ProjectStep, type Client, type Note } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import { LogOut, CheckCircle, Circle, FileText, Bell } from 'lucide-react'

const UPDATE_COLORS: Record<string, string> = {
  milestone:   '#7B61FF',
  deliverable: '#22C55E',
  revision:    '#F59E0B',
  note:        '#9A98B0',
  call:        '#3B82F6',
}
const UPDATE_LABELS: Record<string, string> = {
  milestone:   'Hito',
  deliverable: 'Entregable',
  revision:    'Revisión',
  note:        'Nota',
  call:        'Llamada',
}

export function MiProyecto() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [project,  setProject]  = useState<Project | null>(null)
  const [client,   setClient]   = useState<Client | null>(null)
  const [steps,    setSteps]    = useState<ProjectStep[]>([])
  const [updates,  setUpdates]  = useState<Note[]>([])
  const [loading,  setLoading]  = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [tab,      setTab]      = useState<'progress'|'updates'>('progress')

  useEffect(() => { if (user?.email) fetchProject() }, [user])

  async function fetchProject() {
    const { data: cl } = await supabase
      .from('clients')
      .select('*')
      .eq('client_email', user!.email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!cl) { setNotFound(true); setLoading(false); return }
    setClient(cl as Client)

    const { data: proj } = await supabase
      .from('projects')
      .select('*')
      .eq('client_id', cl.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!proj) { setNotFound(true); setLoading(false); return }

    const [{ data: stepsData }, { data: notesData }] = await Promise.all([
      supabase.from('project_steps').select('*').eq('project_id', proj.id).order('step_number'),
      supabase.from('notes').select('*').eq('project_id', proj.id).eq('client_visible', true).order('created_at', { ascending: false }),
    ])

    setProject(proj as Project)
    setSteps(stepsData || [])
    setUpdates(notesData || [])
    setLoading(false)
  }

  async function handleSignOut() {
    await signOut()
    navigate('/acceso', { replace: true })
  }

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#0A0A0F', color:'#6B6880', fontSize:13, fontFamily:'sans-serif' }}>
      Cargando tu proyecto...
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0F', fontFamily:'sans-serif' }}>
      {/* Header */}
      <header style={{ borderBottom:'1px solid rgba(255,255,255,.06)', background:'#111118', padding:'14px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky' as const, top:0, zIndex:10 }}>
        <img src="/logo.png" alt="Seen Labs" style={{ height:28, width:'auto', objectFit:'contain' }}/>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <span style={{ fontSize:12, color:'#6B6880' }}>{user?.email}</span>
          <button onClick={handleSignOut} style={{ background:'transparent', border:'none', color:'#9A98B0', cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontSize:12 }}>
            <LogOut size={14}/> Salir
          </button>
        </div>
      </header>

      <div style={{ maxWidth:720, margin:'0 auto', padding:'32px 24px' }}>
        {notFound ? (
          <div style={{ textAlign:'center', color:'#6B6880', paddingTop:80 }}>
            <p style={{ fontSize:14, marginBottom:8 }}>No encontramos un proyecto asociado a tu cuenta.</p>
            <p style={{ fontSize:12 }}>Escríbenos a <a href="mailto:hola@seenlabs.com" style={{ color:'#7B61FF' }}>hola@seenlabs.com</a></p>
          </div>
        ) : project ? (
          <>
            {/* Hero status */}
            <div style={{ marginBottom:28 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:STATUS_COLORS[project.status] }}/>
                <span style={{ fontSize:11, color:STATUS_COLORS[project.status], fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase' as const }}>
                  {STATUS_LABELS[project.status]}
                </span>
              </div>
              <h1 style={{ fontSize:24, fontWeight:800, color:'#fff', margin:'0 0 4px' }}>
                {client?.brand_name || client?.company_name}
              </h1>
              {project.plan && (
                <span style={{ fontSize:12, color:'#7B61FF', fontWeight:600 }}>{PLAN_LABELS[project.plan]}</span>
              )}
            </div>

            {/* Brief CTA */}
            {!client?.what_they_do && (
              <div style={{ background:'rgba(123,97,255,.1)', border:'1px solid rgba(123,97,255,.35)', padding:'18px 22px', marginBottom:24, display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap' as const }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:'#fff', marginBottom:4, display:'flex', alignItems:'center', gap:8 }}>
                    <FileText size={15} color="#7B61FF"/> Completa tu brief
                  </div>
                  <p style={{ fontSize:12, color:'#9A98B0', margin:0 }}>Necesitamos conocer tu negocio para arrancar. Toma ~10 min.</p>
                </div>
                <a href="/formularios.html" target="_blank" rel="noopener noreferrer"
                  style={{ background:'#7B61FF', color:'#fff', padding:'10px 20px', fontSize:12, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase' as const, textDecoration:'none', whiteSpace:'nowrap' as const }}>
                  Llenar Brief →
                </a>
              </div>
            )}

            {/* Tabs */}
            <div style={{ display:'flex', gap:0, marginBottom:20, borderBottom:'1px solid rgba(255,255,255,.06)' }}>
              {([
                { key:'progress', label:'Mi proyecto' },
                { key:'updates',  label:`Actualizaciones${updates.length > 0 ? ` (${updates.length})` : ''}` },
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

            {/* Tab: Proyecto */}
            {tab === 'progress' && (
              <>
                {/* Progress bar */}
                <div style={{ background:'#18181F', border:'1px solid rgba(255,255,255,.06)', padding:'22px', marginBottom:20 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                    <span style={{ fontWeight:700, fontSize:14, color:'#fff' }}>Progreso del proyecto</span>
                    <span style={{ fontSize:13, color:'#7B61FF', fontWeight:800 }}>{project.current_step}/10</span>
                  </div>
                  <div style={{ height:6, background:'#28283A', borderRadius:3, overflow:'hidden', marginBottom:18 }}>
                    <div style={{ height:'100%', background:'linear-gradient(90deg,#7B61FF,#a78bfa)', width:`${(project.current_step/10)*100}%`, transition:'width .5s' }}/>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column' as const, gap:4 }}>
                    {steps.map(step => (
                      <div key={step.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
                        {step.completed
                          ? <CheckCircle size={16} color="#7B61FF" style={{ flexShrink:0 }}/>
                          : <Circle size={16} color="#28283A" style={{ flexShrink:0 }}/>
                        }
                        <span style={{ fontSize:13, color: step.completed ? '#fff' : '#6B6880', flex:1 }}>
                          {step.step_number}. {step.step_name}
                        </span>
                        {step.completed && step.completed_at && (
                          <span style={{ fontSize:10, color:'#6B6880' }}>
                            {new Date(step.completed_at).toLocaleDateString('es-MX')}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment */}
                <div style={{ background:'#18181F', border:'1px solid rgba(255,255,255,.06)', padding:'18px 22px' }}>
                  <div style={{ fontSize:11, color:'#6B6880', letterSpacing:'0.08em', textTransform:'uppercase' as const, marginBottom:8 }}>Estado de pago</div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontSize:14, color: project.payment_status==='paid' ? '#22C55E' : '#F59E0B', fontWeight:700 }}>
                      {project.payment_status === 'paid' ? '✓ Pagado' : project.payment_status === 'partial' ? '⏳ Pago parcial' : '⏳ Pendiente'}
                    </span>
                    {project.payment_amount ? (
                      <span style={{ fontSize:20, color:'#fff', fontWeight:800 }}>${project.payment_amount.toLocaleString()} USD</span>
                    ) : null}
                  </div>
                </div>
              </>
            )}

            {/* Tab: Actualizaciones */}
            {tab === 'updates' && (
              <div>
                {updates.length === 0 ? (
                  <div style={{ textAlign:'center' as const, padding:'60px 0', color:'#6B6880' }}>
                    <Bell size={28} style={{ opacity:0.3, marginBottom:12 }}/>
                    <p style={{ fontSize:13 }}>El equipo publicará avances aquí pronto.</p>
                  </div>
                ) : (
                  <div style={{ display:'flex', flexDirection:'column' as const, gap:12 }}>
                    {updates.map(n => {
                      const color = UPDATE_COLORS[n.type] || '#7B61FF'
                      const label = UPDATE_LABELS[n.type] || n.type
                      return (
                        <div key={n.id} style={{ background:'#18181F', border:'1px solid rgba(255,255,255,.06)', borderLeft:`4px solid ${color}`, padding:'18px 20px' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                            <span style={{ fontSize:10, color, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' as const, background:`${color}18`, padding:'2px 8px', borderRadius:3 }}>
                              {label}
                            </span>
                            <span style={{ marginLeft:'auto', fontSize:11, color:'#6B6880' }}>
                              {new Date(n.created_at).toLocaleDateString('es-MX', { day:'2-digit', month:'short', year:'numeric' })}
                            </span>
                          </div>
                          {n.title && (
                            <div style={{ fontWeight:700, fontSize:15, color:'#fff', marginBottom:6 }}>{n.title}</div>
                          )}
                          <div style={{ fontSize:13, color:'#C8C6DC', lineHeight:1.7 }}>{n.content}</div>
                          <div style={{ marginTop:8, fontSize:11, color:'#6B6880' }}>— Equipo Seen Labs</div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            <p style={{ textAlign:'center' as const, marginTop:32, fontSize:12, color:'#6B6880' }}>
              ¿Dudas? <a href="mailto:hola@seenlabs.com" style={{ color:'#7B61FF', textDecoration:'none' }}>hola@seenlabs.com</a>
            </p>
          </>
        ) : null}
      </div>
    </div>
  )
}
