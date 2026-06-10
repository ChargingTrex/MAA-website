import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Heart, UserCircle } from 'lucide-react'
import { PHONE_NUMBER, EMAIL, ADDRESS } from '../../lib/utils'
import logo from '../../assets/logo.png'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-dark text-white pt-12 md:pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4 bg-white/10 p-2 rounded-xl w-fit">
              <img src={logo} alt="MAA Saraswati Veterinary Hospital" className="h-14 w-auto rounded-lg bg-white p-1" />
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Compassionate veterinary care for all animals since 2024
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-saffron">{t('common.contact_us')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-saffron transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/our-team" className="hover:text-saffron transition-colors">
                  {t('nav.team')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-saffron transition-colors">
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-saffron transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-saffron">{t('nav.medical')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/medical-facilities" className="hover:text-saffron transition-colors">
                  {t('nav.medical')}
                </Link>
              </li>
              <li>
                <Link to="/infrastructure" className="hover:text-saffron transition-colors">
                  {t('nav.infrastructure')}
                </Link>
              </li>
              <li>
                <Link to="/csr-activities" className="hover:text-saffron transition-colors">
                  {t('nav.csr')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-saffron">{t('nav.donate')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/donate" className="hover:text-saffron transition-colors">
                  {t('nav.donate')}
                </Link>
              </li>
              <li>
                <Link to="/sponsor" className="hover:text-saffron transition-colors">
                  {t('nav.sponsor')}
                </Link>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="#" className="p-2 hover:bg-saffron rounded-full transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-saffron rounded-full transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-saffron rounded-full transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 py-8 border-t border-muted-light">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-start gap-3 hover:text-saffron transition-colors"
          >
            <Phone size={20} className="flex-shrink-0 mt-1" />
            <div>
              <p className="text-xs text-muted">{t('contact.phone')}</p>
              <p className="text-sm font-semibold">{PHONE_NUMBER}</p>
            </div>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-start gap-3 hover:text-saffron transition-colors"
          >
            <Mail size={20} className="flex-shrink-0 mt-1" />
            <div>
              <p className="text-xs text-muted">{t('contact.email_label')}</p>
              <p className="text-sm font-semibold">{EMAIL}</p>
            </div>
          </a>
          <div className="flex items-start gap-3">
            <MapPin size={20} className="flex-shrink-0 mt-1" />
            <div>
              <p className="text-xs text-muted">{t('contact.address')}</p>
              <p className="text-sm font-semibold">{ADDRESS}</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-muted-light pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            &copy; {currentYear} MAA Saraswati Veterinary Hospital. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-2">Made with <Heart size={16} className="text-saffron" /> for animals</span>
            <Link
              to="/admin/login"
              className="p-2 rounded-full text-muted hover:text-saffron hover:bg-white/10 transition-all duration-300"
              title="Admin Login"
              aria-label="Admin Login"
            >
              <UserCircle size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
