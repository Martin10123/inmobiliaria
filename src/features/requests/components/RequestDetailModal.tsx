import { useState } from 'react'
import type { Request } from '@/types'
import { Modal } from '@/components/ui/modal'
import ApprovalFlow from './ApprovalFlow'
import {
  getRequestTypeLabel,
  getRequestStatusLabel,
  getPriorityLabel,
  getRequestStatusColor,
  getPriorityColor,
  formatCurrency,
  formatDateTime,
  canBeApproved
} from '../utils/requestHelpers'

interface RequestDetailModalProps {
  request: Request | null
  onClose: () => void
  onApprove?: (requestId: string, level: number, comments: string) => void
  onReject?: (requestId: string, level: number, comments: string) => void
}

export default function RequestDetailModal({ 
  request, 
  onClose, 
  onApprove,
  onReject 
}: RequestDetailModalProps) {
  const [showApprovalForm, setShowApprovalForm] = useState(false)
  const [action, setAction] = useState<'approve' | 'reject'>('approve')
  const [comments, setComments] = useState('')

  if (!request) return null

  const currentLevel = request.approvalFlow.find(level => level.status === 'pending')
  const canApprove = canBeApproved(request.status) && currentLevel

  const handleSubmit = () => {
    if (!currentLevel) return
    
    if (action === 'approve' && onApprove) {
      onApprove(request.id, currentLevel.level, comments)
    } else if (action === 'reject' && onReject) {
      onReject(request.id, currentLevel.level, comments)
    }
    
    setShowApprovalForm(false)
    setComments('')
    onClose()
  }

  return (
    <Modal
      isOpen={!!request}
      onClose={onClose}
      title={`Solicitud ${request.code}`}
      maxWidth="4xl"
    >
      <div className="p-6 space-y-6">
        {/* Header con estado y prioridad */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{request.title}</h3>
            <p className="text-gray-600">{request.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2 ml-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRequestStatusColor(request.status)}`}>
              {getRequestStatusLabel(request.status)}
            </span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(request.priority)}`}>
              {getPriorityLabel(request.priority)}
            </span>
          </div>
        </div>

        {/* Información General */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-500 mb-1">Tipo</p>
            <p className="text-sm font-medium text-gray-900">{getRequestTypeLabel(request.type)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Monto Estimado</p>
            <p className="text-sm font-medium text-gray-900">
              {request.estimatedAmount > 0 ? formatCurrency(request.estimatedAmount) : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Solicitante</p>
            <p className="text-sm font-medium text-gray-900">{request.requestedBy.name}</p>
            <p className="text-xs text-gray-500">{request.requestedBy.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Fecha Solicitud</p>
            <p className="text-sm font-medium text-gray-900">{formatDateTime(request.requestedDate)}</p>
          </div>
          {request.projectName && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Proyecto</p>
              <p className="text-sm font-medium text-gray-900">{request.projectName}</p>
            </div>
          )}
          {request.requiredDate && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Fecha Requerida</p>
              <p className="text-sm font-medium text-gray-900">{formatDateTime(request.requiredDate)}</p>
            </div>
          )}
        </div>

        {/* Items Solicitados */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Items Solicitados</h4>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600 font-medium">Item</th>
                  <th className="px-4 py-2 text-left text-gray-600 font-medium">Descripción</th>
                  <th className="px-4 py-2 text-right text-gray-600 font-medium">Cantidad</th>
                  <th className="px-4 py-2 text-left text-gray-600 font-medium">Unidad</th>
                  <th className="px-4 py-2 text-right text-gray-600 font-medium">Costo Est.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {request.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{item.description}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">{item.quantity}</td>
                    <td className="px-4 py-3 text-gray-600">{item.unit}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      {item.estimatedCost ? formatCurrency(item.estimatedCost) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Flujo de Aprobación */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Flujo de Aprobación</h4>
          <ApprovalFlow 
            approvalFlow={request.approvalFlow} 
            currentLevel={request.currentApprovalLevel} 
          />
        </div>

        {/* Historial */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Historial</h4>
          <div className="space-y-2">
            {request.history.map((entry, index) => (
              <div key={index} className="flex gap-3 text-sm">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-gray-900">
                    <span className="font-medium">{entry.user}</span> - {entry.action}
                  </p>
                  {entry.comments && (
                    <p className="text-gray-600 text-xs mt-1">{entry.comments}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">{formatDateTime(entry.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones de Aprobación */}
        {canApprove && !showApprovalForm && (
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                setAction('approve')
                setShowApprovalForm(true)
              }}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              ✓ Aprobar
            </button>
            <button
              onClick={() => {
                setAction('reject')
                setShowApprovalForm(true)
              }}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              ✗ Rechazar
            </button>
          </div>
        )}

        {/* Formulario de Aprobación/Rechazo */}
        {showApprovalForm && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h5 className="font-medium text-gray-900 mb-3">
              {action === 'approve' ? 'Aprobar Solicitud' : 'Rechazar Solicitud'}
            </h5>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Comentarios (opcional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleSubmit}
                className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors ${
                  action === 'approve' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Confirmar {action === 'approve' ? 'Aprobación' : 'Rechazo'}
              </button>
              <button
                onClick={() => {
                  setShowApprovalForm(false)
                  setComments('')
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
