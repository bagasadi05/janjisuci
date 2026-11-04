import React, { useEffect, useState } from 'react'
import { Sparkles, Calendar, Flower2, MailOpen } from 'lucide-react'
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
        colors: ['#FFB3C6', '#FB6F92', '#B76E79', '#FFFFFF', '#FDF5F5', '#D4AF37']
      })
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#FFB3C6', '#FB6F92', '#FFFFFF']
        })
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#FFB3C6', '#FB6F92', '#FFFFFF']
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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1F1316] px-4 min-h-[100dvh] overflow-hidden perspective-1200 transition-opacity duration-500 ${
        isFullyDismissed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Image with Romantic Peony Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage}
          alt="Blush Peony Cover"
          className="w-full h-full object-cover object-center filter brightness-[0.25] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1316] via-[#1F1316]/80 to-[#2E1A20]/90" />
      </div>

      {/* 3D LEFT BLUSH PEONY PANEL */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-20 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-3d origin-left ${
          isOpening
            ? '-translate-x-[110%] -rotate-y-[65deg] opacity-70'
            : 'translate-x-0 rotate-y-0 opacity-100'
        } bg-gradient-to-r from-[#170E10] via-[#2D1B20] to-[#3D252C] border-r-2 border-[#FB6F92]/40 shadow-[20px_0_40px_rgba(0,0,0,0.9)] flex items-center justify-end overflow-hidden`}
      >
        <div className="absolute inset-y-10 right-6 w-[1.5px] bg-gradient-to-b from-transparent via-[#FB6F92] to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-4 text-[#FB6F92]/30 font-serif text-5xl select-none rotate-90">
          🌸
        </div>
      </div>

      {/* 3D RIGHT BLUSH PEONY PANEL */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-20 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-3d origin-right ${
          isOpening
            ? 'translate-x-[110%] rotate-y-[65deg] opacity-70'
            : 'translate-x-0 rotate-y-0 opacity-100'
        } bg-gradient-to-l from-[#170E10] via-[#2D1B20] to-[#3D252C] border-l-2 border-[#FB6F92]/40 shadow-[-20px_0_40px_rgba(0,0,0,0.9)] flex items-center justify-start overflow-hidden`}
      >
        <div className="absolute inset-y-10 left-6 w-[1.5px] bg-gradient-to-b from-transparent via-[#FB6F92] to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-4 text-[#FB6F92]/30 font-serif text-5xl select-none -rotate-90">
          🌸
        </div>
      </div>

      {/* CENTER BLUSH AURA FLARE */}
      {isOpening && (
        <div className="absolute z-25 pointer-events-none w-80 h-80 rounded-full bg-gradient-to-r from-[#FB6F92]/50 via-[#FFB3C6]/60 to-[#D4AF37]/40 blur-3xl animate-lens-flare" />
      )}

      {/* CENTER PEONY CARD */}
      <div
        className={`relative z-30 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#26171B]/92 backdrop-blur-2xl border-2 border-[#FB6F92]/35 shadow-[0_30px_70px_rgba(0,0,0,0.95)] text-center text-[#FFF5F7] overflow-hidden transition-all duration-700 ${
          isOpening ? 'scale-105 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        {/* Flower Emblem */}
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-full bg-[#FB6F92]/15 border border-[#FB6F92]/40 flex items-center justify-center shadow-[0_0_15px_rgba(251,111,146,0.3)]">
            <Flower2 className="w-7 h-7 text-[#FFB3C6]" />
          </div>
        </div>

        <div className="space-y-1 mb-2">
          <p className="text-[10px] uppercase tracking-[0.35em] font-sans text-rose-300 font-semibold">
            ROMANTIC BLUSH & PEONY
          </p>
        </div>

        {/* Couple Names */}
        <div className="my-4">
          <h1 className="font-script text-5xl sm:text-6xl text-rose-100 drop-shadow-md leading-tight">
            {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
          </h1>
          <p className="text-xs text-rose-200/90 font-serif italic mt-2 flex items-center justify-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-rose-300" />
            <span>{weddingData.events.akad.date}</span>
          </p>
        </div>

        {/* Personalized Guest Badge */}
        <div className="my-5 p-4 rounded-2xl bg-[#1A0F12]/80 border border-[#FB6F92]/25 text-center shadow-inner">
          <p className="text-[10px] text-stone-400 font-sans tracking-widest uppercase mb-1">
            Undangan Spesial Untuk:
          </p>
          <p className="font-serif font-bold text-xl text-rose-200 capitalize">
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
            aria-label="Buka undangan bunga peony dan putar musik"
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#FB6F92] via-[#FFB3C6] to-[#E5989B] hover:brightness-110 text-stone-950 font-sans font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(251,111,146,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center justify-center gap-2 group min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB3C6]"
          >
            <MailOpen className="w-4 h-4 text-stone-950 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            <span>Buka Undangan (Mekar Bunga)</span>
          </button>
          <p className="text-[10px] text-stone-400 font-sans mt-3">
            *Sentuh untuk membuka gerbang kelopak peony 3D & memutar lagu
          </p>
        </div>
      </div>
    </div>
  )
}
