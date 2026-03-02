import { FileText, Upload, Download, Eye, Trash2, Image, FileCheck } from 'lucide-react'

interface Document {
  id: string
  name: string
  type: 'invoice' | 'warranty' | 'manual' | 'certificate' | 'photo' | 'other'
  size: string
  uploadedBy: string
  uploadedAt: string
  url: string
}

interface ItemDocumentsProps {
  itemId: string
}

// Mock data - luego vendría de una API o del estado
const mockDocuments: Record<string, Document[]> = {
  '1': [
    {
      id: 'DOC-001',
      name: 'Factura de Compra.pdf',
      type: 'invoice',
      size: '245 KB',
      uploadedBy: 'Admin Sistema',
      uploadedAt: '2026-02-15T10:30:00Z',
      url: '#'
    },
    {
      id: 'DOC-002',
      name: 'Manual de Usuario.pdf',
      type: 'manual',
      size: '1.2 MB',
      uploadedBy: 'Admin Sistema',
      uploadedAt: '2026-02-15T10:35:00Z',
      url: '#'
    },
    {
      id: 'DOC-003',
      name: 'Certificado de Garantía.pdf',
      type: 'warranty',
      size: '180 KB',
      uploadedBy: 'Admin Sistema',
      uploadedAt: '2026-02-15T10:40:00Z',
      url: '#'
    }
  ]
}

export default function ItemDocuments({ itemId }: ItemDocumentsProps) {
  const documents = mockDocuments[itemId] || []

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return <FileText className="w-5 h-5 text-blue-600" />
      case 'warranty':
        return <FileCheck className="w-5 h-5 text-green-600" />
      case 'manual':
        return <FileText className="w-5 h-5 text-purple-600" />
      case 'certificate':
        return <FileCheck className="w-5 h-5 text-yellow-600" />
      case 'photo':
        return <Image className="w-5 h-5 text-pink-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const getDocumentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      invoice: 'Factura',
      warranty: 'Garantía',
      manual: 'Manual',
      certificate: 'Certificado',
      photo: 'Foto',
      other: 'Otro'
    }
    return labels[type] || 'Documento'
  }

  if (documents.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            <Upload className="w-4 h-4" />
            Subir Documento
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No hay documentos adjuntos para este item</p>
          <p className="text-sm text-gray-400 mt-1">Sube facturas, manuales, certificados o fotografías</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Documentos ({documents.length})
        </h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          <Upload className="w-4 h-4" />
          Subir Documento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {getDocumentIcon(doc.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">{doc.name}</h4>
                <p className="text-xs text-gray-500 mt-1">
                  {getDocumentTypeLabel(doc.type)} • {doc.size}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Subido por {doc.uploadedBy}
                </p>
              </div>

              <div className="flex gap-1">
                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Ver">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Descargar">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Eliminar">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
