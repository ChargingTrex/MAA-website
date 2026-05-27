// src/pages/Infrastructure.jsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FlaskConical, Scissors, BedDouble, Ambulance, HeartPulse } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import { fadeUp, staggerContainer } from '@/utils/motionVariants'

const FACILITIES = [
  { icon: FlaskConical, titleKey: 'infrastructure.facilities.lab',       descKey: 'infrastructure.facilities.labDesc' },
  { icon: Scissors,     titleKey: 'infrastructure.facilities.ot',        descKey: 'infrastructure.facilities.otDesc' },
  { icon: BedDouble,    titleKey: 'infrastructure.facilities.wards',     descKey: 'infrastructure.facilities.wardsDesc' },
  { icon: Ambulance,    titleKey: 'infrastructure.facilities.ambulance', descKey: 'infrastructure.facilities.ambulanceDesc' },
  { icon: HeartPulse,   titleKey: 'infrastructure.facilities.icu',       descKey: 'infrastructure.facilities.icuDesc' },
]

export default function Infrastructure() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <PageHero
        heading={t('infrastructure.hero.heading')}
        subheading={t('infrastructure.hero.subheading')}
        variant="forest"
      />

      {/* Facilities per UI Prompt 11 */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <SectionHeading
            eyebrow={t('infrastructure.facilities.eyebrow')}
            heading={t('infrastructure.facilities.heading')}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FACILITIES.map((fac) => {
              const Icon = fac.icon
              return (
                <motion.div
                  key={fac.titleKey}
                  variants={fadeUp}
                  className="card-premium overflow-hidden group"
                >
                  {/* Image top */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-forest/10 to-saffron/10 flex items-center justify-center relative">
                     <span className="text-4xl opacity-30" aria-hidden="true">🐾</span>
                  </div>

                  {/* Body with left border accent */}
                  <div className="p-5">
                    <div className="border-l-4 border-forest pl-4">
                      <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center mb-3">
                        <Icon size={20} strokeWidth={1.5} className="text-forest" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-xl text-forest mb-2">
                        {t(fac.titleKey)}
                      </h3>
                      <p className="text-sm text-charcoal/80 leading-relaxed font-body">
                        {t(fac.descKey)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Equipment Gallery */}
      <section className="py-16 md:py-24 bg-forest-subtle/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <SectionHeading
            eyebrow={t('infrastructure.equipment.eyebrow')}
            heading={t('infrastructure.equipment.heading')}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="aspect-square card-premium flex items-center justify-center group hover:scale-[1.02] cursor-pointer"
              >
                <span className="text-3xl opacity-20 group-hover:opacity-40 transition-opacity" aria-hidden="true">🔬</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
