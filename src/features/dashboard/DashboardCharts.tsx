import { type ReactNode, useEffect, useRef, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts'
import type { DashboardStats } from '@/types'

const colors = ['#0f9f8f', '#2563eb', '#f59e0b', '#dc2626', '#64748b']
const chartHeight = 256

function ChartFrame({ children }: { children: (width: number) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const updateWidth = () => {
      setWidth(Math.max(1, Math.floor(element.getBoundingClientRect().width)))
    }

    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="h-64 min-h-64 w-full min-w-0">
      {width > 1 ? children(width) : null}
    </div>
  )
}

export function DashboardCharts({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid min-w-0 gap-5 lg:grid-cols-2">
      <div className="h-80 min-w-0 rounded-lg border border-border bg-white p-4">
        <h2 className="mb-4 text-sm font-semibold">Chamados por status</h2>
        <ChartFrame>
          {(width) => (
            <PieChart width={width} height={chartHeight}>
              <Pie data={stats.ticketsPorStatus} dataKey="value" nameKey="name" outerRadius={95} label>
                {stats.ticketsPorStatus.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ChartFrame>
      </div>
      <div className="h-80 min-w-0 rounded-lg border border-border bg-white p-4">
        <h2 className="mb-4 text-sm font-semibold">Computadores por status</h2>
        <ChartFrame>
          {(width) => (
            <BarChart width={width} height={chartHeight} data={stats.computadoresPorStatus}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#0f9f8f" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ChartFrame>
      </div>
    </div>
  )
}
