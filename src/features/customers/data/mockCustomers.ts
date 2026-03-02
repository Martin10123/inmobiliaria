import type { Customer } from '@/types'

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Constructora ABC S.A.',
    type: 'corporate',
    nit: '900.123.456-7',
    phone: '+57 310 123 4567',
    email: 'contacto@constructoraabc.com',
    address: 'Calle 100 #15-20, Oficina 501',
    city: 'Bogotá',
    country: 'Colombia',
    website: 'www.constructoraabc.com',
    
    level: 'platinum',
    source: 'referral',
    accountExecutive: {
      id: 'exec1',
      name: 'María González',
      email: 'maria.gonzalez@nexus.com',
      phone: '+57 310 111 2222'
    },
    
    rfm: {
      recency: 15, // días desde último contacto
      frequency: 8, // número total de proyectos
      monetary: 450000000, // valor total histórico
      score: 95
    },
    
    clv: 650000000,
    historicRevenue: 450000000,
    projectedRevenue: 200000000,
    pendingDebt: 0,
    creditLimit: 150000000,
    
    nps: {
      lastSurvey: '2026-02-20',
      score: 9,
      category: 'promoter',
      comments: [
        'Excelente calidad y cumplimiento',
        'Muy profesionales en la ejecución'
      ]
    },
    satisfactionScore: 92,
    
    projects: {
      total: 8,
      active: 2,
      completed: 5,
      cancelled: 1,
      budgetComplianceRate: 94,
      deadlineComplianceRate: 88
    },
    
    activeOpportunities: [
      {
        id: 'opp1',
        name: 'Remodelación Sede Norte',
        estimatedValue: 85000000,
        closeProbability: 80,
        stage: 'negotiation',
        estimatedCloseDate: '2026-03-20'
      }
    ],
    
    interactions: [
      {
        id: 'int1',
        type: 'meeting',
        date: '2026-02-28',
        user: {
          id: 'exec1',
          name: 'María González',
          email: 'maria.gonzalez@nexus.com'
        },
        description: 'Reunión de seguimiento proyecto Sede Sur. Cliente satisfecho con avances.',
        sentiment: 'positive',
        tags: ['seguimiento', 'satisfacción'],
        attachments: ['acta_reunion_feb28.pdf']
      },
      {
        id: 'int2',
        type: 'quote',
        date: '2026-02-15',
        user: {
          id: 'exec1',
          name: 'María González',
          email: 'maria.gonzalez@nexus.com'
        },
        description: 'Cotización enviada para Remodelación Sede Norte - $85M',
        sentiment: 'neutral',
        tags: ['cotización', 'remodelación'],
        attachments: ['COT-2026-015.pdf']
      }
    ],
    
    predictions: {
      churnProbability: 0.05,
      nextPurchaseDate: '2026-06-15',
      nextPurchaseValue: 120000000,
      suggestedServices: ['Diseño arquitectónico', 'Gestión ambiental'],
      bestContactTime: '2026-03-10T10:00:00',
      churnReasons: []
    },
    
    segment: 'champions',
    tags: ['corporativo', 'recurrente', 'alto-valor'],
    
    documents: [
      {
        id: 'doc1',
        name: 'Contrato Marco 2026',
        type: 'contract',
        issueDate: '2026-01-15',
        expiryDate: '2026-12-31',
        status: 'active',
        filePath: '/documents/contracts/ABC_2026.pdf',
        size: 2456789,
        uploadedBy: {
          id: 'exec1',
          name: 'María González',
          email: 'maria.gonzalez@nexus.com'
        }
      }
    ],
    
    registrationDate: '2023-05-10',
    lastInteraction: '2026-02-28',
    status: 'active',
    createdBy: {
      id: 'admin1',
      name: 'Admin Sistema',
      email: 'admin@nexus.com'
    },
    modifiedBy: {
      id: 'exec1',
      name: 'María González',
      email: 'maria.gonzalez@nexus.com'
    },
    lastModified: '2026-02-28'
  },
  
  {
    id: '2',
    name: 'Inversiones El Roble Ltda.',
    type: 'small-business',
    nit: '800.987.654-3',
    phone: '+57 315 9876543',
    email: 'info@elroble.com',
    address: 'Carrera 45 #28-15',
    city: 'Medellín',
    country: 'Colombia',
    website: 'www.inversioneselroble.com',
    
    level: 'gold',
    source: 'marketing',
    accountExecutive: {
      id: 'exec2',
      name: 'Carlos Ramírez',
      email: 'carlos.ramirez@nexus.com',
      phone: '+57 320 222 3333'
    },
    
    rfm: {
      recency: 45,
      frequency: 4,
      monetary: 180000000,
      score: 72
    },
    
    clv: 250000000,
    historicRevenue: 180000000,
    projectedRevenue: 70000000,
    pendingDebt: 15000000,
    creditLimit: 50000000,
    
    nps: {
      lastSurvey: '2025-11-10',
      score: 7,
      category: 'passive',
      comments: [
        'Buen trabajo pero podrían mejorar tiempos de respuesta'
      ]
    },
    satisfactionScore: 75,
    
    projects: {
      total: 4,
      active: 0,
      completed: 3,
      cancelled: 1,
      budgetComplianceRate: 85,
      deadlineComplianceRate: 75
    },
    
    activeOpportunities: [],
    
    interactions: [
      {
        id: 'int3',
        type: 'call',
        date: '2026-01-18',
        user: {
          id: 'exec2',
          name: 'Carlos Ramírez',
          email: 'carlos.ramirez@nexus.com'
        },
        description: 'Llamada de seguimiento. Cliente interesado en nuevo proyecto para Q2.',
        sentiment: 'neutral',
        tags: ['seguimiento', 'prospección'],
        attachments: []
      }
    ],
    
    predictions: {
      churnProbability: 0.35,
      nextPurchaseDate: '2026-05-01',
      nextPurchaseValue: 60000000,
      suggestedServices: ['Consultoría técnica'],
      bestContactTime: '2026-03-15T14:00:00',
      churnReasons: ['Inactividad prolongada', 'Baja frecuencia de contacto']
    },
    
    segment: 'at-risk',
    tags: ['pequeña-empresa', 'deuda-pendiente'],
    
    documents: [
      {
        id: 'doc2',
        name: 'Contrato Proyecto Torres del Bosque',
        type: 'contract',
        issueDate: '2025-03-10',
        expiryDate: '2025-12-31',
        status: 'expired',
        filePath: '/documents/contracts/Roble_2025.pdf',
        size: 1234567,
        uploadedBy: {
          id: 'exec2',
          name: 'Carlos Ramírez',
          email: 'carlos.ramirez@nexus.com'
        }
      }
    ],
    
    registrationDate: '2024-01-20',
    lastInteraction: '2026-01-18',
    status: 'at-risk',
    createdBy: {
      id: 'exec2',
      name: 'Carlos Ramírez',
      email: 'carlos.ramirez@nexus.com'
    },
    modifiedBy: {
      id: 'exec2',
      name: 'Carlos Ramírez',
      email: 'carlos.ramirez@nexus.com'
    },
    lastModified: '2026-01-18'
  },
  
  {
    id: '3',
    name: 'Juan Carlos Pérez',
    type: 'individual',
    phone: '+57 318 5554444',
    email: 'jcperez@email.com',
    address: 'Calle 85 #12-34, Apto 302',
    city: 'Cali',
    country: 'Colombia',
    
    level: 'silver',
    source: 'web',
    accountExecutive: {
      id: 'exec3',
      name: 'Ana Martínez',
      email: 'ana.martinez@nexus.com',
      phone: '+57 314 333 4444'
    },
    
    rfm: {
      recency: 8,
      frequency: 2,
      monetary: 45000000,
      score: 68
    },
    
    clv: 65000000,
    historicRevenue: 45000000,
    projectedRevenue: 20000000,
    pendingDebt: 0,
    creditLimit: 20000000,
    
    nps: {
      lastSurvey: '2026-01-30',
      score: 10,
      category: 'promoter',
      comments: [
        'Increíble atención al detalle',
        'Superaron mis expectativas'
      ]
    },
    satisfactionScore: 98,
    
    projects: {
      total: 2,
      active: 1,
      completed: 1,
      cancelled: 0,
      budgetComplianceRate: 100,
      deadlineComplianceRate: 100
    },
    
    activeOpportunities: [
      {
        id: 'opp2',
        name: 'Ampliación Casa Campestre',
        estimatedValue: 35000000,
        closeProbability: 65,
        stage: 'proposal-sent',
        estimatedCloseDate: '2026-03-30'
      }
    ],
    
    interactions: [
      {
        id: 'int4',
        type: 'meeting',
        date: '2026-02-25',
        user: {
          id: 'exec3',
          name: 'Ana Martínez',
          email: 'ana.martinez@nexus.com'
        },
        description: 'Visita al proyecto en ejecución. Cliente muy satisfecho con avances.',
        sentiment: 'positive',
        tags: ['visita-obra', 'satisfacción'],
        attachments: []
      }
    ],
    
    predictions: {
      churnProbability: 0.08,
      nextPurchaseDate: '2026-08-01',
      nextPurchaseValue: 40000000,
      suggestedServices: ['Paisajismo', 'Decoración interior'],
      bestContactTime: '2026-03-20T16:00:00',
      churnReasons: []
    },
    
    segment: 'loyal-customers',
    tags: ['persona-natural', 'promotor', 'referencias'],
    
    documents: [],
    
    registrationDate: '2025-06-15',
    lastInteraction: '2026-02-25',
    status: 'active',
    createdBy: {
      id: 'exec3',
      name: 'Ana Martínez',
      email: 'ana.martinez@nexus.com'
    },
    modifiedBy: {
      id: 'exec3',
      name: 'Ana Martínez',
      email: 'ana.martinez@nexus.com'
    },
    lastModified: '2026-02-25'
  },
  
  {
    id: '4',
    name: 'Alcaldía de Villa Nueva',
    type: 'government',
    nit: '899.999.999-0',
    phone: '+57 312 7778888',
    email: 'proyectos@villanueva.gov.co',
    address: 'Plaza Principal edificio Municipal',
    city: 'Villa Nueva',
    country: 'Colombia',
    website: 'www.villanueva.gov.co',
    
    level: 'vip',
    source: 'event',
    accountExecutive: {
      id: 'exec1',
      name: 'María González',
      email: 'maria.gonzalez@nexus.com',
      phone: '+57 310 111 2222'
    },
    
    rfm: {
      recency: 120,
      frequency: 3,
      monetary: 520000000,
      score: 78
    },
    
    clv: 800000000,
    historicRevenue: 520000000,
    projectedRevenue: 280000000,
    pendingDebt: 0,
    creditLimit: 300000000,
    
    nps: {
      lastSurvey: '2025-08-15',
      score: 8,
      category: 'passive',
      comments: [
        'Buenos proyectos pero procesos muy lentos'
      ]
    },
    satisfactionScore: 82,
    
    projects: {
      total: 3,
      active: 0,
      completed: 2,
      cancelled: 1,
      budgetComplianceRate: 92,
      deadlineComplianceRate: 70
    },
    
    activeOpportunities: [
      {
        id: 'opp3',
        name: 'Parque Recreativo Municipal',
        estimatedValue: 280000000,
        closeProbability: 45,
        stage: 'qualified',
        estimatedCloseDate: '2026-05-15'
      }
    ],
    
    interactions: [
      {
        id: 'int5',
        type: 'email',
        date: '2025-11-05',
        user: {
          id: 'exec1',
          name: 'María González',
          email: 'maria.gonzalez@nexus.com'
        },
        description: 'Email de seguimiento sobre licitación parque municipal. Esperando respuesta.',
        sentiment: 'neutral',
        tags: ['licitación', 'gobierno'],
        attachments: []
      }
    ],
    
    predictions: {
      churnProbability: 0.42,
      nextPurchaseDate: '2026-06-01',
      nextPurchaseValue: 280000000,
      suggestedServices: ['Infraestructura pública', 'Obra civil'],
      bestContactTime: '2026-03-05T09:00:00',
      churnReasons: ['Inactividad muy prolongada', 'Procesos burocráticos lentos']
    },
    
    segment: 'hibernating',
    tags: ['gobierno', 'licitaciones', 'alto-valor'],
    
    documents: [
      {
        id: 'doc3',
        name: 'Licitación Parque 2022',
        type: 'contract',
        issueDate: '2022-11-01',
        expiryDate: '2023-12-31',
        status: 'expired',
        filePath: '/documents/government/VillaNueva_2022.pdf',
        size: 5678901,
        uploadedBy: {
          id: 'exec1',
          name: 'María González',
          email: 'maria.gonzalez@nexus.com'
        }
      }
    ],
    
    registrationDate: '2022-08-10',
    lastInteraction: '2025-11-05',
    status: 'inactive',
    createdBy: {
      id: 'admin1',
      name: 'Admin Sistema',
      email: 'admin@nexus.com'
    },
    modifiedBy: {
      id: 'exec1',
      name: 'María González',
      email: 'maria.gonzalez@nexus.com'
    },
    lastModified: '2025-11-05'
  }
]
