import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainLayout } from '@/layout/MainLayout'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Customer, CustomerType, CustomerLevel, CustomerStatus } from '@/types'
import { CustomerStats } from './components/CustomerStats'
import { CustomerFilters } from './components/CustomerFilters'
import { CustomerTable } from './components/CustomerTable'
import { CustomerFormModal } from './components/CustomerFormModal'
import { mockCustomers } from './data/mockCustomers'

export const CustomersPage = () => {
  const navigate = useNavigate()
  const [customers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<CustomerType | 'all'>('all')
  const [levelFilter, setLevelFilter] = useState<CustomerLevel | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'all'>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

  // Filtrar clientes
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.city.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === 'all' || customer.type === typeFilter
    const matchesLevel = levelFilter === 'all' || customer.level === levelFilter
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter

    return matchesSearch && matchesType && matchesLevel && matchesStatus
  })

  // Estadísticas rápidas
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    atRisk: customers.filter(c => c.status === 'at-risk').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.historicRevenue, 0),
    avgSatisfaction: Math.round(
      customers.reduce((sum, c) => sum + c.satisfactionScore, 0) / customers.length
    ),
  }

  const handleCreateCustomer = () => {
    setEditingCustomer(null)
    setIsModalOpen(true)
  }

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer)
    setIsModalOpen(true)
  }

  const handleViewCustomer = (customer: Customer) => {
    navigate(`/customers/${customer.id}`)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Clientes (CRM)</h1>
            <p className="text-xs text-slate-600 mt-1">Gestiona tu cartera de clientes y relaciones comerciales</p>
          </div>
          <Button onClick={handleCreateCustomer} className="gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Cliente
          </Button>
        </div>

        {/* Stats */}
        <CustomerStats stats={stats} />

        {/* Filters */}
        <CustomerFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          levelFilter={levelFilter}
          setLevelFilter={setLevelFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Table */}
        <CustomerTable
          customers={filteredCustomers}
          onEdit={handleEditCustomer}
          onView={handleViewCustomer}
        />

        {/* Modal */}
        <CustomerFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          customer={editingCustomer}
        />
      </div>
    </MainLayout>
  )
}
