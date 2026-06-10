import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ChevronDown, Heart, Users, Award, Stethoscope, ArrowRight } from 'lucide-react'
import { staggerContainer, staggerItem } from '../utils/motionVariants'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="bg-cream selection:bg-saffron/30">
      {/* 
        === IMPECCABLE HERO === 
      */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-navy-dark py-24">
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Spring-like ease out
        >
          {/* Subtle Overline */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm text-sm font-semibold text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-saffron animate-pulse"></span>
            24/7 Emergency Care Available
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-display font-bold text-white mb-6 text-balance leading-[1.1] tracking-tight drop-shadow-sm">
            {t('home.hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 text-balance max-w-2xl mx-auto font-light tracking-wide">
            {t('home.hero_subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/donate" className="btn-primary text-base md:text-lg px-8 py-3 md:py-4 shadow-lg shadow-saffron/20 hover:shadow-saffron/40 hover:-translate-y-1 transition-all">
              {t('common.donate_now')}
            </Link>
            <Link to="/about" className="group flex items-center gap-2 text-base md:text-lg font-medium text-white hover:text-saffron transition-colors px-6 py-3 md:py-4 bg-white/10 backdrop-blur-sm rounded-full">
              {t('common.learn_more')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Bouncing Chevron */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* 
        === IMPECCABLE STATS === 
        Macro spacing (py-24). Clean typographic contrast. 
      */}
      <section className="bg-forest py-24 relative overflow-hidden">
        {/* Subtle texture/pattern could go here */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { icon: Heart, label: 'Animals Treated', value: '5,000+' },
              { icon: Stethoscope, label: 'Doctors & Staff', value: '10+' },
              { icon: Award, label: 'Established', value: '2024' },
              { icon: Users, label: 'Ambulance Radius', value: '100km' },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={staggerItem} className="text-center group">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-saffron transition-all duration-300">
                  <stat.icon size={32} className="text-white" />
                </div>
                <p className="text-4xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">{stat.value}</p>
                <p className="text-sm md:text-base text-cream/70 font-medium uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 
        === IMPECCABLE MISSION & VISION (Editorial Layout) === 
        Breaking the symmetry. Mission is large typography; Vision is an overlapping card.
      */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left: Mission (Editorial Typography) */}
            <motion.div
              className="lg:col-span-7 pr-4 lg:pr-12"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-saffron rounded-full"></div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-saffron">Our Mission</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-charcoal leading-tight mb-8">
                Highest level of animal healthcare completely free of cost.
              </h3>
              <p className="text-lg text-charcoal/70 leading-relaxed font-light">
                The mission of MAA is to provide the highest level of animal healthcare completely free of cost, made possible through the generous support of benevolent donors.
              </p>
            </motion.div>

            {/* Right: Core Focus (Glassmorphic Accent Card) */}
            <motion.div
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Decorative blob behind the card */}
              <div className="absolute -inset-4 bg-forest/10 rounded-[3rem] blur-2xl transform -rotate-6"></div>

              <div className="relative bg-white/80 backdrop-blur-xl border border-white p-10 md:p-12 rounded-[2rem] shadow-xl">
                <div className="w-16 h-16 bg-forest rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-forest/20">
                  <Award size={32} className="text-white" />
                </div>
                <h4 className="text-2xl font-display font-bold text-charcoal mb-4">Our Services</h4>
                <p className="text-charcoal/70 leading-relaxed">
                  MAA is making significant strides in delivering free veterinary care in and around Hyderabad. Treatments include digestive, respiratory, skin, urinary, reproductive, poisoning, fever-related, mineral and vitamin deficiency, and orthopedic cases.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 
        === IMPECCABLE SERVICES (Asymmetric Bento Grid) === 
        Replaces the monotonous 3-column grid with a hierarchy-driven layout.
      */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-6">
              {t('home.services')}
            </h2>
            <p className="text-lg text-charcoal/60 font-light">
              From routine checkups to complex surgeries, our facility is equipped to handle all medical needs.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 auto-rows-[250px]"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Item 1: Surgery (Hero Bento - spans 2 columns) */}
            <motion.div variants={staggerItem} className="md:col-span-2 group relative overflow-hidden rounded-[2rem] bg-charcoal text-white p-8 md:p-10 flex flex-col justify-end shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628009368231-7bb7cbcb8127?q=80&w=2070')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-60"></div>
              <div className="relative z-20">
                <span className="inline-block px-3 py-1 bg-saffron text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">Specialty</span>
                <h3 className="text-3xl font-display font-bold mb-2">Advanced Surgery</h3>
                <p className="text-white/80 max-w-md">State-of-the-art operating theaters equipped for complex orthopaedic and soft tissue surgeries.</p>
              </div>
            </motion.div>

            {/* Item 2: Lab Tests */}
            <motion.div variants={staggerItem} className="group relative overflow-hidden rounded-[2rem] bg-forest text-white p-8 flex flex-col justify-between shadow-lg">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🧬</div>
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">Diagnostic Lab</h3>
                <p className="text-white/70 text-sm">In-house pathology and blood work for immediate results.</p>
              </div>
            </motion.div>

            {/* Item 3: Dogs & Cats */}
            <motion.div variants={staggerItem} className="group relative overflow-hidden rounded-[2rem] bg-cream text-charcoal border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-saffron/10 flex items-center justify-center text-3xl mb-4 group-hover:-translate-y-1 transition-transform">🐕</div>
              <h3 className="text-xl font-display font-bold mb-2">Small Animals</h3>
              <p className="text-charcoal/60 text-sm">Complete care for domestic pets.</p>
            </motion.div>

            {/* Item 4: Cattle & Large Animals */}
            <motion.div variants={staggerItem} className="group relative overflow-hidden rounded-[2rem] bg-cream text-charcoal border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center text-3xl mb-4 group-hover:-translate-y-1 transition-transform">🐄</div>
              <h3 className="text-xl font-display font-bold mb-2">Large Animals</h3>
              <p className="text-charcoal/60 text-sm">Specialized treatment for livestock.</p>
            </motion.div>

            {/* Item 5: Ambulance */}
            <motion.div variants={staggerItem} className="group relative overflow-hidden rounded-[2rem] bg-saffron text-white p-8 flex flex-col justify-between shadow-lg">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-3xl mb-4 group-hover:translate-x-2 transition-transform">🚑</div>
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">Ambulance</h3>
                <p className="text-white/90 text-sm font-medium">100km Coverage Radius</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 
        === IMPECCABLE CTA === 
      */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-forest"></div>
        {/* Abstract pattern */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-saffron/20 rounded-3xl mx-auto flex items-center justify-center mb-8 rotate-12">
              <Heart size={40} className="text-saffron -rotate-12" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Help Us Continue <br /><span className="text-saffron">Our Mission</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 font-light max-w-2xl mx-auto">
              Your donation directly funds emergency surgeries, medicines, and ambulance rescues for animals who have no one else.
            </p>
            <Link to="/donate" className="inline-block bg-saffron hover:bg-[#d6720d] text-white font-bold text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              Make a Donation Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
