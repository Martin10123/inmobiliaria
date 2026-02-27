import { Bell, Search, Settings, User, LogOut, ChevronDown, Menu } from 'lucide-react'
import { useState } from 'react'

interface NavbarProps {
  onMenuClick?: () => void
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, text: 'Nueva solicitud de aprobación pendiente', time: '5 min', unread: true },
    { id: 2, text: 'Stock bajo en producto XYZ', time: '1 h', unread: true },
    { id: 3, text: 'Tarea asignada: Revisión de inventario', time: '2 h', unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 fixed top-0 right-0 left-0 md:left-64 z-40">
      {/* Botón de menú móvil */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6 text-slate-700" />
      </button>

      {/* Búsqueda */}
      <div className="flex-1 max-w-xl ml-2 md:ml-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Acciones de usuario */}
      <div className="flex items-center gap-1 md:gap-3 ml-2 md:ml-6">
        {/* Notificaciones */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowProfileMenu(false)
            }}
            className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* Dropdown de notificaciones */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-slate-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">Notificaciones</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 ${
                      notification.unread ? 'bg-blue-50' : ''
                    }`}
                  >
                    <p className="text-sm text-slate-900">{notification.text}</p>
                    <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 text-center border-t border-slate-200">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Ver todas
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Configuración */}
        <button className="hidden md:flex p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-slate-600" />
        </button>

        {/* Perfil de usuario */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu)
              setShowNotifications(false)
            }}
            className="flex items-center gap-2 md:gap-3 pl-2 md:pl-3 pr-1 md:pr-2 py-1.5 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-slate-900">Martín Simarra</p>
              <p className="text-xs text-slate-500">Administrador</p>
            </div>
            <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              MS
            </div>
            <ChevronDown className="hidden md:block w-4 h-4 text-slate-600" />
          </button>

          {/* Dropdown de perfil */}
          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-slate-200">
                <p className="font-semibold text-slate-900">Martín Simarra</p>
                <p className="text-sm text-slate-500">msimarra@nexus.com</p>
              </div>
              <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-3">
                <User className="w-4 h-4" />
                Mi perfil
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-3">
                <Settings className="w-4 h-4" />
                Configuración
              </button>
              <div className="border-t border-slate-200 my-2"></div>
              <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
