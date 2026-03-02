import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MainLayout } from '@/layout/MainLayout'
import {
  ArrowLeft,
  Edit,
  Package,
  Activity,
  FileText,
  Wrench,
  Info
} from 'lucide-react'
import { mockInventory } from './data/mockInventory'
import ItemOverview from './components/ItemOverview'
import MovementHistory from './components/MovementHistory'
import ItemDocuments from './components/ItemDocuments'
import MaintenanceHistory from './components/MaintenanceHistory'
import {
  getCategoryLabel,
  getCategoryColor,
  getStatusLabel,
  getStatusColor
} from './utils/inventoryHelpers'

type TabType = 'overview' | 'movements' | 'documents' | 'maintenance'

export default function InventoryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const item = mockInventory.find(i => i.id === id)

  if (!item) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Item no encontrado</p>
          <button
            onClick={() => navigate('/inventory')}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Volver al inventario
          </button>
        </div>
      </MainLayout>
    )
  }

  const tabs = [
    { id: 'overview', label: 'General', icon: <Info className="w-4 h-4" /> },
    { id: 'movements', label: 'Movimientos', icon: <Activity className="w-4 h-4" /> },
    { id: 'documents', label: 'Documentos', icon: <FileText className="w-4 h-4" /> },
    { id: 'maintenance', label: 'Mantenimiento', icon: <Wrench className="w-4 h-4" /> },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <button
              onClick={() => navigate('/inventory')}
              className="mt-1 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                  {getStatusLabel(item.status)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
                  {item.code}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                  {getCategoryLabel(item.category)}
                </span>
                <span>•</span>
                <span>{item.location}</span>
              </div>
            </div>
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Editar
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`
                  flex items-center gap-2 px-1 py-3 text-sm font-medium border-b-2 transition-colors
                  ${activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && <ItemOverview item={item} />}
          {activeTab === 'movements' && <MovementHistory itemId={item.id} />}
          {activeTab === 'documents' && <ItemDocuments itemId={item.id} />}
          {activeTab === 'maintenance' && <MaintenanceHistory itemId={item.id} />}
        </div>
      </div>
    </MainLayout>
  )
}
