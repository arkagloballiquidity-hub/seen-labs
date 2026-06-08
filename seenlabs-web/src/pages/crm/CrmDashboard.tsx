import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, STATUS_LABELS, STATUS_COLORS, PLAN_LABELS, type Project, type ProjectStatus } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import { Users, TrendingUp, Clock, CheckCircle, Plus, ExternalLink, LogOut } from 'lucide-react'

const COLUMNS: ProjectStatus[] = ['lead','brief_sent','brief_complete','proposal','closed_won','in_progress','delivered']

const S = {
  wrap:    { display:'flex' as const, height:'100vh', overflow:'hidden' as const, background:'#0A0A0F', fontFamily:'sans-serif' },
  sidebar: { width:220, background:'#111118', borderRight:'1px solid rgba(255,255,255,.06)', flexShrink:0 as const, display:'flex' as const, flexDirection:'column' as const, padding:'16px 12px', gap:4 },
  main:    { flex:1, overflow:'auto' as const },
  card:    { background:'#18181F', border:'1px solid rgba(255,255,255,.06)', padding:'14px 18px' },
}

export function CrmDashboard() {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    fetchProjects()
    const ch = supabase.channel('crm-projects')
      .on('postgres_changes', { event:'*', schema:'public', table:'projects' }, fetchProjects)
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*, clients(company_name,brand_name,client_email,industry)')
      .order('created_at', { ascending: false })
    if (!error) { setProjects(data || []); setLoading(false) }
  }

  const byStatus  = (s: ProjectStatus) => projects.filter(p => p.status === s)
  const active    = projects.filter(p => ['in_progress','delivered'].includes(p.status)).length
  const revenue   = projects.filter(p => p.payment_status === 'paid').reduce((a,p) => a+(p.payment_amount||0), 0)

  async function handleSignOut() {
    await signOut()
    navigate('/acceso', { replace: true })
  }

  return (
    <div style={S.wrap}>
      {/* Sidebar */}
      <aside style={S.sidebar}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24, padding:'0 8px' }}>
          <div style={{ width:7,height:7,borderRadius:'50%',background:'#7B61FF',boxShadow:'0 0 10px #7B61FF' }}/>
          <span style={{ fontFamily:'inherit', fontWeight:800, fontSize:13, letterSpacing:'0.12em', color:'#fff' }}>SEEN LABS</span>
          <span style={{ fontSize:9, color:'#6B6880', letterSpacing:'0.1em' }}>CRM</span>
        </div>

        {[
          { label:'Pipeline',   href:'/crm',          icon:'▦', active: true },
          { label:'Clientes',   href:'/crm/clientes',  icon:'◉', active: false },
        ].map(item => (
          <Link key={item.label} to={item.href} style={{
            display:'flex', alignItems:'center', gap:10, padding:'9px 12px',
            background: item.active ? 'rgba(123,97,255,.12)' : 'transparent',
            color: item.active ? '#fff' : '#9A98B0',
            fontSize:13, textDecoration:'none', borderRadius:4,
          }}>
            <span style={{ fontSize:11 }}>{item.icon}</span>{item.label}
          </Link>
        ))}

        <a href="/formularios.html" target="_blank" rel="noopener noreferrer" style={{
          display:'flex', alignItems:'center', gap:10, padding:'9px 12px',
          color:'#9A98B0', fontSize:13, textDecoration:'none',
        }}>
          <span style={{ fontSize:11 }}>◈</span>Formularios
          <ExternalLink size={10} style={{ marginLeft:'auto', opacity:0.4 }}/>
        </a>

        <div style={{ marginTop:'auto' }}>
          <div style={{ fontSize:11, color:'#6B6880', padding:'0 12px 8px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>
            {user?.email}
          </div>
          <button onClick={handleSignOut} style={{
            display:'flex', alignItems:'center', gap:10, padding:'9px 12px', width:'100%',
            background:'transparent', border:'none', color:'#9A98B0', fontSize:13, cursor:'pointer', borderRadius:4,
          }}>
            <LogOut size={13}/> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={S.main}>
        {/* Header */}
        <div style={{ borderBottom:'1px solid rgba(255,255,255,.06)', background:'#111118', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 24px', position:'sticky' as const, top:0, zIndex:10 }}>
          <div>
            <h1 style={{ fontWeight:700, fontSize:18, color:'#fff', margin:0 }}>Pipeline</h1>
            <p style={{ fontSize:11, color:'#6B6880', marginTop:2, marginBottom:0 }}>{projects.length} proyectos</p>
          </div>
          <Link to="/crm/nuevo" style={{ background:'#7B61FF', color:'#fff', fontSize:12, fontWeight:700, letterSpacing:'0.08em', padding:'8px 16px', display:'flex', alignItems:'center', gap:6, textDecoration:'none' }}>
            <Plus size={13}/> Nuevo
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, padding:'20px 24px 0' }}>
          {[
            { label:'Total',      value: projects.length,               color:'#7B61FF', Icon: Users },
            { label:'En proceso', value: active,                         color:'#F59E0B', Icon: Clock },
            { label:'Entregados', value: byStatus('delivered').length,   color:'#22C55E', Icon: CheckCircle },
            { label:'Revenue',    value: `$${revenue.toLocaleString()}`, color:'#10B981', Icon: TrendingUp },
          ].map(s => (
            <div key={s.label} style={S.card}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontSize:10, color:'#6B6880', letterSpacing:'0.08em', textTransform:'uppercase' as const }}>{s.label}</span>
                <s.Icon size={13} color={s.color}/>
              </div>
              <div style={{ fontWeight:800, fontSize:24, color:s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Kanban */}
        {loading ? (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:300, color:'#6B6880', fontSize:13 }}>Cargando...</div>
        ) : (
          <div style={{ display:'flex', gap:12, padding:24, overflowX:'auto' as const, minHeight:'calc(100vh - 210px)' }}>
            {COLUMNS.map(status => (
              <div key={status} style={{ width:230, flexShrink:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10, padding:'0 4px' }}>
                  <div style={{ width:8,height:8,borderRadius:'50%',background:STATUS_COLORS[status] }}/>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' as const, color:'#C8C6DC' }}>
                    {STATUS_LABELS[status]}
                  </span>
                  <span style={{ marginLeft:'auto', background:'#202028', fontSize:10, fontWeight:700, color:'#6B6880', padding:'1px 7px', borderRadius:99 }}>
                    {byStatus(status).length}
                  </span>
                </div>
                <div style={{ display:'flex', flexDirection:'column' as const, gap:8 }}>
                  {byStatus(status).map(p => {
                    const c = p.clients as any
                    return (
                      <Link key={p.id} to={`/crm/proyecto/${p.id}`} style={{ ...S.card, display:'block', textDecoration:'none', cursor:'pointer' }}>
                        <div style={{ fontWeight:700, fontSize:13, color:'#fff', marginBottom:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>
                          {c?.brand_name || c?.company_name || 'Sin nombre'}
                        </div>
                        <div style={{ fontSize:11, color:'#6B6880', marginBottom:8 }}>{c?.industry || '—'}</div>
                        {p.plan && <div style={{ fontSize:10, color:'#7B61FF', fontWeight:600, marginBottom:8 }}>{PLAN_LABELS[p.plan]}</div>}
                        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                          <div style={{ flex:1, height:3, background:'#28283A', borderRadius:2, overflow:'hidden' }}>
                            <div style={{ height:'100%', background:STATUS_COLORS[status], width:`${(p.current_step/10)*100}%` }}/>
                          </div>
                          <span style={{ fontSize:9, color:'#6B6880' }}>{p.current_step}/10</span>
                        </div>
                        <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
                          <span style={{ fontSize:10, color: p.payment_status==='paid' ? '#22C55E' : '#6B6880' }}>
                            {p.payment_status==='paid' ? '✓ Pagado' : '⏳ Pendiente'}
                          </span>
                          {p.payment_amount ? <span style={{ fontSize:10, color:'#9A98B0', fontWeight:700 }}>${p.payment_amount.toLocaleString()}</span> : null}
                        </div>
                      </Link>
                    )
                  })}
                  {byStatus(status).length === 0 && (
                    <div style={{ border:'1px dashed rgba(255,255,255,.07)', padding:'18px 14px', textAlign:'center' as const, color:'#6B6880', fontSize:11 }}>Vacío</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
