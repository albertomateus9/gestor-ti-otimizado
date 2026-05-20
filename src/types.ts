export type AppRole = 'admin' | 'tecnico' | 'usuario'

export type UserProfile = {
  id: string
  nome: string
  email: string
  avatarUrl?: string | null
  role: AppRole
  setorId?: string | null
}

export type UserRole = {
  id: string
  userId: string
  role: AppRole
}

export type Sector = {
  id: string
  nome: string
  responsavel?: string | null
}

export type Computer = {
  id: string
  patrimonio: string
  nome: string
  setor?: string | null
  status: string
  marca?: string | null
  modelo?: string | null
  processador?: string | null
  memoria?: string | null
  armazenamento?: string | null
  sistema?: string | null
  ultimaManutencao?: string | null
}

export type Ticket = {
  id: string
  titulo: string
  descricao?: string | null
  status: string
  prioridade?: string | null
  categoria?: string | null
  solicitante?: string | null
  tecnico?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

export type Maintenance = {
  id: string
  computadorId?: string | null
  computador?: string | null
  tipo?: string | null
  descricao?: string | null
  responsavel?: string | null
  status?: string | null
  data?: string | null
}

export type Part = {
  id: string
  nome: string
  categoria?: string | null
  quantidade: number
  minimo?: number | null
  localizacao?: string | null
}

export type DashboardStats = {
  totalComputadores: number
  computadoresAtivos: number
  chamadosAbertos: number
  manutencoesPendentes: number
  pecasBaixoEstoque: number
  ticketsPorStatus: Array<{ name: string; value: number }>
  computadoresPorStatus: Array<{ name: string; value: number }>
}

export type ReportType = 'computadores' | 'chamados' | 'manutencoes' | 'pecas'

export type TableState<T> = {
  rows: T[]
  total: number
}
