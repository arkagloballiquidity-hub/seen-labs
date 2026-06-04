import { Navigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'

interface Props {
  children: React.ReactNode
  require: 'admin' | 'client' | 'any'
}

export function ProtectedRoute({ children, require }: Props) {
  const { user, role, loading } = useAuth()

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#0A0A0F', color:'#6B6880', fontFamily:'sans-serif', fontSize:13 }}>
      Cargando...
    </div>
  )

  if (!user) return <Navigate to="/login" replace />

  if (require === 'admin' && role !== 'admin') return <Navigate to="/mi-proyecto" replace />
  if (require === 'client' && role !== 'client') return <Navigate to="/crm" replace />

  return <>{children}</>
}
