// src/pages/admin/Dashboard.jsx
import { useTranslation } from 'react-i18next'
import { ImageIcon, Video, Users, HeartHandshake } from 'lucide-react'
import { GALLERY_PHOTOS, GALLERY_VIDEOS, TEAM_MEMBERS, CSR_ACTIVITIES } from '@/data/mockData'

const CARDS = [
  { icon: ImageIcon,       labelKey: 'admin.dashboard.totalPhotos',   value: GALLERY_PHOTOS.length, color: 'saffron' },
  { icon: Video,           labelKey: 'admin.dashboard.totalVideos',   value: GALLERY_VIDEOS.length, color: 'forest' },
  { icon: Users,           labelKey: 'admin.dashboard.teamMembers',   value: TEAM_MEMBERS.length,   color: 'saffron' },
  { icon: HeartHandshake,  labelKey: 'admin.dashboard.csrActivities', value: CSR_ACTIVITIES.length,  color: 'forest' },
]

export default function Dashboard() {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-charcoal mb-8">
        {t('admin.dashboard.heading')}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CARDS.map((card) => {
          const Icon = card.icon
          const bgIcon = card.color === 'saffron' ? 'bg-saffron-subtle text-saffron' : 'bg-forest-subtle text-forest'
          return (
            <div
              key={card.labelKey}
              className="bg-white rounded-xl border border-border p-5 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl ${bgIcon} flex items-center justify-center shrink-0`}>
                <Icon size={22} aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-charcoal tabular-nums">{card.value}</p>
                <p className="text-xs text-muted">{t(card.labelKey)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
