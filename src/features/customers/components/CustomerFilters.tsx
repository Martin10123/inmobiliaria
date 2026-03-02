import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { CustomerType, CustomerLevel, CustomerStatus } from '@/types'

interface CustomerFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  typeFilter: CustomerType | 'all'
  setTypeFilter: (value: CustomerType | 'all') => void
  levelFilter: CustomerLevel | 'all'
  setLevelFilter: (value: CustomerLevel | 'all') => void
  statusFilter: CustomerStatus | 'all'
  setStatusFilter: (value: CustomerStatus | 'all') => void
}

export const CustomerFilters = ({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  levelFilter,
  setLevelFilter,
  statusFilter,
  setStatusFilter,
}: CustomerFiltersProps) => {
  const selectClass = "h-11 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filtro por Tipo */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as CustomerType | 'all')}
          className={selectClass}
        >
          <option value="all">Todos los tipos</option>
          <option value="individual">Persona Natural</option>
          <option value="small-business">Pequeña Empresa</option>
          <option value="corporate">Corporativo</option>
          <option value="government">Gobierno</option>
        </select>

        {/* Filtro por Nivel */}
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value as CustomerLevel | 'all')}
          className={selectClass}
        >
          <option value="all">Todos los niveles</option>
          <option value="bronze">Bronce</option>
          <option value="silver">Plata</option>
          <option value="gold">Oro</option>
          <option value="platinum">Platino</option>
          <option value="vip">VIP</option>
        </select>

        {/* Filtro por Estado */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as CustomerStatus | 'all')}
          className={selectClass}
        >
          <option value="all">Todos los estados</option>
          <option value="active">Activo</option>
          <option value="at-risk">En Riesgo</option>
          <option value="inactive">Inactivo</option>
          <option value="lost">Perdido</option>
        </select>
      </div>
    </div>
  )
}
