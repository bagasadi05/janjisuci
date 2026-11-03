import React, { useEffect, useState } from 'react'
import { Moon, Sparkles, Star } from 'lucide-react'
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
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const to = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest')
    if (to) {
      setGuestName(decodeURIComponent(to.replace(/\+/g, ' ')))
    }
  }, [])

  const handleOpenInvitation = () => {
    onOpenWithAudio()
    setIsAnimating(true)

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F4D06F', '#64DFDF', '#7209B7', '#FFFFFF', '#4CC9F0']
      })
    } catch {
      // ignore
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0B132B] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? 'opacity-0 scale-125 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Cosmic Sky Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage}
          alt="Celestial Starry Night Sky"
          className="w-full h-full object-cover object-center filter brightness-[0.3] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/80 to-[#1C2541]/90" />
      </div>

      {/* Orbiting Ring Graphics */}
      <div className="absolute w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full border border-amber-400/20 pointer-events-none animate-spin" style={{ animationDuration: '45s' }}>
        <div className="absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-amber-300 shadow-[0_0_12px_#F4D06F]" />
      </div>
      <div className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full border border-cyan-400/15 pointer-events-none animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
        <div className="absolute -bottom-1.5 left-1/3 w-3 h-3 rounded-full bg-cyan-200 shadow-[0_0_10px_#4CC9F0]" />
      </div>

      {/* Main Cosmic Card Container */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#1C2541]/80 backdrop-blur-2xl border-2 border-[#F4D06F]/40 shadow-[0_0_50px_rgba(244,208,111,0.25)] text-center text-white overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Crescent Moon Emblem */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#3A0CA3] via-[#4361EE] to-[#F4D06F] p-[1.5px] shadow-[0_0_20px_rgba(244,208,111,0.4)]">
            <div className="w-full h-full rounded-full bg-[#0B132B] flex items-center justify-center">
              <Moon className="w-8 h-8 text-[#F4D06F] fill-[#F4D06F]/20" />
            </div>
          </div>
        </div>

        <p className="text-[10px] uppercase tracking-[0.35em] text-[#F4D06F] font-semibold">
          TERTULIS INDAH DI BINTANG
        </p>

        {/* Couple Names */}
        <div className="my-4">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF9] via-[#F4D06F] to-[#E0E1DD] drop-shadow-[0_2px_15px_rgba(244,208,111,0.4)]">
            {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
          </h1>
          <p className="text-xs text-stone-300 font-sans tracking-widest mt-1">
            {weddingData.events.akad.date}
          </p>
        </div>

        {/* Guest Badge */}
        <div className="my-5 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
          <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">
            KEPADA TAMU KEHORMATAN:
          </p>
          <p className="font-serif font-bold text-base text-[#F4D06F] capitalize">
            {guestName}
          </p>
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={handleOpenInvitation}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#F4D06F] via-[#FFE29A] to-[#F4D06F] text-stone-950 font-serif font-bold text-xs uppercase tracking-widest shadow-[0_10px_25px_rgba(244,208,111,0.4)] transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-stone-950" />
          <span>BUKA UNDANGAN</span>
        </button>
      </div>
    </div>
  )
}
