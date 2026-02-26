import { ReactNode } from "react"

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
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/80 rounded-2xl shadow-2xl shadow-cyan-500/10 border border-slate-200/50 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Columna imagen/logo */}
        <div className="hidden md:flex flex-col items-center justify-center bg-slate-100 p-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/60 mb-6 shadow-lg shadow-cyan-500/20">
            <img src={logoSrc} alt="Logo" className="w-20 h-20 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">{title}</h1>
          {subtitle && (
            <p className="text-slate-600 text-base text-center">{subtitle}</p>
          )}
        </div>
        {/* Columna formulario */}
        <div className="flex flex-col justify-center p-8">
          {/* Header solo en mobile */}
          <div className="md:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/60 mb-4 shadow-lg shadow-cyan-500/20 mx-auto">
              <img src={logoSrc} alt="Logo" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
            {subtitle && (
              <p className="text-slate-600 text-sm">{subtitle}</p>
            )}
          </div>
          {/* Contenido (formulario) */}
          {children}
          {/* Footer */}
          <p className="text-center text-sm text-slate-600 mt-6">
            © 2026 Inmobiliaria. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}
