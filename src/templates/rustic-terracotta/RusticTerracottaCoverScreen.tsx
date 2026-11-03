import React, { useEffect, useState } from 'react'
import { Sparkles, Calendar, Heart, MailOpen } from 'lucide-react'
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
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#2B231D] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
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

      {/* LUXURY LEFT BOHO TERRACOTTA SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-r border-[#C06C54]/40 bg-gradient-to-r from-[#2B231D] via-[#3D2C24]/95 to-[#50372B]/90 backdrop-blur-md ${
          isAnimating ? '-translate-x-full -rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 right-4 w-[1px] bg-gradient-to-b from-transparent via-[#DDA15E]/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-3 text-[#DDA15E]/30 font-serif text-5xl select-none rotate-90">
          🌾
        </div>
      </div>

      {/* LUXURY RIGHT BOHO TERRACOTTA SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-l border-[#C06C54]/40 bg-gradient-to-l from-[#2B231D] via-[#3D2C24]/95 to-[#50372B]/90 backdrop-blur-md ${
          isAnimating ? 'translate-x-full rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 left-4 w-[1px] bg-gradient-to-b from-transparent via-[#DDA15E]/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-[#DDA15E]/30 font-serif text-5xl select-none -rotate-90">
          🌾
        </div>
      </div>

      {/* Main Vintage Airmail Kraft Envelope Card */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#F7EFE6]/95 text-[#3D2C24] shadow-[0_30px_70px_rgba(0,0,0,0.85)] border-4 border-[#C06C54]/30 overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Airmail Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(45deg,#C06C54,#C06C54_10px,#E6CCB2_10px,#E6CCB2_20px)] opacity-70" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(45deg,#C06C54,#C06C54_10px,#E6CCB2_10px,#E6CCB2_20px)] opacity-70" />

        {/* Vintage Stamp at Top Right */}
        <div className="absolute top-4 right-4 p-2 rounded-lg border-2 border-dashed border-[#C06C54] bg-[#EEDFD0] text-center rotate-6 shadow-sm">
          <p className="text-[8px] font-mono tracking-widest text-[#A0522D] font-bold">POS CINTA</p>
          <Heart className="w-3.5 h-3.5 text-[#C06C54] mx-auto my-0.5 fill-[#C06C54]/30" />
          <p className="text-[8px] font-mono text-stone-600">2026</p>
        </div>

        {/* Top Header */}
        <div className="space-y-1 mt-1 mb-3 text-left">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C06C54] font-bold font-sans">
            SURAT KHUSUS • UNDANGAN PERNIKAHAN
          </span>
          <p className="font-serif italic text-xs text-stone-600">
            Dengan penuh kebahagiaan, kami mengundang Anda
          </p>
        </div>

        {/* Couple Names in Warm Terracotta Script */}
        <div className="my-3 text-center">
          <h1 className="font-script text-5xl sm:text-6xl text-[#A0522D] drop-shadow-sm leading-tight">
            {weddingData.couple.groom.shortName} &amp; {weddingData.couple.bride.shortName}
          </h1>
          <p className="font-serif text-xs text-stone-600 mt-1 flex items-center justify-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#C06C54]" />
            <span>{weddingData.events.akad.date}</span>
          </p>
        </div>

        {/* Personalized Guest Tag with Twine Style */}
        <div className="my-4 p-3.5 rounded-2xl bg-[#EEDFD0] border border-[#D9C3B0] text-center relative shadow-inner">
          <p className="text-[10px] text-stone-500 uppercase tracking-widest font-sans">
            KEPADA YTH. SAUDARA/I:
          </p>
          <p className="font-serif font-bold text-lg text-[#A0522D] capitalize mt-0.5">
            {guestName}
          </p>
        </div>

        {/* Open Button with Vintage Wax Style */}
        <div className="relative inline-block mt-1 w-full">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#C06C54] via-[#DDA15E] to-[#A0522D] opacity-75 blur-md animate-pulse" aria-hidden="true" />
          <button
            type="button"
            onClick={handleOpenInvitation}
            aria-label="Buka surat undangan dan nyalakan musik"
            className="group relative w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#A0522D] via-[#C06C54] to-[#A0522D] text-white font-sans font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C06C54]"
          >
            <MailOpen className="w-4 h-4 text-white"  aria-hidden="true"/>
            <span>BUKA SURAT UNDANGAN</span>
          </button>
        </div>

        <p className="text-[10px] text-stone-500 mt-4 font-sans text-center">
          *Ketuk tombol untuk membuka amplop &amp; menyalakan musik
        </p>
      </div>
    </div>
  )
}
