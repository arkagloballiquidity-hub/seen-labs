'use client'
import { useEffect, useState } from 'react'
import { supabase, STATUS_LABELS, STATUS_COLORS, PLAN_LABELS, type Project, type ProjectStatus } from '@/lib/supabase'
import { Users, TrendingUp, Clock, CheckCircle, Plus, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const COLUMNS: ProjectStatus[] = ['lead','brief_sent','brief_complete','proposal','closed_won','in_progress','delivered']

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    fetchProjects()
    const ch = supabase.channel('projects')
      .on('postgres_changes',{ event:'*', schema:'public', table:'projects' }, fetchProjects)
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [])

  async function fetchProjects() {
    const { data } = await supabase.from('projects')
      .select('*, clients(company_name,brand_name,client_email,industry)')
      .order('created_at',{ ascending:false })
    setProjects(data || [])
    setLoading(false)
  }

  const byStatus = (s: ProjectStatus) => projects.filter(p => p.status === s)
  const active   = projects.filter(p => ['in_progress','delivered'].includes(p.status)).length
  const revenue  = projects.filter(p => p.payment_status === 'paid').reduce((a,p) => a+(p.payment_amount||0), 0)

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden' }}>
      {/* Sidebar */}
      <aside style={{ width:220, background:'var(--d1)', borderRight:'1px solid rgba(255,255,255,.06)', flexShrink:0, display:'flex', flexDirection:'column', padding:'16px 12px', gap:4 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24, padding:'0 8px' }}>
          <div style={{ width:7,height:7,borderRadius:'50%',background:'var(--p)',boxShadow:'0 0 10px var(--p)' }}/>
          <span style={{ fontFamily:'var(--font-sora)',fontWeight:800,fontSize:13,letterSpacing:'0.12em' }}>SEEN LABS</span>
          <span style={{ fontSize:9,color:'var(--g1)',letterSpacing:'0.1em' }}>CRM</span>
        </div>
        {[
          { label:'Pipeline',      href:'/',          icon:'▦' },
          { label:'Clientes',      href:'/clientes',  icon:'◉' },
        ].map(item => (
          <Link key={item.label} href={item.href}
            style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px',
              background: item.href==='/' ? 'rgba(123,97,255,.12)':'transparent',
              color: item.href==='/' ? '#fff':'var(--g2)',
              fontFamily:'var(--font-sora)', fontSize:13, textDecoration:'none' }}>
            <span style={{ fontSize:11 }}>{item.icon}</span>{item.label}
          </Link>
        ))}
        <a href="https://seenlabs.com/formularios.html" target="_blank" rel="noopener noreferrer"
          style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px',
            color:'var(--g2)', fontFamily:'var(--font-sora)', fontSize:13, textDecoration:'none', marginTop:'auto' }}>
          <span style={{ fontSize:11 }}>◈</span>Formularios
          <ExternalLink size={10} style={{ marginLeft:'auto', opacity:0.4 }}/>
        </a>
      </aside>

      {/* Main */}
      <main style={{ flex:1, overflow:'auto' }}>
        {/* Header */}
        <div style={{ borderBottom:'1px solid rgba(255,255,255,.06)', background:'var(--d1)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 24px', position:'sticky', top:0, zIndex:10 }}>
          <div>
            <h1 style={{ fontFamily:'var(--font-sora)', fontWeight:700, fontSize:18 }}>Pipeline</h1>
            <p style={{ fontSize:11, color:'var(--g1)', marginTop:2 }}>{projects.length} proyectos</p>
          </div>
          <Link href="/nuevo" style={{ background:'var(--p)', color:'#fff', fontFamily:'var(--font-sora)', fontSize:12, fontWeight:700, letterSpacing:'0.08em', padding:'8px 16px', display:'flex', alignItems:'center', gap:6, textDecoration:'none' }}>
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
            <div key={s.label} style={{ background:'var(--d2)', border:'1px solid rgba(255,255,255,.06)', padding:'14px 18px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontSize:10, color:'var(--g1)', fontFamily:'var(--font-sora)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{s.label}</span>
                <s.Icon size={13} color={s.color}/>
              </div>
              <div style={{ fontFamily:'var(--font-sora)', fontWeight:800, fontSize:24, color:s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Kanban Board */}
        {loading ? (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:300, color:'var(--g1)', fontSize:13 }}>Cargando proyectos...</div>
        ) : (
          <div style={{ display:'flex', gap:12, padding:24, overflowX:'auto', minHeight:'calc(100vh - 210px)' }}>
            {COLUMNS.map(status => (
              <div key={status} style={{ width:230, flexShrink:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10, padding:'0 4px' }}>
                  <div style={{ width:8,height:8,borderRadius:'50%',background:STATUS_COLORS[status] }}/>
                  <span style={{ fontFamily:'var(--font-sora)', fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--g3)' }}>
                    {STATUS_LABELS[status]}
                  </span>
                  <span style={{ marginLeft:'auto', background:'var(--d3)', fontSize:10, fontWeight:700, color:'var(--g1)', padding:'1px 7px', borderRadius:99 }}>
                    {byStatus(status).length}
                  </span>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {byStatus(status).map(p => {
                    const c = p.clients as any
                    return (
                      <Link key={p.id} href={`/proyecto/${p.id}`}
                        style={{ background:'var(--d2)', border:'1px solid rgba(255,255,255,.06)', padding:'12px 14px', display:'block', textDecoration:'none' }}>
                        <div style={{ fontFamily:'var(--font-sora)', fontWeight:700, fontSize:13, color:'#fff', marginBottom:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                          {c?.brand_name || c?.company_name || 'Sin nombre'}
                        </div>
                        <div style={{ fontSize:11, color:'var(--g1)', marginBottom:8 }}>{c?.industry || '—'}</div>
                        {p.plan && <div style={{ fontSize:10, color:'var(--p)', fontFamily:'var(--font-sora)', fontWeight:600, marginBottom:8 }}>{PLAN_LABELS[p.plan]}</div>}
                        {/* Progress bar */}
                        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                          <div style={{ flex:1, height:3, background:'var(--d4)', borderRadius:2, overflow:'hidden' }}>
                            <div style={{ height:'100%', background:STATUS_COLORS[status], width:`${(p.current_step/10)*100}%` }}/>
                          </div>
                          <span style={{ fontSize:9, color:'var(--g1)' }}>{p.current_step}/10</span>
                        </div>
                        <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
                          <span style={{ fontSize:10, color: p.payment_status==='paid' ? '#22C55E' : 'var(--g1)' }}>
                            {p.payment_status==='paid' ? '✓ Pagado' : '⏳ Pendiente'}
                          </span>
                          {p.payment_amount && <span style={{ fontSize:10, color:'var(--g2)', fontWeight:700 }}>${p.payment_amount.toLocaleString()}</span>}
                        </div>
                      </Link>
                    )
                  })}
                  {byStatus(status).length === 0 && (
                    <div style={{ border:'1px dashed rgba(255,255,255,.07)', padding:'18px 14px', textAlign:'center', color:'var(--g1)', fontSize:11 }}>Vacío</div>
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
