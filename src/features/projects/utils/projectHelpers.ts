import type { ProjectStatus, ProjectType, Priority, TaskStatus, EventType, DocumentType, TeamRole } from '@/types'

// Helpers para obtener etiquetas en español
export const getStatusLabel = (status: ProjectStatus): string => {
  const labels: Record<ProjectStatus, string> = {
    planning: 'Planeación',
    'in-progress': 'En Curso',
    paused: 'Pausado',
    completed: 'Completado',
    cancelled: 'Cancelado',
  }
  return labels[status]
}

export const getTypeLabel = (type: ProjectType): string => {
  const labels: Record<ProjectType, string> = {
    construction: 'Construcción',
    remodeling: 'Remodelación',
    urbanization: 'Urbanización',
    other: 'Otro',
  }
  return labels[type]
}

export const getPriorityLabel = (priority: Priority): string => {
  const labels: Record<Priority, string> = {
    high: 'Alta',
    medium: 'Media',
    low: 'Baja',
  }
  return labels[priority]
}

export const getTaskStatusLabel = (status: TaskStatus): string => {
  const labels: Record<TaskStatus, string> = {
    pending: 'Pendiente',
    'in-progress': 'En Progreso',
    completed: 'Completada',
    cancelled: 'Cancelada',
  }
  return labels[status]
}

export const getEventTypeLabel = (type: EventType): string => {
  const labels: Record<EventType, string> = {
    PROJECT_CREATED: 'Proyecto Creado',
    PROJECT_STATUS_CHANGED: 'Cambio de Estado',
    PROJECT_DEADLINE_APPROACHING: 'Fecha Límite Próxima',
    PROJECT_OVERBUDGET: 'Presupuesto Excedido',
    PROJECT_TASK_DELAYED: 'Tarea Atrasada',
    PROJECT_PHASE_COMPLETED: 'Fase Completada',
    TASK_CREATED: 'Tarea Creada',
    TASK_UPDATED: 'Tarea Actualizada',
    TASK_COMPLETED: 'Tarea Completada',
    DOCUMENT_UPLOADED: 'Documento Subido',
    TEAM_MEMBER_ADDED: 'Miembro Agregado',
  }
  return labels[type]
}

export const getDocumentTypeLabel = (type: DocumentType): string => {
  const labels: Record<DocumentType, string> = {
    plan: 'Plano',
    permit: 'Permiso',
    license: 'Licencia',
    contract: 'Contrato',
    photo: 'Fotografía',
    other: 'Otro',
  }
  return labels[type]
}

export const getTeamRoleLabel = (role: TeamRole): string => {
  const labels: Record<TeamRole, string> = {
    manager: 'Gerente de Proyecto',
    architect: 'Arquitecto',
    engineer: 'Ingeniero',
    contractor: 'Contratista',
    supervisor: 'Supervisor',
    other: 'Otro',
  }
  return labels[role]
}

// Helpers para colores
export const getStatusColor = (status: ProjectStatus): string => {
  const colors: Record<ProjectStatus, string> = {
    planning: 'bg-blue-100 text-blue-700',
    'in-progress': 'bg-green-100 text-green-700',
    paused: 'bg-orange-100 text-orange-700',
    completed: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-red-100 text-red-700',
  }
  return colors[status]
}

export const getPriorityColor = (priority: Priority): string => {
  const colors: Record<Priority, string> = {
    high: 'text-red-600',
    medium: 'text-orange-600',
    low: 'text-blue-600',
  }
  return colors[priority]
}

export const getTaskStatusColor = (status: TaskStatus): string => {
  const colors: Record<TaskStatus, string> = {
    pending: 'bg-slate-100 text-slate-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }
  return colors[status]
}

export const getEventTypeColor = (type: EventType): string => {
  if (type.includes('CREATED')) return 'bg-blue-100 text-blue-700'
  if (type.includes('COMPLETED')) return 'bg-green-100 text-green-700'
  if (type.includes('DELAYED') || type.includes('OVERBUDGET')) return 'bg-red-100 text-red-700'
  if (type.includes('APPROACHING')) return 'bg-orange-100 text-orange-700'
  return 'bg-slate-100 text-slate-700'
}

export const getPhaseStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    'completed': 'bg-green-100 text-green-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    'pending': 'bg-slate-100 text-slate-700',
    'cancelled': 'bg-red-100 text-red-700',
  }
  return colors[status] || 'bg-slate-100 text-slate-700'
}

// Helper para formatear tamaño de archivo
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

// Helper para formatear fechas
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Helper para calcular días restantes
export const getDaysRemaining = (endDate: string): number => {
  const today = new Date()
  const end = new Date(endDate)
  const diff = end.getTime() - today.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

// Helper para verificar si una fecha está próxima (menos de 15 días)
export const isDeadlineApproaching = (endDate: string): boolean => {
  const daysRemaining = getDaysRemaining(endDate)
  return daysRemaining > 0 && daysRemaining <= 15
}

// Helper para verificar si está retrasado
export const isOverdue = (endDate: string, status: ProjectStatus | TaskStatus): boolean => {
  if (status === 'completed' || status === 'cancelled') return false
  return getDaysRemaining(endDate) < 0
}

// Helper para calcular porcentaje del presupuesto usado
export const getBudgetPercentage = (currentCost: number, budget: number): number => {
  return Math.round((currentCost / budget) * 100)
}

// Helper para verificar si está sobre presupuesto
export const isOverBudget = (currentCost: number, budget: number): boolean => {
  return currentCost > budget
}

// Helper para generar iniciales
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
