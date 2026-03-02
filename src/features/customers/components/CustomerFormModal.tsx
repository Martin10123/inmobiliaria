import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Customer } from '@/types'

interface CustomerFormModalProps {
  isOpen: boolean
  onClose: () => void
  customer: Customer | null
}

export const CustomerFormModal = ({ isOpen, onClose, customer }: CustomerFormModalProps) => {
  const isEdit = !!customer
  const selectClass = "h-11 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar lógica de guardado
    console.log('Guardar cliente')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Editar Cliente' : 'Nuevo Cliente'}>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Nombre */}
          <div className="col-span-2">
            <Label htmlFor="name">Nombre / Razón Social</Label>
            <Input
              id="name"
              type="text"
              defaultValue={customer?.name}
              placeholder="Ej: Constructora ABC S.A."
              required
            />
          </div>

          {/* Tipo */}
          <div>
            <Label htmlFor="type">Tipo de Cliente</Label>
            <select id="type" defaultValue={customer?.type || 'individual'} required className={selectClass}>
              <option value="individual">Persona Natural</option>
              <option value="small-business">Pequeña Empresa</option>
              <option value="corporate">Corporativo</option>
              <option value="government">Gobierno</option>
            </select>
          </div>

          {/* Nivel */}
          <div>
            <Label htmlFor="level">Nivel</Label>
            <select id="level" defaultValue={customer?.level || 'bronze'} required className={selectClass}>
              <option value="bronze">Bronce</option>
              <option value="silver">Plata</option>
              <option value="gold">Oro</option>
              <option value="platinum">Platino</option>
              <option value="vip">VIP</option>
            </select>
          </div>

          {/* NIT */}
          <div>
            <Label htmlFor="nit">NIT (Opcional)</Label>
            <Input
              id="nit"
              type="text"
              defaultValue={customer?.nit}
              placeholder="900.123.456-7"
            />
          </div>

          {/* Fuente */}
          <div>
            <Label htmlFor="source">Fuente de Adquisición</Label>
            <select id="source" defaultValue={customer?.source || 'web'} required className={selectClass}>
              <option value="referral">Referido</option>
              <option value="marketing">Marketing</option>
              <option value="web">Sitio Web</option>
              <option value="event">Evento</option>
              <option value="cold-call">Llamada Fría</option>
              <option value="other">Otro</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={customer?.email}
              placeholder="contacto@empresa.com"
              required
            />
          </div>

          {/* Teléfono */}
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              defaultValue={customer?.phone}
              placeholder="+57 310 123 4567"
              required
            />
          </div>

          {/* Dirección */}
          <div className="col-span-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              type="text"
              defaultValue={customer?.address}
              placeholder="Calle 100 #15-20"
              required
            />
          </div>

          {/* Ciudad */}
          <div>
            <Label htmlFor="city">Ciudad</Label>
            <Input
              id="city"
              type="text"
              defaultValue={customer?.city}
              placeholder="Bogotá"
              required
            />
          </div>

          {/* País */}
          <div>
            <Label htmlFor="country">País</Label>
            <Input
              id="country"
              type="text"
              defaultValue={customer?.country || 'Colombia'}
              placeholder="Colombia"
              required
            />
          </div>

          {/* Sitio Web */}
          <div className="col-span-2">
            <Label htmlFor="website">Sitio Web (Opcional)</Label>
            <Input
              id="website"
              type="url"
              defaultValue={customer?.website}
              placeholder="www.empresa.com"
            />
          </div>

          {/* Límite de Crédito */}
          <div className="col-span-2">
            <Label htmlFor="creditLimit">Límite de Crédito (COP)</Label>
            <Input
              id="creditLimit"
              type="number"
              defaultValue={customer?.creditLimit}
              placeholder="50000000"
              min="0"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {isEdit ? 'Actualizar' : 'Crear'} Cliente
          </Button>
        </div>
      </form>
    </Modal>
  )
}
