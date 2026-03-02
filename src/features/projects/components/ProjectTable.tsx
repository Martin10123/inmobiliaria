import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import {
  Calendar,
  TrendingUp,
  CheckCircle2,
  Clock,
  PauseCircle,
  XCircle,
  Edit,
  Eye,
  MoreVertical,
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
import { DataTable } from '@/components/ui/data-table'

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

  const handleRowClick = (project: Project) => {
    navigate(`/projects/${project.id}`)
  }

  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Proyecto',
        cell: ({ row }) => (
          <div>
            <p className="text-sm font-medium text-slate-900">{row.original.name}</p>
            <p className="text-xs text-slate-500">{row.original.code}</p>
          </div>
        ),
      },
      {
        accessorKey: 'type',
        header: 'Tipo',
        cell: ({ row }) => (
          <span className="text-xs text-slate-700">{getTypeLabel(row.original.type)}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }) => (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
              row.original.status
            )}`}
          >
            {getStatusIcon(row.original.status)}
            {getStatusLabel(row.original.status)}
          </span>
        ),
      },
      {
        accessorKey: 'progress',
        header: 'Progreso',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-25">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${row.original.progress}%` }}
              />
            </div>
            <span className="text-xs text-slate-700 font-medium">{row.original.progress}%</span>
          </div>
        ),
      },
      {
        accessorKey: 'priority',
        header: 'Prioridad',
        cell: ({ row }) => (
          <span className={`text-xs font-medium ${getPriorityColor(row.original.priority)}`}>
            {getPriorityLabel(row.original.priority)}
          </span>
        ),
      },
      {
        accessorKey: 'managerName',
        header: 'Responsable',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              <span className="text-xs font-medium text-slate-700">
                {getInitials(row.original.managerName)}
              </span>
            </div>
            <span className="text-xs text-slate-700">{row.original.managerName}</span>
          </div>
        ),
      },
      {
        accessorKey: 'budget',
        header: 'Presupuesto',
        cell: ({ row }) => (
          <div>
            <p className="text-xs font-medium text-slate-900">
              ${row.original.budget.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">
              Gastado: ${row.original.currentCost.toLocaleString()}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'plannedEndDate',
        header: 'Fechas',
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(row.original.plannedEndDate).toLocaleDateString('es-ES')}</span>
          </div>
        ),
      },
      {
        id: 'actions',
        header: () => <div className="text-center">Acciones</div>,
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRowClick(row.original)
              }}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
              title="Ver detalles"
            >
              <Eye className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(row.original)
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
        ),
      },
    ],
    [navigate, onEdit]
  )

  return (
    <DataTable
      columns={columns}
      data={projects}
      pageSize={10}
      onRowClick={handleRowClick}
      emptyMessage="No se encontraron proyectos. Intenta ajustar los filtros de búsqueda."
    />
  )
}

