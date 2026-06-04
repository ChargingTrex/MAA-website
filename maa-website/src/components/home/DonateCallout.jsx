// src/components/home/DonateCallout.jsx
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp } from '@/utils/motionVariants'

/**
 * Donate CTA banner per 04_UI_PROMPTS.md §5C:
 * - bg-forest with diagonal stripe texture
 * - Flex row: heading+subtext left, saffron CTA right
 */
export default function DonateCallout() {
  const { t } = useTranslation()

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative overflow-hidden rounded-2xl bg-forest text-white p-8 sm:p-12"
        >
          {/* Diagonal stripe texture per §7.5 */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
              backgroundSize: '12px 12px',
            }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2
                className="font-display text-3xl text-white leading-snug"
                style={{ textWrap: 'balance' }}
              >
                {t('home.donateCta.heading')}
              </h2>
              <p className="text-white/75 mt-3 max-w-xl font-body" style={{ textWrap: 'pretty' }}>
                {t('home.donateCta.subtext')}
              </p>
            </div>

            <Link
              to="/donate"
              className="btn-saffron shrink-0"
            >
              {t('home.donateCta.btn')}
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
