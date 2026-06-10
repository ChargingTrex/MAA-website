import { createContext, useContext, useState, useEffect } from 'react'
import i18n from '../i18n/i18n'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  useEffect(() => {
    i18n.changeLanguage(language)
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  const value = {
    language,
    setLanguage,
    isHindi: language === 'hi',
    isTelugu: language === 'te',
    isTamil: language === 'ta',
    isEnglish: language === 'en',
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
