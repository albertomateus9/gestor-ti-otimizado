import { supabase } from '@/lib/supabase'
import { normalizeComputer } from '@/services/normalize'
import { asArray, ensureSupabaseConfigured, throwIfError } from '@/services/supabaseQuery'
import type { Computer } from '@/types'

type Row = Record<string, unknown>

async function getLastMaintenanceByComputer(computerIds: string[]) {
  const latest = new Map<string, string>()
  if (!computerIds.length) return latest

  const { data, error } = await supabase
    .from('manutencoes')
    .select('computador, data, created_at')
    .in('computador', computerIds)
    .order('data', { ascending: false })

  throwIfError(error)
  for (const row of asArray(data as Row[])) {
    const id = String(row.computador || '')
    const date = String(row.data || row.created_at || '')
    if (id && date && !latest.has(id)) latest.set(id, date)
  }
  return latest
}

export const computerService = {
  list: async (): Promise<Computer[]> => {
    ensureSupabaseConfigured()
    const { data, error } = await supabase.from('computadores').select('*').order('nome', { ascending: true })
    throwIfError(error)
    const rows = asArray(data as Row[])
    const ids = rows.map((row) => String(row.id)).filter(Boolean)
    const lastMaintenance = await getLastMaintenanceByComputer(ids)
    return rows.map((row) => normalizeComputer(row, lastMaintenance.get(String(row.id))))
  },

  getLastMaintenanceByComputer,
}
