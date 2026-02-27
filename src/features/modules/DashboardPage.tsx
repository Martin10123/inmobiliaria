import { MainLayout } from '../../layout/MainLayout'
import { BarChart3, TrendingUp, Users, Package, AlertCircle, CheckCircle } from 'lucide-react'

export const DashboardPage = () => {
  const stats = [
    {
      label: 'Proyectos Activos',
      value: '12',
      change: '+3 este mes',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'blue',
    },
    {
      label: 'Clientes Activos',
      value: '48',
      change: '+5 nuevos',
      icon: <Users className="w-6 h-6" />,
      color: 'green',
    },
    {
      label: 'Productos en Stock',
      value: '324',
      change: '12 bajo stock',
      icon: <Package className="w-6 h-6" />,
      color: 'purple',
    },
    {
      label: 'Solicitudes Pendientes',
      value: '7',
      change: '2 urgentes',
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'orange',
    },
  ]

  const recentActivity = [
    { id: 1, action: 'Nueva tarea creada', project: 'Proyecto Alpha', time: '5 min', status: 'success' },
    { id: 2, action: 'Stock bajo detectado', project: 'Producto XYZ', time: '15 min', status: 'warning' },
    { id: 3, action: 'Cliente nuevo registrado', project: 'Juan Pérez', time: '1 h', status: 'success' },
    { id: 4, action: 'Solicitud aprobada', project: 'Compra equipos', time: '2 h', status: 'success' },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Bienvenido de nuevo, Martín. Aquí está tu resumen de hoy.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                  {stat.icon}
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
              <p className="text-xs text-slate-500">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Actividad Reciente</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0">
                  <div className={`mt-1 ${
                    activity.status === 'success' ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {activity.status === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <p className="text-sm text-slate-600">{activity.project}</p>
                  </div>
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                <div className="text-blue-600 mb-2">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-900">Nueva Tarea</p>
              </button>
              <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left">
                <div className="text-green-600 mb-2">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-900">Nuevo Cliente</p>
              </button>
              <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left">
                <div className="text-purple-600 mb-2">
                  <Package className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-900">Añadir Producto</p>
              </button>
              <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-left">
                <div className="text-orange-600 mb-2">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-900">Nueva Solicitud</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
