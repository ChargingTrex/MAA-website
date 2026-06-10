import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PackageSearch, Mail, HandHeart, CheckCircle2, Circle } from 'lucide-react'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import Card from '../components/common/Card'
import { staggerContainer, staggerItem } from '../utils/motionVariants'
import api from '../services/api'

const STATIC_NEEDS = [
  { name: 'Ultrasound Machine', cost: '₹2,50,000', status: 'Needed', description: 'Crucial for non-invasive internal diagnostics.' },
  { name: 'Surgical Kit', cost: '₹45,000', status: 'Needed', description: 'Complete set of tools for orthopaedic surgeries.' },
  { name: 'Ambulance Fuel Fund', cost: '₹15,000 / month', status: 'Needed', description: 'Helps us rescue animals from a 100km radius.' },
  { name: 'Medicine Stock', cost: '₹30,000 / month', status: 'Funded', description: 'Basic antibiotics and pain relievers.' },
  { name: 'Digital X-Ray Sensor', cost: '₹1,80,000', status: 'Needed', description: 'For immediate bone fracture assessments.' },
  { name: 'Recovery Cages', cost: '₹20,000 each', status: 'Needed', description: 'Safe enclosures for post-op observation.' },
]

export default function Sponsor() {
  const { t } = useTranslation()
  const [backendNeeds, setBackendNeeds] = useState([])

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const res = await api.get('/sponsors')
        setBackendNeeds(res.data)
      } catch {
        // Backend may be offline — just show static needs
      }
    }
    fetchNeeds()
  }, [])

  // Map backend needs into same shape as static
  const dynamicNeeds = backendNeeds.map(n => ({
    name: n.name,
    cost: n.cost,
    status: n.status || 'Needed',
    description: n.description || '',
  }))

  // Backend-managed needs first, then static
  const currentNeeds = [...dynamicNeeds, ...STATIC_NEEDS]

  const steps = [
    { icon: PackageSearch, title: 'Choose a Need', desc: 'Browse our current needs grid and select an item you wish to sponsor.' },
    { icon: Mail, title: 'Contact Us', desc: 'Reach out via our contact form or phone to express your interest.' },
    { icon: HandHeart, title: 'Fulfill the Need', desc: 'You can transfer funds specifically for the item, or donate the equipment directly in-kind.' },
  ]

  return (
    <div className="bg-cream min-h-screen pb-20">
      <PageHero
        title="Sponsor a Need, Save Many Lives"
        subtitle="Targeted Giving"
        description="By sponsoring specific equipment or funds, you directly elevate the quality of care we can provide to every animal."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        
        {/* How to Sponsor Steps */}
        <section className="mb-24">
          <SectionHeading title="How to Sponsor" className="text-center" />
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mt-12 relative"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-saffron/30 z-0"></div>

            {steps.map((step, idx) => (
              <motion.div key={idx} variants={staggerItem} className="relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-saffron text-white flex items-center justify-center mb-6 shadow-md border-4 border-cream">
                    <step.icon size={28} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-charcoal mb-3">{step.title}</h3>
                  <p className="text-charcoal-light leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Current Needs Grid */}
        <section className="mb-20">
          <SectionHeading title="Current Hospital Needs" className="text-center" />
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {currentNeeds.map((need, idx) => {
              const isFunded = need.status === 'Funded'
              return (
                <motion.div key={idx} variants={staggerItem}>
                  <Card className={`h-full flex flex-col p-6 transition-all duration-300 ${isFunded ? 'opacity-70 bg-gray-50' : 'hover:-translate-y-1'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-display font-bold text-charcoal pr-4">{need.name}</h3>
                      <div className={`shrink-0 flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${isFunded ? 'bg-green-100 text-green-700' : 'bg-saffron/10 text-saffron'}`}>
                        {isFunded ? <CheckCircle2 size={14} /> : <Circle size={14} className="fill-saffron text-saffron" />}
                        {need.status}
                      </div>
                    </div>
                    
                    <p className="text-sm text-charcoal-light mb-6 flex-grow">{need.description}</p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Est. Cost</span>
                      <span className="font-mono font-bold text-forest text-lg">{need.cost}</span>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Call to Action */}
        <motion.section 
          className="bg-forest rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background Accents */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-saffron/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Sponsor?</h2>
            <p className="text-lg text-white/90 mb-10 text-balance">
              Whether you want to sponsor an item from our list or have other equipment you'd like to donate, we'd love to hear from you.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4 bg-saffron hover:bg-[#d6720d] text-white">
              <Mail size={20} />
              Contact Us to Sponsor
            </Link>
          </div>
        </motion.section>

      </div>
    </div>
  )
}

