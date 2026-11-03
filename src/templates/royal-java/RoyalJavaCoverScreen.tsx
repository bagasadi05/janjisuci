import React, { useEffect, useState } from 'react'
import { Sparkles, Calendar } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useInvitationData } from '../../context/InvitationContext'
import { GununganWayangSvg, SuryaMajapahitSeal, JavaneseCorner } from './RoyalJavaOrnaments'

interface RoyalJavaCoverScreenProps {
  isOpen: boolean
  onOpenWithAudio: () => void
}

export const RoyalJavaCoverScreen: React.FC<RoyalJavaCoverScreenProps> = ({
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
    // CRITICAL: Call synchronously for audio autoplay policy
    onOpenWithAudio()
    setIsAnimating(true)

    try {
      // Golden royal confetti blast
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F9E79F', '#D4AF37', '#C8963E', '#8A5A1B', '#FFFDF9']
      })
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
          colors: ['#D4AF37', '#C8963E', '#F9E79F']
        })
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
          colors: ['#D4AF37', '#C8963E', '#F9E79F']
        })
      }, 180)
    } catch {
      // ignore
    }
  }

  if (isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#120F0D] transition-all duration-1000 ease-in-out px-4 min-h-[100dvh] overflow-hidden ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Image with Dark Ebony Keraton Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage}
          alt="Royal Javanese Background"
          className="w-full h-full object-cover object-center filter brightness-[0.22] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120F0D] via-[#120F0D]/80 to-[#120F0D]/90" />
      </div>

      {/* LEFT SPLIT GUNUNGAN GATE */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 flex items-center justify-end z-10 pointer-events-none transition-transform duration-1000 ease-in-out ${
          isAnimating ? '-translate-x-full -rotate-6' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="relative opacity-60 sm:opacity-75 translate-x-12 sm:translate-x-20">
          <GununganWayangSvg side="left" className="w-56 sm:w-80 h-auto" />
        </div>
      </div>

      {/* RIGHT SPLIT GUNUNGAN GATE */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 flex items-center justify-start z-10 pointer-events-none transition-transform duration-1000 ease-in-out ${
          isAnimating ? 'translate-x-full rotate-6' : 'translate-x-0 rotate-0'
        }`}
      >
        <div className="relative opacity-60 sm:opacity-75 -translate-x-12 sm:-translate-x-20">
          <GununganWayangSvg side="right" className="w-56 sm:w-80 h-auto" />
        </div>
      </div>

      {/* CENTER ROYAL INVITATION CARD CONTAINER */}
      <div
        className={`relative z-20 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#1A1512]/90 backdrop-blur-2xl border-2 border-[#C8963E]/50 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-center text-stone-100 overflow-hidden transition-all duration-700 ${
          isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <JavaneseCorner position="top-left" />
        <JavaneseCorner position="top-right" />
        <JavaneseCorner position="bottom-left" />
        <JavaneseCorner position="bottom-right" />

        {/* Top Sacred Sun Emblem */}
        <div className="flex justify-center mb-3">
          <SuryaMajapahitSeal className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>

        {/* Traditional Header */}
        <div className="space-y-1 mb-2">
          <p className="text-[11px] uppercase tracking-[0.3em] font-serif text-amber-300 font-semibold">
            Pawiwahan Ageng
          </p>
          <p className="text-xs text-stone-400 font-serif italic">
            Serat Ulem Dhauping Penganten
          </p>
        </div>

        {/* Couple Names in Golden Royal Calligraphy */}
        <div className="my-4">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#C8963E] drop-shadow-md">
            {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
          </h1>
          <p className="font-serif text-xs text-amber-200/80 mt-2 flex items-center justify-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{weddingData.events.akad.date}</span>
          </p>
        </div>

        {/* Personalized Guest Badge */}
        <div className="my-5 p-4 rounded-2xl bg-[#251E19]/80 border border-[#C8963E]/30 text-center">
          <p className="text-[11px] text-stone-400 font-sans tracking-wider uppercase mb-1">
            Katur dhumateng Panjenenganipun:
          </p>
          <p className="font-serif font-bold text-lg text-amber-200 capitalize">
            {guestName}
          </p>
          <p className="text-[10px] text-stone-400 mt-1">
            Wonten ing Palenggahan
          </p>
        </div>

        {/* Gate Open Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleOpenInvitation}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C8963E] via-[#E5C158] to-[#C8963E] hover:from-[#DFB15B] hover:to-[#B68432] text-[#120F0D] font-serif font-bold text-sm sm:text-base tracking-wider uppercase shadow-[0_10px_30px_rgba(200,150,62,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 text-[#120F0D] group-hover:rotate-45 transition-transform" />
            <span>Buka Serat Ulem</span>
          </button>
          <p className="text-[10px] text-stone-400 font-sans mt-3">
            *Sentuh tombol kagem mbikak serat ulem lan mirengaken gendhing
          </p>
        </div>
      </div>
    </div>
  )
}
