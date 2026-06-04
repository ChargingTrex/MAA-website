'use client'
// src/app/infrastructure/page.js
import { motion } from 'framer-motion'
import { Building2, Microscope, Truck, BedDouble, Activity, Zap } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import PawDivider from '@/components/shared/PawDivider'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'


const FACILITIES = [
  {
    icon: Microscope,
    iconBg: 'bg-saffron/10',
    iconColor: 'text-saffron',
    title: 'Diagnostic Laboratory',
    description:
      'Fully equipped in-house laboratory for blood work, cultures, biopsies, urinalysis, and rapid diagnostic panels — delivering results in hours, not days.',
  },
  {
    icon: Zap,
    iconBg: 'bg-forest/10',
    iconColor: 'text-forest',
    title: 'Operation Theatre',
    description:
      'Modern, sterile operation theatre with advanced anaesthesia monitoring equipment, surgical lighting, and a complete suite of surgical instruments for all procedures.',
  },
  {
    icon: BedDouble,
    iconBg: 'bg-saffron/10',
    iconColor: 'text-saffron',
    title: 'Recovery Wards',
    description:
      'Separate wards for large animals (cattle, livestock) and small animals (dogs, cats) — with 24-hour monitoring, proper bedding, and post-operative care protocols.',
  },
  {
    icon: Truck,
    iconBg: 'bg-forest/10',
    iconColor: 'text-forest',
    title: 'Ambulance Fleet',
    description:
      'Our ambulance is fully equipped with emergency medications, IV fluids, restraint equipment, and a first aid kit — ready to respond anywhere within 100 km of Hyderabad.',
  },
  {
    icon: Activity,
    iconBg: 'bg-saffron/10',
    iconColor: 'text-saffron',
    title: 'ICU & Observation Unit',
    description:
      'Dedicated intensive care unit for critically ill animals requiring continuous monitoring, oxygen support, fluid therapy, and round-the-clock veterinary supervision.',
  },
  {
    icon: Building2,
    iconBg: 'bg-forest/10',
    iconColor: 'text-forest',
    title: 'Consultation Rooms',
    description:
      'Bright, clean consultation rooms designed for comfortable examinations — with proper restraint tables, good lighting, and a calm environment for animals and owners.',
  },
]

export default function InfrastructurePage() {
  return (
    <div className="bg-cream">
      <PageHero
        title="State-of-the-Art Infrastructure"
        subtitle="Modern facilities that enable our doctors to deliver world-class care — completely free of charge."
        variant="forest"
      />

      {/* Facilities Grid */}
      <section className="py-16 md:py-24">
        <div className="section-wrapper">
          <SectionHeading
            eyebrow="Our Facilities"
            heading="Built for Excellence in Animal Care"
            subtext="Every facility and piece of equipment at MAA is chosen to maximise quality of care and clinical outcomes."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FACILITIES.map((facility) => (
              <motion.div
                key={facility.title}
                variants={fadeUp}
                className="bg-white rounded-2xl p-7 border border-border hover:-translate-y-1 hover:border-saffron/40 transition-all duration-300"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
              >
                <div className={`w-12 h-12 rounded-xl ${facility.iconBg} flex items-center justify-center mb-5`}>
                  <facility.icon size={24} strokeWidth={1.5} className={facility.iconColor} aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl text-forest mb-3">{facility.title}</h3>
                <p className="text-sm text-charcoal/80 leading-relaxed font-body">{facility.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <PawDivider />

      {/* Gallery Placeholder */}
      <section className="py-16 md:py-24 bg-bg-subtle">
        <div className="section-wrapper">
          <SectionHeading
            eyebrow="Photo Gallery"
            heading="See Our Facilities"
            subtext="Real photos from our wards, operation theatre, laboratory, and ambulance."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden border border-border"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
              >
                <div
                  className={`w-full bg-forest-subtle flex items-center justify-center ${
                    i % 3 === 0 ? 'aspect-video' : i % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]'
                  }`}
                >
                  <span className="text-5xl opacity-30" aria-hidden="true">🏥</span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-charcoal font-body">
                    {['Laboratory', 'Operation Theatre', 'Recovery Ward', 'Ambulance', 'ICU Unit', 'Consultation Room'][i]}
                  </p>
                  <p className="text-xs text-muted mt-1 font-body">MAA Saraswati Veterinary Hospital</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
