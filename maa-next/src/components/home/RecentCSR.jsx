'use client'
// src/components/home/RecentCSR.jsx
import { Link } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'

/**
 * Recent CSR Activities 
 * Refined and Localized.
 */
export default function RecentCSR() {
  const t = useTranslations('home.recent_csr')
  const locale = useLocale()

  // Static list of recent activity keys matching our en.json
  // In a real app, this would be an array of objects from an API containing the date and i18n keys
  const recentActivities = [
    { key: 'vaccination', date: '2025-04-15' },
    { key: 'awareness', date: '2025-03-10' },
    { key: 'rescue', date: '2024-11-20' },
  ]

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <section className="py-16 md:py-24 bg-cream" aria-labelledby="csr-heading">
      <div className="section-wrapper">
        <SectionHeading
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subtext={t('subtext')}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {recentActivities.map((activity) => (
            <motion.div
              key={activity.key}
              variants={fadeUp}
              className="bg-white rounded-[2rem] overflow-hidden border border-border transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
            >
              {/* Premium image placeholder area (glassmorphic overlay on subtle bg) */}
              <div className="aspect-video bg-forest-subtle flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
                <span className="text-4xl drop-shadow-sm relative z-10" aria-hidden="true">🐾</span>
              </div>

              <div className="p-6 md:p-8">
                {/* Category badge */}
                <span className="inline-flex items-center bg-saffron-subtle text-saffron text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 font-body mb-4">
                  {t(`items.${activity.key}.category`)}
                </span>

                <h3 className="font-display text-xl text-forest leading-snug mb-3 line-clamp-2">
                  {t(`items.${activity.key}.title`)}
                </h3>

                <p className="text-sm text-charcoal/70 font-body leading-relaxed line-clamp-3 mb-6">
                  {t(`items.${activity.key}.description`)}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted font-body font-medium">
                  <Calendar size={14} strokeWidth={2} className="text-forest/60" aria-hidden="true" />
                  <time dateTime={activity.date}>{formatDate(activity.date)}</time>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All link */}
        <div className="text-center mt-12">
          <Link
            href="/csr-activities"
            className="btn-ghost"
            id="csr-view-all-btn"
          >
            {t('cta_all')}
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
