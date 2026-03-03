import { useState } from 'react'
import { MainLayout } from '@/layout/MainLayout'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Request, RequestFormData, RequestStatus } from '@/types'
import { mockRequests } from './data/mockRequests'
import { generateApprovalFlow, isRequestFullyApproved } from './utils/flowService'
import RequestStats from './components/RequestStats'
import RequestTable from './components/RequestTable'
import RequestDetailModal from './components/RequestDetailModal'
import RequestFormModal from './components/RequestFormModal'

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>(mockRequests)
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all')

  // Filtrar solicitudes
  const filteredRequests = requests.filter(request => {
    if (statusFilter === 'all') return true
    return request.status === statusFilter
  })

  // Crear nueva solicitud
  const handleCreateRequest = (formData: RequestFormData) => {
    const estimatedAmount = formData.items.reduce((sum, item) => sum + (item.estimatedCost || 0), 0)
    
    // Determinar flujo de aprobación automáticamente según tipo y monto
    const approvalFlow = generateApprovalFlow(formData.type, estimatedAmount)

    const newRequest: Request = {
      id: `${requests.length + 1}`,
      code: `REQ-2026-${String(requests.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'pending',
      requestedBy: {
        id: 'current-user',
        name: 'Usuario Actual',
        email: 'usuario@empresa.com',
        role: 'Ingeniero'
      },
      requestedDate: new Date().toISOString(),
      estimatedAmount,
      approvalFlow,
      currentApprovalLevel: 1,
      history: [
        {
          date: new Date().toISOString(),
          user: 'Usuario Actual',
          action: 'Solicitud creada',
          newStatus: 'pending',
          comments: `Requiere ${approvalFlow.length} nivel${approvalFlow.length > 1 ? 'es' : ''} de aprobación`
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setRequests([newRequest, ...requests])
  }

  // Aprobar solicitud
  const handleApprove = (requestId: string, level: number, comments: string) => {
    setRequests(requests.map(request => {
      if (request.id !== requestId) return request

      const updatedApprovalFlow = request.approvalFlow.map(l => 
        l.level === level 
          ? { 
              ...l, 
              status: 'approved' as const, 
              approvalDate: new Date().toISOString(),
              comments: comments || 'Aprobado',
              responseTime: Math.random() * 24 // Simulado
            }
          : l
      )

      // Usar el servicio para determinar si está completamente aprobado
      const fullyApproved = isRequestFullyApproved(updatedApprovalFlow)
      const nextLevel = updatedApprovalFlow.find(l => l.status === 'pending')

      return {
        ...request,
        approvalFlow: updatedApprovalFlow,
        status: fullyApproved ? 'approved' : (nextLevel ? 'in_review' : request.status),
        currentApprovalLevel: nextLevel?.level || request.approvalFlow.length + 1,
        history: [
          ...request.history,
          {
            date: new Date().toISOString(),
            user: updatedApprovalFlow.find(l => l.level === level)?.approverName || 'Usuario',
            action: `Aprobado en nivel ${level}`,
            previousStatus: request.status,
            newStatus: fullyApproved ? 'approved' as RequestStatus : 'in_review' as RequestStatus,
            comments
          }
        ],
        updatedAt: new Date().toISOString()
      }
    }))
  }

  // Rechazar solicitud
  const handleReject = (requestId: string, level: number, comments: string) => {
    setRequests(requests.map(request => {
      if (request.id !== requestId) return request

      const updatedApprovalFlow = request.approvalFlow.map(l => 
        l.level === level 
          ? { 
              ...l, 
              status: 'rejected' as const, 
              approvalDate: new Date().toISOString(),
              comments: comments || 'Rechazado',
              responseTime: Math.random() * 24 // Simulado
            }
          : l
      )

      return {
        ...request,
        approvalFlow: updatedApprovalFlow,
        status: 'rejected',
        history: [
          ...request.history,
          {
            date: new Date().toISOString(),
            user: updatedApprovalFlow.find(l => l.level === level)?.approverName || 'Usuario',
            action: `Rechazado en nivel ${level}`,
            previousStatus: request.status,
            newStatus: 'rejected' as RequestStatus,
            comments
          }
        ],
        updatedAt: new Date().toISOString()
      }
    }))
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Solicitudes y Aprobaciones
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Gestiona requerimientos de materiales, equipos, préstamos y mantenimiento
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Nueva Solicitud
          </Button>
        </div>

        {/* Estadísticas */}
        <RequestStats requests={requests} />

        {/* Controles */}
        <div className="flex gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setStatusFilter('in_review')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === 'in_review'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            En Revisión
          </button>
          <button
            onClick={() => setStatusFilter('approved')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === 'approved'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Aprobadas
          </button>
        </div>

        {/* Tabla de Solicitudes */}
        <RequestTable 
          requests={filteredRequests} 
          onViewDetails={setSelectedRequest}
        />

        {/* Modal de Detalles */}
        <RequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />

        {/* Modal de Formulario */}
        <RequestFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleCreateRequest}
        />
      </div>
    </MainLayout>
  )
}
