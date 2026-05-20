import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { BarChart3, Boxes, ClipboardList, HelpCircle, Home, Laptop, LogOut, Menu, Settings, Wrench, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { authService } from '@/services/authService'
import { useAuth } from '@/features/auth/AuthProvider'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/computadores', label: 'Computadores', icon: Laptop },
  { to: '/manutencao', label: 'Manutenção', icon: Wrench },
  { to: '/chamados', label: 'Chamados', icon: ClipboardList },
  { to: '/pecas', label: 'Peças', icon: Boxes },
  { to: '/relatorios', label: 'Relatórios', icon: BarChart3 },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
  { to: '/ajuda', label: 'Ajuda', icon: HelpCircle },
]

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { profile } = useAuth()
  return (
    <aside className="flex h-full flex-col border-r border-border bg-white">
      <Link to="/dashboard" className="flex h-16 items-center gap-3 px-5" onClick={onNavigate}>
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Laptop className="h-5 w-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-semibold">Gestor TI</span>
          <span className="block text-xs text-muted-foreground">EETEPA SIGITE</span>
        </span>
      </Link>
      <nav className="flex-1 space-y-1 px-3 py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                isActive && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
              )
            }
          >
            <item.icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-border p-4 text-sm">
        <p className="font-medium">{profile?.nome || 'Usuário'}</p>
        <p className="capitalize text-muted-foreground">{profile?.role || 'perfil'}</p>
      </div>
    </aside>
  )
}

export function AppShell() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  async function signOut() {
    await authService.signOut()
    window.location.assign('/login')
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[17rem_1fr]">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-slate-950/45" aria-label="Fechar menu" onClick={() => setOpen(false)} />
          <div className="relative h-full w-72 max-w-[85vw]">
            <Sidebar onNavigate={() => setOpen(false)} />
            <Button className="absolute right-3 top-3" size="icon" variant="secondary" aria-label="Fechar menu" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      ) : null}
      <main className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white/90 px-4 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <Button size="icon" variant="secondary" className="lg:hidden" aria-label="Abrir menu" onClick={() => setOpen(true)}>
              <Menu className="h-4 w-4" aria-hidden="true" />
            </Button>
            <span className="text-sm font-medium text-muted-foreground">{navItems.find((item) => location.pathname.startsWith(item.to))?.label || 'Gestor TI'}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sair
          </Button>
        </header>
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
