import { TrendingUp, AlertTriangle, Calendar, DollarSign, Target, Clock, Lightbulb, TrendingDown } from 'lucide-react'
import type { Customer } from '@/types'
import { formatCurrency, formatDate, getChurnRiskLevel, formatRelativeDate } from '../utils/customerHelpers'

interface CustomerPredictionsProps {
  customer: Customer
}

export const CustomerPredictions = ({ customer }: CustomerPredictionsProps) => {
  const { predictions } = customer
  const churnRisk = getChurnRiskLevel(predictions.churnProbability)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Columna Izquierda - Indicadores Principales */}
      <div className="lg:col-span-2 space-y-6">
        {/* Score de Riesgo de Pérdida */}
        <div className={`rounded-lg border p-6 ${
          churnRisk.level === 'high' ? 'bg-red-50 border-red-200' :
          churnRisk.level === 'medium' ? 'bg-yellow-50 border-yellow-200' :
          'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              <AlertTriangle className={`w-5 h-5 inline mr-2 ${churnRisk.color}`} />
              Riesgo de Pérdida (Churn)
            </h3>
            <span className={`text-2xl font-bold ${churnRisk.color}`}>
              {(predictions.churnProbability * 100).toFixed(0)}%
            </span>
          </div>
          
          <div className="mb-3">
            <div className="bg-white rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full ${
                  churnRisk.level === 'high' ? 'bg-red-600' :
                  churnRisk.level === 'medium' ? 'bg-yellow-600' :
                  'bg-green-600'
                }`}
                style={{ width: `${predictions.churnProbability * 100}%` }}
              />
            </div>
          </div>
          
          <p className={`text-sm font-medium mb-2 ${
            churnRisk.level === 'high' ? 'text-red-900' :
            churnRisk.level === 'medium' ? 'text-yellow-900' :
            'text-green-900'
          }`}>
            {churnRisk.label}
          </p>
          
          {predictions.churnReasons && predictions.churnReasons.length > 0 && (
            <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200">
              <p className="text-xs font-semibold text-slate-700 mb-2">Razones identificadas:</p>
              <ul className="space-y-1">
                {predictions.churnReasons.map((reason, index) => (
                  <li key={index} className="text-xs text-slate-600">• {reason}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Próxima Oportunidad */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            <TrendingUp className="w-5 h-5 inline mr-2 text-green-600" />
            Próxima Oportunidad Predicha
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {predictions.nextPurchaseDate && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <p className="text-xs font-semibold text-blue-900">Fecha Estimada</p>
                </div>
                <p className="text-lg font-bold text-blue-900">{formatDate(predictions.nextPurchaseDate)}</p>
                <p className="text-xs text-blue-700 mt-1">
                  {formatRelativeDate(predictions.nextPurchaseDate)}
                </p>
              </div>
            )}
            
            {predictions.nextPurchaseValue && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <p className="text-xs font-semibold text-green-900">Valor Estimado</p>
                </div>
                <p className="text-lg font-bold text-green-900">
                  {formatCurrency(predictions.nextPurchaseValue)}
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Basado en historial de compras
                </p>
              </div>
            )}
            
            {predictions.bestContactTime && (
              <div className="col-span-2 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <p className="text-xs font-semibold text-purple-900">Momento Óptimo de Contacto</p>
                </div>
                <p className="text-sm font-medium text-purple-900">
                  {new Date(predictions.bestContactTime).toLocaleDateString('es-CO', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-xs text-purple-700 mt-1">
                  IA recomienda contactar en esta fecha basado en patrones históricos de respuesta
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Servicios Sugeridos */}
        {predictions.suggestedServices.length > 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              <Lightbulb className="w-5 h-5 inline mr-2 text-yellow-600" />
              Servicios Sugeridos (IA)
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Basado en el análisis de clientes similares y patrones de compra, estos servicios tienen alta probabilidad de interés:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {predictions.suggestedServices.map((service, index) => (
                <div
                  key={index}
                  className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{service}</p>
                      <p className="text-xs text-slate-600 mt-1">Recomendado por IA</p>
                    </div>
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recomendaciones de Acción */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            🎯 Recomendaciones de Acción
          </h3>
          <div className="space-y-3">
            {churnRisk.level === 'high' && (
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Acción Urgente Requerida</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Programar reunión inmediata con el cliente para entender preocupaciones y ofrecer soluciones
                  </p>
                </div>
              </div>
            )}
            
            {customer.rfm.recency > 60 && (
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-yellow-200">
                <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Re-engagement Necesario</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Cliente sin contacto por {customer.rfm.recency} días. Enviar email personalizado o hacer llamada de seguimiento
                  </p>
                </div>
              </div>
            )}
            
            {predictions.nextPurchaseDate && (
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
                <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Oportunidad de Upselling</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Preparar propuesta para servicios adicionales antes de {formatDate(predictions.nextPurchaseDate)}
                  </p>
                </div>
              </div>
            )}
            
            {customer.satisfactionScore >= 90 && customer.nps.category === 'promoter' && (
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Cliente Promotor Activo</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Solicitar referidos y testimonio. Cliente altamente satisfecho con alta probabilidad de recomendar
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Columna Derecha - Métricas Adicionales */}
      <div className="space-y-6">
        {/* Tendencia de Inversión */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Tendencia de Inversión</h3>
          <div className="text-center py-6">
            {customer.projectedRevenue > customer.historicRevenue ? (
              <>
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-green-600">Crecimiento</p>
                <p className="text-xs text-slate-600 mt-1">
                  +{((customer.projectedRevenue - customer.historicRevenue) / customer.historicRevenue * 100).toFixed(0)}% proyectado
                </p>
              </>
            ) : (
              <>
                <TrendingDown className="w-12 h-12 text-red-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-red-600">Declive</p>
                <p className="text-xs text-slate-600 mt-1">
                  {((customer.projectedRevenue - customer.historicRevenue) / customer.historicRevenue * 100).toFixed(0)}% proyectado
                </p>
              </>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Histórico:</span>
              <span className="font-medium text-slate-900">{formatCurrency(customer.historicRevenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Proyectado:</span>
              <span className="font-medium text-slate-900">{formatCurrency(customer.projectedRevenue)}</span>
            </div>
          </div>
        </div>

        {/* Score de Confianza IA */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-2">Score de Confianza IA</h3>
          <p className="text-3xl font-bold text-purple-900 mb-1">{customer.rfm.score}/100</p>
          <p className="text-xs text-purple-700">
            Basado en {customer.rfm.frequency} proyectos y {customer.interactions.length} interacciones
          </p>
          
          <div className="mt-4 space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-purple-700">Recencia</span>
                <span className="font-medium text-purple-900">
                  {Math.max(0, 100 - customer.rfm.recency * 0.5).toFixed(0)}%
                </span>
              </div>
              <div className="bg-white rounded-full h-1.5">
                <div
                  className="bg-purple-600 h-1.5 rounded-full"
                  style={{ width: `${Math.max(0, 100 - customer.rfm.recency * 0.5)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-purple-700">Frecuencia</span>
                <span className="font-medium text-purple-900">
                  {Math.min(100, customer.rfm.frequency * 10)}%
                </span>
              </div>
              <div className="bg-white rounded-full h-1.5">
                <div
                  className="bg-purple-600 h-1.5 rounded-full"
                  style={{ width: `${Math.min(100, customer.rfm.frequency * 10)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-purple-700">Valor Monetario</span>
                <span className="font-medium text-purple-900">
                  {Math.min(100, (customer.rfm.monetary / 10000000) * 10)}%
                </span>
              </div>
              <div className="bg-white rounded-full h-1.5">
                <div
                  className="bg-purple-600 h-1.5 rounded-full"
                  style={{ width: `${Math.min(100, (customer.rfm.monetary / 10000000) * 10)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Siguiente Paso Sugerido */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-3">
            🚀 Próximo Paso Sugerido
          </h3>
          {churnRisk.level === 'high' ? (
            <p className="text-xs text-blue-800">
              <strong>Acción inmediata:</strong> Contactar al cliente en las próximas 48 horas para evaluar satisfacción y abordar posibles problemas
            </p>
          ) : predictions.bestContactTime ? (
            <p className="text-xs text-blue-800">
              <strong>Contacto estratégico:</strong> Programar llamada para {formatDate(predictions.bestContactTime)} con propuesta de servicios adicionales
            </p>
          ) : (
            <p className="text-xs text-blue-800">
              <strong>Mantenimiento:</strong> Cliente en buen estado. Seguimiento trimestral recomendado
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
