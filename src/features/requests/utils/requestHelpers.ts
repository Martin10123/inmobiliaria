import type { RequestType, RequestStatus, ApprovalStatus, Priority } from '@/types'

// ========================================
// LABELS Y TRADUCCIONES
// ========================================

export const getRequestTypeLabel = (type: RequestType): string => {
  const labels: Record<RequestType, string> = {
    material_requirement: 'Materiales',
    equipment_requirement: 'Equipos',
    loan: 'Préstamo',
    maintenance: 'Mantenimiento'
  }
  return labels[type]
}

export const getRequestStatusLabel = (status: RequestStatus): string => {
  const labels: Record<RequestStatus, string> = {
    draft: 'Borrador',
    pending: 'Pendiente',
    in_review: 'En Revisión',
    approved: 'Aprobada',
    rejected: 'Rechazada',
    cancelled: 'Cancelada',
    executed: 'Ejecutada'
  }
  return labels[status]
}

export const getApprovalStatusLabel = (status: ApprovalStatus): string => {
  const labels: Record<ApprovalStatus, string> = {
    pending: 'Pendiente',
    approved: 'Aprobado',
    rejected: 'Rechazado'
  }
  return labels[status]
}

export const getPriorityLabel = (priority: Priority): string => {
  const labels: Record<Priority, string> = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta'
  }
  return labels[priority]
}

// ========================================
// COLORES Y ESTILOS
// ========================================

export const getRequestStatusColor = (status: RequestStatus): string => {
  const colors: Record<RequestStatus, string> = {
    draft: 'text-gray-600 bg-gray-100',
    pending: 'text-yellow-600 bg-yellow-100',
    in_review: 'text-blue-600 bg-blue-100',
    approved: 'text-green-600 bg-green-100',
    rejected: 'text-red-600 bg-red-100',
    cancelled: 'text-gray-600 bg-gray-100',
    executed: 'text-purple-600 bg-purple-100'
  }
  return colors[status]
}

export const getApprovalStatusColor = (status: ApprovalStatus): string => {
  const colors: Record<ApprovalStatus, string> = {
    pending: 'text-yellow-600 bg-yellow-100',
    approved: 'text-green-600 bg-green-100',
    rejected: 'text-red-600 bg-red-100'
  }
  return colors[status]
}

export const getPriorityColor = (priority: Priority): string => {
  const colors: Record<Priority, string> = {
    low: 'text-gray-600 bg-gray-100',
    medium: 'text-yellow-600 bg-yellow-100',
    high: 'text-red-600 bg-red-100'
  }
  return colors[priority]
}

export const getRequestTypeColor = (type: RequestType): string => {
  const colors: Record<RequestType, string> = {
    material_requirement: 'text-blue-600 bg-blue-100',
    equipment_requirement: 'text-purple-600 bg-purple-100',
    loan: 'text-orange-600 bg-orange-100',
    maintenance: 'text-teal-600 bg-teal-100'
  }
  return colors[type]
}

// ========================================
// FORMATEO
// ========================================

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatRelativeTime = (date: string): string => {
  const now = new Date()
  const past = new Date(date)
  const diffInMs = now.getTime() - past.getTime()
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInHours / 24)
  
  if (diffInHours < 1) return 'Hace menos de 1 hora'
  if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`
  if (diffInDays < 7) return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`
  
  return formatDate(date)
}

// ========================================
// VALIDACIONES
// ========================================

export const isApprovalPending = (status: RequestStatus): boolean => {
  return status === 'pending' || status === 'in_review'
}

export const canBeApproved = (status: RequestStatus): boolean => {
  return status === 'pending' || status === 'in_review'
}

export const canBeCancelled = (status: RequestStatus): boolean => {
  return status !== 'executed' && status !== 'cancelled'
}

// ========================================
// CÁLCULOS
// ========================================

export const calculateTotalItems = (items: { quantity: number }[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export const getApprovalProgress = (approvalFlow: { status: ApprovalStatus }[]): number => {
  const totalLevels = approvalFlow.length
  const approvedLevels = approvalFlow.filter(level => level.status === 'approved').length
  return Math.round((approvedLevels / totalLevels) * 100)
}

export const getCurrentApprover = (approvalFlow: { status: ApprovalStatus, approverName: string }[]) => {
  const pendingLevel = approvalFlow.find(level => level.status === 'pending')
  return pendingLevel?.approverName || 'N/A'
}

export const getAverageResponseTime = (approvalFlow: { responseTime?: number }[]): number => {
  const times = approvalFlow.filter(level => level.responseTime).map(level => level.responseTime!)
  if (times.length === 0) return 0
  return times.reduce((sum, time) => sum + time, 0) / times.length
}
