import type { RequestType, ApprovalLevel } from '@/types'

// ========================================
// USUARIOS DEL SISTEMA (Mock)
// ========================================

export const APPROVERS = {
  // Project Managers
  PM_CARLOS: {
    id: 'usr-1',
    name: 'Carlos López',
    role: 'Project Manager'
  },
  PM_MARIA: {
    id: 'usr-2',
    name: 'María González',
    role: 'Project Manager'
  },
  
  // Gerentes
  GERENTE_FINANCIERO: {
    id: 'usr-11',
    name: 'Laura Méndez',
    role: 'Gerente Financiero'
  },
  GERENTE_PROYECTOS: {
    id: 'usr-12',
    name: 'Roberto Silva',
    role: 'Gerente de Proyectos'
  },
  GERENTE_OPERACIONES: {
    id: 'usr-13',
    name: 'Daniela Torres',
    role: 'Gerente de Operaciones'
  },
  
  // Responsables de área
  RESPONSABLE_INVENTARIO: {
    id: 'usr-8',
    name: 'Luis García',
    role: 'Responsable de Inventario'
  },
  RESPONSABLE_COMPRAS: {
    id: 'usr-14',
    name: 'Andrea Ramírez',
    role: 'Responsable de Compras'
  },
  RESPONSABLE_MANTENIMIENTO: {
    id: 'usr-15',
    name: 'Jorge Morales',
    role: 'Responsable de Mantenimiento'
  },
}

// ========================================
// REGLAS DE APROBACIÓN
// ========================================

/**
 * Define el flujo de aprobación automáticamente según:
 * - Tipo de solicitud
 * - Monto estimado
 * - Otros criterios
 */
export function determineApprovalFlow(
  type: RequestType,
  estimatedAmount: number
): ApprovalLevel[] {
  const flow: ApprovalLevel[] = []

  switch (type) {
    case 'material_requirement':
      // Nivel 1: Siempre PM
      flow.push({
        level: 1,
        approverRole: APPROVERS.PM_CARLOS.role,
        approverName: APPROVERS.PM_CARLOS.name,
        approverId: APPROVERS.PM_CARLOS.id,
        status: 'pending'
      })

      // Nivel 2: Si monto > $10M → Gerente Financiero
      if (estimatedAmount > 10000000) {
        flow.push({
          level: 2,
          approverRole: APPROVERS.GERENTE_FINANCIERO.role,
          approverName: APPROVERS.GERENTE_FINANCIERO.name,
          approverId: APPROVERS.GERENTE_FINANCIERO.id,
          status: 'pending'
        })
      }

      // Nivel 3: Si monto > $30M → Gerente de Proyectos
      if (estimatedAmount > 30000000) {
        flow.push({
          level: 3,
          approverRole: APPROVERS.GERENTE_PROYECTOS.role,
          approverName: APPROVERS.GERENTE_PROYECTOS.name,
          approverId: APPROVERS.GERENTE_PROYECTOS.id,
          status: 'pending'
        })
      }
      break

    case 'equipment_requirement':
      // Nivel 1: PM o Responsable de Compras según monto
      if (estimatedAmount < 5000000) {
        flow.push({
          level: 1,
          approverRole: APPROVERS.PM_CARLOS.role,
          approverName: APPROVERS.PM_CARLOS.name,
          approverId: APPROVERS.PM_CARLOS.id,
          status: 'pending'
        })
      } else {
        flow.push({
          level: 1,
          approverRole: APPROVERS.RESPONSABLE_COMPRAS.role,
          approverName: APPROVERS.RESPONSABLE_COMPRAS.name,
          approverId: APPROVERS.RESPONSABLE_COMPRAS.id,
          status: 'pending'
        })
        
        // Nivel 2: Si es caro, también Gerente de Operaciones
        if (estimatedAmount > 10000000) {
          flow.push({
            level: 2,
            approverRole: APPROVERS.GERENTE_OPERACIONES.role,
            approverName: APPROVERS.GERENTE_OPERACIONES.name,
            approverId: APPROVERS.GERENTE_OPERACIONES.id,
            status: 'pending'
          })
        }
      }
      break

    case 'loan':
      // Nivel 1: Responsable de Inventario (siempre)
      flow.push({
        level: 1,
        approverRole: APPROVERS.RESPONSABLE_INVENTARIO.role,
        approverName: APPROVERS.RESPONSABLE_INVENTARIO.name,
        approverId: APPROVERS.RESPONSABLE_INVENTARIO.id,
        status: 'pending'
      })
      break

    case 'maintenance':
      // Nivel 1: Responsable de Mantenimiento
      flow.push({
        level: 1,
        approverRole: APPROVERS.RESPONSABLE_MANTENIMIENTO.role,
        approverName: APPROVERS.RESPONSABLE_MANTENIMIENTO.name,
        approverId: APPROVERS.RESPONSABLE_MANTENIMIENTO.id,
        status: 'pending'
      })

      // Nivel 2: Si monto > $5M → PM
      if (estimatedAmount > 5000000) {
        flow.push({
          level: 2,
          approverRole: APPROVERS.PM_CARLOS.role,
          approverName: APPROVERS.PM_CARLOS.name,
          approverId: APPROVERS.PM_CARLOS.id,
          status: 'pending'
        })
      }

      // Nivel 3: Si monto > $15M → Gerente de Operaciones
      if (estimatedAmount > 15000000) {
        flow.push({
          level: 3,
          approverRole: APPROVERS.GERENTE_OPERACIONES.role,
          approverName: APPROVERS.GERENTE_OPERACIONES.name,
          approverId: APPROVERS.GERENTE_OPERACIONES.id,
          status: 'pending'
        })
      }
      break
  }

  return flow
}

/**
 * Obtiene un resumen textual del flujo de aprobación
 */
export function getApprovalFlowSummary(flow: ApprovalLevel[]): string {
  if (flow.length === 0) return 'Sin aprobadores'
  if (flow.length === 1) return `${flow[0].approverName}`
  
  const names = flow.map(f => f.approverName)
  return names.join(' → ')
}

/**
 * Calcula el tiempo estimado de aprobación total (en días)
 */
export function getEstimatedApprovalTime(flow: ApprovalLevel[]): number {
  // Estimación: 1 día por nivel de aprobación
  return flow.length * 1
}
