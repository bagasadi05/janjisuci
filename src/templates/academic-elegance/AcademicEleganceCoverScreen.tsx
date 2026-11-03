import React, { useEffect, useState } from 'react'
import { Sparkles, GraduationCap } from 'lucide-react'
import confetti from 'canvas-confetti'

interface AcademicEleganceCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
  guestName?: string
  institutionName?: string
  ceremonyTitle?: string
  dateText?: string
}

export const AcademicEleganceCoverScreen: React.FC<AcademicEleganceCoverScreenProps> = ({
  isOpen,
  onOpenWithAudio,
  guestName: propGuestName,
  institutionName = 'Universitas Indonesia',
  ceremonyTitle = 'Wisuda Sarjana & Pascasarjana',
  dateText = 'Sabtu, 19 September 2026'
}) => {
  const [guestName, setGuestName] = useState<string>(propGuestName || 'Tamu Undangan')
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
        particleCount: 110,
        spread: 80,
        origin: { y: 0.62 },
        colors: ['#D4AF37', '#1E3A8A', '#F59E0B', '#93C5FD', '#FFFFFF']
      })
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#D4AF37', '#60A5FA', '#FFFFFF']
        })
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#D4AF37', '#60A5FA', '#FFFFFF']
        })
      }, 160)
    } catch {
      // ignore
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#040813] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0B132B] to-[#040813] pointer-events-none" />
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-blue-600/15 blur-[100px] pointer-events-none" />

      {/* LUXURY LEFT ACADEMIC HALL SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-r border-amber-400/40 bg-gradient-to-r from-[#040813] via-[#0E1A38]/95 to-[#162955]/90 backdrop-blur-md ${
          isAnimating ? '-translate-x-full -rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 right-4 w-[1px] bg-gradient-to-b from-transparent via-amber-400/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-3 text-amber-300/35 font-serif text-5xl select-none rotate-90">
          🎓
        </div>
      </div>

      {/* LUXURY RIGHT ACADEMIC HALL SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-l border-amber-400/40 bg-gradient-to-l from-[#040813] via-[#0E1A38]/95 to-[#162955]/90 backdrop-blur-md ${
          isAnimating ? 'translate-x-full rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 left-4 w-[1px] bg-gradient-to-b from-transparent via-amber-400/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-amber-300/35 font-serif text-5xl select-none -rotate-90">
          📜
        </div>
      </div>

      {/* Center Academic Chancellor Card */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#0F1C3A]/85 backdrop-blur-2xl border border-amber-400/40 shadow-[0_30px_70px_rgba(0,0,0,0.9)] text-center text-white overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Corner decorative accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-400/60 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-400/60 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg pointer-events-none" />

        {/* Top Header Badge */}
        <div className="space-y-1 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-950/80 border border-amber-300/30 text-amber-200 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-serif font-medium">
            <GraduationCap className="w-3.5 h-3.5 text-amber-300"  aria-hidden="true"/>
            <span>Graduation Ceremony</span>
          </div>
        </div>

        {/* Institution & Ceremony Title */}
        <div className="my-2 space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-bold tracking-wide drop-shadow-sm">
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
        <div className="relative my-3 flex justify-center">
          <div className="w-32 h-44 sm:w-36 sm:h-48 rounded-2xl overflow-hidden p-1.5 bg-gradient-to-b from-amber-400/40 via-blue-500/20 to-transparent shadow-2xl shadow-black/80">
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?auto=format&fit=crop&w=800&q=85"
                alt="Graduation"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Guest Card */}
        <div className="my-3 py-3 px-4 rounded-xl bg-[#091328]/80 border border-blue-400/25 shadow-inner text-center">
          <p className="text-[10px] uppercase tracking-wider text-blue-200/70 font-sans font-medium">
            Kepada Yth. Tamu Undangan / Pendamping:
          </p>
          <h2 className="text-base sm:text-lg font-serif text-white font-bold mt-0.5 tracking-wide">
            {guestName}
          </h2>
          <p className="text-[10px] text-blue-300/60 mt-0.5 italic font-sans">
            Mohon hadir 30 menit sebelum prosesi dimulai
          </p>
        </div>

        {/* Open Button with Pulsing Glow */}
        <div className="relative inline-block mt-1">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 opacity-75 blur-md animate-pulse" aria-hidden="true" />
          <button
            type="button"
            onClick={handleOpenInvitation}
            aria-label="Buka undangan wisuda dan nyalakan musik"
            className="group relative inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-sans font-bold text-xs sm:text-sm tracking-wide shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <GraduationCap className="w-4 h-4 text-slate-900 group-hover:scale-110 transition-transform duration-300"  aria-hidden="true"/>
            <span className="tracking-wider uppercase font-semibold">Buka Undangan Wisuda</span>
          </button>
        </div>

        <p className="text-[10px] text-blue-200/50 mt-3 font-sans">
          *Ketuk tombol untuk membuka pintu auditorium & menyalakan lagu wisuda
        </p>
      </div>
    </div>
  )
}
