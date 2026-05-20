import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'icon'
  loading?: boolean
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, asChild, children, disabled, ...props }, ref) => {
    const Component = asChild ? Slot : 'button'
    const isDisabled = disabled || loading
    return (
      <Component
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md border font-medium transition-colors disabled:pointer-events-none disabled:opacity-55',
          size === 'sm' && 'h-8 px-3 text-sm',
          size === 'md' && 'h-10 px-4 text-sm',
          size === 'icon' && 'h-10 w-10 p-0',
          variant === 'primary' && 'border-primary bg-primary text-primary-foreground hover:bg-teal-700',
          variant === 'secondary' && 'border-border bg-card text-foreground hover:bg-muted',
          variant === 'ghost' && 'border-transparent bg-transparent text-foreground hover:bg-muted',
          variant === 'danger' && 'border-danger bg-danger text-white hover:bg-red-700',
          className,
        )}
        aria-disabled={asChild && isDisabled ? true : undefined}
        disabled={!asChild ? isDisabled : undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
            {children}
          </>
        )}
      </Component>
    )
  },
)

Button.displayName = 'Button'
