import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageHero from '../components/common/PageHero'
import api from '../services/api'

const BACKEND_URL = 'http://localhost:5000'

const STATIC_IMAGES = [
  { src: '/images/hospital-1.png', title: 'Hospital Interior', category: 'General', height: 'h-64' },
  { src: '/images/hospital-2.png', title: 'Patient Examination', category: 'General', height: 'h-96' },
  { src: '/images/hospital-3.png', title: 'Diagnostic Lab', category: 'Laboratory', height: 'h-80' },
  { src: '/images/hospital-4.png', title: 'Ambulance Service', category: 'Services', height: 'h-96' },
  { src: '/images/hospital-5.png', title: 'Our Team', category: 'Team', height: 'h-64' },
  { src: '/images/hospital-6.png', title: 'Operating Theater', category: 'Surgery', height: 'h-80' },
]

// Vary heights for dynamic-uploaded images for the masonry look
const HEIGHTS = ['h-64', 'h-80', 'h-96']

export default function Gallery() {
  const [uploadedPhotos, setUploadedPhotos] = useState([])

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await api.get('/gallery/photos')
        setUploadedPhotos(res.data)
      } catch {
        // Backend may be offline — just show static images
      }
    }
    fetchPhotos()
  }, [])

  // Map backend photos into the same shape as static images
  const dynamicImages = uploadedPhotos.map((photo, idx) => ({
    src: `${BACKEND_URL}${photo.filepath}`,
    title: photo.caption || 'Hospital Photo',
    category: photo.category || 'General',
    height: HEIGHTS[idx % HEIGHTS.length],
  }))

  // Show dynamic (backend-uploaded) photos first, then static
  const allImages = [...dynamicImages, ...STATIC_IMAGES]

  return (
    <div className="bg-cream">
      <PageHero
        title="Photo Gallery"
        subtitle="Our Hospital in Action"
        description="Explore our premium facilities and see our dedicated team providing exceptional veterinary care."
      />

      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {allImages.map((img, idx) => (
              <motion.div 
                key={idx} 
                className="break-inside-avoid relative group rounded-[2rem] overflow-hidden bg-white/50 shadow-xl shadow-forest/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className={`relative ${img.height} w-full overflow-hidden`}>
                  <img 
                    src={img.src} 
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  
                  {/* Glassmorphic Overlay */}
                  <div className="absolute inset-x-4 bottom-4 p-4 rounded-xl bg-white/80 backdrop-blur-md border border-white/50 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="font-display font-bold text-charcoal">{img.title}</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-saffron mt-1">{img.category}</p>
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

