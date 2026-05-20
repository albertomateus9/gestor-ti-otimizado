import { supabase } from '@/lib/supabase'
import { ensureSupabaseConfigured, throwIfError } from '@/services/supabaseQuery'
import { normalizeProfile } from '@/services/normalize'
import type { UserProfile } from '@/types'

export const authService = {
  async signIn(email: string, password: string) {
    ensureSupabaseConfigured()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    throwIfError(error)
  },

  async signOut() {
    await supabase.auth.signOut()
  },

  async requestPasswordReset(email: string) {
    ensureSupabaseConfigured()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/atualizar-senha`,
    })
    throwIfError(error)
  },

  async updatePassword(password: string) {
    ensureSupabaseConfigured()
    const { error } = await supabase.auth.updateUser({ password })
    throwIfError(error)
  },

  async getCurrentProfile(): Promise<UserProfile | null> {
    ensureSupabaseConfigured()
    const { data: sessionData } = await supabase.auth.getSession()
    const user = sessionData.session?.user
    if (!user) return null

    const [{ data: profile }, { data: roles }] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
      supabase.from('user_roles').select('*').eq('user_id', user.id),
    ])

    const role = Array.isArray(roles) ? String(roles[0]?.role || roles[0]?.funcao || '') : ''
    return normalizeProfile(
      {
        id: user.id,
        email: user.email,
        ...(profile || {}),
      },
      role,
    )
  },
}
