import React, { useEffect, useState } from 'react'
import { Sparkles, Gift } from 'lucide-react'
import confetti from 'canvas-confetti'

interface ConfettiBirthdayCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
  guestName?: string
  celebrantName?: string
  ageText?: string
  dateText?: string
}

export const ConfettiBirthdayCoverScreen: React.FC<ConfettiBirthdayCoverScreenProps> = ({
  isOpen,
  onOpenWithAudio,
  guestName: propGuestName,
  celebrantName = 'Hayden Arvy',
  ageText = '5th Birthday Party',
  dateText = 'Sabtu, 15 Agustus 2026'
}) => {
  const [guestName, setGuestName] = useState<string>(propGuestName || 'Sahabat Cilik')
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
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#EC4899', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#FFFFFF']
      })
      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
          colors: ['#EC4899', '#FBBF24', '#60A5FA']
        })
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
          colors: ['#EC4899', '#FBBF24', '#60A5FA']
        })
      }, 180)
    } catch {
      // ignore
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#080D1A] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-600/30 via-[#0F172A] to-[#080D1A] pointer-events-none" />
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-pink-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-sky-500/20 blur-[100px] pointer-events-none" />

      {/* LUXURY LEFT BIRTHDAY CURTAIN GATE */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-r border-pink-400/40 bg-gradient-to-r from-[#080D1A] via-[#1E1128]/95 to-[#2E1236]/90 backdrop-blur-md ${
          isAnimating ? '-translate-x-full -rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 right-4 w-[1px] bg-gradient-to-b from-transparent via-pink-400/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-3 text-pink-300/35 font-serif text-5xl select-none rotate-90">
          🎈
        </div>
      </div>

      {/* LUXURY RIGHT BIRTHDAY CURTAIN GATE */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-l border-sky-400/40 bg-gradient-to-l from-[#080D1A] via-[#0E1E36]/95 to-[#132A4C]/90 backdrop-blur-md ${
          isAnimating ? 'translate-x-full rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 left-4 w-[1px] bg-gradient-to-b from-transparent via-sky-400/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-sky-300/35 font-serif text-5xl select-none -rotate-90">
          🎁
        </div>
      </div>

      {/* Center Birthday Celebration Card */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#111C38]/85 backdrop-blur-2xl border border-pink-400/40 shadow-[0_30px_70px_rgba(0,0,0,0.9)] text-center text-white overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Corner decorative accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-pink-400/60 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-pink-400/60 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-sky-400/60 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-sky-400/60 rounded-br-lg pointer-events-none" />

        {/* Top Header Badge */}
        <div className="space-y-1 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>You Are Invited! 🎉</span>
          </div>
        </div>

        {/* Celebrant Name */}
        <div className="my-2 space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-sky-300 font-bold tracking-wide drop-shadow-sm">
            {celebrantName}
          </h1>
          <div className="inline-block px-3 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-xs text-amber-200 font-bold font-mono">
            {ageText}
          </div>
          <p className="text-xs text-sky-200/80 font-mono tracking-wider font-medium">
            {dateText}
          </p>
        </div>

        {/* Center Frame */}
        <div className="relative my-3 flex justify-center">
          <div className="w-32 h-44 sm:w-36 sm:h-48 rounded-2xl overflow-hidden p-1.5 bg-gradient-to-tr from-pink-500 via-amber-400 to-sky-400 shadow-2xl shadow-black/80">
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1544155891-969f15a055d3?auto=format&fit=crop&w=800&q=85"
                alt="Birthday Party"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Guest Card */}
        <div className="my-3 py-3 px-4 rounded-xl bg-[#081226]/80 border border-pink-400/25 shadow-inner text-center">
          <p className="text-[10px] uppercase tracking-wider text-sky-200/70 font-sans font-medium">
            Spesial Untuk Sahabat:
          </p>
          <h2 className="text-base sm:text-lg font-serif text-white font-bold mt-0.5 tracking-wide">
            {guestName}
          </h2>
          <p className="text-[10px] text-pink-200/60 mt-0.5 italic font-sans">
            Yuk rayakan pesta ulang tahun penuh keceriaan!
          </p>
        </div>

        {/* Open Button with Pulsing Glow */}
        <div className="relative inline-block mt-1">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 opacity-75 blur-md animate-pulse" />
          <button
            onClick={handleOpenInvitation}
            className="group relative inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-bold text-xs sm:text-sm tracking-wide shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Gift className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300 animate-bounce" />
            <span className="tracking-wider uppercase font-semibold">Buka Kotak Undangan 🎁</span>
          </button>
        </div>

        <p className="text-[10px] text-sky-200/50 mt-3 font-sans">
          *Ketuk tombol untuk membuka kotak hadiah & menyalakan musik
        </p>
      </div>
    </div>
  )
}
