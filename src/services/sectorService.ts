import { supabase } from '@/lib/supabase'
import { normalizeSector } from '@/services/normalize'
import { asArray, ensureSupabaseConfigured, throwIfError } from '@/services/supabaseQuery'
import type { Sector } from '@/types'

export const sectorService = {
  async list(): Promise<Sector[]> {
    ensureSupabaseConfigured()
    const { data, error } = await supabase.from('setores').select('*').order('nome', { ascending: true })
    throwIfError(error)
    return asArray(data as Record<string, unknown>[]).map(normalizeSector)
  },
}
