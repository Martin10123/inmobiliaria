import type { CustomerSegment } from '@/types'
import { segmentDefinitions } from '../utils/segmentationHelpers'
import { formatCurrency } from '../utils/customerHelpers'
import { TrendingUp, Users, DollarSign } from 'lucide-react'

interface SegmentDistributionProps {
  segmentCounts: Record<CustomerSegment, number>
  segmentValues: Record<CustomerSegment, number>
}

export const SegmentDistribution = ({ segmentCounts, segmentValues }: SegmentDistributionProps) => {
  const totalCustomers = Object.values(segmentCounts).reduce((sum, count) => sum + count, 0)
  const totalValue = Object.values(segmentValues).reduce((sum, value) => sum + value, 0)

  // Ordenar segmentos por valor descendente
  const sortedSegments = [...segmentDefinitions].sort(
    (a, b) => segmentValues[b.id] - segmentValues[a.id]
  )

  // Calcular porcentajes
  const getPercentage = (count: number) => {
    return totalCustomers > 0 ? ((count / totalCustomers) * 100).toFixed(1) : '0.0'
  }

  const getValuePercentage = (value: number) => {
    return totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : '0.0'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Distribución por Cantidad */}
      <div className="bg-white rounded-lg border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-slate-800">Distribución por Cantidad</h3>
        </div>

        <div className="space-y-3">
          {sortedSegments.map(segment => {
            const count = segmentCounts[segment.id]
            const percentage = getPercentage(count)

            return (
              <div key={segment.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{segment.name}</span>
                  <span className="text-slate-600">
                    {count} ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div
                    className={`${segment.bgColor.replace('bg-', 'bg-gradient-to-r from-')} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-slate-700">Total</span>
            <span className="text-slate-800">{totalCustomers} clientes</span>
          </div>
        </div>
      </div>

      {/* Distribución por Valor */}
      <div className="bg-white rounded-lg border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-green-50 rounded-lg">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="font-semibold text-slate-800">Distribución por Valor (CLV)</h3>
        </div>

        <div className="space-y-3">
          {sortedSegments.map(segment => {
            const value = segmentValues[segment.id]
            const percentage = getValuePercentage(value)

            return (
              <div key={segment.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{segment.name}</span>
                  <div className="text-right">
                    <div className="text-slate-800 font-semibold">{formatCurrency(value)}</div>
                    <div className="text-xs text-slate-500">{percentage}%</div>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div
                    className={`${segment.bgColor.replace('bg-', 'bg-gradient-to-r from-')} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Total CLV</span>
            <span className="text-lg font-bold text-slate-800">{formatCurrency(totalValue)}</span>
          </div>
        </div>
      </div>

      {/* Insights Rápidos */}
      <div className="lg:col-span-2 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-slate-800">Insights Clave</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/60 rounded-lg p-4 border border-purple-100">
            <p className="text-xs text-slate-600 mb-1">Segmento Dominante</p>
            <p className="text-lg font-bold text-slate-800">
              {sortedSegments[0]?.name || 'N/A'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {formatCurrency(segmentValues[sortedSegments[0]?.id] || 0)} en CLV
            </p>
          </div>

          <div className="bg-white/60 rounded-lg p-4 border border-purple-100">
            <p className="text-xs text-slate-600 mb-1">Clientes de Alto Riesgo</p>
            <p className="text-lg font-bold text-orange-600">
              {segmentCounts['at-risk'] + segmentCounts['hibernating']}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {getPercentage(segmentCounts['at-risk'] + segmentCounts['hibernating'])}% del total
            </p>
          </div>

          <div className="bg-white/60 rounded-lg p-4 border border-purple-100">
            <p className="text-xs text-slate-600 mb-1">Top Performers</p>
            <p className="text-lg font-bold text-emerald-600">
              {segmentCounts['champions'] + segmentCounts['loyal']}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {getPercentage(segmentCounts['champions'] + segmentCounts['loyal'])}% del total
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
