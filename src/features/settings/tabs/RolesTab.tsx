import { useState } from 'react'
import { Shield, Save, Edit2, Trash2, Plus, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Permission {
  id: string
  label: string
  description: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  isSystem: boolean // roles del sistema no se pueden eliminar
}

const PERMISSIONS: Permission[] = [
  { id: 'requests_view', label: 'Ver Solicitudes', description: 'Ver todas las solicitudes' },
  { id: 'requests_create', label: 'Crear Solicitudes', description: 'Crear nuevas solicitudes' },
  { id: 'requests_approve', label: 'Aprobar Solicitudes', description: 'Aprobar/rechazar solicitudes' },
  { id: 'customers_view', label: 'Ver Clientes', description: 'Ver información de clientes' },
  { id: 'customers_edit', label: 'Editar Clientes', description: 'Modificar datos de clientes' },
  { id: 'inventory_view', label: 'Ver Inventario', description: 'Ver artículos del inventario' },
  { id: 'inventory_edit', label: 'Editar Inventario', description: 'Modificar inventario' },
  { id: 'projects_view', label: 'Ver Proyectos', description: 'Ver proyectos' },
  { id: 'projects_edit', label: 'Editar Proyectos', description: 'Modificar proyectos' },
  { id: 'settings_access', label: 'Acceso a Configuración', description: 'Acceder a configuraciones del sistema' },
]

const INITIAL_ROLES: Role[] = [
  {
    id: '1',
    name: 'Administrador',
    description: 'Acceso completo al sistema',
    permissions: PERMISSIONS.map(p => p.id),
    isSystem: true
  },
  {
    id: '2',
    name: 'Gerente',
    description: 'Gestión de proyectos y aprobaciones',
    permissions: ['requests_view', 'requests_approve', 'customers_view', 'customers_edit', 'projects_view', 'projects_edit', 'inventory_view'],
    isSystem: false
  },
  {
    id: '3',
    name: 'Usuario',
    description: 'Acceso básico de lectura',
    permissions: ['requests_view', 'requests_create', 'customers_view', 'inventory_view', 'projects_view'],
    isSystem: false
  }
]

export default function RolesTab() {
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const handleSave = () => {
    alert('✅ Roles guardados exitosamente')
  }

  const startEdit = (role: Role) => {
    setEditingId(role.id)
    setEditingRole({ ...role })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingRole(null)
  }

  const saveEdit = () => {
    if (!editingRole) return
    setRoles(roles.map(r => r.id === editingRole.id ? editingRole : r))
    setEditingId(null)
    setEditingRole(null)
  }

  const deleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId)
    if (role?.isSystem) {
      alert('❌ No se puede eliminar un rol del sistema')
      return
    }
    if (!confirm('¿Eliminar este rol?')) return
    setRoles(roles.filter(r => r.id !== roleId))
  }

  const addRole = () => {
    const newRole: Role = {
      id: Date.now().toString(),
      name: 'Nuevo Rol',
      description: 'Descripción del rol',
      permissions: [],
      isSystem: false
    }
    setRoles([...roles, newRole])
    startEdit(newRole)
  }

  const togglePermission = (permissionId: string) => {
    if (!editingRole) return
    const hasPermission = editingRole.permissions.includes(permissionId)
    setEditingRole({
      ...editingRole,
      permissions: hasPermission
        ? editingRole.permissions.filter(p => p !== permissionId)
        : [...editingRole.permissions, permissionId]
    })
  }

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <p className="text-sm text-gray-600">Define roles y permisos para usuarios del sistema</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={addRole} variant="outline" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Rol
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar
          </Button>
        </div>
      </div>

      {/* Tabla de Roles */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Rol</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Descripción</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Permisos</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {roles.map((role) => {
              const isEditing = editingId === role.id
              const displayRole = isEditing && editingRole ? editingRole : role

              return (
                <tr key={role.id} className={isEditing ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                  {/* Rol */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        type="text"
                        value={displayRole.name}
                        onChange={(e) => setEditingRole({ ...editingRole!, name: e.target.value })}
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm font-medium"
                      />
                    ) : (
                      <div>
                        <p className="font-medium text-gray-900 flex items-center gap-2">
                          {role.name}
                          {role.isSystem && (
                            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs font-semibold">
                              Sistema
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </td>

                  {/* Descripción */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        type="text"
                        value={displayRole.description}
                        onChange={(e) => setEditingRole({ ...editingRole!, description: e.target.value })}
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                      />
                    ) : (
                      <p className="text-xs text-gray-600">{role.description}</p>
                    )}
                  </td>

                  {/* Permisos */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-blue-200 rounded bg-white">
                        {PERMISSIONS.map(permission => (
                          <label
                            key={permission.id}
                            className="flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-50 p-1 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={displayRole.permissions.includes(permission.id)}
                              onChange={() => togglePermission(permission.id)}
                              className="w-3 h-3 text-blue-600 rounded"
                            />
                            <span className="text-gray-900">{permission.label}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.length === 0 ? (
                          <span className="text-xs text-gray-400 italic">Sin permisos</span>
                        ) : (
                          <>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                              {role.permissions.length} {role.permissions.length === 1 ? 'permiso' : 'permisos'}
                            </span>
                            {role.permissions.slice(0, 2).map(permId => {
                              const perm = PERMISSIONS.find(p => p.id === permId)
                              return perm ? (
                                <span key={permId} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                  {perm.label}
                                </span>
                              ) : null
                            })}
                            {role.permissions.length > 2 && (
                              <span className="px-2 py-0.5 bg-blue-200 text-blue-800 rounded text-xs font-bold">
                                +{role.permissions.length - 2}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Acciones */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={saveEdit}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                          title="Guardar"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Cancelar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => startEdit(role)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {!role.isSystem && (
                          <button
                            onClick={() => deleteRole(role.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Leyenda de Permisos */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Permisos Disponibles</h3>
        <div className="grid grid-cols-2 gap-2">
          {PERMISSIONS.map(permission => (
            <div key={permission.id} className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-900">{permission.label}</p>
                <p className="text-xs text-gray-500">{permission.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
