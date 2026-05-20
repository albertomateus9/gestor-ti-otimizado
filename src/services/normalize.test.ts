import { describe, expect, it } from 'vitest'
import { normalizeComputer, normalizePart, normalizeRole } from '@/services/normalize'

describe('normalizers', () => {
  it('normaliza papéis conhecidos', () => {
    expect(normalizeRole('Admin')).toBe('admin')
    expect(normalizeRole('Técnico')).toBe('tecnico')
    expect(normalizeRole(undefined)).toBe('usuario')
  })

  it('normaliza computadores com última manutenção em lote', () => {
    expect(normalizeComputer({ id: '1', patrimonio: 'PC-01', status: 'ativo' }, '2026-05-20').ultimaManutencao).toBe('2026-05-20')
  })

  it('normaliza estoque numérico', () => {
    expect(normalizePart({ id: 'p1', nome: 'SSD', quantidade: '3', minimo: '5' })).toMatchObject({
      quantidade: 3,
      minimo: 5,
    })
  })
})
