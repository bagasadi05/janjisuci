import React, { useEffect, useState } from 'react'
import { Sparkles, Ticket, Disc3, Heart } from 'lucide-react'
import confetti from 'canvas-confetti'

interface RetroEditorialCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
  guestName?: string
  celebrantName?: string
  ageText?: string
  dateText?: string
}

export const RetroEditorialCoverScreen: React.FC<RetroEditorialCoverScreenProps> = ({
  isOpen,
  onOpenWithAudio,
  guestName: propGuestName,
  celebrantName = 'Aurelia Clarissa',
  ageText = 'Sweet Seventeen • 17th Birthday',
  dateText = 'Sabtu, 14 Agustus 2027'
}) => {
  const [guestName, setGuestName] = useState<string>(propGuestName || 'Tamu Spesial')
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
      // First pastel retro confetti burst (Terracotta, Ochre, Sage, Cream, Gold)
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#C25E38', '#D97706', '#4D6A56', '#FEF3C7', '#F59E0B', '#FBF8F3']
      })

      // Secondary side bursts
      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
          colors: ['#C25E38', '#D97706', '#FEF3C7']
        })
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
          colors: ['#4D6A56', '#D97706', '#FBF8F3']
        })
      }, 180)
    } catch {
      // Ignore if canvas is unsupported
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1A1410] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background warm vintage lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3A261B]/60 via-[#1C140F] to-[#120D0A] pointer-events-none" />
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-[#C25E38]/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-[#D97706]/15 blur-[120px] pointer-events-none" />

      {/* LEFT VINTAGE EDITORIAL SLIDING ENVELOPE DOOR */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-r border-[#D97706]/30 bg-gradient-to-r from-[#1B140F] via-[#2A1E17]/95 to-[#38281E]/90 backdrop-blur-md ${
          isAnimating ? '-translate-x-full -rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-12 right-4 w-[1px] bg-gradient-to-b from-transparent via-[#D97706]/40 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-4 text-amber-200/25 font-serif italic text-4xl select-none rotate-90 tracking-widest">
          VOL. XVII
        </div>
      </div>

      {/* RIGHT VINTAGE EDITORIAL SLIDING ENVELOPE DOOR */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-l border-[#D97706]/30 bg-gradient-to-l from-[#1B140F] via-[#2A1E17]/95 to-[#38281E]/90 backdrop-blur-md ${
          isAnimating ? 'translate-x-full rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-12 left-4 w-[1px] bg-gradient-to-b from-transparent via-[#D97706]/40 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-4 text-amber-200/25 font-serif italic text-4xl select-none -rotate-90 tracking-widest">
          EST. 2010
        </div>
      </div>

      {/* CENTER EDITORIAL VIP PASS CARD */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-[#FBF8F3] border-2 border-[#E7DFD5] shadow-[0_30px_90px_rgba(0,0,0,0.85)] text-center text-[#1C1917] overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Holographic VIP Access Pass Sticker */}
        <div className="absolute -top-1 -right-1 z-30">
          <div className="relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-bl-2xl bg-gradient-to-r from-amber-300 via-rose-300 to-teal-300 text-stone-900 font-mono text-[10px] font-extrabold uppercase tracking-widest shadow-md border-b border-l border-white/70">
            <Ticket className="w-3.5 h-3.5 text-stone-900" aria-hidden="true" />
            <span>VIP PASS • 17</span>
          </div>
        </div>

        {/* Vintage Paper Border Lines */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C25E38]/50 rounded-tl pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C25E38]/50 rounded-bl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C25E38]/50 rounded-br pointer-events-none" />

        {/* Masthead Header */}
        <div className="pt-2 pb-1 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FEF3C7] border border-[#D97706]/30 text-[#92400E] text-[10px] uppercase font-mono tracking-widest font-semibold">
            <Disc3 className="w-3 h-3 text-[#D97706] animate-spin" aria-hidden="true" />
            <span>SPECIAL ARCHIVE EDITION</span>
          </div>
          <h1 className="font-serif italic text-2xl sm:text-3xl text-[#C25E38] font-bold tracking-[0.18em] uppercase pt-1">
            THE SEVENTEEN ISSUE
          </h1>
          <p className="text-[11px] font-mono text-[#78716C] tracking-widest uppercase">
            {dateText} • SPECIAL CELEBRATION
          </p>
        </div>

        {/* Celebrant Polaroid Portrait */}
        <div className="relative my-4 flex justify-center">
          <div className="relative bg-white p-2.5 pb-4 rounded-xl shadow-lg border border-stone-200/90 rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300 max-w-[210px]">
            {/* Washi Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-0.5 bg-[#FEF3C7]/90 border border-dashed border-[#F59E0B]/60 text-[9px] font-mono text-amber-900 uppercase tracking-widest shadow-xs">
              MOMENT DE RETRO
            </div>

            <div className="w-44 h-48 rounded-lg overflow-hidden bg-stone-100 relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85"
                alt={celebrantName}
                className="w-full h-full object-cover object-center filter sepia-[0.1] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="pt-2 text-center">
              <p className="font-pinyon text-2xl sm:text-3xl text-[#C25E38] leading-none">
                {celebrantName}
              </p>
              <p className="text-[10px] font-mono text-stone-500 tracking-wider mt-0.5">
                {ageText}
              </p>
            </div>
          </div>
        </div>

        {/* Guest Greeting Card */}
        <div className="my-3 py-3 px-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs text-center space-y-1">
          <p className="text-[10px] uppercase font-mono tracking-wider text-[#78716C]">
            Spesial Diserahkan Kepada Yth:
          </p>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1C1917] tracking-wide">
            {guestName}
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-[#4D6A56] font-medium pt-0.5">
            <Sparkles className="w-3 h-3 text-[#D97706]" aria-hidden="true" />
            <span>AKSES VIP RESMI • SWEET SEVENTEEN</span>
          </div>
        </div>

        {/* Open Button with Pulse Glow */}
        <div className="relative inline-block mt-1">
          <button
            type="button"
            onClick={handleOpenInvitation}
            aria-label="Buka undangan retro editorial dan putar musik"
            className="group relative inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-[#C25E38] via-[#D97706] to-[#C25E38] text-white font-sans font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C25E38]"
          >
            <Heart className="w-4 h-4 text-rose-200 fill-rose-200 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
            <span className="tracking-widest font-semibold">Buka Undangan</span>
          </button>
        </div>

        <p className="text-[10px] text-[#78716C] mt-3 font-mono">
          *Ketuk untuk membuka lembaran majalah & memutar lagu pesta
        </p>
      </div>
    </div>
  )
}
