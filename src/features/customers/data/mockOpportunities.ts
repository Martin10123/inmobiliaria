import type { Opportunity } from '@/types'

export const mockOpportunities: Opportunity[] = [
  // LEAD - Contacto inicial
  {
    id: 'OPP-001',
    name: 'Ampliación Sede Norte',
    customerId: 'C004',
    customerName: 'Alcaldía Villa Nueva',
    estimatedValue: 85000000,
    closeProbability: 20,
    stage: 'lead',
    estimatedCloseDate: '2026-06-15',
    competitors: ['Constructora Municipal S.A.'],
    strengths: ['Experiencia en proyectos públicos', 'Precio competitivo'],
    weaknesses: ['Proceso largo de licitación', 'Competencia con empresa local'],
    nextAction: {
      type: 'call',
      date: '2026-03-05',
      responsible: {
        id: 'U003',
        name: 'Carlos Méndez',
        email: 'cmendez@nexus.com',
        role: 'Commercial Manager',
        avatar: ''
      },
      objective: 'Agendar primera reunión con comité de obras'
    },
    history: [
      { date: '2026-02-28', change: 'Oportunidad creada - contacto inicial por web' }
    ],
    createdDate: '2026-02-28',
    assignedTo: {
      id: 'U003',
      name: 'Carlos Méndez',
      email: 'cmendez@nexus.com',
      role: 'Commercial Manager',
      avatar: ''
    },
    tags: ['Sector Público', 'Alto Volumen'],
    description: 'Ampliación de 500m² para nueva ala administrativa del edificio municipal'
  },
  {
    id: 'OPP-002',
    name: 'Centro Comercial Los Pinos',
    customerId: 'C002',
    customerName: 'Inversiones El Roble',
    estimatedValue: 450000000,
    closeProbability: 15,
    stage: 'lead',
    estimatedCloseDate: '2026-08-20',
    competitors: ['Constructora Elite', 'Grupo Constructor ABC'],
    strengths: ['Portafolio de centros comerciales'],
    weaknesses: ['Cliente indeciso', 'Presupuesto ajustado'],
    nextAction: {
      type: 'meeting',
      date: '2026-03-08',
      responsible: {
        id: 'U001',
        name: 'Ana García',
        email: 'agarcia@nexus.com',
        role: 'Sales Executive',
        avatar: ''
      },
      objective: 'Presentar casos de éxito y portfolio'
    },
    history: [
      { date: '2026-03-01', change: 'Lead generado por referido de cliente actual' }
    ],
    createdDate: '2026-03-01',
    assignedTo: {
      id: 'U001',
      name: 'Ana García',
      email: 'agarcia@nexus.com',
      role: 'Sales Executive',
      avatar: ''
    },
    tags: ['Comercial', 'Alto Valor'],
    description: 'Construcción de centro comercial de 8000m² con 120 locales'
  },

  // PROSPECT - Interés confirmado
  {
    id: 'OPP-003',
    name: 'Remodelación Sala de Juntas',
    customerId: 'C003',
    customerName: 'Juan Carlos Pérez',
    estimatedValue: 18000000,
    closeProbability: 35,
    stage: 'prospect',
    estimatedCloseDate: '2026-05-10',
    competitors: [],
    strengths: ['Cliente conocido', 'Proyecto pequeño de rápida ejecución'],
    weaknesses: ['Valor bajo', 'Cliente sensible a precio'],
    nextAction: {
      type: 'meeting',
      date: '2026-03-06',
      responsible: {
        id: 'U002',
        name: 'Luis Torres',
        email: 'ltorres@nexus.com',
        role: 'Project Manager',
        avatar: ''
      },
      objective: 'Visita técnica para levantamiento de medidas'
    },
    history: [
      { date: '2026-02-25', change: 'Cliente solicitó cotización' },
      { date: '2026-02-26', change: 'Primera reunión realizada - interés confirmado' }
    ],
    createdDate: '2026-02-25',
    assignedTo: {
      id: 'U002',
      name: 'Luis Torres',
      email: 'ltorres@nexus.com',
      role: 'Project Manager',
      avatar: ''
    },
    tags: ['Remodelación', 'Bajo Valor', 'Cliente Recurrente'],
    description: 'Actualización de sala de juntas con nuevos acabados y sistema de videoconferencia'
  },

  // QUALIFIED - Presupuesto confirmado
  {
    id: 'OPP-004',
    name: 'Torre de Apartamentos Fase 2',
    customerId: 'C001',
    customerName: 'Constructora ABC',
    estimatedValue: 680000000,
    closeProbability: 55,
    stage: 'qualified',
    estimatedCloseDate: '2026-04-30',
    competitors: ['Constructora Titan', 'Edificaciones Moderna'],
    strengths: ['Relación comercial establecida', 'Proyecto Fase 1 exitoso'],
    weaknesses: ['Cliente evaluando múltiples proveedores', 'Plazo exigente'],
    nextAction: {
      type: 'presentation',
      date: '2026-03-12',
      responsible: {
        id: 'U001',
        name: 'Ana García',
        email: 'agarcia@nexus.com',
        role: 'Sales Executive',
        avatar: ''
      },
      objective: 'Presentar cronograma y equipo técnico propuesto'
    },
    history: [
      { date: '2026-02-15', change: 'Solicitud de propuesta recibida' },
      { date: '2026-02-20', change: 'Presupuesto confirmado - proyecto aprobado por junta' },
      { date: '2026-02-22', change: 'Probabilidad de cierre aumentó a 55%' }
    ],
    createdDate: '2026-02-15',
    assignedTo: {
      id: 'U001',
      name: 'Ana García',
      email: 'agarcia@nexus.com',
      role: 'Sales Executive',
      avatar: ''
    },
    tags: ['Alto Valor', 'Cliente VIP', 'Residencial'],
    description: 'Construcción de torre residencial de 12 pisos con 48 apartamentos - Fase 2'
  },

  // PROPOSAL - Propuesta enviada
  {
    id: 'OPP-005',
    name: 'Remodelación Oficinas Centro',
    customerId: 'C002',
    customerName: 'Inversiones El Roble',
    estimatedValue: 150000000,
    closeProbability: 65,
    stage: 'proposal',
    estimatedCloseDate: '2026-04-15',
    competitors: ['Constructora Rival 1', 'Constructora Rival 2'],
    strengths: ['Experiencia en oficinas', 'Precio competitivo'],
    weaknesses: ['Plazo más largo que competencia'],
    nextAction: {
      type: 'meeting',
      date: '2026-03-10',
      responsible: {
        id: 'U001',
        name: 'Ana García',
        email: 'agarcia@nexus.com',
        role: 'Sales Executive',
        avatar: ''
      },
      objective: 'Presentar propuesta final ajustada'
    },
    history: [
      { date: '2026-02-10', change: 'RFP recibida' },
      { date: '2026-02-18', change: 'Propuesta técnica y económica enviada' },
      { date: '2026-02-20', change: 'Valor estimado aumentó 10%' },
      { date: '2026-02-25', change: 'Probabilidad subió de 60% a 65%' }
    ],
    createdDate: '2026-02-10',
    assignedTo: {
      id: 'U001',
      name: 'Ana García',
      email: 'agarcia@nexus.com',
      role: 'Sales Executive',
      avatar: ''
    },
    tags: ['Comercial', 'Oficinas', 'Remodelación'],
    description: 'Remodelación completa de 3500m² de oficinas corporativas en zona centro'
  },
  {
    id: 'OPP-006',
    name: 'Parque Industrial El Bosque',
    customerId: 'C001',
    customerName: 'Constructora ABC',
    estimatedValue: 920000000,
    closeProbability: 70,
    stage: 'proposal',
    estimatedCloseDate: '2026-05-25',
    competitors: ['Constructora Industrial Pro'],
    strengths: ['Experiencia en proyectos industriales', 'Equipo especializado'],
    weaknesses: ['Ubicación alejada aumenta costos logísticos'],
    nextAction: {
      type: 'follow-up',
      date: '2026-03-07',
      responsible: {
        id: 'U003',
        name: 'Carlos Méndez',
        email: 'cmendez@nexus.com',
        role: 'Commercial Manager',
        avatar: ''
      },
      objective: 'Seguimiento post-presentación, resolver dudas técnicas'
    },
    history: [
      { date: '2026-02-05', change: 'Oportunidad identificada' },
      { date: '2026-02-12', change: 'Propuesta enviada' },
      { date: '2026-02-28', change: 'Cliente solicitó ajustes menores - señal positiva' }
    ],
    createdDate: '2026-02-05',
    assignedTo: {
      id: 'U003',
      name: 'Carlos Méndez',
      email: 'cmendez@nexus.com',
      role: 'Commercial Manager',
      avatar: ''
    },
    tags: ['Industrial', 'Alto Valor', 'Cliente VIP'],
    description: 'Construcción de parque industrial con 6 bodegas de 2000m² c/u'
  },

  // NEGOTIATION - En negociación
  {
    id: 'OPP-007',
    name: 'Conjunto Residencial Villa Verde',
    customerId: 'C002',
    customerName: 'Inversiones El Roble',
    estimatedValue: 580000000,
    closeProbability: 80,
    stage: 'negotiation',
    estimatedCloseDate: '2026-04-05',
    competitors: [],
    strengths: ['Únicos en la negociación final', 'Propuesta bien valorada'],
    weaknesses: ['Cliente solicita descuento adicional 5%'],
    nextAction: {
      type: 'meeting',
      date: '2026-03-04',
      responsible: {
        id: 'U001',
        name: 'Ana García',
        email: 'agarcia@nexus.com',
        role: 'Sales Executive',
        avatar: ''
      },
      objective: 'Negociar términos finales de contrato y forma de pago'
    },
    history: [
      { date: '2026-01-20', change: 'Oportunidad creada' },
      { date: '2026-02-01', change: 'Propuesta enviada' },
      { date: '2026-02-15', change: 'Seleccionados como finalistas' },
      { date: '2026-02-22', change: 'Negociación iniciada - cliente solicita ajustes de precio' },
      { date: '2026-02-28', change: 'Probabilidad aumentó a 80%' }
    ],
    createdDate: '2026-01-20',
    assignedTo: {
      id: 'U001',
      name: 'Ana García',
      email: 'agarcia@nexus.com',
      role: 'Sales Executive',
      avatar: ''
    },
    tags: ['Residencial', 'Alto Valor', 'Negociación Final'],
    description: 'Conjunto residencial cerrado con 24 casas unifamiliares y zonas comunes'
  },
  {
    id: 'OPP-008',
    name: 'Hotel Boutique Centro Histórico',
    customerId: 'C003',
    customerName: 'Juan Carlos Pérez',
    estimatedValue: 320000000,
    closeProbability: 75,
    stage: 'negotiation',
    estimatedCloseDate: '2026-04-20',
    competitors: [],
    strengths: ['Experiencia en restauración patrimonio', 'Cliente satisfecho con propuesta'],
    weaknesses: ['Permisos patrimoniales pueden retrasar inicio'],
    nextAction: {
      type: 'meeting',
      date: '2026-03-09',
      responsible: {
        id: 'U002',
        name: 'Luis Torres',
        email: 'ltorres@nexus.com',
        role: 'Project Manager',
        avatar: ''
      },
      objective: 'Revisar especificaciones técnicas finales y cronograma'
    },
    history: [
      { date: '2026-01-25', change: 'Consulta inicial recibida' },
      { date: '2026-02-05', change: 'Propuesta enviada' },
      { date: '2026-02-18', change: 'Cliente acepta condiciones generales' },
      { date: '2026-02-25', change: 'Negociación de detalles técnicos en curso' }
    ],
    createdDate: '2026-01-25',
    assignedTo: {
      id: 'U002',
      name: 'Luis Torres',
      email: 'ltorres@nexus.com',
      role: 'Project Manager',
      avatar: ''
    },
    tags: ['Turismo', 'Patrimonio', 'Remodelación'],
    description: 'Restauración y adecuación de casa colonial para hotel boutique de 12 habitaciones'
  },

  // CONTRACT - Contrato firmado (no ejecutado aún)
  {
    id: 'OPP-009',
    name: 'Clínica Especializada San Rafael',
    customerId: 'C001',
    customerName: 'Constructora ABC',
    estimatedValue: 450000000,
    closeProbability: 95,
    stage: 'contract',
    estimatedCloseDate: '2026-03-15',
    competitors: [],
    strengths: ['Contrato firmado', 'Anticipo recibido'],
    weaknesses: [],
    nextAction: {
      type: 'meeting',
      date: '2026-03-03',
      responsible: {
        id: 'U002',
        name: 'Luis Torres',
        email: 'ltorres@nexus.com',
        role: 'Project Manager',
        avatar: ''
      },
      objective: 'Reunión de kick-off del proyecto'
    },
    history: [
      { date: '2026-01-10', change: 'Oportunidad identificada' },
      { date: '2026-01-22', change: 'Propuesta enviada' },
      { date: '2026-02-05', change: 'Negociación completada' },
      { date: '2026-02-20', change: 'Contrato firmado' },
      { date: '2026-02-25', change: 'Anticipo 30% recibido' }
    ],
    createdDate: '2026-01-10',
    assignedTo: {
      id: 'U002',
      name: 'Luis Torres',
      email: 'ltorres@nexus.com',
      role: 'Project Manager',
      avatar: ''
    },
    tags: ['Salud', 'Alto Valor', 'Contrato Firmado'],
    description: 'Construcción de clínica especializada de 2500m² con quirófanos y hospitalización'
  },

  // EXECUTION - En ejecución
  {
    id: 'OPP-010',
    name: 'Edificio Corporativo Zona Norte',
    customerId: 'C001',
    customerName: 'Constructora ABC',
    estimatedValue: 850000000,
    closeProbability: 100,
    stage: 'execution',
    estimatedCloseDate: '2026-03-01',
    competitors: [],
    strengths: ['Proyecto en ejecución - 35% avance'],
    weaknesses: [],
    nextAction: {
      type: 'meeting',
      date: '2026-03-06',
      responsible: {
        id: 'U002',
        name: 'Luis Torres',
        email: 'ltorres@nexus.com',
        role: 'Project Manager',
        avatar: ''
      },
      objective: 'Revisión semanal de avance con cliente'
    },
    history: [
      { date: '2025-11-15', change: 'Oportunidad ganada' },
      { date: '2025-12-01', change: 'Inicio de construcción' },
      { date: '2026-01-15', change: 'Avance 20%' },
      { date: '2026-02-15', change: 'Avance 35%' }
    ],
    createdDate: '2025-11-15',
    assignedTo: {
      id: 'U002',
      name: 'Luis Torres',
      email: 'ltorres@nexus.com',
      role: 'Project Manager',
      avatar: ''
    },
    tags: ['Comercial', 'Alto Valor', 'En Ejecución'],
    description: 'Edificio corporativo de 8 pisos con oficinas y locales comerciales',
    projectId: '1' // Vinculado a Torre Empresarial Centro
  },

  // POST-SALE - Proyecto completado
  {
    id: 'OPP-011',
    name: 'Centro de Distribución Logística',
    customerId: 'C002',
    customerName: 'Inversiones El Roble',
    estimatedValue: 390000000,
    closeProbability: 100,
    stage: 'post-sale',
    estimatedCloseDate: '2025-12-20',
    competitors: [],
    strengths: ['Proyecto completado satisfactoriamente', 'Cliente busca nueva fase'],
    weaknesses: [],
    nextAction: {
      type: 'follow-up',
      date: '2026-03-11',
      responsible: {
        id: 'U001',
        name: 'Ana García',
        email: 'agarcia@nexus.com',
        role: 'Sales Executive',
        avatar: ''
      },
      objective: 'Reunión de seguimiento post-entrega y explorar Fase 2'
    },
    history: [
      { date: '2025-07-10', change: 'Oportunidad ganada' },
      { date: '2025-08-01', change: 'Inicio de construcción' },
      { date: '2025-12-15', change: 'Proyecto completado' },
      { date: '2025-12-20', change: 'Entrega final y acta de recibo' },
      { date: '2026-02-10', change: 'Cliente solicita cotización para expansión' }
    ],
    createdDate: '2025-07-10',
    assignedTo: {
      id: 'U001',
      name: 'Ana García',
      email: 'agarcia@nexus.com',
      role: 'Sales Executive',
      avatar: ''
    },
    tags: ['Industrial', 'Proyecto Completado', 'Upsell Potencial'],
    description: 'Centro de distribución de 4000m² con zonas de carga y oficinas administrativas',
    projectId: '2' // Vinculado a proyecto completado
  }
]
