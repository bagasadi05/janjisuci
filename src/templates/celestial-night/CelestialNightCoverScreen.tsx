import React, { useEffect, useState } from 'react'
import { Sparkles, Calendar, Moon } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useInvitationData } from '../../context/InvitationContext'

interface CelestialNightCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
}

export const CelestialNightCoverScreen: React.FC<CelestialNightCoverScreenProps> = ({
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
    // CRITICAL: Call synchronously for audio autoplay policy
    onOpenWithAudio()
    setIsOpening(true)

    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F4D06F', '#4CC9F0', '#7209B7', '#F72585', '#FFFFFF']
      })
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
          colors: ['#F4D06F', '#4CC9F0', '#FFFFFF']
        })
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
          colors: ['#F4D06F', '#4CC9F0', '#FFFFFF']
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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0B132B] px-4 min-h-[100dvh] overflow-hidden perspective-1200 transition-opacity duration-500 ${
        isFullyDismissed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Cosmic Sky Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage}
          alt="Celestial Starry Night Sky"
          className="w-full h-full object-cover object-center filter brightness-[0.25] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/80 to-[#1C2541]/90" />
      </div>

      {/* Orbiting Celestial Ring 1 */}
      <div
        className={`absolute w-[450px] sm:w-[620px] h-[450px] sm:h-[620px] rounded-full border border-amber-400/30 pointer-events-none transition-all duration-1000 ${
          isOpening
            ? 'scale-[2.8] rotate-[240deg] opacity-0'
            : 'scale-100 animate-spin opacity-80'
        }`}
        style={{ animationDuration: '40s' }}
      >
        <div className="absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-amber-300 shadow-[0_0_15px_#F4D06F]" />
      </div>

      {/* Orbiting Celestial Ring 2 */}
      <div
        className={`absolute w-[320px] sm:w-[440px] h-[320px] sm:h-[440px] rounded-full border border-cyan-400/25 pointer-events-none transition-all duration-1000 ${
          isOpening
            ? 'scale-[3.2] -rotate-[180deg] opacity-0'
            : 'scale-100 animate-spin opacity-70'
        }`}
        style={{ animationDuration: '28s', animationDirection: 'reverse' }}
      >
        <div className="absolute -bottom-1.5 left-1/3 w-3.5 h-3.5 rounded-full bg-cyan-200 shadow-[0_0_12px_#4CC9F0]" />
      </div>

      {/* 3D LEFT MIDNIGHT CONSTELLATION GATE DOOR */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-20 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-3d origin-left ${
          isOpening
            ? '-translate-x-[110%] -rotate-y-[70deg] opacity-70'
            : 'translate-x-0 rotate-y-0 opacity-100'
        } bg-gradient-to-r from-[#070B18] via-[#0D1836] to-[#14234C] border-r-2 border-[#F4D06F]/50 shadow-[20px_0_40px_rgba(0,0,0,0.9)] flex items-center justify-end overflow-hidden`}
      >
        <div className="absolute inset-y-10 right-6 w-[1.5px] bg-gradient-to-b from-transparent via-[#F4D06F] to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-4 text-[#F4D06F]/30 font-serif text-5xl select-none rotate-90">
          ★
        </div>
      </div>

      {/* 3D RIGHT MIDNIGHT CONSTELLATION GATE DOOR */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-20 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-3d origin-right ${
          isOpening
            ? 'translate-x-[110%] rotate-y-[70deg] opacity-70'
            : 'translate-x-0 rotate-y-0 opacity-100'
        } bg-gradient-to-l from-[#070B18] via-[#0D1836] to-[#14234C] border-l-2 border-[#F4D06F]/50 shadow-[-20px_0_40px_rgba(0,0,0,0.9)] flex items-center justify-start overflow-hidden`}
      >
        <div className="absolute inset-y-10 left-6 w-[1.5px] bg-gradient-to-b from-transparent via-[#F4D06F] to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-4 text-[#F4D06F]/30 font-serif text-5xl select-none -rotate-90">
          ★
        </div>
      </div>

      {/* CENTER NEBULA STARPORTAL ZOOM EFFECT */}
      {isOpening && (
        <div className="absolute z-25 pointer-events-none w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-amber-400/40 blur-3xl animate-portal-zoom" />
      )}

      {/* CENTER CELESTIAL CARD */}
      <div
        className={`relative z-30 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#0D1730]/92 backdrop-blur-2xl border-2 border-[#F4D06F]/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] text-center text-white overflow-hidden transition-all duration-700 ${
          isOpening ? 'scale-105 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        {/* Zodiac Constellation Icon */}
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-full bg-[#1C2541]/80 border border-[#F4D06F]/60 flex items-center justify-center shadow-[0_0_20px_rgba(244,208,111,0.3)]">
            <Moon className="w-6 h-6 text-[#F4D06F]" />
          </div>
        </div>

        {/* Thematic Header */}
        <div className="space-y-1 mb-2">
          <p className="text-[10px] uppercase tracking-[0.35em] font-sans text-amber-200 font-semibold">
            CELESTIAL WEDDING • UNDER THE STARS
          </p>
        </div>

        {/* Couple Names in Constellation Shimmer */}
        <div className="my-4">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#F4D06F] to-[#4CC9F0] drop-shadow-[0_2px_15px_rgba(244,208,111,0.4)]">
            {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
          </h1>
          <p className="text-xs text-cyan-200/90 font-mono mt-2 flex items-center justify-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span>{weddingData.events.akad.date}</span>
          </p>
        </div>

        {/* Personalized Guest Badge */}
        <div className="my-5 p-4 rounded-2xl bg-[#081024]/80 border border-[#F4D06F]/30 text-center shadow-inner">
          <p className="text-[10px] text-stone-400 font-sans tracking-widest uppercase mb-1">
            Kepada Tamu Istimewa:
          </p>
          <p className="font-serif font-bold text-xl text-amber-200 capitalize">
            {guestName}
          </p>
          <p className="text-[10px] text-stone-400 mt-1 italic font-sans">
            di Tempat
          </p>
        </div>

        {/* Gate Open Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleOpenInvitation}
            aria-label="Buka undangan langit malam dan aktifkan musik"
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#F4D06F] via-[#FFE29A] to-[#E2B744] hover:brightness-110 text-[#0B132B] font-sans font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(244,208,111,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center justify-center gap-2 group min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D06F]"
          >
            <Sparkles className="w-4 h-4 text-[#0B132B] group-hover:rotate-45 transition-transform" aria-hidden="true" />
            <span>Buka Undangan (Lintas Bintang)</span>
          </button>
          <p className="text-[10px] text-stone-400 font-sans mt-3">
            *Sentuh untuk membuka gerbang konstelasi & menyalakan musik
          </p>
        </div>
      </div>
    </div>
  )
}
