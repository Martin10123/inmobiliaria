import type { InventoryCategory, InventoryStatus, MovementType } from '../../../types'

// Formatear precio en COP
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Formatear número con separadores de miles
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-CO').format(num)
}

// Obtener etiqueta de categoría
export const getCategoryLabel = (category: InventoryCategory): string => {
  const labels: Record<InventoryCategory, string> = {
    tools: 'Herramientas',
    equipment: 'Equipos',
    materials: 'Materiales',
    supplies: 'Suministros',
    vehicles: 'Vehículos',
    electronics: 'Electrónicos',
    furniture: 'Mobiliario',
    safety: 'Seguridad',
    other: 'Otros'
  }
  return labels[category]
}

// Obtener color de categoría
export const getCategoryColor = (category: InventoryCategory): string => {
  const colors: Record<InventoryCategory, string> = {
    tools: 'bg-blue-100 text-blue-800',
    equipment: 'bg-purple-100 text-purple-800',
    materials: 'bg-orange-100 text-orange-800',
    supplies: 'bg-green-100 text-green-800',
    vehicles: 'bg-red-100 text-red-800',
    electronics: 'bg-cyan-100 text-cyan-800',
    furniture: 'bg-amber-100 text-amber-800',
    safety: 'bg-yellow-100 text-yellow-800',
    other: 'bg-gray-100 text-gray-800'
  }
  return colors[category]
}

// Obtener etiqueta de estado
export const getStatusLabel = (status: InventoryStatus): string => {
  const labels: Record<InventoryStatus, string> = {
    available: 'Disponible',
    'in-use': 'En Uso',
    maintenance: 'Mantenimiento',
    damaged: 'Dañado',
    'out-of-stock': 'Agotado'
  }
  return labels[status]
}

// Obtener color de estado
export const getStatusColor = (status: InventoryStatus): string => {
  const colors: Record<InventoryStatus, string> = {
    available: 'bg-green-100 text-green-800',
    'in-use': 'bg-blue-100 text-blue-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    damaged: 'bg-red-100 text-red-800',
    'out-of-stock': 'bg-gray-100 text-gray-800'
  }
  return colors[status]
}

// Obtener etiqueta de tipo de movimiento
export const getMovementTypeLabel = (type: MovementType): string => {
  const labels: Record<MovementType, string> = {
    entry: 'Entrada',
    exit: 'Salida',
    adjustment: 'Ajuste',
    transfer: 'Transferencia',
    return: 'Devolución',
    loss: 'Pérdida/Baja'
  }
  return labels[type]
}

// Obtener color de tipo de movimiento
export const getMovementTypeColor = (type: MovementType): string => {
  const colors: Record<MovementType, string> = {
    entry: 'text-green-600',
    exit: 'text-red-600',
    adjustment: 'text-yellow-600',
    transfer: 'text-blue-600',
    return: 'text-purple-600',
    loss: 'text-gray-600'
  }
  return colors[type]
}

// Calcular nivel de stock (porcentaje respecto al mínimo)
export const getStockLevel = (stock: number, minStock: number): 'critical' | 'low' | 'normal' => {
  if (stock === 0) return 'critical'
  if (stock <= minStock) return 'low'
  return 'normal'
}

// Obtener color de nivel de stock
export const getStockLevelColor = (stock: number, minStock: number): string => {
  const level = getStockLevel(stock, minStock)
  const colors = {
    critical: 'text-red-600 bg-red-50',
    low: 'text-yellow-600 bg-yellow-50',
    normal: 'text-green-600 bg-green-50'
  }
  return colors[level]
}

// Obtener icono de nivel de stock
export const getStockLevelIcon = (stock: number, minStock: number): string => {
  const level = getStockLevel(stock, minStock)
  const icons = {
    critical: '⚠️',
    low: '⚡',
    normal: '✓'
  }
  return icons[level]
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

// Formatear fecha y hora
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Calcular valor total del inventario
export const calculateTotalValue = (items: Array<{ totalValue: number }>): number => {
  return items.reduce((sum, item) => sum + item.totalValue, 0)
}

// Contar items por categoría
export const countByCategory = (
  items: Array<{ category: InventoryCategory }>
): Record<InventoryCategory, number> => {
  const counts: Record<string, number> = {}
  items.forEach(item => {
    counts[item.category] = (counts[item.category] || 0) + 1
  })
  return counts as Record<InventoryCategory, number>
}

// Contar items por estado
export const countByStatus = (
  items: Array<{ status: InventoryStatus }>
): Record<InventoryStatus, number> => {
  const counts: Record<string, number> = {}
  items.forEach(item => {
    counts[item.status] = (counts[item.status] || 0) + 1
  })
  return counts as Record<InventoryStatus, number>
}

// Filtrar items con stock bajo
export const getLowStockItems = (
  items: Array<{ stock: number; minStock: number }>
) => {
  return items.filter(item => item.stock <= item.minStock && item.stock > 0)
}

// Filtrar items agotados
export const getOutOfStockItems = (
  items: Array<{ stock: number }>
) => {
  return items.filter(item => item.stock === 0)
}

// Generar código único para nuevo item
export const generateItemCode = (category: InventoryCategory): string => {
  const prefix = category.toUpperCase().substring(0, 4)
  const randomNum = Math.floor(Math.random() * 9000) + 1000
  return `${prefix}-${randomNum}`
}

// Validar stock suficiente
export const hasEnoughStock = (currentStock: number, requiredQuantity: number): boolean => {
  return currentStock >= requiredQuantity
}

// Calcular porcentaje de stock
export const calculateStockPercentage = (stock: number, maxStock: number): number => {
  if (!maxStock || maxStock === 0) return 100
  return Math.min(Math.round((stock / maxStock) * 100), 100)
}
