import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { supabase, type PlanType } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import { ArrowLeft, LogOut } from 'lucide-react'

const DEFAULT_STEPS = [
  'Brief completo',
  'Kickoff call',
  'Estrategia y arquitectura',
  'Diseño aprobado',
  'Desarrollo web',
  'Contenido visual / video',
  'Automatizaciones y IA',
  'Revisión con cliente',
  'QA y pruebas',
  'Entrega y launch',
]

const S = {
  wrap:   { minHeight: '100vh', background: '#0A0A0F', fontFamily: 'sans-serif' },
  card:   { background: '#18181F', border: '1px solid rgba(255,255,255,.06)', padding: '24px', marginBottom: 16 },
  label:  { fontSize: 10, color: '#6B6880', letterSpacing: '0.08em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 6, fontWeight: 600 },
  input:  { width: '100%', background: '#202028', border: '1px solid rgba(255,255,255,.1)', color: '#fff', padding: '10px 14px', fontSize: 13, outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'inherit' },
  select: { width: '100%', background: '#202028', border: '1px solid rgba(255,255,255,.1)', color: '#fff', padding: '10px 14px', fontSize: 13, outline: 'none', boxSizing: 'border-box' as const, cursor: 'pointer', fontFamily: 'inherit' },
}

export function CrmNuevo() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const existingClientId = searchParams.get('client')

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    company_name: '',
    brand_name: '',
    industry: '',
    city: '',
    client_email: '',
    what_they_do: '',
    plan: '' as PlanType | '',
    payment_amount: '',
    payment_status: 'pending' as 'pending' | 'partial' | 'paid',
    internal_notes: '',
  })

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.company_name || !form.client_email) {
      setError('Nombre de empresa y email son requeridos.')
      return
    }
    setSaving(true)
    setError(null)

    try {
      let clientId = existingClientId

      if (!clientId) {
        // Create client
        const { data: clientData, error: clientErr } = await supabase
          .from('clients')
          .insert({
            company_name: form.company_name,
            brand_name:   form.brand_name || form.company_name,
            industry:     form.industry,
            city:         form.city,
            client_email: form.client_email,
            what_they_do: form.what_they_do,
            form_progress: 0,
          })
          .select('id')
          .single()

        if (clientErr || !clientData) throw new Error(clientErr?.message || 'Error creando cliente')
        clientId = clientData.id
      }

      // Create project
      const { data: projData, error: projErr } = await supabase
        .from('projects')
        .insert({
          client_id:      clientId,
          status:         'lead',
          plan:           form.plan || null,
          payment_status: form.payment_status,
          payment_amount: form.payment_amount ? parseFloat(form.payment_amount) : null,
          current_step:   0,
          internal_notes: form.internal_notes,
        })
        .select('id')
        .single()

      if (projErr || !projData) throw new Error(projErr?.message || 'Error creando proyecto')
      const projectId = projData.id

      // Create 10 default steps
      const steps = DEFAULT_STEPS.map((name, i) => ({
        project_id:  projectId,
        step_number: i + 1,
        step_name:   name,
        completed:   false,
        completed_at: null,
        notes:       '',
      }))
      await supabase.from('project_steps').insert(steps)

      navigate(`/crm/proyecto/${projectId}`)
    } catch (err: any) {
      setError(err.message || 'Error inesperado')
      setSaving(false)
    }
  }

  async function handleSignOut() {
    await signOut()
    navigate('/acceso', { replace: true })
  }

  return (
    <div style={S.wrap}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,.06)', background: '#111118', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16, position: 'sticky' as const, top: 0, zIndex: 10 }}>
        <Link to="/crm" style={{ color: '#9A98B0', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, textDecoration: 'none' }}>
          <ArrowLeft size={15}/> Pipeline
        </Link>
        <span style={{ color: '#6B6880' }}>/</span>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>Nuevo proyecto</span>
        <button onClick={handleSignOut} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#6B6880', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <LogOut size={14}/>
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px' }}>

        {/* Client info */}
        <div style={S.card}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 20 }}>Datos del cliente</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={S.label}>Nombre empresa <span style={{ color: '#7B61FF' }}>*</span></label>
              <input style={S.input} value={form.company_name} onChange={e => set('company_name', e.target.value)} placeholder="Ej: Acme Corp" disabled={!!existingClientId}/>
            </div>
            <div>
              <label style={S.label}>Nombre de marca</label>
              <input style={S.input} value={form.brand_name} onChange={e => set('brand_name', e.target.value)} placeholder="Ej: Acme" disabled={!!existingClientId}/>
            </div>
            <div>
              <label style={S.label}>Email del cliente <span style={{ color: '#7B61FF' }}>*</span></label>
              <input style={S.input} type="email" value={form.client_email} onChange={e => set('client_email', e.target.value)} placeholder="cliente@empresa.com" disabled={!!existingClientId}/>
            </div>
            <div>
              <label style={S.label}>Industria</label>
              <input style={S.input} value={form.industry} onChange={e => set('industry', e.target.value)} placeholder="Ej: Real Estate" disabled={!!existingClientId}/>
            </div>
            <div>
              <label style={S.label}>Ciudad / País</label>
              <input style={S.input} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Ej: Miami, FL" disabled={!!existingClientId}/>
            </div>
          </div>
          {!existingClientId && (
            <div style={{ marginTop: 16 }}>
              <label style={S.label}>¿Qué hace su empresa?</label>
              <textarea
                value={form.what_they_do}
                onChange={e => set('what_they_do', e.target.value)}
                placeholder="Descripción del negocio..."
                style={{ ...S.input, minHeight: 80, resize: 'vertical' as const }}
              />
            </div>
          )}
          {existingClientId && (
            <p style={{ fontSize: 12, color: '#7B61FF', marginTop: 12, marginBottom: 0 }}>
              ✓ Asociando proyecto al cliente existente (ID: {existingClientId.slice(0,8)}…)
            </p>
          )}
        </div>

        {/* Project info */}
        <div style={S.card}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 20 }}>Detalles del proyecto</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={S.label}>Plan contratado</label>
              <select style={S.select} value={form.plan} onChange={e => set('plan', e.target.value)}>
                <option value="">Sin plan aún</option>
                <option value="ootd">OOTD — $2,630 USD</option>
                <option value="partner_light">Partner Light — $983 USD</option>
                <option value="enterprise">Enterprise (Custom)</option>
              </select>
            </div>
            <div>
              <label style={S.label}>Estado de pago</label>
              <select style={S.select} value={form.payment_status} onChange={e => set('payment_status', e.target.value as any)}>
                <option value="pending">Pendiente</option>
                <option value="partial">Pago parcial</option>
                <option value="paid">Pagado ✓</option>
              </select>
            </div>
            <div>
              <label style={S.label}>Monto pagado (USD)</label>
              <input
                style={S.input} type="number" min="0"
                value={form.payment_amount}
                onChange={e => set('payment_amount', e.target.value)}
                placeholder={form.plan === 'ootd' ? '2630' : form.plan === 'partner_light' ? '983' : '0'}
              />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={S.label}>Notas internas</label>
            <textarea
              value={form.internal_notes}
              onChange={e => set('internal_notes', e.target.value)}
              placeholder="Contexto del cliente, cómo llegó, notas del equipo..."
              style={{ ...S.input, minHeight: 80, resize: 'vertical' as const }}
            />
          </div>
        </div>

        {/* Steps preview */}
        <div style={S.card}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 4 }}>Los 10 pasos del proyecto</div>
          <p style={{ fontSize: 12, color: '#6B6880', marginBottom: 16 }}>Se crearán automáticamente al guardar.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {DEFAULT_STEPS.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                <span style={{ fontSize: 10, color: '#7B61FF', fontWeight: 700, width: 18 }}>{i + 1}</span>
                <span style={{ fontSize: 12, color: '#9A98B0' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)', padding: '10px 14px', fontSize: 13, color: '#fca5a5', marginBottom: 16 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={saving} style={{
            background: saving ? 'rgba(123,97,255,.5)' : '#7B61FF',
            color: '#fff', border: 'none', padding: '12px 28px',
            fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
            cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
          }}>
            {saving ? 'Creando...' : 'Crear proyecto →'}
          </button>
          <Link to="/crm" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.12)', color: '#9A98B0', padding: '12px 20px', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            Cancelar
          </Link>
        </div>

        <p style={{ fontSize: 11, color: '#6B6880', marginTop: 20 }}>
          El cliente recibirá acceso al portal en <strong style={{ color: '#9A98B0' }}>/mi-proyecto</strong> usando el email registrado.
        </p>
      </form>
    </div>
  )
}
