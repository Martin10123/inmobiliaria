import { useState } from 'react'
import { MainLayout } from '@/layout/MainLayout'
import {
  Plus,
  Search,
  Calendar,
  Briefcase,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  PauseCircle,
  XCircle,
  MoreVertical,
  Edit,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Project, ProjectStatus, ProjectType, Priority } from '@/types'
import { ProjectFormModal } from './components/ProjectFormModal'

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    code: 'PRJ-2026-001',
    name: 'Torre Empresarial Centro',
    description: 'Construcción de torre de oficinas de 15 pisos',
    type: 'construction',
    status: 'in-progress',
    priority: 'high',
    plannedStartDate: '2026-01-15',
    actualStartDate: '2026-01-20',
    plannedEndDate: '2026-12-31',
    progress: 35,
    clientIds: ['1', '2'],
    contractIds: ['1'],
    managerId: '1',
    managerName: 'Carlos Rodríguez',
    budget: 5000000,
    currentCost: 1750000,
    projectedRevenue: 6500000,
    address: 'Calle 50 #25-30',
    city: 'Cartagena',
    createdAt: '2026-01-10',
    updatedAt: '2026-02-25',
  },
  {
    id: '2',
    code: 'PRJ-2026-002',
    name: 'Remodelación Centro Comercial',
    description: 'Modernización de áreas comunes y locales',
    type: 'remodeling',
    status: 'planning',
    priority: 'medium',
    plannedStartDate: '2026-03-01',
    plannedEndDate: '2026-08-31',
    progress: 10,
    clientIds: ['3'],
    contractIds: ['2'],
    managerId: '2',
    managerName: 'Ana María López',
    budget: 2000000,
    currentCost: 200000,
    projectedRevenue: 2800000,
    address: 'Av. Pedro de Heredia',
    city: 'Cartagena',
    createdAt: '2026-02-01',
    updatedAt: '2026-02-20',
  },
  {
    id: '3',
    code: 'PRJ-2025-045',
    name: 'Urbanización Las Palmas',
    description: 'Desarrollo urbanístico de 50 lotes',
    type: 'urbanization',
    status: 'completed',
    priority: 'high',
    plannedStartDate: '2025-01-10',
    actualStartDate: '2025-01-15',
    plannedEndDate: '2025-12-20',
    actualEndDate: '2025-12-18',
    progress: 100,
    clientIds: ['4'],
    contractIds: ['3', '4'],
    managerId: '1',
    managerName: 'Carlos Rodríguez',
    budget: 8000000,
    currentCost: 7800000,
    projectedRevenue: 12000000,
    address: 'Zona Norte',
    city: 'Cartagena',
    createdAt: '2024-12-01',
    updatedAt: '2025-12-20',
  },
  {
    id: '4',
    code: 'PRJ-2026-003',
    name: 'Edificio Residencial Mar Azul',
    description: 'Construcción de apartamentos de lujo',
    type: 'construction',
    status: 'paused',
    priority: 'medium',
    plannedStartDate: '2026-02-01',
    actualStartDate: '2026-02-05',
    plannedEndDate: '2027-02-01',
    progress: 15,
    clientIds: ['5'],
    contractIds: ['5'],
    managerId: '3',
    managerName: 'Miguel Ángel Torres',
    budget: 6500000,
    currentCost: 975000,
    projectedRevenue: 9500000,
    city: 'Cartagena',
    createdAt: '2026-01-20',
    updatedAt: '2026-02-26',
  },
]

export const ProjectsPage = () => {
  const [projects] = useState<Project[]>(mockProjects)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<ProjectType | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  // Filtrar proyectos
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    const matchesType = typeFilter === 'all' || project.type === typeFilter
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  // Estadísticas rápidas
  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    planning: projects.filter(p => p.status === 'planning').length,
    completed: projects.filter(p => p.status === 'completed').length,
  }

  const getStatusIcon = (status: ProjectStatus) => {
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

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-700'
      case 'in-progress':
        return 'bg-green-100 text-green-700'
      case 'paused':
        return 'bg-orange-100 text-orange-700'
      case 'completed':
        return 'bg-gray-100 text-gray-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
    }
  }

  const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
      case 'planning':
        return 'Planeación'
      case 'in-progress':
        return 'En Curso'
      case 'paused':
        return 'Pausado'
      case 'completed':
        return 'Completado'
      case 'cancelled':
        return 'Cancelado'
    }
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-orange-600'
      case 'low':
        return 'text-blue-600'
    }
  }

  const getPriorityLabel = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'Alta'
      case 'medium':
        return 'Media'
      case 'low':
        return 'Baja'
    }
  }

  const getTypeLabel = (type: ProjectType) => {
    switch (type) {
      case 'construction':
        return 'Construcción'
      case 'remodeling':
        return 'Remodelación'
      case 'urbanization':
        return 'Urbanización'
      case 'other':
        return 'Otro'
    }
  }

  const handleCreateProject = () => {
    setEditingProject(null)
    setIsModalOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsModalOpen(true)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Proyectos</h1>
            <p className="text-slate-600 mt-1">Gestiona todos los proyectos de la empresa</p>
          </div>
          <Button onClick={handleCreateProject} className="gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Proyecto
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Briefcase className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                <p className="text-sm text-slate-600">Total Proyectos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.inProgress}</p>
                <p className="text-sm text-slate-600">En Curso</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.planning}</p>
                <p className="text-sm text-slate-600">En Planeación</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.completed}</p>
                <p className="text-sm text-slate-600">Completados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
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
              className="h-11 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
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
              className="h-11 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
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
              className="h-11 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="all">Todas las prioridades</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>
        </div>

        {/* Projects Table */}
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
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{project.name}</p>
                        <p className="text-sm text-slate-500">{project.code}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700">{getTypeLabel(project.type)}</span>
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
                        <span className="text-sm text-slate-700 font-medium">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${getPriorityColor(project.priority)}`}>
                        {getPriorityLabel(project.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-slate-700">
                            {project.managerName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm text-slate-700">{project.managerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          ${project.budget.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">
                          Gastado: ${project.currentCost.toLocaleString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(project.plannedEndDate).toLocaleDateString('es-ES')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4 text-slate-600" />
                        </button>
                        <button
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

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">No se encontraron proyectos</p>
              <p className="text-slate-500 text-sm">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={editingProject}
      />
    </MainLayout>
  )
}
