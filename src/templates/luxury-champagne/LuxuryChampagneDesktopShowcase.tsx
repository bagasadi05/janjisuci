import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX, SkipForward, Disc3 } from 'lucide-react'
import { useInvitationData } from '../../context/InvitationContext'
import { AudioTrack } from '../../config/weddingData'

interface LuxuryChampagneDesktopShowcaseProps {
  isPlayingAudio: boolean
  onToggleAudio: () => void
  activeTrack: AudioTrack
  onNextTrack: () => void
}

export const LuxuryChampagneDesktopShowcase: React.FC<LuxuryChampagneDesktopShowcaseProps> = ({
  isPlayingAudio,
  onToggleAudio,
  activeTrack,
  onNextTrack
}) => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date('2027-10-24T08:00:00+07:00').getTime()
      const now = new Date().getTime()
      const diff = Math.max(0, target - now)

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      })
    }

    calculateCountdown()
    const timer = setInterval(calculateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <aside className="hidden lg:flex lg:w-[42%] xl:w-[38%] h-screen sticky top-0 bg-[#0A0A0A] text-stone-100 flex-col justify-between p-8 xl:p-12 border-r border-white/10 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold block">
            EDISI EDITORIAL MEWAH
          </span>
          <p className="font-serif text-lg tracking-wider text-white">
            VOGUE LOVE
          </p>
        </div>
        <span className="px-3 py-1 rounded-none border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-sans tracking-widest uppercase">
          KEMEWAHAN MODERN
        </span>
      </div>

      {/* Center Editorial Portrait */}
      <div className="my-auto py-4 text-center">
        <div className="relative mx-auto w-64 h-80 xl:w-72 xl:h-96 p-2 border border-[#D4AF37]/50 bg-[#121212] shadow-2xl">
          <div className="w-full h-full overflow-hidden relative">
            <img
              src={activeTemplate.heroImage}
              alt="Editorial Portrait"
              className="w-full h-full object-cover object-center filter grayscale contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-50" />
          </div>
        </div>

        <div className="mt-6 space-y-1">
          <h2 className="font-serif text-3xl font-light tracking-wide text-white uppercase">
            {weddingData.couple.groom.shortName} <span className="text-[#D4AF37]">&</span> {weddingData.couple.bride.shortName}
          </h2>
          <p className="text-xs text-stone-400 font-sans tracking-widest uppercase">
            {weddingData.events.akad.date}
          </p>
        </div>

        {/* Minimalist Countdown */}
        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mt-6">
          {[
            { val: timeLeft.days, label: 'HARI' },
            { val: timeLeft.hours, label: 'JAM' },
            { val: timeLeft.minutes, label: 'MENIT' },
            { val: timeLeft.seconds, label: 'DETIK' }
          ].map((item, i) => (
            <div key={i} className="p-2 border border-white/10 bg-white/5 text-center">
              <span className="font-serif text-xl font-light text-[#D4AF37] block">
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-stone-400 font-sans tracking-widest">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Track Controller */}
      <div className="p-3.5 border border-white/10 bg-white/5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-full bg-[#D4AF37] text-stone-950 flex items-center justify-center shrink-0 ${
              isPlayingAudio ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
          >
            <Disc3 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] tracking-widest uppercase text-[#D4AF37] font-semibold">
              MEMUTAR LAGU:
            </p>
            <p className="text-xs font-serif text-white truncate">
              {activeTrack.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onToggleAudio}
            className="p-2 bg-white/5 hover:bg-white/15 text-[#D4AF37] transition-colors cursor-pointer"
            title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
          </button>
          <button
            onClick={onNextTrack}
            className="p-2 bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white transition-colors cursor-pointer"
            title="Lagu Berikutnya"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
