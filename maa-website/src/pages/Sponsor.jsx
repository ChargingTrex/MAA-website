// src/pages/Sponsor.jsx
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import PawDivider from '@/components/shared/PawDivider'
import { fadeUp, staggerContainer } from '@/utils/motionVariants'
import { SPONSOR_NEEDS } from '@/data/mockData'
import { formatNumber } from '@/utils/helpers'

const PRIORITY_COLORS = {
  high:   'bg-red-50 text-red-600 border-red-200',
  medium: 'bg-saffron/10 text-saffron border-saffron/20',
  low:    'bg-forest/10 text-forest border-forest/20',
}

export default function Sponsor() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <PageHero
        heading={t('sponsor.hero.heading')}
        subheading={t('sponsor.hero.subheading')}
        variant="saffron"
      />

      {/* Needs Grid per UI Prompt 11 */}
      <section className="py-16 md:py-24 [content-visibility:auto]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <SectionHeading
            eyebrow={t('sponsor.needs.eyebrow')}
            heading={t('sponsor.needs.heading')}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SPONSOR_NEEDS.map((need) => {
              const pct = Math.round((need.raisedAmount / need.targetAmount) * 100)
              return (
                <motion.div
                  key={need.id}
                  variants={fadeUp}
                  className="card-premium p-8 md:p-10 relative group flex flex-col items-center text-center h-full"
                >
                  {/* Priority badge */}
                  <span className={`absolute top-6 right-6 text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-widest font-body ${PRIORITY_COLORS[need.priority]}`}>
                    {need.priority}
                  </span>

                  <h3 className="font-display text-2xl text-forest mb-4 mt-4 md:mt-0">{need.title}</h3>
                  <p className="text-sm text-charcoal/80 mb-8 leading-relaxed font-body flex-1" style={{ textWrap: 'pretty' }}>
                    {need.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex justify-between text-sm text-charcoal font-semibold mb-2 font-body">
                      <span>₹{formatNumber(need.raisedAmount)} <span className="text-xs text-charcoal/60 font-normal">{t('sponsor.needs.funded')}</span></span>
                      <span>₹{formatNumber(need.targetAmount)} <span className="text-xs text-charcoal/60 font-normal">{t('sponsor.needs.needed')}</span></span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2.5 rounded-full bg-saffron/10 overflow-hidden mb-6">
                      <div
                        className="h-full rounded-full bg-saffron transition-all duration-1000 ease-out"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <Link
                      to="/contact"
                      className="btn-secondary w-full mt-4"
                    >
                      Sponsor This
                      <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <PawDivider />

      {/* How to Sponsor */}
      <section className="py-16 md:py-24 bg-forest-subtle/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <h2 className="font-display text-3xl font-bold text-forest mb-12">
            {t('sponsor.how.heading')}
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-12">
            {['step1', 'step2', 'step3'].map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-4 max-w-[240px]">
                <span className="w-12 h-12 rounded-full bg-saffron text-white font-display font-bold text-xl flex items-center justify-center shrink-0 shadow-md">
                  {i + 1}
                </span>
                <p className="text-base text-charcoal text-center font-body" style={{ textWrap: 'balance' }}>
                  {t(`sponsor.how.${step}`)}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="btn-primary mt-8"
          >
            {t('sponsor.cta')}
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
