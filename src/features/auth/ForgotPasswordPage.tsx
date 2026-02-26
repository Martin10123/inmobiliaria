import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { AuthLayout } from "@/layout/AuthLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Recuperar contraseña:", email)
    // Aquí iría la lógica para enviar el correo de recuperación
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <AuthLayout
        title="Correo enviado"
        subtitle="Revisa tu bandeja de entrada"
        logo="recover"
      >
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-cyan-100 to-blue-100 mb-6">
            <CheckCircle className="w-8 h-8 text-cyan-600" />
          </div>
          
          <p className="text-slate-600 mb-6 leading-relaxed">
            Hemos enviado un enlace de recuperación a{" "}
            <span className="font-semibold text-slate-900">{email}</span>.
            Por favor revisa tu correo y sigue las instrucciones.
          </p>

          <div className="bg-cyan-50/50 border border-cyan-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-slate-600">
              <strong className="text-cyan-700">Nota:</strong> Si no recibes el correo en unos minutos,
              revisa tu carpeta de spam.
            </p>
          </div>

          <Button asChild className="w-full">
            <Link to="/login">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio de sesión
            </Link>
          </Button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Recuperar contraseña"
      subtitle="Te enviaremos un enlace de recuperación"
      logo="recover"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              className="pl-11"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4">
          <p className="text-sm text-slate-600">
            Ingresa el correo asociado a tu cuenta y te enviaremos
            un enlace para restablecer tu contraseña.
          </p>
        </div>

        <Button type="submit" className="w-full">
          Enviar enlace de recuperación
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="w-full"
          asChild
        >
          <Link to="/login">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio de sesión
          </Link>
        </Button>
      </form>
    </AuthLayout>
  )
}
