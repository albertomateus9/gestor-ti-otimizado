import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renderiza asChild com um único filho sem quebrar o Slot', () => {
    render(
      <Button asChild>
        <a href="/chamados/novo">Novo chamado</a>
      </Button>,
    )

    expect(screen.getByRole('link', { name: 'Novo chamado' })).toHaveAttribute('href', '/chamados/novo')
  })

  it('mantém loading no botão nativo', () => {
    render(<Button loading>Entrar</Button>)

    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled()
  })
})
