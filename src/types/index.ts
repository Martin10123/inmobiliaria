// Tipos de autenticación
export * from './auth'

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

// ==========================================
// INVENTARIO
// ==========================================

// Categorías de inventario
export type InventoryCategory = 
  | 'tools' 
  | 'equipment' 
  | 'materials' 
  | 'supplies' 
  | 'vehicles' 
  | 'electronics'
  | 'furniture'
  | 'safety'
  | 'other'

// Estado del item
export type InventoryStatus = 
  | 'available'
  | 'in-use'
  | 'maintenance'
  | 'damaged'
  | 'out-of-stock'

// Tipo de movimiento
export type MovementType = 
  | 'entry'        // Entrada
  | 'exit'         // Salida
  | 'adjustment'   // Ajuste
  | 'transfer'     // Transferencia
  | 'return'       // Devolución
  | 'loss'         // Pérdida/Baja

// Item de Inventario
export interface InventoryItem {
  id: string
  code: string // Código único del producto
  name: string
  description: string
  category: InventoryCategory
  status: InventoryStatus
  
  // Stock
  stock: number
  minStock: number
  maxStock?: number
  unit: string // Unidad de medida (pcs, kg, m, etc.)
  
  // Ubicación
  location: string
  warehouse?: string
  
  // Financiero
  unitPrice: number
  totalValue: number
  
  // Proveedor
  supplierId?: string
  supplierName?: string
  
  // Metadata
  lastRestockDate?: string
  createdAt: string
  updatedAt: string
  createdBy: string
  image?: string
}

// Formulario de Item
export interface InventoryFormData {
  name: string
  description: string
  category: InventoryCategory
  stock: number
  minStock: number
  maxStock?: number
  unit: string
  location: string
  warehouse?: string
  unitPrice: number
  supplierId?: string
  image?: string
}

// Movimiento de Inventario
export interface InventoryMovement {
  id: string
  itemId: string
  itemName: string
  itemCode: string
  type: MovementType
  quantity: number
  previousStock: number
  newStock: number
  reason: string
  reference?: string // Número de documento de referencia
  userId: string
  userName: string
  createdAt: string
  notes?: string
}

// ============================================
// CRM (Clientes) Types
// ============================================

export type CustomerType = 'individual' | 'small-business' | 'corporate' | 'government'
export type CustomerLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'vip'
export type CustomerSource = 'referral' | 'marketing' | 'web' | 'event' | 'cold-call' | 'other'
export type CustomerStatus = 'active' | 'inactive' | 'at-risk' | 'lost'
export type InteractionType = 'meeting' | 'call' | 'email' | 'quote' | 'contract' | 'payment' | 'complaint' | 'follow-up'
export type InteractionSentiment = 'positive' | 'neutral' | 'negative'
export type NPSCategory = 'promoter' | 'passive' | 'detractor'
export type DocumentStatus = 'active' | 'expired' | 'pending-renewal'
export type CustomerDocumentType = 'contract' | 'quote' | 'invoice' | 'nda' | 'permit' | 'other'

export type CustomerSegment = 
  | 'champions' 
  | 'loyal' 
  | 'whales'
  | 'at-risk' 
  | 'hibernating'
  | 'lost'
  | 'new'
  | 'potential'

export interface SegmentDefinition {
  id: CustomerSegment
  name: string
  description: string
  color: string
  bgColor: string
  criteria: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  actions: string[]
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role?: string
  avatar?: string
}

export interface RFMMetrics {
  recency: number // días desde último contacto
  frequency: number // número total de proyectos
  monetary: number // valor total histórico
  score: number // calculado de 0-100
}

export interface NPSData {
  lastSurvey?: string
  score?: number // 0-10
  category?: NPSCategory
  comments: string[]
}

export interface CustomerProjects {
  total: number
  active: number
  completed: number
  cancelled: number
  budgetComplianceRate: number // %
  deadlineComplianceRate: number // %
}

export type OpportunityStage = 
  | 'lead' 
  | 'prospect' 
  | 'qualified' 
  | 'proposal' 
  | 'negotiation' 
  | 'contract' 
  | 'execution' 
  | 'post-sale'

export type NextActionType = 'meeting' | 'call' | 'email' | 'presentation' | 'follow-up' | 'other'

export interface NextAction {
  type: NextActionType
  date: string
  responsible: User
  objective: string
}

export interface OpportunityChange {
  date: string
  change: string
  user?: User
}

export interface Opportunity {
  id: string
  name: string
  customerId: string
  customerName: string
  estimatedValue: number
  closeProbability: number // 0-100
  stage: OpportunityStage
  estimatedCloseDate: string
  competitors: string[]
  strengths: string[]
  weaknesses: string[]
  nextAction: NextAction
  history: OpportunityChange[]
  createdDate: string
  assignedTo: User
  tags: string[]
  description: string
  projectId?: string // Vinculado cuando se convierte en proyecto (contract/execution/post-sale)
}

