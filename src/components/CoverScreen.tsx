import React, { useEffect, useState } from 'react'
import { MailOpen, Calendar, Sparkles, QrCode } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useInvitationData } from '../context/InvitationContext'
import { BotanicalCorner, WaxSealEmblem } from './Ornament'
import { safeDecodeUri } from '../utils/seo'
import { VipGuestTicketModal } from './common/VipGuestTicketModal'

interface CoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ isOpen, onOpenWithAudio }) => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const [guestName, setGuestName] = useState<string>('Tamu Undangan')
  const [isOpening, setIsOpening] = useState(false)
  const [isFullyDismissed, setIsFullyDismissed] = useState(false)
  const [isVipTicketOpen, setIsVipTicketOpen] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const to = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest')
    if (to) {
      setGuestName(safeDecodeUri(to))
    }
  }, [])

  const handleOpenInvitation = () => {
    // Physical haptic vibration feedback on supported smartphones
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([35, 45, 30])
      } catch {
        // ignore
      }
    }

    // CRITICAL: Call synchronously in the user click event handler for iOS/Android autoplay
    onOpenWithAudio()
    setIsOpening(true)

    // Rich botanical sage & gold confetti blast
    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.62 },
        colors: ['#D4AF37', '#849688', '#FAF7F2', '#2D4A3E', '#F9E79F']
      })
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#D4AF37', '#849688', '#FAF7F2']
        })
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#D4AF37', '#849688', '#FAF7F2']
        })
      }, 160)
    } catch {
      // ignore
    }

    // Sequenced unmount after 3D flap unfolds and card emerges
    setTimeout(() => {
      setIsFullyDismissed(true)
    }, 1150)
  }

  if (isOpen && (isFullyDismissed || !isOpening)) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-stone-950 px-4 min-h-[100dvh] overflow-hidden perspective-1200 transition-opacity duration-500 ${
        isFullyDismissed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Image with Dark Botanical Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage}
          alt="Wedding Cover Background"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center filter brightness-[0.28] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-950/85" />
      </div>

      {/* LUXURY LEFT SAGE VELVET SLIDING PANEL */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-15 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-3d origin-left ${
          isOpening
            ? '-translate-x-full -rotate-y-[45deg] opacity-60'
            : 'translate-x-0 rotate-y-0 opacity-95'
        } border-r border-amber-400/40 bg-gradient-to-r from-stone-950 via-[#1E2B25] to-[#24362E] shadow-[15px_0_35px_rgba(0,0,0,0.8)]`}
      >
        <div className="absolute inset-y-8 right-4 w-[1px] bg-gradient-to-b from-transparent via-amber-400/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-3 text-amber-300/25 font-serif text-6xl select-none rotate-90">
          ✤
        </div>
      </div>

      {/* LUXURY RIGHT SAGE VELVET SLIDING PANEL */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-15 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-3d origin-right ${
          isOpening
            ? 'translate-x-full rotate-y-[45deg] opacity-60'
            : 'translate-x-0 rotate-y-0 opacity-95'
        } border-l border-amber-400/40 bg-gradient-to-l from-stone-950 via-[#1E2B25] to-[#24362E] shadow-[-15px_0_35px_rgba(0,0,0,0.8)]`}
      >
        <div className="absolute inset-y-8 left-4 w-[1px] bg-gradient-to-b from-transparent via-amber-400/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-amber-300/25 font-serif text-6xl select-none -rotate-90">
          ✤
        </div>
      </div>

      {/* 3D PHYSICAL BOTANICAL ENVELOPE & INVITATION LETTER */}
      <div
        className={`relative z-30 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-stone-900/90 backdrop-blur-2xl border border-amber-400/50 shadow-[0_30px_70px_rgba(0,0,0,0.85)] text-center text-white overflow-hidden transition-all duration-800 ease-out ${
          isOpening ? '-translate-y-8 scale-105 opacity-0' : 'translate-y-0 scale-100 opacity-100'
        }`}
      >
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="top-right" />
        <BotanicalCorner position="bottom-left" />
        <BotanicalCorner position="bottom-right" />

        {/* 3D Envelope Flap Decoration */}
        <div
          className={`absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-amber-500/20 to-transparent transition-transform duration-700 origin-top transform-style-3d pointer-events-none ${
            isOpening ? '-rotate-x-180 opacity-0' : 'rotate-x-0 opacity-100'
          }`}
        />

        {/* Top Header Badge */}
        <div className="space-y-1 mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-200 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-sans font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Undangan Pernikahan Botanical</span>
          </div>
        </div>

        {/* Couple Names */}
        <div className="my-3 sm:my-5 space-y-1">
          <h1 className="font-script text-5xl sm:text-6xl text-amber-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] leading-tight">
            {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
          </h1>
          <div className="flex items-center justify-center gap-2 text-stone-300 font-serif italic text-xs sm:text-sm mt-1">
            <Calendar className="w-3.5 h-3.5 text-amber-300/80" />
            <span>{weddingData.events.akad.date}</span>
          </div>
        </div>

        {/* 3D Wax Seal Medallion with Interactive Pop Effect */}
        <div className="my-3 sm:my-4 flex justify-center">
          <div
            className={`transition-all duration-500 cursor-pointer ${
              isOpening ? 'scale-125 rotate-12 opacity-0' : 'scale-100 hover:scale-105'
            }`}
          >
            <WaxSealEmblem
              monogram={`${weddingData.couple.groom.shortName.charAt(0).toUpperCase()} 💍 ${weddingData.couple.bride.shortName.charAt(0).toUpperCase()}`}
              onClick={handleOpenInvitation}
            />
          </div>
        </div>

        {/* Personalized Guest Card with VIP Ticket Trigger */}
        <div className="my-5 py-4 px-4 sm:px-6 rounded-2xl bg-black/55 border border-amber-500/30 shadow-inner">
          <p className="text-[10px] sm:text-xs text-stone-300 uppercase tracking-widest font-sans mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-200 capitalize tracking-wide break-words">
            {guestName}
          </h2>
          <p className="text-[10px] text-stone-400 mt-1 italic font-sans">
            di Tempat
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsVipTicketOpen(true)
            }}
            className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-[10px] text-amber-200 font-mono tracking-wider transition-all cursor-pointer"
          >
            <QrCode className="w-3 h-3 text-amber-400" />
            <span>🎟️ Tiket VIP & QR Check-in</span>
          </button>
        </div>

        {/* Open Button with Pulsing Gold Glow */}
        <div className="relative inline-block mt-1">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-600 opacity-75 blur-md animate-pulse" aria-hidden="true" />
          <button
            type="button"
            onClick={handleOpenInvitation}
            aria-label="Buka segel lilin dan nyalakan musik latar"
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 text-stone-950 font-sans font-bold text-xs sm:text-sm tracking-wide shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 min-h-[48px]"
          >
            <MailOpen className="w-4 h-4 text-stone-900 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
            <span className="tracking-wider uppercase font-semibold">Buka Undangan (Lepas Segel)</span>
          </button>
        </div>

        <p className="text-[10px] sm:text-[11px] text-stone-400 mt-4 sm:mt-5 font-sans leading-relaxed">
          *Ketuk tombol atau segel emas untuk membuka amplop 3D & memutar lagu
        </p>
      </div>

      {/* VIP Guest Ticket & QR Check-in Modal */}
      <VipGuestTicketModal
        isOpen={isVipTicketOpen}
        onClose={() => setIsVipTicketOpen(false)}
        guestName={guestName}
        coupleName={`${weddingData.couple.groom.shortName} & ${weddingData.couple.bride.shortName}`}
        eventDate={weddingData.events.akad.date}
        venue={weddingData.events.akad.venue}
        templateName={activeTemplate.name}
      />
    </div>
  )
}
