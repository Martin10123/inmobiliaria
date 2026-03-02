import { useState } from 'react'
import { MainLayout } from '@/layout/MainLayout'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Project, ProjectStatus, ProjectType, Priority } from '@/types'
import { ProjectFormModal } from './components/ProjectFormModal'
import { ProjectStats } from './components/ProjectStats'
import { ProjectFilters } from './components/ProjectFilters'
import { ProjectTable } from './components/ProjectTable'
import { mockProjects } from './data/mockProjects'

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
            <h1 className="text-2xl font-bold text-slate-900">Proyectos</h1>
            <p className="text-sm text-slate-600 mt-1">Gestiona todos los proyectos de la empresa</p>
          </div>
          <Button onClick={handleCreateProject} className="gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Proyecto
          </Button>
        </div>

        {/* Stats */}
        <ProjectStats stats={stats} />

        {/* Filters */}
        <ProjectFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />

        {/* Projects Table */}
        <ProjectTable projects={filteredProjects} onEdit={handleEditProject} />
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
