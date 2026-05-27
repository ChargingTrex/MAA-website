// src/components/home/HeroSection.jsx
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Heart, ArrowRight, ChevronDown } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/utils/motionVariants'

/**
 * Hero per 04_UI_PROMPTS.md §3:
 * - Full viewport height with forest-to-saffron gradient overlay
 * - Pill label, DM Serif heading, subheading, two CTA buttons
 * - Bouncing scroll indicator at bottom
 */
export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center text-white rounded-b-[2rem] md:rounded-b-[3rem] shadow-sm mb-10">
      {/* Gradient background (Ocean Blue to Saffron diagonal wash) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(30,58,138,0.92) 0%, rgba(23,37,84,0.85) 40%, rgba(244,131,15,0.55) 100%)',
        }}
      />

      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
          backgroundSize: '12px 12px',
        }}
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-16 text-center"
      >
        {/* Pill badge */}
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 font-body">
            {t('home.hero.pill')}
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-5xl md:text-7xl leading-tight"
          style={{ textWrap: 'balance' }}
        >
          {t('home.hero.heading')}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-white/85 max-w-xl mx-auto mt-4 font-body"
          style={{ textWrap: 'pretty' }}
        >
          {t('home.hero.subheading')}
        </motion.p>

        {/* CTA buttons per §4.1 */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            to="/donate"
            className="btn-saffron"
          >
            <Heart size={18} strokeWidth={2} aria-hidden="true" />
            {t('home.hero.donateBtn')}
          </Link>
          <Link
            to="/about"
            className="btn-secondary"
          >
            {t('home.hero.learnBtn')}
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} strokeWidth={1.5} className="text-white/60" />
        </motion.div>
      </div>
    </section>
  )
}
