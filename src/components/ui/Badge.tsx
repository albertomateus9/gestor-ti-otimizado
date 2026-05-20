import { cn } from '@/lib/utils'

export function statusTone(value?: string | null) {
  const status = (value || '').toLowerCase()
  if (status.includes('ativo') || status.includes('conclu') || status.includes('resolvido')) return 'bg-emerald-50 text-emerald-700 ring-emerald-200'
  if (status.includes('pend') || status.includes('aberto') || status.includes('andamento')) return 'bg-amber-50 text-amber-700 ring-amber-200'
  if (status.includes('inativo') || status.includes('cancel') || status.includes('crit')) return 'bg-red-50 text-red-700 ring-red-200'
  return 'bg-slate-100 text-slate-700 ring-slate-200'
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1', className)}>{children}</span>
}
