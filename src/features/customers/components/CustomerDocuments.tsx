import { Plus, Download, Eye, Trash2, FileText, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Customer, CustomerDocumentType, DocumentStatus } from '@/types'
import { formatDate, formatRelativeDate, getInitials, getAvatarColor } from '../utils/customerHelpers'

interface CustomerDocumentsProps {
  customer: Customer
}

export const CustomerDocuments = ({ customer }: CustomerDocumentsProps) => {
  const getDocumentTypeLabel = (type: CustomerDocumentType): string => {
    const labels: Record<CustomerDocumentType, string> = {
      'contract': 'Contrato',
      'quote': 'Cotización',
      'invoice': 'Factura',
      'nda': 'NDA',
      'permit': 'Permiso',
      'other': 'Otro'
    }
    return labels[type]
  }

  const getDocumentStatusLabel = (status: DocumentStatus): string => {
    const labels: Record<DocumentStatus, string> = {
      'active': 'Vigente',
      'expired': 'Vencido',
      'pending-renewal': 'Por Renovar'
    }
    return labels[status]
  }

  const getDocumentStatusColor = (status: DocumentStatus): string => {
    const colors: Record<DocumentStatus, string> = {
      'active': 'bg-green-100 text-green-800 border-green-200',
      'expired': 'bg-red-100 text-red-800 border-red-200',
      'pending-renewal': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
    return colors[status]
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1048576).toFixed(1)} MB`
  }

  // Agrupar documentos por tipo
  const documentsByType = customer.documents.reduce((acc, doc) => {
    if (!acc[doc.type]) acc[doc.type] = []
    acc[doc.type].push(doc)
    return acc
  }, {} as Record<CustomerDocumentType, typeof customer.documents>)

  // Contar documentos por estado
  const stats = {
    total: customer.documents.length,
    active: customer.documents.filter(d => d.status === 'active').length,
    expired: customer.documents.filter(d => d.status === 'expired').length,
    pendingRenewal: customer.documents.filter(d => d.status === 'pending-renewal').length,
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-500 mb-1">Total Documentos</p>
          <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-500 mb-1">Vigentes</p>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-500 mb-1">Por Renovar</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pendingRenewal}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-500 mb-1">Vencidos</p>
          <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
        </div>
      </div>

      {/* Botón Subir */}
      <div className="flex justify-end">
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Subir Documento
        </Button>
      </div>

      {/* Alertas de documentos vencidos o por vencer */}
      {(stats.expired > 0 || stats.pendingRenewal > 0) && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-orange-900 mb-2">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            Alertas de Documentos
          </h3>
          <ul className="space-y-1 text-xs text-orange-800">
            {stats.expired > 0 && (
              <li>• {stats.expired} documento(s) vencido(s) requieren atención</li>
            )}
            {stats.pendingRenewal > 0 && (
              <li>• {stats.pendingRenewal} documento(s) próximo(s) a vencer</li>
            )}
          </ul>
        </div>
      )}

      {/* Lista de Documentos */}
      {customer.documents.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600">No hay documentos cargados</p>
          <p className="text-sm text-slate-500 mt-1">Sube el primer documento para este cliente</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(documentsByType).map(([type, docs]) => (
            <div key={type} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900">
                  {getDocumentTypeLabel(type as CustomerDocumentType)} ({docs.length})
                </h3>
              </div>
              
              <div className="divide-y divide-slate-200">
                {docs.map((doc) => (
                  <div key={doc.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-medium text-slate-900">{doc.name}</h4>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getDocumentStatusColor(doc.status)}`}>
                              {getDocumentStatusLabel(doc.status)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-4 text-xs text-slate-600 mb-2">
                            <div>
                              <span className="text-slate-500">Tamaño:</span> {formatFileSize(doc.size)}
                            </div>
                            <div>
                              <span className="text-slate-500">Emisión:</span> {formatDate(doc.issueDate)}
                            </div>
                            {doc.expiryDate && (
                              <div>
                                <span className="text-slate-500">Vencimiento:</span> {formatDate(doc.expiryDate)}
                              </div>
                            )}
                            <div>
                              <span className="text-slate-500">Subido:</span> {formatRelativeDate(doc.issueDate)}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-semibold ${getAvatarColor(doc.uploadedBy.name)}`}>
                              {getInitials(doc.uploadedBy.name)}
                            </div>
                            <span>Subido por {doc.uploadedBy.name}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 ml-4">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
