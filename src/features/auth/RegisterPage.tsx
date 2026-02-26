import { useState } from "react"
import { Link } from "react-router-dom"
import { User, Mail, Lock, CreditCard, Calendar, Eye, EyeOff } from "lucide-react"
import { AuthLayout } from "@/layout/AuthLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    cedula: "",
    gender: "",
    birthDate: "",
    acceptTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Registro:", formData)
    // Aquí iría la lógica de registro
  }

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Regístrate para comenzar"
      logo="register"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Columna 1 */}
          <div className="space-y-4">
            {/* Nombre completo */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Juan Pérez"
                  className="pl-11"
                  value={formData.fullName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="pl-11"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-11 pr-11"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Columna 2 */}
          <div className="space-y-4">
            {/* Cédula */}
            <div className="space-y-2">
              <Label htmlFor="cedula">Cédula</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="cedula"
                  type="text"
                  placeholder="123456789"
                  className="pl-11"
                  value={formData.cedula}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, cedula: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Género */}
            <div className="space-y-2">
              <Label htmlFor="gender">Género</Label>
              <Select
                value={formData.gender}
                onValueChange={(value: string) => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Selecciona tu género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="femenino">Femenino</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                  <SelectItem value="prefiero-no-decir">Prefiero no decir</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fecha de nacimiento */}
            <div className="space-y-2">
              <Label htmlFor="birthDate">Fecha de nacimiento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="birthDate"
                  type="date"
                  className="pl-11"
                  value={formData.birthDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, birthDate: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Aceptar términos */}
        <div className="flex items-start gap-3 pt-2">
          <Checkbox
            id="acceptTerms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked: boolean) =>
              setFormData({ ...formData, acceptTerms: checked })
            }
            required
          />
          <Label
            htmlFor="acceptTerms"
            className="text-sm text-slate-600 leading-tight cursor-pointer"
          >
            Acepto el{" "}
            <Link to="/terms" className="text-cyan-600 hover:text-cyan-700 font-medium">
              tratamiento de datos personales
            </Link>{" "}
            y las{" "}
            <Link to="/privacy" className="text-cyan-600 hover:text-cyan-700 font-medium">
              políticas de privacidad
            </Link>
          </Label>
        </div>

        {/* Botón de registro */}
        <Button type="submit" className="w-full mt-6">
          Crear cuenta
        </Button>

        {/* Login */}
        <p className="text-center text-sm text-slate-600 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
          >
            Inicia sesión
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
