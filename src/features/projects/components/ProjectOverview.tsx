import type { Project } from '@/types'
import { Calendar, DollarSign, MapPin, Users, FileText, TrendingUp, AlertTriangle } from 'lucide-react'
import { 
  getTypeLabel, 
  getPriorityLabel, 
  getPriorityColor,
  formatDate,
  getDaysRemaining,
  getBudgetPercentage,
  isOverBudget 
} from '../utils/projectHelpers'

interface ProjectOverviewProps {
  project: Project
}

export const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  const daysRemaining = getDaysRemaining(project.plannedEndDate)
  const budgetUsed = getBudgetPercentage(project.currentCost, project.budget)
  const overBudget = isOverBudget(project.currentCost, project.budget)

  return (
    <div className="space-y-6">
      {/* Alertas */}
      {(daysRemaining < 30 || overBudget) && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900 mb-1">Alertas del Proyecto</h3>
              <ul className="text-sm text-orange-800 space-y-1">
                {daysRemaining < 30 && daysRemaining > 0 && (
                  <li>• Quedan solo {daysRemaining} días para la fecha límite</li>
                )}
                {daysRemaining < 0 && (
                  <li>• ⚠️ El proyecto está retrasado por {Math.abs(daysRemaining)} días</li>
                )}
                {overBudget && (
                  <li>• El presupuesto ha sido excedido en ${(project.currentCost - project.budget).toLocaleString()}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Información del Proyecto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Detalles Generales */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-slate-900">Detalles Generales</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm text-slate-600">Tipo de Proyecto</label>
              <p className="text-slate-900 font-medium">{getTypeLabel(project.type)}</p>
            </div>
            
            <div>
              <label className="text-sm text-slate-600">Prioridad</label>
              <p className={`font-medium ${getPriorityColor(project.priority)}`}>
                {getPriorityLabel(project.priority)}
              </p>
            </div>
            
            <div>
              <label className="text-sm text-slate-600">Descripción</label>
              <p className="text-slate-900">{project.description}</p>
            </div>
            
            {project.address && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
                <div>
                  <label className="text-sm text-slate-600">Ubicación</label>
                  <p className="text-slate-900">{project.address}{project.city && `, ${project.city}`}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fechas */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Cronología
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm text-slate-600">Inicio Planificado</label>
              <p className="text-slate-900 font-medium">{formatDate(project.plannedStartDate)}</p>
            </div>
            
            {project.actualStartDate && (
              <div>
                <label className="text-sm text-slate-600">Inicio Real</label>
                <p className="text-slate-900 font-medium">{formatDate(project.actualStartDate)}</p>
              </div>
            )}
            
            <div>
              <label className="text-sm text-slate-600">Fin Planificado</label>
              <p className="text-slate-900 font-medium">{formatDate(project.plannedEndDate)}</p>
            </div>
            
            {project.actualEndDate && (
              <div>
                <label className="text-sm text-slate-600">Fin Real</label>
                <p className="text-slate-900 font-medium">{formatDate(project.actualEndDate)}</p>
              </div>
            )}
            
            <div>
              <label className="text-sm text-slate-600">Días Restantes</label>
              <p className={`font-medium ${daysRemaining < 0 ? 'text-red-600' : daysRemaining < 30 ? 'text-orange-600' : 'text-green-600'}`}>
                {daysRemaining < 0 ? `${Math.abs(daysRemaining)} días de retraso` : `${daysRemaining} días`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Información Financiera */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Información Financiera
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm text-slate-600">Presupuesto Total</label>
            <p className="text-xl font-bold text-slate-900">${project.budget.toLocaleString()}</p>
          </div>
          
          <div>
            <label className="text-sm text-slate-600">Costo Actual</label>
            <p className={`text-xl font-bold ${overBudget ? 'text-red-600' : 'text-slate-900'}`}>
              ${project.currentCost.toLocaleString()}
            </p>
            <div className="mt-2 bg-slate-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${overBudget ? 'bg-red-600' : 'bg-blue-600'}`}
                style={{ width: `${Math.min(budgetUsed, 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">{budgetUsed}% del presupuesto</p>
          </div>
          
          <div>
            <label className="text-sm text-slate-600">Ingresos Proyectados</label>
            <p className="text-xl font-bold text-green-600">${project.projectedRevenue.toLocaleString()}</p>
            <p className="text-sm text-slate-600 mt-1">
              Rentabilidad: {Math.round(((project.projectedRevenue - project.budget) / project.budget) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Clientes y Contratos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2 mb-3">
            <Users className="w-5 h-5" />
            Clientes Asociados
          </h3>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-slate-600">
              {project.clientIds.length} cliente{project.clientIds.length !== 1 ? 's' : ''} asociado{project.clientIds.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5" />
            Contratos Ligados
          </h3>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-slate-600">
              {project.contractIds.length} contrato{project.contractIds.length !== 1 ? 's' : ''} ligado{project.contractIds.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Progreso General */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Progreso General
        </h3>
        
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Avance del Proyecto</span>
            <span className="text-xl font-bold text-blue-600">{project.progress}%</span>
          </div>
          <div className="bg-white rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 h-4 transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
