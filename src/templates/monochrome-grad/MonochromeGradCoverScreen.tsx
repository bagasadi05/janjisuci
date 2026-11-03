import React, { useEffect, useState } from 'react'
import { GraduationCap, Camera } from 'lucide-react'
import confetti from 'canvas-confetti'

interface MonochromeGradCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
  guestName?: string
  graduateName?: string
  institutionName?: string
  dateText?: string
}

export const MonochromeGradCoverScreen: React.FC<MonochromeGradCoverScreenProps> = ({
  isOpen,
  onOpenWithAudio,
  guestName: propGuestName,
  graduateName = 'Nadine Aulia, S.Ds.',
  institutionName = 'Institut Teknologi Bandung (ITB)',
  dateText = 'Sabtu, 24 Oktober 2026'
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
        colors: ['#FFFFFF', '#D4AF37', '#71717A', '#A1A1AA', '#E4E4E7']
      })
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#FFFFFF', '#D4AF37', '#A1A1AA']
        })
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#FFFFFF', '#D4AF37', '#A1A1AA']
        })
      }, 160)
    } catch {
      // ignore
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#09090B] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/40 via-[#09090B] to-[#040405] pointer-events-none" />
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-white/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-zinc-500/10 blur-[120px] pointer-events-none" />

      {/* LUXURY LEFT EDITORIAL MONOCHROME SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-r border-white/20 bg-gradient-to-r from-[#040405] via-[#121215]/95 to-[#1C1C22]/90 backdrop-blur-md ${
          isAnimating ? '-translate-x-full -rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 right-4 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-3 text-white/30 font-mono text-xs tracking-widest select-none rotate-90">
          EDITORIAL VOL. 2026
        </div>
      </div>

      {/* LUXURY RIGHT EDITORIAL MONOCHROME SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-l border-white/20 bg-gradient-to-l from-[#040405] via-[#121215]/95 to-[#1C1C22]/90 backdrop-blur-md ${
          isAnimating ? 'translate-x-full rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 left-4 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-white/30 font-mono text-xs tracking-widest select-none -rotate-90">
          GRADUATION EDITION
        </div>
      </div>

      {/* Center Editorial Monochrome Card */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#141417]/85 backdrop-blur-2xl border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.95)] text-center text-white overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Corner decorative accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white/50 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-white/50 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-white/50 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white/50 rounded-br-lg pointer-events-none" />

        {/* Top Header Badge */}
        <div className="space-y-1 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-zinc-200 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-mono font-medium">
            <Camera className="w-3.5 h-3.5 text-zinc-100" />
            <span>Graduation Ceremony</span>
          </div>
        </div>

        {/* Graduate Name */}
        <div className="my-2 space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-extrabold tracking-tight drop-shadow-sm">
            {graduateName}
          </h1>
          <p className="text-xs text-zinc-300 font-sans tracking-wide">
            {institutionName}
          </p>
          <p className="text-xs text-zinc-400 font-mono tracking-wider">
            {dateText}
          </p>
        </div>

        {/* Center Frame */}
        <div className="relative my-3 flex justify-center">
          <div className="w-32 h-44 sm:w-36 sm:h-48 rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-white/40 via-zinc-600/20 to-transparent shadow-2xl shadow-black/90">
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1672839415384-95cdbcba77ee?auto=format&fit=crop&w=800&q=85"
                alt="Nadine Aulia Wisuda"
                className="w-full h-full object-cover object-center filter grayscale contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Guest Card */}
        <div className="my-3 py-3 px-4 rounded-xl bg-[#0B0B0D]/80 border border-white/15 shadow-inner text-center">
          <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-sans font-medium">
            Kepada Tamu Undangan / Pendamping:
          </p>
          <h2 className="text-base sm:text-lg font-serif text-white font-bold mt-0.5 tracking-wide">
            {guestName}
          </h2>
          <p className="text-[10px] text-zinc-400 mt-0.5 italic font-sans">
            Mohon hadir 30 menit sebelum prosesi dimulai
          </p>
        </div>

        {/* Open Button with Pulsing Glow */}
        <div className="relative inline-block mt-1">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-white via-zinc-200 to-amber-200 opacity-75 blur-md animate-pulse" aria-hidden="true" />
          <button
            type="button"
            onClick={handleOpenInvitation}
            aria-label="Buka undangan wisuda dan nyalakan musik"
            className="group relative inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 rounded-full bg-white hover:bg-zinc-100 text-stone-950 font-extrabold text-xs sm:text-sm tracking-wide shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <GraduationCap className="w-4 h-4 text-stone-950"  aria-hidden="true"/>
            <span className="tracking-wider uppercase font-semibold">Buka Undangan Wisuda</span>
          </button>
        </div>

        <p className="text-[10px] text-zinc-400 mt-3 font-sans">
          *Ketuk tombol untuk membuka gerbang auditorium & menyalakan musik
        </p>
      </div>
    </div>
  )
}
