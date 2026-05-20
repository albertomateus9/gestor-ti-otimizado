import { countBy, normalizeStatus } from '@/lib/utils'
import { computerService } from '@/services/computerService'
import { maintenanceService } from '@/services/maintenanceService'
import { partService } from '@/services/partService'
import { ticketService } from '@/services/ticketService'
import type { DashboardStats } from '@/types'

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const [computadores, chamados, manutencoes, pecas] = await Promise.all([
      computerService.list(),
      ticketService.list(),
      maintenanceService.list(),
      partService.list(),
    ])

    const openTicket = (status?: string | null) => !['fechado', 'concluido', 'concluído', 'resolvido'].includes((status || '').toLowerCase())
    const pendingMaintenance = (status?: string | null) => !['concluida', 'concluída', 'finalizada'].includes((status || '').toLowerCase())

    return {
      totalComputadores: computadores.length,
      computadoresAtivos: computadores.filter((item) => item.status.toLowerCase().includes('ativo')).length,
      chamadosAbertos: chamados.filter((item) => openTicket(item.status)).length,
      manutencoesPendentes: manutencoes.filter((item) => pendingMaintenance(item.status)).length,
      pecasBaixoEstoque: pecas.filter((item) => item.minimo !== null && item.quantidade <= Number(item.minimo)).length,
      ticketsPorStatus: countBy(chamados, (item) => normalizeStatus(item.status)),
      computadoresPorStatus: countBy(computadores, (item) => normalizeStatus(item.status)),
    }
  },
}
