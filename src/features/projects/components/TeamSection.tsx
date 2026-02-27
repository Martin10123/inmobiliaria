import { Mail, Phone, Plus, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockTeamMembers } from '../data/mockData'
import { getTeamRoleLabel, getInitials } from '../utils/projectHelpers'

interface TeamSectionProps {
  projectId: string
}

export const TeamSection = ({ projectId }: TeamSectionProps) => {
  const teamMembers = mockTeamMembers.filter(member => 
    member.projects.includes(projectId)
  )

  const roleColors = {
    project_manager: 'bg-purple-100 text-purple-700 border-purple-200',
    architect: 'bg-blue-100 text-blue-700 border-blue-200',
    engineer: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    contractor: 'bg-orange-100 text-orange-700 border-orange-200',
    supervisor: 'bg-green-100 text-green-700 border-green-200',
    worker: 'bg-slate-100 text-slate-700 border-slate-200',
  }

  const membersByRole = teamMembers.reduce((acc, member) => {
    if (!acc[member.role]) acc[member.role] = []
    acc[member.role].push(member)
    return acc
  }, {} as Record<string, typeof teamMembers>)

  const totalHours = teamMembers.reduce((sum, member) => sum + member.hoursWorked, 0)

  return (
    <div className="space-y-6">
      {/* Header con Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Equipo del Proyecto ({teamMembers.length} miembros)
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Total de horas trabajadas: {totalHours}h
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Agregar Miembro
        </Button>
      </div>

      {teamMembers.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg">
          <User className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600">No hay miembros asignados al equipo</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(membersByRole).map(([role, members]) => (
            <div key={role}>
              <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
                {getTeamRoleLabel(role)} ({members.length})
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map(member => (
                  <div 
                    key={member.id}
                    className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {getInitials(member.name)}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-slate-900 mb-1">
                          {member.name}
                        </h5>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${roleColors[member.role as keyof typeof roleColors] || 'bg-slate-100 text-slate-700'}`}>
                          {getTeamRoleLabel(member.role)}
                        </span>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-4 space-y-2">
                      {member.email && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <a 
                            href={`mailto:${member.email}`}
                            className="hover:text-blue-600 truncate"
                          >
                            {member.email}
                          </a>
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <a 
                            href={`tel:${member.phone}`}
                            className="hover:text-blue-600"
                          >
                            {member.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-sm text-slate-600">Horas</p>
                          <p className="text-lg font-bold text-slate-900">{member.hoursWorked}h</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Proyectos</p>
                          <p className="text-lg font-bold text-blue-600">{member.projects.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
