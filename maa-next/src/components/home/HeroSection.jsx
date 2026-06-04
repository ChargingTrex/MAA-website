'use client'
// src/components/home/HeroSection.jsx
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Heart, ArrowRight, ChevronDown } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'

/**
 * Full-viewport hero
 * Impeccable Refinement: Premium mesh gradient with radial blurs instead of linear gradient.
 */
export default function HeroSection() {
  const t = useTranslations('home.hero')

  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center justify-center text-white rounded-b-[2rem] md:rounded-b-[3rem] mb-10"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
      aria-label="Hero section"
    >
      {/* Premium Mesh Gradient Background */}
      <div className="absolute inset-0 bg-forest overflow-hidden" aria-hidden="true">
        {/* Soft noise/texture */}
        <div className="absolute inset-0 opacity-[0.03] texture-stripe mix-blend-overlay" />
        
        {/* Radial Blobs for Depth */}
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-forest-light/40 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-saffron-dark/30 blur-[140px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-saffron/20 blur-[100px] mix-blend-screen" />
      </div>

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-16 text-center pt-32 pb-20"
      >
        {/* Pill badge */}
        <motion.div variants={fadeUp} className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-widest rounded-full px-5 py-2 font-body shadow-glass">
            <span aria-hidden="true">🐾</span> {t('badge')}
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-5xl md:text-7xl leading-tight drop-shadow-lg"
          style={{ textWrap: 'balance' }}
        >
          {t('title')}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mt-6 font-body leading-relaxed drop-shadow-md"
          style={{ textWrap: 'pretty' }}
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12"
        >
          <Link href="/donate" className="btn-primary py-4 px-8 text-base shadow-xl" id="hero-donate-btn">
            <Heart size={20} strokeWidth={2} aria-hidden="true" />
            {t('cta_primary')}
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/40 bg-white/5 backdrop-blur-sm text-white rounded-full px-8 py-4 text-base font-semibold font-body hover:bg-white/15 hover:border-white/60 active:scale-[0.98] transition-all duration-300 shadow-glass"
            id="hero-learn-btn"
          >
            {t('cta_secondary')}
            <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Stats quick preview */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-8 md:gap-12 mt-16 pt-8 border-t border-white/10"
        >
          {[
            { value: '5,000+', label: t('stats.animals-treated') },
            { value: '₹0', label: t('stats.cost') },
            { value: '24/7', label: t('stats.ambulance') },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl md:text-4xl text-white drop-shadow-sm">{stat.value}</p>
              <p className="text-xs text-white/70 font-body uppercase tracking-widest mt-1.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bouncing scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} strokeWidth={1.5} className="text-white/50 hover:text-white transition-colors cursor-pointer" />
        </motion.div>
      </div>
    </section>
  )
}
