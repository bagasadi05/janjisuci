import React, { useEffect, useState } from 'react'
import { Sparkles, Calendar, Heart } from 'lucide-react'
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
        particleCount: 95,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#C06C54', '#DDA15E', '#A0522D', '#F4EBE1', '#E6CCB2']
      })
    } catch {
      // ignore
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#2B231D] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Background Image with Warm Boho Sunset Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage}
          alt="Rustic Terracotta Background"
          className="w-full h-full object-cover object-center filter brightness-[0.35] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B231D] via-[#2B231D]/80 to-[#2B231D]/90" />
      </div>

      {/* Main Vintage Airmail Kraft Envelope Card */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#F7EFE6] text-[#3D2C24] shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-4 border-[#C06C54]/30 overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Airmail Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-[repeating-linear-gradient(45deg,#C06C54,#C06C54_10px,#E6CCB2_10px,#E6CCB2_20px)] opacity-70" />
        <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-[repeating-linear-gradient(45deg,#C06C54,#C06C54_10px,#E6CCB2_10px,#E6CCB2_20px)] opacity-70" />

        {/* Vintage Stamp at Top Right */}
        <div className="absolute top-5 right-5 p-2 rounded-lg border-2 border-dashed border-[#C06C54] bg-[#EEDFD0] text-center rotate-6 shadow-sm">
          <p className="text-[8px] font-mono tracking-widest text-[#A0522D] font-bold">POS CINTA</p>
          <Heart className="w-4 h-4 text-[#C06C54] mx-auto my-0.5 fill-[#C06C54]/30" />
          <p className="text-[8px] font-mono text-stone-600">2026</p>
        </div>

        {/* Top Header */}
        <div className="space-y-1 mt-2 mb-4 text-left">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C06C54] font-bold font-sans">
            SURAT KHUSUS • UNDANGAN PERNIKAHAN
          </span>
          <p className="font-serif italic text-xs text-stone-600">
            Dengan penuh kebahagiaan, kami mengundang Anda
          </p>
        </div>

        {/* Couple Names in Warm Terracotta Script */}
        <div className="my-5 text-center">
          <h1 className="font-script text-5xl sm:text-6xl text-[#A0522D] drop-shadow-sm leading-tight">
            {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
          </h1>
          <p className="font-serif text-xs text-stone-600 mt-2 flex items-center justify-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#C06C54]" />
            <span>{weddingData.events.akad.date}</span>
          </p>
        </div>

        {/* Personalized Guest Tag with Twine Style */}
        <div className="my-5 p-4 rounded-2xl bg-[#EEDFD0] border border-[#D9C3B0] text-center relative shadow-inner">
          <div className="w-3 h-3 rounded-full bg-[#3D2C24]/20 mx-auto -mt-2 mb-1.5 border border-white" />
          <p className="text-[10px] text-stone-500 uppercase tracking-widest font-sans">
            KEPADA TAMU KEHORMATAN:
          </p>
          <p className="font-serif font-bold text-lg text-[#3D2C24] capitalize mt-0.5">
            {guestName}
          </p>
        </div>

        {/* Untie Button */}
        <button
          type="button"
          onClick={handleOpenInvitation}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#C06C54] hover:bg-[#A0522D] text-white font-serif font-bold text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(192,108,84,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>BUKA SURAT UNDANGAN</span>
        </button>
      </div>
    </div>
  )
}
