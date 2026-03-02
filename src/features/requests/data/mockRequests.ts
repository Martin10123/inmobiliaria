import type { Request } from '@/types'

export const mockRequests: Request[] = [
  {
    id: '1',
    code: 'REQ-2026-001',
    type: 'material_requirement',
    title: 'Materiales para Fase de Acabados - Torre Empresarial',
    description: 'Necesarios para completar piso 5 según cronograma. Incluye cemento, arena y baldosas.',
    priority: 'high',
    status: 'pending',
    
    requestedBy: {
      id: 'usr-5',
      name: 'Pedro Martínez',
      email: 'pedro.martinez@empresa.com',
      role: 'Ingeniero de Obra'
    },
    requestedDate: '2026-03-01T09:30:00',
    
    projectId: 'proj-1',
    projectName: 'Torre Empresarial Centro',
    
    items: [
      {
        id: 'item-1',
        name: 'Cemento gris x 50kg',
        description: 'Cemento de uso general',
        quantity: 100,
        unit: 'bultos',
        estimatedCost: 25000
      },
      {
        id: 'item-2',
        name: 'Arena lavada',
        description: 'Arena lavada para mezcla',
        quantity: 5,
        unit: 'm³',
        estimatedCost: 180000
      },
      {
        id: 'item-3',
        name: 'Baldosa porcelanato 60x60cm',
        description: 'Color beige, acabado mate',
        quantity: 200,
        unit: 'm²',
        estimatedCost: 12000000
      }
    ],
    
    estimatedAmount: 12500000,
    requiredDate: '2026-03-10',
    approvalDeadline: '2026-03-05',
    
    approvalFlow: [
      {
        level: 1,
        approverRole: 'Project Manager',
        approverName: 'Carlos López',
        approverId: 'usr-1',
        status: 'pending',
      },
      {
        level: 2,
        approverRole: 'Cliente',
        approverName: 'Inmobiliaria XYZ',
        approverId: 'client-1',
        status: 'pending',
      }
    ],
    currentApprovalLevel: 1,
    
    history: [
      {
        date: '2026-03-01T09:30:00',
        user: 'Pedro Martínez',
        action: 'Solicitud creada',
        newStatus: 'pending',
      }
    ],
    
    createdAt: '2026-03-01T09:30:00',
    updatedAt: '2026-03-01T09:30:00',
  },
  
  {
    id: '2',
    code: 'REQ-2026-002',
    type: 'equipment_requirement',
    title: 'Herramientas Eléctricas para Instalaciones',
    description: 'Equipos necesarios para instalaciones eléctricas en piso 8',
    priority: 'medium',
    status: 'approved',
    
    requestedBy: {
      id: 'usr-6',
      name: 'Luis Ramírez',
      email: 'luis.ramirez@empresa.com',
      role: 'Electricista Senior'
    },
    requestedDate: '2026-02-28T14:20:00',
    
    projectId: 'proj-1',
    projectName: 'Torre Empresarial Centro',
    
    items: [
      {
        id: 'item-4',
        name: 'Taladro percutor',
        description: 'Taladro para concreto',
        quantity: 2,
        unit: 'unidad',
        estimatedCost: 800000
      },
      {
        id: 'item-5',
        name: 'Destornillador eléctrico',
        description: 'Con set de puntas',
        quantity: 3,
        unit: 'unidad',
        estimatedCost: 450000
      }
    ],
    
    estimatedAmount: 2050000,
    requiredDate: '2026-03-08',
    
    approvalFlow: [
      {
        level: 1,
        approverRole: 'Project Manager',
        approverName: 'Carlos López',
        approverId: 'usr-1',
        status: 'approved',
        approvalDate: '2026-02-28T16:45:00',
        comments: 'Aprobado. Verificar disponibilidad en inventario.',
        responseTime: 2.4
      }
    ],
    currentApprovalLevel: 2,
    
    history: [
      {
        date: '2026-02-28T14:20:00',
        user: 'Luis Ramírez',
        action: 'Solicitud creada',
        newStatus: 'pending',
      },
      {
        date: '2026-02-28T16:45:00',
        user: 'Carlos López',
        action: 'Solicitud aprobada',
        previousStatus: 'pending',
        newStatus: 'approved',
        comments: 'Aprobado. Verificar disponibilidad en inventario.'
      }
    ],
    
    createdAt: '2026-02-28T14:20:00',
    updatedAt: '2026-02-28T16:45:00',
  },
  
  {
    id: '3',
    code: 'REQ-2026-003',
    type: 'loan',
    title: 'Préstamo Estación Total para Levantamiento',
    description: 'Estación total requerida para levantamiento topográfico del lote 45',
    priority: 'high',
    status: 'approved',
    
    requestedBy: {
      id: 'usr-7',
      name: 'Ana Rodríguez',
      email: 'ana.rodriguez@empresa.com',
      role: 'Topógrafa'
    },
    requestedDate: '2026-03-02T08:15:00',
    
    projectId: 'proj-2',
    projectName: 'Urbanización Bosques del Norte',
    
    items: [
      {
        id: 'item-6',
        name: 'Estación Total Topcon IS-203',
        description: 'Préstamo por 7 días',
        quantity: 1,
        unit: 'unidad',
      }
    ],
    
    estimatedAmount: 0,
    requiredDate: '2026-03-05',
    
    approvalFlow: [
      {
        level: 1,
        approverRole: 'Responsable Inventario',
        approverName: 'Luis García',
        approverId: 'usr-8',
        status: 'approved',
        approvalDate: '2026-03-02T09:00:00',
        comments: 'Aprobado. Equipo disponible. Requiere firma de acta de préstamo.',
        responseTime: 0.75
      }
    ],
    currentApprovalLevel: 2,
    
    history: [
      {
        date: '2026-03-02T08:15:00',
        user: 'Ana Rodríguez',
        action: 'Solicitud creada',
        newStatus: 'pending',
      },
      {
        date: '2026-03-02T09:00:00',
        user: 'Luis García',
        action: 'Solicitud aprobada',
        previousStatus: 'pending',
        newStatus: 'approved',
        comments: 'Aprobado. Equipo disponible. Requiere firma de acta de préstamo.'
      }
    ],
    
    createdAt: '2026-03-02T08:15:00',
    updatedAt: '2026-03-02T09:00:00',
  },
  
  {
    id: '4',
    code: 'REQ-2026-004',
    type: 'maintenance',
    title: 'Mantenimiento Preventivo Grúa Torre',
    description: 'Mantenimiento preventivo programado según manual del fabricante',
    priority: 'medium',
    status: 'rejected',
    
    requestedBy: {
      id: 'usr-9',
      name: 'Roberto Silva',
      email: 'roberto.silva@empresa.com',
      role: 'Supervisor de Seguridad'
    },
    requestedDate: '2026-02-25T11:00:00',
    
    projectId: 'proj-1',
    projectName: 'Torre Empresarial Centro',
    
    items: [
      {
        id: 'item-7',
        name: 'Servicio de mantenimiento grúa',
        description: 'Mantenimiento completo 300 horas',
        quantity: 1,
        unit: 'servicio',
        estimatedCost: 8500000
      }
    ],
    
    estimatedAmount: 8500000,
    requiredDate: '2026-03-15',
    
    approvalFlow: [
      {
        level: 1,
        approverRole: 'Project Manager',
        approverName: 'Carlos López',
        approverId: 'usr-1',
        status: 'rejected',
        approvalDate: '2026-02-26T10:30:00',
        comments: 'Rechazado. Mantenimiento programado para abril. Aún no alcanza las 300 horas.',
        responseTime: 23.5
      }
    ],
    currentApprovalLevel: 1,
    
    history: [
      {
        date: '2026-02-25T11:00:00',
        user: 'Roberto Silva',
        action: 'Solicitud creada',
        newStatus: 'pending',
      },
      {
        date: '2026-02-26T10:30:00',
        user: 'Carlos López',
        action: 'Solicitud rechazada',
        previousStatus: 'pending',
        newStatus: 'rejected',
        comments: 'Rechazado. Mantenimiento programado para abril. Aún no alcanza las 300 horas.'
      }
    ],
    
    createdAt: '2026-02-25T11:00:00',
    updatedAt: '2026-02-26T10:30:00',
  },
  
  {
    id: '5',
    code: 'REQ-2026-005',
    type: 'material_requirement',
    title: 'Materiales para Cimentación - Urbanización',
    description: 'Materiales urgentes para continuar con fundaciones en zona norte',
    priority: 'high',
    status: 'in_review',
    
    requestedBy: {
      id: 'usr-10',
      name: 'Diana Torres',
      email: 'diana.torres@empresa.com',
      role: 'Residente de Obra'
    },
    requestedDate: '2026-03-02T07:00:00',
    
    projectId: 'proj-2',
    projectName: 'Urbanización Bosques del Norte',
    
    items: [
      {
        id: 'item-8',
        name: 'Acero de refuerzo #4',
        description: 'Varillas de 12m',
        quantity: 500,
        unit: 'varillas',
        estimatedCost: 7500000
      },
      {
        id: 'item-9',
        name: 'Concreto premezclado 3000 PSI',
        description: 'Para fundaciones',
        quantity: 80,
        unit: 'm³',
        estimatedCost: 28000000
      }
    ],
    
    estimatedAmount: 35500000,
    requiredDate: '2026-03-07',
    approvalDeadline: '2026-03-04',
    
    approvalFlow: [
      {
        level: 1,
        approverRole: 'Project Manager',
        approverName: 'María González',
        approverId: 'usr-2',
        status: 'approved',
        approvalDate: '2026-03-02T08:30:00',
        comments: 'Aprobado nivel 1. Escalando a gerencia por monto.',
        responseTime: 1.5
      },
      {
        level: 2,
        approverRole: 'Gerente Financiero',
        approverName: 'Laura Méndez',
        approverId: 'usr-11',
        status: 'pending',
      }
    ],
    currentApprovalLevel: 2,
    
    history: [
      {
        date: '2026-03-02T07:00:00',
        user: 'Diana Torres',
        action: 'Solicitud creada',
        newStatus: 'pending',
      },
      {
        date: '2026-03-02T08:30:00',
        user: 'María González',
        action: 'Aprobado nivel 1',
        previousStatus: 'pending',
        newStatus: 'in_review',
        comments: 'Aprobado nivel 1. Escalando a gerencia por monto.'
      }
    ],
    
    createdAt: '2026-03-02T07:00:00',
    updatedAt: '2026-03-02T08:30:00',
  },
]
