import React, { useEffect, useState, useRef } from 'react'
import { MailOpen, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useInvitationData } from '../../context/InvitationContext'

interface AdatBanjarCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
}

export const AdatBanjarCoverScreen: React.FC<AdatBanjarCoverScreenProps> = ({
  isOpen,
  onOpenWithAudio
}) => {
  const { data: weddingData } = useInvitationData()
  const [guestName, setGuestName] = useState<string>('Tamu Undangan')
  const [isAnimating, setIsAnimating] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

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
        origin: { y: 0.65 },
        colors: ['#D7BB83', '#722C2C', '#FFFFFF', '#E5C058']
      })
      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors: ['#D7BB83', '#FFFCF3', '#722C2C']
        })
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors: ['#D7BB83', '#FFFCF3', '#722C2C']
        })
      }, 180)
    } catch {
      // ignore
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      style={{ backgroundColor: '#140505' }}
    >
      {/* 1. CINEMATIC MOTION VIDEO BACKGROUND (Identical to undanganwebkami.id/adat-banjar) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://undanganwebkami.id/wp-content/uploads/2025/12/Banjar-Background.jpeg"
          className="w-full h-full object-cover object-center filter brightness-[0.38] scale-105 transition-opacity duration-1000"
        >
          <source
            src="https://undanganwebkami.id/wp-content/uploads/2025/12/Motion-Banjar-Compress.mp4"
            type="video/mp4"
          />
        </video>

        {/* Traditional Sasirangan Vignette & Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#140505] via-[#140505]/45 to-[#140505]/85 pointer-events-none" />
      </div>

      {/* Traditional Banjar Top Arch Motif */}
      <img
        src="https://undanganwebkami.id/wp-content/uploads/2025/12/Banjar-Motif-Atas.png"
        alt="Ornamen Banjar Atas"
        className="absolute top-0 inset-x-0 w-full max-w-lg mx-auto pointer-events-none opacity-85 z-10"
      />

      {/* Traditional Banjar Bottom Arch Motif */}
      <img
        src="https://undanganwebkami.id/wp-content/uploads/2025/12/Banjar-Motif-Bawah.png"
        alt="Ornamen Banjar Bawah"
        className="absolute bottom-0 inset-x-0 w-full max-w-lg mx-auto pointer-events-none opacity-85 z-10"
      />

      {/* Royal Cover Envelope Card */}
      <div className="relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-[#FFFDF7]/95 text-stone-900 border-2 border-[#D7BB83] shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-center overflow-hidden backdrop-blur-md">
        {/* Subtle Sasirangan Watermark inside Card */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("https://undanganwebkami.id/wp-content/uploads/2025/12/Banjar-Seamless-Pattern.png")`,
            backgroundSize: '180px'
          }}
        />

        {/* Traditional Rumah Bubungan Tinggi Emblem */}
        <div className="relative flex justify-center mb-3">
          <img
            src="https://undanganwebkami.id/wp-content/uploads/2025/12/Banjar-Icon.png"
            alt="Emblem Rumah Banjar Bubungan Tinggi"
            className="w-24 h-auto drop-shadow-md animate-pulse"
          />
        </div>

        {/* Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#722C2C]/10 border border-[#D7BB83]/60 text-[#722C2C] text-[10px] sm:text-xs uppercase tracking-[0.25em] font-sans font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D7BB83]" />
          <span>The Wedding of</span>
        </div>

        {/* Couple Names */}
        <div className="my-2 sm:my-3">
          <h1 className="font-script text-4xl sm:text-5xl text-[#722C2C] leading-tight drop-shadow-sm">
            {weddingData.couple.groom.shortName} &amp; {weddingData.couple.bride.shortName}
          </h1>
          <p className="font-serif italic text-xs sm:text-sm text-stone-600 mt-1">
            {weddingData.events.akad.date}
          </p>
        </div>

        {/* Couple Banjar Traditional Outfit Illustrations */}
        <div className="flex items-center justify-center gap-4 my-3.5">
          <img
            src="https://undanganwebkami.id/wp-content/uploads/2025/12/Banjar-Couple-Depan-1.png"
            alt="Pengantin Pria Banjar"
            className="w-20 sm:w-24 h-auto drop-shadow-lg transform -rotate-1"
          />
          <img
            src="https://undanganwebkami.id/wp-content/uploads/2025/12/Banjar-Couple-Depan-2.png"
            alt="Pengantin Wanita Banjar"
            className="w-20 sm:w-24 h-auto drop-shadow-lg transform rotate-1"
          />
        </div>

        {/* Personalized Guest Box */}
        <div className="my-4 py-3.5 px-4 rounded-2xl bg-[#361111]/8 border border-[#D7BB83]/70 shadow-inner">
          <p className="text-[10px] text-stone-600 uppercase tracking-widest font-sans mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#722C2C] capitalize tracking-wide break-words">
            {guestName}
          </h2>
          <p className="text-[10px] text-stone-500 mt-0.5 italic font-sans">
            di Tempat
          </p>
        </div>

        {/* Open Button with Royal Banjar Gold Accent */}
        <div className="relative inline-block mt-1">
          <button
            onClick={handleOpenInvitation}
            className="group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#D7BB83] via-[#E5C058] to-[#A38C5E] text-[#291206] font-sans font-bold text-xs sm:text-sm tracking-wide shadow-xl hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer border border-[#D7BB83]"
          >
            <MailOpen className="w-4 h-4 text-[#291206] transition-transform group-hover:-translate-y-0.5" />
            <span>Buka Undangan</span>
          </button>
        </div>

        <p className="text-[10px] text-stone-500 mt-3.5 font-sans leading-relaxed">
          *Ketuk tombol untuk membuka undangan &amp; memutar lantunan musik
        </p>
      </div>
    </div>
  )
}
