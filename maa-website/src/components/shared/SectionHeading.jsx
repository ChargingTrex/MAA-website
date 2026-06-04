// src/components/shared/SectionHeading.jsx
import { motion } from 'framer-motion'
import { fadeUp } from '@/utils/motionVariants'

/**
 * Canonical section heading per 05_STYLE_GUIDE.md §4.6.
 * Eyebrow (saffron, uppercase, tracking-widest) + DM Serif heading (text-forest)
 * + optional subtext + saffron accent underline bar.
 */
export default function SectionHeading({ eyebrow, heading, subtext, center = true }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <span className="text-xs font-semibold text-saffron uppercase tracking-widest font-body">
          {eyebrow}
        </span>
      )}
      <h2
        className="font-display text-3xl md:text-4xl text-forest mt-2 leading-snug"
        style={{ textWrap: 'balance' }}
      >
        {heading}
      </h2>
      {subtext && (
        <p className="text-base text-muted max-w-2xl mx-auto mt-3 font-body leading-relaxed">
          {subtext}
        </p>
      )}
      {/* Saffron accent underline */}
      <div className={`w-12 h-1 bg-saffron rounded-full mt-4 ${center ? 'mx-auto' : ''}`} />
    </motion.div>
  )
}
