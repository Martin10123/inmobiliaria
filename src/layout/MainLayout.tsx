import type { ReactNode } from 'react'
import { useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Sidebar } from '../components/layout/Sidebar'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      {/* Contenedor principal con margen para el sidebar */}
      <div className="md:ml-64">
        {/* Navbar fijo en la parte superior */}
        <Navbar onMenuClick={toggleSidebar} />
        
        {/* Contenido principal con padding para el navbar */}
        <main className="pt-16 min-h-screen">
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
