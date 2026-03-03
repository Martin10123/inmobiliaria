import { Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
          <Select
            value={selectedCategory}
            onValueChange={(value) => onCategoryChange(value as InventoryCategory | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todas las Categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Categorías</SelectItem>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category}>
                  {getCategoryLabel(category as InventoryCategory)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por Estado */}
        <div>
          <Select
            value={selectedStatus}
            onValueChange={(value) => onStatusChange(value as InventoryStatus | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todos los Estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Estados</SelectItem>
              {statuses.slice(1).map((status) => (
                <SelectItem key={status} value={status}>
                  {getStatusLabel(status as InventoryStatus)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
