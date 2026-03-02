import { X, Building2, DollarSign, Calendar, User, Target, TrendingUp, AlertCircle, FolderKanban, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Opportunity } from '@/types'
import { useNavigate } from 'react-router-dom'

interface OpportunityModalProps {
  opportunity: Opportunity | null
  onClose: () => void
  onSave: () => void
}

export const OpportunityModal = ({ opportunity, onClose, onSave }: OpportunityModalProps) => {
  const isEditing = !!opportunity
  const navigate = useNavigate()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString))
  }

  const getActionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      meeting: 'Reunión',
      call: 'Llamada',
      email: 'Email',
      presentation: 'Presentación',
      'follow-up': 'Seguimiento',
      other: 'Otro'
    }
    return labels[type] || type
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            {isEditing ? opportunity.name : 'Nueva Oportunidad'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isEditing && opportunity ? (
            <div className="space-y-6">
              {/* Información General */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-4">Información General</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Cliente</span>
                    </div>
                    <p className="text-slate-800 font-semibold ml-6">{opportunity.customerName}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">Responsable</span>
                    </div>
                    <p className="text-slate-800 ml-6">{opportunity.assignedTo.name}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm font-medium">Valor Estimado</span>
                    </div>
                    <p className="text-slate-800 font-semibold ml-6">
                      {formatCurrency(opportunity.estimatedValue)}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <Target className="w-4 h-4" />
                      <span className="text-sm font-medium">Probabilidad de Cierre</span>
                    </div>
                    <p className="text-slate-800 font-semibold ml-6">{opportunity.closeProbability}%</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">Fecha Estimada de Cierre</span>
                    </div>
                    <p className="text-slate-800 ml-6">{formatDate(opportunity.estimatedCloseDate)}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">Fecha de Creación</span>
                    </div>
                    <p className="text-slate-800 ml-6">{formatDate(opportunity.createdDate)}</p>
                  </div>
                </div>
              </div>

              {/* Vínculo a Proyecto (si existe) */}
              {opportunity.projectId && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <FolderKanban className="w-6 h-6 text-green-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-800 mb-1">
                          ✓ Oportunidad convertida en Proyecto
                        </p>
                        <p className="text-xs text-green-700">
                          Esta oportunidad está vinculada a un proyecto activo en ejecución
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/projects/${opportunity.projectId}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      Ver Proyecto
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Descripción */}
              {opportunity.description && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Descripción</h3>
                  <p className="text-slate-600 text-sm bg-slate-50 p-4 rounded-lg">
                    {opportunity.description}
                  </p>
                </div>
              )}

              {/* Análisis Competitivo */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Competidores</h3>
                  <div className="bg-red-50 rounded-lg p-3 space-y-2">
                    {opportunity.competitors.length > 0 ? (
                      opportunity.competitors.map((comp, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-red-700">
                          <AlertCircle className="w-3 h-3" />
                          <span>{comp}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">No hay competidores identificados</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Fortalezas</h3>
                  <div className="bg-green-50 rounded-lg p-3 space-y-2">
                    {opportunity.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-green-700">
                        <TrendingUp className="w-3 h-3" />
                        <span>{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Debilidades</h3>
                  <div className="bg-amber-50 rounded-lg p-3 space-y-2">
                    {opportunity.weaknesses.map((weakness, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-amber-700">
                        <AlertCircle className="w-3 h-3" />
                        <span>{weakness}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Próxima Acción */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Próxima Acción
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-slate-600">Tipo:</span>
                    <p className="text-slate-800">{getActionTypeLabel(opportunity.nextAction.type)}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-600">Fecha:</span>
                    <p className="text-slate-800">{formatDate(opportunity.nextAction.date)}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-600">Responsable:</span>
                    <p className="text-slate-800">{opportunity.nextAction.responsible.name}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm font-medium text-slate-600">Objetivo:</span>
                    <p className="text-slate-800">{opportunity.nextAction.objective}</p>
                  </div>
                </div>
              </div>

              {/* Historial de Cambios */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Historial de Cambios</h3>
                <div className="bg-slate-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <div className="space-y-3">
                    {opportunity.history.map((entry, index) => (
                      <div key={index} className="flex gap-3 pb-3 border-b border-slate-200 last:border-0">
                        <div className="flex-shrink-0 w-24 text-xs text-slate-500">
                          {formatDate(entry.date)}
                        </div>
                        <div className="flex-1 text-sm text-slate-700">{entry.change}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags */}
              {opportunity.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Etiquetas</h3>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-slate-500">
                El formulario de creación de oportunidades se implementará próximamente.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-6 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onSave} disabled={!isEditing}>
            {isEditing ? 'Guardar Cambios' : 'Crear Oportunidad'}
          </Button>
        </div>
      </div>
    </div>
  )
}
