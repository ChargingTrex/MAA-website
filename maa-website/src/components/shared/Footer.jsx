// src/components/shared/Footer.jsx
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/data/mockData'

const QUICK_LINKS = [
  { to: '/about',          labelKey: 'nav.about' },
  { to: '/medical',        labelKey: 'nav.medical' },
  { to: '/gallery',        labelKey: 'nav.gallery' },
  { to: '/csr',            labelKey: 'nav.csr' },
  { to: '/donate',         labelKey: 'nav.donate' },
  { to: '/contact',        labelKey: 'nav.contact' },
]

/**
 * Footer per 05_STYLE_GUIDE.md §1.3: bg-forest (not bg-forest-dark).
 */
export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-forest text-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Column 1: About */}
          <div>
            <h2 className="font-display text-xl text-white mb-4" style={{ textWrap: 'balance' }}>
              MAA Saraswati<br />Veterinary Hospital
            </h2>
            <p className="text-sm text-white/70 leading-relaxed font-body" style={{ textWrap: 'pretty' }}>
              {t('footer.about')}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-saffron-light mb-4 font-body">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/70 hover:text-saffron-light transition-colors font-body"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-saffron-light mb-4 font-body">
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70 font-body">
                <MapPin size={16} strokeWidth={1.5} className="shrink-0 mt-0.5 text-saffron-light" aria-hidden="true" />
                <span>{SITE_CONFIG.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-saffron-light transition-colors font-body"
                >
                  <Phone size={16} strokeWidth={1.5} className="shrink-0 text-saffron-light" aria-hidden="true" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-saffron-light transition-colors font-body"
                >
                  <Mail size={16} strokeWidth={1.5} className="shrink-0 text-saffron-light" aria-hidden="true" />
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50 font-body">
          <p>{t('footer.copyright', { year })}</p>
          <p>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  )
}
