'use client'
// src/components/home/DonateCallout.jsx
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Heart, ArrowRight } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'

export default function DonateCallout() {
  const t = useTranslations('home.donate_callout')

  return (
    <section className="bg-saffron py-16 md:py-20 relative overflow-hidden" aria-label="Donation call to action">
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] texture-stripe"
        aria-hidden="true"
      />

      <div className="section-wrapper relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center"
        >
          <motion.div variants={fadeUp} className="mb-4">
            <span className="inline-flex items-center bg-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-white uppercase tracking-widest font-body">
              {t('eyebrow')}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-5xl text-white leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {t('heading')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-white/85 max-w-xl mx-auto mt-4 font-body leading-relaxed"
            style={{ textWrap: 'pretty' }}
          >
            {t('subtext')}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 bg-white text-saffron-dark rounded-full px-8 py-3.5 text-sm font-bold font-body shadow-lg hover:shadow-xl hover:bg-cream active:scale-[0.98] transition-all duration-200"
              id="callout-donate-btn"
            >
              <Heart size={18} strokeWidth={2} aria-hidden="true" />
              {t('cta_donate')}
            </Link>
            <Link
              href="/sponsor"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white rounded-full px-8 py-3.5 text-sm font-bold font-body hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
              id="callout-sponsor-btn"
            >
              {t('cta_sponsor')}
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Impact line */}
          <motion.p variants={fadeUp} className="text-sm text-white/60 mt-6 font-body">
            {t('impact_line')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
