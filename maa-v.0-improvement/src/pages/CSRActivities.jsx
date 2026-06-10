import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageHero from '../components/common/PageHero'
import Card from '../components/common/Card'
import api from '../services/api'

const BACKEND_URL = 'http://localhost:5000'

const STATIC_ACTIVITIES = [
  { date: 'Dec 2024', title: 'Free Camp at Shelters', description: 'Provided free medical camps for animals in various local rescue shelters across Hyderabad.', image: '/images/hospital-2.png' },
  { date: 'Nov 2024', title: 'School Awareness Program', description: 'Educated school children about basic animal care, empathy, and hygiene practices with pets.', image: '/images/hospital-5.png' },
  { date: 'Oct 2024', title: 'Vaccination Drive', description: 'Conducted a massive free vaccination program for cattle in neighboring rural villages.', image: '/images/hospital-1.png' },
]

export default function CSRActivities() {
  const [backendActivities, setBackendActivities] = useState([])

  useEffect(() => {
    const fetchCSR = async () => {
      try {
        const res = await api.get('/csr')
        setBackendActivities(res.data)
      } catch {
        // Backend may be offline — just show static activities
      }
    }
    fetchCSR()
  }, [])

  // Map backend activities into same shape as static
  const dynamicActivities = backendActivities.map(a => {
    const firstImage = Array.isArray(a.images) && a.images.length > 0
      ? `${BACKEND_URL}${a.images[0]}`
      : '/images/hospital-1.png'
    const dateStr = a.date
      ? new Date(a.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : 'Recent'
    return {
      date: dateStr,
      title: a.title,
      description: a.description || '',
      image: firstImage,
    }
  })

  const activities = [...dynamicActivities, ...STATIC_ACTIVITIES]

  return (
    <div className="bg-white">
      <PageHero
        title="CSR Activities"
        subtitle="Community Outreach"
        description="Our commitment to animal welfare extends beyond the hospital walls and into the heart of the community."
      />

      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Alternating Timeline */}
          <div className="relative border-l-2 border-forest/20 md:border-l-0 md:border-l-transparent pl-8 md:pl-0">
            {/* Center Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-forest/20 -translate-x-1/2"></div>

            {activities.map((activity, idx) => (
              <motion.div 
                key={idx}
                className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-39px] md:left-1/2 w-6 h-6 rounded-full bg-saffron border-4 border-white shadow-md md:-translate-x-1/2 z-10"></div>

                {/* Content Side */}
                <div className={`w-full md:w-[45%] ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <Card className="hover:-translate-y-2">
                    <span className="inline-block px-3 py-1 bg-forest/10 text-forest text-sm font-bold uppercase rounded-md mb-4">
                      {activity.date}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-charcoal mb-3">{activity.title}</h3>
                    <p className="text-charcoal/70 leading-relaxed">
                      {activity.description}
                    </p>
                  </Card>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-[45%] mt-6 md:mt-0">
                  <div className={`relative h-64 rounded-3xl overflow-hidden shadow-xl ${idx % 2 === 0 ? 'md:rounded-l-none' : 'md:rounded-r-none'}`}>
                    <img 
                      src={activity.image} 
                      alt={activity.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-saffron/10 mix-blend-multiply"></div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}

