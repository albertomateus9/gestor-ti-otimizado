import { supabase } from '@/lib/supabase'
import { normalizeMaintenance } from '@/services/normalize'
import { asArray, ensureSupabaseConfigured, throwIfError } from '@/services/supabaseQuery'
import type { Maintenance } from '@/types'

export const maintenanceService = {
  async list(): Promise<Maintenance[]> {
    ensureSupabaseConfigured()
    const { data, error } = await supabase.from('manutencoes').select('*').order('data', { ascending: false })
    throwIfError(error)
    return asArray(data as Record<string, unknown>[]).map(normalizeMaintenance)
  },
}
