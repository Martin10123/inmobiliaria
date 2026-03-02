import type { CustomerSegment, SegmentDefinition, Customer } from '@/types'

export const segmentDefinitions: SegmentDefinition[] = [
  {
    id: 'champions',
    name: 'Champions',
    description: 'Alto valor + alta frecuencia + contacto reciente. Tus mejores clientes.',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    criteria: 'RFM ≥ 85 && Recency ≤ 30 días',
    priority: 'high',
    actions: [
      'Asignar ejecutivo premium',
      'Invitar a eventos exclusivos',
      'Ofrecer descuentos por lealtad',
      'Solicitar testimonios y casos de éxito',
      'Pedir referidos'
    ]
  },
  {
    id: 'loyal',
    name: 'Clientes Leales',
    description: 'Alta frecuencia de proyectos, compran regularmente.',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    criteria: 'RFM ≥ 70 && Recency ≤ 60 días',
    priority: 'high',
    actions: [
      'Mantener comunicación regular',
      'Ofrecer productos complementarios',
      'Programar reuniones trimestrales',
      'Enviar contenido de valor'
    ]
  },
  {
    id: 'whales',
    name: 'Ballenas',
    description: 'Muy alto valor, baja frecuencia. Proyectos grandes esporádicos.',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    criteria: 'CLV ≥ $200M && Frequency ≤ 2',
    priority: 'critical',
    actions: [
      'Atención VIP personalizada',
      'Gerente de cuenta dedicado',
      'Propuestas exclusivas a medida',
      'Seguimiento continuo de oportunidades'
    ]
  },
  {
    id: 'at-risk',
    name: 'En Riesgo',
    description: 'Alto valor histórico pero inactivos hace más de 60 días.',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    criteria: 'CLV ≥ $50M && Recency > 60 días',
    priority: 'critical',
    actions: [
      'Contacto urgente del ejecutivo',
      'Encuesta de satisfacción',
      'Oferta especial de reactivación',
      'Si no responde en 7 días → escalar a gerencia'
    ]
  },
  {
    id: 'hibernating',
    name: 'Hibernando',
    description: 'Sin actividad en más de 90 días. Requieren reactivación.',
    color: 'text-slate-700',
    bgColor: 'bg-slate-50',
    criteria: 'Recency > 90 días',
    priority: 'medium',
    actions: [
      'Campaña de email marketing',
      'Ofertas especiales de retorno',
      'Investigar razones de inactividad',
      'Evaluar viabilidad de reactivación'
    ]
  },
  {
    id: 'lost',
    name: 'Perdidos',
    description: 'Sin contacto en más de 180 días o marcados como perdidos.',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    criteria: 'Status = "lost" || Recency > 180 días',
    priority: 'low',
    actions: [
      'Análisis post-mortem',
      'Documentar razones de pérdida',
      'Última campaña de reconexión',
      'Archivar si no hay respuesta'
    ]
  },
  {
    id: 'new',
    name: 'Nuevos',
    description: 'Clientes con menos de 6 meses de antigüedad.',
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-50',
    criteria: 'Registro < 6 meses',
    priority: 'high',
    actions: [
      'Proceso de onboarding',
      'Seguimiento semanal',
      'Solicitar feedback temprano',
      'Educar sobre servicios adicionales'
    ]
  },
  {
    id: 'potential',
    name: 'Potenciales',
    description: 'Buen comportamiento pero bajo valor. Oportunidad de crecimiento.',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    criteria: 'RFM ≥ 60 && CLV < $50M',
    priority: 'medium',
    actions: [
      'Identificar necesidades no cubiertas',
      'Ofrecer upselling',
      'Presentar servicios premium',
      'Nutrir relación para aumentar valor'
    ]
  }
]

export const classifyCustomer = (customer: Customer): CustomerSegment => {
  const { rfm, clv, status, registrationDate, lastInteraction } = customer

  // Calcular días desde último contacto
  const recency = lastInteraction 
    ? Math.floor((new Date().getTime() - new Date(lastInteraction).getTime()) / (1000 * 60 * 60 * 24))
    : 999

  // Calcular antigüedad en meses
  const registrationMonths = Math.floor(
    (new Date().getTime() - new Date(registrationDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
  )

  // Reglas de clasificación
  if (status === 'lost' || recency > 180) return 'lost'
  if (rfm.score >= 85 && recency <= 30) return 'champions'
  if (clv >= 200000000 && rfm.frequency <= 2) return 'whales'
  if (clv >= 50000000 && recency > 60 && status !== 'active') return 'at-risk'
  if (rfm.score >= 70 && recency <= 60) return 'loyal'
  if (recency > 90) return 'hibernating'
  if (registrationMonths < 6) return 'new'
  if (rfm.score >= 60) return 'potential'

  return 'potential'
}

export const getSegmentDefinition = (segment: CustomerSegment): SegmentDefinition => {
  return segmentDefinitions.find(def => def.id === segment) || segmentDefinitions[6]
}

export const getSegmentStats = (customers: Customer[]) => {
  const segmentCounts: Record<CustomerSegment, number> = {
    champions: 0,
    loyal: 0,
    whales: 0,
    'at-risk': 0,
    hibernating: 0,
    lost: 0,
    new: 0,
    potential: 0
  }

  const segmentValues: Record<CustomerSegment, number> = {
    champions: 0,
    loyal: 0,
    whales: 0,
    'at-risk': 0,
    hibernating: 0,
    lost: 0,
    new: 0,
    potential: 0
  }

  customers.forEach(customer => {
    const segment = classifyCustomer(customer)
    segmentCounts[segment]++
    segmentValues[segment] += customer.clv
  })

  return { segmentCounts, segmentValues }
}

export const getRFMCategory = (score: number, metric: 'recency' | 'frequency' | 'monetary'): 'high' | 'medium' | 'low' => {
  if (metric === 'recency') {
    // Para recency, menor es mejor
    if (score <= 30) return 'high'
    if (score <= 90) return 'medium'
    return 'low'
  } else {
    // Para frequency y monetary, mayor es mejor
    if (score >= 70) return 'high'
    if (score >= 40) return 'medium'
    return 'low'
  }
}
