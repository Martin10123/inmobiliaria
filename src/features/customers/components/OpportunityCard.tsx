import {
  Building2,
  DollarSign,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Target,
  FolderKanban
} from 'lucide-react'
import type { Opportunity } from '@/types'

interface OpportunityCardProps {
  opportunity: Opportunity
  onEdit: () => void
  onMoveLeft?: () => void
  onMoveRight?: () => void
}

export const OpportunityCard = ({
  opportunity,
  onEdit,
  onMoveLeft,
  onMoveRight
}: OpportunityCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'short'
    }).format(date)
  }

  const getDaysUntilClose = () => {
    const closeDate = new Date(opportunity.estimatedCloseDate)
    const today = new Date()
    const diffTime = closeDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysRemaining = getDaysUntilClose()
  const isOverdue = daysRemaining < 0
  const isUrgent = daysRemaining >= 0 && daysRemaining <= 7

  const getProbabilityColor = (probability: number) => {
    if (probability >= 75) return 'text-green-600 bg-green-50'
    if (probability >= 50) return 'text-amber-600 bg-amber-50'
    if (probability >= 25) return 'text-orange-600 bg-orange-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-slate-800 text-sm leading-tight flex-1 pr-2">
          {opportunity.name}
        </h4>
        <button
          onClick={onEdit}
          className="text-slate-400 hover:text-blue-600 transition-colors flex-shrink-0"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>

      {/* Cliente */}
      <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
        <Building2 className="w-4 h-4" />
        <span className="truncate">{opportunity.customerName}</span>
      </div>

      {/* Badge de Proyecto Vinculado */}
      {opportunity.projectId && (
        <div className="flex items-center gap-2 mb-3 px-2 py-1.5 bg-green-50 border border-green-200 rounded-lg">
          <FolderKanban className="w-3.5 h-3.5 text-green-600" />
          <span className="text-xs font-medium text-green-700">Proyecto Activo</span>
        </div>
      )}

      {/* Valor */}
      <div className="flex items-center gap-2 mb-3">
        <DollarSign className="w-4 h-4 text-green-600" />
        <span className="font-semibold text-slate-800 text-sm">
          {formatCurrency(opportunity.estimatedValue)}
        </span>
      </div>

      {/* Probabilidad */}
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-4 h-4 text-purple-600" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-600">Probabilidad</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${getProbabilityColor(opportunity.closeProbability)}`}>
              {opportunity.closeProbability}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full transition-all"
              style={{ width: `${opportunity.closeProbability}%` }}
            />
          </div>
        </div>
      </div>

      {/* Fecha de cierre */}
      <div className="flex items-center gap-2 mb-3">
        <Calendar className={`w-4 h-4 ${isOverdue ? 'text-red-600' : isUrgent ? 'text-amber-600' : 'text-slate-400'}`} />
        <div className="flex-1">
          <span className="text-xs text-slate-600">Cierre esperado: </span>
          <span className={`text-xs font-medium ${isOverdue ? 'text-red-600' : isUrgent ? 'text-amber-600' : 'text-slate-700'}`}>
            {formatDate(opportunity.estimatedCloseDate)}
          </span>
          {isOverdue && <span className="text-xs text-red-600 ml-1">(Vencido)</span>}
          {isUrgent && !isOverdue && <span className="text-xs text-amber-600 ml-1">({daysRemaining}d)</span>}
        </div>
      </div>

      {/* Responsable */}
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
        <User className="w-4 h-4 text-blue-600" />
        <span className="text-xs text-slate-600 truncate">{opportunity.assignedTo.name}</span>
      </div>

      {/* Tags */}
      {opportunity.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {opportunity.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {opportunity.tags.length > 2 && (
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
              +{opportunity.tags.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Acciones de movimiento */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
        {onMoveLeft ? (
          <button
            onClick={onMoveLeft}
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            <ChevronLeft className="w-3 h-3" />
            Anterior
          </button>
        ) : (
          <div />
        )}
        {onMoveRight ? (
          <button
            onClick={onMoveRight}
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
          >
            Siguiente
            <ChevronRight className="w-3 h-3" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
