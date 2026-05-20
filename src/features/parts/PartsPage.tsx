import { useQuery } from '@tanstack/react-query'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { PageHeader } from '@/components/ui/PageHeader'
import { ErrorState, LoadingState } from '@/components/ui/State'
import { partService } from '@/services/partService'
import type { Part } from '@/types'

const columns: Column<Part>[] = [
  { key: 'nome', header: 'Peça', cell: (row) => <span className="font-medium">{row.nome}</span>, searchable: (row) => row.nome },
  { key: 'categoria', header: 'Categoria', cell: (row) => row.categoria || 'Não informada', searchable: (row) => row.categoria || '' },
  { key: 'quantidade', header: 'Quantidade', cell: (row) => row.quantidade },
  { key: 'minimo', header: 'Mínimo', cell: (row) => row.minimo ?? 'Não informado' },
  { key: 'status', header: 'Status', cell: (row) => row.minimo !== null && row.quantidade <= Number(row.minimo) ? <Badge className="bg-red-50 text-red-700 ring-red-200">Baixo estoque</Badge> : <Badge className="bg-emerald-50 text-emerald-700 ring-emerald-200">OK</Badge> },
  { key: 'localizacao', header: 'Localização', cell: (row) => row.localizacao || 'Não informada', searchable: (row) => row.localizacao || '' },
]

export function PartsPage() {
  const query = useQuery({ queryKey: ['pecas'], queryFn: () => partService.list() })
  return (
    <section>
      <PageHeader title="Peças" description="Controle de estoque de peças e suprimentos." />
      <Card>
        <CardContent>
          {query.isLoading ? <LoadingState /> : null}
          {query.isError ? <ErrorState message={query.error.message} onRetry={() => void query.refetch()} /> : null}
          {query.data ? <DataTable rows={query.data} columns={columns} searchLabel="Buscar peça" /> : null}
        </CardContent>
      </Card>
    </section>
  )
}
