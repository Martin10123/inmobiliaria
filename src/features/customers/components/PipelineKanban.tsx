import { useState } from 'react'
import type { Opportunity, OpportunityStage } from '@/types'
import { OpportunityCard } from './OpportunityCard'

interface PipelineKanbanProps {
  opportunities: Opportunity[]
  onStageChange: (opportunityId: string, newStage: OpportunityStage) => void
  onEditOpportunity: (opportunity: Opportunity) => void
}

interface Stage {
  id: OpportunityStage
  name: string
  color: string
  bgColor: string
}

const stages: Stage[] = [
  { id: 'lead', name: 'Lead', color: 'text-slate-700', bgColor: 'bg-slate-100' },
  { id: 'prospect', name: 'Prospecto', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  { id: 'qualified', name: 'Calificado', color: 'text-cyan-700', bgColor: 'bg-cyan-100' },
  { id: 'proposal', name: 'Propuesta', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  { id: 'negotiation', name: 'Negociación', color: 'text-amber-700', bgColor: 'bg-amber-100' },
  { id: 'contract', name: 'Contrato', color: 'text-green-700', bgColor: 'bg-green-100' },
  { id: 'execution', name: 'Ejecución', color: 'text-indigo-700', bgColor: 'bg-indigo-100' },
  { id: 'post-sale', name: 'Postventa', color: 'text-emerald-700', bgColor: 'bg-emerald-100' }
]

export const PipelineKanban = ({
  opportunities,
  onStageChange,
  onEditOpportunity
}: PipelineKanbanProps) => {
  const [draggedOpportunity, setDraggedOpportunity] = useState<Opportunity | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const getOpportunitiesByStage = (stageId: OpportunityStage) => {
    return opportunities.filter(opp => opp.stage === stageId)
  }

  const getStageValue = (stageId: OpportunityStage) => {
    return getOpportunitiesByStage(stageId).reduce((sum, opp) => sum + opp.estimatedValue, 0)
  }

  const handleDragStart = (opportunity: Opportunity) => {
    setDraggedOpportunity(opportunity)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (stageId: OpportunityStage) => {
    if (draggedOpportunity && draggedOpportunity.stage !== stageId) {
      onStageChange(draggedOpportunity.id, stageId)
    }
    setDraggedOpportunity(null)
  }

  const handleMoveOpportunity = (opportunity: Opportunity, direction: 'left' | 'right') => {
    const currentIndex = stages.findIndex(s => s.id === opportunity.stage)
    const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1

    if (newIndex >= 0 && newIndex < stages.length) {
      onStageChange(opportunity.id, stages[newIndex].id)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage, stageIndex) => {
          const stageOpportunities = getOpportunitiesByStage(stage.id)
          const stageValue = getStageValue(stage.id)

          return (
            <div
              key={stage.id}
              className="flex-shrink-0 w-80"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(stage.id)}
            >
              {/* Header de la columna */}
              <div className={`${stage.bgColor} rounded-t-lg p-3 border-b-2 border-${stage.color.replace('text-', '')}`}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-semibold ${stage.color}`}>{stage.name}</h3>
                  <span className="text-sm font-medium text-slate-600">
                    {stageOpportunities.length}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-600">{formatCurrency(stageValue)}</p>
              </div>

              {/* Tarjetas de oportunidades */}
              <div className="bg-slate-50 rounded-b-lg p-3 min-h-[600px] max-h-[600px] overflow-y-auto space-y-3">
                {stageOpportunities.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-8">
                    No hay oportunidades en esta etapa
                  </p>
                ) : (
                  stageOpportunities.map(opportunity => (
                    <div
                      key={opportunity.id}
                      draggable
                      onDragStart={() => handleDragStart(opportunity)}
                      className="cursor-move"
                    >
                      <OpportunityCard
                        opportunity={opportunity}
                        onEdit={() => onEditOpportunity(opportunity)}
                        onMoveLeft={
                          stageIndex > 0
                            ? () => handleMoveOpportunity(opportunity, 'left')
                            : undefined
                        }
                        onMoveRight={
                          stageIndex < stages.length - 1
                            ? () => handleMoveOpportunity(opportunity, 'right')
                            : undefined
                        }
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
