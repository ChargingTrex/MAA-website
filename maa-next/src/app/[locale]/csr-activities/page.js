'use client'
// src/app/[locale]/csr-activities/page.js
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import PawDivider from '@/components/shared/PawDivider'
import { CSR_ACTIVITIES } from '@/lib/data'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'


function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Extended list for the full page
const ALL_CSR = [
  ...CSR_ACTIVITIES,
  {
    id: 4,
    title: 'Free Deworming Drive — Hyderabad Slums',
    date: '2024-09-05',
    description:
      'Dewormed over 300 stray dogs across 10 slum areas in Hyderabad in collaboration with local animal welfare groups.',
    category: 'Health Drive',
  },
]

const IMPACT_STATS = [
  { value: '10+', label: 'CSR Camps Held' },
  { value: '1,500+', label: 'Animals Reached' },
  { value: '20+', label: 'Villages Covered' },
  { value: '5', label: 'Partner NGOs' },
]

export default function CSRActivitiesPage() {
  const t = useTranslations('csr')

  return (
    <div className="bg-cream">
      <PageHero
        title={t('page.hero.title')}
        subtitle={t('page.hero.subtitle')}
        variant="forest"
      />

      {/* Impact Stats */}
      <div className="bg-saffron py-10 md:py-14">
        <div className="section-wrapper">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {IMPACT_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <p className="font-display text-3xl md:text-4xl text-white">{stat.value}</p>
                <p className="text-sm text-white/80 uppercase tracking-wide mt-1 font-body">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Cards */}
      <section className="py-16 md:py-24">
        <div className="section-wrapper">
          <SectionHeading
            eyebrow={t('section.impact.eyebrow')}
            heading={t('section.impact.heading')}
            subtext={t('section.impact.subtext')}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {ALL_CSR.map((activity) => (
              <motion.article
                key={activity.id}
                variants={fadeUp}
                className="bg-white rounded-2xl overflow-hidden border border-border hover:-translate-y-1 transition-all duration-300"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
              >
                {/* Photo Placeholder */}
                <div className="aspect-video bg-forest-subtle flex items-center justify-center">
                  <span className="text-5xl opacity-30" aria-hidden="true">🐾</span>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center bg-saffron-subtle text-saffron text-xs font-semibold uppercase tracking-wide rounded-full px-3 py-1 font-body">
                      {activity.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-muted font-body">
                      <Calendar size={12} strokeWidth={1.5} aria-hidden="true" />
                      <time dateTime={activity.date}>{formatDate(activity.date)}</time>
                    </div>
                  </div>

                  <h3 className="font-display text-xl text-forest leading-snug mb-3">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-charcoal/80 leading-relaxed font-body">
                    {activity.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <PawDivider />

      {/* Partner CTA */}
      <section className="py-16 md:py-20 bg-forest">
        <div className="section-wrapper text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold text-saffron-light uppercase tracking-widest font-body">
              {t('section.partner.eyebrow')}
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-white mt-2 mb-4">
              {t('section.partner.heading')}
            </h2>
            <p className="text-base text-white/70 max-w-xl mx-auto font-body leading-relaxed mb-8">
              {t('section.partner.subtext')}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-saffron text-white rounded-full px-8 py-3.5 text-sm font-bold font-body hover:bg-saffron-dark active:scale-[0.98] transition-all duration-200 shadow-lg">
              {t('section.partner.cta')}
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
