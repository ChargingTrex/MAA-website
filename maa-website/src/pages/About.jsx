// src/pages/About.jsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Ambulance, Clock, MapPin } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import PawDivider from '@/components/shared/PawDivider'
import { fadeUp, staggerContainer } from '@/utils/motionVariants'

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <PageHero
        heading={t('about.hero.heading')}
        subheading={t('about.hero.subheading')}
        variant="forest"
      />

      {/* Our Story Block per UI Prompt 11 */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <SectionHeading
            eyebrow={t('about.story.eyebrow')}
            heading={t('about.story.heading')}
            center={true}
          />

          <div className="flex flex-col lg:flex-row gap-12 mt-12">
            {/* Left: Prose (Refined Editorial Layout) */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="flex-1"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <motion.div variants={fadeUp} className="md:col-span-2">
                  <h3 className="font-display text-2xl text-forest mb-4 pb-2 border-b border-gray-100">Our Beginning</h3>
                  <p className="text-charcoal leading-relaxed font-body text-lg first-letter:text-5xl first-letter:font-display first-letter:text-saffron first-letter:mr-1 first-letter:float-left first-line:uppercase first-line:tracking-widest" style={{ textWrap: 'pretty' }}>
                    {t('about.story.p1')}
                  </p>
                </motion.div>
                
                <motion.div variants={fadeUp} className="bg-white/50 p-6 rounded-2xl border border-white">
                  <h3 className="font-display text-xl text-forest mb-3">Our Mission in Action</h3>
                  <p className="text-charcoal/80 leading-relaxed font-body" style={{ textWrap: 'pretty' }}>
                    {t('about.story.p2')}
                  </p>
                </motion.div>
                
                <motion.div variants={fadeUp} className="bg-white/50 p-6 rounded-2xl border border-white">
                  <h3 className="font-display text-xl text-forest mb-3">Community First</h3>
                  <p className="text-charcoal/80 leading-relaxed font-body" style={{ textWrap: 'pretty' }}>
                    {t('about.story.p3')}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Vertical timeline-style info card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="w-full lg:w-80 shrink-0"
            >
              <div className="card-premium p-8 relative">
                <h3 className="font-display text-2xl text-forest mb-6">Milestones</h3>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="w-0.5 bg-saffron/30 absolute left-4 top-2 bottom-2" aria-hidden="true" />
                  
                  <ul className="space-y-8">
                    <li className="relative pl-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-saffron border-2 border-white absolute left-[11px] top-1.5 shadow-sm" aria-hidden="true" />
                      <p className="text-xs font-semibold text-saffron uppercase tracking-widest font-body">July 2024</p>
                      <p className="text-sm text-charcoal font-semibold mt-0.5 font-body">Hospital Founded</p>
                    </li>
                    <li className="relative pl-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-saffron border-2 border-white absolute left-[11px] top-1.5 shadow-sm" aria-hidden="true" />
                      <p className="text-xs font-semibold text-saffron uppercase tracking-widest font-body">August 2024</p>
                      <p className="text-sm text-charcoal font-semibold mt-0.5 font-body">First 1,000 Animals Treated</p>
                    </li>
                    <li className="relative pl-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-saffron border-2 border-white absolute left-[11px] top-1.5 shadow-sm" aria-hidden="true" />
                      <p className="text-xs font-semibold text-saffron uppercase tracking-widest font-body">November 2024</p>
                      <p className="text-sm text-charcoal font-semibold mt-0.5 font-body">Ambulance Fleet Launched</p>
                    </li>
                    <li className="relative pl-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-saffron border-2 border-white absolute left-[11px] top-1.5 shadow-sm" aria-hidden="true" />
                      <p className="text-xs font-semibold text-saffron uppercase tracking-widest font-body">Present</p>
                      <p className="text-sm text-charcoal font-semibold mt-0.5 font-body">5,000+ Animals Treated</p>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PawDivider />

      {/* Ambulance Service CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="bg-red-50/80 backdrop-blur-md border border-red-100 rounded-[2rem] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-red-900 shadow-card"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="shrink-0 w-20 h-20 rounded-full bg-red-100 flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-red-200 animate-ping opacity-20"></div>
                <Ambulance size={40} strokeWidth={1.5} className="text-red-600 relative z-10" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-3xl font-normal text-red-950 mb-1">
                  {t('about.ambulance.heading')}
                </h3>
                <p className="text-red-800/80 font-body text-lg">
                  {t('about.ambulance.text')}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-sm text-red-700 font-body font-semibold">
                  <span className="flex items-center gap-1.5 bg-red-100/50 px-3 py-1 rounded-full">
                    <Clock size={16} aria-hidden="true" className="text-red-600" /> 24/7 Service
                  </span>
                  <span className="flex items-center gap-1.5 bg-red-100/50 px-3 py-1 rounded-full">
                    <MapPin size={16} aria-hidden="true" className="text-red-600" /> 100km radius
                  </span>
                </div>
              </div>
            </div>
            
            <a 
              href="tel:+919876543210"
              className="inline-flex flex-col items-center justify-center bg-red-600 text-white rounded-[10px] px-10 py-3.5 hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md shrink-0 text-center w-full sm:w-auto mt-4 md:mt-0"
            >
              <span className="font-bold text-2xl tracking-wide">+91 98765 43210</span>
              <span className="text-xs uppercase tracking-widest font-semibold text-white/80 mt-1">Tap to Call</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
