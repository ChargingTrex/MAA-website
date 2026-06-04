'use client'
// src/components/about/AboutContent.jsx
import { motion } from 'framer-motion'
import { Ambulance, Clock, MapPin, Target, Eye } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import PawDivider from '@/components/shared/PawDivider'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'
import { SITE_CONFIG } from '@/lib/data'

const MILESTONES = [
  { date: 'July 2024',     event: 'Hospital Founded & Inaugurated' },
  { date: 'August 2024',   event: 'First 1,000 Animals Treated' },
  { date: 'November 2024', event: '24/7 Ambulance Fleet Launched' },
  { date: 'April 2025',    event: 'CSR Camps Across Rangareddy District' },
  { date: 'Present',       event: '5,000+ Animals Treated & Counting' },
]

const TREATMENTS = [
  'Digestive Disorders', 'Respiratory Conditions', 'Skin & Coat',
  'Urinary Tract', 'Reproductive Health', 'Poisoning & Toxicology',
  'Fever & Infections', 'Mineral & Vitamin Deficiency', 'Orthopaedic Surgery',
]

export default function AboutContent() {
  return (
    <div className="bg-cream">
      <PageHero
        title="About MAA Saraswati Veterinary Hospital"
        subtitle="Our story, mission, and the commitment that drives every act of care."
        variant="forest"
      />

      {/* Our Story + Milestones */}
      <section className="py-16 md:py-24">
        <div className="section-wrapper">
          <SectionHeading
            eyebrow="Our Story"
            heading="From a Dream to Hyderabad's Free Vet Hospital"
            subtext="Founded in July 2024, MAA Saraswati Veterinary Hospital was born from a simple belief: no animal should suffer because its owner cannot afford care."
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-4">
            {/* Prose */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="lg:col-span-3 space-y-8"
            >
              <motion.div variants={fadeUp}>
                <p className="text-lg text-charcoal leading-relaxed font-body first-letter:text-5xl first-letter:font-display first-letter:text-saffron first-letter:mr-2 first-letter:float-left">
                  MAA Saraswati Veterinary Hospital was established in July 2024 with a resolute mission —
                  to provide professional, compassionate, and completely free veterinary care to every animal
                  in Hyderabad and the surrounding region, regardless of its owner&apos;s financial capacity.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 border border-border">
                <h3 className="font-display text-xl text-forest mb-3">Our Mission in Action</h3>
                <p className="text-charcoal/80 leading-relaxed font-body">
                  Every day, our team of qualified veterinarians and dedicated staff treats cattle, dogs,
                  poultry, and other animals — performing surgeries, administering medicines, and running our
                  ambulance service — without charging a single rupee to owners.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 border border-border">
                <h3 className="font-display text-xl text-forest mb-3">Community First</h3>
                <p className="text-charcoal/80 leading-relaxed font-body">
                  Beyond our hospital walls, we conduct regular CSR camps — free vaccination drives, health
                  awareness sessions in villages, and emergency rescues — to ensure animal welfare reaches
                  communities that need it most.
                </p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <h3 className="font-display text-xl text-forest mb-4">Conditions We Treat</h3>
                <div className="flex flex-wrap gap-2">
                  {TREATMENTS.map((t) => (
                    <span key={t} className="bg-forest-subtle text-forest text-xs font-semibold rounded-full px-3 py-1.5 font-body">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Milestones Timeline */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl p-8 border border-border sticky top-28" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
                <h3 className="font-display text-2xl text-forest mb-6">Milestones</h3>
                <div className="relative">
                  <div className="w-0.5 bg-saffron/30 absolute left-[7px] top-2 bottom-2" aria-hidden="true" />
                  <ul className="space-y-7">
                    {MILESTONES.map((m) => (
                      <li key={m.date} className="relative pl-9">
                        <div className="w-3.5 h-3.5 rounded-full bg-saffron border-2 border-white absolute left-0 top-1 shadow-sm" aria-hidden="true" />
                        <p className="text-xs font-semibold text-saffron uppercase tracking-widest font-body">{m.date}</p>
                        <p className="text-sm text-charcoal font-semibold mt-0.5 font-body">{m.event}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PawDivider />

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-bg-subtle">
        <div className="section-wrapper">
          <SectionHeading eyebrow="Purpose" heading="Mission & Vision" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                Icon: Target, border: 'border-saffron', iconBg: 'bg-saffron/10', iconText: 'text-saffron',
                title: 'Our Mission',
                body: "To provide compassionate, professional, and absolutely free veterinary care to every animal in need — regardless of the owner's financial situation.",
              },
              {
                Icon: Eye, border: 'border-forest', iconBg: 'bg-forest/10', iconText: 'text-forest',
                title: 'Our Vision',
                body: 'A Hyderabad where every animal has access to world-class medical care, supported by modern infrastructure, skilled professionals, and a caring community.',
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className={`bg-white rounded-2xl p-8 border-t-4 ${card.border} hover:-translate-y-1 transition-all duration-300`}
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
              >
                <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-5`}>
                  <card.Icon size={24} strokeWidth={1.5} className={card.iconText} aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl text-forest mb-4">{card.title}</h3>
                <p className="text-base text-charcoal leading-relaxed font-body">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PawDivider />

      {/* Ambulance CTA */}
      <section className="py-16 md:py-24">
        <div className="section-wrapper">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="bg-red-50 border border-red-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="shrink-0 w-20 h-20 rounded-full bg-red-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-red-200 animate-ping opacity-20" />
                <Ambulance size={40} strokeWidth={1.5} className="text-red-600 relative z-10" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-red-950 mb-1">Animal Emergency? We&apos;re Here 24/7</h3>
                <p className="text-red-800/80 font-body text-base md:text-lg">
                  Our ambulance covers the twin cities and up to 100 km from Hyderabad — completely free.
                </p>
                <div className="flex items-center gap-3 mt-3 justify-center sm:justify-start">
                  <span className="flex items-center gap-1.5 bg-red-100 px-3 py-1 rounded-full text-xs font-semibold text-red-700 font-body">
                    <Clock size={14} aria-hidden="true" /> 24/7 Service
                  </span>
                  <span className="flex items-center gap-1.5 bg-red-100 px-3 py-1 rounded-full text-xs font-semibold text-red-700 font-body">
                    <MapPin size={14} aria-hidden="true" /> 100 km Radius
                  </span>
                </div>
              </div>
            </div>
            <a
              href={`tel:${SITE_CONFIG.emergencyPhone}`}
              className="inline-flex flex-col items-center bg-red-600 text-white rounded-2xl px-10 py-4 hover:bg-red-700 active:scale-[0.98] transition-all duration-200 shadow-lg shrink-0 w-full sm:w-auto text-center"
            >
              <span className="font-bold text-2xl tracking-wide">{SITE_CONFIG.emergencyPhone}</span>
              <span className="text-xs uppercase tracking-widest font-semibold text-white/80 mt-1 font-body">Tap to Call</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
