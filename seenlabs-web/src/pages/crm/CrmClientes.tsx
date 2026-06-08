import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, PLAN_LABELS, STATUS_LABELS, STATUS_COLORS, type Client, type Project, type PlanType, type ProjectStatus } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import { ExternalLink, LogOut, Plus, Search } from 'lucide-react'

interface ClientWithProject extends Client {
  projects?: Project[]
}

const S = {
  wrap:    { display: 'flex' as const, height: '100vh', overflow: 'hidden' as const, background: '#0A0A0F', fontFamily: 'sans-serif' },
  sidebar: { width: 220, background: '#111118', borderRight: '1px solid rgba(255,255,255,.06)', flexShrink: 0 as const, display: 'flex' as const, flexDirection: 'column' as const, padding: '16px 12px', gap: 4 },
  main:    { flex: 1, overflow: 'auto' as const },
}

export function CrmClientes() {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const [clients, setClients] = useState<ClientWithProject[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => { fetchClients() }, [])

  async function fetchClients() {
    const { data, error } = await supabase
      .from('clients')
      .select('*, projects(id, status, plan, payment_status, payment_amount, current_step)')
      .order('created_at', { ascending: false })
    if (!error) { setClients(data || []); setLoading(false) }
    else setLoading(false)
  }

  async function handleSignOut() {
    await signOut()
    navigate('/acceso', { replace: true })
  }

  const filtered = clients.filter(c =>
    !search ||
    c.company_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.brand_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.client_email?.toLowerCase().includes(search.toLowerCase()) ||
    c.industry?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={S.wrap}>
      {/* Sidebar */}
      <aside style={S.sidebar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '0 8px' }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#7B61FF', boxShadow: '0 0 10px #7B61FF' }}/>
          <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.12em', color: '#fff' }}>SEEN LABS</span>
          <span style={{ fontSize: 9, color: '#6B6880', letterSpacing: '0.1em' }}>CRM</span>
        </div>

        {[
          { label: 'Pipeline',  href: '/crm',          icon: '▦', active: false },
          { label: 'Clientes',  href: '/crm/clientes',  icon: '◉', active: true  },
        ].map(item => (
          <Link key={item.label} to={item.href} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
            background: item.active ? 'rgba(123,97,255,.12)' : 'transparent',
            color: item.active ? '#fff' : '#9A98B0',
            fontSize: 13, textDecoration: 'none', borderRadius: 4,
          }}>
            <span style={{ fontSize: 11 }}>{item.icon}</span>{item.label}
          </Link>
        ))}

        <a href="/formularios.html" target="_blank" rel="noopener noreferrer" style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
          color: '#9A98B0', fontSize: 13, textDecoration: 'none',
        }}>
          <span style={{ fontSize: 11 }}>◈</span>Formularios
          <ExternalLink size={10} style={{ marginLeft: 'auto', opacity: 0.4 }}/>
        </a>

        <div style={{ marginTop: 'auto' }}>
          <div style={{ fontSize: 11, color: '#6B6880', padding: '0 12px 8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>
            {user?.email}
          </div>
          <button onClick={handleSignOut} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', width: '100%',
            background: 'transparent', border: 'none', color: '#9A98B0', fontSize: 13, cursor: 'pointer', borderRadius: 4,
          }}>
            <LogOut size={13}/> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={S.main}>
        {/* Header */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,.06)', background: '#111118', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', position: 'sticky' as const, top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: 18, color: '#fff', margin: 0 }}>Clientes</h1>
            <p style={{ fontSize: 11, color: '#6B6880', marginTop: 2, marginBottom: 0 }}>{clients.length} registrados</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#202028', border: '1px solid rgba(255,255,255,.08)', padding: '7px 12px' }}>
              <Search size={13} color="#6B6880"/>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar cliente..."
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 13, outline: 'none', width: 200 }}
              />
            </div>
            <Link to="/crm/nuevo" style={{ background: '#7B61FF', color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
              <Plus size={13}/> Nuevo
            </Link>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, color: '#6B6880', fontSize: 13 }}>Cargando...</div>
        ) : (
          <div style={{ padding: '20px 24px' }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center' as const, padding: 60, color: '#6B6880', fontSize: 13 }}>
                {search ? 'Sin resultados' : 'No hay clientes aún. Los leads del formulario aparecerán aquí.'}
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                    {['Empresa', 'Industria', 'Email', 'Plan', 'Estado', 'Pago', 'Acciones'].map(h => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left' as const, fontSize: 10, color: '#6B6880', letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => {
                    const proj = c.projects?.[0]
                    return (
                      <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.02)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <td style={{ padding: '12px 12px' }}>
                          <div style={{ fontWeight: 700, fontSize: 13, color: '#fff' }}>{c.brand_name || c.company_name || '—'}</div>
                          <div style={{ fontSize: 11, color: '#6B6880' }}>{c.company_name}</div>
                        </td>
                        <td style={{ padding: '12px 12px', fontSize: 12, color: '#9A98B0' }}>{c.industry || '—'}</td>
                        <td style={{ padding: '12px 12px', fontSize: 12, color: '#9A98B0' }}>{c.client_email || '—'}</td>
                        <td style={{ padding: '12px 12px' }}>
                          {proj?.plan
                            ? <span style={{ fontSize: 11, color: '#7B61FF', fontWeight: 600 }}>{PLAN_LABELS[proj.plan as PlanType]}</span>
                            : <span style={{ fontSize: 11, color: '#6B6880' }}>Sin plan</span>
                          }
                        </td>
                        <td style={{ padding: '12px 12px' }}>
                          {proj?.status ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
                              <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLORS[proj.status as ProjectStatus], display: 'inline-block' }}/>
                              <span style={{ color: STATUS_COLORS[proj.status as ProjectStatus] }}>{STATUS_LABELS[proj.status as ProjectStatus]}</span>
                            </span>
                          ) : <span style={{ fontSize: 11, color: '#6B6880' }}>Sin proyecto</span>}
                        </td>
                        <td style={{ padding: '12px 12px' }}>
                          <span style={{ fontSize: 11, color: proj?.payment_status === 'paid' ? '#22C55E' : '#F59E0B', fontWeight: 600 }}>
                            {proj?.payment_status === 'paid' ? '✓ Pagado' : proj?.payment_amount ? `$${proj.payment_amount.toLocaleString()}` : '—'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 12px' }}>
                          {proj?.id ? (
                            <Link to={`/crm/proyecto/${proj.id}`} style={{ fontSize: 11, color: '#7B61FF', textDecoration: 'none', fontWeight: 600 }}>
                              Ver proyecto →
                            </Link>
                          ) : (
                            <Link to={`/crm/nuevo?client=${c.id}`} style={{ fontSize: 11, color: '#6B6880', textDecoration: 'none' }}>
                              Crear proyecto
                            </Link>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
