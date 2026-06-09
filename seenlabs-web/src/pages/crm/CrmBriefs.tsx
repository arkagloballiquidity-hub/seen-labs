import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, type Client, type Project } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import { ExternalLink, LogOut, Search, ChevronDown, ChevronRight } from 'lucide-react'

interface ClientWithProject extends Client {
  projects?: Project[]
}

const BRIEF_FIELDS = [
  { key:'what_they_do',    label:'¿Qué hace?' },
  { key:'uvp',             label:'UVP' },
  { key:'slogan',          label:'Slogan' },
  { key:'icp_description', label:'Cliente ideal' },
  { key:'pain',            label:'Dolor principal' },
  { key:'tone',            label:'Tono de voz',     array:true },
  { key:'perception',      label:'Percepción',       array:true },
  { key:'age_range',       label:'Rango de edad' },
  { key:'ses',             label:'NSE' },
  { key:'goals',           label:'Objetivos web',    array:true },
  { key:'style',           label:'Estilo visual',    array:true },
  { key:'competitors',     label:'Competidores' },
  { key:'better_than',     label:'Diferenciador' },
  { key:'pricing_pos',     label:'Posicionamiento' },
  { key:'revenue_goal',    label:'Meta de revenue' },
  { key:'current_url',     label:'Sitio actual' },
  { key:'web_references',  label:'Referentes' },
  { key:'extra_notes',     label:'Notas extra' },
]

const S = {
  wrap:    { display:'flex' as const, height:'100vh', overflow:'hidden' as const, background:'#0A0A0F', fontFamily:'sans-serif' },
  sidebar: { width:220, background:'#111118', borderRight:'1px solid rgba(255,255,255,.06)', flexShrink:0 as const, display:'flex' as const, flexDirection:'column' as const, padding:'16px 12px', gap:4 },
  main:    { flex:1, overflow:'auto' as const },
}

export function CrmBriefs() {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const [clients, setClients] = useState<ClientWithProject[]>([])
  const [search,  setSearch]  = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('clients')
      .select('*, projects(id, status, plan, current_step)')
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setClients(data) })
  }, [])

  const filtered = clients.filter(c =>
    !search ||
    c.company_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.brand_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.client_email?.toLowerCase().includes(search.toLowerCase())
  )

  async function handleSignOut() {
    await signOut()
    navigate('/acceso', { replace: true })
  }

  function briefValue(client: Client, key: string, isArray?: boolean): string | null {
    const val = (client as any)[key]
    if (!val) return null
    if (isArray && Array.isArray(val)) return val.join(', ')
    if (typeof val === 'number') return String(val)
    return String(val)
  }

  function completedFields(client: Client): number {
    return BRIEF_FIELDS.filter(f => {
      const v = (client as any)[f.key]
      return v && (Array.isArray(v) ? v.length > 0 : true)
    }).length
  }

  return (
    <div style={S.wrap}>
      {/* Sidebar */}
      <aside style={S.sidebar}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24, padding:'0 8px' }}>
          <img src="/logo.png" alt="Seen Labs" style={{ height:22, width:'auto', objectFit:'contain', filter:'brightness(0) invert(1)', opacity:0.9 }}/>
          <span style={{ fontSize:9, color:'#6B6880', letterSpacing:'0.12em', textTransform:'uppercase' as const, marginLeft:2 }}>CRM</span>
        </div>

        {[
          { label:'Pipeline',  href:'/crm',           icon:'▦', active:false },
          { label:'Clientes',  href:'/crm/clientes',  icon:'◉', active:false },
          { label:'Briefs',    href:'/crm/briefs',    icon:'◈', active:true  },
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
          <span style={{ fontSize:11 }}>⬡</span>Ver formulario
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
        <div style={{ borderBottom:'1px solid rgba(255,255,255,.06)', background:'#111118', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 24px', position:'sticky' as const, top:0, zIndex:10 }}>
          <div>
            <h1 style={{ fontWeight:700, fontSize:18, color:'#fff', margin:0 }}>Briefs de clientes</h1>
            <p style={{ fontSize:11, color:'#6B6880', marginTop:2, marginBottom:0 }}>Respuestas del formulario por cliente</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, background:'#202028', border:'1px solid rgba(255,255,255,.08)', padding:'7px 12px' }}>
            <Search size={13} color="#6B6880"/>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..."
              style={{ background:'transparent', border:'none', color:'#fff', fontSize:13, outline:'none', width:180 }}/>
          </div>
        </div>

        <div style={{ padding:'20px 24px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:'center' as const, padding:60, color:'#6B6880', fontSize:13 }}>
              No hay clientes con brief aún.
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column' as const, gap:8 }}>
              {filtered.map(c => {
                const proj    = c.projects?.[0]
                const filled  = completedFields(c)
                const total   = BRIEF_FIELDS.length
                const pct     = Math.round((filled / total) * 100)
                const isOpen  = expanded === c.id

                return (
                  <div key={c.id} style={{ background:'#18181F', border:'1px solid rgba(255,255,255,.06)' }}>
                    {/* Row header */}
                    <button onClick={() => setExpanded(isOpen ? null : c.id)} style={{
                      width:'100%', display:'flex', alignItems:'center', gap:16, padding:'14px 18px',
                      background:'transparent', border:'none', cursor:'pointer', textAlign:'left' as const,
                    }}>
                      {isOpen ? <ChevronDown size={14} color="#6B6880"/> : <ChevronRight size={14} color="#6B6880"/>}
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:700, fontSize:14, color:'#fff' }}>{c.brand_name || c.company_name}</div>
                        <div style={{ fontSize:11, color:'#6B6880' }}>{c.client_email} · {c.industry}</div>
                      </div>
                      {/* Progress */}
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:120, height:4, background:'#28283A', borderRadius:2, overflow:'hidden' }}>
                          <div style={{ height:'100%', background: pct >= 70 ? '#22C55E' : pct >= 30 ? '#F59E0B' : '#ef4444', width:`${pct}%` }}/>
                        </div>
                        <span style={{ fontSize:11, color:'#9A98B0', width:36 }}>{pct}%</span>
                      </div>
                      <span style={{ fontSize:11, color:'#6B6880' }}>{filled}/{total} campos</span>
                      {proj?.id && (
                        <Link to={`/crm/proyecto/${proj.id}`} onClick={e => e.stopPropagation()}
                          style={{ fontSize:11, color:'#7B61FF', textDecoration:'none', fontWeight:600, whiteSpace:'nowrap' as const }}>
                          Ver proyecto →
                        </Link>
                      )}
                    </button>

                    {/* Expanded brief */}
                    {isOpen && (
                      <div style={{ borderTop:'1px solid rgba(255,255,255,.06)', padding:'16px 18px 18px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px 24px' }}>
                        {BRIEF_FIELDS.map(f => {
                          const val = briefValue(c, f.key, f.array)
                          return val ? (
                            <div key={f.key}>
                              <div style={{ fontSize:9, color:'#6B6880', letterSpacing:'0.1em', textTransform:'uppercase' as const, marginBottom:3 }}>{f.label}</div>
                              <div style={{ fontSize:12, color:'#C8C6DC', lineHeight:1.5 }}>{val}</div>
                            </div>
                          ) : (
                            <div key={f.key}>
                              <div style={{ fontSize:9, color:'#6B6880', letterSpacing:'0.1em', textTransform:'uppercase' as const, marginBottom:3 }}>{f.label}</div>
                              <div style={{ fontSize:12, color:'#383848', fontStyle:'italic' }}>—</div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
