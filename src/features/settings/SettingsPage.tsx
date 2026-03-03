import { useState } from 'react'
import { MainLayout } from '@/layout/MainLayout'
import { Settings, GitBranchPlus, Shield, UserCog } from 'lucide-react'
import ApprovalFlowsTab from './tabs/ApprovalFlowsTab'
import UsersTab from './tabs/UsersTab'
import RolesTab from './tabs/RolesTab'

type TabType = 'flows' | 'roles' | 'users'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('flows')

  const tabs = [
    { id: 'flows' as TabType, label: 'Flujos de Aprobación', icon: GitBranchPlus },
    { id: 'roles' as TabType, label: 'Roles y Permisos', icon: Shield },
    { id: 'users' as TabType, label: 'Usuarios', icon: UserCog },
  ]

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Configuraciones del Sistema</h1>
            <p className="text-sm text-gray-600">Gestiona flujos, roles y otros ajustes generales</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {activeTab === 'flows' && <ApprovalFlowsTab />}
          {activeTab === 'roles' && <RolesTab />}
          {activeTab === 'users' && <UsersTab />}
        </div>
      </div>
    </MainLayout>
  )
}
