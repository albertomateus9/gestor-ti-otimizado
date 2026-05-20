import { Suspense, lazy, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Select } from '@/components/ui/Form'
import { PageHeader } from '@/components/ui/PageHeader'
import { ErrorState, LoadingState } from '@/components/ui/State'
import { reportService } from '@/services/reportService'
import { dashboardService } from '@/services/dashboardService'
import type { ReportType } from '@/types'

const DashboardCharts = lazy(() => import('@/features/dashboard/DashboardCharts').then((module) => ({ default: module.DashboardCharts })))

const labels: Record<ReportType, string> = {
  computadores: 'Computadores',
  chamados: 'Chamados',
  manutencoes: 'Manutenções',
  pecas: 'Peças',
}

export function ReportsPage() {
  const [type, setType] = useState<ReportType>('computadores')
  const report = useQuery({ queryKey: ['relatorio', type], queryFn: () => reportService.get(type) })
  const dashboard = useQuery({ queryKey: ['dashboard'], queryFn: dashboardService.getStats })
  const total = useMemo(() => (Array.isArray(report.data) ? report.data.length : 0), [report.data])

  return (
    <section>
      <PageHeader title="Relatórios" description="Relatórios usando as mesmas consultas normalizadas do dashboard." />
      <div className="grid gap-5 xl:grid-cols-[22rem_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Tipo de relatório</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select aria-label="Tipo de relatório" value={type} onChange={(event) => setType(event.target.value as ReportType)}>
              {Object.entries(labels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm text-muted-foreground">Registros encontrados</p>
              <p className="mt-1 text-3xl font-semibold">{report.isLoading ? '...' : total}</p>
            </div>
            {report.isError ? <ErrorState message={report.error.message} onRetry={() => void report.refetch()} /> : null}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Indicadores consolidados</CardTitle>
          </CardHeader>
          <CardContent>
            {dashboard.isLoading ? <LoadingState /> : null}
            {dashboard.isError ? <ErrorState message={dashboard.error.message} onRetry={() => void dashboard.refetch()} /> : null}
            {dashboard.data ? (
              <Suspense fallback={<LoadingState label="Carregando gráficos" />}>
                <DashboardCharts stats={dashboard.data} />
              </Suspense>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
