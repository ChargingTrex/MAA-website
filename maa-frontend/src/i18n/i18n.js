import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enLocale from './locales/en.json'
import teLocale from './locales/te.json'
import hiLocale from './locales/hi.json'
import taLocale from './locales/ta.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enLocale },
      te: { translation: teLocale },
      hi: { translation: hiLocale },
      ta: { translation: taLocale },
    },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
