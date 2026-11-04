import React, { useEffect, useState } from 'react'
import { Sparkles, Crown, Calendar } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useInvitationData } from '../../context/InvitationContext'

interface ExclusiveNavyCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
  guestName?: string
  coupleNames?: string
  dateText?: string
}

export const ExclusiveNavyCoverScreen: React.FC<ExclusiveNavyCoverScreenProps> = ({
  isOpen,
  onOpenWithAudio,
  guestName: propGuestName,
  coupleNames = 'Nabilah & Yoga',
  dateText = '20 . 12 . 2025'
}) => {
  const { activeTemplate } = useInvitationData()
  const [guestName, setGuestName] = useState<string>(propGuestName || 'Tamu Undangan')
  const [isOpening, setIsOpening] = useState(false)
  const [isFullyDismissed, setIsFullyDismissed] = useState(false)

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
    setIsOpening(true)

    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.62 },
        colors: ['#D4AF37', '#1E3E62', '#E5C058', '#FFFFFF', '#0B192C']
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

    setTimeout(() => {
      setIsFullyDismissed(true)
    }, 1150)
  }

  if (isOpen && (isFullyDismissed || !isOpening)) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#050C15] px-4 min-h-[100dvh] overflow-hidden perspective-1200 transition-opacity duration-500 ${
        isFullyDismissed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1E3E62]/40 via-[#0B192C] to-[#050C15] pointer-events-none" />

      {/* Decorative luxury gold arches & glowing orbs */}
      <div className="absolute -top-32 w-80 h-80 rounded-full bg-amber-500/10 blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-32 w-80 h-80 rounded-full bg-blue-600/15 blur-[100px] pointer-events-none" />

      {/* 3D LEFT ROYAL NAVY DOOR */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-20 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-3d origin-left ${
          isOpening
            ? '-translate-x-[110%] -rotate-y-[70deg] opacity-70'
            : 'translate-x-0 rotate-y-0 opacity-100'
        } bg-gradient-to-r from-[#050C15] via-[#0B192C] to-[#142944] border-r-2 border-amber-400/50 shadow-[20px_0_40px_rgba(0,0,0,0.9)] flex items-center justify-end overflow-hidden`}
      >
        <div className="absolute inset-y-10 right-6 w-[1.5px] bg-gradient-to-b from-transparent via-amber-400/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-4 text-amber-300/30 font-serif text-5xl select-none rotate-90">
          👑
        </div>
      </div>

      {/* 3D RIGHT ROYAL NAVY DOOR */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-20 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-3d origin-right ${
          isOpening
            ? 'translate-x-[110%] rotate-y-[70deg] opacity-70'
            : 'translate-x-0 rotate-y-0 opacity-100'
        } bg-gradient-to-l from-[#050C15] via-[#0B192C] to-[#142944] border-l-2 border-amber-400/50 shadow-[-20px_0_40px_rgba(0,0,0,0.9)] flex items-center justify-start overflow-hidden`}
      >
        <div className="absolute inset-y-10 left-6 w-[1.5px] bg-gradient-to-b from-transparent via-amber-400/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-4 text-amber-300/30 font-serif text-5xl select-none -rotate-90">
          👑
        </div>
      </div>

      {/* CENTER GOLDEN LENS AURA (Triggers on Click) */}
      {isOpening && (
        <div className="absolute z-25 pointer-events-none w-80 h-80 rounded-full bg-gradient-to-r from-amber-400/40 via-blue-400/40 to-yellow-300/40 blur-3xl animate-lens-flare" />
      )}

      {/* Royal Arch Frame Card Container */}
      <div
        className={`relative z-30 w-full max-w-sm sm:max-w-md mx-auto p-7 sm:p-9 rounded-[2.5rem] bg-[#0B192C]/90 backdrop-blur-2xl border-2 border-amber-400/40 shadow-[0_30px_70px_rgba(0,0,0,0.95)] text-center text-white overflow-hidden transition-all duration-700 ${
          isOpening ? 'scale-105 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        {/* Crown & Royal Header */}
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            <Crown className="w-7 h-7 text-amber-300" />
          </div>
        </div>

        <div className="space-y-1 mb-2">
          <p className="text-[10px] uppercase tracking-[0.35em] font-sans text-amber-300 font-semibold">
            ROYAL WEDDING INVITATION
          </p>
        </div>

        {/* Couple Names */}
        <div className="my-4">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#E5C058] to-[#996515] drop-shadow-md">
            {coupleNames}
          </h1>
          <p className="text-xs text-amber-200/90 font-serif italic mt-2 flex items-center justify-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{dateText}</span>
          </p>
        </div>

        {/* Personalized Guest Badge */}
        <div className="my-5 p-4 rounded-2xl bg-[#050C15]/80 border border-amber-400/30 text-center shadow-inner">
          <p className="text-[10px] text-stone-400 font-sans tracking-widest uppercase mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="font-serif font-bold text-xl text-amber-200 capitalize">
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
            aria-label="Buka pintu istana dan putar musik pernikahan"
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 hover:brightness-110 text-stone-950 font-sans font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center justify-center gap-2 group min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <Sparkles className="w-4 h-4 text-stone-900 group-hover:rotate-45 transition-transform" aria-hidden="true" />
            <span>Buka Undangan (Buka Pintu Istana)</span>
          </button>
          <p className="text-[10px] text-stone-400 font-sans mt-3">
            *Sentuh untuk membuka gerbang istana emas 3D & memutar lagu
          </p>
        </div>
      </div>
    </div>
  )
}