export interface CustomerInteraction {
  id: string
  type: InteractionType
  date: string
  user: User
  description: string
  sentiment?: InteractionSentiment
  tags: string[]
  attachments: string[]
}

export interface CustomerPredictions {
  churnProbability: number // 0-1
  nextPurchaseDate?: string
  nextPurchaseValue?: number
  suggestedServices: string[]
  bestContactTime?: string
  churnReasons?: string[]
}

export interface CustomerDocument {
  id: string
  name: string
  type: CustomerDocumentType
  issueDate: string
  expiryDate?: string
  status: DocumentStatus
  filePath: string
  size: number
  uploadedBy: User
}

export interface Customer {
  id: string
  name: string
  type: CustomerType
  nit?: string
  phone: string
  email: string
  address: string
  city: string
  country: string
  website?: string
  
  // Clasificación
  level: CustomerLevel
  source: CustomerSource
  accountExecutive: User
  
  // Métricas RFM
  rfm: RFMMetrics
  
  // Financiero
  clv: number // Customer Lifetime Value
  historicRevenue: number
  projectedRevenue: number
  pendingDebt: number
  creditLimit: number
  
  // Satisfacción
  nps: NPSData
  satisfactionScore: number // 0-100
  
  // Proyectos
  projects: CustomerProjects
  
  // Oportunidades
  activeOpportunities: Opportunity[]
  
  // Interacciones
  interactions: CustomerInteraction[]
  
  // Predicciones IA
  predictions: CustomerPredictions
  
  // Segmentación
  segment: string
  tags: string[]
  
  // Documentos
  documents: CustomerDocument[]
  
  // Auditoría
  registrationDate: string
  lastInteraction?: string
  status: CustomerStatus
  createdBy: User
  modifiedBy: User
  lastModified: string
}

export interface CustomerFormData {
  name: string
  type: CustomerType
  nit?: string
  phone: string
  email: string
  address: string
  city: string
  country: string
  website?: string
  level: CustomerLevel
  source: CustomerSource
  accountExecutiveId: string
  creditLimit: number
  tags: string[]
}

// ========================================
// SOLICITUDES Y APROBACIONES
// ========================================

export type RequestType = 
  | 'material_requirement'
  | 'equipment_requirement'
  | 'loan'
  | 'maintenance'

export type RequestStatus = 
  | 'draft'
  | 'pending'
  | 'in_review'
  | 'approved'
  | 'rejected'
  | 'cancelled'
  | 'executed'

export type ApprovalStatus = 'pending' | 'approved' | 'rejected'

export interface RequestItem {
  id: string
  name: string
  description: string
  quantity: number
  unit: string
  estimatedCost?: number
}

export interface ApprovalLevel {
  level: number
  approverRole: string
  approverName: string
  approverId: string
  status: ApprovalStatus
  approvalDate?: string
  comments?: string
  responseTime?: number // horas
  mode?: ApprovalMode // 'dependent' o 'independent'
}

export interface Request {
  id: string
  code: string
  type: RequestType
  title: string
  description: string
  priority: Priority
  status: RequestStatus
  
  // Solicitante
  requestedBy: User
  requestedDate: string
  
  // Relaciones
  projectId?: string
  projectName?: string
  
  // Items solicitados
  items: RequestItem[]
  
  // Financiero
  estimatedAmount: number
  
  // Fechas
  requiredDate?: string
  approvalDeadline?: string
  
  // Flujo de aprobación
  approvalFlow: ApprovalLevel[]
  currentApprovalLevel: number
  
  // Documentos
  attachments?: string[]
  
  // Historial
  history: {
    date: string
    user: string
    action: string
    previousStatus?: RequestStatus
    newStatus: RequestStatus
    comments?: string
  }[]
  
  // Metadata
  createdAt: string
  updatedAt: string
}

export interface RequestFormData {
  type: RequestType
  title: string
  description: string
  priority: Priority
  projectId?: string
  items: RequestItem[]
  requiredDate?: string
}

// ========================================
// CONFIGURACIÓN DE FLUJOS DE APROBACIÓN
// ========================================

export type ApprovalMode = 'dependent' | 'independent'

export interface Approver {
  id: string
  name: string
  email: string
  role: string
  department?: string
  isActive: boolean
}

export interface ApprovalRule {
  minAmount?: number
  maxAmount?: number
  requiredApprovers: string[] // IDs de aprobadores
}

export interface RequestTypeConfig {
  id: string
  type: RequestType
  name: string
  description: string
  approvalMode: ApprovalMode // 'dependent' o 'independent'
  approvers: string[] // IDs de aprobadores disponibles
  rules: ApprovalRule[] // Reglas según monto
  isActive: boolean
  createdAt: string
  updatedAt: string
}
