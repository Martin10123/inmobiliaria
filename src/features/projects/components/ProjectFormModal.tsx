import { useState, useEffect } from 'react'
import { X, Save, Users, FileText, DollarSign, MapPin, Calendar, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Project, ProjectFormData, Client, Contract, ProjectType, ProjectStatus, Priority } from '@/types'
import { useModal } from '@/hooks/useModal'

interface ProjectFormModalProps {
  isOpen: boolean
  onClose: () => void
  project?: Project | null
}

// Mock data para clientes y contratos
const mockClients: Client[] = [
  { id: '1', name: 'Constructora ABC S.A.', email: 'contacto@abc.com', phone: '3001234567', company: 'ABC', status: 'active' },
  { id: '2', name: 'Inversiones XYZ Ltda', email: 'info@xyz.com', phone: '3007654321', company: 'XYZ', status: 'active' },
  { id: '3', name: 'Grupo Empresarial DEF', email: 'ventas@def.com', phone: '3009876543', company: 'DEF', status: 'active' },
  { id: '4', name: 'Desarrollos GHI S.A.S', email: 'proyectos@ghi.com', phone: '3005551234', company: 'GHI', status: 'active' },
  { id: '5', name: 'Inmobiliaria JKL', email: 'atencion@jkl.com', phone: '3004443333', company: 'JKL', status: 'active' },
]

const mockContracts: Contract[] = [
  { id: '1', code: 'CTR-2026-001', title: 'Contrato Torre Centro', clientId: '1', clientName: 'Constructora ABC S.A.', amount: 5000000, startDate: '2026-01-15', endDate: '2026-12-31', status: 'active' },
  { id: '2', code: 'CTR-2026-002', title: 'Contrato Remodelación CC', clientId: '3', clientName: 'Grupo Empresarial DEF', amount: 2000000, startDate: '2026-03-01', endDate: '2026-08-31', status: 'active' },
  { id: '3', code: 'CTR-2025-045', title: 'Contrato Urbanización Fase 1', clientId: '4', clientName: 'Desarrollos GHI S.A.S', amount: 4000000, startDate: '2025-01-10', endDate: '2025-12-20', status: 'active' },
  { id: '4', code: 'CTR-2025-046', title: 'Contrato Urbanización Fase 2', clientId: '4', clientName: 'Desarrollos GHI S.A.S', amount: 4000000, startDate: '2025-06-01', endDate: '2025-12-20', status: 'active' },
  { id: '5', code: 'CTR-2026-003', title: 'Contrato Mar Azul', clientId: '5', clientName: 'Inmobiliaria JKL', amount: 6500000, startDate: '2026-02-01', endDate: '2027-02-01', status: 'active' },
]

const mockManagers = [
  { id: '1', name: 'Carlos Rodríguez' },
  { id: '2', name: 'Ana María López' },
  { id: '3', name: 'Miguel Ángel Torres' },
  { id: '4', name: 'Laura Fernández' },
]

