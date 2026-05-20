import { useQuery } from '@tanstack/react-query'
import { Badge, statusTone } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { PageHeader } from '@/components/ui/PageHeader'
import { ErrorState, LoadingState } from '@/components/ui/State'
import { formatDate } from '@/lib/utils'
import { maintenanceService } from '@/services/maintenanceService'
import type { Maintenance } from '@/types'

const columns: Column<Maintenance>[] = [
  { key: 'data', header: 'Data', cell: (row) => formatDate(row.data), searchable: (row) => row.data || '' },
  { key: 'computador', header: 'Computador', cell: (row) => row.computador || row.computadorId || 'Não informado', searchable: (row) => `${row.computador || ''} ${row.computadorId || ''}` },
  { key: 'tipo', header: 'Tipo', cell: (row) => row.tipo || 'Manutenção', searchable: (row) => row.tipo || '' },
  { key: 'descricao', header: 'Descrição', cell: (row) => row.descricao || 'Sem descrição', searchable: (row) => row.descricao || '' },
  { key: 'responsavel', header: 'Responsável', cell: (row) => row.responsavel || 'Não informado', searchable: (row) => row.responsavel || '' },
  { key: 'status', header: 'Status', cell: (row) => <Badge className={statusTone(row.status)}>{row.status || 'Não informado'}</Badge>, searchable: (row) => row.status || '' },
]

export function MaintenancePage() {
  const query = useQuery({ queryKey: ['manutencoes'], queryFn: maintenanceService.list })

  return (
    <section>
      <PageHeader title="Manutenção" description="Histórico e pendências de manutenção dos equipamentos." />
      <Card>
        <CardContent>
          {query.isLoading ? <LoadingState /> : null}
          {query.isError ? <ErrorState message={query.error.message} onRetry={() => void query.refetch()} /> : null}
          {query.data ? <DataTable rows={query.data} columns={columns} searchLabel="Buscar manutenção" /> : null}
        </CardContent>
      </Card>
    </section>
  )
}
