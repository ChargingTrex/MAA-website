// src/pages/admin/TeamManager.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Plus, Trash2, Pencil } from 'lucide-react'
import { TEAM_MEMBERS } from '@/data/mockData'
import { getInitials } from '@/utils/helpers'

export default function TeamManager() {
  const { t } = useTranslation()
  const [members, setMembers] = useState(TEAM_MEMBERS)

  function handleDelete(id) {
    if (!confirm(t('common.confirmDelete'))) return
    setMembers((prev) => prev.filter((m) => m.id !== id))
    toast.success('Team member removed')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-charcoal">
          {t('admin.team.heading')}
        </h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-saffron text-white text-sm font-semibold rounded-lg hover:bg-saffron-dark active:scale-[0.96] transition-all cursor-pointer">
          <Plus size={16} aria-hidden="true" />
          {t('admin.team.addMember')}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-subtle border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-charcoal">{t('admin.team.photo')}</th>
                <th className="text-left px-4 py-3 font-semibold text-charcoal">{t('admin.team.name')}</th>
                <th className="text-left px-4 py-3 font-semibold text-charcoal hidden sm:table-cell">{t('admin.team.designation')}</th>
                <th className="text-left px-4 py-3 font-semibold text-charcoal hidden md:table-cell">{t('admin.team.qualification')}</th>
                <th className="text-right px-4 py-3 font-semibold text-charcoal w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b border-border last:border-0 hover:bg-bg-subtle/50">
                  <td className="px-4 py-3">
                    <div className="w-9 h-9 rounded-full bg-forest text-white text-xs font-bold flex items-center justify-center">
                      {getInitials(member.name)}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-charcoal">{member.name}</td>
                  <td className="px-4 py-3 text-muted hidden sm:table-cell">{member.designation}</td>
                  <td className="px-4 py-3 text-muted hidden md:table-cell">{member.qualification}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-muted hover:text-saffron rounded-md transition-colors cursor-pointer" aria-label="Edit">
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-1.5 text-muted hover:text-emergency rounded-md transition-colors cursor-pointer"
                        aria-label="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
