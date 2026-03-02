import type { Request } from '@/types'
import { 
  getRequestTypeLabel, 
  getRequestStatusLabel, 
  getPriorityLabel,
  getRequestStatusColor,
  getPriorityColor,
  getRequestTypeColor,
  formatCurrency,
  formatDate,
  getCurrentApprover
} from '../utils/requestHelpers'

interface RequestTableProps {
  requests: Request[]
  onViewDetails: (request: Request) => void
}

export default function RequestTable({ requests, onViewDetails }: RequestTableProps) {
  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-gray-500 text-lg mb-2">No hay solicitudes</p>
        <p className="text-gray-400 text-sm">Crea una nueva solicitud para comenzar</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Solicitud
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Solicitante
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Proyecto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prioridad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aprobador Actual
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-sm text-gray-900">{request.code}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="text-sm font-medium text-gray-900 truncate">{request.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(request.requestedDate)}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRequestTypeColor(request.type)}`}>
                    {getRequestTypeLabel(request.type)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm text-gray-900">{request.requestedBy.name}</p>
                    <p className="text-xs text-gray-500">{request.requestedBy.role}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{request.projectName || 'N/A'}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    {request.estimatedAmount > 0 ? formatCurrency(request.estimatedAmount) : '-'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(request.priority)}`}>
                    {getPriorityLabel(request.priority)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRequestStatusColor(request.status)}`}>
                    {getRequestStatusLabel(request.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-700">{getCurrentApprover(request.approvalFlow)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => onViewDetails(request)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
