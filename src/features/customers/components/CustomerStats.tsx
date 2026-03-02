import { Users, UserCheck, AlertTriangle, UserX, DollarSign, Star } from 'lucide-react'
import { formatCurrency } from '../utils/customerHelpers'

interface CustomerStatsProps {
  stats: {
    total: number
    active: number
    atRisk: number
    inactive: number
    totalRevenue: number
    avgSatisfaction: number
  }
}

export const CustomerStats = ({ stats }: CustomerStatsProps) => {
  const cards = [
    {
      title: 'Total Clientes',
      value: stats.total,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Activos',
      value: stats.active,
      icon: UserCheck,
      color: 'bg-green-50 text-green-600',
      bgColor: 'bg-green-500',
    },
    {
      title: 'En Riesgo',
      value: stats.atRisk,
      icon: AlertTriangle,
      color: 'bg-orange-50 text-orange-600',
      bgColor: 'bg-orange-500',
    },
    {
      title: 'Inactivos',
      value: stats.inactive,
      icon: UserX,
      color: 'bg-slate-50 text-slate-600',
      bgColor: 'bg-slate-500',
    },
    {
      title: 'Revenue Total',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'bg-purple-50 text-purple-600',
      bgColor: 'bg-purple-500',
      isSmallText: true,
    },
    {
      title: 'Satisfacción Promedio',
      value: `${stats.avgSatisfaction}%`,
      icon: Star,
      color: 'bg-yellow-50 text-yellow-600',
      bgColor: 'bg-yellow-500',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div key={index} className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-slate-600 mb-1">{card.title}</p>
            <p className={`font-bold text-slate-900 ${card.isSmallText ? 'text-sm' : 'text-2xl'}`}>
              {card.value}
            </p>
          </div>
        )
      })}
    </div>
  )
}
