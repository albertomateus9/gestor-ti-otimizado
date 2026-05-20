import { supabase } from '@/lib/supabase'
import { normalizeTicket } from '@/services/normalize'
import { asArray, ensureSupabaseConfigured, throwIfError } from '@/services/supabaseQuery'
import type { Ticket } from '@/types'

type NewTicketInput = {
  titulo: string
  descricao: string
  categoria: string
  prioridade: string
}

export const ticketService = {
  async list(mine = false): Promise<Ticket[]> {
    ensureSupabaseConfigured()
    let query = supabase.from('chamados').select('*').order('created_at', { ascending: false })
    if (mine) {
      const { data } = await supabase.auth.getUser()
      if (data.user) query = query.eq('user_id', data.user.id)
    }
    const { data, error } = await query
    throwIfError(error)
    return asArray(data as Record<string, unknown>[]).map(normalizeTicket)
  },

  async create(input: NewTicketInput) {
    ensureSupabaseConfigured()
    const { data: userData } = await supabase.auth.getUser()
    const { error } = await supabase.from('chamados').insert({
      titulo: input.titulo,
      descricao: input.descricao,
      categoria: input.categoria,
      prioridade: input.prioridade,
      status: 'aberto',
      user_id: userData.user?.id,
    })
    throwIfError(error)
  },
}
