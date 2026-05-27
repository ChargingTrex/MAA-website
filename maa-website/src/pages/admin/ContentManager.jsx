// src/pages/admin/ContentManager.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { ChevronDown, Save } from 'lucide-react'

const PAGE_SECTIONS = [
  { id: 'home', label: 'Home Page' },
  { id: 'about', label: 'About Us' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'medical', label: 'Medical Facilities' },
  { id: 'donate', label: 'Ways to Donate' },
  { id: 'sponsor', label: 'Sponsor Needs' },
  { id: 'contact', label: 'Contact Info' },
]

export default function ContentManager() {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(null)

  function toggleSection(id) {
    setExpanded((prev) => (prev === id ? null : id))
  }

  function handleSave() {
    toast.success(t('admin.content.saved'))
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-charcoal mb-6">
        {t('admin.content.heading')}
      </h1>

      <div className="space-y-3">
        {PAGE_SECTIONS.map((section) => (
          <div key={section.id} className="bg-white rounded-xl border border-border overflow-hidden">
            {/* Accordion header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-bg-subtle/50 transition-colors"
              aria-expanded={expanded === section.id}
            >
              <span className="font-semibold text-charcoal">{section.label}</span>
              <ChevronDown
                size={18}
                className={`text-muted transition-transform ${expanded === section.id ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Accordion body */}
            {expanded === section.id && (
              <div className="px-5 pb-5 border-t border-border">
                <p className="text-sm text-muted py-4">
                  Content editing fields for the <strong>{section.label}</strong> page will appear here once the backend is connected. Each field will be editable in all 4 languages (EN, TE, HI, TA).
                </p>

                {/* Placeholder fields */}
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                      Heading (EN)
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-lg border border-border text-sm outline-none focus:border-forest transition-colors"
                      placeholder="Enter heading text..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                      Body Text (EN)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-border text-sm outline-none focus:border-forest transition-colors resize-y"
                      placeholder="Enter body text..."
                    />
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-forest text-white text-sm font-semibold rounded-lg hover:bg-forest-dark active:scale-[0.96] transition-all cursor-pointer"
                >
                  <Save size={14} aria-hidden="true" />
                  {t('admin.content.save')}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
