import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'

export function LoginPage() {
  const { signIn, role, user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)

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
    if (err) { setError('Email o contraseña incorrectos'); setLoading(false) }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#07070C',
      display: 'flex',
      fontFamily: "'Sora', sans-serif",
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, rgba(123,97,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}/>

      {/* Left panel — branding */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px 56px',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }} className="login-left">
        {/* Corner marks */}
        {[[{top:0,left:0},{borderTop:'1px solid rgba(123,97,255,.4)',borderLeft:'1px solid rgba(123,97,255,.4)'}],
          [{top:0,right:0},{borderTop:'1px solid rgba(123,97,255,.4)',borderRight:'1px solid rgba(123,97,255,.4)'}],
          [{bottom:0,left:0},{borderBottom:'1px solid rgba(123,97,255,.4)',borderLeft:'1px solid rgba(123,97,255,.4)'}],
          [{bottom:0,right:0},{borderBottom:'1px solid rgba(123,97,255,.4)',borderRight:'1px solid rgba(123,97,255,.4)'}],
        ].map(([pos, borders], i) => (
          <div key={i} style={{ position:'absolute', ...pos as any, width:20, height:20, ...borders as any }}/>
        ))}

        <img src="/logo.png" alt="Seen Labs" style={{ height: 38, width: 'auto', objectFit: 'contain', objectPosition: 'left' }}/>

        <div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20 }}>
            <span style={{ width:24, height:1, background:'#7B61FF', display:'inline-block' }}/>
            <span style={{ fontSize:10, color:'#7B61FF', letterSpacing:'0.35em', textTransform:'uppercase', fontWeight:600 }}>
              Out of the Dark
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 3vw, 42px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#fff',
            marginBottom: 16,
          }}>
            Tu sistema<br/>
            <span style={{ color:'rgba(255,255,255,.35)' }}>ya está</span><br/>
            <span style={{
              background: 'linear-gradient(90deg, #7B61FF, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>funcionando.</span>
          </h2>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.4)', lineHeight:1.6, maxWidth:320 }}>
            Accede a tu portal para ver el progreso de tu proyecto en tiempo real.
          </p>
        </div>

        <p style={{ fontSize:11, color:'rgba(255,255,255,.18)', letterSpacing:'0.08em' }}>
          © 2025 Seen Labs · Todos los derechos reservados
        </p>
      </div>

      {/* Right panel — form */}
      <div style={{
        width: '100%',
        maxWidth: 480,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 56px',
      }} className="login-right">

        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize:10, color:'#7B61FF', letterSpacing:'0.3em', textTransform:'uppercase', fontWeight:600, marginBottom:12 }}>
            Portal de acceso
          </p>
          <h1 style={{ fontSize:28, fontWeight:800, letterSpacing:'-0.02em', color:'#fff', margin:0 }}>
            Bienvenido
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <div>
            <label style={{ fontSize:10, color:'rgba(255,255,255,.4)', letterSpacing:'0.15em', textTransform:'uppercase', display:'block', marginBottom:8, fontWeight:600 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="tu@email.com"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 2,
                color: '#fff',
                padding: '14px 16px',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color .2s',
                fontFamily: 'inherit',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(123,97,255,.6)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'}
            />
          </div>

          <div>
            <label style={{ fontSize:10, color:'rgba(255,255,255,.4)', letterSpacing:'0.15em', textTransform:'uppercase', display:'block', marginBottom:8, fontWeight:600 }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 2,
                color: '#fff',
                padding: '14px 16px',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color .2s',
                fontFamily: 'inherit',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(123,97,255,.6)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,.1)',
              border: '1px solid rgba(239,68,68,.25)',
              padding: '10px 14px',
              fontSize: 12,
              color: '#fca5a5',
              borderRadius: 2,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || authLoading}
            style={{
              background: loading ? 'rgba(123,97,255,.5)' : '#7B61FF',
              color: '#fff',
              border: 'none',
              borderRadius: 2,
              padding: '15px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background .2s, transform .1s',
              fontFamily: 'inherit',
              marginTop: 4,
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#6B51EF' }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#7B61FF' }}
          >
            {loading ? 'Verificando...' : 'Entrar →'}
          </button>
        </form>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <p style={{ fontSize:12, color:'rgba(255,255,255,.25)', margin:0, lineHeight:1.6 }}>
            ¿No tienes acceso aún?{' '}
            <a href="/formularios.html" style={{ color:'#7B61FF', textDecoration:'none' }}>
              Empieza aquí
            </a>
            {' '}o escríbenos a{' '}
            <a href="mailto:hola@seenlabs.com" style={{ color:'rgba(255,255,255,.4)', textDecoration:'none' }}>
              hola@seenlabs.com
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .login-left { display: none !important; }
          .login-right { max-width: 100% !important; padding: 48px 32px !important; }
        }
      `}</style>
    </div>
  )
}
