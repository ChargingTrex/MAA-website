import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/common/PageHero'

const BACKEND = 'http://localhost:5000'

const CATEGORIES = [
  { id: 'all',     label: 'All Facilities', emoji: '🏥' },
  { id: 'cattle',  label: 'Cattle & Livestock', emoji: '🐄' },
  { id: 'dogs',    label: 'Dogs & Cats',    emoji: '🐕' },
  { id: 'sheep',   label: 'Sheep & Goats',  emoji: '🐏' },
  { id: 'poultry', label: 'Poultry',        emoji: '🐓' },
  { id: 'general', label: 'General',        emoji: '🩺' },
]

// Placeholder cards shown until admin uploads real photos
const PLACEHOLDERS = [
  { id: 'p1', title: 'Operation Theatre',    description: 'State-of-the-art surgical suite for complex procedures.',           image_path: '/facilities/surgery.png',   category: 'general' },
  { id: 'p2', title: 'Diagnostic Laboratory',description: 'Full blood panel, pathology & rapid diagnostic testing.',           image_path: '/facilities/lab.png',       category: 'general' },
  { id: 'p3', title: '24/7 Ambulance',       description: 'Emergency mobile unit covering 100 km from Hyderabad.',            image_path: '/facilities/ambulance.png', category: 'general' },
  { id: 'p4', title: 'Recovery Wards',       description: 'Monitored ICU recovery bays for post-operative care.',             image_path: '/facilities/ward.png',      category: 'general' },
  { id: 'p5', title: 'Livestock Treatment',  description: 'Dedicated area for cattle, sheep and large animal treatment.',     image_path: '/facilities/cattle.png',    category: 'cattle'  },
]

export default function MedicalFacilities() {
  const [activeTab, setActiveTab]   = useState('all')
  const [items, setItems]           = useState([])
  const [isLoading, setIsLoading]   = useState(true)
  const [lightbox, setLightbox]     = useState(null)

  useEffect(() => {
    fetch(`${BACKEND}/api/facilities`)
      .then(r => r.json())
      .then(data => {
        setItems(Array.isArray(data) && data.length > 0 ? data : PLACEHOLDERS)
      })
      .catch(() => setItems(PLACEHOLDERS))
      .finally(() => setIsLoading(false))
  }, [])

  const filtered = activeTab === 'all'
    ? items
    : items.filter(i => i.category === activeTab)

  const imgSrc = (item) =>
    item.image_path?.startsWith('/facilities/')
      ? item.image_path                          // placeholder (served by Vite public/)
      : `${BACKEND}${item.image_path}`           // admin upload (served by Express)

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title="Medical Facilities"
        subtitle="Advanced Diagnostics & Surgery"
        description="State-of-the-art infrastructure dedicated to the health and recovery of every animal in our care."
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Category Tabs ─────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-3 justify-center mb-14">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 shadow-sm ${
                  activeTab === cat.id
                    ? 'bg-forest text-white shadow-forest/30 scale-105'
                    : 'bg-cream text-charcoal hover:bg-forest/10 hover:shadow-md'
                }`}
              >
                <span className="mr-2">{cat.emoji}</span>{cat.label}
              </button>
            ))}
          </div>

          {/* ── Photo Grid ────────────────────────────────────────────── */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-3xl bg-cream/60 animate-pulse aspect-[4/3]" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-charcoal/40">
              <p className="text-6xl mb-4">📂</p>
              <p className="text-xl font-medium">No facilities in this category yet.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                {filtered.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.07 }}
                    className="group cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-border transition-all duration-500 hover:-translate-y-2 bg-white"
                    onClick={() => setLightbox(item)}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-cream/50">
                      {item.image_path ? (
                        <img
                          src={imgSrc(item)}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl bg-forest/5">🏥</div>
                      )}
                      {/* Category badge */}
                      <span className="absolute top-3 right-3 bg-forest text-white text-xs font-bold px-3 py-1 rounded-full capitalize shadow">
                        {item.category}
                      </span>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white text-charcoal font-bold px-5 py-2 rounded-full text-sm shadow-lg">
                          View Full Image
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-display font-bold text-charcoal mb-1 group-hover:text-forest transition-colors">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-charcoal/60 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={imgSrc(lightbox)}
                alt={lightbox.title}
                className="w-full max-h-[70vh] object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-display font-bold text-charcoal mb-2">{lightbox.title}</h3>
                {lightbox.description && (
                  <p className="text-charcoal/70">{lightbox.description}</p>
                )}
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 bg-charcoal/80 hover:bg-charcoal text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
