import { FormEvent, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AlertCircle, Laptop } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Field, Input } from '@/components/ui/Form'
import { hasSupabaseEnv } from '@/lib/env'
import { authService } from '@/services/authService'
import { useAuth } from '@/features/auth/AuthProvider'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, refreshProfile } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/dashboard'

  if (isAuthenticated) return <Navigate to={from} replace />

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authService.signIn(email, password)
      await refreshProfile()
      navigate(from, { replace: true })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível entrar.')
    } finally {
      setLoading(false)
    }
  }

  async function onResetPassword() {
    if (!email) {
      setError('Informe o e-mail para enviar a recuperação de senha.')
      return
    }
    try {
      await authService.requestPasswordReset(email)
      setError('Enviamos as instruções de recuperação para o e-mail informado.')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível solicitar recuperação.')
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-6 p-8">
          <div className="space-y-2 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Laptop className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-semibold">Gestor TI</h1>
            <p className="text-sm text-muted-foreground">Acesse o painel de suporte e patrimônio.</p>
          </div>
          {!hasSupabaseEnv ? (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              Configure as variáveis Supabase para habilitar o login.
            </div>
          ) : null}
          {error ? (
            <div className="flex gap-2 rounded-md border border-border bg-muted p-3 text-sm text-muted-foreground" role="status">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          ) : null}
          <form className="space-y-4" onSubmit={onSubmit}>
            <Field label="E-mail" htmlFor="email">
              <Input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </Field>
            <Field label="Senha" htmlFor="password">
              <Input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </Field>
            <Button className="w-full" type="submit" loading={loading}>
              Entrar
            </Button>
          </form>
          <Button className="w-full" variant="ghost" type="button" onClick={onResetPassword}>
            Recuperar senha
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
