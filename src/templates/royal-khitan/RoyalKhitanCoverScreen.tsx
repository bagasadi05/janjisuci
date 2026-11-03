import React, { useEffect, useState } from 'react'
import { Sparkles, MailOpen } from 'lucide-react'
import confetti from 'canvas-confetti'

interface RoyalKhitanCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
  guestName?: string
  childName?: string
  dateText?: string
}

export const RoyalKhitanCoverScreen: React.FC<RoyalKhitanCoverScreenProps> = ({
  isOpen,
  onOpenWithAudio,
  guestName: propGuestName,
  childName = 'Muhammad Rizky Pratama',
  dateText = 'Minggu, 12 Juli 2026'
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
        colors: ['#10B981', '#F59E0B', '#D4AF37', '#064E3B', '#FFFFFF']
      })
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#D4AF37', '#10B981', '#FFFFFF']
        })
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#D4AF37', '#10B981', '#FFFFFF']
        })
      }, 160)
    } catch {
      // ignore
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#01120D] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800/35 via-[#032219] to-[#01120D] pointer-events-none" />

      {/* Decorative emerald & amber orbs */}
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-amber-500/15 blur-[100px] pointer-events-none" />

      {/* LUXURY LEFT ISLAMIC ARCH SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-r border-amber-400/40 bg-gradient-to-r from-[#01120D] via-[#03291F]/95 to-[#063B2C]/90 backdrop-blur-md ${
          isAnimating ? '-translate-x-full -rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 right-4 w-[1px] bg-gradient-to-b from-transparent via-amber-400/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-3 text-amber-300/35 font-serif text-5xl select-none rotate-90">
          ۞
        </div>
      </div>

      {/* LUXURY RIGHT ISLAMIC ARCH SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-l border-amber-400/40 bg-gradient-to-l from-[#01120D] via-[#03291F]/95 to-[#063B2C]/90 backdrop-blur-md ${
          isAnimating ? 'translate-x-full rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 left-4 w-[1px] bg-gradient-to-b from-transparent via-amber-400/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-amber-300/35 font-serif text-5xl select-none -rotate-90">
          ۞
        </div>
      </div>

      {/* Center Islamic Moroccan Palace Card */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#042A20]/85 backdrop-blur-2xl border border-amber-400/50 shadow-[0_30px_70px_rgba(0,0,0,0.9)] text-center text-white overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Corner decorative accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-400/60 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-400/60 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg pointer-events-none" />

        {/* Top Header Badge */}
        <div className="space-y-1 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-amber-300/30 text-amber-200 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-serif font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300"  aria-hidden="true"/>
            <span>Walimatul Khitan Barakah</span>
          </div>
        </div>

        {/* Child Name */}
        <div className="my-2 space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-semibold tracking-wide drop-shadow-sm">
            {childName}
          </h1>
          <p className="text-xs text-emerald-200/80 font-mono tracking-wider font-medium">
            {dateText}
          </p>
        </div>

        {/* Center Islamic Arch Image Frame */}
        <div className="relative my-3 flex justify-center">
          <div className="w-32 h-44 sm:w-36 sm:h-48 rounded-t-full rounded-b-xl overflow-hidden p-1 bg-gradient-to-b from-amber-400/40 via-emerald-500/20 to-transparent shadow-2xl shadow-black/80">
            <div className="w-full h-full rounded-t-full rounded-b-lg overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1720238281687-dcc6d8a6e7d4?auto=format&fit=crop&crop=top,right&w=800&h=800&q=85"
                alt="Khitanan"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#032219]/90 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Guest Card */}
        <div className="my-3 py-3 px-4 rounded-xl bg-[#031B15]/80 border border-emerald-400/25 shadow-inner text-center">
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

        {/* Open Button with Pulsing Gold Glow */}
        <div className="relative inline-block mt-1">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 opacity-75 blur-md animate-pulse" aria-hidden="true" />
          <button
            type="button"
            onClick={handleOpenInvitation}
            aria-label="Buka undangan khitan dan nyalakan musik"
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-sans font-bold text-xs sm:text-sm tracking-wide shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <MailOpen className="w-4 h-4 text-slate-900 transition-transform group-hover:-translate-y-0.5"  aria-hidden="true"/>
            <span className="tracking-wider uppercase font-semibold">Buka Undangan</span>
          </button>
        </div>

        <p className="text-[10px] text-emerald-200/50 mt-3 font-sans">
          *Ketuk tombol untuk membuka pintu gerbang & menyalakan musik
        </p>
      </div>
    </div>
  )
}
