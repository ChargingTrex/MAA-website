// src/components/shared/Footer.jsx
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { MapPin, Phone, Mail, Heart } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/data'

/**
 * Footer per 05_STYLE_GUIDE.md §1.3: bg-forest, white/90 text, saffron-light accents.
 */
export default function Footer() {
  const t = useTranslations('Navigation')
  const year = new Date().getFullYear()

  const QUICK_LINKS = [
    { href: '/about',              labelKey: 'aboutus' },
    { href: '/medical-facilities', labelKey: 'medicalfacilities' },
    { href: '/gallery',            labelKey: 'photogallery' },
    { href: '/csr-activities',     labelKey: 'csractivities' },
    { href: '/donate',             labelKey: 'waystodonate' },
    { href: '/sponsor',            labelKey: 'sponsorourneeds' },
    { href: '/contact',            labelKey: 'contactus' },
  ]

  return (
    <footer className="bg-forest text-white/90" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">

          {/* Column 1: About */}
          <div>
            <Link href="/" className="flex flex-col mb-5 group">
              <span className="font-display text-2xl text-white leading-none group-hover:text-saffron-light transition-colors duration-200">
                MAA
              </span>
              <span className="text-[10px] text-saffron-light uppercase tracking-widest font-semibold mt-1 font-body">
                {t('tagline')}
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed font-body">
              {t('footer_desc')}
            </p>
            <p className="text-sm text-white/50 font-body mt-4 flex items-center gap-1.5">
              <Heart size={12} className="text-saffron-light" aria-hidden="true" />
              {t('designed_with_love')}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-saffron-light mb-5 font-body">
              {t('quick_links')}
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-saffron-light transition-colors duration-150 font-body"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-saffron-light mb-5 font-body">
              {t('contactus')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/70 font-body">
                <MapPin size={16} strokeWidth={1.5} className="shrink-0 mt-0.5 text-saffron-light" aria-hidden="true" />
                <span>{SITE_CONFIG.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-saffron-light transition-colors duration-150 font-body"
                >
                  <Phone size={16} strokeWidth={1.5} className="shrink-0 text-saffron-light" aria-hidden="true" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-saffron-light transition-colors duration-150 font-body"
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
          <p>© {year} {SITE_CONFIG.name}. {t('all_rights_reserved')}</p>
          <p>{t('designed_with_love')}</p>
        </div>
      </div>
    </footer>
  )
}
