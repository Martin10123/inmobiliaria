import { Eye, Edit2, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Customer } from '@/types'
import {
  formatCurrency,
  getCustomerTypeLabel,
  getCustomerLevelLabel,
  getCustomerLevelColor,
  getCustomerStatusLabel,
  getCustomerStatusColor,
  formatRelativeDate,
  getInitials,
  getAvatarColor
} from '../utils/customerHelpers'

interface CustomerTableProps {
  customers: Customer[]
  onEdit: (customer: Customer) => void
  onView: (customer: Customer) => void
}

export const CustomerTable = ({ customers, onEdit, onView }: CustomerTableProps) => {
  if (customers.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
        <p className="text-slate-600">No se encontraron clientes</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                Cliente
              </th>
              <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                Tipo
              </th>
              <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                Nivel
              </th>
              <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                Ejecutivo
              </th>
              <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                Proyectos
              </th>
              <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                Revenue
              </th>
              <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                Última Interacción
              </th>
              <th className="text-left text-xs font-semibold text-slate-700 px-4 py-3">
                Estado
              </th>
              <th className="text-center text-xs font-semibold text-slate-700 px-4 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                {/* Cliente */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor(customer.name)}`}>
                      {getInitials(customer.name)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{customer.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Mail className="w-3 h-3" />
                          {customer.email}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Phone className="w-3 h-3" />
                          {customer.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Tipo */}
                <td className="px-4 py-3">
                  <p className="text-sm text-slate-700">{getCustomerTypeLabel(customer.type)}</p>
                  <p className="text-xs text-slate-500">{customer.city}</p>
                </td>

                {/* Nivel */}
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getCustomerLevelColor(customer.level)}`}>
                    {getCustomerLevelLabel(customer.level)}
                  </span>
                </td>

                {/* Ejecutivo */}
                <td className="px-4 py-3">
                  <p className="text-sm text-slate-700">{customer.accountExecutive.name}</p>
                  <p className="text-xs text-slate-500">{customer.accountExecutive.email}</p>
                </td>

                {/* Proyectos */}
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <p className="text-slate-700 font-medium">{customer.projects.total} total</p>
                    <p className="text-xs text-slate-500">
                      {customer.projects.active} activos • {customer.projects.completed} completados
                    </p>
                  </div>
                </td>

                {/* Revenue */}
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-slate-900">{formatCurrency(customer.historicRevenue)}</p>
                  <p className="text-xs text-slate-500">CLV: {formatCurrency(customer.clv)}</p>
                </td>

                {/* Última Interacción */}
                <td className="px-4 py-3">
                  <p className="text-sm text-slate-700">
                    {customer.lastInteraction 
                      ? formatRelativeDate(customer.lastInteraction)
                      : 'Sin interacciones'
                    }
                  </p>
                  <p className="text-xs text-slate-500">Satisfacción: {customer.satisfactionScore}%</p>
                </td>

                {/* Estado */}
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getCustomerStatusColor(customer.status)}`}>
                    {getCustomerStatusLabel(customer.status)}
                  </span>
                </td>

                {/* Acciones */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(customer)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(customer)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
