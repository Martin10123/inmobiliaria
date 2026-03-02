import { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import type { InventoryItem } from '../../../types'
import {
  formatCurrency,
  formatNumber,
  getCategoryLabel,
  getCategoryColor,
  getStatusLabel,
  getStatusColor,
  getStockLevelIcon,
  getStockLevelColor
} from '../utils/inventoryHelpers'
import { Edit, Trash2, Eye } from 'lucide-react'
import { DataTable } from '../../../components/ui/data-table'

interface InventoryTableProps {
  items: InventoryItem[]
  onEdit?: (item: InventoryItem) => void
  onDelete?: (item: InventoryItem) => void
  onView?: (item: InventoryItem) => void
}

export default function InventoryTable({
  items,
  onEdit,
  onDelete,
  onView
}: InventoryTableProps) {
  const columns = useMemo<ColumnDef<InventoryItem>[]>(
    () => [
      {
        accessorKey: 'code',
        header: 'Código',
        cell: ({ row }) => (
          <div className="text-sm font-medium text-gray-900">
            {row.original.code}
          </div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Nombre',
        cell: ({ row }) => (
          <div>
            <div className="text-sm font-medium text-gray-900">
              {row.original.name}
            </div>
            <div className="text-sm text-gray-500 truncate max-w-xs">
              {row.original.description}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Categoría',
        cell: ({ row }) => (
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(
              row.original.category
            )}`}
          >
            {getCategoryLabel(row.original.category)}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }) => (
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
              row.original.status
            )}`}
          >
            {getStatusLabel(row.original.status)}
          </span>
        ),
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        cell: ({ row }) => (
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${getStockLevelColor(
                  row.original.stock,
                  row.original.minStock
                )}`}
              >
                {getStockLevelIcon(row.original.stock, row.original.minStock)}{' '}
                {formatNumber(row.original.stock)} {row.original.unit}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Mín: {formatNumber(row.original.minStock)}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'location',
        header: 'Ubicación',
        cell: ({ row }) => (
          <div>
            <div className="text-sm text-gray-900">{row.original.location}</div>
            {row.original.warehouse && (
              <div className="text-xs text-gray-500">{row.original.warehouse}</div>
            )}
          </div>
        ),
      },
      {
        accessorKey: 'unitPrice',
        header: 'Valor Unit.',
        cell: ({ row }) => (
          <div className="text-sm text-gray-900">
            {formatCurrency(row.original.unitPrice)}
          </div>
        ),
      },
      {
        accessorKey: 'totalValue',
        header: 'Valor Total',
        cell: ({ row }) => (
          <div className="text-sm font-medium text-gray-900">
            {formatCurrency(row.original.totalValue)}
          </div>
        ),
      },
      {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {onView && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onView(row.original)
                }}
                className="text-blue-600 hover:text-blue-900"
                title="Ver detalles"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(row.original)
                }}
                className="text-green-600 hover:text-green-900"
                title="Editar"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(row.original)
                }}
                className="text-red-600 hover:text-red-900"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ),
      },
    ],
    [onEdit, onDelete, onView]
  )

  return (
    <DataTable
      columns={columns}
      data={items}
      pageSize={10}
      emptyMessage="No se encontraron items en el inventario"
    />
  )
}

