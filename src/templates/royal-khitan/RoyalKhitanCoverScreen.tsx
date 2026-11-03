import React from 'react'
import { Sparkles, Mail, Heart } from 'lucide-react'

interface RoyalKhitanCoverScreenProps {
  onOpen: () => void
  guestName: string
  childName?: string
  dateText?: string
}

export const RoyalKhitanCoverScreen: React.FC<RoyalKhitanCoverScreenProps> = ({
  onOpen,
  guestName,
  childName = 'Muhammad Rizky Pratama',
  dateText = 'Minggu, 12 Juli 2026'
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#021812] text-white overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800/30 via-[#032219] to-[#01120D] pointer-events-none" />

      {/* Decorative emerald & amber orbs */}
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-amber-500/15 blur-[100px] pointer-events-none" />

      {/* Outer borders */}
      <div className="absolute inset-3 sm:inset-5 border border-amber-400/25 rounded-3xl pointer-events-none" />
      <div className="absolute inset-4 sm:inset-6 border border-emerald-400/15 rounded-2xl pointer-events-none" />

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-amber-400/60 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-amber-400/60 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-amber-400/60 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-amber-400/60 rounded-br-xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col items-center text-center justify-between min-h-[90vh] max-h-[780px]">
        {/* Top Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-amber-300/30 text-amber-200 text-xs tracking-widest uppercase font-serif">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Walimatul Khitan</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-semibold tracking-wide">
            {childName}
          </h1>

          <p className="text-xs text-emerald-200/80 font-mono tracking-wider font-medium">
            {dateText}
          </p>
        </div>

        {/* Center Islamic Arch Frame */}
        <div className="relative my-3">
          <div className="w-44 h-60 sm:w-48 sm:h-64 rounded-t-full rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-amber-400/40 via-emerald-500/20 to-transparent shadow-2xl shadow-black/80">
            <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1584281729288-89826acac5b0?auto=format&fit=crop&w=800&q=85"
                alt="Khitanan"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#032219]/90 via-transparent to-transparent" />
            </div>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#032219] border border-amber-400/40 text-[10px] text-amber-200 font-serif tracking-wider shadow-md">
            Tasyakuran Barakah
          </div>
        </div>

        {/* Bottom Guest Greeting & Open Button */}
        <div className="w-full space-y-4">
          <div className="rounded-xl bg-[#063327]/90 border border-emerald-400/20 p-4 shadow-lg backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-wider text-emerald-200/70 font-sans font-medium">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <h2 className="text-lg sm:text-xl font-serif text-white font-semibold mt-1 tracking-wide">
              {guestName}
            </h2>
            <p className="text-[10px] text-emerald-300/60 mt-1 italic font-sans">
              *Mohon maaf apabila ada kesalahan penulisan nama/gelar
            </p>
          </div>

          <button
            onClick={onOpen}
            className="group relative w-full sm:w-auto mx-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-900 font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.55)] transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-slate-900 group-hover:scale-110 transition-transform duration-300 animate-bounce" />
            <span className="tracking-wide">Buka Undangan</span>
          </button>
        </div>
      </div>
    </div>
  )
}
