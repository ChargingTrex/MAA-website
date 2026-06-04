// src/components/home/StatsBar.jsx
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { STATS } from '@/data/mockData'
import { fadeUp, staggerContainer } from '@/utils/motionVariants'

/**
 * Stats bar per 04_UI_PROMPTS.md §4:
 * - bg-saffron with paw texture at 8% opacity
 * - DM Serif Display text-5xl, white numbers with count-up animation
 * - Vertical dividers between items
 */
function useCountUp(target, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return
    let start = 0
    const increment = target / (duration / 16)
    let raf

    function step() {
      start += increment
      if (start >= target) {
        setCount(target)
        return
      }
      setCount(Math.floor(start))
      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, trigger])

  return count
}

function StatItem({ stat, isLast }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(stat.value, 2000, visible)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className={`text-center px-4 py-3 ${!isLast ? 'sm:border-r sm:border-white/20' : ''}`}
    >
      <p className="font-display text-5xl text-white tabular-nums">
        {stat.prefix || ''}
        {count.toLocaleString('en-IN')}
        {stat.suffix ? ` ${stat.suffix}` : ''}
      </p>
      <p className="text-sm text-white/80 uppercase tracking-wider mt-1 font-body">
        {t(stat.labelKey)}
      </p>
    </motion.div>
  )
}

export default function StatsBar() {
  return (
    <section className="relative bg-saffron text-white overflow-hidden">
      {/* Paw texture per §7.4 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ctext y='28' font-size='24'%3E🐾%3C/text%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="relative max-w-5xl mx-auto px-4 py-12 sm:py-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {STATS.map((stat, i) => (
          <StatItem key={stat.id} stat={stat} isLast={i === STATS.length - 1} />
        ))}
      </motion.div>
    </section>
  )
}
