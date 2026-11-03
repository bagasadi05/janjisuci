import React, { useEffect, useState } from 'react'
import { Sparkles, Compass } from 'lucide-react'
import confetti from 'canvas-confetti'

interface JungleSafariCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
  guestName?: string
  celebrantName?: string
  ageText?: string
  dateText?: string
}

export const JungleSafariCoverScreen: React.FC<JungleSafariCoverScreenProps> = ({
  isOpen,
  onOpenWithAudio,
  guestName: propGuestName,
  celebrantName = 'Kenzo Dirgantara',
  ageText = 'Turning 3rd Birthday!',
  dateText = 'Minggu, 18 Oktober 2026'
}) => {
  const [guestName, setGuestName] = useState<string>(propGuestName || 'Teman Petualang')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const to = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest')
    if (to) {
      setGuestName(decodeURIComponent(to.replace(/\+/g, ' ')))
    } else if (propGuestName) {
      setGuestName(propGuestName)
    }
  }, [propGuestName])

  const handleOpenInvitation = () => {
    onOpenWithAudio()
    setIsAnimating(true)

    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.62 },
        colors: ['#84CC16', '#F59E0B', '#10B981', '#EAB308', '#FFFFFF']
      })
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#84CC16', '#F59E0B', '#FFFFFF']
        })
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#84CC16', '#F59E0B', '#FFFFFF']
        })
      }, 160)
    } catch {
      // ignore
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0A140D] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-[#132317] to-[#0A140D] pointer-events-none" />
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-amber-500/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-lime-500/15 blur-[100px] pointer-events-none" />

      {/* LUXURY LEFT JUNGLE MONSTERA SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-r border-amber-400/40 bg-gradient-to-r from-[#0A140D] via-[#152B1B]/95 to-[#1F3D27]/90 backdrop-blur-md ${
          isAnimating ? '-translate-x-full -rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 right-4 w-[1px] bg-gradient-to-b from-transparent via-lime-400/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-3 text-lime-300/35 font-serif text-5xl select-none rotate-90">
          🌿
        </div>
      </div>

      {/* LUXURY RIGHT JUNGLE MONSTERA SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-l border-amber-400/40 bg-gradient-to-l from-[#0A140D] via-[#152B1B]/95 to-[#1F3D27]/90 backdrop-blur-md ${
          isAnimating ? 'translate-x-full rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 left-4 w-[1px] bg-gradient-to-b from-transparent via-lime-400/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-lime-300/35 font-serif text-5xl select-none -rotate-90">
          🦁
        </div>
      </div>

      {/* Center Safari Adventure Card */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#172D1E]/85 backdrop-blur-2xl border border-lime-400/40 shadow-[0_30px_70px_rgba(0,0,0,0.9)] text-center text-white overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Corner decorative accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-lime-400/60 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-lime-400/60 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-400/60 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg pointer-events-none" />

        {/* Top Header Badge */}
        <div className="space-y-1 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs tracking-widest uppercase font-sans font-bold shadow-sm">
            <span>🦁</span>
            <span>Jungle Safari Birthday</span>
          </div>
        </div>

        {/* Celebrant Name */}
        <div className="my-2 space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-lime-200 font-extrabold tracking-wide drop-shadow-sm">
            {celebrantName}
          </h1>
          <div className="inline-block px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
            {ageText}
          </div>
          <p className="text-xs text-emerald-200/80 font-mono tracking-wider">
            {dateText}
          </p>
        </div>

        {/* Center Photo */}
        <div className="relative my-3 flex justify-center">
          <div className="w-32 h-44 sm:w-36 sm:h-48 rounded-2xl overflow-hidden p-1.5 bg-gradient-to-b from-amber-400/50 via-lime-400/30 to-emerald-900 shadow-2xl shadow-black/80">
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1772724317403-63337bf58fff?auto=format&fit=crop&w=800&q=85"
                alt="Kenzo Birthday"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132317]/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Guest Greeting */}
        <div className="my-3 py-3 px-4 rounded-xl bg-[#0D1C12]/80 border border-emerald-500/25 shadow-inner text-center">
          <p className="text-[10px] uppercase tracking-wider text-emerald-300/80 font-sans font-medium">
            Kepada Teman Petualang:
          </p>
          <h2 className="text-base sm:text-lg font-serif text-white font-bold mt-0.5 tracking-wide">
            {guestName}
          </h2>
          <p className="text-[10px] text-emerald-200/60 mt-0.5 italic font-sans">
            Yuk berpetualang seru di pesta ulang tahun Kenzo!
          </p>
        </div>

        {/* Open Button with Pulsing Glow */}
        <div className="relative inline-block mt-1">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-lime-400 opacity-75 blur-md animate-pulse" aria-hidden="true" />
          <button
            type="button"
            onClick={handleOpenInvitation}
            aria-label="Buka undangan pesta safari dan nyalakan musik"
            className="group relative inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-lime-400 text-stone-950 font-extrabold text-xs sm:text-sm tracking-wide shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
          >
            <span aria-hidden="true">🌿</span>
            <span className="tracking-wider uppercase font-semibold">Buka Undangan Pesta</span>
          </button>
        </div>

        <p className="text-[10px] text-emerald-200/50 mt-3 font-sans">
          *Ketuk tombol untuk membuka gerbang rimba & menyalakan musik
        </p>
      </div>
    </div>
  )
}
