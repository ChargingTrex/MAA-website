// src/components/home/MissionVision.jsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'
import { fadeUp, staggerContainer } from '@/utils/motionVariants'

/**
 * Mission & Vision per 04_UI_PROMPTS.md §5A:
 * - Two cards, rounded-2xl, shadow card, p-8
 * - Icon in rounded-xl saffron/10 bg, 40px
 * - Top accent border-t-4 border-saffron
 */
export default function MissionVision() {
  const { t } = useTranslation()

  const cards = [
    {
      icon: Target,
      titleKey: 'home.mission.missionTitle',
      textKey: 'home.mission.missionText',
    },
    {
      icon: Eye,
      titleKey: 'home.mission.visionTitle',
      textKey: 'home.mission.visionText',
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <SectionHeading
          eyebrow={t('home.mission.eyebrow')}
          heading={t('home.mission.heading')}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.titleKey}
                variants={fadeUp}
                className="card-premium p-10 md:p-12 border-t-4 border-saffron flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center mb-6 shrink-0">
                  <Icon size={24} strokeWidth={1.5} className="text-saffron" aria-hidden="true" />
                </div>
                <h3 className="font-display text-3xl text-forest">
                  {t(card.titleKey)}
                </h3>
                <p className="text-base text-charcoal/80 leading-relaxed mt-4 font-body" style={{ textWrap: 'pretty' }}>
                  {t(card.textKey)}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
