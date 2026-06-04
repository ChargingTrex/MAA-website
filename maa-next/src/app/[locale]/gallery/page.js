'use client'
// src/app/gallery/page.js
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import PawDivider from '@/components/shared/PawDivider'
import { fadeUp } from '@/lib/motionVariants'

const FILTER_TABS = ['All', 'General', 'Surgery', 'Ambulance', 'Wards', 'CSR']

const GALLERY_ITEMS = [
  { id: 1, category: 'General',   caption: 'Hospital entrance and reception area', emoji: '🏥' },
  { id: 2, category: 'Surgery',   caption: 'Surgery in progress — orthopaedic procedure', emoji: '⚕️' },
  { id: 3, category: 'Ambulance', caption: 'Ambulance on an emergency rescue mission', emoji: '🚑' },
  { id: 4, category: 'Wards',     caption: 'Post-operative care ward', emoji: '🛏️' },
  { id: 5, category: 'General',   caption: 'Our dedicated veterinary team', emoji: '👨‍⚕️' },
  { id: 6, category: 'Surgery',   caption: 'Laboratory diagnostic equipment', emoji: '🔬' },
  { id: 7, category: 'CSR',       caption: 'Animal health camp in rural village', emoji: '🏕️' },
  { id: 8, category: 'General',   caption: 'Cattle examination and treatment', emoji: '🐄' },
  { id: 9, category: 'Wards',     caption: 'ICU monitoring system', emoji: '💓' },
  { id: 10, category: 'CSR',      caption: 'Free vaccination drive', emoji: '💉' },
  { id: 11, category: 'Ambulance',caption: 'Ambulance stocked with medical supplies', emoji: '🚐' },
  { id: 12, category: 'Surgery',  caption: 'Modern operation theatre setup', emoji: '🏨' },
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter)

  return (
    <div className="bg-cream">
      <PageHero
        title="Photo Gallery"
        subtitle="A visual record of our work — the animals we treat, the camps we run, and the team that makes it all possible."
        variant="forest"
      />

      <section className="py-16 md:py-24">
        <div className="section-wrapper">
          <SectionHeading
            eyebrow="Our Work in Pictures"
            heading="Gallery"
          />

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-10" role="tablist" aria-label="Gallery filter">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold font-body transition-all duration-200 ${
                  activeFilter === tab
                    ? 'bg-saffron text-white shadow-md'
                    : 'bg-white text-charcoal/70 hover:bg-saffron-subtle hover:text-saffron border border-border'
                }`}
                role="tab"
                aria-selected={activeFilter === tab}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          >
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden border border-border hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-200 cursor-pointer"
                  style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
                >
                  <div
                    className={`w-full bg-forest-subtle flex items-center justify-center ${
                      item.id % 3 === 0 ? 'aspect-video' : item.id % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]'
                    }`}
                  >
                    <span className="text-5xl opacity-30" aria-hidden="true">{item.emoji}</span>
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-saffron-subtle text-saffron text-xs font-semibold uppercase tracking-wide rounded-full px-2.5 py-0.5 font-body mb-2">
                      {item.category}
                    </span>
                    <p className="text-sm text-charcoal font-body leading-snug">{item.caption}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <span className="text-5xl" aria-hidden="true">🐾</span>
              <p className="text-base font-semibold text-charcoal mt-4 font-body">No photos in this category yet.</p>
              <p className="text-sm text-muted mt-1 font-body">Check back soon — more photos are added regularly.</p>
            </div>
          )}
        </div>
      </section>

      <PawDivider />

      {/* Videos placeholder */}
      <section className="py-16 md:py-20 bg-bg-subtle">
        <div className="section-wrapper">
          <SectionHeading
            eyebrow="Watch"
            heading="Video Gallery"
            subtext="Short videos of our work — hospital tours, CSR activities, and animal rescues."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Hospital Tour — MAA Saraswati', emoji: '🎥' },
              { title: 'A Day in the Life of Our Veterinarians', emoji: '📽️' },
            ].map((video) => (
              <div
                key={video.title}
                className="bg-white rounded-2xl overflow-hidden border border-border"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
              >
                <div className="aspect-video bg-charcoal/5 flex items-center justify-center">
                  <span className="text-6xl opacity-20" aria-hidden="true">{video.emoji}</span>
                </div>
                <div className="p-5">
                  <p className="text-base font-semibold text-charcoal font-body">{video.title}</p>
                  <p className="text-xs text-muted mt-1 font-body">MAA Saraswati Veterinary Hospital</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
