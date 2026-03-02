import type {
  CustomerType,
  CustomerLevel,
  CustomerSource,
  CustomerStatus,
  InteractionType,
  InteractionSentiment,
  NPSCategory
} from '@/types'

// Formatear tipo de cliente
export const getCustomerTypeLabel = (type: CustomerType): string => {
  const labels: Record<CustomerType, string> = {
    'individual': 'Persona Natural',
    'small-business': 'Pequeña Empresa',
    'corporate': 'Corporativo',
    'government': 'Gobierno'
  }
  return labels[type]
}

// Formatear nivel de cliente
export const getCustomerLevelLabel = (level: CustomerLevel): string => {
  const labels: Record<CustomerLevel, string> = {
    'bronze': 'Bronce',
    'silver': 'Plata',
    'gold': 'Oro',
    'platinum': 'Platino',
    'vip': 'VIP'
  }
  return labels[level]
}

// Formatear fuente de adquisición
export const getCustomerSourceLabel = (source: CustomerSource): string => {
  const labels: Record<CustomerSource, string> = {
    'referral': 'Referido',
    'marketing': 'Marketing',
    'web': 'Sitio Web',
    'event': 'Evento',
    'cold-call': 'Llamada Fría',
    'other': 'Otro'
  }
  return labels[source]
}

// Formatear estado de cliente
export const getCustomerStatusLabel = (status: CustomerStatus): string => {
  const labels: Record<CustomerStatus, string> = {
    'active': 'Activo',
    'inactive': 'Inactivo',
    'at-risk': 'En Riesgo',
    'lost': 'Perdido'
  }
  return labels[status]
}

// Formatear tipo de interacción
export const getInteractionTypeLabel = (type: InteractionType): string => {
  const labels: Record<InteractionType, string> = {
    'meeting': 'Reunión',
    'call': 'Llamada',
    'email': 'Email',
    'quote': 'Cotización',
    'contract': 'Contrato',
    'payment': 'Pago',
    'complaint': 'Reclamo',
    'follow-up': 'Seguimiento'
  }
  return labels[type]
}

// Formatear sentimiento
export const getSentimentLabel = (sentiment: InteractionSentiment): string => {
  const labels: Record<InteractionSentiment, string> = {
    'positive': 'Positivo',
    'neutral': 'Neutral',
    'negative': 'Negativo'
  }
  return labels[sentiment]
}

// Formatear categoría NPS
export const getNPSCategoryLabel = (category: NPSCategory): string => {
  const labels: Record<NPSCategory, string> = {
    'promoter': 'Promotor',
    'passive': 'Pasivo',
    'detractor': 'Detractor'
  }
  return labels[category]
}

// Obtener color para nivel de cliente
export const getCustomerLevelColor = (level: CustomerLevel): string => {
  const colors: Record<CustomerLevel, string> = {
    'bronze': 'bg-orange-100 text-orange-800 border-orange-200',
    'silver': 'bg-slate-100 text-slate-800 border-slate-200',
    'gold': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'platinum': 'bg-purple-100 text-purple-800 border-purple-200',
    'vip': 'bg-pink-100 text-pink-800 border-pink-200'
  }
  return colors[level]
}

// Obtener color para estado de cliente
export const getCustomerStatusColor = (status: CustomerStatus): string => {
  const colors: Record<CustomerStatus, string> = {
    'active': 'bg-green-100 text-green-800 border-green-200',
    'inactive': 'bg-gray-100 text-gray-800 border-gray-200',
    'at-risk': 'bg-orange-100 text-orange-800 border-orange-200',
    'lost': 'bg-red-100 text-red-800 border-red-200'
  }
  return colors[status]
}

// Obtener color para categoría NPS
export const getNPSCategoryColor = (category: NPSCategory): string => {
  const colors: Record<NPSCategory, string> = {
    'promoter': 'bg-green-100 text-green-800 border-green-200',
    'passive': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'detractor': 'bg-red-100 text-red-800 border-red-200'
  }
  return colors[category]
}

// Obtener color para sentimiento
export const getSentimentColor = (sentiment: InteractionSentiment): string => {
  const colors: Record<InteractionSentiment, string> = {
    'positive': 'bg-green-100 text-green-800',
    'neutral': 'bg-gray-100 text-gray-800',
    'negative': 'bg-red-100 text-red-800'
  }
  return colors[sentiment]
}

