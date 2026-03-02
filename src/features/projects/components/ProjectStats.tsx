import { Briefcase, TrendingUp, Clock, CheckCircle2 } from 'lucide-react'

interface ProjectStatsProps {
  stats: {
    total: number
    inProgress: number
    planning: number
    completed: number
  }
}

export const ProjectStats = ({ stats }: ProjectStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Briefcase className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Proyectos</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">{stats.inProgress}</p>
            <p className="text-sm text-slate-600">En Curso</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">{stats.planning}</p>
            <p className="text-sm text-slate-600">En Planeación</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">{stats.completed}</p>
            <p className="text-sm text-slate-600">Completados</p>
          </div>
        </div>
      </div>
    </div>
  )
}
