import { Search } from 'lucide-react'
import type { InventoryCategory, InventoryStatus } from '../../../types'
import { getCategoryLabel, getStatusLabel } from '../utils/inventoryHelpers'

interface InventoryFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedCategory: InventoryCategory | 'all'
  onCategoryChange: (value: InventoryCategory | 'all') => void
  selectedStatus: InventoryStatus | 'all'
  onStatusChange: (value: InventoryStatus | 'all') => void
}

export default function InventoryFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange
}: InventoryFiltersProps) {
  const categories: (InventoryCategory | 'all')[] = [
    'all',
    'tools',
    'equipment',
    'materials',
    'supplies',
    'vehicles',
    'electronics',
    'furniture',
    'safety',
    'other'
  ]

  const statuses: (InventoryStatus | 'all')[] = [
    'all',
    'available',
    'in-use',
    'maintenance',
    'damaged',
    'out-of-stock'
  ]

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre o código..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filtro por Categoría */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as InventoryCategory | 'all')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas las Categorías</option>
            {categories.slice(1).map((category) => (
              <option key={category} value={category}>
                {getCategoryLabel(category as InventoryCategory)}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Estado */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as InventoryStatus | 'all')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos los Estados</option>
            {statuses.slice(1).map((status) => (
              <option key={status} value={status}>
                {getStatusLabel(status as InventoryStatus)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
