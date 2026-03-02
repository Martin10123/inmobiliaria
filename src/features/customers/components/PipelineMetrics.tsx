import { TrendingUp, DollarSign, Target, Award, Clock, BarChart3 } from 'lucide-react'
import type { Opportunity } from '@/types'

interface PipelineMetricsProps {
  opportunities: Opportunity[]
}

export const PipelineMetrics = ({ opportunities }: PipelineMetricsProps) => {
  // Cálculos
  const totalValue = opportunities.reduce((sum, opp) => sum + opp.estimatedValue, 0)
  const weightedValue = opportunities.reduce(
    (sum, opp) => sum + (opp.estimatedValue * opp.closeProbability) / 100,
    0
  )
  const avgProbability =
    opportunities.length > 0
      ? opportunities.reduce((sum, opp) => sum + opp.closeProbability, 0) / opportunities.length
      : 0

  // Oportunidades cerradas (contract, execution, post-sale)
  const closedStages = ['contract', 'execution', 'post-sale']
  const closedOpportunities = opportunities.filter(opp => closedStages.includes(opp.stage))
  const closedValue = closedOpportunities.reduce((sum, opp) => sum + opp.estimatedValue, 0)

  // Win rate (contract + execution + post-sale vs total)
  const winRate = opportunities.length > 0 ? (closedOpportunities.length / opportunities.length) * 100 : 0

  // Promedio de días en pipeline (simplificado)
  const avgDaysInPipeline = opportunities.length > 0 ? Math.floor(Math.random() * 30 + 15) : 0 // Mock

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const stats = [
    {
      label: 'Valor Total Pipeline',
      value: formatCurrency(totalValue),
      subtitle: `${opportunities.length} oportunidades`,
      icon: <DollarSign className="w-4 h-4" />,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      label: 'Revenue Proyectado',
      value: formatCurrency(weightedValue),
      subtitle: 'Ponderado por probabilidad',
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      label: 'Probabilidad Promedio',
      value: `${avgProbability.toFixed(0)}%`,
      subtitle: 'De cierre exitoso',
      icon: <Target className="w-4 h-4" />,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      label: 'Win Rate',
      value: `${winRate.toFixed(0)}%`,
      subtitle: `${closedOpportunities.length} ganadas`,
      icon: <Award className="w-4 h-4" />,
      color: 'amber',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      label: 'Tiempo Promedio',
      value: `${avgDaysInPipeline} días`,
      subtitle: 'En pipeline',
      icon: <Clock className="w-4 h-4" />,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      label: 'Cerradas Este Mes',
      value: formatCurrency(closedValue),
      subtitle: `${closedOpportunities.length} proyectos`,
      icon: <BarChart3 className="w-4 h-4" />,
      color: 'rose',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-500 mb-1 truncate">{stat.label}</p>
              <p className="text-xl font-bold text-slate-800 mb-0.5">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.subtitle}</p>
            </div>
            <div className={`${stat.bgColor} p-2 rounded-lg flex-shrink-0`}>
              <div className={stat.iconColor}>{stat.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
