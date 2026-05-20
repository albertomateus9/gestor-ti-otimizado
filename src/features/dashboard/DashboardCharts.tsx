import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { DashboardStats } from '@/types'

const colors = ['#0f9f8f', '#2563eb', '#f59e0b', '#dc2626', '#64748b']

export function DashboardCharts({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="h-80 rounded-lg border border-border bg-white p-4">
        <h2 className="mb-4 text-sm font-semibold">Chamados por status</h2>
        <div className="h-64 min-h-64 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <PieChart>
              <Pie data={stats.ticketsPorStatus} dataKey="value" nameKey="name" outerRadius={95} label>
                {stats.ticketsPorStatus.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="h-80 rounded-lg border border-border bg-white p-4">
        <h2 className="mb-4 text-sm font-semibold">Computadores por status</h2>
        <div className="h-64 min-h-64 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={stats.computadoresPorStatus}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#0f9f8f" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
