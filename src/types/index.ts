// Tipos de estado de proyectos
export type ProjectStatus = 'planning' | 'in-progress' | 'paused' | 'completed' | 'cancelled'

// Tipos de proyectos
export type ProjectType = 'construction' | 'remodeling' | 'urbanization' | 'other'

// Prioridad
export type Priority = 'low' | 'medium' | 'high'

// Estados de tareas
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled'

// Tipos de eventos
export type EventType = 
  | 'PROJECT_CREATED' 
  | 'PROJECT_STATUS_CHANGED' 
  | 'PROJECT_DEADLINE_APPROACHING'
  | 'PROJECT_OVERBUDGET'
  | 'PROJECT_TASK_DELAYED'
  | 'PROJECT_PHASE_COMPLETED'
  | 'TASK_CREATED'
  | 'TASK_UPDATED'
  | 'TASK_COMPLETED'
  | 'DOCUMENT_UPLOADED'
  | 'TEAM_MEMBER_ADDED'

// Tipos de documentos
export type DocumentType = 'plan' | 'permit' | 'license' | 'contract' | 'photo' | 'other'

// Roles de equipo
export type TeamRole = 'manager' | 'architect' | 'engineer' | 'contractor' | 'supervisor' | 'other'

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

// Tareas del Proyecto
export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: TaskStatus
  priority: Priority
  assignedTo: string
  assignedToName: string
  dueDate: string
  startDate?: string
  completedDate?: string
  estimatedHours?: number
  actualHours?: number
  progress: number
  dependencies?: string[] // IDs de otras tareas
  createdAt: string
  updatedAt: string
}

// Eventos del Proyecto
export interface ProjectEvent {
  id: string
  projectId: string
  type: EventType
  title: string
  description: string
  metadata?: Record<string, any>
  userId: string // ID del usuario que generó el evento
  createdAt: string
  createdBy: string
  createdByName: string
}

// Documentos
export interface ProjectDocument {
  id: string
  projectId: string
  name: string
  type: DocumentType
  url: string
  fileName: string
  size: number
  description?: string
  uploadedBy: string
  uploadedByName: string
  uploadedAt: string
  version: number
  tags?: string[]
}

// Miembro del Equipo
export interface TeamMember {
  id: string
  projectId: string
  userId: string
  name: string
  email: string
  phone?: string
  role: TeamRole
  joinedAt: string
  workload?: number // porcentaje de carga de trabajo
  hoursWorked: number
  projects: string[] // IDs de proyectos
}

// Fase del Proyecto
export interface ProjectPhase {
  id: string
  projectId: string
  name: string
  description: string
  startDate: string
  endDate: string
  progress: number
  status: 'pending' | 'active' | 'completed'
  order: number
  deliverables?: string[]
}

// Actividad/Historial
export interface ActivityLog {
  id: string
  projectId: string
  action: string
  description: string
  userId: string
  userName: string
  createdAt: string
  metadata?: Record<string, any>
}
