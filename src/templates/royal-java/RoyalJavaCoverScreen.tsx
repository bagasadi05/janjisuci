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
  const [isGateOpening, setIsGateOpening] = useState(false)
  const [isFullyDismissed, setIsFullyDismissed] = useState(false)

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
    setIsGateOpening(true)

    try {
      // Golden royal confetti blast
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#F9E79F', '#D4AF37', '#C8963E', '#8A5A1B', '#FFFDF9']
      })
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
          colors: ['#D4AF37', '#C8963E', '#F9E79F']
        })
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
          colors: ['#D4AF37', '#C8963E', '#F9E79F']
        })
      }, 180)
    } catch {
      // ignore
    }

    // Sequenced unmount after the 3D doors have parted
    setTimeout(() => {
      setIsFullyDismissed(true)
    }, 1150)
  }

  if (isOpen && (isFullyDismissed || !isGateOpening)) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#120F0D] px-4 min-h-[100dvh] overflow-hidden perspective-1200 transition-opacity duration-500 ${
        isFullyDismissed ? 'opacity-0 pointer-events-none' : 'opacity-100'
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

      {/* 3D LEFT SPLIT KERATON GUNUNGAN GATE DOOR */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 z-20 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-3d origin-left ${
          isGateOpening
            ? '-translate-x-[110%] -rotate-y-[75deg] opacity-75'
            : 'translate-x-0 rotate-y-0 opacity-100'
        } bg-[#1a1410] border-r-2 border-[#C8963E]/60 shadow-[20px_0_40px_rgba(0,0,0,0.85)] flex items-center justify-end overflow-hidden`}
      >
        {/* Teak Wood & Gold Carving Texture */}
        <div className="absolute inset-0 bg-javanese-door opacity-95" />
        <div className="absolute inset-y-8 right-6 w-[2px] bg-gradient-to-b from-transparent via-[#C8963E] to-transparent opacity-80" />
        <div className="relative z-10 translate-x-12 sm:translate-x-16 opacity-85 scale-90 sm:scale-100">
          <GununganWayangSvg side="left" className="w-64 sm:w-88 h-auto drop-shadow-[0_0_20px_rgba(200,150,62,0.4)]" />
        </div>
      </div>

      {/* 3D RIGHT SPLIT KERATON GUNUNGAN GATE DOOR */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 z-20 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-3d origin-right ${
          isGateOpening
            ? 'translate-x-[110%] rotate-y-[75deg] opacity-75'
            : 'translate-x-0 rotate-y-0 opacity-100'
        } bg-[#1a1410] border-l-2 border-[#C8963E]/60 shadow-[-20px_0_40px_rgba(0,0,0,0.85)] flex items-center justify-start overflow-hidden`}
      >
        {/* Teak Wood & Gold Carving Texture */}
        <div className="absolute inset-0 bg-javanese-door opacity-95" />
        <div className="absolute inset-y-8 left-6 w-[2px] bg-gradient-to-b from-transparent via-[#C8963E] to-transparent opacity-80" />
        <div className="relative z-10 -translate-x-12 sm:-translate-x-16 opacity-85 scale-90 sm:scale-100">
          <GununganWayangSvg side="right" className="w-64 sm:w-88 h-auto drop-shadow-[0_0_20px_rgba(200,150,62,0.4)]" />
        </div>
      </div>

      {/* CENTER GOLDEN LENS AURA PULSE (Triggers on Click) */}
      {isGateOpening && (
        <div className="absolute z-25 pointer-events-none w-72 h-72 rounded-full bg-gradient-to-r from-amber-400/40 via-yellow-300/50 to-amber-600/40 blur-2xl animate-lens-flare" />
      )}

      {/* CENTER ROYAL INVITATION CARD CONTAINER */}
      <div
        className={`relative z-30 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-9 rounded-3xl bg-[#1A1512]/92 backdrop-blur-2xl border-2 border-[#C8963E]/60 shadow-[0_30px_70px_rgba(0,0,0,0.95)] text-center text-stone-100 overflow-hidden transition-all duration-700 ${
          isGateOpening ? 'scale-105 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        <JavaneseCorner position="top-left" />
        <JavaneseCorner position="top-right" />
        <JavaneseCorner position="bottom-left" />
        <JavaneseCorner position="bottom-right" />

        {/* Top Sacred Sun Emblem with Interactive Spin on Click */}
        <div className="flex justify-center mb-3">
          <div className={`transition-transform duration-700 ${isGateOpening ? 'rotate-180 scale-125' : 'rotate-0'}`}>
            <SuryaMajapahitSeal className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_0_15px_rgba(200,150,62,0.5)]" />
          </div>
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
        <div className="my-5 p-4 rounded-2xl bg-[#251E19]/85 border border-[#C8963E]/30 text-center shadow-inner">
          <p className="text-[11px] text-stone-400 font-sans tracking-wider uppercase mb-1">
            Katur dhumateng Panjenenganipun:
          </p>
          <p className="font-serif font-bold text-lg sm:text-xl text-amber-200 capitalize">
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
            aria-label="Buka serat ulem dan nyalakan musik"
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C8963E] via-[#E5C158] to-[#C8963E] hover:from-[#DFB15B] hover:to-[#B68432] text-[#120F0D] font-serif font-bold text-sm sm:text-base tracking-wider uppercase shadow-[0_10px_30px_rgba(200,150,62,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center justify-center gap-2 group min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C158]"
          >
            <Sparkles className="w-4 h-4 text-[#120F0D] group-hover:rotate-45 transition-transform" aria-hidden="true" />
            <span>Buka Serat Ulem (Buka Gerbang)</span>
          </button>
          <p className="text-[10px] text-stone-400 font-sans mt-3">
            *Sentuh kagem mbikak gapura keraton 3D lan mirengaken gendhing
          </p>
        </div>
      </div>
    </div>
  )
}
