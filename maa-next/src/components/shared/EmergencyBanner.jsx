// src/components/shared/EmergencyBanner.jsx
import { Phone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/data'

/**
 * Red emergency ambulance banner — per 02_PRD.md §10.4
 * Only uses red as per 05_STYLE_GUIDE.md §1.3 (emergency use only)
 */
export default function EmergencyBanner() {
  return (
    <div className="bg-red-600 text-white py-3 px-4" role="banner" aria-label="Emergency contact">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
        <span className="text-sm font-semibold font-body">
          🚨 Animal Emergency? Our ambulance is available 24/7
        </span>
        <a
          href={`tel:${SITE_CONFIG.emergencyPhone}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors duration-150"
          aria-label={`Call emergency number ${SITE_CONFIG.emergencyPhone}`}
        >
          <Phone size={14} strokeWidth={2} aria-hidden="true" />
          {SITE_CONFIG.emergencyPhone}
        </a>
      </div>
    </div>
  )
}