// Calcular score RFM (0-100)
export const calculateRFMScore = (recency: number, frequency: number, monetary: number): number => {
  // Fórmula simplificada: menor recency es mejor, mayor frequency y monetary es mejor
  const recencyScore = Math.max(0, 100 - (recency * 0.5)) // Cada día resta 0.5 puntos
  const frequencyScore = Math.min(100, frequency * 10) // Cada proyecto suma 10 puntos, max 100
  const monetaryScore = Math.min(100, (monetary / 10000000) * 10) // Por cada 10M suma 10 puntos
  
  // Promedio ponderado (recency 30%, frequency 30%, monetary 40%)
  return Math.round((recencyScore * 0.3) + (frequencyScore * 0.3) + (monetaryScore * 0.4))
}

// Calcular Customer Lifetime Value (simplificado)
export const calculateCLV = (historicRevenue: number, frequency: number): number => {
  // CLV = Revenue histórico + (Revenue promedio por proyecto * proyectos futuros estimados)
  const avgRevenuePerProject = frequency > 0 ? historicRevenue / frequency : 0
  const estimatedFutureProjects = frequency >= 5 ? 3 : frequency >= 2 ? 2 : 1
  
  return Math.round(historicRevenue + (avgRevenuePerProject * estimatedFutureProjects))
}

// Determinar segmento automáticamente
export const determineSegment = (rfmScore: number, status: CustomerStatus, recency: number): string => {
  if (status === 'lost') return 'Perdidos'
  if (status === 'at-risk') return 'En Riesgo'
  
  if (rfmScore >= 85 && recency <= 30) return 'Champions'
  if (rfmScore >= 70 && recency <= 60) return 'Leales'
  if (rfmScore >= 60 && recency <= 90) return 'Potenciales'
  if (rfmScore < 60 && recency > 90) return 'Hibernando'
  if (rfmScore < 50 && recency > 180) return 'En Riesgo de Pérdida'
  
  return 'Nuevos'
}

// Formatear moneda colombiana
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Formatear fecha
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

// Formatear fecha relativa (ej: "hace 5 días")
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) return 'Hoy'
  if (diffInDays === 1) return 'Ayer'
  if (diffInDays < 7) return `Hace ${diffInDays} días`
  if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`
  if (diffInDays < 365) return `Hace ${Math.floor(diffInDays / 30)} meses`
  return `Hace ${Math.floor(diffInDays / 365)} años`
}

// Obtener iniciales para avatar
export const getInitials = (name: string): string => {
  const words = name.trim().split(' ')
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

// Generar color de avatar basado en nombre
export const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
  ]
  
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

// Calcular porcentaje de cumplimiento
export const calculateComplianceRate = (completed: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

// Obtener icono de interacción
export const getInteractionIcon = (type: InteractionType): string => {
  const icons: Record<InteractionType, string> = {
    'meeting': 'Users',
    'call': 'Phone',
    'email': 'Mail',
    'quote': 'FileText',
    'contract': 'FileSignature',
    'payment': 'DollarSign',
    'complaint': 'AlertTriangle',
    'follow-up': 'CheckCircle'
  }
  return icons[type]
}

// Obtener alerta de riesgo de churn
export const getChurnRiskLevel = (probability: number): { level: string; color: string; label: string } => {
  if (probability < 0.3) {
    return { level: 'low', color: 'text-green-600', label: 'Bajo Riesgo' }
  } else if (probability < 0.6) {
    return { level: 'medium', color: 'text-yellow-600', label: 'Riesgo Medio' }
  } else {
    return { level: 'high', color: 'text-red-600', label: 'Alto Riesgo' }
  }
}

// Obtener nivel de satisfacción
export const getSatisfactionLevel = (score: number): { level: string; color: string; label: string } => {
  if (score >= 90) {
    return { level: 'excellent', color: 'text-green-600', label: 'Excelente' }
  } else if (score >= 75) {
    return { level: 'good', color: 'text-blue-600', label: 'Bueno' }
  } else if (score >= 60) {
    return { level: 'fair', color: 'text-yellow-600', label: 'Regular' }
  } else {
    return { level: 'poor', color: 'text-red-600', label: 'Bajo' }
  }
}
