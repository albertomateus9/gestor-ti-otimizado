import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Field, Input } from '@/components/ui/Form'
import { authService } from '@/services/authService'

export function UpdatePasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    try {
      await authService.updatePassword(password)
      toast.success('Senha atualizada.')
      navigate('/dashboard', { replace: true })
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : 'Não foi possível atualizar a senha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-5 p-8">
          <h1 className="text-2xl font-semibold">Definir nova senha</h1>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Field label="Nova senha" htmlFor="new-password">
              <Input id="new-password" type="password" autoComplete="new-password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required />
            </Field>
            <Button className="w-full" type="submit" loading={loading}>
              Atualizar senha
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
