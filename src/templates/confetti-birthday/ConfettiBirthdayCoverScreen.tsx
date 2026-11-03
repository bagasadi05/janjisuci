import React from 'react'
import { Sparkles, Gift } from 'lucide-react'
import confetti from 'canvas-confetti'

interface ConfettiBirthdayCoverScreenProps {
  onOpen: () => void
  guestName: string
  celebrantName?: string
  ageText?: string
  dateText?: string
}

export const ConfettiBirthdayCoverScreen: React.FC<ConfettiBirthdayCoverScreenProps> = ({
  onOpen,
  guestName,
  celebrantName = 'Hayden Arvy',
  ageText = '5th Birthday Party',
  dateText = 'Sabtu, 15 Agustus 2026'
}) => {
  const handleOpenWithConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    })
    onOpen()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B132B] text-white overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-600/25 via-[#0F172A] to-[#080D1A] pointer-events-none" />
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-pink-500/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-sky-500/20 blur-[100px] pointer-events-none" />

      {/* Outer borders */}
      <div className="absolute inset-3 sm:inset-5 border border-pink-400/30 rounded-3xl pointer-events-none" />
      <div className="absolute inset-4 sm:inset-6 border border-sky-400/20 rounded-2xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col items-center text-center justify-between min-h-[90vh] max-h-[780px]">
        {/* Top Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs tracking-widest uppercase font-mono">
            <Sparkles className="w-3 h-3 text-pink-400" />
            <span>You Are Invited! 🎉</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-sky-300 font-bold tracking-wide">
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
        <div className="relative my-3">
          <div className="w-44 h-56 sm:w-48 sm:h-60 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-pink-500 via-amber-400 to-sky-400 shadow-2xl shadow-black/80">
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=85"
                alt="Birthday Party"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
            </div>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0F172A] border border-pink-400/40 text-[10px] text-pink-200 font-mono tracking-wider shadow-md">
            Birthday Celebration
          </div>
        </div>

        {/* Bottom Guest Greeting & Open Button */}
        <div className="w-full space-y-4">
          <div className="rounded-2xl bg-[#1E293B]/90 border border-pink-400/25 p-4 shadow-lg backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-wider text-sky-200/70 font-sans font-medium">
              Spesial Untuk Sahabat:
            </p>
            <h2 className="text-lg sm:text-xl font-serif text-white font-bold mt-1 tracking-wide">
              {guestName}
            </h2>
            <p className="text-[10px] text-slate-300 mt-1 italic font-sans">
              Yuk rayakan pesta ulang tahun penuh keceriaan bersama kami!
            </p>
          </div>

          <button
            onClick={handleOpenWithConfetti}
            className="group relative w-full sm:w-auto mx-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-bold text-sm shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)] transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
          >
            <Gift className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300 animate-bounce" />
            <span className="tracking-wide">Buka Kotak Undangan 🎁</span>
          </button>
        </div>
      </div>
    </div>
  )
}
