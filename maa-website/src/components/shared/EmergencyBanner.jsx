// src/components/shared/EmergencyBanner.jsx
import { Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SITE_CONFIG } from '@/data/mockData'

export default function EmergencyBanner() {
  const { t } = useTranslation()

  return (
    <div className="bg-emergency text-white text-xs sm:text-sm font-medium">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-center gap-2">
        <Phone size={14} className="shrink-0" aria-hidden="true" />
        <span>{t('contact.ambulance.heading')}</span>
        <span className="hidden sm:inline">—</span>
        <a
          href={`tel:${SITE_CONFIG.emergencyPhone}`}
          className="underline underline-offset-2 font-semibold hover:opacity-90 transition-opacity"
        >
          {SITE_CONFIG.emergencyPhone}
        </a>
      </div>
    </div>
  )
}
