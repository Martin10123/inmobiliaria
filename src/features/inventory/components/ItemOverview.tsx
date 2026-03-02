import type { InventoryItem } from '../../../types'
import { 
  Package, 
  MapPin, 
  DollarSign, 
  Calendar,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Warehouse,
  Users
} from 'lucide-react'
import { 
  formatCurrency, 
  formatDate,
  getCategoryLabel,
  getCategoryColor,
  getStatusLabel,
  getStatusColor,
  getStockLevelIcon,
  getStockLevelColor,
  formatNumber
} from '../utils/inventoryHelpers'

interface ItemOverviewProps {
  item: InventoryItem
}

export default function ItemOverview({ item }: ItemOverviewProps) {
  const stockLevel = item.stock <= item.minStock ? 'low' : 'normal'
  const stockPercentage = item.maxStock 
    ? Math.min(Math.round((item.stock / item.maxStock) * 100), 100)
    : 100

  return (
    <div className="space-y-6">
      {/* Alertas */}
      {item.stock === 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-900">Item Agotado</h4>
            <p className="text-sm text-red-700">Este item no tiene stock disponible. Considere realizar una orden de compra.</p>
          </div>
        </div>
      )}

      {item.stock > 0 && item.stock <= item.minStock && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900">Stock Bajo</h4>
            <p className="text-sm text-yellow-700">
              El stock actual ({item.stock} {item.unit}) está por debajo del mínimo ({item.minStock} {item.unit})
            </p>
          </div>
        </div>
      )}

      {/* Información Principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna Izquierda */}
        <div className="space-y-6">
          {/* Detalles Básicos */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Información del Item
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Código</label>
                <p className="text-base font-semibold text-gray-900">{item.code}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Nombre</label>
                <p className="text-base text-gray-900">{item.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Descripción</label>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Categoría</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)} mt-1`}>
                    {getCategoryLabel(item.category)}
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Estado</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)} mt-1`}>
                    {getStatusLabel(item.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Ubicación
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Ubicación Específica</label>
                <p className="text-base text-gray-900">{item.location}</p>
              </div>

              {item.warehouse && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Almacén/Bodega</label>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <Warehouse className="w-4 h-4" />
                    {item.warehouse}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="space-y-6">
          {/* Stock */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Control de Stock
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-500">Stock Actual</label>
                  <span className={`px-3 py-1 text-sm font-bold rounded ${getStockLevelColor(item.stock, item.minStock)}`}>
                    {getStockLevelIcon(item.stock, item.minStock)} {formatNumber(item.stock)} {item.unit}
                  </span>
                </div>
                
                {/* Barra de progreso */}
                {item.maxStock && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          stockLevel === 'low' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${stockPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{stockPercentage}% del stock máximo</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Stock Mínimo</label>
                  <p className="text-base font-semibold text-gray-900">{formatNumber(item.minStock)} {item.unit}</p>
                </div>

                {item.maxStock && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Stock Máximo</label>
                    <p className="text-base font-semibold text-gray-900">{formatNumber(item.maxStock)} {item.unit}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Unidad de Medida</label>
                <p className="text-base text-gray-900">{item.unit}</p>
              </div>
            </div>
          </div>

          {/* Información Financiera */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Información Financiera
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Precio Unitario</label>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(item.unitPrice)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Valor Total en Stock</label>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(item.totalValue)}</p>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Stock:</span>
                    <span className="ml-2 font-semibold text-gray-900">{formatNumber(item.stock)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">× Precio:</span>
                    <span className="ml-2 font-semibold text-gray-900">{formatCurrency(item.unitPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información del Proveedor */}
          {item.supplierId && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Proveedor
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">ID Proveedor</label>
                  <p className="text-base text-gray-900">{item.supplierId}</p>
                </div>

                {item.supplierName && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Nombre</label>
                    <p className="text-base text-gray-900">{item.supplierName}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fechas */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Fechas Importantes
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Fecha de Creación</label>
            <p className="text-base text-gray-900">{formatDate(item.createdAt)}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Última Actualización</label>
            <p className="text-base text-gray-900">{formatDate(item.updatedAt)}</p>
          </div>

          {item.lastRestockDate && (
            <div>
              <label className="text-sm font-medium text-gray-500">Último Reabastecimiento</label>
              <p className="text-base text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                {formatDate(item.lastRestockDate)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
