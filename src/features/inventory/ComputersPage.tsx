import { useQuery } from '@tanstack/react-query'
import { Badge, statusTone } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { PageHeader } from '@/components/ui/PageHeader'
import { ErrorState, LoadingState } from '@/components/ui/State'
import { formatDate } from '@/lib/utils'
import { computerService } from '@/services/computerService'
import type { Computer } from '@/types'

const columns: Column<Computer>[] = [
  { key: 'patrimonio', header: 'Patrimônio', cell: (row) => row.patrimonio, searchable: (row) => `${row.patrimonio} ${row.nome}` },
  { key: 'nome', header: 'Equipamento', cell: (row) => <span className="font-medium">{row.nome}</span>, searchable: (row) => row.nome },
  { key: 'setor', header: 'Setor', cell: (row) => row.setor || 'Não informado', searchable: (row) => row.setor || '' },
  { key: 'status', header: 'Status', cell: (row) => <Badge className={statusTone(row.status)}>{row.status}</Badge>, searchable: (row) => row.status },
  { key: 'config', header: 'Configuração', cell: (row) => [row.processador, row.memoria, row.armazenamento].filter(Boolean).join(' / ') || 'Não informada' },
  { key: 'ultima', header: 'Última manutenção', cell: (row) => formatDate(row.ultimaManutencao) },
]

export function ComputersPage() {
  const query = useQuery({ queryKey: ['computadores'], queryFn: () => computerService.list() })

  return (
    <section>
      <PageHeader title="Computadores" description="Inventário com manutenção mais recente carregada em lote." />
      <Card>
        <CardContent>
          {query.isLoading ? <LoadingState /> : null}
          {query.isError ? <ErrorState message={query.error.message} onRetry={() => void query.refetch()} /> : null}
          {query.data ? <DataTable rows={query.data} columns={columns} searchLabel="Buscar por patrimônio, nome, setor ou status" /> : null}
        </CardContent>
      </Card>
    </section>
  )
}
