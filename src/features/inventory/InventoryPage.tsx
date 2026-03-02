import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { MainLayout } from '@/layout/MainLayout'
import type { InventoryItem, InventoryFormData, InventoryCategory, InventoryStatus } from '../../types'
import InventoryStats from './components/InventoryStats'
import InventoryFilters from './components/InventoryFilters'
import InventoryTable from './components/InventoryTable'
import InventoryFormModal from './components/InventoryFormModal'
import { mockInventory } from './data/mockInventory'

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(mockInventory)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<InventoryCategory | 'all'>('all')
  const [selectedStatus, setSelectedStatus] = useState<InventoryStatus | 'all'>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)

  // Filtrar items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory

      const matchesStatus =
        selectedStatus === 'all' || item.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [items, searchTerm, selectedCategory, selectedStatus])

  const handleCreateItem = (data: InventoryFormData) => {
    const newItem: InventoryItem = {
      id: String(items.length + 1),
      code: `${data.category.toUpperCase()}-${String(items.length + 1).padStart(3, '0')}`,
      name: data.name,
      description: data.description,
      category: data.category,
      status: 'available',
      stock: data.stock,
      minStock: data.minStock,
      maxStock: data.maxStock,
      unit: data.unit,
      location: data.location,
      warehouse: data.warehouse,
      unitPrice: data.unitPrice,
      totalValue: data.unitPrice * data.stock,
      supplierId: data.supplierId,
      supplierName: data.supplierId ? 'Proveedor Ejemplo' : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin',
      image: data.image
    }
    setItems([...items, newItem])
  }

  const handleUpdateItem = (data: InventoryFormData) => {
    if (!editingItem) return

    const updatedItems = items.map((item) =>
      item.id === editingItem.id
        ? {
            ...item,
            name: data.name,
            description: data.description,
            category: data.category,
            stock: data.stock,
            minStock: data.minStock,
            maxStock: data.maxStock,
            unit: data.unit,
            location: data.location,
            warehouse: data.warehouse,
            unitPrice: data.unitPrice,
            totalValue: data.unitPrice * data.stock,
            supplierId: data.supplierId,
            image: data.image,
            updatedAt: new Date().toISOString()
          }
        : item
    )
    setItems(updatedItems)
    setEditingItem(null)
  }

  const handleDeleteItem = (item: InventoryItem) => {
    if (window.confirm(`¿Está seguro de eliminar "${item.name}"?`)) {
      setItems(items.filter((i) => i.id !== item.id))
    }
  }

  const handleEditClick = (item: InventoryItem) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const handleModalSubmit = (data: InventoryFormData) => {
    if (editingItem) {
      handleUpdateItem(data)
    } else {
      handleCreateItem(data)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventario</h1>
            <p className="text-gray-600 mt-1">
              Gestión y control de inventario
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <Plus className="w-5 h-5" />
            Nuevo Item
          </button>
        </div>

        {/* Estadísticas */}
        <InventoryStats items={items} />

        {/* Filtros */}
        <InventoryFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        {/* Tabla */}
        <InventoryTable
          items={filteredItems}
          onEdit={handleEditClick}
          onDelete={handleDeleteItem}
        />

        {/* Modal */}
        <InventoryFormModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          item={editingItem}
        />
      </div>
    </MainLayout>
  )
}
