import React, { useEffect, useState } from 'react'
import { Sparkles, Calendar, MailOpen } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useInvitationData } from '../../context/InvitationContext'

interface RusticTerracottaCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
}

export const RusticTerracottaCoverScreen: React.FC<RusticTerracottaCoverScreenProps> = ({
  isOpen,
  onOpenWithAudio
}) => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const [guestName, setGuestName] = useState<string>('Tamu Undangan')
  const [isOpening, setIsOpening] = useState(false)
  const [isFullyDismissed, setIsFullyDismissed] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const to = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest')
    if (to) {
      setGuestName(decodeURIComponent(to.replace(/\+/g, ' ')))
    }
  }, [])

  const handleOpenInvitation = () => {
    onOpenWithAudio()
    setIsOpening(true)

    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.62 },
        colors: ['#C06C54', '#DDA15E', '#A0522D', '#F4EBE1', '#E6CCB2', '#D4AF37']
      })
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#C06C54', '#DDA15E', '#F4EBE1']
        })
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#C06C54', '#DDA15E', '#F4EBE1']
        })
      }, 160)
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsFullyDismissed(true)
    }, 1150)
  }

  if (isOpen && (isFullyDismissed || !isOpening)) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1B1411] px-4 min-h-[100dvh] overflow-hidden perspective-1200 transition-opacity duration-500 ${
        isFullyDismissed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Image with Warm Terracotta Boho Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage}
          alt="Rustic Terracotta Background"
          className="w-full h-full object-cover object-center filter brightness-[0.25] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1411] via-[#1B1411]/80 to-[#2E201B]/90" />
      </div>

      {/* 3D LEFT TERRACOTTA KRAFT PANEL */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-20 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-3d origin-left ${
          isOpening
            ? '-translate-x-[110%] -rotate-y-[65deg] opacity-70'
            : 'translate-x-0 rotate-y-0 opacity-100'
        } bg-gradient-to-r from-[#17100D] via-[#2A1D18] to-[#3B2922] border-r-2 border-[#DDA15E]/50 shadow-[20px_0_40px_rgba(0,0,0,0.9)] flex items-center justify-end overflow-hidden`}
      >
        <div className="absolute inset-y-10 right-6 w-[1.5px] bg-gradient-to-b from-transparent via-[#DDA15E] to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-4 text-[#DDA15E]/30 font-serif text-5xl select-none rotate-90">
          🌾
        </div>
      </div>

      {/* 3D RIGHT TERRACOTTA KRAFT PANEL */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-20 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-3d origin-right ${
          isOpening
            ? 'translate-x-[110%] rotate-y-[65deg] opacity-70'
            : 'translate-x-0 rotate-y-0 opacity-100'
        } bg-gradient-to-l from-[#17100D] via-[#2A1D18] to-[#3B2922] border-l-2 border-[#DDA15E]/50 shadow-[-20px_0_40px_rgba(0,0,0,0.9)] flex items-center justify-start overflow-hidden`}
      >
        <div className="absolute inset-y-10 left-6 w-[1.5px] bg-gradient-to-b from-transparent via-[#DDA15E] to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-4 text-[#DDA15E]/30 font-serif text-5xl select-none -rotate-90">
          🌾
        </div>
      </div>

      {/* CENTER WARM SUNBURST (Triggers on Click) */}
      {isOpening && (
        <div className="absolute z-25 pointer-events-none w-80 h-80 rounded-full bg-gradient-to-r from-[#C06C54]/50 via-[#DDA15E]/50 to-[#E6CCB2]/40 blur-3xl animate-lens-flare" />
      )}

      {/* CENTER RUSTIC BOHO CARD */}
      <div
        className={`relative z-30 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#251A15]/92 backdrop-blur-2xl border-2 border-[#DDA15E]/40 shadow-[0_30px_70px_rgba(0,0,0,0.95)] text-center text-[#F4EBE1] overflow-hidden transition-all duration-700 ${
          isOpening ? 'scale-105 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        {/* Vintage Postal Airmail Stamp */}
        <div className="flex justify-center mb-3">
          <div className="px-3 py-1.5 rounded-lg border-2 border-dashed border-[#DDA15E]/60 bg-black/40 text-[11px] font-mono tracking-widest text-[#DDA15E] uppercase rotate-[-3deg] shadow-md">
            AIRMAIL • SPECIAL DELIVERY
          </div>
        </div>

        {/* Thematic Header */}
        <div className="space-y-1 mb-2">
          <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-amber-200/90 font-semibold">
            RUSTIC BOHO INVITATION
          </p>
        </div>

        {/* Couple Names */}
        <div className="my-4">
          <h1 className="font-script text-5xl sm:text-6xl text-[#E8C5A5] drop-shadow-md leading-tight">
            {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
          </h1>
          <p className="text-xs text-[#DDA15E] font-serif italic mt-2 flex items-center justify-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>{weddingData.events.akad.date}</span>
          </p>
        </div>

        {/* Personalized Guest Badge */}
        <div className="my-5 p-4 rounded-2xl bg-[#18110E]/80 border border-[#DDA15E]/30 text-center shadow-inner">
          <p className="text-[10px] text-stone-400 font-sans tracking-widest uppercase mb-1">
            Undangan Tertuju Untuk:
          </p>
          <p className="font-serif font-bold text-xl text-[#F4EBE1] capitalize">
            {guestName}
          </p>
          <p className="text-[10px] text-stone-400 mt-1 italic font-sans">
            di Tempat
          </p>
        </div>

        {/* Open Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleOpenInvitation}
            aria-label="Buka undangan vintage dan lepas tali kraft"
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C06C54] via-[#DDA15E] to-[#A0522D] hover:brightness-110 text-stone-950 font-sans font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(192,108,84,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center justify-center gap-2 group min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDA15E]"
          >
            <MailOpen className="w-4 h-4 text-stone-950 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            <span>Buka Undangan (Lepas Tali Kraft)</span>
          </button>
          <p className="text-[10px] text-stone-400 font-sans mt-3">
            *Sentuh untuk membuka amplop kraft vintage & memutar lagu
          </p>
        </div>
      </div>
    </div>
  )
}
