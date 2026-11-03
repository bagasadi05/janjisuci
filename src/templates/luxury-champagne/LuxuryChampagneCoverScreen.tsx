import React, { useEffect, useState } from 'react'
import { Sparkles, Calendar } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useInvitationData } from '../../context/InvitationContext'

interface LuxuryChampagneCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
}

export const LuxuryChampagneCoverScreen: React.FC<LuxuryChampagneCoverScreenProps> = ({
  isOpen,
  onOpenWithAudio
}) => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const [guestName, setGuestName] = useState<string>('Tamu Undangan')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const to = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest')
    if (to) {
      setGuestName(decodeURIComponent(to.replace(/\+/g, ' ')))
    }
  }, [])

  const handleOpenInvitation = () => {
    // CRITICAL: Call synchronously for audio autoplay policy
    onOpenWithAudio()
    setIsAnimating(true)

    try {
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#F3E5AB', '#FFFFFF', '#FAF9F6', '#B8860B']
      })
    } catch {
      // ignore
    }
  }

  if (isOpen && !isAnimating) return null

  const groomInitial = weddingData.couple.groom.shortName.charAt(0) || 'K'
  const brideInitial = weddingData.couple.bride.shortName.charAt(0) || 'C'

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Image with High Contrast Editorial Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage}
          alt="Editorial Wedding Cover"
          className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-[0.25] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/75 to-[#0A0A0A]/90" />
      </div>

      {/* TOP CURTAIN SLICE */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#D4AF37]/30 z-10 transition-transform duration-1000 ease-in-out flex items-end justify-center pb-4 ${
          isAnimating ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-stone-500 font-sans">
          KOLEKSI EDITORIAL MEWAH • EDISI KHUSUS
        </span>
      </div>

      {/* BOTTOM CURTAIN SLICE */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#D4AF37]/30 z-10 transition-transform duration-1000 ease-in-out flex items-start justify-center pt-4 ${
          isAnimating ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-stone-500 font-sans">
          OKTOBER 2026 • PERAYAAN CINTA SEJATI
        </span>
      </div>

      {/* CENTER EDITORIAL CARD */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-10 rounded-2xl bg-[#121212]/90 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-[0_30px_70px_rgba(0,0,0,0.9)] text-center text-white overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Editorial Top Eyebrow */}
        <div className="space-y-1 mb-6">
          <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#D4AF37] font-semibold">
            UNDANGAN PERNIKAHAN RESMI
          </p>
          <div className="h-[1px] w-16 bg-[#D4AF37]/50 mx-auto mt-2" />
        </div>

        {/* Big Monogram */}
        <div className="my-2">
          <div className="w-20 h-20 mx-auto rounded-full border border-[#D4AF37]/60 flex items-center justify-center font-serif text-3xl font-light text-[#D4AF37] tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            {groomInitial}&{brideInitial}
          </div>
        </div>

        {/* Couple Names */}
        <div className="my-5 space-y-1.5">
          <h1 className="font-serif text-3xl sm:text-4xl font-extralight tracking-wide text-white uppercase">
            {weddingData.couple.groom.shortName} <span className="font-script text-4xl text-[#D4AF37] lowercase px-1">&</span> {weddingData.couple.bride.shortName}
          </h1>
          <p className="font-sans text-xs tracking-widest text-stone-400 uppercase">
            {weddingData.events.akad.date}
          </p>
        </div>

        {/* Personalized Guest Badge */}
        <div className="my-6 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">
            UNDANGAN EKSKLUSIF KEPADA:
          </p>
          <p className="font-serif text-base font-semibold text-[#D4AF37] tracking-wider uppercase">
            {guestName}
          </p>
        </div>

        {/* Reveal Button */}
        <button
          type="button"
          onClick={handleOpenInvitation}
          className="w-full py-4 px-6 rounded-none bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-stone-950 font-sans font-bold text-xs uppercase tracking-[0.25em] shadow-[0_10px_25px_rgba(212,175,55,0.3)] transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-stone-950" />
          <span>BUKA UNDANGAN</span>
        </button>
      </div>
    </div>
  )
}
