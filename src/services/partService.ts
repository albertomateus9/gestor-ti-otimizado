import { supabase } from '@/lib/supabase'
import { normalizePart } from '@/services/normalize'
import { asArray, ensureSupabaseConfigured, throwIfError } from '@/services/supabaseQuery'
import type { Part } from '@/types'

export const partService = {
  async list(): Promise<Part[]> {
    ensureSupabaseConfigured()
    const { data, error } = await supabase.from('pecas').select('*').order('nome', { ascending: true })
    throwIfError(error)
    return asArray(data as Record<string, unknown>[]).map(normalizePart)
  },
}
