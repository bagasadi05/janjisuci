import React, { useState, useEffect } from 'react'
import { Sparkles, SkipForward, Disc3 } from 'lucide-react'
import { AudioTrack } from '../config/weddingData'
import { useInvitationData } from '../context/InvitationContext'
import { BotanicalCorner } from './Ornament'

interface DesktopShowcaseProps {
  isPlayingAudio: boolean
  onToggleAudio: () => void
  activeTrack: AudioTrack
  onNextTrack: () => void
}

export const DesktopShowcase: React.FC<DesktopShowcaseProps> = ({
  isPlayingAudio,
  onToggleAudio,
  activeTrack,
  onNextTrack
}) => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(weddingData.countdownDate) - +new Date()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <aside className="hidden lg:flex lg:w-[42%] xl:w-[38%] lg:h-screen lg:sticky lg:top-0 z-20 flex-col justify-between p-8 xl:p-12 bg-stone-950 text-white overflow-hidden border-r border-amber-500/25 shadow-2xl relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage}
          alt="Showcase Ambient"
          className="w-full h-full object-cover object-center filter brightness-[0.24] blur-[1px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/85" />
      </div>

      <BotanicalCorner position="top-left" />
      <BotanicalCorner position="bottom-right" />

      {/* Top Header */}
      <div className="relative z-10 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-200 text-xs uppercase tracking-widest font-sans font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{activeTemplate.name}</span>
        </div>
        <h1 className="font-script text-6xl xl:text-7xl text-amber-100 drop-shadow-md pt-2">
          {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
        </h1>
        <p className="font-serif italic text-sm text-stone-300">
          {weddingData.events.akad.date}
        </p>
      </div>

      {/* Middle: Portrait Showcase in Double Gold Arch */}
      <div className="relative z-10 mx-auto w-full max-w-xs xl:max-w-sm my-3">
        <div className="relative p-1.5 rounded-t-[146px] rounded-b-3xl bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          <div className="rounded-t-[140px] rounded-b-[22px] overflow-hidden bg-stone-900 relative">
            <img
              src={activeTemplate.heroImage}
              alt={`Mempelai ${weddingData.couple.groom.shortName} & ${weddingData.couple.bride.shortName}`}
              className="w-full h-[310px] xl:h-[370px] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent" />
            
            {/* Live Countdown Badge */}
            <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-black/65 backdrop-blur-md border border-white/10 text-center">
              <p className="text-[10px] text-amber-300 uppercase tracking-widest font-sans mb-1 font-semibold">
                Menghitung Hari Bahagia
              </p>
              <div className="flex items-center justify-center gap-3 font-serif text-lg font-bold text-amber-100">
                <span>{timeLeft.days}h</span>
                <span className="text-amber-400/50">:</span>
                <span>{timeLeft.hours}j</span>
                <span className="text-amber-400/50">:</span>
                <span>{timeLeft.minutes}m</span>
                <span className="text-amber-400/50">:</span>
                <span>{timeLeft.seconds}d</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Music Controls & Quick Links */}
      <div className="relative z-10 text-center space-y-4">
        {/* Quick action buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollTo('rsvp')}
            aria-label="Konfirmasi kehadiran tamu di bagian RSVP"
            className="min-h-[44px] px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-sans font-bold text-xs tracking-wide shadow-lg transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center justify-center"
          >
            Konfirmasi Hadir
          </button>
          <button
            type="button"
            onClick={() => scrollTo('gift')}
            aria-label="Kirim kado atau amplop digital"
            className="min-h-[44px] px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sans text-xs tracking-wide transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center justify-center"
          >
            Kirim Kado
          </button>
        </div>

        {/* Indonesian Music Player Widget in Sidebar */}
        <div className="inline-flex items-center justify-between w-full max-w-xs px-4 py-2.5 rounded-2xl bg-black/40 border border-amber-500/30 text-stone-300 text-xs shadow-inner">
          <div className="flex items-center gap-2.5 truncate">
            <button
              type="button"
              onClick={onToggleAudio}
              className="min-w-[44px] min-h-[44px] p-2 rounded-full bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center justify-center"
              aria-label={isPlayingAudio ? "Jeda musik" : "Putar musik"}
              title={isPlayingAudio ? "Jeda" : "Putar"}
            >
              <Disc3 className={`w-4 h-4 ${isPlayingAudio ? 'animate-spin-slow text-amber-300' : 'text-stone-400'}`} aria-hidden="true" />
            </button>
            <div className="text-left truncate">
              <p className="text-[11px] font-sans font-medium text-amber-200 truncate">
                {activeTrack.title}
              </p>
              <p className="text-[9px] text-stone-400 font-sans">
                {isPlayingAudio ? 'Sedang Diputar' : 'Dijeda'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onNextTrack}
            className="min-w-[44px] min-h-[44px] p-2 text-stone-400 hover:text-amber-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center justify-center"
            aria-label="Ganti ke lagu berikutnya"
            title="Ganti Lagu Berikutnya"
          >
            <SkipForward className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  )
}
