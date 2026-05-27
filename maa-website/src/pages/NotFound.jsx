// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home } from 'lucide-react'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <span className="text-8xl mb-6 block" aria-hidden="true">🐾</span>
          <h1 className="font-display text-5xl font-bold text-forest mb-3 leading-tight">404</h1>
          <p className="text-charcoal/80 mb-8 font-body text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest text-white text-sm font-semibold rounded-full shadow-md hover:bg-forest-dark hover:shadow-lg active:scale-[0.98] transition-all duration-200"
          >
            <Home size={18} strokeWidth={1.5} aria-hidden="true" />
            {t('common.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}
