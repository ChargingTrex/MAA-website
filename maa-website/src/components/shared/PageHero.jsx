// src/components/shared/PageHero.jsx
import { motion } from 'framer-motion'
import { fadeUp } from '@/utils/motionVariants'

/**
 * Reusable page hero per 05_STYLE_GUIDE.md §4.7 / 04_UI_PROMPTS.md §11.
 * - variant="forest" (default): bg-forest, py-20 md:py-28
 * - variant="saffron": bg-saffron, py-20
 * - Diagonal stripe texture overlay (not paw pattern)
 * - Bottom wave SVG transition to cream
 */
export default function PageHero({ heading, subheading, variant = 'forest' }) {
  const bgClass = variant === 'saffron' ? 'bg-saffron' : 'bg-forest'
  const pyClass = variant === 'saffron' ? 'py-20' : 'py-20 md:py-28'

  return (
    <section className={`relative overflow-hidden ${bgClass} ${pyClass} text-white rounded-b-[2rem] md:rounded-b-[3rem] shadow-sm mb-10`}>
      {/* Subtle modern overlay (removing the dated stripe) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center z-10 pt-8">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-display text-4xl md:text-5xl text-white leading-tight"
          style={{ textWrap: 'balance' }}
        >
          {heading}
        </motion.h1>

        {subheading && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg mt-4 max-w-2xl mx-auto font-body"
            style={{ textWrap: 'pretty' }}
          >
            {subheading}
          </motion.p>
        )}
      </div>
    </section>
  )
}
