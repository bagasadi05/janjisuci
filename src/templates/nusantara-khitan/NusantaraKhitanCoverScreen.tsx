import React from 'react'
import { Sparkles } from 'lucide-react'

interface NusantaraKhitanCoverScreenProps {
  onOpen: () => void
  guestName: string
  childName?: string
  dateText?: string
}

export const NusantaraKhitanCoverScreen: React.FC<NusantaraKhitanCoverScreenProps> = ({
  onOpen,
  guestName,
  childName = 'Raden Arya Danendra',
  dateText = 'Minggu, 06 September 2026'
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17120E] text-white overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/40 via-[#17120E] to-[#0D0A08] pointer-events-none" />
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-amber-600/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-yellow-600/10 blur-[100px] pointer-events-none" />

      {/* Frame */}
      <div className="absolute inset-3 sm:inset-5 border border-amber-500/25 rounded-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col items-center text-center justify-between min-h-[90vh] max-h-[780px]">
        {/* Top Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-400/30 text-amber-300 text-xs tracking-widest uppercase font-serif">
            <span>⚜️</span>
            <span>Tasyakuran Walimatul Khitan</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 font-bold tracking-wide">
            {childName}
          </h1>

          <p className="text-xs text-amber-200/80 font-serif italic">
            Nuansa Adat Nusantara & Berkah Walimah
          </p>

          <p className="text-xs text-amber-300/80 font-mono tracking-wider">
            {dateText}
          </p>
        </div>

        {/* Center Frame */}
        <div className="relative my-4">
          <div className="w-44 h-56 sm:w-48 sm:h-60 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-amber-400/50 via-yellow-600/25 to-transparent shadow-2xl shadow-black/80">
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=85"
                alt="Raden Arya Danendra"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17120E]/80 via-transparent to-transparent" />
            </div>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#231B15] border border-amber-500/40 text-[10px] text-amber-200 font-serif tracking-wider shadow-md whitespace-nowrap">
            Walimatul Khitan Ananda
          </div>
        </div>

        {/* Guest Greeting & Open Button */}
        <div className="w-full space-y-4">
          <div className="rounded-2xl bg-[#231B15]/90 border border-amber-500/20 p-4 shadow-lg backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-wider text-amber-300/70 font-sans font-medium">
              Katur Dhumateng Panjenenganipun:
            </p>
            <h2 className="text-lg sm:text-xl font-serif text-white font-bold mt-1 tracking-wide">
              {guestName}
            </h2>
            <p className="text-[10px] text-amber-200/60 mt-1 italic font-sans">
              Mugi kepareng rawuh paring berkah puji pandonga
            </p>
          </div>

          <button
            onClick={onOpen}
            className="group relative w-full sm:w-auto mx-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-stone-950 font-bold text-sm shadow-[0_0_20px_rgba(217,119,6,0.35)] hover:shadow-[0_0_30px_rgba(217,119,6,0.55)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>⚜️</span>
            <span className="tracking-wide">Buka Serat Undangan</span>
          </button>
        </div>
      </div>
    </div>
  )
}
