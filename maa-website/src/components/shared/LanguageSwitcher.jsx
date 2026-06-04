// src/components/shared/LanguageSwitcher.jsx
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'te', label: 'తెలుగు',  flag: '🇮🇳' },
  { code: 'hi', label: 'हिंदी',   flag: '🇮🇳' },
  { code: 'ta', label: 'தமிழ்',   flag: '🇮🇳' },
]

/**
 * Language switcher per 05_STYLE_GUIDE.md §4.4 (Language Switcher Pill):
 * bg-forest/10 text-forest rounded-full, hover:bg-forest hover:text-white
 */
export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0]

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  function switchLang(code) {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 bg-forest/10 text-forest text-xs font-semibold rounded-full px-3 py-1.5 hover:bg-forest hover:text-white transition-all duration-150 cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <Globe size={14} strokeWidth={1.5} aria-hidden="true" />
        <span className="hidden sm:inline">{current.label}</span>
        <span className="sm:hidden">{current.code.toUpperCase()}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Available languages"
          className="absolute right-0 top-full mt-2 w-40 rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.07)] py-1 z-50"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === i18n.language}>
              <button
                onClick={() => switchLang(lang.code)}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors cursor-pointer ${
                  lang.code === i18n.language
                    ? 'bg-saffron-subtle text-saffron font-semibold'
                    : 'text-charcoal hover:bg-bg-subtle'
                }`}
              >
                <span aria-hidden="true">{lang.flag}</span>
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
