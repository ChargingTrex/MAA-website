// src/components/home/RecentCSR.jsx
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'
import { fadeUp, staggerContainer } from '@/utils/motionVariants'
import { CSR_ACTIVITIES } from '@/data/mockData'
import { formatDate } from '@/utils/helpers'

/**
 * Recent CSR per 04_UI_PROMPTS.md §5D:
 * - 3-col grid, image cards (rounded-2xl overflow-hidden card shadow)
 * - Hover: scale-[1.02] shadow-lg
 */
export default function RecentCSR() {
  const { t } = useTranslation()
  const recent = CSR_ACTIVITIES.slice(0, 3)

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <SectionHeading
          eyebrow={t('home.csr.eyebrow')}
          heading={t('home.csr.heading')}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {recent.map((activity) => (
            <motion.article
              key={activity.id}
              variants={fadeUp}
              className="card-premium overflow-hidden cursor-pointer group"
            >
              {/* Placeholder image */}
              <div className="aspect-video bg-gradient-to-br from-forest/10 to-saffron/10 flex items-center justify-center">
                <span className="text-4xl opacity-30" aria-hidden="true">🐾</span>
              </div>

              <div className="p-6 md:p-8 flex flex-col items-center text-center">
                <p className="text-xs text-charcoal/60 font-semibold uppercase tracking-widest font-body">
                  <time dateTime={activity.date}>{formatDate(activity.date)}</time>
                </p>
                <h3 className="text-lg font-bold text-forest mt-2 line-clamp-2 font-display">
                  {activity.title}
                </h3>
                <p className="text-sm text-charcoal/80 line-clamp-2 mt-2 font-body">
                  {activity.description}
                </p>
                <span className="inline-flex items-center gap-1 text-saffron text-sm font-semibold mt-4 font-body group-hover:underline underline-offset-2">
                  Read More
                  <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            to="/csr"
            className="inline-flex items-center gap-2 text-saffron text-sm font-semibold hover:text-saffron-dark hover:underline underline-offset-2 transition-all font-body"
          >
            {t('home.csr.viewAll')}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
