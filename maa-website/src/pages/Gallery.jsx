// src/pages/Gallery.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import PawDivider from '@/components/shared/PawDivider'
import { fadeUp, staggerContainer, scaleIn } from '@/utils/motionVariants'
import { GALLERY_PHOTOS, GALLERY_VIDEOS } from '@/data/mockData'
import { X } from 'lucide-react'

const FILTER_KEYS = ['all', 'general', 'surgery', 'ambulance', 'wards', 'csr']

export default function Gallery() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const filtered =
    activeFilter === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeFilter)

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <PageHero
        heading={t('gallery.hero.heading')}
        subheading={t('gallery.hero.subheading')}
        variant="forest"
      />

      {/* Photo Gallery */}
      <section className="py-16 md:py-24 [content-visibility:auto]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          {/* Filter tabs per UI Prompt 8 */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {FILTER_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeFilter === key
                    ? 'bg-forest text-white shadow-md'
                    : 'bg-white border border-gray-200 text-charcoal hover:border-forest hover:text-forest'
                }`}
              >
                {t(`gallery.filters.${key}`)}
              </button>
            ))}
          </div>

          {/* Photo grid */}
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-charcoal/60 py-12 font-body"
                >
                  {t('gallery.empty.photos')}
                </motion.p>
              ) : (
                <motion.div
                  key={activeFilter}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                >
                  {filtered.map((photo, idx) => (
                    <motion.button
                      key={photo.id}
                      variants={fadeUp}
                      onClick={() => setLightboxIdx(idx)}
                      className="aspect-square card-premium flex items-center justify-center group cursor-pointer"
                      aria-label={`View photo: ${photo.caption}`}
                    >
                      {photo.src ? (
                        <img
                          src={photo.src}
                          alt={photo.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-3xl opacity-20 group-hover:opacity-40 transition-opacity" aria-hidden="true">
                          📷
                        </span>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox per UI Prompt 8 */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 transition-colors cursor-pointer"
              onClick={() => setLightboxIdx(null)}
              aria-label="Close lightbox"
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-forest/20 to-saffron/20 flex items-center justify-center relative">
                {filtered[lightboxIdx]?.src ? (
                  <img
                    src={filtered[lightboxIdx].src}
                    alt={filtered[lightboxIdx].caption}
                    className="absolute inset-0 w-full h-full object-contain bg-black/5"
                  />
                ) : (
                  <span className="text-6xl opacity-30">📷</span>
                )}
              </div>
              <div className="p-5 text-center bg-white">
                <p className="text-base text-charcoal font-medium font-body">{filtered[lightboxIdx]?.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PawDivider />

      {/* Video Gallery */}
      <section className="py-16 md:py-24 bg-forest-subtle/50 [content-visibility:auto]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <SectionHeading heading={t('gallery.videos.heading')} />

          {GALLERY_VIDEOS.length === 0 ? (
            <p className="text-center text-charcoal/60 py-12 font-body">{t('gallery.empty.videos')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="card-premium overflow-hidden group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-forest/10 to-saffron/10 flex items-center justify-center">
                    <span className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity" aria-hidden="true">🎬</span>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col items-center justify-center text-center">
                    <p className="text-lg font-semibold text-forest font-body">{video.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
