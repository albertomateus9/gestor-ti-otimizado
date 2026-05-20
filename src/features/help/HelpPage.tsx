import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'

const items = [
  ['Dashboard', 'Acompanhe computadores, chamados, manutenções e estoque com dados consolidados.'],
  ['Computadores', 'Use busca e paginação para localizar equipamentos e conferir a última manutenção.'],
  ['Chamados', 'Registre novas solicitações e acompanhe status sem sair do painel.'],
  ['Relatórios', 'Compare totais com o dashboard usando a mesma fonte de dados normalizada.'],
]

export function HelpPage() {
  return (
    <section>
      <PageHeader title="Ajuda" description="Referência rápida para os fluxos principais do Gestor TI." />
      <div className="grid gap-4 md:grid-cols-2">
        {items.map(([title, description]) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
