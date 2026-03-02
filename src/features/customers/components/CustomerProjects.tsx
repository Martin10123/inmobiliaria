import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Eye, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Customer, ProjectStatus } from '@/types'
import { formatCurrency, formatDate } from '../utils/customerHelpers'
import { mockProjects } from '@/features/projects/data/mockProjects'

interface CustomerProjectsProps {
  customer: Customer
}

export const CustomerProjects = ({ customer }: CustomerProjectsProps) => {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all')
  const selectClass = "h-11 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
  
  // Filtrar proyectos del cliente
  const customerProjectsList = mockProjects.filter(p => 
    p.clientIds.includes(customer.id)
  )
  
  const filteredProjects = statusFilter === 'all' 
    ? customerProjectsList
    : customerProjectsList.filter(p => p.status === statusFilter)

  // Estadísticas
  const stats = {
    total: customerProjectsList.length,
    active: customerProjectsList.filter(p => p.status === 'in-progress').length,
    completed: customerProjectsList.filter(p => p.status === 'completed').length,
    totalBudget: customerProjectsList.reduce((sum, p) => sum + p.budget, 0),
    totalRevenue: customerProjectsList.reduce((sum, p) => sum + p.projectedRevenue, 0),
  }

  const getStatusLabel = (status: ProjectStatus): string => {
    const labels: Record<ProjectStatus, string> = {
      'planning': 'Planificación',
      'in-progress': 'En Progreso',
      'paused': 'Pausado',
      'completed': 'Completado',
      'cancelled': 'Cancelado'
    }
    return labels[status]
  }

  const getStatusColor = (status: ProjectStatus): string => {
    const colors: Record<ProjectStatus, string> = {
      'planning': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      'paused': 'bg-slate-100 text-slate-800 border-slate-200',
      'completed': 'bg-green-100 text-green-800 border-green-200',
      'cancelled': 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[status]
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-500 mb-1">Total Proyectos</p>
          <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-500 mb-1">Activos</p>
          <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-500 mb-1">Completados</p>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-500 mb-1">Presupuesto Total</p>
          <p className="text-lg font-bold text-purple-600">{formatCurrency(stats.totalBudget)}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-500 mb-1">Revenue Total</p>
          <p className="text-lg font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
        </div>
      </div>

      {/* Filtros y Acciones */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | 'all')}
            className={selectClass}
          >
            <option value="all">Todos los estados</option>
            <option value="planning">Planificación</option>
            <option value="in-progress">En Progreso</option>
            <option value="completed">Completado</option>
            <option value="paused">Pausado</option>
            <option value="cancelled">Cancelado</option>
          </select>
          <span className="text-sm text-slate-600">
            Mostrando {filteredProjects.length} de {stats.total} proyectos
          </span>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Proyecto
        </Button>
      </div>

      {/* Lista de Proyectos */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
          <p className="text-slate-600">No hay proyectos para mostrar</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                  Proyecto
                </th>
                <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                  Estado
                </th>
                <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                  Fechas
                </th>
                <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                  Progreso
                </th>
                <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                  Presupuesto
                </th>
                <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                  Revenue
                </th>
                <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                  Rentabilidad
                </th>
                <th className="text-center text-xs font-semibold text-slate-700 px-4 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProjects.map((project) => {
                const budgetUsage = (project.currentCost / project.budget) * 100
                const profitability = project.projectedRevenue - project.currentCost
                const profitabilityPercentage = ((profitability / project.projectedRevenue) * 100).toFixed(1)
                
                return (
                  <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-900">{project.name}</p>
                      <p className="text-xs text-slate-500">{project.code}</p>
                    </td>
                    
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </td>
                    
                    <td className="px-4 py-3">
                      <p className="text-xs text-slate-700">
                        {formatDate(project.plannedStartDate)}
                      </p>
                      <p className="text-xs text-slate-500">
                        → {formatDate(project.plannedEndDate)}
                      </p>
                    </td>
                    
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-20">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-900">
                          {project.progress}%
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-900">
                        {formatCurrency(project.budget)}
                      </p>
                      <p className={`text-xs ${budgetUsage > 100 ? 'text-red-600' : 'text-slate-500'}`}>
                        Usado: {budgetUsage.toFixed(0)}%
                      </p>
                    </td>
                    
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-green-600">
                        {formatCurrency(project.projectedRevenue)}
                      </p>
                    </td>
                    
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {profitability > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${profitability > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {profitabilityPercentage}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {formatCurrency(Math.abs(profitability))}
                      </p>
                    </td>
                    
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/projects/${project.id}`)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Gráfico de Rentabilidad (Simplificado) */}
      {filteredProjects.length > 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            <DollarSign className="w-5 h-5 inline mr-2" />
            Rentabilidad por Proyecto
          </h3>
          <div className="space-y-3">
            {filteredProjects.map((project) => {
              const profitability = project.projectedRevenue - project.currentCost
              const maxValue = Math.max(...filteredProjects.map(p => p.projectedRevenue - p.currentCost))
              const barWidth = (Math.abs(profitability) / maxValue) * 100
              
              return (
                <div key={project.id}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-slate-900">{project.name}</p>
                    <p className={`text-sm font-bold ${profitability >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(profitability)}
                    </p>
                  </div>
                  <div className="bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${profitability >= 0 ? 'bg-green-600' : 'bg-red-600'}`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
