import React, { useState, useEffect } from 'react'
import { Disc3, SkipForward, Sparkles } from 'lucide-react'
import { AudioTrack } from '../../config/weddingData'
import { useInvitationData } from '../../context/InvitationContext'

interface RoyalMidnightDesktopShowcaseProps {
  isPlayingAudio: boolean
  onToggleAudio: () => void
  activeTrack: AudioTrack
  onNextTrack: () => void
}

export const RoyalMidnightDesktopShowcase: React.FC<RoyalMidnightDesktopShowcaseProps> = ({
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
  }, [weddingData.countdownDate])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <aside className="hidden lg:flex lg:w-[42%] xl:w-[38%] lg:h-screen lg:sticky lg:top-0 z-20 flex-col justify-between p-8 xl:p-10 bg-[#0A0A0A] text-white overflow-hidden border-r border-[#D7BB83]/20 shadow-2xl relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeTemplate.coverImage || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85"}
          alt="Royal Midnight Background"
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/90" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7BB83]/15 border border-[#D7BB83]/30 text-[#D7BB83] text-xs uppercase tracking-widest font-serif">
          <Sparkles className="w-3.5 h-3.5 text-[#D7BB83]" />
          <span>The Wedding of</span>
        </div>
        <h1 className="font-pinyon text-5xl xl:text-6xl text-[#D7BB83] drop-shadow-md pt-1">
          {weddingData.couple.bride.shortName} &amp; {weddingData.couple.groom.shortName}
        </h1>
        <p className="font-serif italic text-xs xl:text-sm text-stone-300">
          {weddingData.events.akad.date}
        </p>
      </div>

      {/* Middle: Portrait Showcase in Romantic Gold Arch */}
      <div className="relative z-10 mx-auto w-full max-w-xs xl:max-w-sm my-2">
        <div className="relative p-1 rounded-t-[140px] rounded-b-3xl bg-gradient-to-b from-[#D7BB83] via-[#B99A5C] to-[#5C4324] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          <div className="rounded-t-[136px] rounded-b-[22px] overflow-hidden bg-stone-900 relative">
            <img
              src={activeTemplate.heroImage || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85"}
              alt={`Mempelai ${weddingData.couple.bride.shortName} & ${weddingData.couple.groom.shortName}`}
              className="w-full h-[290px] xl:h-[350px] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Countdown Badge */}
            <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-2xl bg-black/75 backdrop-blur-md border border-[#D7BB83]/30 text-center">
              <p className="text-[10px] text-[#D7BB83] uppercase tracking-widest font-serif mb-1 font-semibold">
                Menghitung Hari Bahagia
              </p>
              <div className="flex items-center justify-center gap-2.5 font-serif text-base xl:text-lg font-bold text-[#FFFCF3]">
                <span>{timeLeft.days}h</span>
                <span className="text-[#D7BB83]/50">:</span>
                <span>{timeLeft.hours}j</span>
                <span className="text-[#D7BB83]/50">:</span>
                <span>{timeLeft.minutes}m</span>
                <span className="text-[#D7BB83]/50">:</span>
                <span>{timeLeft.seconds}d</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Quick Buttons & Audio Player */}
      <div className="relative z-10 text-center space-y-3">
        <div className="flex items-center justify-center gap-2.5">
          <button
            onClick={() => scrollTo('rsvp')}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#D7BB83] to-[#B99A5C] hover:brightness-110 text-stone-950 font-serif font-bold text-xs tracking-wider shadow-lg transition-all cursor-pointer active:scale-95"
          >
            Kirim Doa &amp; Ucapan
          </button>
          <button
            onClick={() => scrollTo('gift')}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-[#D7BB83]/30 text-white font-serif text-xs tracking-wider transition-all cursor-pointer active:scale-95"
          >
            Kirim Kado
          </button>
        </div>

        {/* Music Player Widget */}
        <div className="inline-flex items-center justify-between w-full max-w-xs px-3.5 py-2 rounded-2xl bg-black/60 border border-[#D7BB83]/30 text-stone-300 text-xs shadow-inner">
          <div className="flex items-center gap-2.5 truncate">
            <button
              onClick={onToggleAudio}
              className="p-1.5 rounded-full bg-[#D7BB83]/20 text-[#D7BB83] hover:bg-[#D7BB83]/30 transition-colors cursor-pointer"
              title={isPlayingAudio ? 'Jeda' : 'Putar'}
            >
              <Disc3 className={`w-4 h-4 ${isPlayingAudio ? 'animate-spin-slow text-[#D7BB83]' : 'text-stone-400'}`} />
            </button>
            <div className="text-left truncate">
              <p className="text-[11px] font-serif font-medium text-[#D7BB83] truncate">
                {activeTrack.title}
              </p>
              <p className="text-[9px] text-stone-400 font-sans">
                {isPlayingAudio ? 'Sedang Diputar' : 'Dijeda'}
              </p>
            </div>
          </div>

          <button
            onClick={onNextTrack}
            className="p-1.5 text-stone-400 hover:text-[#D7BB83] transition-colors cursor-pointer"
            title="Ganti Lagu"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
