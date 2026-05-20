import { lazy, Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Boxes, ClipboardList, Laptop, ShieldCheck, Wrench } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { ErrorState, LoadingState } from '@/components/ui/State'
import { dashboardService } from '@/services/dashboardService'

const DashboardCharts = lazy(() => import('./DashboardCharts').then((module) => ({ default: module.DashboardCharts })))

export function DashboardPage() {
  const query = useQuery({ queryKey: ['dashboard'], queryFn: dashboardService.getStats })

  return (
    <section>
      <PageHeader title="Dashboard" description="Visão operacional com os mesmos dados normalizados usados nos relatórios." />
      {query.isLoading ? <LoadingState /> : null}
      {query.isError ? <ErrorState message={query.error.message} onRetry={() => void query.refetch()} /> : null}
      {query.data ? (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Computadores" value={query.data.totalComputadores} icon={Laptop} />
            <StatCard label="Ativos" value={query.data.computadoresAtivos} icon={ShieldCheck} tone="text-success" />
            <StatCard label="Chamados abertos" value={query.data.chamadosAbertos} icon={ClipboardList} tone="text-warning" />
            <StatCard label="Manutenções pendentes" value={query.data.manutencoesPendentes} icon={Wrench} tone="text-accent" />
            <StatCard label="Peças baixo estoque" value={query.data.pecasBaixoEstoque} icon={Boxes} tone="text-danger" />
          </div>
          <Suspense fallback={<LoadingState label="Carregando gráficos" />}>
            <DashboardCharts stats={query.data} />
          </Suspense>
        </div>
      ) : null}
    </section>
  )
}
