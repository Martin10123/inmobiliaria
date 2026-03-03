import type { RequestTypeConfig } from '@/types'

/**
 * Configuraciones de flujos de aprobación por tipo de solicitud
 * 
 * MODOS DE APROBACIÓN:
 * - 'dependent': Todos los aprobadores deben aprobar en secuencia (Nivel 1 → 2 → 3)
 * - 'independent': Con que uno apruebe es suficiente (paralelo)
 */
export const mockRequestTypeConfigs: RequestTypeConfig[] = [
  // ========================================
  // REQUERIMIENTO DE MATERIALES
  // ========================================
  {
    id: 'config-1',
    type: 'material_requirement',
    name: 'Requerimiento de Materiales',
    description: 'Solicitud de materiales de construcción para proyectos',
    approvalMode: 'dependent', // Todos deben aprobar en orden
    
    // Aprobadores disponibles para este tipo
    approvers: [
      'usr-1',  // Carlos López (PM)
      'usr-2',  // María González (PM)
      'usr-11', // Laura Méndez (Gte. Financiero)
      'usr-12', // Roberto Silva (Gte. Proyectos)
    ],
    
    // Reglas según monto
    rules: [
      {
        // Regla 1: Montos < $10M
        maxAmount: 10000000,
        requiredApprovers: ['usr-1'] // Solo Carlos López
      },
      {
        // Regla 2: Montos $10M - $30M
        minAmount: 10000000,
        maxAmount: 30000000,
        requiredApprovers: ['usr-1', 'usr-11'] // Carlos + Laura
      },
      {
        // Regla 3: Montos > $30M
        minAmount: 30000000,
        requiredApprovers: ['usr-1', 'usr-11', 'usr-12'] // Carlos + Laura + Roberto
      }
    ],
    
    isActive: true,
    createdAt: '2026-01-01T00:00:00',
    updatedAt: '2026-03-01T00:00:00'
  },

  // ========================================
  // REQUERIMIENTO DE EQUIPOS
  // ========================================
  {
    id: 'config-2',
    type: 'equipment_requirement',
    name: 'Requerimiento de Equipos',
    description: 'Solicitud de herramientas y equipos de trabajo',
    approvalMode: 'dependent', // Todos deben aprobar
    
    approvers: [
      'usr-1',  // Carlos López (PM)
      'usr-14', // Andrea Ramírez (Resp. Compras)
      'usr-13', // Daniela Torres (Gte. Operaciones)
    ],
    
    rules: [
      {
        // Regla 1: Montos < $5M
        maxAmount: 5000000,
        requiredApprovers: ['usr-1'] // Solo PM
      },
      {
        // Regla 2: Montos $5M - $10M
        minAmount: 5000000,
        maxAmount: 10000000,
        requiredApprovers: ['usr-14'] // Resp. Compras
      },
      {
        // Regla 3: Montos > $10M
        minAmount: 10000000,
        requiredApprovers: ['usr-14', 'usr-13'] // Compras + Gte. Operaciones
      }
    ],
    
    isActive: true,
    createdAt: '2026-01-01T00:00:00',
    updatedAt: '2026-03-01T00:00:00'
  },

  // ========================================
  // PRÉSTAMO DE EQUIPOS
  // ========================================
  {
    id: 'config-3',
    type: 'loan',
    name: 'Préstamo de Equipos',
    description: 'Préstamo temporal de equipos del inventario',
    approvalMode: 'independent', // Con que uno apruebe es suficiente
    
    approvers: [
      'usr-8',  // Luis García (Resp. Inventario)
      'usr-1',  // Carlos López (PM)
      'usr-16', // Patricia Ruiz (Supervisor)
    ],
    
    rules: [
      {
        // Cualquier monto - cualquiera de los 3 puede aprobar
        requiredApprovers: ['usr-8', 'usr-1', 'usr-16']
      }
    ],
    
    isActive: true,
    createdAt: '2026-01-01T00:00:00',
    updatedAt: '2026-03-01T00:00:00'
  },

  // ========================================
  // MANTENIMIENTO
  // ========================================
  {
    id: 'config-4',
    type: 'maintenance',
    name: 'Solicitud de Mantenimiento',
    description: 'Mantenimiento preventivo o correctivo de equipos',
    approvalMode: 'dependent', // Todos deben aprobar en orden
    
    approvers: [
      'usr-15', // Jorge Morales (Resp. Mantenimiento)
      'usr-1',  // Carlos López (PM)
      'usr-13', // Daniela Torres (Gte. Operaciones)
    ],
    
    rules: [
      {
        // Regla 1: Montos < $5M
        maxAmount: 5000000,
        requiredApprovers: ['usr-15'] // Solo Resp. Mantenimiento
      },
      {
        // Regla 2: Montos $5M - $15M
        minAmount: 5000000,
        maxAmount: 15000000,
        requiredApprovers: ['usr-15', 'usr-1'] // Mantenimiento + PM
      },
      {
        // Regla 3: Montos > $15M
        minAmount: 15000000,
        requiredApprovers: ['usr-15', 'usr-1', 'usr-13'] // Mantenimiento + PM + Gte. Operaciones
      }
    ],
    
    isActive: true,
    createdAt: '2026-01-01T00:00:00',
    updatedAt: '2026-03-01T00:00:00'
  },
]

/**
 * Obtener configuración por tipo de solicitud
 */
export function getConfigByType(type: string): RequestTypeConfig | undefined {
  return mockRequestTypeConfigs.find(c => c.type === type && c.isActive)
}

/**
 * Obtener todas las configuraciones activas
 */
export function getActiveConfigs(): RequestTypeConfig[] {
  return mockRequestTypeConfigs.filter(c => c.isActive)
}
