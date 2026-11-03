import React, { useEffect, useState } from 'react'
import { Sparkles, Calendar, Flower2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useInvitationData } from '../../context/InvitationContext'

interface BlushPeonyCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
}

export const BlushPeonyCoverScreen: React.FC<BlushPeonyCoverScreenProps> = ({
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
        colors: ['#FFB3C6', '#FB6F92', '#B76E79', '#FFFFFF', '#FDF5F5']
      })
    } catch {
      // ignore
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#2E1822] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Background Image with Romantic Soft Rose Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage}
          alt="Blush Peony Cover Background"
          className="w-full h-full object-cover object-center filter brightness-[0.35] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E1822] via-[#2E1822]/80 to-[#2E1822]/90" />
      </div>

      {/* Main Floral Card */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#FFF9FA] text-[#4A2033] shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-2 border-[#FFCCD5] text-center overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Top Flower Wreath Icon */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-full bg-[#FFE5EC] border-2 border-[#FFB3C6] flex items-center justify-center shadow-inner">
            <Flower2 className="w-8 h-8 text-[#B76E79]" />
          </div>
        </div>

        <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#B76E79] font-bold">
          UNDANGAN PERNIKAHAN
        </p>

        {/* Couple Names in Romantic Script */}
        <div className="my-4">
          <h1 className="font-script text-5xl sm:text-6xl text-[#6A2E46] leading-tight">
            {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
          </h1>
          <p className="font-serif text-xs text-[#B76E79] mt-2 flex items-center justify-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#B76E79]" />
            <span>{weddingData.events.akad.date}</span>
          </p>
        </div>

        {/* Guest Tag */}
        <div className="my-5 p-4 rounded-2xl bg-[#FFE5EC]/70 border border-[#FFCCD5] text-center shadow-sm">
          <p className="text-[10px] text-stone-500 uppercase tracking-widest font-sans">
            KEPADA TAMU KEHORMATAN:
          </p>
          <p className="font-serif font-bold text-lg text-[#6A2E46] capitalize mt-0.5">
            {guestName}
          </p>
        </div>

        {/* Open Button */}
        <button
          type="button"
          onClick={handleOpenInvitation}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#B76E79] via-[#DDA7A5] to-[#B76E79] hover:from-[#A25D68] hover:to-[#A25D68] text-white font-serif font-bold text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(183,110,121,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-pink-100" />
          <span>BUKA UNDANGAN</span>
        </button>
      </div>
    </div>
  )
}
