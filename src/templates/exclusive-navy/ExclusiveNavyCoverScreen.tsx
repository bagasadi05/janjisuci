import React from 'react'
import { Mail, Sparkles } from 'lucide-react'

interface ExclusiveNavyCoverScreenProps {
  onOpen: () => void
  guestName: string
  coupleNames?: string
  dateText?: string
}

export const ExclusiveNavyCoverScreen: React.FC<ExclusiveNavyCoverScreenProps> = ({
  onOpen,
  guestName,
  coupleNames = 'Nabilah & Yoga',
  dateText = '20 . 12 . 2025'
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07101E] text-white overflow-hidden">
      {/* Background with luxury Navy & Deep Indigo radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1E3E62]/40 via-[#0B192C] to-[#050C15] pointer-events-none" />

      {/* Decorative luxury gold arches & glowing orbs */}
      <div className="absolute -top-32 w-80 h-80 rounded-full bg-amber-500/10 blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-32 w-80 h-80 rounded-full bg-blue-600/15 blur-[100px] pointer-events-none" />

      {/* Outer Golden Border Line */}
      <div className="absolute inset-3 sm:inset-5 border border-amber-400/25 rounded-2xl pointer-events-none" />
      <div className="absolute inset-4 sm:inset-6 border border-white/10 rounded-xl pointer-events-none" />

      {/* Corner decorative accents */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-400/50 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-400/50 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-400/50 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400/50 rounded-br-lg pointer-events-none" />

      {/* Main Content Box */}
      <div className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col items-center text-center justify-between min-h-[90vh] max-h-[780px]">
        {/* Top Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-amber-300/30 text-amber-200/90 text-xs tracking-widest uppercase font-serif">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>The Wedding of</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-normal tracking-wide drop-shadow-sm">
            {coupleNames}
          </h1>

          <p className="text-xs text-blue-200/80 tracking-widest font-mono font-medium">
            {dateText}
          </p>
        </div>

        {/* Center Royal Arch Image Frame */}
        <div className="relative my-4">
          <div className="w-44 h-60 sm:w-48 sm:h-64 rounded-t-full rounded-b-xl overflow-hidden p-1 bg-gradient-to-b from-amber-300/40 via-amber-400/20 to-transparent shadow-2xl shadow-black/80">
            <div className="w-full h-full rounded-t-full rounded-b-lg overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85"
                alt="Pengantin Nabilah & Yoga"
                className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent" />
            </div>
          </div>
          {/* Subtle gold badge below arch */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0B192C] border border-amber-300/40 text-[10px] text-amber-200 font-serif tracking-wider shadow-md">
            Royal Navy Edition
          </div>
        </div>

        {/* Bottom Guest Greeting & Open Button */}
        <div className="w-full space-y-4">
          <div className="rounded-xl bg-[#0F223A]/90 border border-blue-400/20 p-4 shadow-lg backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-wider text-blue-200/70 font-sans font-medium">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <h2 className="text-lg sm:text-xl font-serif text-white font-semibold mt-1 tracking-wide">
              {guestName}
            </h2>
            <p className="text-[10px] text-blue-300/60 mt-1 italic font-sans">
              *Mohon maaf apabila ada kesalahan penulisan nama/gelar
            </p>
          </div>

          <button
            onClick={onOpen}
            className="group relative w-full sm:w-auto mx-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-900 font-semibold text-sm shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.55)] transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95"
          >
            <Mail className="w-4 h-4 text-slate-900 group-hover:scale-110 transition-transform duration-300 animate-bounce" />
            <span className="tracking-wide">Buka Undangan</span>
          </button>
        </div>
      </div>
    </div>
  )
}
