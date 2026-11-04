import React, { useEffect, useState } from 'react'
import { Sparkles, MailOpen } from 'lucide-react'
import confetti from 'canvas-confetti'

interface EmeraldBotanicalCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
  guestName?: string
  babyName?: string
  babyArabicName?: string
  dateText?: string
  hijriDate?: string
}

export const EmeraldBotanicalCoverScreen: React.FC<EmeraldBotanicalCoverScreenProps> = ({
  isOpen,
  onOpenWithAudio,
  guestName: propGuestName,
  babyName = 'Muhammad Rayyan Al-Ghifari',
  babyArabicName = 'مُحَمَّد رَيَّان الْغِفَارِي',
  dateText = 'Ahad, 25 Juli 2027',
  hijriDate = '14 Muharram 1449 H'
}) => {
  const [guestName, setGuestName] = useState<string>(propGuestName || 'Tamu Undangan')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const to = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest')
    if (to && to.trim()) {
      try {
        setGuestName(decodeURIComponent(to.replace(/\+/g, ' ')))
      } catch {
        setGuestName(to.trim())
      }
    } else if (propGuestName) {
      setGuestName(propGuestName)
    }
  }, [propGuestName])

  const handleOpenInvitation = () => {
    onOpenWithAudio()
    setIsAnimating(true)

    try {
      // Jasmine petals & gold dust particle burst
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FFFFFF', '#FEF3C7', '#D1FAE5', '#D4AF37', '#849987', '#F59E0B']
      })

      setTimeout(() => {
        confetti({
          particleCount: 75,
          angle: 60,
          spread: 75,
          origin: { x: 0 },
          colors: ['#FFFFFF', '#D4AF37', '#D1FAE5', '#FEF3C7']
        })
        confetti({
          particleCount: 75,
          angle: 120,
          spread: 75,
          origin: { x: 1 },
          colors: ['#FFFFFF', '#D4AF37', '#849987', '#FEF3C7']
        })
      }, 180)
    } catch {
      // Ignore if canvas-confetti is unavailable
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#031A14] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0A4D3C]/40 via-[#062D23] to-[#02130F] pointer-events-none" />

      {/* Decorative ambient glowing orbs */}
      <div className="absolute -top-32 -left-20 w-88 h-88 rounded-full bg-emerald-600/15 blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-88 h-88 rounded-full bg-amber-500/15 blur-[110px] pointer-events-none" />

      {/* LEFT ANDALUSIAN SCALLOPED ARCH SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-r-2 border-amber-400/50 bg-gradient-to-r from-[#031A14] via-[#05291F]/95 to-[#083B2E]/90 backdrop-blur-md shadow-[10px_0_30px_rgba(0,0,0,0.8)] ${
          isAnimating ? '-translate-x-full -rotate-1' : 'translate-x-0 rotate-0'
        }`}
      >
        {/* Mashrabiya latticework watermark */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute inset-y-12 right-6 w-[1px] bg-gradient-to-b from-transparent via-amber-400/70 to-transparent" />
        <div className="absolute inset-y-24 right-10 w-[1px] bg-gradient-to-b from-transparent via-emerald-400/40 to-transparent" />
        
        {/* Arabesque floral ornament motif */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 text-amber-300/40 font-serif text-5xl select-none rotate-90">
          ۞
        </div>
        <div className="absolute top-1/4 right-5 text-amber-300/25 text-2xl select-none">
          ✧
        </div>
        <div className="absolute bottom-1/4 right-5 text-amber-300/25 text-2xl select-none">
          ✧
        </div>
      </div>

      {/* RIGHT ANDALUSIAN SCALLOPED ARCH SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-l-2 border-amber-400/50 bg-gradient-to-l from-[#031A14] via-[#05291F]/95 to-[#083B2E]/90 backdrop-blur-md shadow-[-10px_0_30px_rgba(0,0,0,0.8)] ${
          isAnimating ? 'translate-x-full rotate-1' : 'translate-x-0 rotate-0'
        }`}
      >
        {/* Mashrabiya latticework watermark */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute inset-y-12 left-6 w-[1px] bg-gradient-to-b from-transparent via-amber-400/70 to-transparent" />
        <div className="absolute inset-y-24 left-10 w-[1px] bg-gradient-to-b from-transparent via-emerald-400/40 to-transparent" />
        
        {/* Arabesque floral ornament motif */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 text-amber-300/40 font-serif text-5xl select-none -rotate-90">
          ۞
        </div>
        <div className="absolute top-1/4 left-5 text-amber-300/25 text-2xl select-none">
          ✧
        </div>
        <div className="absolute bottom-1/4 left-5 text-amber-300/25 text-2xl select-none">
          ✧
        </div>
      </div>

      {/* CENTER ROYAL EMERALD ENTRANCE CARD */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-[#062D23]/92 backdrop-blur-2xl border border-amber-400/40 shadow-[0_25px_70px_rgba(0,0,0,0.95)] text-center text-white overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Delicate Golden Corner Accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400/70 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400/70 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400/70 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400/70 rounded-br-lg pointer-events-none" />

        {/* Top Celebration Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#031F17]/90 border border-amber-400/35 text-amber-300 text-[11px] sm:text-xs uppercase tracking-[0.22em] font-serif font-medium shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
          <span>Walimatul Aqiqah & Tasmiyah 🌿</span>
        </div>

        {/* Sacred Bismillah Calligraphy */}
        <p className="font-serif text-base sm:text-lg text-amber-200/90 tracking-wide mb-1" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        {/* Baby Portrait with Moroccan Scalloped Arch Frame */}
        <div className="relative my-3 flex justify-center">
          <div className="relative w-28 h-36 sm:w-32 sm:h-42 rounded-t-[70px] rounded-b-2xl overflow-hidden p-1 bg-gradient-to-b from-amber-400/60 via-emerald-500/30 to-amber-400/20 shadow-2xl shadow-black/80">
            <div className="w-full h-full rounded-t-[66px] rounded-b-xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1656633702381-939966720da4?auto=format&fit=crop&w=800&q=80"
                alt={babyName}
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062D23]/80 via-transparent to-transparent" />
            </div>
          </div>
          {/* Subtle Golden Arch Halo */}
          <div className="absolute -inset-1 rounded-t-[74px] rounded-b-3xl border border-amber-400/20 pointer-events-none" />
        </div>

        {/* Baby Name Display */}
        <div className="my-2 space-y-0.5">
          <p className="font-serif text-sm sm:text-base text-amber-200/90 font-medium" dir="rtl">
            {babyArabicName}
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-semibold tracking-wide drop-shadow-sm">
            {babyName}
          </h1>
          <p className="text-[11px] sm:text-xs text-emerald-200/80 font-mono tracking-wider font-medium">
            {dateText} • {hijriDate}
          </p>
        </div>

        {/* Guest Greeting Plaque */}
        <div className="my-3 py-2.5 px-4 rounded-xl bg-[#032018]/85 border border-emerald-400/25 shadow-inner text-center">
          <p className="text-[10px] uppercase tracking-wider text-emerald-200/70 font-sans font-medium">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="text-base sm:text-lg font-serif text-amber-200 font-semibold mt-0.5 tracking-wide">
            {guestName}
          </h2>
          <p className="text-[10px] text-emerald-300/60 mt-0.5 italic font-sans">
            di Tempat
          </p>
        </div>

        {/* "Buka Undangan" Trigger Button with Pulsing Gold Aura */}
        <div className="relative inline-block mt-2">
          <span
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 opacity-75 blur-md animate-pulse"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={handleOpenInvitation}
            aria-label="Buka undangan aqiqah dan putar musik"
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-sans font-bold text-xs sm:text-sm tracking-wide shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <MailOpen className="w-4 h-4 text-slate-900 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
            <span className="tracking-wider uppercase font-semibold">Buka Undangan</span>
          </button>
        </div>

        {/* Gentle User Guidance */}
        <p className="text-[10px] text-emerald-200/50 mt-3 font-sans">
          *Sentuh tombol untuk membuka gerbang istana & menyalakan lantunan musik
        </p>
      </div>
    </div>
  )
}
