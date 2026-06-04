'use client'
// src/components/home/ServicesGrid.jsx
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { SERVICES } from '@/lib/data'
import SectionHeading from '@/components/shared/SectionHeading'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'

/**
 * Services overview grid
 * Impeccable Refinement: Bento Grid layout to prevent "AI Slop" monotony.
 * Localized via next-intl.
 */
export default function ServicesGrid() {
  const t = useTranslations('home.services')

  // Helper to assign bento sizing based on service ID
  const getBentoClasses = (id) => {
    switch (id) {
      case 'surgery':
        return 'md:col-span-2 md:row-span-2 bg-forest text-white'
      case 'ambulance':
        return 'md:col-span-2 bg-saffron text-white'
      default:
        return 'bg-white text-charcoal border border-border'
    }
  }

  return (
    <section className="py-16 md:py-24 bg-bg-subtle" aria-labelledby="services-heading">
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
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 auto-rows-[minmax(200px,_auto)]"
        >
          {SERVICES.map((service) => {
            const bentoClasses = getBentoClasses(service.id)
            const isFeatured = service.id === 'surgery' || service.id === 'ambulance'
            
            return (
              <motion.div
                key={service.id}
                variants={fadeUp}
                className={`rounded-3xl p-8 group cursor-default transition-all duration-300 hover:-translate-y-1 ${bentoClasses}`}
                style={{ boxShadow: isFeatured ? '0 12px 32px rgba(0,0,0,0.1)' : '0 4px 24px rgba(0,0,0,0.04)' }}
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div 
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-3xl transition-transform duration-300 group-hover:scale-110 ${
                      isFeatured ? 'bg-white/20 backdrop-blur-sm' : 'bg-saffron/10'
                    }`}
                  >
                    {service.icon}
                  </div>

                  {/* Content */}
                  <div className="mt-auto">
                    <h3 className={`font-display text-2xl mb-3 ${isFeatured ? 'text-white' : 'text-forest'}`}>
                      {t(`items.${service.id}.title`)}
                    </h3>
                    <p className={`text-sm font-body leading-relaxed ${isFeatured ? 'text-white/90' : 'text-muted'}`}>
                      {t(`items.${service.id}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
