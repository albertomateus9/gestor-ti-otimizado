import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  from: vi.fn(),
}))

vi.mock('@/lib/env', () => ({
  hasSupabaseEnv: true,
}))

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: mocks.from,
  },
}))

describe('computerService', () => {
  beforeEach(() => {
    mocks.from.mockReset()
    mocks.from.mockImplementation((table: string) => {
      if (table === 'computadores') {
        return {
          select: () => ({
            order: () =>
              Promise.resolve({
                data: [{ id: 'pc-1', patrimonio: 'PC-001', nome: 'Lab 1', status: 'Ativo' }],
                error: null,
              }),
          }),
        }
      }

      return {
        select: () => ({
          in: () => ({
            order: () =>
              Promise.resolve({
                data: [{ computador: 'pc-1', data: '2026-05-20' }],
                error: null,
              }),
          }),
        }),
      }
    })
  })

  it('lista computadores mesmo quando a função é chamada sem contexto this', async () => {
    const { computerService } = await import('@/services/computerService')
    const detachedList = computerService.list

    await expect(detachedList()).resolves.toMatchObject([
      {
        id: 'pc-1',
        ultimaManutencao: '2026-05-20',
      },
    ])
  })
})
