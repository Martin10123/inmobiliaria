import { Wrench, Calendar, DollarSign, User, AlertCircle, CheckCircle } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/inventoryHelpers'

interface MaintenanceRecord {
  id: string
  date: string
  type: 'preventive' | 'corrective' | 'inspection'
  description: string
  technician: string
  cost: number
  nextMaintenance?: string
  status: 'completed' | 'pending' | 'scheduled'
}

interface MaintenanceHistoryProps {
  itemId: string
}

// Mock data
const mockMaintenanceRecords: Record<string, MaintenanceRecord[]> = {
  '9': [
    {
      id: 'MANT-001',
      date: '2026-03-01T08:30:00Z',
      type: 'preventive',
      description: 'Cambio de aceite y revisión general del motor',
      technician: 'Luis Fernández',
      cost: 150000,
      nextMaintenance: '2026-06-01',
      status: 'completed'
    },
    {
      id: 'MANT-002',
      date: '2025-12-15T10:00:00Z',
      type: 'corrective',
      description: 'Reparación de sistema de arranque',
      technician: 'Carlos Méndez',
      cost: 280000,
      status: 'completed'
    },
    {
      id: 'MANT-003',
      date: '2025-09-10T09:00:00Z',
      type: 'inspection',
      description: 'Inspección técnica de seguridad',
      technician: 'Ana Torres',
      cost: 80000,
      status: 'completed'
    }
  ]
}

export default function MaintenanceHistory({ itemId }: MaintenanceHistoryProps) {
  const records = mockMaintenanceRecords[itemId] || []

  const getMaintenanceTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      preventive: 'Preventivo',
      corrective: 'Correctivo',
      inspection: 'Inspección'
    }
    return labels[type] || type
  }

  const getMaintenanceTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      preventive: 'bg-green-100 text-green-800',
      corrective: 'bg-red-100 text-red-800',
      inspection: 'bg-blue-100 text-blue-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const totalCost = records.reduce((sum, record) => sum + record.cost, 0)

  if (records.length === 0) {
    return (
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No hay registros de mantenimiento para este item</p>
          <p className="text-sm text-gray-400 mt-1">Este tipo de item puede no requerir mantenimiento regular</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Resúmen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Mantenimientos</p>
              <p className="text-2xl font-bold text-gray-900">{records.length}</p>
            </div>
            <Wrench className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Costo Total</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCost)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Último Mantenimiento</p>
              <p className="text-base font-semibold text-gray-900">
                {formatDate(records[0].date)}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Próximo Mantenimiento */}
      {records[0].nextMaintenance && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900">Próximo Mantenimiento Programado</h4>
              <p className="text-sm text-blue-700 mt-1">
                Fecha estimada: <strong>{formatDate(records[0].nextMaintenance)}</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Historial */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Historial de Mantenimientos</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {records.map((record) => (
            <div key={record.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getMaintenanceTypeColor(record.type)}`}>
                      {getMaintenanceTypeLabel(record.type)}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(record.date)}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-gray-900 mb-2">
                    {record.description}
                  </h4>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {record.technician}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {formatCurrency(record.cost)}
                    </span>
                  </div>

                  {record.nextMaintenance && (
                    <div className="mt-2 text-sm text-blue-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Próximo mantenimiento: {formatDate(record.nextMaintenance)}
                    </div>
                  )}
                </div>

                <div className="shrink-0">
                  <Wrench className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
