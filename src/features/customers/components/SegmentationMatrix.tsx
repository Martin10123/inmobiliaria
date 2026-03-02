import type { Customer, CustomerSegment } from '@/types'
import { Grid3x3 } from 'lucide-react'

interface SegmentationMatrixProps {
  customers: Array<Customer & { currentSegment: CustomerSegment }>
}

export const SegmentationMatrix = ({ customers }: SegmentationMatrixProps) => {
  // Crear matriz RFM 3x3
  const matrix: { [key: string]: Array<Customer & { currentSegment: CustomerSegment }> } = {}

  // Inicializar matriz
  for (let r = 1; r <= 3; r++) {
    for (let f = 1; f <= 3; f++) {
      matrix[`${r}-${f}`] = []
    }
  }

  // Clasificar clientes en la matriz
  customers.forEach(customer => {
    const { rfm } = customer

    // Categorizar Recency (invertido: menor recency es mejor)
    let rCategory = 3 // low (muchos días = malo)
    if (rfm.recency <= 30) rCategory = 1 // high (pocos días = bueno)
    else if (rfm.recency <= 90) rCategory = 2 // medium

    // Categorizar Frequency
    let fCategory = 1 // low
    if (rfm.frequency >= 5) fCategory = 3 // high
    else if (rfm.frequency >= 2) fCategory = 2 // medium

    const key = `${rCategory}-${fCategory}`
    if (matrix[key]) {
      matrix[key].push(customer)
    }
  })

  const getCellColor = (r: number, f: number): string => {
    // Scoring: r=1 (reciente) es bueno, f=3 (frecuente) es bueno
    const score = (4 - r) + f // Invertir r para que menor sea mejor

    if (score >= 5) return 'bg-emerald-100 border-emerald-300' // Champions
    if (score >= 4) return 'bg-blue-100 border-blue-300' // Loyal
    if (score >= 3) return 'bg-yellow-100 border-yellow-300' // Medium
    return 'bg-slate-100 border-slate-300' // Low
  }

  const getCellLabel = (r: number, f: number): string => {
    const score = (4 - r) + f

    if (score >= 5) return 'Champions'
    if (score >= 4) return 'Leales'
    if (score >= 3) return 'Potenciales'
    return 'Bajo Valor'
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 bg-purple-50 rounded-lg">
          <Grid3x3 className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">Matriz RFM</h3>
          <p className="text-xs text-slate-500">
            Distribución de clientes por Recencia (últimos días) y Frecuencia (proyectos)
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Leyendas */}
          <div className="flex items-start gap-6 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-100 border-2 border-emerald-300 rounded" />
              <span className="text-slate-600">Champions (5-6 pts)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded" />
              <span className="text-slate-600">Leales (4 pts)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-300 rounded" />
              <span className="text-slate-600">Potenciales (3 pts)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-100 border-2 border-slate-300 rounded" />
              <span className="text-slate-600">Bajo Valor (1-2 pts)</span>
            </div>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200">
                  Recencia ↓ / Frecuencia →
                </th>
                <th className="p-3 text-center text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 min-w-[180px]">
                  Baja (1-2 proyectos)
                </th>
                <th className="p-3 text-center text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 min-w-[180px]">
                  Media (2-4 proyectos)
                </th>
                <th className="p-3 text-center text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 min-w-[180px]">
                  Alta (5+ proyectos)
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Fila 1: Reciente (≤30 días) */}
              <tr>
                <td className="p-3 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200">
                  Reciente (≤30 días)
                </td>
                {[1, 2, 3].map(f => {
                  const key = `1-${f}`
                  const cellCustomers = matrix[key] || []
                  return (
                    <td
                      key={key}
                      className={`p-3 border border-slate-200 ${getCellColor(1, f)} align-top`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-slate-700">
                            {getCellLabel(1, f)}
                          </span>
                          <span className="text-xs font-bold text-slate-800 bg-white/70 px-2 py-0.5 rounded">
                            {cellCustomers.length}
                          </span>
                        </div>
                        {cellCustomers.slice(0, 3).map(customer => (
                          <div key={customer.id} className="text-xs text-slate-600 truncate">
                            • {customer.name}
                          </div>
                        ))}
                        {cellCustomers.length > 3 && (
                          <div className="text-xs text-slate-500">+{cellCustomers.length - 3} más</div>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>

              {/* Fila 2: Medio (31-90 días) */}
              <tr>
                <td className="p-3 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200">
                  Medio (31-90 días)
                </td>
                {[1, 2, 3].map(f => {
                  const key = `2-${f}`
                  const cellCustomers = matrix[key] || []
                  return (
                    <td
                      key={key}
                      className={`p-3 border border-slate-200 ${getCellColor(2, f)} align-top`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-slate-700">
                            {getCellLabel(2, f)}
                          </span>
                          <span className="text-xs font-bold text-slate-800 bg-white/70 px-2 py-0.5 rounded">
                            {cellCustomers.length}
                          </span>
                        </div>
                        {cellCustomers.slice(0, 3).map(customer => (
                          <div key={customer.id} className="text-xs text-slate-600 truncate">
                            • {customer.name}
                          </div>
                        ))}
                        {cellCustomers.length > 3 && (
                          <div className="text-xs text-slate-500">+{cellCustomers.length - 3} más</div>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>

              {/* Fila 3: Alejado (>90 días) */}
              <tr>
                <td className="p-3 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200">
                  Alejado (&gt;90 días)
                </td>
                {[1, 2, 3].map(f => {
                  const key = `3-${f}`
                  const cellCustomers = matrix[key] || []
                  return (
                    <td
                      key={key}
                      className={`p-3 border border-slate-200 ${getCellColor(3, f)} align-top`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-slate-700">
                            {getCellLabel(3, f)}
                          </span>
                          <span className="text-xs font-bold text-slate-800 bg-white/70 px-2 py-0.5 rounded">
                            {cellCustomers.length}
                          </span>
                        </div>
                        {cellCustomers.slice(0, 3).map(customer => (
                          <div key={customer.id} className="text-xs text-slate-600 truncate">
                            • {customer.name}
                          </div>
                        ))}
                        {cellCustomers.length > 3 && (
                          <div className="text-xs text-slate-500">+{cellCustomers.length - 3} más</div>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
