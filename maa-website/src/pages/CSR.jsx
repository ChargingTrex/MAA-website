// src/pages/CSR.jsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import { fadeUp, staggerContainer } from '@/utils/motionVariants'
import { CSR_ACTIVITIES } from '@/data/mockData'
import { formatDate } from '@/utils/helpers'

export default function CSR() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <PageHero
        heading={t('csr.hero.heading')}
        subheading={t('csr.hero.subheading')}
        variant="forest"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16">
          <SectionHeading
            eyebrow={t('csr.feed.eyebrow')}
            heading={t('csr.feed.heading')}
          />

          {/* Timeline per UI Prompt 11 */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="relative"
          >
            {/* Vertical timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-saffron/20" aria-hidden="true" />

            <div className="space-y-10">
              {CSR_ACTIVITIES.map((activity) => (
                <motion.article
                  key={activity.id}
                  variants={fadeUp}
                  className="relative pl-16 md:pl-24"
                >
                  {/* Timeline dot with glowing effect */}
                  <div className="absolute left-[18px] md:left-[26px] top-8 w-3 h-3 rounded-full bg-saffron shadow-[0_0_10px_rgba(244,131,15,0.8)] z-10" aria-hidden="true">
                    <div className="absolute inset-0 rounded-full border-2 border-white mix-blend-overlay"></div>
                    <div className="absolute -inset-2 bg-saffron/20 rounded-full animate-ping"></div>
                  </div>

                  <div className="card-premium p-6 md:p-8">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-saffron mb-3 font-body">
                      <Calendar size={14} strokeWidth={1.5} aria-hidden="true" />
                      <time dateTime={activity.date}>{formatDate(activity.date)}</time>
                    </div>

                    <h3 className="font-display text-xl text-forest mb-3 leading-snug" style={{ textWrap: 'balance' }}>
                      {activity.title}
                    </h3>

                    <p className="text-base text-charcoal/80 leading-relaxed font-body" style={{ textWrap: 'pretty' }}>
                      {activity.description}
                    </p>

                    {/* Image strip */}
                    {activity.images.length > 0 && (
                      <div className="flex gap-3 mt-6 overflow-x-auto scrollbar-hide pb-2">
                        {activity.images.map((img, i) => (
                          <div key={i} className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-forest/5 flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                            <span className="text-2xl opacity-20" aria-hidden="true">📷</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
