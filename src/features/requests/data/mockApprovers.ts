import type { Approver } from '@/types'

/**
 * Lista de aprobadores disponibles en el sistema
 * Estos usuarios pueden ser asignados a flujos de aprobación
 */
export const mockApprovers: Approver[] = [
  // Project Managers
  {
    id: 'usr-1',
    name: 'Carlos López',
    email: 'carlos.lopez@empresa.com',
    role: 'Project Manager',
    department: 'Proyectos',
    isActive: true
  },
  {
    id: 'usr-2',
    name: 'María González',
    email: 'maria.gonzalez@empresa.com',
    role: 'Project Manager',
    department: 'Proyectos',
    isActive: true
  },
  
  // Gerentes
  {
    id: 'usr-11',
    name: 'Laura Méndez',
    email: 'laura.mendez@empresa.com',
    role: 'Gerente Financiero',
    department: 'Finanzas',
    isActive: true
  },
  {
    id: 'usr-12',
    name: 'Roberto Silva',
    email: 'roberto.silva@empresa.com',
    role: 'Gerente de Proyectos',
    department: 'Proyectos',
    isActive: true
  },
  {
    id: 'usr-13',
    name: 'Daniela Torres',
    email: 'daniela.torres@empresa.com',
    role: 'Gerente de Operaciones',
    department: 'Operaciones',
    isActive: true
  },
  
  // Responsables de Área
  {
    id: 'usr-8',
    name: 'Luis García',
    email: 'luis.garcia@empresa.com',
    role: 'Responsable de Inventario',
    department: 'Logística',
    isActive: true
  },
  {
    id: 'usr-14',
    name: 'Andrea Ramírez',
    email: 'andrea.ramirez@empresa.com',
    role: 'Responsable de Compras',
    department: 'Compras',
    isActive: true
  },
  {
    id: 'usr-15',
    name: 'Jorge Morales',
    email: 'jorge.morales@empresa.com',
    role: 'Responsable de Mantenimiento',
    department: 'Mantenimiento',
    isActive: true
  },
  
  // Supervisores
  {
    id: 'usr-16',
    name: 'Patricia Ruiz',
    email: 'patricia.ruiz@empresa.com',
    role: 'Supervisor de Obra',
    department: 'Construcción',
    isActive: true
  },
  {
    id: 'usr-17',
    name: 'Fernando Castro',
    email: 'fernando.castro@empresa.com',
    role: 'Supervisor de Calidad',
    department: 'Calidad',
    isActive: true
  },
]

/**
 * Buscar aprobador por ID
 */
export function getApproverById(id: string): Approver | undefined {
  return mockApprovers.find(a => a.id === id)
}

/**
 * Obtener aprobadores por departamento
 */
export function getApproversByDepartment(department: string): Approver[] {
  return mockApprovers.filter(a => a.department === department && a.isActive)
}

/**
 * Obtener aprobadores activos
 */
export function getActiveApprovers(): Approver[] {
  return mockApprovers.filter(a => a.isActive)
}
