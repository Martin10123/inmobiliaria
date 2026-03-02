import { useState } from 'react'
import { Plus, CheckCircle2, Clock, XCircle, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockTasks } from '../data/mockTasks'
import { 
  getTaskStatusLabel, 
  getTaskStatusColor, 
  getPriorityLabel,
  getPriorityColor,
  formatDate,
  isOverdue 
} from '../utils/projectHelpers'

interface TaskListProps {
  projectId: string
}

export const TaskList = ({ projectId }: TaskListProps) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')
  
  const projectTasks = mockTasks.filter(task => task.projectId === projectId)
  const filteredTasks = filter === 'all' 
    ? projectTasks 
    : projectTasks.filter(task => task.status === filter)

  const stats = {
    total: projectTasks.length,
    pending: projectTasks.filter(t => t.status === 'pending').length,
    inProgress: projectTasks.filter(t => t.status === 'in-progress').length,
    completed: projectTasks.filter(t => t.status === 'completed').length,
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />
      case 'in-progress':
        return <Clock className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header con Stats */}
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900">{stats.total}</p>
            <p className="text-sm text-slate-600">Total</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-600">{stats.pending}</p>
            <p className="text-sm text-slate-600">Pendientes</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-blue-600">{stats.inProgress}</p>
            <p className="text-sm text-slate-600">En Progreso</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">{stats.completed}</p>
            <p className="text-sm text-slate-600">Completadas</p>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nueva Tarea
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'pending' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilter('in-progress')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'in-progress' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          En Progreso
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'completed' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Completadas
        </button>
      </div>

      {/* Lista de Tareas */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg">
            <p className="text-slate-600">No hay tareas para mostrar</p>
          </div>
        ) : (
          filteredTasks.map(task => {
            const overdue = isOverdue(task.dueDate, task.status)
            
            return (
              <div 
                key={task.id} 
                className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-slate-900">{task.title}</h4>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                        {getTaskStatusLabel(task.status)}
                      </span>
                      <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {getPriorityLabel(task.priority)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{task.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        <span>{task.assignedToName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span className={overdue ? 'text-red-600 font-medium' : ''}>
                          {formatDate(task.dueDate)}
                          {overdue && ' (Vencida)'}
                        </span>
                      </div>
                      {task.estimatedHours && (
                        <span>~{task.estimatedHours}h estimadas</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-4 text-right">
                    <div className="text-lg font-bold text-blue-600 mb-1">{task.progress}%</div>
                    <div className="w-20 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {task.dependencies && task.dependencies.length > 0 && (
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-500">
                      Depende de: {task.dependencies.length} tarea{task.dependencies.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
