import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles, Heart } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { FloralDivider } from './Ornament'

export const GallerySection: React.FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'prewed' | 'ceremony'>('all')

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return
      if (e.key === 'Escape') setSelectedItemIndex(null)
      if (e.key === 'ArrowLeft') {
        setSelectedItemIndex((prev) =>
          prev !== null ? (prev - 1 + filteredGallery.length) % filteredGallery.length : null
        )
      }
      if (e.key === 'ArrowRight') {
        setSelectedItemIndex((prev) =>
          prev !== null ? (prev + 1) % filteredGallery.length : null
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedItemIndex, categoryFilter])

  const filteredGallery = weddingData.gallery.filter((item) => {
    if (categoryFilter === 'all') return true
    return item.category === categoryFilter
  })

  const openLightbox = (index: number) => {
    setSelectedItemIndex(index)
  }

  const closeLightbox = () => {
    setSelectedItemIndex(null)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex - 1 + filteredGallery.length) % filteredGallery.length)
    }
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % filteredGallery.length)
    }
  }

  const selectedImage = selectedItemIndex !== null ? filteredGallery[selectedItemIndex] : null

  return (
    <section id="gallery" className="relative py-12 px-4 scroll-mt-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-900/10 border border-amber-700/20 text-amber-900 text-xs uppercase tracking-widest font-sans font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Momen Bahagia</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
          Galeri Kenangan
        </h2>
        <FloralDivider className="my-3" />
        <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed px-4 max-w-xl mx-auto mb-6">
          Momen-momen indah perjalanan cinta kami yang terekam dalam bingkai kenangan:
        </p>

        {/* Category Filter Tabs */}
        <div className="inline-flex items-center p-1 rounded-full bg-stone-200/60 backdrop-blur-sm border border-stone-300/40 mb-8 gap-1">
          {[
            { id: 'all', label: 'Semua Foto' },
            { id: 'prewed', label: 'Prewedding' },
            { id: 'ceremony', label: 'Prosesi Sakral' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategoryFilter(cat.id as any)
                setSelectedItemIndex(null)
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-amber-800 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Masonry Grid: 2 columns on mobile, 3 columns on tablet/desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className={`group relative overflow-hidden rounded-3xl bg-stone-200 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ${
                item.aspect === 'landscape' && idx === 0 ? 'col-span-2 md:col-span-2 h-56 sm:h-72' : 'h-52 sm:h-72'
              }`}
            >
              <img
                src={item.thumb}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay with zoom icon & caption */}
              <div className="absolute inset-0 bg-stone-950/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-white">
                <span className="p-3 rounded-full bg-white/90 text-stone-900 shadow-xl transform scale-90 group-hover:scale-100 transition-transform mb-2">
                  <ZoomIn className="w-5 h-5 text-amber-800" />
                </span>
                <p className="text-xs font-serif italic text-center max-w-xs line-clamp-2 drop-shadow-md">
                  "{item.caption}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && selectedItemIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/94 backdrop-blur-md p-4 animate-in fade-in duration-300"
        >
          {/* Top Bar with Counter & Close */}
          <div className="absolute top-4 left-0 right-0 px-6 flex items-center justify-between text-white z-50 pointer-events-none">
            <span className="font-sans text-xs tracking-wider bg-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md pointer-events-auto">
              Foto {selectedItemIndex + 1} dari {filteredGallery.length}
            </span>
            <button
              onClick={closeLightbox}
              aria-label="Tutup foto"
              className="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors cursor-pointer pointer-events-auto active:scale-95"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Navigation Prev */}
          <button
            onClick={prevImage}
            aria-label="Foto sebelumnya"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors cursor-pointer z-50 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={nextImage}
            aria-label="Foto selanjutnya"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors cursor-pointer z-50 active:scale-95"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Image & Caption Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.caption}
              className="max-h-[66vh] sm:max-h-[72vh] w-auto max-w-full rounded-3xl object-contain shadow-2xl border border-white/20"
            />
            <p className="mt-4 text-center font-serif italic text-xs sm:text-sm text-stone-200 max-w-lg px-4 leading-relaxed">
              "{selectedImage.caption}"
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
