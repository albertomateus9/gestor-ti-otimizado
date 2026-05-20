import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Field, Input, Select, Textarea } from '@/components/ui/Form'
import { PageHeader } from '@/components/ui/PageHeader'
import { ticketService } from '@/services/ticketService'

export function NewTicketPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    categoria: 'Suporte',
    prioridade: 'Normal',
  })

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    try {
      await ticketService.create(form)
      toast.success('Chamado criado.')
      navigate('/chamados')
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : 'Não foi possível criar o chamado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <PageHeader title="Novo chamado" description="Registre uma solicitação para a equipe de TI." />
      <Card className="max-w-3xl">
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Field label="Título" htmlFor="titulo">
              <Input id="titulo" value={form.titulo} onChange={(event) => setForm((value) => ({ ...value, titulo: event.target.value }))} required />
            </Field>
            <Field label="Categoria" htmlFor="categoria">
              <Select id="categoria" value={form.categoria} onChange={(event) => setForm((value) => ({ ...value, categoria: event.target.value }))}>
                <option>Suporte</option>
                <option>Hardware</option>
                <option>Software</option>
                <option>Rede</option>
              </Select>
            </Field>
            <Field label="Prioridade" htmlFor="prioridade">
              <Select id="prioridade" value={form.prioridade} onChange={(event) => setForm((value) => ({ ...value, prioridade: event.target.value }))}>
                <option>Baixa</option>
                <option>Normal</option>
                <option>Alta</option>
                <option>Crítica</option>
              </Select>
            </Field>
            <Field label="Descrição" htmlFor="descricao">
              <Textarea id="descricao" value={form.descricao} onChange={(event) => setForm((value) => ({ ...value, descricao: event.target.value }))} required />
            </Field>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => navigate('/chamados')}>
                Cancelar
              </Button>
              <Button type="submit" loading={loading}>
                Criar chamado
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
