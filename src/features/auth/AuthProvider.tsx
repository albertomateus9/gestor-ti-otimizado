import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { hasSupabaseEnv } from '@/lib/env'
import { authService } from '@/services/authService'
import type { UserProfile } from '@/types'

type AuthState = {
  profile: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshProfile = useCallback(async () => {
    if (!hasSupabaseEnv) {
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    try {
      setProfile(await authService.getCurrentProfile())
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void refreshProfile()
    const { data } = supabase.auth.onAuthStateChange(() => {
      void refreshProfile()
    })
    return () => data.subscription.unsubscribe()
  }, [refreshProfile])

  const value = useMemo(
    () => ({
      profile,
      isLoading,
      isAuthenticated: Boolean(profile),
      refreshProfile,
    }),
    [isLoading, profile, refreshProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}
