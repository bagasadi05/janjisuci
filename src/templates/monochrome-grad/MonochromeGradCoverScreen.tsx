import React from 'react'
import { GraduationCap } from 'lucide-react'

interface MonochromeGradCoverScreenProps {
  onOpen: () => void
  guestName: string
  graduateName?: string
  institutionName?: string
  dateText?: string
}

export const MonochromeGradCoverScreen: React.FC<MonochromeGradCoverScreenProps> = ({
  onOpen,
  guestName,
  graduateName = 'Nadine Aulia, S.Ds.',
  institutionName = 'Institut Teknologi Bandung (ITB)',
  dateText = 'Sabtu, 24 Oktober 2026'
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B] text-white overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/40 via-[#09090B] to-[#040405] pointer-events-none" />
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-white/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-zinc-500/10 blur-[120px] pointer-events-none" />

      {/* Modern minimalist borders */}
      <div className="absolute inset-4 sm:inset-6 border border-white/15 rounded-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col items-center text-center justify-between min-h-[90vh] max-h-[780px]">
        {/* Top Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-zinc-200 text-xs tracking-widest uppercase font-mono">
            <GraduationCap className="w-3.5 h-3.5 text-zinc-100" />
            <span>Graduation Ceremony</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-white font-extrabold tracking-tight">
            {graduateName}
          </h1>

          <p className="text-xs text-zinc-400 font-sans tracking-wide">
            {institutionName}
          </p>

          <p className="text-xs text-zinc-400 font-mono tracking-wider">
            {dateText}
          </p>
        </div>

        {/* Center Frame */}
        <div className="relative my-4">
          <div className="w-44 h-56 sm:w-48 sm:h-60 rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-white/30 via-zinc-600/20 to-transparent shadow-2xl shadow-black/90">
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1672839415384-95cdbcba77ee?auto=format&fit=crop&w=800&q=85"
                alt="Nadine Aulia Wisuda"
                className="w-full h-full object-cover object-center filter grayscale contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-transparent to-transparent" />
            </div>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#18181B] border border-white/25 text-[10px] text-zinc-200 font-mono tracking-wider shadow-md whitespace-nowrap">
            FSRD ITB • Sidang Terbuka Senat
          </div>
        </div>

        {/* Bottom Guest Greeting & Open Button */}
        <div className="w-full space-y-4">
          <div className="rounded-2xl bg-[#18181B]/90 border border-white/10 p-4 shadow-lg backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-wider text-zinc-400 font-sans font-medium">
              Kepada Tamu Undangan / Pendamping:
            </p>
            <h2 className="text-lg sm:text-xl font-serif text-white font-bold mt-1 tracking-wide">
              {guestName}
            </h2>
            <p className="text-[10px] text-zinc-400 mt-1 italic font-sans">
              Mohon hadir 30 menit sebelum prosesi wisuda dimulai
            </p>
          </div>

          <button
            onClick={onOpen}
            className="group relative w-full sm:w-auto mx-auto px-8 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-stone-950 font-extrabold text-sm shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-stone-950" />
            <span className="tracking-wide">Buka Undangan Wisuda</span>
          </button>
        </div>
      </div>
    </div>
  )
}
