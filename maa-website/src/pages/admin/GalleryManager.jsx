// src/pages/admin/GalleryManager.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Upload, Trash2 } from 'lucide-react'
import { GALLERY_PHOTOS, GALLERY_VIDEOS } from '@/data/mockData'

export default function GalleryManager() {
  const { t } = useTranslation()
  const [tab, setTab] = useState('photos')
  const [photos, setPhotos] = useState(GALLERY_PHOTOS)
  const [videos, setVideos] = useState(GALLERY_VIDEOS)

  function handleDeletePhoto(id) {
    if (!confirm(t('common.confirmDelete'))) return
    setPhotos((prev) => prev.filter((p) => p.id !== id))
    toast.success('Photo deleted')
  }

  function handleDeleteVideo(id) {
    if (!confirm(t('common.confirmDelete'))) return
    setVideos((prev) => prev.filter((v) => v.id !== id))
    toast.success('Video deleted')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-charcoal">
          {t('admin.gallery.heading')}
        </h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-saffron text-white text-sm font-semibold rounded-lg hover:bg-saffron-dark active:scale-[0.96] transition-all cursor-pointer">
          <Upload size={16} aria-hidden="true" />
          {tab === 'photos' ? t('admin.gallery.uploadPhoto') : t('admin.gallery.uploadVideo')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-bg-subtle rounded-lg p-1 w-fit">
        {['photos', 'videos'].map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
              tab === key ? 'bg-white text-charcoal shadow-sm' : 'text-muted hover:text-charcoal'
            }`}
          >
            {t(`admin.gallery.${key}`)}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      {tab === 'photos' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-xl border border-border overflow-hidden group relative">
              <div className="aspect-square bg-gradient-to-br from-forest/10 to-saffron/10 flex items-center justify-center">
                <span className="text-2xl opacity-20" aria-hidden="true">📷</span>
              </div>
              <div className="p-3">
                <p className="text-xs text-muted truncate">{photo.caption}</p>
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-bg-subtle text-muted">
                  {photo.category}
                </span>
              </div>
              <button
                onClick={() => handleDeletePhoto(photo.id)}
                className="absolute top-2 right-2 p-1.5 rounded-md bg-white/90 text-emergency opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                aria-label="Delete photo"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Videos List */}
      {tab === 'videos' && (
        <div className="space-y-3">
          {videos.map((video) => (
            <div key={video.id} className="flex items-center justify-between bg-white rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-10 rounded bg-bg-subtle flex items-center justify-center shrink-0">
                  <span className="text-lg opacity-20" aria-hidden="true">🎬</span>
                </div>
                <p className="text-sm font-medium text-charcoal">{video.title}</p>
              </div>
              <button
                onClick={() => handleDeleteVideo(video.id)}
                className="p-2 text-emergency hover:bg-emergency/10 rounded-md transition-colors cursor-pointer"
                aria-label="Delete video"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
