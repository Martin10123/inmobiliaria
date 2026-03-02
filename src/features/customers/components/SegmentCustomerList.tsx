import { useNavigate } from 'react-router-dom'
import type { Customer, CustomerSegment } from '@/types'
import { getSegmentDefinition } from '../utils/segmentationHelpers'
import { formatCurrency, formatRelativeDate } from '../utils/customerHelpers'
import { Building2, DollarSign, Calendar, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react'

interface SegmentCustomerListProps {
  customers: Array<Customer & { currentSegment: CustomerSegment }>
  selectedSegment: CustomerSegment | 'all'
}

export const SegmentCustomerList = ({ customers, selectedSegment }: SegmentCustomerListProps) => {
  const navigate = useNavigate()

  // Agrupar clientes por segmento si se seleccionó "todos"
  const groupedCustomers = selectedSegment === 'all'
    ? customers.reduce((acc, customer) => {
        const segment = customer.currentSegment
        if (!acc[segment]) acc[segment] = []
        acc[segment].push(customer)
        return acc
      }, {} as Record<CustomerSegment, Array<Customer & { currentSegment: CustomerSegment }>>)
    : { [selectedSegment]: customers }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case 'high':
        return <AlertCircle className="w-4 h-4 text-orange-600" />
      case 'medium':
        return <CheckCircle2 className="w-4 h-4 text-yellow-600" />
      default:
        return <CheckCircle2 className="w-4 h-4 text-slate-400" />
    }
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedCustomers).map(([segment, segmentCustomers]) => {
        const segmentDef = getSegmentDefinition(segment as CustomerSegment)

        if (segmentCustomers.length === 0) return null

        return (
          <div key={segment} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            {/* Header del Segmento */}
            <div className={`${segmentDef.bgColor} border-b-2 border-${segmentDef.color.replace('text-', '')} p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getPriorityIcon(segmentDef.priority)}
                  <div>
                    <h3 className={`font-bold ${segmentDef.color}`}>{segmentDef.name}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{segmentDef.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-700">
                    {segmentCustomers.length} {segmentCustomers.length === 1 ? 'cliente' : 'clientes'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {formatCurrency(segmentCustomers.reduce((sum, c) => sum + c.clv, 0))} CLV total
                  </div>
                </div>
              </div>

              {/* Acciones Recomendadas */}
              <div className="mt-3 pt-3 border-t border-slate-200/50">
                <p className="text-xs font-semibold text-slate-700 mb-2">Acciones Recomendadas:</p>
                <div className="grid grid-cols-2 gap-2">
                  {segmentDef.actions.slice(0, 4).map((action, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
                {segmentDef.actions.length > 4 && (
                  <p className="text-xs text-slate-500 mt-2">+{segmentDef.actions.length - 4} acciones más</p>
                )}
              </div>
            </div>

            {/* Lista de Clientes */}
            <div className="divide-y divide-slate-100">
              {segmentCustomers.map(customer => (
                <div
                  key={customer.id}
                  onClick={() => navigate(`/customers/${customer.id}`)}
                  className="p-4 hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Nombre y Tipo */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <h4 className="font-semibold text-slate-800 truncate">{customer.name}</h4>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{customer.accountExecutive.name}</span>
                          <span>•</span>
                          <span>{customer.projects.total} proyectos</span>
                        </div>
                      </div>

                      {/* Métricas RFM */}
                      <div className="hidden md:flex items-center gap-4 px-4">
                        <div className="text-center">
                          <p className="text-xs text-slate-500 mb-0.5">Recency</p>
                          <p className="text-sm font-semibold text-slate-700">{customer.rfm.recency}d</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500 mb-0.5">Frequency</p>
                          <p className="text-sm font-semibold text-slate-700">{customer.rfm.frequency}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500 mb-0.5">RFM Score</p>
                          <p className="text-sm font-semibold text-blue-600">{customer.rfm.score}</p>
                        </div>
                      </div>

                      {/* CLV y Último Contacto */}
                      <div className="hidden lg:block text-right">
                        <div className="flex items-center gap-1 text-sm font-semibold text-slate-800 mb-1">
                          <DollarSign className="w-3.5 h-3.5" />
                          {formatCurrency(customer.clv)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="w-3 h-3" />
                          {customer.lastInteraction
                            ? formatRelativeDate(customer.lastInteraction)
                            : 'Sin contacto'
                          }
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
                  </div>

                  {/* Métricas móvil */}
                  <div className="md:hidden mt-3 pt-3 border-t border-slate-100 flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-slate-500">Recency:</span>
                      <span className="font-semibold text-slate-700 ml-1">{customer.rfm.recency}d</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Frequency:</span>
                      <span className="font-semibold text-slate-700 ml-1">{customer.rfm.frequency}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Score:</span>
                      <span className="font-semibold text-blue-600 ml-1">{customer.rfm.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {customers.length === 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <p className="text-slate-500">No hay clientes en este segmento</p>
        </div>
      )}
    </div>
  )
}
