import React, { useState, useEffect } from 'react'
import { MailOpen, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useInvitationData } from '../../context/InvitationContext'

interface RoyalMidnightCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
}

export const RoyalMidnightCoverScreen: React.FC<RoyalMidnightCoverScreenProps> = ({
  isOpen,
  onOpenWithAudio
}) => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const [guestName, setGuestName] = useState('Tamu Undangan')
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
        colors: ['#D7BB83', '#F3E5C8', '#FFFDF9', '#8C6D3F', '#B99A5C']
      })
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#D7BB83', '#F3E5C8', '#FFFFFF']
        })
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#D7BB83', '#F3E5C8', '#FFFFFF']
        })
      }, 160)
    } catch {
      // ignore
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A] transition-all duration-1000 ease-in-out min-h-[100dvh] overflow-hidden ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background with Dark Texture & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85"}
          alt="Midnight Background"
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/60 to-[#0A0A0A]/95" />
      </div>

      {/* LUXURY LEFT MIDNIGHT VELVET SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-r border-[#D7BB83]/40 bg-gradient-to-r from-[#0A0A0A] via-[#14120E]/95 to-[#1F1B14]/90 backdrop-blur-md ${
          isAnimating ? '-translate-x-full -rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 right-4 w-[1px] bg-gradient-to-b from-transparent via-[#D7BB83]/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 right-3 text-[#D7BB83]/30 font-serif text-5xl select-none rotate-90">
          ✧
        </div>
      </div>

      {/* LUXURY RIGHT MIDNIGHT VELVET SLIDING GATE */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-10 pointer-events-none transition-transform duration-1000 ease-in-out border-l border-[#D7BB83]/40 bg-gradient-to-l from-[#0A0A0A] via-[#14120E]/95 to-[#1F1B14]/90 backdrop-blur-md ${
          isAnimating ? 'translate-x-full rotate-2' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="absolute inset-y-10 left-4 w-[1px] bg-gradient-to-b from-transparent via-[#D7BB83]/60 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-[#D7BB83]/30 font-serif text-5xl select-none -rotate-90">
          ✧
        </div>
      </div>

      {/* Central Glass Card */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-7 sm:p-9 rounded-3xl bg-black/75 backdrop-blur-2xl border border-[#D7BB83]/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] text-center text-white flex flex-col items-center transition-all duration-700 ${
          isAnimating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Top Ornament Icon */}
        <div className="mb-4">
          <img
            src="https://websiteinvite.id/wp-content/uploads/2025/07/Midnight-02-Icon.png"
            alt="Royal Midnight Ornament"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain filter drop-shadow-[0_2px_8px_rgba(215,187,131,0.5)]"
          />
        </div>

        {/* Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D7BB83]/15 border border-[#D7BB83]/30 text-[#D7BB83] text-[11px] sm:text-xs uppercase tracking-[0.25em] font-serif mb-3">
          <Sparkles className="w-3 h-3 text-[#D7BB83]" />
          <span>The Wedding of</span>
        </div>

        {/* Couple Names */}
        <div className="my-2 space-y-1">
          <h1 className="font-pinyon text-5xl sm:text-6xl text-[#D7BB83] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] leading-tight">
            {weddingData.couple.bride.shortName} &amp; {weddingData.couple.groom.shortName}
          </h1>
          <p className="font-serif italic text-xs sm:text-sm text-stone-300 tracking-wider">
            {weddingData.events.akad.date}
          </p>
        </div>

        {/* Personalized Guest Box */}
        <div className="my-5 w-full py-4 px-4 sm:px-6 rounded-2xl bg-black/60 border border-[#D7BB83]/30 shadow-inner">
          <p className="text-[11px] sm:text-xs text-stone-300 font-serif tracking-wide mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FFFCF3] capitalize tracking-wide break-words drop-shadow-sm">
            {guestName}
          </h2>
          <p className="text-[10px] text-stone-400 mt-2 italic font-sans leading-relaxed">
            Mohon maaf apabila ada kesalahan pada penulisan nama &amp; gelar
          </p>
        </div>

        {/* Open Button with Glowing Gold Accent */}
        <div className="relative mt-2">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#B99A5C] via-[#D7BB83] to-[#5C4324] opacity-75 blur-md animate-pulse" />
          <button
            onClick={handleOpenInvitation}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-[#D7BB83] via-[#F3E5C8] to-[#B99A5C] text-stone-950 font-serif font-bold text-sm tracking-wider shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <MailOpen className="w-4 h-4 text-stone-900 transition-transform group-hover:-translate-y-0.5" />
            <span className="uppercase tracking-wider">Buka Undangan</span>
          </button>
        </div>

        <p className="text-[10px] sm:text-[11px] text-stone-400 mt-5 font-sans leading-relaxed">
          *Ketuk tombol untuk membuka tirai midnight &amp; memutar lagu
        </p>
      </div>
    </div>
  )
}
