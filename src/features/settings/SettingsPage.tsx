import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { PageHeader } from '@/components/ui/PageHeader'
import { ErrorState, LoadingState } from '@/components/ui/State'
import { formatDate } from '@/lib/utils'
import { adminService, type AccessLog } from '@/services/adminService'
import { useAuth } from '@/features/auth/AuthProvider'

const columns: Column<AccessLog>[] = [
  { key: 'created_at', header: 'Data', cell: (row) => formatDate(row.created_at), searchable: (row) => row.created_at || '' },
  { key: 'user_id', header: 'Usuário', cell: (row) => row.user_id || 'Não informado', searchable: (row) => row.user_id || '' },
  { key: 'action', header: 'Ação', cell: (row) => row.action || 'Acesso', searchable: (row) => row.action || '' },
]

export function SettingsPage() {
  const { profile } = useAuth()
  const isAdmin = profile?.role === 'admin'
  const query = useQuery({ queryKey: ['access_logs'], queryFn: adminService.listAccessLogs, enabled: isAdmin })

  return (
    <section>
      <PageHeader title="Configurações" description="Área administrativa com leitura segura de registros de acesso." />
      <div className="grid gap-5 lg:grid-cols-[22rem_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Perfil atual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Nome:</span> {profile?.nome}</p>
            <p><span className="text-muted-foreground">E-mail:</span> {profile?.email || 'Não informado'}</p>
            <p><span className="text-muted-foreground">Função:</span> <span className="capitalize">{profile?.role}</span></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Logs de acesso</CardTitle>
          </CardHeader>
          <CardContent>
            {!isAdmin ? <p className="text-sm text-muted-foreground">Somente administradores visualizam logs.</p> : null}
            {query.isLoading ? <LoadingState /> : null}
            {query.isError ? <ErrorState message={query.error.message} onRetry={() => void query.refetch()} /> : null}
            {query.data ? <DataTable rows={query.data} columns={columns} searchLabel="Buscar log" /> : null}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
