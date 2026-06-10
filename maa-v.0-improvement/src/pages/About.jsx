import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero'
import Card from '../components/common/Card'
import { staggerContainer, staggerItem } from '../utils/motionVariants'

export default function About() {
  const { t } = useTranslation()

  const stats = [
    { number: '2024', label: 'Inaugurated' },
    { number: '5,000+', label: 'Animals Treated' },
    { number: '10', label: 'Specialist Doctors' },
    { number: '100km', label: 'Ambulance Radius' },
  ]

  return (
    <div className="bg-cream">
      <PageHero
        title={t('about.title', 'About MAA Saraswati')}
        subtitle="The Gold Standard in Animal Care"
        description="Providing state-of-the-art veterinary services to all domestic animals, driven by a deep commitment to animal welfare."
      />

      {/* Editorial Layout: Our Story */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Big Pull Quote & Stats */}
            <motion.div 
              className="lg:col-span-5 space-y-12"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="border-l-4 border-saffron pl-8 py-2">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal leading-snug">
                  "A sanctuary of healing for those who cannot speak for themselves."
                </h2>
              </div>

              {/* Staggered Stats (No symmetric grids) */}
              <div className="flex flex-wrap gap-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-4xl font-display font-black text-forest">{stat.number}</span>
                    <span className="text-sm font-bold uppercase tracking-widest text-charcoal/60 mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Editorial Body Text */}
            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="p-10 md:p-14 border-l-8 border-l-forest rounded-l-none">
                <div className="space-y-6 text-lg text-charcoal/80 font-light leading-relaxed">
                  <p>
                    MAA Saraswati Veterinary Hospital was inaugurated in July 2024 and has since been providing quality healthcare services to all types of domestic animals.
                  </p>
                  <p>
                    MAA is making significant strides in delivering free veterinary care to animals in and around Hyderabad. Treatments include digestive, respiratory, skin, urinary, reproductive, poisoning, fever-related, mineral and vitamin deficiency, and orthopedic cases. The hospital has a dedicated team of 10 doctors and para-veterinary staff in addition to providing treatment performing surgeries minor and major surgeries.
                  </p>
                  <p>
                    Equipped with modern infrastructure including Diagnostic tools, X Ray machine and Ultra scan, Operation theaters, dedicated wards for recovery; MAA over the past 24 months, has treated more than 5,000 animals (80% Cattles) in addition to dogs, sheep, goats, poultry, and birds.
                  </p>
                  <p>
                    MAA Saraswati Veterinary Hospital also operates a dedicated ambulance service to rescue and transport animals within the twin cities and up to 100 kilometers from Hyderabad.
                  </p>
                  <p className="font-medium text-forest">
                    The mission of MAA is to provide the highest level of animal healthcare completely free of cost, made possible through the generous support of benevolent donors.
                  </p>
                </div>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  )
}
