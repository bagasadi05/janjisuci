import React from 'react'
import { Sparkles, Heart } from 'lucide-react'

interface LittleStarAqiqahCoverScreenProps {
  onOpen: () => void
  guestName: string
  babyName?: string
  dateText?: string
}

export const LittleStarAqiqahCoverScreen: React.FC<LittleStarAqiqahCoverScreenProps> = ({
  onOpen,
  guestName,
  babyName = 'Kinan Althafunnisa',
  dateText = 'Minggu, 24 Mei 2026'
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F1F5F9] text-slate-800 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200/50 via-[#F8FAFC] to-[#EFF6FF] pointer-events-none" />
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-sky-300/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-amber-200/30 blur-[100px] pointer-events-none" />

      {/* Outer borders */}
      <div className="absolute inset-3 sm:inset-5 border border-sky-300/40 rounded-3xl pointer-events-none" />
      <div className="absolute inset-4 sm:inset-6 border border-amber-300/30 rounded-2xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col items-center text-center justify-between min-h-[90vh] max-h-[780px]">
        {/* Top Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border border-sky-300/60 text-sky-800 text-xs tracking-widest uppercase font-serif">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Tasyakuran Aqiqah</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-slate-800 font-bold tracking-wide">
            {babyName}
          </h1>

          <p className="text-xs text-slate-500 font-mono tracking-wider font-medium">
            {dateText}
          </p>
        </div>

        {/* Center Frame */}
        <div className="relative my-3">
          <div className="w-44 h-56 sm:w-48 sm:h-60 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-sky-300 via-amber-200 to-sky-200 shadow-xl">
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=85"
                alt="Bayi Aqiqah"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
            </div>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-white border border-sky-300/60 text-[10px] text-sky-800 font-serif tracking-wider shadow-md">
            Aqiqah &amp; Tasmiyah
          </div>
        </div>

        {/* Bottom Guest Greeting & Open Button */}
        <div className="w-full space-y-4">
          <div className="rounded-2xl bg-white/95 border border-sky-200 p-4 shadow-lg backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-sans font-medium">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <h2 className="text-lg sm:text-xl font-serif text-slate-800 font-bold mt-1 tracking-wide">
              {guestName}
            </h2>
            <p className="text-[10px] text-slate-500 mt-1 italic font-sans">
              Mohon maaf apabila ada kesalahan penulisan nama/gelar
            </p>
          </div>

          <button
            onClick={onOpen}
            className="group relative w-full sm:w-auto mx-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(2,132,199,0.35)] hover:shadow-[0_0_30px_rgba(2,132,199,0.55)] transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300 animate-pulse fill-white" />
            <span className="tracking-wide">Buka Undangan Aqiqah</span>
          </button>
        </div>
      </div>
    </div>
  )
}
