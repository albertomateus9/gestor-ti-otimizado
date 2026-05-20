import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Badge, statusTone } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { PageHeader } from '@/components/ui/PageHeader'
import { ErrorState, LoadingState } from '@/components/ui/State'
import { formatDate } from '@/lib/utils'
import { ticketService } from '@/services/ticketService'
import type { Ticket } from '@/types'

const columns: Column<Ticket>[] = [
  { key: 'titulo', header: 'Chamado', cell: (row) => <span className="font-medium">{row.titulo}</span>, searchable: (row) => `${row.titulo} ${row.descricao || ''}` },
  { key: 'categoria', header: 'Categoria', cell: (row) => row.categoria || 'Não informada', searchable: (row) => row.categoria || '' },
  { key: 'prioridade', header: 'Prioridade', cell: (row) => row.prioridade || 'Normal', searchable: (row) => row.prioridade || '' },
  { key: 'status', header: 'Status', cell: (row) => <Badge className={statusTone(row.status)}>{row.status}</Badge>, searchable: (row) => row.status },
  { key: 'solicitante', header: 'Solicitante', cell: (row) => row.solicitante || 'Não informado', searchable: (row) => row.solicitante || '' },
  { key: 'createdAt', header: 'Abertura', cell: (row) => formatDate(row.createdAt) },
]

export function TicketsPage({ mine = false }: { mine?: boolean }) {
  const query = useQuery({ queryKey: ['chamados', mine], queryFn: () => ticketService.list(mine) })

  return (
    <section>
      <PageHeader
        title={mine ? 'Meus chamados' : 'Chamados'}
        description="Acompanhamento dos chamados com busca e paginação."
        actions={
          <Button asChild>
            <Link to="/chamados/novo">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Novo chamado
            </Link>
          </Button>
        }
      />
      <Card>
        <CardContent>
          {query.isLoading ? <LoadingState /> : null}
          {query.isError ? <ErrorState message={query.error.message} onRetry={() => void query.refetch()} /> : null}
          {query.data ? <DataTable rows={query.data} columns={columns} searchLabel="Buscar chamado" /> : null}
        </CardContent>
      </Card>
    </section>
  )
}
