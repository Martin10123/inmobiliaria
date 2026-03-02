import { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import type { InventoryMovement } from '../../../types'
import { 
  ArrowUpCircle,
  ArrowDownCircle, 
  RefreshCw, 
  RotateCcw,
  Repeat,
  XCircle
} from 'lucide-react'
import { 
  getMovementTypeLabel, 
  getMovementTypeColor,
  formatDateTime,
  formatNumber
} from '../utils/inventoryHelpers'
import { mockMovements } from '../data/mockMovements'
import { DataTable } from '../../../components/ui/data-table'

interface MovementHistoryProps {
  itemId: string
}

export default function MovementHistory({ itemId }: MovementHistoryProps) {
  // Filtrar movimientos por item
  const movements = mockMovements.filter(m => m.itemId === itemId)

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'entry':
        return <ArrowUpCircle className="w-5 h-5 text-green-600" />
      case 'exit':
        return <ArrowDownCircle className="w-5 h-5 text-red-600" />
      case 'adjustment':
        return <RefreshCw className="w-5 h-5 text-yellow-600" />
      case 'transfer':
        return <Repeat className="w-5 h-5 text-blue-600" />
      case 'return':
        return <RotateCcw className="w-5 h-5 text-purple-600" />
      case 'loss':
        return <XCircle className="w-5 h-5 text-gray-600" />
      default:
        return <RefreshCw className="w-5 h-5 text-gray-600" />
    }
  }

  const getQuantityDisplay = (movement: InventoryMovement) => {
    const isNegative = ['exit', 'loss'].includes(movement.type)
    const sign = isNegative ? '-' : '+'
    
    return (
      <span className={`font-semibold ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
        {sign}{formatNumber(Math.abs(movement.quantity))}
      </span>
    )
  }

  const columns = useMemo<ColumnDef<InventoryMovement>[]>(
    () => [
      {
        accessorKey: 'type',
        header: 'Tipo',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {getMovementIcon(row.original.type)}
            <span className={`text-sm font-medium ${getMovementTypeColor(row.original.type)}`}>
              {getMovementTypeLabel(row.original.type)}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'quantity',
        header: 'Cantidad',
        cell: ({ row }) => (
          <div className="text-sm">
            {getQuantityDisplay(row.original)}
          </div>
        ),
      },
      {
        id: 'stock',
        header: 'Stock',
        cell: ({ row }) => (
          <div className="text-sm text-gray-900">
            <span className="text-gray-500">{formatNumber(row.original.previousStock)}</span>
            <span className="mx-2 text-gray-400">→</span>
            <span className="font-semibold">{formatNumber(row.original.newStock)}</span>
          </div>
        ),
      },
      {
        accessorKey: 'reason',
        header: 'Motivo',
        cell: ({ row }) => (
          <div>
            <div className="text-sm text-gray-900">{row.original.reason}</div>
            {row.original.notes && (
              <div className="text-xs text-gray-500 mt-1">{row.original.notes}</div>
            )}
          </div>
        ),
      },
      {
        accessorKey: 'reference',
        header: 'Referencia',
        cell: ({ row }) => (
          row.original.reference ? (
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
              {row.original.reference}
            </span>
          ) : (
            <span className="text-sm text-gray-400">-</span>
          )
        ),
      },
      {
        accessorKey: 'userName',
        header: 'Usuario',
        cell: ({ row }) => (
          <div className="text-sm text-gray-900">{row.original.userName}</div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Fecha',
        cell: ({ row }) => (
          <div className="text-sm text-gray-900">{formatDateTime(row.original.createdAt)}</div>
        ),
      },
    ],
    []
  )

  if (movements.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <RefreshCw className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No hay movimientos registrados para este item</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">Entradas</p>
              <p className="text-2xl font-bold text-green-900">
                {movements.filter(m => m.type === 'entry').length}
              </p>
            </div>
            <ArrowUpCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-700">Salidas</p>
              <p className="text-2xl font-bold text-red-900">
                {movements.filter(m => m.type === 'exit').length}
              </p>
            </div>
            <ArrowDownCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">Devoluciones</p>
              <p className="text-2xl font-bold text-purple-900">
                {movements.filter(m => m.type === 'return').length}
              </p>
            </div>
            <RotateCcw className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">Total Movimientos</p>
              <p className="text-2xl font-bold text-blue-900">{movements.length}</p>
            </div>
            <RefreshCw className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Tabla de Movimientos */}
      <DataTable
        columns={columns}
        data={movements}
        pageSize={10}
        emptyMessage="No hay movimientos registrados para este item"
      />

      {/* Resumen */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <RefreshCw className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-blue-900 mb-1">Resumen de Movimientos</h4>
            <p className="text-sm text-blue-700">
              Este item ha registrado <strong>{movements.length} movimientos</strong> en total.
              El stock pasó de <strong>{movements[movements.length - 1]?.previousStock || 0}</strong> a{' '}
              <strong>{movements[0]?.newStock || 0}</strong> unidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
