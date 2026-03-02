import { useState } from 'react'
import { MainLayout } from '@/layout/MainLayout'
import { Filter, Users } from 'lucide-react'
import type { Customer, CustomerSegment } from '@/types'
import { mockCustomers } from './data/mockCustomers'
import { classifyCustomer, getSegmentStats, segmentDefinitions } from './utils/segmentationHelpers'
import { SegmentDistribution } from './components/SegmentDistribution'
import { SegmentationMatrix } from './components/SegmentationMatrix'
import { SegmentCustomerList } from './components/SegmentCustomerList'

export const CustomerSegmentationPage = () => {
  const [customers] = useState<Customer[]>(mockCustomers)
  const [selectedSegment, setSelectedSegment] = useState<CustomerSegment | 'all'>('all')

  const { segmentCounts, segmentValues } = getSegmentStats(customers)

  // Clasificar todos los clientes
  const customersWithSegments = customers.map(customer => ({
    ...customer,
    currentSegment: classifyCustomer(customer)
  }))

  // Filtrar por segmento seleccionado
  const filteredCustomers = selectedSegment === 'all'
    ? customersWithSegments
    : customersWithSegments.filter(c => c.currentSegment === selectedSegment)

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Segmentación de Clientes</h1>
            <p className="text-slate-600 mt-1">Análisis RFM y distribución de clientes por segmento</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-800">{customers.length} Clientes</span>
          </div>
        </div>

        {/* Filtro de Segmento */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">Segmento:</span>
            </div>

            <button
              onClick={() => setSelectedSegment('all')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                selectedSegment === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todos ({customers.length})
            </button>

            {segmentDefinitions.map(segment => (
              <button
                key={segment.id}
                onClick={() => setSelectedSegment(segment.id)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  selectedSegment === segment.id
                    ? `${segment.bgColor} ${segment.color} font-medium`
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {segment.name} ({segmentCounts[segment.id]})
              </button>
            ))}
          </div>
        </div>

        {/* Distribución de Segmentos */}
        <SegmentDistribution
          segmentCounts={segmentCounts}
          segmentValues={segmentValues}
        />

        {/* Matriz RFM */}
        <SegmentationMatrix customers={customersWithSegments} />

        {/* Lista de Clientes por Segmento */}
        <SegmentCustomerList
          customers={filteredCustomers}
          selectedSegment={selectedSegment}
        />
      </div>
    </MainLayout>
  )
}
