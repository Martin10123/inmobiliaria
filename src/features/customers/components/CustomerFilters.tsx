import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as CustomerType | 'all')}>
          <SelectTrigger>
            <SelectValue placeholder="Todos los tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="individual">Persona Natural</SelectItem>
            <SelectItem value="small-business">Pequeña Empresa</SelectItem>
            <SelectItem value="corporate">Corporativo</SelectItem>
            <SelectItem value="government">Gobierno</SelectItem>
          </SelectContent>
        </Select>

        {/* Filtro por Nivel */}
        <Select value={levelFilter} onValueChange={(value) => setLevelFilter(value as CustomerLevel | 'all')}>
          <SelectTrigger>
            <SelectValue placeholder="Todos los niveles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los niveles</SelectItem>
            <SelectItem value="bronze">Bronce</SelectItem>
            <SelectItem value="silver">Plata</SelectItem>
            <SelectItem value="gold">Oro</SelectItem>
            <SelectItem value="platinum">Platino</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
          </SelectContent>
        </Select>

        {/* Filtro por Estado */}
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as CustomerStatus | 'all')}>
          <SelectTrigger>
            <SelectValue placeholder="Todos los estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="active">Activo</SelectItem>
            <SelectItem value="at-risk">En Riesgo</SelectItem>
            <SelectItem value="inactive">Inactivo</SelectItem>
            <SelectItem value="lost">Perdido</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
