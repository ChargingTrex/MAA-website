// src/i18n/index.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import te from './locales/te.json'
import hi from './locales/hi.json'
import ta from './locales/ta.json'

const fontMap = {
  en: '',
  te: 'lang-telugu',
  hi: 'lang-hindi',
  ta: 'lang-tamil',
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      te: { translation: te },
      hi: { translation: hi },
      ta: { translation: ta },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'maa-lang',
    },
  })

// Update html lang attribute and font class on language change
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  // Remove all lang classes
  Object.values(fontMap).forEach((cls) => {
    if (cls) document.documentElement.classList.remove(cls)
  })
  // Add current lang class
  const cls = fontMap[lng]
  if (cls) document.documentElement.classList.add(cls)
})

export default i18n
