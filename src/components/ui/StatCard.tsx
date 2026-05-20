import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

export function StatCard({ label, value, icon: Icon, tone = 'text-primary' }: { label: string; value: number | string; icon: LucideIcon; tone?: string }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
        <div className="rounded-md bg-muted p-3">
          <Icon className={`h-5 w-5 ${tone}`} aria-hidden="true" />
        </div>
      </CardContent>
    </Card>
  )
}
