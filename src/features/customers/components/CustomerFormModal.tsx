import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Customer } from '@/types'

interface CustomerFormModalProps {
  isOpen: boolean
  onClose: () => void
  customer: Customer | null
}

export const CustomerFormModal = ({ isOpen, onClose, customer }: CustomerFormModalProps) => {
  const isEdit = !!customer

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
            <Select defaultValue={customer?.type || 'individual'}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Persona Natural</SelectItem>
                <SelectItem value="small-business">Pequeña Empresa</SelectItem>
                <SelectItem value="corporate">Corporativo</SelectItem>
                <SelectItem value="government">Gobierno</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Nivel */}
          <div>
            <Label htmlFor="level">Nivel</Label>
            <Select defaultValue={customer?.level || 'bronze'}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bronze">Bronce</SelectItem>
                <SelectItem value="silver">Plata</SelectItem>
                <SelectItem value="gold">Oro</SelectItem>
                <SelectItem value="platinum">Platino</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>
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
            <Select defaultValue={customer?.source || 'web'}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona fuente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="referral">Referido</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="web">Sitio Web</SelectItem>
                <SelectItem value="event">Evento</SelectItem>
                <SelectItem value="cold-call">Llamada Fría</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
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
