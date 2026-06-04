'use client'
// src/components/shared/Navbar.jsx
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart } from 'lucide-react'
import { NAV_LINKS } from '@/lib/data'
import { slideInRight } from '@/lib/motionVariants'

import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const t = useTranslations('Navigation')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on route change
  useEffect(() => {
    setTimeout(() => {
      setDrawerOpen(false)
    }, 0)
  }, [pathname])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      {/* 4px saffron top-border stripe — signature element per style guide */}
      <div className="h-1 w-full bg-saffron fixed top-0 left-0 z-50" aria-hidden="true" />

      <header
        className={`fixed top-1 left-4 right-4 z-40 transition-all duration-300 max-w-[90rem] mx-auto rounded-2xl ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border border-white/60'
            : 'bg-white border border-transparent'
        }`}
        style={{ boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.04)' }}
      >
        <nav
          className="relative px-4 sm:px-6 lg:px-12"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-20">
            {/* Logo & Tagline */}
            <Link href="/" className="flex flex-col shrink-0 group">
              <span className="text-2xl sm:text-3xl font-display text-forest leading-none group-hover:text-saffron transition-colors duration-200">
                MAA
              </span>
              <span className="text-[10px] text-saffron uppercase tracking-widest font-semibold mt-0.5 font-body">
                {t('tagline')}
              </span>
            </Link>

            {/* Desktop Nav — only on xl+ due to 10 nav items */}
            <div className="hidden xl:flex items-center gap-7">
              {NAV_LINKS.map((link) => {
                const isActive = link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link py-2 text-[14px] font-semibold tracking-wide transition-all duration-200 border-b-2 ${
                      isActive
                        ? 'text-saffron border-saffron'
                        : 'text-charcoal/70 hover:text-forest border-transparent hover:border-forest/30'
                    }`}
                  >
                    {t(link.key || link.label.toLowerCase().replace(/\s+/g, ''))}
                  </Link>
                )
              })}
            </div>

            {/* Right: Donate CTA, Language Switcher, + Hamburger */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <LanguageSwitcher />
              </div>
              <Link
                href="/donate"
                className="hidden sm:inline-flex btn-primary"
                id="nav-donate-cta"
              >
                <Heart size={16} strokeWidth={2} aria-hidden="true" />
                {t('donate')}
              </Link>

              <button
                className="xl:hidden p-2 rounded-xl text-forest hover:bg-forest/5 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-nav-drawer"
              >
                <Menu size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Slide-in Drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                onClick={() => setDrawerOpen(false)}
                aria-hidden="true"
              />

              {/* Drawer panel */}
              <motion.div
                id="mobile-nav-drawer"
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white flex flex-col shadow-2xl border-l border-gray-100"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
              >
                {/* Drawer header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                  <div className="flex flex-col">
                    <span className="font-display text-xl text-forest leading-none">MAA</span>
                    <span className="text-[10px] text-saffron uppercase tracking-widest font-semibold mt-0.5 font-body">{t('tagline')}</span>
                  </div>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-2 rounded-xl hover:bg-gray-50 text-charcoal/70 hover:text-charcoal transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Close navigation menu"
                  >
                    <X size={22} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Drawer links */}
                <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1" aria-label="Mobile navigation">
                  {NAV_LINKS.map((link) => {
                    const isActive = link.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(link.href)
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-5 py-3.5 rounded-2xl text-base font-semibold font-body transition-all duration-200 ${
                          isActive
                            ? 'bg-saffron/10 text-saffron'
                            : 'text-charcoal/70 hover:bg-gray-50 hover:text-forest'
                        }`}
                      >
                        {t(link.key || link.label.toLowerCase().replace(/\s+/g, ''))}
                      </Link>
                    )
                  })}
                </nav>

                {/* Drawer Donate CTA & Lang */}
                <div className="px-5 pb-6 space-y-4">
                  <div className="flex justify-center w-full">
                    <LanguageSwitcher />
                  </div>
                  <Link
                    href="/donate"
                    className="flex items-center justify-center gap-2 w-full bg-saffron text-white font-bold font-body rounded-2xl px-6 py-4 shadow-md hover:bg-saffron-dark active:scale-[0.98] transition-all duration-200"
                  >
                    <Heart size={18} strokeWidth={2} aria-hidden="true" />
                    {t('donate')}
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
