import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Sparkles, Heart } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { useInvitationData } from '../context/InvitationContext'
import { FloralDivider } from './Ornament'
import { StaggerContainer, MotionItem } from './common/MotionReveal'

export const GallerySection: React.FC = () => {
  const { activeTemplate } = useInvitationData()
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'prewed' | 'ceremony'>('all')
  const [isZoomed, setIsZoomed] = useState(false)
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
    if (selectedItemIndex === null) {
      setIsZoomed(false)
      return
    }
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
        setIsZoomed(false)
        setSelectedItemIndex((prev) =>
          prev !== null ? (prev - 1 + filteredGallery.length) % filteredGallery.length : null
        )
      }
      if (e.key === 'ArrowRight') {
        setIsZoomed(false)
        setSelectedItemIndex((prev) =>
          prev !== null ? (prev + 1) % filteredGallery.length : null
        )
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
    setIsZoomed(false)
    setSelectedItemIndex(index)
  }

  const closeLightbox = () => {
    setIsZoomed(false)
    setSelectedItemIndex(null)
  }

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setIsZoomed(false)
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex - 1 + filteredGallery.length) % filteredGallery.length)
    }
  }

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setIsZoomed(false)
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % filteredGallery.length)
    }
  }

  return (
    <section id="gallery" className="relative py-12 px-4 scroll-mt-6 defer-render-lg">
      <div className="max-w-4xl mx-auto text-center">
        <StaggerContainer stagger={0.12} delayChildren={0.05} className="mb-8">
          <MotionItem variant="pop" className="flex justify-center">
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
          </MotionItem>

          <MotionItem variant="fadeUp">
            <h2 className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-stone-800'}`}>
              Galeri Foto Kami
            </h2>
          </MotionItem>

          <MotionItem variant="expand">
            <FloralDivider className="my-3" />
          </MotionItem>

          <MotionItem variant="fadeUp">
            <p className={`font-serif italic text-xs sm:text-sm px-4 max-w-lg mx-auto leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              &ldquo;Setiap bingkai gambar merekam cerita indah perjalanan kami menuju hari bahagia.&rdquo;
            </p>
          </MotionItem>

          {/* Category Filter Pills with Motion Layout Indicator */}
          <MotionItem variant="pop">
            <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
              {[
                { id: 'all', label: 'Semua Momen' },
                { id: 'prewed', label: 'Prewedding' },
                { id: 'ceremony', label: 'Momen Bahagia' }
              ].map((cat) => {
                const isActive = categoryFilter === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryFilter(cat.id as 'all' | 'prewed' | 'ceremony')}
                    className={`relative min-h-[44px] px-5 py-2 rounded-full text-xs font-serif font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isActive
                        ? 'text-stone-950 font-bold'
                        : isDark
                        ? 'text-stone-300 hover:text-white bg-stone-800/80 border border-white/10'
                        : 'text-stone-700 hover:text-stone-900 bg-white/80 border border-amber-600/20'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeGalleryFilter"
                        className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-full shadow-md -z-10"
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </MotionItem>
        </StaggerContainer>

        {/* Gallery Grid with Motion Layout */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: (idx % 6) * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal Dialog with Swipe Gestures & Zoom */}
      <AnimatePresence>
        {selectedItemIndex !== null && (
          <motion.div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label="Penampil Galeri Foto HD"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 touch-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center w-full"
            >
              {/* Top Controls: Zoom & Close */}
              <div className="absolute -top-12 right-0 flex items-center gap-2 z-20">
                <button
                  type="button"
                  onClick={() => setIsZoomed((prev) => !prev)}
                  aria-label={isZoomed ? 'Perkecil foto' : 'Perbesar foto'}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center justify-center"
                >
                  {isZoomed ? <ZoomOut className="w-5 h-5 text-amber-300" /> : <ZoomIn className="w-5 h-5" />}
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Tutup foto"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-amber-300 transition-colors cursor-pointer flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Prev Button */}
              <button
                type="button"
                onClick={prevImage}
                aria-label="Foto sebelumnya"
                className="min-w-[44px] min-h-[44px] absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer border border-white/20 flex items-center justify-center z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={nextImage}
                aria-label="Foto berikutnya"
                className="min-w-[44px] min-h-[44px] absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer border border-white/20 flex items-center justify-center z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Active Image with Mobile Drag/Swipe Gesture */}
              <motion.div
                key={selectedItemIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 80) prevImage()
                  else if (info.offset.x < -80) nextImage()
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: isZoomed ? 1.6 : 1,
                  transition: { type: 'spring', damping: 20, stiffness: 240 }
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing"
              >
                <img
                  src={filteredGallery[selectedItemIndex].src}
                  alt={filteredGallery[selectedItemIndex].caption}
                  className="max-w-full max-h-[72vh] object-contain rounded-2xl border border-white/15 select-none pointer-events-none"
                />
              </motion.div>

              {/* Caption & Counter with Swipe Guidance */}
              <div className="mt-3.5 text-center text-white select-none">
                <p className="font-serif text-sm sm:text-base font-semibold drop-shadow">
                  {filteredGallery[selectedItemIndex].caption}
                </p>
                <div className="flex items-center justify-center gap-3 mt-1 text-[11px] text-stone-400">
                  <span className="text-amber-300 font-mono">
                    {selectedItemIndex + 1} dari {filteredGallery.length} Foto
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Geser kiri/kanan atau gunakan tombol panah</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
