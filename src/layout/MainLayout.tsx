import type { ReactNode } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Sidebar } from '../components/layout/Sidebar'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />
      
      {/* Contenedor principal con margen para el sidebar */}
      <div className="ml-64">
        {/* Navbar fijo en la parte superior */}
        <Navbar />
        
        {/* Contenido principal con padding para el navbar */}
        <main className="pt-16 min-h-screen">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
