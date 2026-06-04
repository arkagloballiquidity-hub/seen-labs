import { createContext, useContext, useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

type Role = 'admin' | 'client' | null

interface AuthCtx {
  user: User | null
  session: Session | null
  role: Role
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const Ctx = createContext<AuthCtx>({} as AuthCtx)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]       = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [role, setRole]       = useState<Role>(null)
  const [loading, setLoading] = useState(true)

  async function resolveRole(u: User | null) {
    if (!u) { setRole(null); return }
    const { data } = await supabase
      .from('team_members')
      .select('id')
      .eq('email', u.email)
      .maybeSingle()
    setRole(data ? 'admin' : 'client')
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      resolveRole(s?.user ?? null).finally(() => setLoading(false))
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      resolveRole(s?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return <Ctx.Provider value={{ user, session, role, loading, signIn, signOut }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)
