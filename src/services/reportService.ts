import { computerService } from '@/services/computerService'
import { maintenanceService } from '@/services/maintenanceService'
import { partService } from '@/services/partService'
import { ticketService } from '@/services/ticketService'
import type { ReportType } from '@/types'

export const reportService = {
  async get(type: ReportType) {
    if (type === 'computadores') return computerService.list()
    if (type === 'chamados') return ticketService.list()
    if (type === 'manutencoes') return maintenanceService.list()
    return partService.list()
  },
}
