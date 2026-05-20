import type { AppRole, Computer, Maintenance, Part, Sector, Ticket, UserProfile } from '@/types'

type Row = Record<string, unknown>

const text = (row: Row, keys: string[], fallback = '') =>
  keys.map((key) => row[key]).find((value) => typeof value === 'string' && value.trim()) as string | undefined || fallback

const nullableText = (row: Row, keys: string[]) => text(row, keys) || null

export const normalizeRole = (role?: string | null): AppRole => {
  const value = (role || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  if (value.includes('admin')) return 'admin'
  if (value.includes('tecn')) return 'tecnico'
  return 'usuario'
}

export function normalizeProfile(row: Row, role?: string | null): UserProfile {
  return {
    id: String(row.id || row.user_id || ''),
    nome: text(row, ['nome', 'name', 'full_name'], 'Usuário'),
    email: text(row, ['email'], ''),
    avatarUrl: nullableText(row, ['avatar_url']),
    setorId: nullableText(row, ['setor_id', 'sector_id']),
    role: normalizeRole(role || text(row, ['role', 'funcao'])),
  }
}

export function normalizeSector(row: Row): Sector {
  return {
    id: String(row.id || ''),
    nome: text(row, ['nome', 'name'], 'Setor sem nome'),
    responsavel: nullableText(row, ['responsavel', 'manager']),
  }
}

export function normalizeComputer(row: Row, lastMaintenance?: string | null): Computer {
  return {
    id: String(row.id || ''),
    patrimonio: text(row, ['patrimonio', 'asset_tag', 'tombo'], 'Sem patrimônio'),
    nome: text(row, ['nome', 'name', 'hostname'], 'Computador'),
    setor: nullableText(row, ['setor', 'setor_nome', 'sector']),
    status: text(row, ['status'], 'Não informado'),
    marca: nullableText(row, ['marca', 'brand']),
    modelo: nullableText(row, ['modelo', 'model']),
    processador: nullableText(row, ['processador', 'cpu']),
    memoria: nullableText(row, ['memoria', 'ram']),
    armazenamento: nullableText(row, ['armazenamento', 'storage']),
    sistema: nullableText(row, ['sistema', 'sistema_operacional', 'os']),
    ultimaManutencao: lastMaintenance || nullableText(row, ['ultima_manutencao', 'last_maintenance']),
  }
}

export function normalizeTicket(row: Row): Ticket {
  return {
    id: String(row.id || ''),
    titulo: text(row, ['titulo', 'title', 'assunto'], 'Chamado'),
    descricao: nullableText(row, ['descricao', 'description']),
    status: text(row, ['status'], 'aberto'),
    prioridade: nullableText(row, ['prioridade', 'priority']),
    categoria: nullableText(row, ['categoria', 'category']),
    solicitante: nullableText(row, ['solicitante', 'solicitante_nome', 'user_name']),
    tecnico: nullableText(row, ['tecnico', 'tecnico_nome', 'assigned_to']),
    createdAt: nullableText(row, ['created_at', 'criado_em']),
    updatedAt: nullableText(row, ['updated_at', 'atualizado_em']),
  }
}

export function normalizeMaintenance(row: Row): Maintenance {
  return {
    id: String(row.id || ''),
    computadorId: nullableText(row, ['computador_id', 'computador']),
    computador: nullableText(row, ['computador_nome', 'computador', 'hostname']),
    tipo: nullableText(row, ['tipo', 'type']),
    descricao: nullableText(row, ['descricao', 'description']),
    responsavel: nullableText(row, ['responsavel', 'tecnico']),
    status: nullableText(row, ['status']),
    data: nullableText(row, ['data', 'created_at']),
  }
}

export function normalizePart(row: Row): Part {
  const quantidade = Number(row.quantidade ?? row.quantity ?? 0)
  const minimo = row.minimo ?? row.minimum
  return {
    id: String(row.id || ''),
    nome: text(row, ['nome', 'name'], 'Peça'),
    categoria: nullableText(row, ['categoria', 'category']),
    quantidade: Number.isFinite(quantidade) ? quantidade : 0,
    minimo: minimo === undefined || minimo === null ? null : Number(minimo),
    localizacao: nullableText(row, ['localizacao', 'location']),
  }
}
