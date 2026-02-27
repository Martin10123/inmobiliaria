import { 
  LayoutDashboard, 
  FolderKanban, 
  Package, 
  Users, 
  FileCheck, 
  Settings,
  ChevronRight,
  Zap,
  X
} from 'lucide-react'
import { useState } from 'react'

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
  badge?: number
  children?: MenuItem[]
}

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: '/dashboard',
  },
  {
    id: 'projects',
    label: 'Proyectos',
    icon: <FolderKanban className="w-5 h-5" />,
    path: '/projects',
    badge: 3,
  },
  {
    id: 'inventory',
    label: 'Inventario',
    icon: <Package className="w-5 h-5" />,
    path: '/inventory',
  },
  {
    id: 'clients',
    label: 'Clientes',
    icon: <Users className="w-5 h-5" />,
    path: '/clients',
  },
  {
    id: 'requests',
    label: 'Solicitudes',
    icon: <FileCheck className="w-5 h-5" />,
    path: '/requests',
    badge: 2,
  },
  {
    id: 'automation',
    label: 'Automatización',
    icon: <Zap className="w-5 h-5" />,
    path: '/automation',
  },
  {
    id: 'settings',
    label: 'Configuración',
    icon: <Settings className="w-5 h-5" />,
    path: '/settings',
  },
]

export const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleItemClick = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      toggleExpand(item.id)
    } else {
      setActiveItem(item.id)
      // Cerrar sidebar en móvil al hacer click
      if (onClose) {
        onClose()
      }
      // Aquí iría la navegación real
      // navigate(item.path)
    }
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isActive = activeItem === item.id
    const isExpanded = expandedItems.includes(item.id)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id}>
        <button
          onClick={() => handleItemClick(item)}
          className={`
            w-full flex items-center justify-between px-4 py-3 rounded-lg mb-1
            transition-all duration-200 group
            ${isActive 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }
            ${level > 0 ? 'ml-4' : ''}
          `}
        >
          <div className="flex items-center gap-3">
            <div className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'}>
              {item.icon}
            </div>
            <span className="font-medium text-sm">{item.label}</span>
          </div>

          <div className="flex items-center gap-2">
            {item.badge && item.badge > 0 && (
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-semibold
                ${isActive 
                  ? 'bg-white text-blue-600' 
                  : 'bg-red-100 text-red-600'
                }
              `}>
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <ChevronRight 
                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              />
            )}
          </div>
        </button>

        {/* Submenú */}
        {hasChildren && isExpanded && (
          <div className="ml-2 space-y-1">
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Backdrop/overlay para móvil */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0 z-50 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo y título */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">NEXUS ERP</h1>
              <p className="text-xs text-slate-500">Sistema Modular</p>
            </div>
          </div>
          
          {/* Botón cerrar móvil */}
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
      </nav>

      {/* Footer del sidebar */}
      <div className="p-4 border-t border-slate-200">
        <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-semibold text-blue-900">Automatización activa</p>
          </div>
          <p className="text-xs text-slate-600">
            n8n sincronizado
          </p>
          <div className="mt-2 flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">Conectado</span>
          </div>
        </div>
      </div>
    </aside>
    </>
  )
}
