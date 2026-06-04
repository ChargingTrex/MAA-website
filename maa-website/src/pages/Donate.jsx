// src/pages/Donate.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Copy, Check, Heart, ArrowRight } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import PawDivider from '@/components/shared/PawDivider'
import { fadeUp, staggerContainer } from '@/utils/motionVariants'
import { BANK_DETAILS } from '@/data/mockData'
import { copyToClipboard } from '@/utils/helpers'

const IMPACT_ITEMS = ['item1', 'item2', 'item3', 'item4']

export default function Donate() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  async function handleCopyUPI() {
    const success = await copyToClipboard(t('donate.upi.upiId'))
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <PageHero
        heading={t('donate.hero.heading')}
        subheading={t('donate.hero.subheading')}
        variant="saffron"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Left: Impact Section per UI Prompt 11 */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="flex-1"
            >
              <h2 className="font-display text-3xl md:text-4xl text-forest mb-8 leading-snug">
                {t('donate.impact.heading')}
              </h2>
              <div className="space-y-4">
                {IMPACT_ITEMS.map((key) => (
                  <motion.div
                    key={key}
                    variants={fadeUp}
                    className="flex items-start gap-4 bg-saffron/10 border-l-4 border-saffron rounded-r-2xl p-5 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center shrink-0">
                      <Heart size={20} strokeWidth={1.5} className="text-saffron" aria-hidden="true" />
                    </div>
                    <p className="text-base text-charcoal font-medium font-body leading-relaxed mt-2" style={{ textWrap: 'pretty' }}>
                      {t(`donate.impact.${key}`)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Payment Options */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="flex-1 max-w-xl w-full lg:mx-0 mx-auto"
            >
              {/* UPI Section */}
              <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-8 mb-8">
                <h3 className="font-display text-2xl text-forest mb-6 text-center">
                  {t('donate.upi.heading')}
                </h3>

                {/* QR placeholder */}
                <div className="mx-auto w-[200px] h-[200px] rounded-2xl bg-white border-2 border-dashed border-gray-200 flex items-center justify-center mb-8 shadow-inner">
                  <span className="text-5xl opacity-30" aria-hidden="true">📱</span>
                </div>

                {/* UPI ID with copy */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <code className="text-base font-mono font-semibold text-forest bg-forest/5 px-4 py-2.5 rounded-xl border border-forest/10">
                    {t('donate.upi.upiId')}
                  </code>
                  <button
                    onClick={handleCopyUPI}
                    className="p-3 rounded-xl bg-saffron/10 text-saffron hover:bg-saffron hover:text-white transition-colors cursor-pointer"
                    aria-label={copied ? t('donate.upi.copied') : t('donate.upi.copyBtn')}
                  >
                    {copied ? <Check size={20} strokeWidth={1.5} /> : <Copy size={20} strokeWidth={1.5} />}
                  </button>
                </div>

                {/* Steps */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-charcoal/80 font-body">
                  {['step1', 'step2', 'step3', 'step4'].map((step, i) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-saffron/10 text-saffron text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      {t(`donate.upi.${step}`)}
                      {i < 3 && <ArrowRight size={14} strokeWidth={1.5} className="text-gray-300 hidden sm:block mx-1" />}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bank Transfer */}
              <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-8">
                <h3 className="font-display text-2xl text-forest mb-6 text-center">
                  {t('donate.bank.heading')}
                </h3>

                <div className="space-y-0 divide-y divide-gray-100">
                  {[
                    { labelKey: 'donate.bank.accountName', value: BANK_DETAILS.accountName },
                    { labelKey: 'donate.bank.bankName',    value: BANK_DETAILS.bankName },
                    { labelKey: 'donate.bank.branch',      value: BANK_DETAILS.branch },
                    { labelKey: 'donate.bank.accountNo',   value: BANK_DETAILS.accountNo },
                    { labelKey: 'donate.bank.ifsc',        value: BANK_DETAILS.ifsc },
                  ].map((row) => (
                    <div key={row.labelKey} className="flex justify-between items-center py-4">
                      <span className="text-sm text-charcoal/70 font-body">{t(row.labelKey)}</span>
                      <span className="text-base font-semibold text-charcoal font-mono tracking-tight">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-charcoal/60 text-center mt-6 font-body" style={{ textWrap: 'pretty' }}>
                {t('donate.note')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
