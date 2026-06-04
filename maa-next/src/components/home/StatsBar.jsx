'use client'
// src/components/home/StatsBar.jsx
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { STATS } from '@/lib/data'

/** Animated counter that counts from 0 to target when in view */
function AnimatedCounter({ value, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView) return
    if (value === 0) {
      requestAnimationFrame(() => setCount(0))
      return
    }

    const duration = 1800
    const startTime = performance.now()

    function tick(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

/**
 * Animated stats bar per 02_PRD.md §4.1.2
 * Saffron background strip with 4 counters
 */
export default function StatsBar() {
  const t = useTranslations('home.stats')

  return (
    <section className="bg-saffron py-12 md:py-16" aria-label="Impact statistics">
      <div className="section-wrapper">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="text-center"
            >
              <p className="font-display text-4xl md:text-5xl text-white leading-none">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="text-sm md:text-base text-white/80 font-body uppercase tracking-wide mt-2">
                {t(stat.id)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
