import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

type Role = 'admin' | 'client' | null

interface AuthCtx {
  user: User | null
  session: Session | null
  role: Role
  loading: boolean  // true = not yet safe to make routing decisions
  signIn:  (email: string, password: string) => Promise<{ error: string | null }>
  signUp:  (email: string, password: string) => Promise<{ error: string | null; needsConfirmation: boolean }>
  signOut: () => Promise<void>
}

const Ctx = createContext<AuthCtx>({} as AuthCtx)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [role,    setRole]    = useState<Role>(null)
  const [loading, setLoading] = useState(true)

  // Track latest resolveRole call to discard stale results
  const resolveSeq = useRef(0)

  async function resolveRole(u: User | null) {
    const seq = ++resolveSeq.current
    if (!u) {
      if (seq === resolveSeq.current) { setRole(null); setLoading(false) }
      return
    }
    setLoading(true)
    const { data } = await supabase
      .from('team_members')
      .select('id')
      .eq('email', u.email)
      .maybeSingle()
    // Only apply if this is still the latest call (not superseded by a newer auth event)
    if (seq === resolveSeq.current) {
      setRole(data ? 'admin' : 'client')
      setLoading(false)
    }
  }

  useEffect(() => {
    // getSession() handles the initial load
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      resolveRole(s?.user ?? null)
    })

    // onAuthStateChange handles login / logout / token refresh events
    // Skip INITIAL_SESSION because getSession() already handles that
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === 'INITIAL_SESSION') return
      setSession(s)
      setUser(s?.user ?? null)
      setRole(null)  // Reset immediately so ProtectedRoute waits
      resolveRole(s?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return { error: error.message, needsConfirmation: false }
    const needsConfirmation = !data.session
    return { error: null, needsConfirmation }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <Ctx.Provider value={{ user, session, role, loading, signIn, signUp, signOut }}>
      {children}
    </Ctx.Provider>
  )
}

export const useAuth = () => useContext(Ctx)
