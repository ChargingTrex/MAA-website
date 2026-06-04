// src/pages/admin/CSRManager.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Plus, Trash2, Pencil, Calendar } from 'lucide-react'
import { CSR_ACTIVITIES } from '@/data/mockData'
import { formatDate } from '@/utils/helpers'

export default function CSRManager() {
  const { t } = useTranslation()
  const [activities, setActivities] = useState(CSR_ACTIVITIES)

  function handleDelete(id) {
    if (!confirm(t('common.confirmDelete'))) return
    setActivities((prev) => prev.filter((a) => a.id !== id))
    toast.success('Activity deleted')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-charcoal">
          {t('admin.csr.heading')}
        </h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-saffron text-white text-sm font-semibold rounded-lg hover:bg-saffron-dark active:scale-[0.96] transition-all cursor-pointer">
          <Plus size={16} aria-hidden="true" />
          {t('admin.csr.addActivity')}
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-xl border border-border p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-charcoal mb-1 truncate">{activity.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-muted mb-2">
                  <Calendar size={12} aria-hidden="true" />
                  <time dateTime={activity.date}>{formatDate(activity.date)}</time>
                </div>
                <p className="text-sm text-muted line-clamp-2">{activity.description}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button className="p-2 text-muted hover:text-saffron rounded-md transition-colors cursor-pointer" aria-label="Edit activity">
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(activity.id)}
                  className="p-2 text-muted hover:text-emergency rounded-md transition-colors cursor-pointer"
                  aria-label="Delete activity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
