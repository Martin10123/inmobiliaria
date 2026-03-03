import type { ApprovalLevel } from '@/types'
import {
  getApprovalStatusLabel,
  getApprovalStatusColor,
  formatDateTime
} from '../utils/requestHelpers'
import { Check, X, Clock, GitBranchPlus, GitCommit } from 'lucide-react'

interface ApprovalFlowProps {
  approvalFlow: ApprovalLevel[]
  currentLevel: number
}

export default function ApprovalFlow({ approvalFlow, currentLevel }: ApprovalFlowProps) {
  const approvalMode = approvalFlow[0]?.mode || 'dependent'
  
  const getProgressPercentage = () => {
    const completed = approvalFlow.filter(l => l.status === 'approved').length
    return (completed / approvalFlow.length) * 100
  }

  const getStatusIcon = (status: ApprovalLevel['status']) => {
    switch (status) {
      case 'approved':
        return <Check className="w-5 h-5 text-green-600" />
      case 'rejected':
        return <X className="w-5 h-5 text-red-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
    }
  }

  return (
    <div>
      {/* Modo de Aprobación */}
      <div className="mb-4 p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center gap-3">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            {approvalMode === 'independent' ? (
              <GitBranchPlus className="w-5 h-5 text-purple-600" />
            ) : (
              <GitCommit className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-bold text-gray-900">
                Modo de Aprobación:
              </h4>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                approvalMode === 'independent' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-blue-600 text-white'
              }`}>
                {approvalMode === 'independent' ? 'Independiente' : 'Dependiente'}
              </span>
            </div>
            <p className="text-xs text-gray-600">
              {approvalMode === 'independent' 
                ? '✨ Con que uno de los aprobadores apruebe es suficiente (aprobación paralela)'
                : '🔗 Todos los aprobadores deben aprobar en secuencia (aprobación en cadena)'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Barra de Progreso */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-gray-900">Progreso de Aprobación</h4>
          <span className="text-sm text-gray-600">
            {approvalFlow.filter(l => l.status === 'approved').length} de {approvalFlow.length} niveles
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Timeline de Aprobación */}
      <div className="space-y-4">
        {approvalFlow.map((level, index) => {
          const isActive = level.level === currentLevel
          const isLast = index === approvalFlow.length - 1

          return (
            <div key={level.level} className="relative">
              {/* Línea conectora */}
              {!isLast && (
                <div className="absolute left-6 top-14 w-0.5 h-full bg-gray-200" />
              )}

              {/* Card del nivel */}
              <div 
                className={`relative flex gap-4 p-4 border rounded-lg transition-all ${
                  isActive 
                    ? 'border-blue-400 bg-blue-50 shadow-md' 
                    : level.status === 'pending' 
                      ? 'border-gray-300 bg-white' 
                      : level.status === 'approved'
                        ? 'border-green-300 bg-green-50'
                        : 'border-red-300 bg-red-50'
                }`}
              >
                {/* Icono de estado */}
                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  level.status === 'approved' 
                    ? 'bg-green-100 border-green-500' 
                    : level.status === 'rejected'
                      ? 'bg-red-100 border-red-500'
                      : isActive
                        ? 'bg-blue-100 border-blue-500 animate-pulse'
                        : 'bg-gray-100 border-gray-300'
                }`}>
                  {getStatusIcon(level.status)}
                </div>

                {/* Información del aprobador */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-500">NIVEL {level.level}</span>
                        {isActive && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-blue-600 text-white rounded-full">
                            Actual
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-gray-900">{level.approverName}</p>
                      <p className="text-sm text-gray-600">{level.approverRole}</p>
                    </div>
                    
                    <span className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getApprovalStatusColor(level.status)}`}>
                      {getApprovalStatusLabel(level.status)}
                    </span>
                  </div>

                  {/* Comentarios */}
                  {level.comments && (
                    <div className="mt-3 p-3 bg-white bg-opacity-50 rounded border border-gray-200">
                      <p className="text-xs font-medium text-gray-700 mb-1">Comentarios:</p>
                      <p className="text-sm text-gray-900">{level.comments}</p>
                    </div>
                  )}

                  {/* Metadata */}
                  {level.approvalDate && (
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                      <span>📅 {formatDateTime(level.approvalDate)}</span>
                      {level.responseTime && (
                        <span>⏱️ Respondió en {level.responseTime.toFixed(1)} horas</span>
                      )}
                    </div>
                  )}

                  {/* Estado pendiente - Indicador de acción requerida */}
                  {level.status === 'pending' && isActive && (
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                      <span className="font-medium text-blue-900">
                        Esperando aprobación...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Resumen */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">
              {approvalFlow.filter(l => l.status === 'approved').length}
            </p>
            <p className="text-xs text-gray-600">Aprobados</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">
              {approvalFlow.filter(l => l.status === 'pending').length}
            </p>
            <p className="text-xs text-gray-600">Pendientes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">
              {approvalFlow.filter(l => l.status === 'rejected').length}
            </p>
            <p className="text-xs text-gray-600">Rechazados</p>
          </div>
        </div>
      </div>
    </div>
  )
}
