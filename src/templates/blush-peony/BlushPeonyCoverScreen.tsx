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
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#2E1822] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
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

      {/* LUXURY LEFT PEONY ARCH SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-r border-[#FFCCD5]/40 bg-gradient-to-r from-[#2E1822] via-[#4A2033]/95 to-[#5C273F]/90 backdrop-blur-md ${
          isAnimating ? '-translate-x-full -rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 right-4 w-[1px] bg-gradient-to-b from-transparent via-[#FFB3C6]/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-3 text-[#FFB3C6]/30 font-serif text-5xl select-none rotate-90">
          ❦
        </div>
      </div>

      {/* LUXURY RIGHT PEONY ARCH SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-l border-[#FFCCD5]/40 bg-gradient-to-l from-[#2E1822] via-[#4A2033]/95 to-[#5C273F]/90 backdrop-blur-md ${
          isAnimating ? 'translate-x-full rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 left-4 w-[1px] bg-gradient-to-b from-transparent via-[#FFB3C6]/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-[#FFB3C6]/30 font-serif text-5xl select-none -rotate-90">
          ❦
        </div>
      </div>

      {/* Main Floral Card */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#FFF9FA]/95 text-[#4A2033] shadow-[0_30px_70px_rgba(0,0,0,0.85)] border-2 border-[#FFCCD5] text-center overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Top Flower Wreath Icon */}
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-full bg-[#FFE5EC] border-2 border-[#FFB3C6] flex items-center justify-center shadow-inner">
            <Flower2 className="w-7 h-7 text-[#B76E79]" />
          </div>
        </div>

        <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#B76E79] font-bold">
          UNDANGAN PERNIKAHAN
        </p>

        {/* Couple Names in Romantic Script */}
        <div className="my-3 space-y-1">
          <h1 className="font-script text-5xl sm:text-6xl text-[#6A2E46] leading-tight">
            {weddingData.couple.groom.shortName} &amp; {weddingData.couple.bride.shortName}
          </h1>
          <p className="font-serif text-xs text-[#B76E79] mt-1 flex items-center justify-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#B76E79]" />
            <span>{weddingData.events.akad.date}</span>
          </p>
        </div>

        {/* Guest Tag */}
        <div className="my-4 p-3.5 rounded-2xl bg-[#FFE5EC]/80 border border-[#FFCCD5] text-center shadow-sm">
          <p className="text-[10px] text-stone-500 uppercase tracking-widest font-sans">
            KEPADA TAMU KEHORMATAN:
          </p>
          <p className="font-serif font-bold text-lg text-[#6A2E46] capitalize mt-0.5">
            {guestName}
          </p>
        </div>

        {/* Open Button */}
        <div className="relative inline-block mt-1 w-full">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FB6F92] via-[#FFB3C6] to-[#B76E79] opacity-75 blur-md animate-pulse" aria-hidden="true" />
          <button
            type="button"
            onClick={handleOpenInvitation}
            aria-label="Buka undangan dan nyalakan musik"
            className="group relative w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#6A2E46] via-[#B76E79] to-[#6A2E46] text-white font-sans font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB3C6]"
          >
            <MailOpen className="w-4 h-4 text-white"  aria-hidden="true"/>
            <span>BUKA UNDANGAN</span>
          </button>
        </div>

        <p className="text-[10px] text-stone-400 mt-4 font-sans">
          *Ketuk tombol untuk membuka taman bunga &amp; menyalakan musik
        </p>
      </div>
    </div>
  )
}
