import React, { useEffect, useState } from 'react'
import { Sparkles, MailOpen, Crown } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useInvitationData } from '../../context/InvitationContext'

interface LuxuryChampagneCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
}

export const LuxuryChampagneCoverScreen: React.FC<LuxuryChampagneCoverScreenProps> = ({
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
    // CRITICAL: Audio autoplay synchronous trigger
    onOpenWithAudio()
    setIsOpening(true)

    try {
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.62 },
        colors: ['#D4AF37', '#F3E5AB', '#FFFFFF', '#FAF9F6', '#B8860B', '#E5C058']
      })
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#D4AF37', '#F3E5AB', '#FFFFFF']
        })
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#D4AF37', '#F3E5AB', '#FFFFFF']
        })
      }, 160)
    } catch {
      // ignore
    }

    // Sequenced unmount after the satin drapes part
    setTimeout(() => {
      setIsFullyDismissed(true)
    }, 1150)
  }

  if (isOpen && (isFullyDismissed || !isOpening)) return null

  const groomInitial = weddingData.couple.groom.shortName.charAt(0) || 'K'
  const brideInitial = weddingData.couple.bride.shortName.charAt(0) || 'C'

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A] px-4 min-h-[100dvh] overflow-hidden perspective-1200 transition-opacity duration-500 ${
        isFullyDismissed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Image with High Contrast Editorial Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage}
          alt="Editorial Wedding Cover"
          className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-[0.25] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/75 to-[#0A0A0A]/90" />
      </div>

      {/* LUXURY LEFT CHAMPAGNE PLEATED SATIN CURTAIN */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-20 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-3d origin-left ${
          isOpening
            ? '-translate-x-[110%] -rotate-y-[65deg] opacity-70'
            : 'translate-x-0 rotate-y-0 opacity-100'
        } bg-satin-curtain-left border-r-2 border-[#D4AF37]/60 shadow-[25px_0_50px_rgba(0,0,0,0.9)] flex items-center justify-end overflow-hidden`}
      >
        <div className="absolute inset-y-10 right-6 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-4 text-[#D4AF37]/40 font-serif text-6xl select-none rotate-90">
          ✦
        </div>
      </div>

      {/* LUXURY RIGHT CHAMPAGNE PLEATED SATIN CURTAIN */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-20 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-3d origin-right ${
          isOpening
            ? 'translate-x-[110%] rotate-y-[65deg] opacity-70'
            : 'translate-x-0 rotate-y-0 opacity-100'
        } bg-satin-curtain-right border-l-2 border-[#D4AF37]/60 shadow-[-25px_0_50px_rgba(0,0,0,0.9)] flex items-center justify-start overflow-hidden`}
      >
        <div className="absolute inset-y-10 left-6 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-4 text-[#D4AF37]/40 font-serif text-6xl select-none -rotate-90">
          ✦
        </div>
      </div>

      {/* CENTER SHIMMER LENS FLARE (Triggers on Curtain Split) */}
      {isOpening && (
        <div className="absolute z-25 pointer-events-none w-80 h-80 rounded-full bg-gradient-to-r from-[#D4AF37]/50 via-[#FFF2B2]/60 to-[#B8860B]/50 blur-3xl animate-lens-flare" />
      )}

      {/* EDITORIAL HIGH-FASHION CENTER CARD */}
      <div
        className={`relative z-30 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-2xl bg-[#12110E]/92 backdrop-blur-2xl border border-[#D4AF37]/40 shadow-[0_30px_70px_rgba(0,0,0,0.95)] text-center text-[#F9F8F6] overflow-hidden transition-all duration-700 ${
          isOpening ? 'scale-105 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        {/* Monogram Seal */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full border border-[#D4AF37]/60 flex items-center justify-center font-serif text-xl tracking-widest text-[#D4AF37] bg-black/40 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            {groomInitial}&{brideInitial}
          </div>
        </div>

        {/* Vogue Issue Heading */}
        <div className="space-y-1 mb-3">
          <p className="text-[10px] uppercase tracking-[0.4em] font-sans text-[#D4AF37] font-semibold">
            VOGUE WEDDING EDITION • SPECIAL INVITATION
          </p>
        </div>

        {/* Couple Names */}
        <div className="my-4 space-y-1">
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2B2] via-[#E5C058] to-[#996515] leading-tight">
            {weddingData.couple.groom.shortName}
            <span className="block font-script text-3xl sm:text-4xl text-[#D4AF37] my-0.5">&</span>
            {weddingData.couple.bride.shortName}
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] font-sans text-stone-400 mt-2">
            {weddingData.events.akad.date}
          </p>
        </div>

        {/* Personalized Guest Box */}
        <div className="my-6 p-4 rounded-xl bg-black/60 border border-[#D4AF37]/25 shadow-inner">
          <p className="text-[10px] text-stone-400 font-sans uppercase tracking-[0.2em] mb-1">
            Exclusive Invitation For:
          </p>
          <h2 className="text-xl font-serif font-medium text-[#FFF2B2] capitalize tracking-wide">
            {guestName}
          </h2>
          <p className="text-[10px] text-stone-400 mt-1 italic font-sans">
            Honored Guest
          </p>
        </div>

        {/* Open Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleOpenInvitation}
            aria-label="Buka undangan mewah dan singkap tirai sutra"
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF2B2] to-[#B8860B] hover:brightness-110 text-stone-950 font-sans font-bold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2 group min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF2B2]"
          >
            <Sparkles className="w-4 h-4 text-stone-950 group-hover:rotate-45 transition-transform" aria-hidden="true" />
            <span>Buka Undangan (Singkap Tirai)</span>
          </button>
          <p className="text-[10px] text-stone-400 font-sans mt-3">
            *Ketuk tombol untuk menyingkap tirai sutra mewah & menyalakan musik
          </p>
        </div>
      </div>
    </div>
  )
}
