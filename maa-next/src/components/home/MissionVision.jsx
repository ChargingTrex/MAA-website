'use client'
// src/components/home/MissionVision.jsx
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'

/**
 * Mission & Vision section
 * Impeccable Refinement: Editorial asymmetric layout instead of twin symmetrical cards.
 * Localized via next-intl.
 */
export default function MissionVision() {
  const t = useTranslations('home.mission_vision')

  return (
    <section className="py-20 md:py-32 bg-cream relative overflow-hidden" aria-labelledby="mission-vision-heading">
      {/* Background aesthetic texture */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-saffron/5 blur-3xl rounded-full translate-x-1/3" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-forest/5 blur-3xl rounded-full -translate-x-1/4" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
        >
          {/* Left Side: Mission (Large Editorial Text) */}
          <motion.div variants={fadeUp} className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-saffron" aria-hidden="true"></span>
              <span className="text-sm font-semibold uppercase tracking-widest text-saffron font-body">
                {t('eyebrow')}
              </span>
            </div>
            
            <h2 id="mission-vision-heading" className="font-display text-4xl md:text-5xl text-forest mb-8 leading-tight">
              {t('mission.title')}
            </h2>
            
            <p className="text-xl md:text-2xl text-charcoal/90 font-display leading-relaxed" style={{ textWrap: 'pretty' }}>
              <Target size={28} className="inline-block mr-3 text-saffron -translate-y-1" aria-hidden="true" />
              &quot;{t('mission.description')}&quot;
            </p>
          </motion.div>

          {/* Right Side: Vision (Glassmorphic Accent Card) */}
          <motion.div variants={fadeUp} className="flex-1 w-full">
            <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] p-10 md:p-14 shadow-glass relative">
              {/* Decorative accent */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-forest rounded-full opacity-10 blur-xl" aria-hidden="true" />
              
              <div className="w-14 h-14 rounded-2xl bg-forest/10 flex items-center justify-center mb-8">
                <Eye size={28} strokeWidth={1.5} className="text-forest" aria-hidden="true" />
              </div>
              
              <h3 className="font-display text-3xl text-forest mb-6">
                {t('vision.title')}
              </h3>
              
              <p className="text-lg text-charcoal/80 font-body leading-relaxed">
                {t('vision.description')}
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
