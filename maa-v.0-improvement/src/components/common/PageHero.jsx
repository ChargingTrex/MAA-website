import { motion } from 'framer-motion'

export default function PageHero({ title, subtitle, description }) {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-navy-dark py-24">

      <motion.div 
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight text-balance drop-shadow-sm">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-saffron-light font-semibold mb-6 tracking-wide">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
            {description}
          </p>
        )}
      </motion.div>
    </section>
  )
}
