import { useState } from 'react'
import type { RequestType, Priority, RequestFormData, RequestItem } from '@/types'
import { Modal } from '@/components/ui/modal'

interface RequestFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: RequestFormData) => void
}

export default function RequestFormModal({ isOpen, onClose, onSubmit }: RequestFormModalProps) {
  const [formData, setFormData] = useState<RequestFormData>({
    type: 'material_requirement',
    title: '',
    description: '',
    priority: 'medium',
    items: []
  })

  const [newItem, setNewItem] = useState<Partial<RequestItem>>({
    name: '',
    description: '',
    quantity: 1,
    unit: 'unidad'
  })

  const handleAddItem = () => {
    if (!newItem.name || !newItem.quantity) return

    const item: RequestItem = {
      id: `item-${Date.now()}`,
      name: newItem.name,
      description: newItem.description || '',
      quantity: newItem.quantity,
      unit: newItem.unit || 'unidad',
      estimatedCost: newItem.estimatedCost
    }

    setFormData({
      ...formData,
      items: [...formData.items, item]
    })

    setNewItem({
      name: '',
      description: '',
      quantity: 1,
      unit: 'unidad'
    })
  }

  const handleRemoveItem = (itemId: string) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== itemId)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.items.length === 0) {
      alert('Debe agregar al menos un item')
      return
    }
    onSubmit(formData)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      type: 'material_requirement',
      title: '',
      description: '',
      priority: 'medium',
      items: []
    })
    setNewItem({
      name: '',
      description: '',
      quantity: 1,
      unit: 'unidad'
    })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Nueva Solicitud"
      maxWidth="4xl"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Información Básica */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Solicitud *
            </label>
            <select
              value={formData.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, type: e.target.value as RequestType })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="material_requirement">Requerimiento de Materiales</option>
              <option value="equipment_requirement">Requerimiento de Equipos</option>
              <option value="loan">Préstamo de Equipo</option>
              <option value="maintenance">Mantenimiento</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridad *
            </label>
            <select
              value={formData.priority}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, priority: e.target.value as Priority })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ej: Materiales para Fase de Acabados"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción *
          </label>
          <textarea
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe la solicitud..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha Requerida (Opcional)
          </label>
          <input
            type="date"
            value={formData.requiredDate || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, requiredDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Items */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Items Solicitados</h4>
          
          {/* Lista de items agregados */}
          {formData.items.length > 0 && (
            <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-gray-600 font-medium">Item</th>
                    <th className="px-3 py-2 text-right text-gray-600 font-medium">Cantidad</th>
                    <th className="px-3 py-2 text-left text-gray-600 font-medium">Unidad</th>
                    <th className="px-3 py-2 text-right text-gray-600 font-medium">Costo</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {formData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-3 py-2">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        {item.description && (
                          <p className="text-xs text-gray-500">{item.description}</p>
                        )}
                      </td>
                      <td className="px-3 py-2 text-right">{item.quantity}</td>
                      <td className="px-3 py-2">{item.unit}</td>
                      <td className="px-3 py-2 text-right">
                        {item.estimatedCost ? `$${item.estimatedCost.toLocaleString()}` : '-'}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-800 text-xs"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Formulario para agregar item */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">Agregar Item</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Nombre del Item
                </label>
                <input
                  type="text"
                  value={newItem.name || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Ej: Cemento gris x 50kg"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Descripción (opcional)
                </label>
                <input
                  type="text"
                  value={newItem.description || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Detalles adicionales"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Cantidad
                </label>
                <input
                  type="number"
                  value={newItem.quantity || 1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                  min="1"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Unidad
                </label>
                <input
                  type="text"
                  value={newItem.unit || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({ ...newItem, unit: e.target.value })}
                  placeholder="Ej: bultos, m³, unidad"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Costo Estimado (opcional)
                </label>
                <input
                  type="number"
                  value={newItem.estimatedCost || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({ ...newItem, estimatedCost: parseInt(e.target.value) || undefined })}
                  placeholder="0"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  + Agregar Item
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Crear Solicitud
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  )
}
