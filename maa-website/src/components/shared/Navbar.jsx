// src/components/shared/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { slideInRight } from '@/utils/motionVariants'

const NAV_LINKS = [
  { to: '/',               labelKey: 'nav.home' },
  { to: '/about',          labelKey: 'nav.about' },
  { to: '/infrastructure', labelKey: 'nav.infrastructure' },
  { to: '/medical',        labelKey: 'nav.medical' },
  { to: '/team',           labelKey: 'nav.team' },
  { to: '/gallery',        labelKey: 'nav.gallery' },
  { to: '/csr',            labelKey: 'nav.csr' },
  { to: '/donate',         labelKey: 'nav.donate' },
  { to: '/sponsor',        labelKey: 'nav.sponsor' },
  { to: '/contact',        labelKey: 'nav.contact' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      {/* Fixed saffron top-border stripe */}
      <div className="h-1 w-full bg-saffron fixed top-0 left-0 z-50" aria-hidden="true" />

      <header
        className={`fixed top-4 left-4 right-4 z-40 transition-all duration-300 max-w-[90rem] mx-auto rounded-2xl ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/60'
            : 'bg-white shadow-sm border border-transparent'
        }`}
      >

        <nav className="relative max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12" aria-label="Main navigation">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Tagline */}
            <Link to="/" className="flex flex-col shrink-0 group">
              <span className="text-2xl sm:text-3xl font-display text-forest leading-none group-hover:text-saffron transition-colors duration-200">
                MAA
              </span>
              <span className="text-[10px] text-saffron uppercase tracking-widest font-semibold mt-1">
                Free Veterinary Care
              </span>
            </Link>

            {/* Desktop Nav - Generous Spacing */}
            <div className="hidden xl:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `nav-link py-2 text-[15px] font-semibold tracking-wide transition-all duration-200 ${
                      isActive ? 'text-saffron border-b-2 border-saffron' : 'text-charcoal/70 hover:text-forest hover:border-b-2 hover:border-forest/30 border-b-2 border-transparent'
                    }`
                  }
                >
                  {t(link.labelKey)}
                </NavLink>
              ))}
            </div>

            {/* Right: Lang + Donate CTA + Hamburger */}
            <div className="flex items-center gap-5">
              <LanguageSwitcher />

              <Link
                to="/donate"
                className="hidden sm:inline-flex btn-saffron"
              >
                <Heart size={16} strokeWidth={2} aria-hidden="true" />
                {t('home.hero.donateBtn')}
              </Link>

              <button
                className="xl:hidden p-2 rounded-xl text-forest hover:bg-forest/5 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/40"
                onClick={() => setDrawerOpen(false)}
                aria-hidden="true"
              />

              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white flex flex-col shadow-2xl border-l border-gray-100"
              >

                {/* Drawer header */}
                <div className="relative flex items-center justify-between px-6 py-5 border-b border-gray-100">
                  <span className="font-display text-xl text-forest">MAA</span>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-2 rounded-xl hover:bg-gray-50 text-charcoal/70 hover:text-charcoal transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Close menu"
                  >
                    <X size={24} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Drawer links */}
                <nav className="relative flex-1 overflow-y-auto py-4 px-4 space-y-1" aria-label="Mobile navigation">
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `block px-5 py-3.5 rounded-2xl text-base font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-saffron/10 text-saffron'
                            : 'text-charcoal/70 hover:bg-gray-50 hover:text-forest'
                        }`
                      }
                    >
                      {t(link.labelKey)}
                    </NavLink>
                  ))}
                </nav>

                {/* Drawer donate CTA */}
                <div className="relative px-5 pb-6">
                  <Link
                    to="/donate"
                    className="flex items-center justify-center gap-2 w-full bg-saffron text-white font-bold rounded-2xl px-6 py-4 shadow-md hover:bg-saffron-dark active:scale-[0.98] transition-all duration-200"
                  >
                    <Heart size={18} strokeWidth={2} aria-hidden="true" />
                    {t('home.hero.donateBtn')}
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