export const ProjectFormModal = ({ isOpen, onClose, project }: ProjectFormModalProps) => {
  const { contentRef, handleBackdropClick } = useModal({ isOpen, onClose })
  
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    type: 'construction',
    status: 'planning',
    priority: 'medium',
    plannedStartDate: '',
    plannedEndDate: '',
    clientIds: [],
    contractIds: [],
    managerId: '',
    budget: 0,
    projectedRevenue: 0,
    address: '',
    city: '',
  })

  const [selectedClients, setSelectedClients] = useState<string[]>([])
  const [selectedContracts, setSelectedContracts] = useState<string[]>([])

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        type: project.type,
        status: project.status,
        priority: project.priority,
        plannedStartDate: project.plannedStartDate,
        plannedEndDate: project.plannedEndDate,
        clientIds: project.clientIds,
        contractIds: project.contractIds,
        managerId: project.managerId,
        budget: project.budget,
        projectedRevenue: project.projectedRevenue,
        address: project.address || '',
        city: project.city || '',
      })
      setSelectedClients(project.clientIds)
      setSelectedContracts(project.contractIds)
    } else {
      // Reset form
      setFormData({
        name: '',
        description: '',
        type: 'construction',
        status: 'planning',
        priority: 'medium',
        plannedStartDate: '',
        plannedEndDate: '',
        clientIds: [],
        contractIds: [],
        managerId: '',
        budget: 0,
        projectedRevenue: 0,
        address: '',
        city: '',
      })
      setSelectedClients([])
      setSelectedContracts([])
    }
  }, [project, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { ...formData, clientIds: selectedClients, contractIds: selectedContracts })
    // Aquí iría la lógica para guardar
    onClose()
  }

  const toggleClient = (clientId: string) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    )
  }

  const toggleContract = (contractId: string) => {
    setSelectedContracts(prev =>
      prev.includes(contractId)
        ? prev.filter(id => id !== contractId)
        : [...prev, contractId]
    )
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        ref={contentRef}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {project ? 'Editar Proyecto' : 'Nuevo Proyecto'}
              </h2>
              <p className="text-xs text-slate-600">
                {project ? 'Actualiza la información del proyecto' : 'Completa los datos del nuevo proyecto'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="px-6 py-6 space-y-6">
            {/* Información Básica */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Información Básica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Nombre del Proyecto *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ej. Torre Empresarial Centro"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description">Descripción</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe el proyecto..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-20"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Tipo de Proyecto *</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as ProjectType })}
                    className="h-11 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    required
                  >
                    <option value="construction">Construcción</option>
                    <option value="remodeling">Remodelación</option>
                    <option value="urbanization">Urbanización</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="status">Estado *</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
                    className="h-11 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    required
                  >
                    <option value="planning">Planeación</option>
                    <option value="in-progress">En Curso</option>
                    <option value="paused">Pausado</option>
                    <option value="completed">Completado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="priority">Prioridad *</Label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                    className="h-11 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    required
                  >
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="manager">Responsable *</Label>
                  <select
                    id="manager"
                    value={formData.managerId}
                    onChange={(e) => setFormData({ ...formData, managerId: e.target.value })}
                    className="h-11 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    required
                  >
                    <option value="">Seleccionar...</option>
                    {mockManagers.map(manager => (
                      <option key={manager.id} value={manager.id}>{manager.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Fechas */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Fechas del Proyecto
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Fecha de Inicio Planificada *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.plannedStartDate}
                    onChange={(e) => setFormData({ ...formData, plannedStartDate: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">Fecha de Fin Planificada *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.plannedEndDate}
                    onChange={(e) => setFormData({ ...formData, plannedEndDate: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Financiero */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Información Financiera
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Presupuesto *</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                    placeholder="0"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="revenue">Ingresos Proyectados</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={formData.projectedRevenue}
                    onChange={(e) => setFormData({ ...formData, projectedRevenue: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Ubicación
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="ej. Calle 50 #25-30"
                  />
                </div>

                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="ej. Cartagena"
                  />
                </div>
              </div>
            </div>

            {/* Clientes */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Clientes Asociados
              </h3>
              <div className="border border-slate-200 rounded-lg p-4 max-h-48 overflow-y-auto space-y-2">
                {mockClients.map(client => (
                  <label
                    key={client.id}
                    className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(client.id)}
                      onChange={() => toggleClient(client.id)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{client.name}</p>
                      <p className="text-xs text-slate-500">{client.email}</p>
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {selectedClients.length} cliente(s) seleccionado(s)
              </p>
            </div>

            {/* Contratos */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Contratos Ligados
              </h3>
              <div className="border border-slate-200 rounded-lg p-4 max-h-48 overflow-y-auto space-y-2">
                {mockContracts.map(contract => (
                  <label
                    key={contract.id}
                    className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedContracts.includes(contract.id)}
                      onChange={() => toggleContract(contract.id)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{contract.title}</p>
                      <p className="text-xs text-slate-500">
                        {contract.code} • {contract.clientName} • ${contract.amount.toLocaleString()}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {selectedContracts.length} contrato(s) seleccionado(s)
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
            <Button type="button" onClick={onClose} variant="outline">
              Cancelar
            </Button>
            <Button type="submit" className="gap-2">
              <Save className="w-4 h-4" />
              {project ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
