import React, { useEffect, useState } from 'react'
import { Heart, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

interface SweetBlossomCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
  guestName?: string
  babyName?: string
  dateText?: string
}

export const SweetBlossomCoverScreen: React.FC<SweetBlossomCoverScreenProps> = ({
  isOpen,
  onOpenWithAudio,
  guestName: propGuestName,
  babyName = 'Shafiyyah Almahyra',
  dateText = 'Sabtu, 08 Agustus 2026'
}) => {
  const [guestName, setGuestName] = useState<string>(propGuestName || 'Tamu Undangan')
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
        colors: ['#FB7185', '#F43F5E', '#FDE047', '#FDA4AF', '#FFFFFF']
      })
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#FB7185', '#FDE047', '#FFFFFF']
        })
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#FB7185', '#FDE047', '#FFFFFF']
        })
      }, 160)
    } catch {
      // ignore
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#170509] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/40 via-[#2B0E14] to-[#170509] pointer-events-none" />
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-rose-400/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-amber-400/10 blur-[100px] pointer-events-none" />

      {/* LUXURY LEFT BLOSSOM TRELLIS SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-r border-rose-400/40 bg-gradient-to-r from-[#170509] via-[#381119]/95 to-[#4D1722]/90 backdrop-blur-md ${
          isAnimating ? '-translate-x-full -rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 right-4 w-[1px] bg-gradient-to-b from-transparent via-rose-300/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-3 text-rose-300/35 font-serif text-5xl select-none rotate-90">
          🌸
        </div>
      </div>

      {/* LUXURY RIGHT BLOSSOM TRELLIS SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-l border-rose-400/40 bg-gradient-to-l from-[#170509] via-[#381119]/95 to-[#4D1722]/90 backdrop-blur-md ${
          isAnimating ? 'translate-x-full rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 left-4 w-[1px] bg-gradient-to-b from-transparent via-rose-300/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-rose-300/35 font-serif text-5xl select-none -rotate-90">
          🌸
        </div>
      </div>

      {/* Center Sweet Blossom Palace Card */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#36111A]/85 backdrop-blur-2xl border border-rose-400/40 shadow-[0_30px_70px_rgba(0,0,0,0.9)] text-center text-white overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Corner decorative accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-rose-400/60 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-rose-400/60 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-300/60 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-300/60 rounded-br-lg pointer-events-none" />

        {/* Top Header Badge */}
        <div className="space-y-1 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-400/30 text-rose-200 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-serif font-medium">
            <span>🌸</span>
            <span>Tasyakuran Aqiqah Putri</span>
          </div>
        </div>

        {/* Baby Name */}
        <div className="my-2 space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-200 to-amber-200 font-bold tracking-wide drop-shadow-sm">
            {babyName}
          </h1>
          <p className="text-xs text-rose-200/80 font-serif italic">
            Tasyakuran Kelahiran &amp; Doa Tasmiyah
          </p>
          <p className="text-xs text-rose-300/80 font-mono tracking-wider">
            {dateText}
          </p>
        </div>

        {/* Center Frame */}
        <div className="relative my-3 flex justify-center">
          <div className="w-32 h-44 sm:w-36 sm:h-48 rounded-2xl overflow-hidden p-1.5 bg-gradient-to-b from-rose-400/50 via-pink-400/25 to-transparent shadow-2xl shadow-black/80">
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1564172420073-e553c280b6f7?auto=format&fit=crop&w=800&q=85"
                alt="Shafiyyah Aqiqah"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B0E14]/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Guest Card */}
        <div className="my-3 py-3 px-4 rounded-xl bg-[#230910]/80 border border-rose-400/25 shadow-inner text-center">
          <p className="text-[10px] uppercase tracking-wider text-rose-300/70 font-sans font-medium">
            Kepada Yth. Tamu Undangan / Kerabat:
          </p>
          <h2 className="text-base sm:text-lg font-serif text-white font-bold mt-0.5 tracking-wide">
            {guestName}
          </h2>
          <p className="text-[10px] text-rose-200/60 mt-0.5 italic font-sans">
            Mohon doa restu untuk putri kecil kami
          </p>
        </div>

        {/* Open Button with Pulsing Glow */}
        <div className="relative inline-block mt-1">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 opacity-75 blur-md animate-pulse" />
          <button
            onClick={handleOpenInvitation}
            className="group relative inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 text-stone-950 font-serif font-bold text-xs sm:text-sm tracking-wide shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>🎀</span>
            <span className="tracking-wider uppercase font-semibold">Buka Undangan Aqiqah</span>
          </button>
        </div>

        <p className="text-[10px] text-rose-200/50 mt-3 font-sans">
          *Ketuk tombol untuk membuka taman bunga & menyalakan musik
        </p>
      </div>
    </div>
  )
}
