import React from 'react'
import { Heart, Sparkles } from 'lucide-react'

interface SweetBlossomCoverScreenProps {
  onOpen: () => void
  guestName: string
  babyName?: string
  dateText?: string
}

export const SweetBlossomCoverScreen: React.FC<SweetBlossomCoverScreenProps> = ({
  onOpen,
  guestName,
  babyName = 'Shafiyyah Almahyra',
  dateText = 'Sabtu, 08 Agustus 2026'
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B0E14] text-white overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/40 via-[#2B0E14] to-[#170509] pointer-events-none" />
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-rose-400/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-amber-400/10 blur-[100px] pointer-events-none" />

      {/* Outer borders */}
      <div className="absolute inset-3 sm:inset-5 border border-rose-300/25 rounded-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col items-center text-center justify-between min-h-[90vh] max-h-[780px]">
        {/* Top Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-400/30 text-rose-200 text-xs tracking-widest uppercase font-serif">
            <span>🌸</span>
            <span>Tasyakuran Aqiqah Putri</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-200 to-amber-200 font-bold tracking-wide">
            {babyName}
          </h1>

          <p className="text-xs text-rose-200/80 font-serif italic">
            Tasyakuran Kelahiran & Doa Tasmiyah
          </p>

          <p className="text-xs text-rose-300/80 font-mono tracking-wider">
            {dateText}
          </p>
        </div>

        {/* Center Frame */}
        <div className="relative my-4">
          <div className="w-44 h-56 sm:w-48 sm:h-60 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-rose-400/50 via-pink-400/25 to-transparent shadow-2xl shadow-black/80">
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1564172420073-e553c280b6f7?auto=format&fit=crop&w=800&q=85"
                alt="Shafiyyah Aqiqah"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B0E14]/80 via-transparent to-transparent" />
            </div>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#3D141C] border border-rose-400/40 text-[10px] text-rose-200 font-serif tracking-wider shadow-md whitespace-nowrap">
            Putri Pertama Tercinta
          </div>
        </div>

        {/* Guest Greeting & Open Button */}
        <div className="w-full space-y-4">
          <div className="rounded-2xl bg-[#3D141C]/90 border border-rose-400/20 p-4 shadow-lg backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-wider text-rose-300/70 font-sans font-medium">
              Kepada Yth. Tamu Undangan / Kerabat:
            </p>
            <h2 className="text-lg sm:text-xl font-serif text-white font-bold mt-1 tracking-wide">
              {guestName}
            </h2>
            <p className="text-[10px] text-rose-200/60 mt-1 italic font-sans">
              Mohon doa restu untuk putri kecil kami
            </p>
          </div>

          <button
            onClick={onOpen}
            className="group relative w-full sm:w-auto mx-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 text-stone-950 font-bold text-sm shadow-[0_0_20px_rgba(244,63,94,0.35)] hover:shadow-[0_0_30px_rgba(244,63,94,0.55)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>🎀</span>
            <span className="tracking-wide">Buka Undangan Aqiqah</span>
          </button>
        </div>
      </div>
    </div>
  )
}
