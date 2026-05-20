import { AlertCircle, Inbox, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function LoadingState({ label = 'Carregando dados' }: { label?: string }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-2 text-center">
      <Inbox className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">
      <AlertCircle className="h-8 w-8 text-danger" aria-hidden="true" />
      <p className="max-w-lg text-sm text-muted-foreground">{message}</p>
      {onRetry ? <Button variant="secondary" onClick={onRetry}>Tentar novamente</Button> : null}
    </div>
  )
}
