import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(value?: string | null) {
  if (!value) return 'Sem data'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Sem data'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function countBy<T>(items: T[], getKey: (item: T) => string | null | undefined) {
  const counts = new Map<string, number>()
  for (const item of items) {
    const key = getKey(item) || 'Não informado'
    counts.set(key, (counts.get(key) || 0) + 1)
  }
  return Array.from(counts, ([name, value]) => ({ name, value }))
}

export function normalizeStatus(value?: string | null) {
  return (value || 'Não informado').split('_').join(' ')
}
