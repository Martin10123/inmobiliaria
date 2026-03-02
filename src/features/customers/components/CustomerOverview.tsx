import { MapPin, User, Calendar, DollarSign, Star, AlertCircle } from 'lucide-react'
import type { Customer } from '@/types'
import {
  formatCurrency,
  formatDate,
  formatRelativeDate,
  getCustomerSourceLabel,
  getNPSCategoryLabel,
  getNPSCategoryColor,
  getSatisfactionLevel
} from '../utils/customerHelpers'

interface CustomerOverviewProps {
  customer: Customer
}

export const CustomerOverview = ({ customer }: CustomerOverviewProps) => {
  const satisfactionLevel = getSatisfactionLevel(customer.satisfactionScore)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Columna Izquierda - Información Principal */}
      <div className="lg:col-span-2 space-y-6">
        {/* Información de Contacto */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Información de Contacto</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Teléfono</p>
              <p className="text-sm font-medium text-slate-900">{customer.phone}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Email</p>
              <p className="text-sm font-medium text-slate-900">{customer.email}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-slate-500 mb-1">
                <MapPin className="w-3 h-3 inline mr-1" />
                Dirección
              </p>
              <p className="text-sm font-medium text-slate-900">{customer.address}</p>
              <p className="text-xs text-slate-600">{customer.city}, {customer.country}</p>
            </div>
            {customer.nit && (
              <div>
                <p className="text-xs text-slate-500 mb-1">NIT</p>
                <p className="text-sm font-medium text-slate-900">{customer.nit}</p>
              </div>
            )}
            {customer.website && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Sitio Web</p>
                <a
                  href={`https://${customer.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  {customer.website}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Ejecutivo de Cuenta */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            <User className="w-5 h-5 inline mr-2" />
            Ejecutivo de Cuenta
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              {customer.accountExecutive.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-slate-900">{customer.accountExecutive.name}</p>
              <p className="text-sm text-slate-600">{customer.accountExecutive.email}</p>
              {customer.accountExecutive.phone && (
                <p className="text-sm text-slate-600">{customer.accountExecutive.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Métricas Financieras */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            <DollarSign className="w-5 h-5 inline mr-2" />
            Información Financiera
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Revenue Histórico</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(customer.historicRevenue)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Customer Lifetime Value</p>
              <p className="text-lg font-bold text-purple-600">{formatCurrency(customer.clv)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Revenue Proyectado</p>
              <p className="text-lg font-bold text-green-600">{formatCurrency(customer.projectedRevenue)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Límite de Crédito</p>
              <p className="text-lg font-bold text-blue-600">{formatCurrency(customer.creditLimit)}</p>
            </div>
            {customer.pendingDebt > 0 && (
              <div className="col-span-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-xs text-orange-700 mb-1 font-medium">
                  <AlertCircle className="w-3 h-3 inline mr-1" />
                  Deuda Pendiente
                </p>
                <p className="text-lg font-bold text-orange-800">{formatCurrency(customer.pendingDebt)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Resumen de Proyectos */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Resumen de Proyectos</h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-2xl font-bold text-slate-900">{customer.projects.total}</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{customer.projects.active}</p>
              <p className="text-xs text-slate-500">Activos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{customer.projects.completed}</p>
              <p className="text-xs text-slate-500">Completados</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{customer.projects.cancelled}</p>
              <p className="text-xs text-slate-500">Cancelados</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Cumplimiento Presupuesto</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${customer.projects.budgetComplianceRate}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-900">
                  {customer.projects.budgetComplianceRate}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Cumplimiento Plazos</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${customer.projects.deadlineComplianceRate}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-900">
                  {customer.projects.deadlineComplianceRate}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Columna Derecha - Métricas y Datos Adicionales */}
      <div className="space-y-6">
        {/* Métricas RFM */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Métricas RFM</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-slate-500">Score RFM</p>
                <p className="text-sm font-bold text-slate-900">{customer.rfm.score}/100</p>
              </div>
              <div className="bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${customer.rfm.score}%` }}
                />
              </div>
            </div>
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex justify-between">
                <p className="text-xs text-slate-500">Recency (días)</p>
                <p className="text-sm font-medium text-slate-900">{customer.rfm.recency}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-slate-500">Frequency (proyectos)</p>
                <p className="text-sm font-medium text-slate-900">{customer.rfm.frequency}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-slate-500">Monetary (revenue)</p>
                <p className="text-sm font-medium text-slate-900">
                  {formatCurrency(customer.rfm.monetary)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Satisfacción y NPS */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            <Star className="w-5 h-5 inline mr-2" />
            Satisfacción
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-slate-500">Score de Satisfacción</p>
                <span className={`text-sm font-bold ${satisfactionLevel.color}`}>
                  {customer.satisfactionScore}% • {satisfactionLevel.label}
                </span>
              </div>
              <div className="bg-slate-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    customer.satisfactionScore >= 90 ? 'bg-green-600' :
                    customer.satisfactionScore >= 75 ? 'bg-blue-600' :
                    customer.satisfactionScore >= 60 ? 'bg-yellow-600' :
                    'bg-red-600'
                  }`}
                  style={{ width: `${customer.satisfactionScore}%` }}
                />
              </div>
            </div>
            
            {customer.nps.score !== undefined && (
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-slate-500">Net Promoter Score</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getNPSCategoryColor(customer.nps.category!)}`}>
                    {getNPSCategoryLabel(customer.nps.category!)}
                  </span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{customer.nps.score}/10</p>
                {customer.nps.lastSurvey && (
                  <p className="text-xs text-slate-500 mt-1">
                    Última encuesta: {formatDate(customer.nps.lastSurvey)}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Información Adicional */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            <Calendar className="w-5 h-5 inline mr-2" />
            Información Adicional
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-500 mb-1">Segmento</p>
              <p className="text-sm font-medium text-slate-900">{customer.segment}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Fuente de Adquisición</p>
              <p className="text-sm font-medium text-slate-900">
                {getCustomerSourceLabel(customer.source)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Fecha de Registro</p>
              <p className="text-sm font-medium text-slate-900">{formatDate(customer.registrationDate)}</p>
            </div>
            {customer.lastInteraction && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Última Interacción</p>
                <p className="text-sm font-medium text-slate-900">
                  {formatRelativeDate(customer.lastInteraction)}
                </p>
                <p className="text-xs text-slate-500">{formatDate(customer.lastInteraction)}</p>
              </div>
            )}
            {customer.tags.length > 0 && (
              <div>
                <p className="text-xs text-slate-500 mb-2">Etiquetas</p>
                <div className="flex flex-wrap gap-1">
                  {customer.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-slate-100 text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alertas */}
        {(customer.status === 'at-risk' || customer.pendingDebt > 0 || customer.predictions.churnProbability > 0.5) && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-orange-900 mb-2">
              <AlertCircle className="w-4 h-4 inline mr-1" />
              Alertas
            </h3>
            <ul className="space-y-1 text-xs text-orange-800">
              {customer.status === 'at-risk' && (
                <li>• Cliente en riesgo de pérdida</li>
              )}
              {customer.pendingDebt > 0 && (
                <li>• Cliente tiene deuda pendiente</li>
              )}
              {customer.predictions.churnProbability > 0.5 && (
                <li>• Alta probabilidad de abandono detectada</li>
              )}
              {customer.rfm.recency > 90 && (
                <li>• Sin contacto por más de 90 días</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
