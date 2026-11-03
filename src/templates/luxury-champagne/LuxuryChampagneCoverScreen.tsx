import React, { useEffect, useState } from 'react'
import { Sparkles, MailOpen } from 'lucide-react'
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
    onOpenWithAudio()
    setIsAnimating(true)

    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.62 },
        colors: ['#D4AF37', '#F3E5AB', '#FFFFFF', '#FAF9F6', '#B8860B', '#E5C058']
      })
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#D4AF37', '#F3E5AB', '#FFFFFF']
        })
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#D4AF37', '#F3E5AB', '#FFFFFF']
        })
      }, 160)
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

      {/* LUXURY LEFT CHAMPAGNE GOLD SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-r border-[#D4AF37]/40 bg-gradient-to-r from-[#0A0A0A] via-[#1A1813]/95 to-[#2E281C]/90 backdrop-blur-md ${
          isAnimating ? '-translate-x-full -rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 right-4 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-3 text-[#D4AF37]/30 font-serif text-5xl select-none rotate-90">
          ✦
        </div>
      </div>

      {/* LUXURY RIGHT CHAMPAGNE GOLD SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-l border-[#D4AF37]/40 bg-gradient-to-l from-[#0A0A0A] via-[#1A1813]/95 to-[#2E281C]/90 backdrop-blur-md ${
          isAnimating ? 'translate-x-full rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 left-4 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-[#D4AF37]/30 font-serif text-5xl select-none -rotate-90">
          ✦
        </div>
      </div>

      {/* CENTER EDITORIAL CARD */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#141414]/85 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] text-center text-white overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Editorial Top Eyebrow */}
        <div className="space-y-1 mb-4">
          <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#D4AF37] font-semibold">
            KOLEKSI EDITORIAL MEWAH • EDISI KHUSUS
          </p>
          <div className="h-[1px] w-16 bg-[#D4AF37]/50 mx-auto mt-2" />
        </div>

        {/* Big Monogram */}
        <div className="my-2">
          <div className="w-16 h-16 mx-auto rounded-full border border-[#D4AF37]/60 flex items-center justify-center font-serif text-2xl font-light text-[#D4AF37] tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            {groomInitial}&amp;{brideInitial}
          </div>
        </div>

        {/* Couple Names */}
        <div className="my-4 space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl font-extralight tracking-wide text-white uppercase">
            {weddingData.couple.groom.shortName} <span className="font-script text-3xl text-[#D4AF37] lowercase px-1">&amp;</span> {weddingData.couple.bride.shortName}
          </h1>
          <p className="font-sans text-xs tracking-widest text-stone-400 uppercase">
            {weddingData.events.akad.date}
          </p>
        </div>

        {/* Personalized Guest Badge */}
        <div className="my-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
          <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">
            UNDANGAN EKSKLUSIF KEPADA:
          </p>
          <p className="font-serif text-base font-semibold text-[#D4AF37] tracking-wider uppercase">
            {guestName}
          </p>
        </div>

        {/* Reveal Button */}
        <div className="relative inline-block mt-1 w-full">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] opacity-75 blur-md animate-pulse" aria-hidden="true" />
          <button
            type="button"
            onClick={handleOpenInvitation}
            aria-label="Buka undangan dan nyalakan musik"
            className="group relative w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-stone-950 font-sans font-bold text-xs uppercase tracking-[0.25em] shadow-[0_10px_25px_rgba(212,175,55,0.3)] transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer flex items-center justify-center gap-2 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <MailOpen className="w-4 h-4 text-stone-950"  aria-hidden="true"/>
            <span>BUKA UNDANGAN</span>
          </button>
        </div>

        <p className="text-[10px] text-stone-400 mt-4 font-sans">
          *Ketuk tombol untuk membuka gerbang champagne &amp; menyalakan musik
        </p>
      </div>
    </div>
  )
}
