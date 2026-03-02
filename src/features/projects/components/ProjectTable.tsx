import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  TrendingUp,
  CheckCircle2,
  Clock,
  PauseCircle,
  XCircle,
  MoreVertical,
  Edit,
  Eye,
  AlertCircle,
} from 'lucide-react'
import type { Project } from '@/types'
import {
  getStatusColor,
  getStatusLabel,
  getTypeLabel,
  getPriorityColor,
  getPriorityLabel,
  getInitials,
} from '../utils/projectHelpers'

interface ProjectTableProps {
  projects: Project[]
  onEdit: (project: Project) => void
}

export const ProjectTable = ({ projects, onEdit }: ProjectTableProps) => {
  const navigate = useNavigate()

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return <Clock className="w-4 h-4" />
      case 'in-progress':
        return <TrendingUp className="w-4 h-4" />
      case 'paused':
        return <PauseCircle className="w-4 h-4" />
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
    }
  }

  const handleRowClick = (projectId: string) => {
    navigate(`/projects/${projectId}`)
  }

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <p className="text-sm text-slate-600 font-medium">No se encontraron proyectos</p>
        <p className="text-xs text-slate-500">Intenta ajustar los filtros de búsqueda</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Proyecto
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Tipo
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Estado
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Progreso
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Prioridad
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Responsable
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Presupuesto
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Fechas
              </th>
              <th className="text-center px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {projects.map((project) => (
              <tr 
                key={project.id} 
                className="hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => handleRowClick(project.id)}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{project.name}</p>
                    <p className="text-xs text-slate-500">{project.code}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-slate-700">{getTypeLabel(project.type)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    {getStatusLabel(project.status)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-25">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-700 font-medium">{project.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {getPriorityLabel(project.priority)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                      <span className="text-xs font-medium text-slate-700">
                        {getInitials(project.managerName)}
                      </span>
                    </div>
                    <span className="text-xs text-slate-700">{project.managerName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-xs font-medium text-slate-900">
                      ${project.budget.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500">
                      Gastado: ${project.currentCost.toLocaleString()}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.plannedEndDate).toLocaleDateString('es-ES')}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRowClick(project.id)
                      }}
                      className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit(project)
                      }}
                      className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4 text-slate-600" />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Más opciones"
                    >
                      <MoreVertical className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
