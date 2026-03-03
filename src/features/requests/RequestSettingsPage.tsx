import { useState } from 'react'
import { MainLayout } from '@/layout/MainLayout'
import { Settings, Save, GitBranchPlus, GitCommit, Edit2, Check, X, Plus, Trash2, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import type { RequestTypeConfig, ApprovalMode, ApprovalRule } from '@/types'
import { mockRequestTypeConfigs } from './config/requestTypeConfigs'
import { mockApprovers } from './data/mockApprovers'

export default function RequestSettingsPage() {
  const [configs, setConfigs] = useState<RequestTypeConfig[]>(mockRequestTypeConfigs)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingRuleModal, setEditingRuleModal] = useState<{
    configId: string
    ruleIndex: number
    rule: ApprovalRule
  } | null>(null)
  const [editingApproversModal, setEditingApproversModal] = useState<string | null>(null)

  const handleSave = () => {
    alert('✅ Configuraciones guardadas exitosamente')
    setEditingId(null)
  }

  const toggleMode = (configId: string) => {
    setConfigs(configs.map(c => 
      c.id === configId 
        ? { ...c, approvalMode: c.approvalMode === 'dependent' ? 'independent' as ApprovalMode : 'dependent' as ApprovalMode }
        : c
   ))
  }

  const updateRule = (configId: string, ruleIndex: number, updatedRule: ApprovalRule) => {
    setConfigs(configs.map(c => {
      if (c.id !== configId) return c
      const newRules = [...c.rules]
      newRules[ruleIndex] = updatedRule
      return { ...c, rules: newRules }
    }))
  }

  const deleteRule = (configId: string, ruleIndex: number) => {
    if (!confirm('¿Eliminar esta regla?')) return
    setConfigs(configs.map(c => {
      if (c.id !== configId) return c
      return { ...c, rules: c.rules.filter((_, idx) => idx !== ruleIndex) }
    }))
  }

  const addRule = (configId: string) => {
    setConfigs(configs.map(c => {
      if (c.id !== configId) return c
      const newRule: ApprovalRule = {
        requiredApprovers: []
      }
      return { ...c, rules: [...c.rules, newRule] }
    }))
  }

  const toggleApproverInConfig = (configId: string, approverId: string) => {
    setConfigs(configs.map(c => {
      if (c.id !== configId) return c
      const hasApprover = c.approvers.includes(approverId)
      return {
        ...c,
        approvers: hasApprover
          ? c.approvers.filter(id => id !== approverId)
          : [...c.approvers, approverId]
      }
    }))
  }

  const openEditRuleModal = (configId: string, ruleIndex: number, rule: ApprovalRule) => {
    setEditingRuleModal({ configId, ruleIndex, rule: { ...rule } })
  }

  const getApproverName = (id: string) => mockApprovers.find(a => a.id === id)?.name || id

  return (
    <MainLayout>
      <div className="space-y-4">
        {/* Header Compacto */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Configuración de Aprobaciones</h1>
              <p className="text-xs text-gray-600">
                <GitCommit className="w-3 h-3 inline mr-1" />Dependiente: secuencia | 
                <GitBranchPlus className="w-3 h-3 inline mx-1" />Independiente: paralelo
              </p>
            </div>
          </div>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar
          </Button>
        </div>

        {/* Tabla Compacta Editable */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Tipo</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Modo</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Aprobadores</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Reglas por Monto</th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {configs.map((config) => (
                <tr key={config.id} className="hover:bg-gray-50">
                  {/* Tipo */}
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{config.name}</p>
                    <p className="text-xs text-gray-500">{config.description}</p>
                  </td>

                  {/* Modo */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleMode(config.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        config.approvalMode === 'independent'
                          ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {config.approvalMode === 'independent' ? (
                        <span className="flex items-center gap-1">
                          <GitBranchPlus className="w-3 h-3" />
                          Independiente
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <GitCommit className="w-3 h-3" />
                          Dependiente
                        </span>
                      )}
                    </button>
                  </td>

                  {/* Aprobadores */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setEditingApproversModal(config.id)}
                      className="w-full text-left hover:bg-blue-50 p-2 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1 flex-1">
                          {config.approvers.length === 0 ? (
                            <span className="text-xs text-gray-400 italic">Click para agregar</span>
                          ) : (
                            <>
                              {config.approvers.slice(0, 3).map(approverId => (
                                <span 
                                  key={approverId}
                                  className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                                >
                                  {getApproverName(approverId).split(' ')[0]}
                                </span>
                              ))}
                              {config.approvers.length > 3 && (
                                <span className="px-2 py-0.5 bg-blue-200 text-blue-800 rounded text-xs font-bold">
                                  +{config.approvers.length - 3}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        <UserPlus className="w-3 h-3 text-blue-600 shrink-0" />
                      </div>
                    </button>
                  </td>

                  {/* Reglas */}
                  <td className="px-4 py-3">
                    <div className="space-y-1.5">
                      {config.rules.map((rule, idx) => (
                        <div key={idx} className="flex items-center gap-2 group">
                          <div className="flex-1 text-xs text-gray-600">
                            <span className="font-medium text-gray-900">
                              {rule.maxAmount !== undefined 
                                ? `≤ $${(rule.maxAmount / 1000000).toFixed(0)}M` 
                                : rule.minAmount !== undefined 
                                  ? `≥ $${(rule.minAmount / 1000000).toFixed(0)}M`
                                  : 'Cualquier'}
                            </span>
                            {' → '}
                            <span className="text-gray-600">
                              {rule.requiredApprovers.length === 0 ? (
                                <span className="text-red-500 italic">Sin aprobadores</span>
                              ) : (
                                rule.requiredApprovers.map((id, i) => (
                                  <span key={id}>
                                    {getApproverName(id).split(' ')[0]}
                                    {i < rule.requiredApprovers.length - 1 && (
                                      config.approvalMode === 'dependent' ? ' → ' : ' ó '
                                    )}
                                  </span>
                                ))
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => openEditRuleModal(config.id, idx, rule)}
                              className="p-0.5 text-blue-600 hover:bg-blue-50 rounded"
                              title="Editar regla"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => deleteRule(config.id, idx)}
                              className="p-0.5 text-red-600 hover:bg-red-50 rounded"
                              title="Eliminar regla"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => addRule(config.id)}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <Plus className="w-3 h-3" />
                        Agregar regla
                      </button>
                    </div>
                  </td>

                  {/* Acciones */}
                  <td className="px-4 py-3 text-center">
                    {editingId === config.id ? (
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                          title="Guardar"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Cancelar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingId(config.id)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Aprobadores Disponibles */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Aprobadores del Sistema</h3>
          <div className="grid grid-cols-5 gap-2">
            {mockApprovers.map(approver => (
              <div 
                key={approver.id}
                className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-blue-600">
                    {approver.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-xs truncate">{approver.name}</p>
                  <p className="text-xs text-gray-500 truncate">{approver.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Edición de Regla */}
      {editingRuleModal && (
        <EditRuleModal
          rule={editingRuleModal.rule}
          approvers={mockApprovers}
          onSave={(updatedRule) => {
            updateRule(editingRuleModal.configId, editingRuleModal.ruleIndex, updatedRule)
            setEditingRuleModal(null)
          }}
          onClose={() => setEditingRuleModal(null)}
        />
      )}

      {/* Modal de Selección de Aprobadores */}
      {editingApproversModal && (
        <EditApproversModal
          config={configs.find(c => c.id === editingApproversModal)!}
          approvers={mockApprovers}
          onToggleApprover={(approverId) => toggleApproverInConfig(editingApproversModal, approverId)}
          onClose={() => setEditingApproversModal(null)}
        />
      )}
    </MainLayout>
  )
}

// Componente Modal para Seleccionar Aprobadores del Tipo de Solicitud
function EditApproversModal({ 
  config,
  approvers, 
  onToggleApprover, 
  onClose 
}: { 
  config: RequestTypeConfig
  approvers: typeof mockApprovers
  onToggleApprover: (approverId: string) => void
  onClose: () => void
}) {
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Aprobadores - ${config.label}`}
      maxWidth="2xl"
    >
      <div className="p-6 space-y-4">
        <p className="text-sm text-gray-600">
          Selecciona las personas que pueden aprobar solicitudes de tipo <span className="font-semibold">{config.label}</span>
        </p>

        {/* Grid de Aprobadores */}
        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2">
          {approvers.map((approver) => {
            const isSelected = config.approvers.includes(approver.id)
            return (
              <button
                key={approver.id}
                onClick={() => onToggleApprover(approver.id)}
                className={`flex items-center gap-3 p-3 border-2 rounded-lg transition-all text-left ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-blue-500' : 'bg-gray-200'
                }`}>
                  {isSelected ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-sm font-bold text-gray-600">
                      {approver.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm truncate ${
                    isSelected ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {approver.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">{approver.role}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Resumen */}
        {config.approvers.length > 0 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs font-medium text-blue-900">
              {config.approvers.length} {config.approvers.length === 1 ? 'persona seleccionada' : 'personas seleccionadas'}
            </p>
          </div>
        )}

        {/* Botón Cerrar */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button onClick={onClose} className="flex-1">
            <Check className="w-4 h-4 mr-2" />
            Listo
          </Button>
        </div>
      </div>
    </Modal>
  )
}

// Componente Modal para Editar Regla
function EditRuleModal({ 
  rule, 
  approvers, 
  onSave, 
  onClose 
}: { 
  rule: ApprovalRule
  approvers: typeof mockApprovers
  onSave: (rule: ApprovalRule) => void
  onClose: () => void
}) {
  const [editedRule, setEditedRule] = useState<ApprovalRule>(rule)

  const toggleApprover = (approverId: string) => {
    const currentApprovers = editedRule.requiredApprovers
    const newApprovers = currentApprovers.includes(approverId)
      ? currentApprovers.filter(id => id !== approverId)
      : [...currentApprovers, approverId]
    
    setEditedRule({ ...editedRule, requiredApprovers: newApprovers })
  }

  const handleSave = () => {
    onSave(editedRule)
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Editar Regla de Aprobación"
      maxWidth="2xl"
    >
      <div className="p-6 space-y-6">
        {/* Rangos de Monto */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Rango de Monto</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Monto Mínimo (opcional)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">$</span>
                <input
                  type="number"
                  value={editedRule.minAmount || ''}
                  onChange={(e) => setEditedRule({
                    ...editedRule,
                    minAmount: e.target.value ? parseInt(e.target.value) : undefined
                  })}
                  placeholder="Ej: 10000000"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {editedRule.minAmount ? `$${(editedRule.minAmount / 1000000).toFixed(1)}M COP` : 'Sin mínimo'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Monto Máximo (opcional)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">$</span>
                <input
                  type="number"
                  value={editedRule.maxAmount || ''}
                  onChange={(e) => setEditedRule({
                    ...editedRule,
                    maxAmount: e.target.value ? parseInt(e.target.value) : undefined
                  })}
                  placeholder="Ej: 30000000"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {editedRule.maxAmount ? `$${(editedRule.maxAmount / 1000000).toFixed(1)}M COP` : 'Sin máximo'}
              </p>
            </div>
          </div>
        </div>

        {/* Selección de Aprobadores */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Aprobadores Requeridos ({editedRule.requiredApprovers.length})
          </h3>
          
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-lg bg-gray-50">
            {approvers.map((approver) => {
              const isSelected = editedRule.requiredApprovers.includes(approver.id)
              return (
                <button
                  key={approver.id}
                  onClick={() => toggleApprover(approver.id)}
                  className={`flex items-center gap-3 p-3 border-2 rounded-lg transition-all text-left ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-blue-500' : 'bg-gray-200'
                  }`}>
                    {isSelected ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-sm font-bold text-gray-600">
                        {approver.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm truncate ${
                      isSelected ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {approver.name}
                    </p>
                    <p className="text-xs text-gray-600 truncate">{approver.role}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {editedRule.requiredApprovers.length > 0 && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-medium text-blue-900 mb-2">Orden de Aprobación:</p>
              <div className="flex flex-wrap gap-2">
                {editedRule.requiredApprovers.map((approverId, idx) => {
                  const approver = approvers.find(a => a.id === approverId)
                  return (
                    <div key={approverId} className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-white border border-blue-300 rounded-full text-xs font-medium text-blue-900">
                        {idx + 1}. {approver?.name}
                      </span>
                      {idx < editedRule.requiredApprovers.length - 1 && (
                        <span className="text-blue-400">→</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button onClick={handleSave} className="flex-1">
            <Check className="w-4 h-4 mr-2" />
            Guardar Regla
          </Button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  )
}
