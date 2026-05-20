import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { LoginPage } from '@/features/auth/LoginPage'
import { UpdatePasswordPage } from '@/features/auth/UpdatePasswordPage'
import { ProtectedRoute } from '@/features/auth/ProtectedRoute'
import { AppShell } from '@/layout/AppShell'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { ComputersPage } from '@/features/inventory/ComputersPage'
import { MaintenancePage } from '@/features/maintenance/MaintenancePage'
import { TicketsPage } from '@/features/tickets/TicketsPage'
import { NewTicketPage } from '@/features/tickets/NewTicketPage'
import { PartsPage } from '@/features/parts/PartsPage'
import { ReportsPage } from '@/features/reports/ReportsPage'
import { SettingsPage } from '@/features/settings/SettingsPage'
import { HelpPage } from '@/features/help/HelpPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/atualizar-senha" element={<UpdatePasswordPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppShell />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/computadores" element={<ComputersPage />} />
                <Route path="/manutencao" element={<MaintenancePage />} />
                <Route path="/chamados" element={<TicketsPage />} />
                <Route path="/chamados/novo" element={<NewTicketPage />} />
                <Route path="/meus-chamados" element={<TicketsPage mine />} />
                <Route path="/novo-chamado" element={<NewTicketPage />} />
                <Route path="/pecas" element={<PartsPage />} />
                <Route path="/relatorios" element={<ReportsPage />} />
                <Route path="/configuracoes" element={<SettingsPage />} />
                <Route path="/ajuda" element={<HelpPage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
