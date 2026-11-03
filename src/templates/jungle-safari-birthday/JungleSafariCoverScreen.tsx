import React from 'react'
import { Sparkles } from 'lucide-react'

interface JungleSafariCoverScreenProps {
  onOpen: () => void
  guestName: string
  celebrantName?: string
  ageText?: string
  dateText?: string
}

export const JungleSafariCoverScreen: React.FC<JungleSafariCoverScreenProps> = ({
  onOpen,
  guestName,
  celebrantName = 'Kenzo Dirgantara',
  ageText = 'Turning 3rd Birthday!',
  dateText = 'Minggu, 18 Oktober 2026'
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#132317] text-white overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-[#132317] to-[#0A140D] pointer-events-none" />
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-amber-500/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-lime-500/10 blur-[100px] pointer-events-none" />

      {/* Jungle floating leaf deco */}
      <div className="absolute top-6 left-6 text-2xl select-none opacity-40 animate-pulse">🌿</div>
      <div className="absolute top-12 right-8 text-2xl select-none opacity-40 animate-bounce">🦒</div>
      <div className="absolute bottom-12 left-8 text-2xl select-none opacity-40 animate-bounce">🦁</div>
      <div className="absolute bottom-8 right-8 text-2xl select-none opacity-40 animate-pulse">🌴</div>

      <div className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col items-center text-center justify-between min-h-[90vh] max-h-[780px]">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-amber-400/40 text-amber-300 text-xs tracking-widest uppercase font-sans font-bold shadow-sm">
            <span>🦁</span>
            <span>Jungle Safari Birthday</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-lime-200 font-extrabold tracking-wide">
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
        <div className="relative my-4">
          <div className="w-44 h-56 sm:w-48 sm:h-60 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-amber-400/50 via-lime-400/30 to-emerald-900 shadow-2xl shadow-black/80">
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=85"
                alt="Kenzo Birthday"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132317]/80 via-transparent to-transparent" />
            </div>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#1C3121] border border-amber-400/40 text-[11px] text-amber-200 font-bold tracking-wider shadow-md whitespace-nowrap">
            🎈 Let's Go on an Adventure!
          </div>
        </div>

        {/* Guest Greeting & Open Button */}
        <div className="w-full space-y-4">
          <div className="rounded-2xl bg-[#1C3121]/90 border border-emerald-500/25 p-4 shadow-lg backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-wider text-emerald-300/80 font-sans font-medium">
              Kepada Teman Petualang:
            </p>
            <h2 className="text-lg sm:text-xl font-serif text-white font-bold mt-1 tracking-wide">
              {guestName}
            </h2>
            <p className="text-[10px] text-emerald-200/60 mt-1 italic font-sans">
              Yuk datang dan bermain seru di pesta ulang tahun Kenzo!
            </p>
          </div>

          <button
            onClick={onOpen}
            className="group relative w-full sm:w-auto mx-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-lime-400 text-stone-950 font-extrabold text-sm shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>🌿</span>
            <span className="tracking-wide">Buka Undangan Pesta</span>
          </button>
        </div>
      </div>
    </div>
  )
}
