import { mockPhases } from '../data/mockData'
import { formatDate, getPhaseStatusColor } from '../utils/projectHelpers'
import { Calendar, CheckCircle2, Clock, XCircle } from 'lucide-react'

interface ProjectTimelineProps {
  projectId: string
}

export const ProjectTimeline = ({ projectId }: ProjectTimelineProps) => {
  const projectPhases = mockPhases
    .filter(phase => phase.projectId === projectId)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

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

  const calculatePhaseWidth = () => {
    if (projectPhases.length === 0) return []
    
    const allDates = projectPhases.flatMap(p => [
      new Date(p.startDate).getTime(),
      new Date(p.endDate).getTime()
    ])
    const minDate = Math.min(...allDates)
    const maxDate = Math.max(...allDates)
    const totalDuration = maxDate - minDate

    return projectPhases.map(phase => {
      const start = new Date(phase.startDate).getTime()
      const end = new Date(phase.endDate).getTime()
      const duration = end - start
      const offset = start - minDate

      return {
        width: (duration / totalDuration) * 100,
        left: (offset / totalDuration) * 100
      }
    })
  }

  const phaseWidths = calculatePhaseWidth()

  const stats = {
    total: projectPhases.length,
    completed: projectPhases.filter(p => p.status === 'completed').length,
    inProgress: projectPhases.filter(p => p.status === 'active').length,
    pending: projectPhases.filter(p => p.status === 'pending').length,
  }

  return (
    <div className="space-y-6">
      {/* Header con Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Timeline del Proyecto
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            {stats.total} fases: {stats.completed} completadas, {stats.inProgress} en progreso, {stats.pending} pendientes
          </p>
        </div>
      </div>

      {projectPhases.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600">No hay fases definidas para este proyecto</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Gantt Chart Visual */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-6">Vista Gantt</h4>
            <div className="space-y-4">
              {projectPhases.map((phase, index) => {
                const width = phaseWidths[index]
                return (
                  <div key={phase.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${getPhaseStatusColor(phase.status)}`}>
                          {getStatusIcon(phase.status)}
                          {phase.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {phase.progress}%
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                      </span>
                    </div>
                    <div className="relative h-8 bg-slate-100 rounded-lg overflow-hidden">
                      <div
                        className={`absolute h-full ${
                          phase.status === 'completed' ? 'bg-green-500' :
                          phase.status === 'active' ? 'bg-blue-500' :
                          'bg-slate-400'
                        } transition-all duration-500`}
                        style={{ 
                          left: `${width.left}%`, 
                          width: `${width.width}%`
                        }}
                      >
                        <div 
                          className="h-full bg-slate-900 bg-opacity-10"
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Lista Detallada de Fases */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
              Detalle de Fases
            </h4>
            <div className="space-y-3">
              {projectPhases.map(phase => {
                const duration = Math.ceil(
                  (new Date(phase.endDate).getTime() - new Date(phase.startDate).getTime()) / 
                  (1000 * 60 * 60 * 24)
                )
                
                return (
                  <div 
                    key={phase.id}
                    className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h5 className="text-sm font-semibold text-slate-900">{phase.name}</h5>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getPhaseStatusColor(phase.status)}`}>
                            {getStatusIcon(phase.status)}
                            {phase.status === 'completed' ? 'Completada' :
                             phase.status === 'active' ? 'En Progreso' :
                             'Pendiente'}
                          </span>
                        </div>
                        {phase.description && (
                          <p className="text-xs text-slate-600 mb-3">{phase.description}</p>
                        )}
                      </div>
                      
                      <div className="ml-4 text-right">
                        <div className="text-sm font-bold text-blue-600 mb-1">{phase.progress}%</div>
                        <div className="w-20 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${phase.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Inicio</p>
                        <p className="text-sm font-medium text-slate-900">{formatDate(phase.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Fin</p>
                        <p className="text-sm font-medium text-slate-900">{formatDate(phase.endDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Duración</p>
                        <p className="text-sm font-medium text-slate-900">{duration} días</p>
                      </div>
                    </div>

                    {phase.deliverables && phase.deliverables.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <p className="text-xs font-medium text-slate-700 mb-2">Entregables:</p>
                        <ul className="text-xs text-slate-600 space-y-1">
                          {phase.deliverables.map((deliverable, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-600 mt-0.5">•</span>
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
