import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, STATUS_LABELS, STATUS_COLORS, PLAN_LABELS, type Project, type ProjectStep, type Client } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import { LogOut, CheckCircle, Circle, FileText } from 'lucide-react'

export function MiProyecto() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [project, setProject]   = useState<Project | null>(null)
  const [client,  setClient]    = useState<Client | null>(null)
  const [steps,   setSteps]     = useState<ProjectStep[]>([])
  const [loading, setLoading]   = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (user?.email) fetchProject()
  }, [user])

  async function fetchProject() {
    // Find client by email
    const { data: client } = await supabase
      .from('clients')
      .select('id')
      .eq('client_email', user!.email)
      .maybeSingle()

    if (!client) { setNotFound(true); setLoading(false); return }
    setClient(client as Client)

    const { data: proj } = await supabase
      .from('projects')
      .select('*')
      .eq('client_id', client.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!proj) { setNotFound(true); setLoading(false); return }

    const { data: stepsData } = await supabase
      .from('project_steps')
      .select('*')
      .eq('project_id', proj.id)
      .order('step_number')

    setProject(proj as Project)
    setSteps(stepsData || [])
    setLoading(false)
  }

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#0A0A0F', color:'#6B6880', fontSize:13, fontFamily:'sans-serif' }}>
      Cargando tu proyecto...
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0F', fontFamily:'sans-serif' }}>
      {/* Header */}
      <header style={{ borderBottom:'1px solid rgba(255,255,255,.06)', background:'#111118', padding:'16px 24px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <img src="/logo.png" alt="Seen Labs" style={{ height:28, filter:'brightness(0) invert(1)' }}/>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <span style={{ fontSize:12, color:'#6B6880' }}>{user?.email}</span>
          <button onClick={handleSignOut} style={{ background:'transparent', border:'none', color:'#9A98B0', cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontSize:12 }}>
            <LogOut size={14}/> Salir
          </button>
        </div>
      </header>

      <div style={{ maxWidth:680, margin:'0 auto', padding:'40px 24px' }}>
        {notFound ? (
          <div style={{ textAlign:'center', color:'#6B6880', paddingTop:80 }}>
            <p style={{ fontSize:14, marginBottom:8 }}>No encontramos un proyecto asociado a tu cuenta.</p>
            <p style={{ fontSize:12 }}>Escríbenos a <a href="mailto:hola@seenlabs.com" style={{ color:'#7B61FF' }}>hola@seenlabs.com</a></p>
          </div>
        ) : project ? (
          <>
            <div style={{ marginBottom:32 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                <div style={{ width:8,height:8,borderRadius:'50%',background:STATUS_COLORS[project.status] }}/>
                <span style={{ fontSize:12, color:STATUS_COLORS[project.status], fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase' as const }}>
                  {STATUS_LABELS[project.status]}
                </span>
              </div>
              <h1 style={{ fontSize:26, fontWeight:800, color:'#fff', margin:'0 0 6px' }}>Tu proyecto</h1>
              {project.plan && (
                <span style={{ fontSize:12, color:'#7B61FF', fontWeight:600 }}>{PLAN_LABELS[project.plan]}</span>
              )}
            </div>

            {/* Brief CTA — if not filled yet */}
            {(!client?.what_they_do) && (
              <div style={{ background:'rgba(123,97,255,.1)', border:'1px solid rgba(123,97,255,.35)', padding:'20px 24px', marginBottom:24, display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap' as const }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:'#fff', marginBottom:4, display:'flex', alignItems:'center', gap:8 }}>
                    <FileText size={15} color="#7B61FF"/> Paso siguiente: llena tu brief
                  </div>
                  <p style={{ fontSize:12, color:'#9A98B0', margin:0 }}>
                    Para que podamos empezar, necesitamos conocer tu negocio. Toma ~10 minutos.
                  </p>
                </div>
                <a href="/formularios.html" target="_blank" rel="noopener noreferrer"
                  style={{ background:'#7B61FF', color:'#fff', padding:'10px 20px', fontSize:12, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase' as const, textDecoration:'none', whiteSpace:'nowrap' as const, flexShrink:0 }}>
                  Llenar Brief →
                </a>
              </div>
            )}

            {/* Progress */}
            <div style={{ background:'#18181F', border:'1px solid rgba(255,255,255,.06)', padding:'24px', marginBottom:24 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                <span style={{ fontWeight:700, fontSize:14, color:'#fff' }}>Progreso del proyecto</span>
                <span style={{ fontSize:13, color:'#7B61FF', fontWeight:700 }}>{project.current_step}/10 pasos</span>
              </div>
              <div style={{ height:6, background:'#28283A', borderRadius:3, overflow:'hidden', marginBottom:20 }}>
                <div style={{ height:'100%', background:'linear-gradient(90deg,#7B61FF,#5B44CC)', width:`${(project.current_step/10)*100}%`, transition:'width .5s' }}/>
              </div>
              <div style={{ display:'flex', flexDirection:'column' as const, gap:6 }}>
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
            <div style={{ background:'#18181F', border:'1px solid rgba(255,255,255,.06)', padding:'20px 24px' }}>
              <div style={{ fontSize:11, color:'#6B6880', letterSpacing:'0.08em', textTransform:'uppercase' as const, marginBottom:8 }}>Estado de pago</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:14, color: project.payment_status==='paid' ? '#22C55E' : '#F59E0B', fontWeight:700 }}>
                  {project.payment_status === 'paid' ? '✓ Pagado' : project.payment_status === 'partial' ? '⏳ Pago parcial' : '⏳ Pendiente'}
                </span>
                {project.payment_amount ? (
                  <span style={{ fontSize:18, color:'#fff', fontWeight:800 }}>${project.payment_amount.toLocaleString()} USD</span>
                ) : null}
              </div>
            </div>

            <p style={{ textAlign:'center' as const, marginTop:32, fontSize:12, color:'#6B6880' }}>
              ¿Dudas? <a href="mailto:hola@seenlabs.com" style={{ color:'#7B61FF', textDecoration:'none' }}>hola@seenlabs.com</a>
            </p>
          </>
        ) : null}
      </div>
    </div>
  )
}
