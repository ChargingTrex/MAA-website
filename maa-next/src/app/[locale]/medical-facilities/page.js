'use client'
// src/app/medical-facilities/page.js
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FlaskConical, Scissors } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import PawDivider from '@/components/shared/PawDivider'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'
const ANIMAL_CATEGORIES = [
  {
    id: 'cattle',
    label: 'Cattle & Livestock',
    emoji: '🐄',
    treatments: [
      'Foot-and-Mouth Disease', 'Bovine Respiratory Syndrome', 'Mastitis Treatment',
      'Reproductive Health & AI', 'Nutritional Deficiency Therapy', 'Emergency Calving Assistance',
    ],
  },
  {
    id: 'dogs',
    label: 'Dogs & Canines',
    emoji: '🐕',
    treatments: [
      'Vaccination & Deworming', 'Orthopaedic Surgery', 'Skin & Dermatology',
      'Parvovirus Treatment', 'Post-operative Recovery', 'Dental & Oral Health',
    ],
  },
  {
    id: 'sheep',
    label: 'Sheep & Goats',
    emoji: '🐑',
    treatments: [
      'PPR (Pest des Petits Ruminants)', 'Foot Rot Treatment', 'Internal Parasites',
      'Reproductive Management', 'Respiratory Infections', 'Vitamin Supplementation',
    ],
  },
  {
    id: 'poultry',
    label: 'Poultry & Birds',
    emoji: '🐔',
    treatments: [
      'Newcastle Disease', 'Ranikhet Disease Vaccination', 'Fowl Pox Treatment',
      'Nutritional Disorders', 'Respiratory Infections', 'Egg Production Management',
    ],
  },
  {
    id: 'pigs',
    label: 'Pigs',
    emoji: '🐷',
    treatments: [
      'Swine Fever Prevention', 'Reproductive Health', 'Growth Disorders',
      'Skin Conditions', 'Nutritional Support', 'Wound Care',
    ],
  },
]

const TREATMENT_CATEGORIES = [
  { icon: '🫁', name: 'Digestive Disorders' },
  { icon: '🫀', name: 'Respiratory Conditions' },
  { icon: '🩹', name: 'Skin & Coat Health' },
  { icon: '💧', name: 'Urinary Tract' },
  { icon: '🔬', name: 'Reproductive Health' },
  { icon: '☠️', name: 'Poisoning & Toxicology' },
  { icon: '🌡️', name: 'Fever & Infections' },
  { icon: '💊', name: 'Mineral Deficiency' },
  { icon: '🦴', name: 'Orthopaedic Surgery' },
]

function AnimalTab({ category, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold font-body transition-all duration-200 whitespace-nowrap ${
        isActive
          ? 'bg-forest text-white shadow-md'
          : 'bg-white text-charcoal/70 hover:bg-forest-subtle hover:text-forest border border-border'
      }`}
      aria-selected={isActive}
      role="tab"
    >
      <span>{category.emoji}</span>
      {category.label}
    </button>
  )
}

export default function MedicalFacilitiesPage() {
  const [activeTab, setActiveTab] = useState('cattle')
  const active = ANIMAL_CATEGORIES.find((c) => c.id === activeTab)

  return (
    <div className="bg-cream">
      <PageHero
        title="Medical Facilities"
        subtitle="Comprehensive, modern veterinary care for every animal species — all completely free."
        variant="forest"
      />

      {/* Animal Categories Tabs */}
      <section className="py-16 md:py-24">
        <div className="section-wrapper">
          <SectionHeading
            eyebrow="Species We Treat"
            heading="Animal Categories"
            subtext="Select a species to explore the treatments and conditions we specialise in."
          />

          {/* Tab Row */}
          <div className="flex flex-wrap gap-3 justify-center mb-10" role="tablist" aria-label="Animal categories">
            {ANIMAL_CATEGORIES.map((cat) => (
              <AnimalTab
                key={cat.id}
                category={cat}
                isActive={activeTab === cat.id}
                onClick={() => setActiveTab(cat.id)}
              />
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 md:p-10 border border-border"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
              role="tabpanel"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">{active.emoji}</span>
                <h3 className="font-display text-2xl md:text-3xl text-forest">{active.label}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {active.treatments.map((treatment) => (
                  <div key={treatment} className="flex items-center gap-3 p-3 rounded-xl bg-forest-subtle">
                    <div className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium text-forest font-body">{treatment}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <PawDivider />

      {/* Treatment Categories Grid */}
      <section className="py-16 md:py-24 bg-bg-subtle">
        <div className="section-wrapper">
          <SectionHeading
            eyebrow="What We Treat"
            heading="Treatment Categories"
            subtext="Our doctors are trained to handle a wide range of conditions across all species."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {TREATMENT_CATEGORIES.map((cat) => (
              <motion.div
                key={cat.name}
                variants={fadeUp}
                className="bg-white rounded-2xl p-5 text-center border border-border hover:border-saffron hover:-translate-y-1 transition-all duration-200"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
              >
                <span className="text-3xl block mb-3" aria-hidden="true">{cat.icon}</span>
                <p className="text-xs font-semibold text-charcoal font-body leading-snug">{cat.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <PawDivider />

      {/* Surgery + Lab */}
      <section className="py-16 md:py-24">
        <div className="section-wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Scissors,
                iconBg: 'bg-saffron/10', iconColor: 'text-saffron',
                title: 'Surgical Capabilities',
                body: 'Our modern operation theatre is equipped for a wide range of surgical procedures — from routine spaying and neutering to complex orthopaedic and abdominal surgeries. All procedures are performed under safe, monitored anaesthesia by our qualified surgeons.',
                badge: 'Full Anaesthesia Support',
              },
              {
                icon: FlaskConical,
                iconBg: 'bg-forest/10', iconColor: 'text-forest',
                title: 'Laboratory Services',
                body: 'Our on-site laboratory delivers fast diagnostic results — blood tests, cultures, biopsies, urinalysis, and more. Rapid diagnosis means faster treatment decisions and better outcomes for every patient.',
                badge: 'On-Site Diagnostics',
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="bg-white rounded-2xl p-8 border border-border hover:-translate-y-1 transition-all duration-300"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
              >
                <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-5`}>
                  <card.icon size={24} strokeWidth={1.5} className={card.iconColor} aria-hidden="true" />
                </div>
                <span className="inline-block bg-forest-subtle text-forest text-xs font-semibold rounded-full px-3 py-1 font-body mb-4">
                  {card.badge}
                </span>
                <h3 className="font-display text-2xl text-forest mb-4">{card.title}</h3>
                <p className="text-base text-charcoal leading-relaxed font-body">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
