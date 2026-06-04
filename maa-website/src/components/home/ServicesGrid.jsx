// src/components/home/ServicesGrid.jsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Stethoscope, Dog, Scissors, FlaskConical, Egg, Beef } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'
import { fadeUp, staggerContainer } from '@/utils/motionVariants'

/**
 * Services grid per 04_UI_PROMPTS.md §5B:
 * - 6 cards, grid-cols-2 md:grid-cols-3 lg:grid-cols-6
 * - Each: bg-white rounded-2xl p-5 text-center, card shadow
 * - Circle icon bg-saffron/10 56px
 * - Hover: -translate-y-1 shadow-lg border-t-2 border-saffron
 */
const SERVICES = [
  { icon: Beef,        titleKey: 'home.services.cattle' },
  { icon: Dog,         titleKey: 'home.services.dogs' },
  { icon: Stethoscope, titleKey: 'home.services.sheep' },
  { icon: Egg,         titleKey: 'home.services.poultry' },
  { icon: Scissors,    titleKey: 'home.services.surgery' },
  { icon: FlaskConical,titleKey: 'home.services.lab' },
]

export default function ServicesGrid() {
  const { t } = useTranslation()

  return (
    <section className="py-16 md:py-24 bg-forest-subtle/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <SectionHeading
          eyebrow={t('home.services.eyebrow')}
          heading={t('home.services.heading')}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {SERVICES.map((svc) => {
            const Icon = svc.icon
            return (
              <motion.div
                key={svc.titleKey}
                variants={fadeUp}
                className="card-premium p-6 flex flex-col items-center justify-center text-center gap-3 hover:border-t-2 hover:border-saffron transition-all duration-200 group cursor-default"
              >
                <div className="w-14 h-14 rounded-full bg-saffron/10 flex items-center justify-center mx-auto shrink-0">
                  <Icon size={24} strokeWidth={1.5} className="text-saffron" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold text-forest font-body leading-tight">{t(svc.titleKey)}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
