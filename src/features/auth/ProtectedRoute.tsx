import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LoadingState } from '@/components/ui/State'
import { hasSupabaseEnv } from '@/lib/env'
import { useAuth } from '@/features/auth/AuthProvider'

export function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuth()

  if (!hasSupabaseEnv) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (isLoading) {
    return <LoadingState label="Verificando sessão" />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
