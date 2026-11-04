import React, { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles, Heart } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { useInvitationData } from '../context/InvitationContext'
import { FloralDivider } from './Ornament'
import { Reveal3D } from './common/Reveal3D'

export const GallerySection: React.FC = () => {
  const { activeTemplate } = useInvitationData()
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'prewed' | 'ceremony'>('all')
  const lightboxRef = useRef<HTMLDivElement>(null)
  const triggerThumbnailRef = useRef<HTMLElement | null>(null)

  const isDark =
    activeTemplate.category === 'dark' ||
    activeTemplate.themeColors.textDark === '#FFFFFF' ||
    activeTemplate.slug === 'exclusive-navy' ||
    activeTemplate.slug === 'royal-midnight' ||
    activeTemplate.slug === 'celestial-night'

  // Full Lightbox dialog focus management, keyboard navigation & scroll lock
  useEffect(() => {
    if (selectedItemIndex === null) return
    triggerThumbnailRef.current = document.activeElement as HTMLElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      if (lightboxRef.current) {
        const focusable = lightboxRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length > 0) focusable[0].focus()
      }
    }, 50)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItemIndex(null)
        return
      }
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
      if (e.key === 'Tab' && lightboxRef.current) {
        const focusable = Array.from(
          lightboxRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      triggerThumbnailRef.current?.focus()
    }
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

  return (
    <section id="gallery" className="relative py-12 px-4 scroll-mt-6 defer-render-lg">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-sans font-medium mb-3 ${
            isDark
              ? 'bg-amber-500/15 border border-amber-400/30 text-amber-300'
              : 'bg-amber-900/10 border border-amber-700/20 text-amber-900'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
          <span>Momen Bahagia</span>
        </div>

        <h2 className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-stone-800'}`}>
          Galeri Foto Kami
        </h2>
        <FloralDivider className="my-3" />
        <p className={`font-serif italic text-xs sm:text-sm mb-8 px-4 max-w-lg mx-auto leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
          "Setiap bingkai gambar merekam cerita indah perjalanan kami menuju hari bahagia."
        </p>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {[
            { id: 'all', label: 'Semua Momen' },
            { id: 'prewed', label: 'Prewedding' },
            { id: 'ceremony', label: 'Momen Bahagia' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryFilter(cat.id as 'all' | 'prewed' | 'ceremony')}
              className={`min-h-[44px] px-5 py-2 rounded-full text-xs font-serif font-bold transition-all cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-amber-500 text-stone-950 shadow-md scale-105'
                  : isDark
                  ? 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-white/10'
                  : 'bg-white/80 text-stone-700 hover:bg-amber-100 border border-amber-600/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {filteredGallery.map((item, idx) => (
            <Reveal3D
              key={item.id}
              delay={((idx % 6) * 100) as 0 | 100 | 200 | 300 | 400 | 500}
              interactive
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] shadow-lg cursor-pointer border transition-all duration-300 ${
                isDark ? 'border-white/10 bg-stone-900' : 'border-amber-800/15 bg-stone-100'
              }`}
              onClick={() => openLightbox(idx)}
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-left text-white">
                <span className="font-serif text-xs font-semibold drop-shadow line-clamp-1">
                  {item.caption}
                </span>
                <span className="text-[10px] text-amber-300 flex items-center gap-1 mt-1 font-mono">
                  <ZoomIn className="w-3 h-3" />
                  Lihat Foto HD
                </span>
              </div>
            </Reveal3D>
          ))}
        </div>
      </div>

      {/* Lightbox Modal Dialog */}
      {selectedItemIndex !== null && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Penampil Galeri Foto HD"
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Tutup foto"
              className="min-w-[44px] min-h-[44px] absolute -top-12 right-0 p-2 text-white hover:text-amber-300 transition-colors cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={prevImage}
              aria-label="Foto sebelumnya"
              className="min-w-[44px] min-h-[44px] absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer border border-white/20 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={nextImage}
              aria-label="Foto berikutnya"
              className="min-w-[44px] min-h-[44px] absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer border border-white/20 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Active Image */}
            <img
              src={filteredGallery[selectedItemIndex].src}
              alt={filteredGallery[selectedItemIndex].caption}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/15"
            />

            {/* Caption & Counter */}
            <div className="mt-3 text-center text-white">
              <p className="font-serif text-sm sm:text-base font-semibold drop-shadow">
                {filteredGallery[selectedItemIndex].caption}
              </p>
              <p className="text-[11px] text-amber-300 font-mono mt-0.5">
                {selectedItemIndex + 1} dari {filteredGallery.length} Foto
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
