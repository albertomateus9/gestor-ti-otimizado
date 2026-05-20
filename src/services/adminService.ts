import { supabase } from '@/lib/supabase'
import { asArray, ensureSupabaseConfigured, throwIfError } from '@/services/supabaseQuery'

export type AccessLog = {
  id: string
  user_id?: string | null
  action?: string | null
  created_at?: string | null
}

export const adminService = {
  async listAccessLogs(): Promise<AccessLog[]> {
    ensureSupabaseConfigured()
    const { data, error } = await supabase.from('access_logs').select('*').order('created_at', { ascending: false }).limit(50)
    throwIfError(error)
    return asArray(data as AccessLog[])
  },
}
