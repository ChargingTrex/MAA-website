import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../context/LanguageContext'
import { Menu, X, Globe, UserCircle } from 'lucide-react'
import logo from '../../assets/logo.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguage()

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/infrastructure', label: t('nav.infrastructure') },
    { path: '/medical-facilities', label: t('nav.medical') },
    { path: '/our-team', label: t('nav.team') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/csr-activities', label: t('nav.csr') },
    { path: '/donate', label: t('nav.donate') },
    { path: '/sponsor', label: t('nav.sponsor') },
    { path: '/contact', label: t('nav.contact') },
  ]

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-soft">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="MAA Saraswati Veterinary Hospital" className="h-12 md:h-14 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-3 py-2 text-sm font-medium text-charcoal hover:text-saffron transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Selector & Mobile Menu Button */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Login Link */}
            <Link 
              to="/admin/login" 
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal hover:text-saffron transition-colors"
            >
              <UserCircle size={18} />
              <span className="hidden sm:inline">Login</span>
            </Link>

            {/* Language Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal hover:text-saffron transition-colors">
                <Globe size={18} />
                <span className="hidden sm:inline uppercase">{language}</span>
              </button>
              <div className="hidden group-hover:flex flex-col absolute right-0 mt-0 bg-white border border-muted-light rounded-lg shadow-md overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-4 py-2 text-sm text-left ${
                      language === lang.code
                        ? 'bg-saffron text-white'
                        : 'hover:bg-cream'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-cream rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-muted-light">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-2 text-sm font-medium text-charcoal hover:text-saffron transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
