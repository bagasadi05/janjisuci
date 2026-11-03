import React from 'react'
import { Sparkles, GraduationCap } from 'lucide-react'

interface AcademicEleganceCoverScreenProps {
  onOpen: () => void
  guestName: string
  institutionName?: string
  ceremonyTitle?: string
  dateText?: string
}

export const AcademicEleganceCoverScreen: React.FC<AcademicEleganceCoverScreenProps> = ({
  onOpen,
  guestName,
  institutionName = 'Universitas Indonesia',
  ceremonyTitle = 'Wisuda Sarjana & Pascasarjana',
  dateText = 'Sabtu, 19 September 2026'
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070D1E] text-white overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0B132B] to-[#040813] pointer-events-none" />
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-blue-600/15 blur-[100px] pointer-events-none" />

      {/* Outer borders */}
      <div className="absolute inset-3 sm:inset-5 border border-amber-400/25 rounded-3xl pointer-events-none" />
      <div className="absolute inset-4 sm:inset-6 border border-white/10 rounded-2xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col items-center text-center justify-between min-h-[90vh] max-h-[780px]">
        {/* Top Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-amber-300/30 text-amber-200 text-xs tracking-widest uppercase font-serif">
            <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            <span>Graduation Ceremony</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-bold tracking-wide">
            {institutionName}
          </h1>

          <p className="text-xs text-amber-300/90 font-serif italic">
            {ceremonyTitle}
          </p>

          <p className="text-xs text-blue-200/80 font-mono tracking-wider font-medium">
            {dateText}
          </p>
        </div>

        {/* Center Frame */}
        <div className="relative my-3">
          <div className="w-44 h-56 sm:w-48 sm:h-60 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-amber-400/40 via-blue-500/20 to-transparent shadow-2xl shadow-black/80">
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?auto=format&fit=crop&w=800&q=85"
                alt="Graduation"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 via-transparent to-transparent" />
            </div>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0B132B] border border-amber-400/40 text-[10px] text-amber-200 font-serif tracking-wider shadow-md">
            Sidang Terbuka Senat
          </div>
        </div>

        {/* Bottom Guest Greeting & Open Button */}
        <div className="w-full space-y-4">
          <div className="rounded-2xl bg-[#141E38]/90 border border-blue-400/20 p-4 shadow-lg backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-wider text-blue-200/70 font-sans font-medium">
              Kepada Yth. Tamu Undangan / Pendamping:
            </p>
            <h2 className="text-lg sm:text-xl font-serif text-white font-bold mt-1 tracking-wide">
              {guestName}
            </h2>
            <p className="text-[10px] text-blue-300/60 mt-1 italic font-sans">
              Mohon hadir 30 menit sebelum prosesi wisuda dimulai
            </p>
          </div>

          <button
            onClick={onOpen}
            className="group relative w-full sm:w-auto mx-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-900 font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.55)] transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-slate-900 group-hover:scale-110 transition-transform duration-300" />
            <span className="tracking-wide">Buka Undangan Wisuda</span>
          </button>
        </div>
      </div>
    </div>
  )
}
