'use client'
import { motion } from 'framer-motion'
import { Heart, Copy, Smartphone, Building2, CheckCircle } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import PawDivider from '@/components/shared/PawDivider'
import { SITE_CONFIG, BANK_DETAILS } from '@/lib/data'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'


const WHY_DONATE = [
  { emoji: '💊', amount: '₹500', impact: 'covers one full surgical procedure' },
  { emoji: '🩹', amount: '₹1,000', impact: 'stocks medicines for a week' },
  { emoji: '🚑', amount: '₹5,000', impact: 'runs our ambulance for a month' },
  { emoji: '❤️', amount: '₹10,000', impact: 'funds a month of free care for 50+ animals' },
]

const UPI_APPS = ['GPay', 'PhonePe', 'Paytm', 'BHIM']

export default function DonatePage() {
  return (
    <div className="bg-cream">
      <PageHero
        title="Support Free Veterinary Care"
        subtitle="Your donation, big or small, helps us heal animals who have no one else to turn to."
        variant="saffron"
      />

      {/* Why Donate */}
      <section className="py-16 md:py-24">
        <div className="section-wrapper">
          <SectionHeading
            eyebrow="Make an Impact"
            heading="Your Donation Goes a Long Way"
            subtext="100% of donations go directly toward animal care — medicines, surgery, and our ambulance service."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {WHY_DONATE.map((item) => (
              <motion.div
                key={item.amount}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 text-center border border-border hover:-translate-y-1 hover:border-saffron/40 transition-all duration-300"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
              >
                <span className="text-4xl block mb-4" aria-hidden="true">{item.emoji}</span>
                <p className="font-display text-2xl text-saffron mb-2">{item.amount}</p>
                <p className="text-sm text-charcoal/70 font-body leading-relaxed">{item.impact}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <PawDivider />

      {/* UPI Donation */}
      <section className="py-16 md:py-24 bg-bg-subtle">
        <div className="section-wrapper">
          <SectionHeading
            eyebrow="Easiest Way to Give"
            heading="Donate via UPI"
            subtext="Scan the QR code with any UPI app — it takes less than 30 seconds."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-4">
            {/* QR Code Placeholder */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div
                className="w-56 h-56 md:w-72 md:h-72 bg-white rounded-3xl flex items-center justify-center border-4 border-saffron/20 shadow-xl"
              >
                <div className="text-center">
                  <p className="text-5xl mb-2" aria-hidden="true">📱</p>
                  <p className="text-xs text-muted font-body">UPI QR Code</p>
                  <p className="text-xs text-muted font-body">(Update from Admin)</p>
                </div>
              </div>
              <div className="mt-5 text-center">
                <p className="text-sm font-semibold text-charcoal font-body">UPI ID:</p>
                <p className="text-base text-saffron font-bold font-body mt-1">{SITE_CONFIG.upiId}</p>
              </div>
              {/* Supported Apps */}
              <div className="flex items-center gap-3 mt-4 flex-wrap justify-center">
                {UPI_APPS.map((app) => (
                  <span key={app} className="px-3 py-1.5 bg-white border border-border rounded-full text-xs font-semibold text-charcoal font-body shadow-sm">
                    {app}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-5"
            >
              <h3 className="font-display text-2xl text-forest">How to Pay via UPI</h3>
              {[
                { step: 1, text: 'Open any UPI app (GPay, PhonePe, Paytm, or BHIM)' },
                { step: 2, text: 'Tap "Scan QR Code" or search UPI ID' },
                { step: 3, text: 'Enter any amount — even ₹100 makes a difference' },
                { step: 4, text: 'Screenshot your payment confirmation' },
                { step: 5, text: `WhatsApp the screenshot to ${SITE_CONFIG.phone} for acknowledgement` },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-saffron text-white text-sm font-bold font-body flex items-center justify-center shrink-0">
                    {item.step}
                  </div>
                  <p className="text-base text-charcoal font-body pt-1">{item.text}</p>
                </div>
              ))}

              <div className="bg-saffron-subtle border border-saffron/20 rounded-2xl p-5 flex items-start gap-3 mt-2">
                <CheckCircle size={20} strokeWidth={1.5} className="text-saffron shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-charcoal/80 font-body leading-relaxed">
                  All donations are voluntary. There are no mandatory amounts — every rupee helps us provide free care to animals in need.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PawDivider />

      {/* Bank Transfer */}
      <section className="py-16 md:py-24">
        <div className="section-wrapper">
          <SectionHeading
            eyebrow="Bank Transfer"
            heading="Direct Bank Donation"
            subtext="Prefer NEFT / RTGS / IMPS? Transfer directly to our bank account."
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-lg mx-auto bg-white rounded-2xl overflow-hidden border border-border"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
          >
            <div className="p-6 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
                <Building2 size={20} strokeWidth={1.5} className="text-forest" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl text-forest">Bank Account Details</h3>
            </div>
            <div className="divide-y divide-border">
              {Object.entries({
                'Account Name': BANK_DETAILS.accountName,
                'Bank Name': BANK_DETAILS.bankName,
                'Branch': BANK_DETAILS.branch,
                'Account Number': BANK_DETAILS.accountNo,
                'IFSC Code': BANK_DETAILS.ifsc,
              }).map(([label, value]) => (
                <div key={label} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wide font-semibold font-body">{label}</p>
                    <p className="text-sm text-charcoal font-medium mt-0.5 font-body">{value}</p>
                  </div>
                  <button
                    className="p-2 rounded-xl hover:bg-saffron-subtle text-muted hover:text-saffron transition-colors"
                    aria-label={`Copy ${label}`}
                    onClick={() => navigator?.clipboard?.writeText(value)}
                  >
                    <Copy size={16} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
