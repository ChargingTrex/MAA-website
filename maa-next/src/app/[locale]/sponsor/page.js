'use client'
// src/app/sponsor/page.js
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, PhoneCall } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import PawDivider from '@/components/shared/PawDivider'
import { SPONSOR_NEEDS } from '@/lib/data'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'
import Link from 'next/link'


function ProgressBar({ raised, target }) {
  const pct = Math.min(Math.round((raised / target) * 100), 100)
  return (
    <div className="mt-4">
      <div className="flex justify-between text-xs text-muted font-body mb-1.5">
        <span>₹{raised.toLocaleString('en-IN')} raised</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="h-full bg-saffron rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-muted mt-1 font-body">Goal: ₹{target.toLocaleString('en-IN')}</p>
    </div>
  )
}

const PRIORITY_BADGE = {
  high:   { label: '⚡ High Priority', cls: 'bg-saffron-subtle text-saffron' },
  medium: { label: '🔧 Medium Priority', cls: 'bg-forest-subtle text-forest' },
  low:    { label: '📋 Ongoing Need', cls: 'bg-gray-100 text-muted' },
}

const HOW_STEPS = [
  { step: 1, title: 'Choose a Need', body: 'Browse our current equipment and supply needs below — each with a funding goal and current status.' },
  { step: 2, title: 'Contact Us', body: 'Reach out via our Contact page or WhatsApp to express your intent. We\'ll respond within 24 hours.' },
  { step: 3, title: 'Transfer Funds or Donate In-Kind', body: 'You can donate funds via UPI/bank transfer, or arrange to donate the item directly to the hospital.' },
]

export default function SponsorPage() {
  return (
    <div className="bg-cream">
      <PageHero
        title="Sponsor a Need, Save Many Lives"
        subtitle="Choose a specific need to sponsor and see the direct impact of your contribution."
        variant="saffron"
      />

      {/* Current Needs Grid */}
      <section className="py-16 md:py-24">
        <div className="section-wrapper">
          <SectionHeading
            eyebrow="Current Needs"
            heading="Equipment & Supplies We Need"
            subtext="These are our most pressing equipment and supply needs. Your sponsorship funds a specific item — you'll see exactly where your money goes."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SPONSOR_NEEDS.map((need) => {
              const badge = PRIORITY_BADGE[need.priority]
              const isFulfilled = need.raisedAmount >= need.targetAmount

              return (
                <motion.div
                  key={need.id}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-6 border border-border hover:-translate-y-1 transition-all duration-300"
                  style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-xs font-semibold rounded-full px-3 py-1 font-body ${badge.cls}`}>
                      {badge.label}
                    </span>
                    {isFulfilled && (
                      <span className="flex items-center gap-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full px-3 py-1 font-body">
                        <CheckCircle size={12} aria-hidden="true" /> Funded
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl text-forest mt-2">{need.title}</h3>
                  <p className="text-sm text-charcoal/70 mt-2 leading-relaxed font-body">{need.description}</p>
                  <ProgressBar raised={need.raisedAmount} target={need.targetAmount} />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <PawDivider />

      {/* How to Sponsor */}
      <section className="py-16 md:py-24 bg-bg-subtle">
        <div className="section-wrapper">
          <SectionHeading
            eyebrow="Simple Process"
            heading="How to Sponsor"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {HOW_STEPS.map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-saffron text-white text-xl font-bold font-display flex items-center justify-center mx-auto mb-4 shadow-md">
                  {item.step}
                </div>
                <h3 className="font-display text-xl text-forest mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/70 font-body leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor CTA */}
      <section className="py-16 md:py-20">
        <div className="section-wrapper">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-forest rounded-3xl p-8 md:p-12 text-center"
          >
            <span className="text-xs font-semibold text-saffron-light uppercase tracking-widest font-body">Ready to Sponsor?</span>
            <h2 className="font-display text-3xl md:text-4xl text-white mt-2 mb-4">Contact Us to Sponsor a Need</h2>
            <p className="text-base text-white/70 max-w-lg mx-auto font-body leading-relaxed mb-8">
              Our team will guide you through the process and ensure your contribution directly funds the item you choose.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-saffron text-white rounded-full px-8 py-3.5 text-sm font-bold font-body hover:bg-saffron-dark active:scale-[0.98] transition-all duration-200 shadow-lg">
              <PhoneCall size={18} strokeWidth={2} aria-hidden="true" />
              Contact Us to Sponsor
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
