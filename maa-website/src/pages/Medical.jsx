// src/pages/Medical.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Beef, Dog, Stethoscope, Egg, Bird, Rat,
  Scissors, FlaskConical, Thermometer, Droplets,
  Bone, Baby, Skull, Pill, AlertTriangle,
} from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import PawDivider from '@/components/shared/PawDivider'
import { fadeUp, staggerContainer, fadeIn } from '@/utils/motionVariants'

const ANIMALS = [
  { icon: Beef,        titleKey: 'medical.animals.cattle',  descKey: 'medical.animals.cattleDesc' },
  { icon: Dog,         titleKey: 'medical.animals.dogs',    descKey: 'medical.animals.dogsDesc' },
  { icon: Stethoscope, titleKey: 'medical.animals.sheep',   descKey: 'medical.animals.sheepDesc' },
  { icon: Egg,         titleKey: 'medical.animals.poultry', descKey: 'medical.animals.poultryDesc' },
  { icon: Bird,        titleKey: 'medical.animals.birds',   descKey: 'medical.animals.birdsDesc' },
  { icon: Rat,         titleKey: 'medical.animals.pigs',    descKey: 'medical.animals.pigsDesc' },
]

const TREATMENTS = [
  { id: 'all', category: 'All' },
  { id: 'general', category: 'General Care' },
  { id: 'emergency', category: 'Emergency' }
]

const TREATMENT_TAGS = {
  general: ['medical.treatments.digestive', 'medical.treatments.respiratory', 'medical.treatments.skin', 'medical.treatments.fever'],
  emergency: ['medical.treatments.poisoning', 'medical.treatments.ortho', 'medical.treatments.mineral', 'medical.treatments.urinary', 'medical.treatments.reproductive']
}

export default function Medical() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('all')

  const visibleTags = activeTab === 'all' 
    ? [...TREATMENT_TAGS.general, ...TREATMENT_TAGS.emergency]
    : TREATMENT_TAGS[activeTab]

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <PageHero
        heading={t('medical.hero.heading')}
        subheading={t('medical.hero.subheading')}
        variant="forest"
      />

      {/* Animal Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <SectionHeading
            eyebrow={t('medical.animals.eyebrow')}
            heading={t('medical.animals.heading')}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {ANIMALS.map((animal) => {
              const Icon = animal.icon
              return (
                <motion.div
                  key={animal.titleKey}
                  className="card-premium p-8 flex flex-col items-center text-center group cursor-default"
                >
                  <div className="w-14 h-14 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-5 group-hover:bg-forest group-hover:text-white transition-colors duration-200 shrink-0">
                    <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-2xl text-charcoal mb-3">{t(animal.titleKey)}</h3>
                  <p className="text-sm text-charcoal/80 leading-relaxed font-body" style={{ textWrap: 'pretty' }}>{t(animal.descKey)}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <PawDivider />

      {/* Treatment Categories with Tabs */}
      <section className="py-16 md:py-24 bg-forest-subtle/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <SectionHeading
            eyebrow={t('medical.treatments.eyebrow')}
            heading={t('medical.treatments.heading')}
          />

          {/* Filter Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide gap-2 py-4 mb-8 justify-start sm:justify-center">
            {TREATMENTS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-forest text-white shadow-md'
                    : 'bg-white border border-border text-charcoal hover:border-forest hover:text-forest'
                }`}
              >
                {tab.category}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[150px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
              >
                {visibleTags.map((tagKey) => (
                  <span
                    key={tagKey}
                    className="bg-forest/10 text-forest text-sm font-semibold rounded-full px-4 py-2 hover:bg-forest hover:text-white transition-all duration-200 shadow-sm cursor-default"
                  >
                    {t(tagKey)}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Surgery & Lab */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Surgery */}
            <motion.div variants={fadeUp} className="card-premium overflow-hidden group">
              <div className="aspect-[16/9] bg-gradient-to-br from-forest/10 to-saffron/10 flex items-center justify-center">
                <Scissors size={48} strokeWidth={1.5} className="text-forest/40" aria-hidden="true" />
              </div>
              <div className="p-10 flex flex-col items-center text-center">
                <h3 className="font-display text-3xl text-forest mb-4">
                  {t('medical.surgery.heading')}
                </h3>
                <p className="text-base text-charcoal/80 leading-relaxed font-body" style={{ textWrap: 'pretty' }}>
                  {t('medical.surgery.text')}
                </p>
              </div>
            </motion.div>

            {/* Lab */}
            <motion.div variants={fadeUp} className="card-premium overflow-hidden group">
              <div className="aspect-[16/9] bg-gradient-to-br from-saffron/10 to-forest/10 flex items-center justify-center">
                <FlaskConical size={48} strokeWidth={1.5} className="text-saffron/40" aria-hidden="true" />
              </div>
              <div className="p-10 flex flex-col items-center text-center">
                <h3 className="font-display text-3xl text-forest mb-4">
                  {t('medical.lab.heading')}
                </h3>
                <p className="text-base text-charcoal/80 leading-relaxed font-body" style={{ textWrap: 'pretty' }}>
                  {t('medical.lab.text')}
             </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
