import type { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  logo?: 'login' | 'register' | 'recover'
}

export const AuthLayout = ({ children, title, subtitle, logo = 'login' }: AuthLayoutProps) => {
  let logoSrc = '/assets/login_logo.svg';
  if (logo === 'register') logoSrc = '/assets/register_logo.svg';
  if (logo === 'recover') logoSrc = '/assets/recover_logo.svg';

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Columna imagen/logo */}
        <div className="hidden md:flex flex-col items-center justify-center bg-white border-r border-slate-200 p-10 lg:p-14">
          <img src={logoSrc} alt="Logo" className="w-full max-w-md h-auto object-contain mb-8" />
          <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">{title}</h1>
          {subtitle && (
            <p className="text-slate-600 text-base text-center">{subtitle}</p>
          )}
        </div>
        {/* Columna formulario */}
        <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10 bg-white">
          {/* Logo arriba del formulario */}
          <div className="text-center">
            <img src="/logo_app.webp" alt="Logo" className="w-62 h-auto object-contain mx-auto" />
          </div>

          {/* Título solo en mobile */}
          <div className="md:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
            {subtitle && <p className="text-slate-600 text-sm">{subtitle}</p>}
          </div>
          {/* Contenido (formulario) */}
          {children}
          {/* Footer */}
          <p className="text-center text-sm text-slate-600 mt-6">
            © 2026 NEXUS ERP · Proyecto académico de automatización empresarial con n8n.
          </p>
        </div>
      </div>
    </div>
  )
}
