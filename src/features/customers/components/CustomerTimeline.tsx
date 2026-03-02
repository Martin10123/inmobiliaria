import { useState } from 'react'
import { Plus, Mail, Phone, Users, FileText, FileCheck, DollarSign, AlertTriangle, CheckCircle, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Customer, InteractionType } from '@/types'
import {
  formatDate,
  formatRelativeDate,
  getInteractionTypeLabel,
  getSentimentLabel,
  getSentimentColor,
  getInitials,
  getAvatarColor
} from '../utils/customerHelpers'

interface CustomerTimelineProps {
  customer: Customer
}

export const CustomerTimeline = ({ customer }: CustomerTimelineProps) => {
  const [typeFilter, setTypeFilter] = useState<InteractionType | 'all'>('all')
  const selectClass = "h-11 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
  
  const filteredInteractions = typeFilter === 'all'
    ? customer.interactions
    : customer.interactions.filter(i => i.type === typeFilter)

  const getInteractionIcon = (type: InteractionType) => {
    const icons = {
      'meeting': Users,
      'call': Phone,
      'email': Mail,
      'quote': FileText,
      'contract': FileCheck,
      'payment': DollarSign,
      'complaint': AlertTriangle,
      'follow-up': CheckCircle
    }
    return icons[type] || FileText
  }

  const getInteractionColor = (type: InteractionType): string => {
    const colors = {
      'meeting': 'bg-blue-100 text-blue-600',
      'call': 'bg-green-100 text-green-600',
      'email': 'bg-purple-100 text-purple-600',
      'quote': 'bg-yellow-100 text-yellow-600',
      'contract': 'bg-indigo-100 text-indigo-600',
      'payment': 'bg-emerald-100 text-emerald-600',
      'complaint': 'bg-red-100 text-red-600',
      'follow-up': 'bg-teal-100 text-teal-600'
    }
    return colors[type] || 'bg-slate-100 text-slate-600'
  }

  return (
    <div className="space-y-6">
      {/* Header con Filtros */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as InteractionType | 'all')}
            className={selectClass}
          >
            <option value="all">Todos los tipos</option>
            <option value="meeting">Reuniones</option>
            <option value="call">Llamadas</option>
            <option value="email">Emails</option>
            <option value="quote">Cotizaciones</option>
            <option value="contract">Contratos</option>
            <option value="payment">Pagos</option>
            <option value="complaint">Reclamos</option>
            <option value="follow-up">Seguimientos</option>
          </select>
          <span className="text-sm text-slate-600">
            {filteredInteractions.length} interacciones
          </span>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nueva Interacción
        </Button>
      </div>

      {/* Timeline */}
      {filteredInteractions.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
          <p className="text-slate-600">No hay interacciones registradas</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInteractions.map((interaction, index) => {
            const Icon = getInteractionIcon(interaction.type)
            
            return (
              <div key={interaction.id} className="relative">
                {/* Línea del timeline (excepto en el último elemento) */}
                {index !== filteredInteractions.length - 1 && (
                  <div className="absolute left-7 top-14 bottom-0 w-0.5 bg-slate-200" />
                )}
                
                <div className="bg-white rounded-lg border border-slate-200 p-4 ml-14 relative">
                  {/* Icono del tipo de interacción */}
                  <div className={`absolute -left-14 top-4 w-10 h-10 rounded-full flex items-center justify-center ${getInteractionColor(interaction.type)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  {/* Contenido */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold ${getAvatarColor(interaction.user.name)}`}>
                        {getInitials(interaction.user.name)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-slate-900">
                            {getInteractionTypeLabel(interaction.type)}
                          </h4>
                          {interaction.sentiment && (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getSentimentColor(interaction.sentiment)}`}>
                              {getSentimentLabel(interaction.sentiment)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">
                          {interaction.user.name} • {formatDate(interaction.date)} ({formatRelativeDate(interaction.date)})
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-700 mb-3">
                    {interaction.description}
                  </p>
                  
                  {/* Tags */}
                  {interaction.tags.length > 0 && (
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-3 h-3 text-slate-400" />
                      {interaction.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Archivos adjuntos */}
                  {interaction.attachments.length > 0 && (
                    <div className="mt-3 p-2 bg-slate-50 rounded border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1 font-medium">Archivos adjuntos:</p>
                      <div className="space-y-1">
                        {interaction.attachments.map((file, fileIndex) => (
                          <div key={fileIndex} className="flex items-center gap-2 text-xs text-blue-600 hover:underline cursor-pointer">
                            <FileText className="w-3 h-3" />
                            {file}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
      
      {/* Estadísticas de Interacciones */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Resumen de Interacciones</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {customer.interactions.length}
            </p>
            <p className="text-xs text-slate-500">Total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {customer.interactions.filter(i => i.type === 'meeting').length}
            </p>
            <p className="text-xs text-slate-500">Reuniones</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {customer.interactions.filter(i => i.sentiment === 'positive').length}
            </p>
            <p className="text-xs text-slate-500">Positivas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {customer.interactions.filter(i => i.type === 'quote').length}
            </p>
            <p className="text-xs text-slate-500">Cotizaciones</p>
          </div>
        </div>
      </div>
    </div>
  )
}
