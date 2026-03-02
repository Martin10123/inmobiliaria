import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MainLayout } from '@/layout/MainLayout'
import { ArrowLeft, Edit2, Mail, Phone, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CustomerOverview } from './components/CustomerOverview'
import { CustomerProjects } from './components/CustomerProjects'
import { CustomerTimeline } from './components/CustomerTimeline'
import { CustomerDocuments } from './components/CustomerDocuments'
import { CustomerPredictions } from './components/CustomerPredictions'
import { mockCustomers } from './data/mockCustomers'
import {
  getCustomerTypeLabel,
  getCustomerLevelLabel,
  getCustomerLevelColor,
  getCustomerStatusLabel,
  getCustomerStatusColor,
  getInitials,
  getAvatarColor
} from './utils/customerHelpers'

type TabType = 'overview' | 'projects' | 'timeline' | 'documents' | 'predictions'

export const CustomerDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  // Buscar el cliente
  const customer = mockCustomers.find(c => c.id === id)

  if (!customer) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-lg text-slate-600">Cliente no encontrado</p>
          <Button onClick={() => navigate('/customers')} className="mt-4">
            Volver a Clientes
          </Button>
        </div>
      </MainLayout>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Información General' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'timeline', label: 'Historial' },
    { id: 'documents', label: 'Documentos' },
    { id: 'predictions', label: 'Análisis Predictivo' },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/customers')}
              className="mt-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${getAvatarColor(customer.name)}`}>
              {getInitials(customer.name)}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-slate-900">{customer.name}</h1>
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getCustomerLevelColor(customer.level)}`}>
                  {getCustomerLevelLabel(customer.level)}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getCustomerStatusColor(customer.status)}`}>
                  {getCustomerStatusLabel(customer.status)}
                </span>
              </div>
              
              <p className="text-sm text-slate-600 mb-2">{getCustomerTypeLabel(customer.type)}</p>
              
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {customer.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {customer.phone}
                </span>
                {customer.website && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <a href={`https://${customer.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {customer.website}
                    </a>
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button className="gap-2">
            <Edit2 className="w-4 h-4" />
            Editar
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && <CustomerOverview customer={customer} />}
          {activeTab === 'projects' && <CustomerProjects customer={customer} />}
          {activeTab === 'timeline' && <CustomerTimeline customer={customer} />}
          {activeTab === 'documents' && <CustomerDocuments customer={customer} />}
          {activeTab === 'predictions' && <CustomerPredictions customer={customer} />}
        </div>
      </div>
    </MainLayout>
  )
}
