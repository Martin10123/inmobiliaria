import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MainLayout } from '@/layout/MainLayout'
import { 
  ArrowLeft, 
  Edit,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  FileText,
  Activity,
  ListTodo,
  Folder,
  History,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockProjects } from './data/mockProjects'
import { ProjectOverview } from './components/ProjectOverview'
import { TaskList } from './components/TaskList'
import { EventsTimeline } from './components/EventsTimeline'
import { DocumentsList } from './components/DocumentsList'
import { TeamSection } from './components/TeamSection'
import { ProjectTimeline } from './components/ProjectTimeline'
import { 
  getStatusLabel, 
  getStatusColor,
  getInitials 
} from './utils/projectHelpers'

type TabType = 'overview' | 'tasks' | 'timeline' | 'documents' | 'team' | 'events'

export const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const project = mockProjects.find(p => p.id === id)

  if (!project) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-slate-600">Proyecto no encontrado</p>
        </div>
      </MainLayout>
    )
  }

  const tabs = [
    { id: 'overview', label: 'General', icon: <Folder className="w-4 h-4" /> },
    { id: 'tasks', label: 'Tareas', icon: <ListTodo className="w-4 h-4" /> },
    { id: 'timeline', label: 'Cronograma', icon: <Calendar className="w-4 h-4" /> },
    { id: 'documents', label: 'Documentos', icon: <FileText className="w-4 h-4" /> },
    { id: 'team', label: 'Equipo', icon: <Users className="w-4 h-4" /> },
    { id: 'events', label: 'Historial', icon: <History className="w-4 h-4" /> },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/projects')}
              className="mt-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {getStatusLabel(project.status)}
                </span>
              </div>
              <p className="text-slate-600">{project.code} • {project.description}</p>
            </div>
          </div>
          <Button className="gap-2">
            <Edit className="w-4 h-4" />
            Editar Proyecto
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-600 mb-1">
              <Activity className="w-4 h-4" />
              <span className="text-sm">Progreso</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{project.progress}%</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-600 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Presupuesto</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">${(project.budget / 1000000).toFixed(1)}M</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Fin Planificado</span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {new Date(project.plannedEndDate).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-600 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">Gerente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                <span className="text-xs font-medium">{getInitials(project.managerName)}</span>
              </div>
              <p className="text-sm font-medium text-slate-900">{project.managerName}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="border-b border-slate-200">
            <div className="flex overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 font-medium'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.icon}
                  {tab.label}  
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && <ProjectOverview project={project} />}
            {activeTab === 'tasks' && <TaskList projectId={project.id} />}
            {activeTab === 'timeline' && <ProjectTimeline projectId={project.id} />}
            {activeTab === 'documents' && <DocumentsList projectId={project.id} />}
            {activeTab === 'team' && <TeamSection projectId={project.id} />}
            {activeTab === 'events' && <EventsTimeline projectId={project.id} />}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
