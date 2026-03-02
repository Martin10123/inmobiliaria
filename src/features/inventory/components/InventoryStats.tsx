import type { InventoryItem } from '../../../types'
import { formatCurrency, getLowStockItems, getOutOfStockItems } from '../utils/inventoryHelpers'
import { Package, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react'

interface InventoryStatsProps {
  items: InventoryItem[]
}

export default function InventoryStats({ items }: InventoryStatsProps) {
  const totalItems = items.length
  const totalValue = items.reduce((sum, item) => sum + item.totalValue, 0)
  const lowStockItems = getLowStockItems(items)
  const outOfStockItems = getOutOfStockItems(items)

  const stats = [
    {
      label: 'Total Items',
      value: totalItems,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      label: 'Valor Total',
      value: formatCurrency(totalValue),
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      label: 'Stock Bajo',
      value: lowStockItems.length,
      icon: AlertTriangle,
      color: 'bg-yellow-500'
    },
    {
      label: 'Agotados',
      value: outOfStockItems.length,
      icon: TrendingUp,
      color: 'bg-red-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
