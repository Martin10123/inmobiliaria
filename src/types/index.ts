// Tipos de estado de proyectos
export type ProjectStatus = 'planning' | 'in-progress' | 'paused' | 'completed' | 'cancelled'

// Tipos de proyectos
export type ProjectType = 'construction' | 'remodeling' | 'urbanization' | 'other'

// Prioridad
export type Priority = 'low' | 'medium' | 'high'

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  status: 'active' | 'inactive'
}

export interface Contract {
  id: string
  code: string
  title: string
  clientId: string
  clientName: string
  amount: number
  startDate: string
  endDate: string
  status: 'draft' | 'active' | 'expired' | 'cancelled'
}

export interface Project {
  id: string
  code: string
  name: string
  description: string
  type: ProjectType
  status: ProjectStatus
  priority: Priority
  
  // Fechas
  plannedStartDate: string
  actualStartDate?: string
  plannedEndDate: string
  actualEndDate?: string
  
  // Progreso
  progress: number // 0-100
  
  // Relaciones
  clientIds: string[]
  contractIds: string[]
  managerId: string
  managerName: string
  
  // Financiero
  budget: number
  currentCost: number
  projectedRevenue: number
  
  // Ubicación
  address?: string
  city?: string
  
  // Metadata
  createdAt: string
  updatedAt: string
}

export interface ProjectFormData {
  name: string
  description: string
  type: ProjectType
  status: ProjectStatus
  priority: Priority
  plannedStartDate: string
  plannedEndDate: string
  clientIds: string[]
  contractIds: string[]
  managerId: string
  budget: number
  projectedRevenue: number
  address?: string
  city?: string
}
