import { useState } from 'react'
import { MainLayout } from '@/layout/MainLayout'
import { Plus, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Opportunity, OpportunityStage, User } from '@/types'
import { mockOpportunities } from './data/mockOpportunities'
import { PipelineMetrics } from './components/PipelineMetrics'
import { PipelineKanban } from './components/PipelineKanban'
import { OpportunityModal } from './components/OpportunityModal'

export const SalesPipelinePage = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities)
  const [filterAssignedTo, setFilterAssignedTo] = useState<string>('all')
  const [filterMinValue, setFilterMinValue] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null)

  // Filtrar oportunidades
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesAssignee = filterAssignedTo === 'all' || opp.assignedTo.id === filterAssignedTo
    const matchesValue = opp.estimatedValue >= filterMinValue
    return matchesAssignee && matchesValue
  })

  // Obtener ejecutivos únicos
  const uniqueExecutives = Array.from(
    new Set(opportunities.map(opp => JSON.stringify(opp.assignedTo)))
  ).map(str => JSON.parse(str) as User)

  const handleCreateOpportunity = () => {
    setEditingOpportunity(null)
    setIsModalOpen(true)
  }

  const handleEditOpportunity = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity)
    setIsModalOpen(true)
  }

  const handleStageChange = (opportunityId: string, newStage: OpportunityStage) => {
    setOpportunities(prev =>
      prev.map(opp =>
        opp.id === opportunityId
          ? {
              ...opp,
              stage: newStage,
              history: [
                ...opp.history,
                {
                  date: new Date().toISOString().split('T')[0],
                  change: `Movida a etapa: ${getStageName(newStage)}`
                }
              ]
            }
          : opp
      )
    )
  }

  const getStageName = (stage: OpportunityStage): string => {
    const names: Record<OpportunityStage, string> = {
      lead: 'Lead',
      prospect: 'Prospecto',
      qualified: 'Calificado',
      proposal: 'Propuesta',
      negotiation: 'Negociación',
      contract: 'Contrato',
      execution: 'Ejecución',
      'post-sale': 'Postventa'
    }
    return names[stage]
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Pipeline de Ventas</h1>
            <p className="text-slate-600 mt-1">Gestión del embudo comercial y oportunidades</p>
          </div>
          <Button onClick={handleCreateOpportunity} className="gap-2">
            <Plus className="w-4 h-4" />
            Nueva Oportunidad
          </Button>
        </div>

        {/* Métricas del Pipeline */}
        <PipelineMetrics opportunities={filteredOpportunities} />

        {/* Filtros */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">Filtros:</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-600">Ejecutivo:</label>
              <select
                value={filterAssignedTo}
                onChange={e => setFilterAssignedTo(e.target.value)}
                className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos</option>
                {uniqueExecutives.map(exec => (
                  <option key={exec.id} value={exec.id}>
                    {exec.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-600">Valor mínimo:</label>
              <select
                value={filterMinValue}
                onChange={e => setFilterMinValue(Number(e.target.value))}
                className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0}>Todos</option>
                <option value={50000000}>$50M+</option>
                <option value={100000000}>$100M+</option>
                <option value={200000000}>$200M+</option>
                <option value={500000000}>$500M+</option>
              </select>
            </div>

            {(filterAssignedTo !== 'all' || filterMinValue > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilterAssignedTo('all')
                  setFilterMinValue(0)
                }}
                className="text-slate-600"
              >
                Limpiar filtros
              </Button>
            )}
          </div>
        </div>

        {/* Kanban del Pipeline */}
        <PipelineKanban
          opportunities={filteredOpportunities}
          onStageChange={handleStageChange}
          onEditOpportunity={handleEditOpportunity}
        />
      </div>

      {/* Modal de Oportunidad */}
      {isModalOpen && (
        <OpportunityModal
          opportunity={editingOpportunity}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {
            setIsModalOpen(false)
            // Aquí iría la lógica de guardar
          }}
        />
      )}
    </MainLayout>
  )
}
