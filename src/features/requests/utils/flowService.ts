import type { ApprovalLevel, RequestTypeConfig } from '@/types'
import { mockRequestTypeConfigs, getConfigByType } from '../config/requestTypeConfigs'
import { getApproverById } from '../data/mockApprovers'

/**
 * Genera el flujo de aprobación basado en configuración dinámica
 * 
 * @param requestType - Tipo de solicitud
 * @param estimatedAmount - Monto total estimado
 * @returns Array de niveles de aprobación
 */
export function generateApprovalFlow(
  requestType: string,
  estimatedAmount: number
): ApprovalLevel[] {
  
  // 1. Obtener configuración del tipo de solicitud
  const config = getConfigByType(requestType)
  
  if (!config) {
    console.warn(`No se encontró configuración para tipo: ${requestType}`)
    return []
  }
  
  // 2. Determinar qué regla aplicar según el monto
  const applicableRule = config.rules.find(rule => {
    const meetsMin = rule.minAmount === undefined || estimatedAmount >= rule.minAmount
    const meetsMax = rule.maxAmount === undefined || estimatedAmount <= rule.maxAmount
    return meetsMin && meetsMax
  })
  
  if (!applicableRule) {
    console.warn(`No se encontró regla aplicable para monto: $${estimatedAmount}`)
    return []
  }
  
  // 3. Obtener los aprobadores requeridos
  const approverIds = applicableRule.requiredApprovers
  
  // 4. Construir niveles de aprobación
  const levels: ApprovalLevel[] = approverIds.map((approverId, index) => {
    const approver = getApproverById(approverId)
    
    if (!approver) {
      console.warn(`Aprobador no encontrado: ${approverId}`)
      return null
    }
    
    return {
      level: index + 1,
      approverId: approver.id,
      approverName: approver.name,
      approverRole: approver.role,
      status: 'pending',
      mode: config.approvalMode, // 'dependent' o 'independent'
    } as ApprovalLevel
  }).filter((level): level is ApprovalLevel => level !== null)
  
  return levels
}

/**
 * Valida si una configuración es correcta
 */
export function validateConfig(config: RequestTypeConfig): boolean {
  if (!config.type || !config.approvalMode) return false
  if (!config.rules || config.rules.length === 0) return false
  if (!config.approvers || config.approvers.length === 0) return false
  
  // Validar que todos los aprobadores existen
  for (const approverId of config.approvers) {
    const approver = getApproverById(approverId)
    if (!approver) {
      console.error(`Aprobador no encontrado en configuración: ${approverId}`)
      return false
    }
  }
  
  return true
}

/**
 * Verifica si una solicitud está completamente aprobada
 * 
 * MODO DEPENDENT: Todos los niveles deben estar en 'approved'
 * MODO INDEPENDENT: Al menos un nivel debe estar en 'approved'
 */
export function isRequestFullyApproved(levels: ApprovalLevel[]): boolean {
  if (!levels || levels.length === 0) return false
  
  const mode = levels[0]?.mode || 'dependent'
  
  if (mode === 'independent') {
    // Al menos uno aprobado
    return levels.some(level => level.status === 'approved')
  } else {
    // Todos aprobados
    return levels.every(level => level.status === 'approved')
  }
}

/**
 * Verifica si una solicitud está rechazada
 * 
 * En cualquier modo, si uno rechaza, se rechaza la solicitud completa
 */
export function isRequestRejected(levels: ApprovalLevel[]): boolean {
  return levels.some(level => level.status === 'rejected')
}

/**
 * Obtiene el siguiente nivel pendiente en modo dependiente
 */
export function getNextPendingLevel(levels: ApprovalLevel[]): ApprovalLevel | undefined {
  if (!levels || levels.length === 0) return undefined
  
  const mode = levels[0]?.mode || 'dependent'
  
  if (mode === 'dependent') {
    // En modo dependiente: buscar el primer pendiente en secuencia
    return levels.find(level => level.status === 'pending')
  } else {
    // En modo independiente: todos están "disponibles" simultáneamente
    return levels.find(level => level.status === 'pending')
  }
}

/**
 * Obtiene estadísticas de configuraciones
 */
export function getConfigStats() {
  const total = mockRequestTypeConfigs.length
  const dependent = mockRequestTypeConfigs.filter(c => c.approvalMode === 'dependent').length
  const independent = mockRequestTypeConfigs.filter(c => c.approvalMode === 'independent').length
  const active = mockRequestTypeConfigs.filter(c => c.isActive).length
  
  return {
    total,
    dependent,
    independent,
    active,
    inactive: total - active
  }
}
