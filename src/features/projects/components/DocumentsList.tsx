import { FileText, Download, Eye, FileImage, FileSpreadsheet, File, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockDocuments } from '../data/mockData'
import { formatBytes, formatDate, getDocumentTypeLabel } from '../utils/projectHelpers'

interface DocumentsListProps {
  projectId: string
}

export const DocumentsList = ({ projectId }: DocumentsListProps) => {
  const projectDocuments = mockDocuments.filter(doc => doc.projectId === projectId)

  const getDocumentIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-600" />
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileImage className="w-8 h-8 text-blue-600" />
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="w-8 h-8 text-green-600" />
      default:
        return <File className="w-8 h-8 text-slate-600" />
    }
  }

  const documentsByType = projectDocuments.reduce((acc, doc) => {
    if (!acc[doc.type]) acc[doc.type] = []
    acc[doc.type].push(doc)
    return acc
  }, {} as Record<string, typeof projectDocuments>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Documentos del Proyecto ({projectDocuments.length})
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Total: {formatBytes(projectDocuments.reduce((sum, doc) => sum + doc.size, 0))}
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Subir Documento
        </Button>
      </div>

      {projectDocuments.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-sm text-slate-600">No hay documentos en este proyecto</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(documentsByType).map(([type, docs]) => (
            <div key={type}>
              <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                {getDocumentTypeLabel(type)} ({docs.length})
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {docs.map(doc => (
                  <div 
                    key={doc.id}
                    className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {getDocumentIcon(doc.fileName)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-slate-900 truncate mb-1">
                          {doc.name}
                        </h5>
                        <p className="text-xs text-slate-600 truncate mb-2">
                          {doc.fileName}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                          <span>{formatBytes(doc.size)}</span>
                          <span>•</span>
                          <span>{formatDate(doc.uploadedAt)}</span>
                        </div>

                        {doc.description && (
                          <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                            {doc.description}
                          </p>
                        )}

                        <div className="flex gap-2">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-xs font-medium">
                            <Eye className="w-3 h-3" />
                            Ver
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors text-xs font-medium">
                            <Download className="w-3 h-3" />
                            Descargar
                          </button>
                        </div>
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
