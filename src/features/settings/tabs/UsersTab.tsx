import { useState } from 'react'
import { User, Shield, Save, Edit2, Trash2, Check, X, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Role {
  id: string
  name: string
}

interface SystemUser {
  id: string
  name: string
  email: string
  department: string
  roleId: string
  isActive: boolean
}

// Roles disponibles (sincronizado con RolesTab)
const AVAILABLE_ROLES: Role[] = [
  { id: '1', name: 'Administrador' },
  { id: '2', name: 'Gerente' },
  { id: '3', name: 'Usuario' }
]

// Usuarios del sistema
const INITIAL_USERS: SystemUser[] = [
  { id: '1', name: 'Carlos Rodríguez', email: 'carlos@cotecmar.com', department: 'Gerencia', roleId: '1', isActive: true },
  { id: '2', name: 'María González', email: 'maria@cotecmar.com', department: 'Finanzas', roleId: '2', isActive: true },
  { id: '3', name: 'Laura Martínez', email: 'laura@cotecmar.com', department: 'Operaciones', roleId: '2', isActive: true },
  { id: '4', name: 'Roberto Silva', email: 'roberto@cotecmar.com', department: 'Compras', roleId: '3', isActive: true },
  { id: '5', name: 'Daniela Torres', email: 'daniela@cotecmar.com', department: 'Proyectos', roleId: '3', isActive: true },
  { id: '6', name: 'Luis Ramírez', email: 'luis@cotecmar.com', department: 'IT', roleId: '2', isActive: true },
  { id: '7', name: 'Andrea Morales', email: 'andrea@cotecmar.com', department: 'RRHH', roleId: '3', isActive: true },
  { id: '8', name: 'Jorge Pérez', email: 'jorge@cotecmar.com', department: 'Logística', roleId: '3', isActive: true },
  { id: '9', name: 'Patricia Vargas', email: 'patricia@cotecmar.com', department: 'Legal', roleId: '2', isActive: false },
  { id: '10', name: 'Fernando Castro', email: 'fernando@cotecmar.com', department: 'Finanzas', roleId: '3', isActive: true },
]

export default function UsersTab() {
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null)

  const handleSave = () => {
    alert('✅ Usuarios guardados exitosamente')
  }

  const startEdit = (user: SystemUser) => {
    setEditingId(user.id)
    setEditingUser({ ...user })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingUser(null)
  }

  const saveEdit = () => {
    if (!editingUser) return
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u))
    setEditingId(null)
    setEditingUser(null)
  }

  const deleteUser = (userId: string) => {
    if (!confirm('¿Eliminar este usuario del sistema?')) return
    setUsers(users.filter(u => u.id !== userId))
  }

  const addUser = () => {
    const newUser: SystemUser = {
      id: Date.now().toString(),
      name: 'Nuevo Usuario',
      email: 'email@cotecmar.com',
      department: 'Sin asignar',
      roleId: '3', // Usuario por defecto
      isActive: true
    }
    setUsers([...users, newUser])
    startEdit(newUser)
  }

  const toggleActive = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    ))
  }

  const getRoleName = (roleId: string) => {
    return AVAILABLE_ROLES.find(r => r.id === roleId)?.name || 'Sin rol'
  }

  const getRoleColor = (roleId: string) => {
    switch (roleId) {
      case '1': return 'bg-purple-100 text-purple-700'
      case '2': return 'bg-blue-100 text-blue-700'
      case '3': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <p className="text-sm text-gray-600">Gestiona usuarios del sistema y asigna roles</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={addUser} variant="outline" className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Nuevo Usuario
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-600 font-medium">Total Usuarios</p>
          <p className="text-2xl font-bold text-blue-900">{users.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-xs text-green-600 font-medium">Activos</p>
          <p className="text-2xl font-bold text-green-900">{users.filter(u => u.isActive).length}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-xs text-purple-600 font-medium">Administradores</p>
          <p className="text-2xl font-bold text-purple-900">{users.filter(u => u.roleId === '1').length}</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-xs text-orange-600 font-medium">Gerentes</p>
          <p className="text-2xl font-bold text-orange-900">{users.filter(u => u.roleId === '2').length}</p>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Usuario</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Departamento</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Rol Asignado</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Estado</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => {
              const isEditing = editingId === user.id
              const displayUser = isEditing && editingUser ? editingUser : user

              return (
                <tr key={user.id} className={isEditing ? 'bg-blue-50' : user.isActive ? 'hover:bg-gray-50' : 'bg-gray-100 opacity-60'}>
                  {/* Usuario */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        type="text"
                        value={displayUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser!, name: e.target.value })}
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm font-medium"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-white">{user.name.charAt(0)}</span>
                        </div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                      </div>
                    )}
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        type="email"
                        value={displayUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser!, email: e.target.value })}
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                      />
                    ) : (
                      <p className="text-xs text-gray-600">{user.email}</p>
                    )}
                  </td>

                  {/* Departamento */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        type="text"
                        value={displayUser.department}
                        onChange={(e) => setEditingUser({ ...editingUser!, department: e.target.value })}
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                      />
                    ) : (
                      <p className="text-xs text-gray-600">{user.department}</p>
                    )}
                  </td>

                  {/* Rol */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <Select
                        value={displayUser.roleId}
                        onValueChange={(value) => setEditingUser({ ...editingUser!, roleId: value })}
                      >
                        <SelectTrigger className="w-full h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {AVAILABLE_ROLES.map(role => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Shield className="w-3 h-3 text-gray-400" />
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.roleId)}`}>
                          {getRoleName(user.roleId)}
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Estado */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => !isEditing && toggleActive(user.id)}
                      disabled={isEditing}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        user.isActive
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      } ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {user.isActive ? 'Activo' : 'Inactivo'}
                    </button>
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
                          onClick={() => startEdit(user)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Información */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-xs text-blue-900 font-medium mb-2">💡 Información</p>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Click en el rol de un usuario para cambiar su nivel de acceso</li>
          <li>• Los roles determinan qué permisos tiene cada usuario en el sistema</li>
          <li>• Los usuarios inactivos no pueden iniciar sesión</li>
          <li>• Click en <strong>Editar</strong> para modificar todos los datos de un usuario</li>
        </ul>
      </div>
    </div>
  )
}
