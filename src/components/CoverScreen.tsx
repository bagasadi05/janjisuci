import React, { useEffect, useState } from 'react'
import { MailOpen, Calendar, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useInvitationData } from '../context/InvitationContext'
import { BotanicalCorner, WaxSealEmblem } from './Ornament'

interface CoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ isOpen, onOpenWithAudio }) => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const [guestName, setGuestName] = useState<string>('Tamu Undangan')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Read query parameter for personalized invitation (?to=Nama+Tamu or ?u=Nama+Tamu)
    const urlParams = new URLSearchParams(window.location.search)
    const to = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest')
    if (to) {
      setGuestName(decodeURIComponent(to.replace(/\+/g, ' ')))
    }
  }, [])

  const handleOpenInvitation = () => {
    // CRITICAL: Call onOpenWithAudio() synchronously in the user click event handler
    // This satisfies Chrome, Safari, and Firefox autoplay policy 100%!
    onOpenWithAudio()

    setIsAnimating(true)

    // Trigger rich multi-directional confetti blast
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.62 },
        colors: ['#D4AF37', '#849688', '#FAF7F2', '#B86B5A', '#FFFFFF']
      })
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#D4AF37', '#849688', '#FAF7F2']
        })
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#D4AF37', '#849688', '#FAF7F2']
        })
      }, 160)
    } catch {
      // ignore
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-stone-950 transition-all duration-700 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage}
          alt="Wedding Cover Background"
          className="w-full h-full object-cover object-center filter brightness-[0.32] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-stone-950/80" />
      </div>

      {/* Royal Luxury Envelope Card Container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-stone-900/60 backdrop-blur-xl border border-amber-400/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-center text-white overflow-hidden">
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="top-right" />
        <BotanicalCorner position="bottom-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Top Header Badge */}
        <div className="space-y-1 mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-200 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-sans font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Undangan Pernikahan</span>
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

        {/* Wax Seal Medallion */}
        <div className="my-3 sm:my-4 flex justify-center">
          <WaxSealEmblem
            monogram={`${weddingData.couple.groom.shortName.charAt(0).toUpperCase()} 💍 ${weddingData.couple.bride.shortName.charAt(0).toUpperCase()}`}
            onClick={handleOpenInvitation}
          />
        </div>

        {/* Personalized Guest Card */}
        <div className="my-5 py-4 px-4 sm:px-6 rounded-2xl bg-black/45 border border-amber-500/25 shadow-inner">
          <p className="text-[10px] sm:text-xs text-stone-300 uppercase tracking-widest font-sans mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-200 capitalize tracking-wide break-words">
            {guestName}
          </h2>
          <p className="text-[10px] text-stone-400 mt-1 italic font-sans">
            di Tempat
          </p>
        </div>

        {/* Open Button with Pulsing Gold Glow */}
        <div className="relative inline-block mt-1">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-70 blur-md animate-pulse" />
          <button
            onClick={handleOpenInvitation}
            className="group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-sans font-bold text-xs sm:text-sm tracking-wide shadow-xl hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <MailOpen className="w-4 h-4 text-stone-900 transition-transform group-hover:-translate-y-0.5" />
            <span>Buka Undangan</span>
          </button>
        </div>

        <p className="text-[10px] sm:text-[11px] text-stone-400 mt-4 sm:mt-5 font-sans leading-relaxed">
          *Ketuk segel atau tombol untuk membuka undangan & menyalakan lagu
        </p>
      </div>
    </div>
  )
}
