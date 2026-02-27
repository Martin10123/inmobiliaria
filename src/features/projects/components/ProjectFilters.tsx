import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { ProjectStatus, ProjectType, Priority } from '@/types'

interface ProjectFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  statusFilter: ProjectStatus | 'all'
  setStatusFilter: (value: ProjectStatus | 'all') => void
  typeFilter: ProjectType | 'all'
  setTypeFilter: (value: ProjectType | 'all') => void
  priorityFilter: Priority | 'all'
  setPriorityFilter: (value: Priority | 'all') => void
}

export const ProjectFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  priorityFilter,
  setPriorityFilter,
}: ProjectFiltersProps) => {
  const selectClass = "h-11 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | 'all')}
          className={selectClass}
        >
          <option value="all">Todos los estados</option>
          <option value="planning">Planeación</option>
          <option value="in-progress">En Curso</option>
          <option value="paused">Pausado</option>
          <option value="completed">Completado</option>
          <option value="cancelled">Cancelado</option>
        </select>

        <select 
          value={typeFilter} 
          onChange={(e) => setTypeFilter(e.target.value as ProjectType | 'all')}
          className={selectClass}
        >
          <option value="all">Todos los tipos</option>
          <option value="construction">Construcción</option>
          <option value="remodeling">Remodelación</option>
          <option value="urbanization">Urbanización</option>
          <option value="other">Otro</option>
        </select>

        <select 
          value={priorityFilter} 
          onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
          className={selectClass}
        >
          <option value="all">Todas las prioridades</option>
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
      </div>
    </div>
  )
}
