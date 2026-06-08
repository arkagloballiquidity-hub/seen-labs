import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../lib/auth'

const INPUT_STYLE: React.CSSProperties = {
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
}

export function LoginPage() {
  const { signIn, signUp, role, user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // mode: 'login' | 'signup'
  const [mode, setMode] = useState<'login' | 'signup'>(
    searchParams.get('nuevo') === '1' ? 'signup' : 'login'
  )
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [error, setError]       = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)
  const [confirmed, setConfirmed] = useState(false) // email confirmation sent

  useEffect(() => {
    if (!authLoading && user && role) {
      navigate(role === 'admin' ? '/crm' : '/mi-proyecto', { replace: true })
    }
  }, [user, role, authLoading])

  function switchMode(m: 'login' | 'signup') {
    setMode(m)
    setError(null)
    setConfirmed(false)
    setPassword('')
    setConfirm('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (mode === 'signup') {
      if (password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres.')
        return
      }
      if (password !== confirm) {
        setError('Las contraseñas no coinciden.')
        return
      }
      setLoading(true)
      const { error: err, needsConfirmation } = await signUp(email, password)
      if (err) {
        setError(
          err.includes('already registered')
            ? 'Este email ya tiene una cuenta. Inicia sesión.'
            : 'Error al crear cuenta. Intenta de nuevo.'
        )
        setLoading(false)
        return
      }
      if (needsConfirmation) {
        setConfirmed(true)
        setLoading(false)
        return
      }
      // Auto-signed in → useEffect will redirect
    } else {
      setLoading(true)
      const { error: err } = await signIn(email, password)
      if (err) {
        setError('Email o contraseña incorrectos.')
        setLoading(false)
      }
    }
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
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600,
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
        {[
          [{ top:0, left:0   }, { borderTop:'1px solid rgba(123,97,255,.4)', borderLeft:'1px solid rgba(123,97,255,.4)' }],
          [{ top:0, right:0  }, { borderTop:'1px solid rgba(123,97,255,.4)', borderRight:'1px solid rgba(123,97,255,.4)' }],
          [{ bottom:0, left:0  }, { borderBottom:'1px solid rgba(123,97,255,.4)', borderLeft:'1px solid rgba(123,97,255,.4)' }],
          [{ bottom:0, right:0 }, { borderBottom:'1px solid rgba(123,97,255,.4)', borderRight:'1px solid rgba(123,97,255,.4)' }],
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
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: '-0.03em', color: '#fff', marginBottom: 16,
          }}>
            {mode === 'signup' ? (
              <>Tu portal<br/><span style={{ color:'rgba(255,255,255,.35)' }}>está listo</span><br/>
              <span style={{ background:'linear-gradient(90deg,#7B61FF,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>para ti.</span></>
            ) : (
              <>Tu sistema<br/><span style={{ color:'rgba(255,255,255,.35)' }}>ya está</span><br/>
              <span style={{ background:'linear-gradient(90deg,#7B61FF,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>funcionando.</span></>
            )}
          </h2>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.4)', lineHeight:1.6, maxWidth:320 }}>
            {mode === 'signup'
              ? 'Crea tu cuenta con el mismo email que usaste al llenar el brief para ver el progreso de tu proyecto.'
              : 'Accede a tu portal para ver el progreso de tu proyecto en tiempo real.'}
          </p>
        </div>

        <p style={{ fontSize:11, color:'rgba(255,255,255,.18)', letterSpacing:'0.08em' }}>
          © 2025 Seen Labs · Todos los derechos reservados
        </p>
      </div>

      {/* Right panel — form */}
      <div style={{
        width: '100%', maxWidth: 480,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '48px 56px',
      }} className="login-right">

        {/* Mode toggle */}
        <div style={{ display:'flex', gap:0, marginBottom:36, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', padding:4, borderRadius:3 }}>
          {(['login', 'signup'] as const).map(m => (
            <button key={m} onClick={() => switchMode(m)} style={{
              flex:1, padding:'9px 0', fontSize:11, fontWeight:700,
              letterSpacing:'0.12em', textTransform:'uppercase',
              background: mode === m ? '#7B61FF' : 'transparent',
              color: mode === m ? '#fff' : 'rgba(255,255,255,.35)',
              border:'none', cursor:'pointer', borderRadius:2, fontFamily:'inherit',
              transition:'all .2s',
            }}>
              {m === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
            </button>
          ))}
        </div>

        {/* Email confirmation sent state */}
        {confirmed ? (
          <div style={{ textAlign:'center', padding:'32px 0' }}>
            <div style={{ fontSize:36, marginBottom:16 }}>📩</div>
            <h2 style={{ fontSize:20, fontWeight:800, color:'#fff', marginBottom:12 }}>Revisa tu correo</h2>
            <p style={{ fontSize:13, color:'rgba(255,255,255,.5)', lineHeight:1.7, marginBottom:24 }}>
              Enviamos un enlace de confirmación a<br/>
              <strong style={{ color:'#7B61FF' }}>{email}</strong><br/>
              Haz clic en el enlace para activar tu cuenta.
            </p>
            <button onClick={() => { setConfirmed(false); switchMode('login') }}
              style={{ background:'transparent', border:'1px solid rgba(255,255,255,.15)', color:'rgba(255,255,255,.5)', padding:'10px 20px', fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>
              ← Volver al login
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize:10, color:'#7B61FF', letterSpacing:'0.3em', textTransform:'uppercase', fontWeight:600, marginBottom:8 }}>
                {mode === 'signup' ? 'Registro de cliente' : 'Portal de acceso'}
              </p>
              <h1 style={{ fontSize:26, fontWeight:800, letterSpacing:'-0.02em', color:'#fff', margin:0 }}>
                {mode === 'signup' ? 'Crea tu cuenta' : 'Bienvenido'}
              </h1>
              {mode === 'signup' && (
                <p style={{ fontSize:12, color:'rgba(255,255,255,.35)', marginTop:8, marginBottom:0, lineHeight:1.5 }}>
                  Usa el <strong style={{ color:'rgba(255,255,255,.6)' }}>mismo email</strong> con el que llenaste el brief o realizaste el pago.
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
              <div>
                <label style={{ fontSize:10, color:'rgba(255,255,255,.4)', letterSpacing:'0.15em', textTransform:'uppercase', display:'block', marginBottom:8, fontWeight:600 }}>
                  Email
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  required autoComplete="email" placeholder="tu@email.com" style={INPUT_STYLE}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(123,97,255,.6)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'}
                />
              </div>

              <div>
                <label style={{ fontSize:10, color:'rgba(255,255,255,.4)', letterSpacing:'0.15em', textTransform:'uppercase', display:'block', marginBottom:8, fontWeight:600 }}>
                  Contraseña {mode === 'signup' && <span style={{ color:'rgba(255,255,255,.2)', fontWeight:400, textTransform:'none', letterSpacing:0 }}>(mín. 8 caracteres)</span>}
                </label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  required autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  placeholder="••••••••" style={INPUT_STYLE}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(123,97,255,.6)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'}
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label style={{ fontSize:10, color:'rgba(255,255,255,.4)', letterSpacing:'0.15em', textTransform:'uppercase', display:'block', marginBottom:8, fontWeight:600 }}>
                    Confirmar contraseña
                  </label>
                  <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                    required autoComplete="new-password"
                    placeholder="••••••••" style={INPUT_STYLE}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(123,97,255,.6)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'}
                  />
                </div>
              )}

              {error && (
                <div style={{ background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.25)', padding:'10px 14px', fontSize:12, color:'#fca5a5', borderRadius:2 }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading || authLoading} style={{
                background: loading ? 'rgba(123,97,255,.5)' : '#7B61FF',
                color: '#fff', border: 'none', borderRadius: 2, padding: '15px',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background .2s', fontFamily: 'inherit', marginTop: 4,
              }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#6B51EF' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#7B61FF' }}
              >
                {loading
                  ? (mode === 'signup' ? 'Creando cuenta...' : 'Verificando...')
                  : (mode === 'signup' ? 'Crear cuenta →' : 'Entrar →')
                }
              </button>
            </form>

            <div style={{ marginTop:28, paddingTop:20, borderTop:'1px solid rgba(255,255,255,.06)' }}>
              {mode === 'login' ? (
                <p style={{ fontSize:12, color:'rgba(255,255,255,.25)', margin:0, lineHeight:1.6 }}>
                  ¿Acabas de pagar?{' '}
                  <button onClick={() => switchMode('signup')}
                    style={{ background:'none', border:'none', color:'#7B61FF', cursor:'pointer', fontSize:12, padding:0, fontFamily:'inherit' }}>
                    Crea tu cuenta aquí
                  </button>
                  {' '}· ¿Aún no tienes plan?{' '}
                  <a href="/formularios.html" style={{ color:'rgba(255,255,255,.4)', textDecoration:'none' }}>
                    Empieza aquí
                  </a>
                </p>
              ) : (
                <p style={{ fontSize:12, color:'rgba(255,255,255,.25)', margin:0, lineHeight:1.6 }}>
                  ¿Ya tienes cuenta?{' '}
                  <button onClick={() => switchMode('login')}
                    style={{ background:'none', border:'none', color:'#7B61FF', cursor:'pointer', fontSize:12, padding:0, fontFamily:'inherit' }}>
                    Inicia sesión
                  </button>
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Mobile branding header */}
      <div className="login-mobile-header" style={{
        display: 'none', position: 'absolute',
        top: 0, left: 0, right: 0,
        padding: '24px 28px 20px',
        borderBottom: '1px solid rgba(255,255,255,.05)',
        background: 'rgba(255,255,255,.02)',
      }}>
        <img src="/logo.png" alt="Seen Labs" style={{ height: 28, marginBottom: 8 }}/>
        <p style={{ fontSize:10, color:'#7B61FF', letterSpacing:'0.25em', textTransform:'uppercase', fontWeight:600, margin:0 }}>
          {mode === 'signup' ? 'Crea tu cuenta' : 'Tu sistema ya está funcionando'}
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .login-left { display: none !important; }
          .login-right { max-width: 100% !important; padding: 110px 28px 48px !important; }
          .login-mobile-header { display: block !important; }
        }
      `}</style>
    </div>
  )
}
