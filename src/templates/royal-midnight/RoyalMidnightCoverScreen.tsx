import React, { useState, useEffect } from 'react'
import { MailOpen, Sparkles } from 'lucide-react'
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const to = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest')
    if (to) {
      setGuestName(decodeURIComponent(to.replace(/\+/g, ' ')))
    }
  }, [])

  if (isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A] overflow-hidden">
      {/* Background with Dark Texture & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85"}
          alt="Midnight Background"
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/60 to-[#0A0A0A]/95" />
      </div>

      {/* Subtle Star Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(215,187,131,0.15)_0%,_transparent_70%)]" />
      </div>

      {/* Central Glass Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto p-7 sm:p-9 rounded-3xl bg-black/60 backdrop-blur-xl border border-[#D7BB83]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-center text-white flex flex-col items-center">
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
        <div className="my-5 w-full py-4 px-4 sm:px-6 rounded-2xl bg-black/50 border border-[#D7BB83]/30 shadow-inner">
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
            onClick={onOpenWithAudio}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D7BB83] via-[#F3E5C8] to-[#B99A5C] text-stone-950 font-serif font-bold text-sm tracking-wider shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <MailOpen className="w-4 h-4 text-stone-900 transition-transform group-hover:-translate-y-0.5" />
            <span>Buka Undangan</span>
          </button>
        </div>

        <p className="text-[10px] sm:text-[11px] text-stone-400 mt-5 font-sans leading-relaxed">
          *Ketuk tombol untuk membuka undangan &amp; memutar lagu
        </p>
      </div>
    </div>
  )
}
