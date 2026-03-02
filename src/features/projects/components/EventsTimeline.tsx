import { mockEvents } from '../data/mockEvents'
import { getEventTypeLabel, getEventTypeColor, formatDate } from '../utils/projectHelpers'
import { Activity, FileText, Users, AlertCircle, CheckCircle2, Settings } from 'lucide-react'

interface EventsTimelineProps {
  projectId: string
}

export const EventsTimeline = ({ projectId }: EventsTimelineProps) => {
  const projectEvents = mockEvents
    .filter(event => event.projectId === projectId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'project_created':
        return <CheckCircle2 className="w-5 h-5" />
      case 'project_status_changed':
        return <Settings className="w-5 h-5" />
      case 'task_completed':
        return <CheckCircle2 className="w-5 h-5" />
      case 'document_uploaded':
        return <FileText className="w-5 h-5" />
      case 'team_member_added':
        return <Users className="w-5 h-5" />
      case 'budget_exceeded':
        return <AlertCircle className="w-5 h-5" />
      default:
        return <Activity className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">
          Línea de Tiempo del Proyecto ({projectEvents.length} eventos)
        </h3>
      </div>

      {projectEvents.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg">
          <Activity className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600">No hay eventos registrados</p>
        </div>
      ) : (
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />

          {/* Eventos */}
          <div className="space-y-6">
            {projectEvents.map((event, index) => (
              <div key={event.id} className="relative flex gap-4">
                {/* Icono */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white ${getEventTypeColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>

                {/* Contenido */}
                <div className="flex-1 bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(event.type)} mb-2`}>
                        {getEventTypeLabel(event.type)}
                      </span>
                      <h4 className="font-semibold text-slate-900">{event.title}</h4>
                    </div>
                    <span className="text-sm text-slate-500">
                      {formatDate(event.createdAt)}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-3">{event.description}</p>

                  {event.metadata && Object.keys(event.metadata).length > 0 && (
                    <div className="bg-slate-50 rounded-lg p-3 space-y-1">
                      {Object.entries(event.metadata).map(([key, value]) => (
                        <div key={key} className="text-xs text-slate-600 flex gap-2">
                          <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span>
                          <span>{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>Usuario: {event.userId}</span>
                    </div>
                    {index === 0 && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                        Más reciente
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
