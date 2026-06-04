import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'

export function LoginPage() {
  const { signIn, role, user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Redirect once role resolves after login
  useEffect(() => {
    if (!authLoading && user && role) {
      navigate(role === 'admin' ? '/crm' : '/mi-proyecto', { replace: true })
    }
  }, [user, role, authLoading])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error: err } = await signIn(email, password)
    if (err) { setError('Credenciales incorrectas'); setLoading(false) }
    // redirect handled by useEffect above once role resolves
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0F', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif' }}>
      <div style={{ width:'100%', maxWidth:380, padding:'0 24px' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <img src="/logo.png" alt="Seen Labs" style={{ height:36, marginBottom:16, filter:'brightness(0) invert(1)' }} />
          <p style={{ fontSize:12, color:'#6B6880', letterSpacing:'0.15em', textTransform:'uppercase', margin:0 }}>Portal de acceso</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div>
            <label style={{ fontSize:11, color:'#9A98B0', letterSpacing:'0.08em', textTransform:'uppercase', display:'block', marginBottom:6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{ width:'100%', background:'#18181F', border:'1px solid rgba(255,255,255,.1)', color:'#fff', padding:'12px 14px', fontSize:14, outline:'none', boxSizing:'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize:11, color:'#9A98B0', letterSpacing:'0.08em', textTransform:'uppercase', display:'block', marginBottom:6 }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{ width:'100%', background:'#18181F', border:'1px solid rgba(255,255,255,.1)', color:'#fff', padding:'12px 14px', fontSize:14, outline:'none', boxSizing:'border-box' }}
            />
          </div>

          {error && (
            <p style={{ fontSize:12, color:'#EF4444', textAlign:'center', margin:0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || authLoading}
            style={{ background:'#7B61FF', color:'#fff', border:'none', padding:'13px', fontSize:13, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop:4 }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p style={{ textAlign:'center', marginTop:28, fontSize:11, color:'#6B6880' }}>
          ¿Problemas para acceder? Escríbenos a{' '}
          <a href="mailto:hola@seenlabs.com" style={{ color:'#7B61FF', textDecoration:'none' }}>hola@seenlabs.com</a>
        </p>
      </div>
    </div>
  )
}
