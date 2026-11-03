import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX, SkipForward, Disc3, Heart } from 'lucide-react'
import { useInvitationData } from '../../context/InvitationContext'
import { AudioTrack } from '../../config/weddingData'

interface RusticTerracottaDesktopShowcaseProps {
  isPlayingAudio: boolean
  onToggleAudio: () => void
  activeTrack: AudioTrack
  onNextTrack: () => void
}

export const RusticTerracottaDesktopShowcase: React.FC<RusticTerracottaDesktopShowcaseProps> = ({
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
    <aside className="hidden lg:flex lg:w-[42%] xl:w-[38%] h-screen sticky top-0 bg-[#2B231D] text-stone-100 flex-col justify-between p-8 xl:p-12 border-r border-[#C06C54]/30 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#DDA15E] font-bold block">
            KOLEKSI RUSTIC BOHO
          </span>
          <p className="font-serif text-lg tracking-wide text-white">
            Kisah Bahagia
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#3D2C24] border border-[#C06C54]/40 text-[#DDA15E] text-[10px] font-sans tracking-widest uppercase">
          Terracotta Alami
        </span>
      </div>

      {/* Center Polaroid Showcase Frame */}
      <div className="my-auto py-4 text-center">
        {/* Polaroid Card with Washi Tape */}
        <div className="relative mx-auto w-64 xl:w-72 p-3 pb-8 bg-[#FDFBF7] text-[#2B231D] shadow-[0_20px_50px_rgba(0,0,0,0.6)] rotate-1 hover:rotate-0 transition-transform duration-300">
          {/* Masking Tape at Top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#DDA15E]/80 backdrop-blur-sm -rotate-2 opacity-85 shadow-sm" />

          <div className="w-full h-72 xl:h-80 overflow-hidden bg-stone-200">
            <img
              src={activeTemplate.heroImage}
              alt="Rustic Couple Polaroid"
              className="w-full h-full object-cover object-center filter sepia-[0.15]"
            />
          </div>

          <div className="mt-3 text-center">
            <p className="font-script text-2xl text-[#A0522D]">
              {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
            </p>
            <p className="text-[10px] text-stone-500 font-sans tracking-widest uppercase mt-0.5">
              Selamanya Bersama • 2026
            </p>
          </div>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mt-7">
          {[
            { val: timeLeft.days, label: 'Hari' },
            { val: timeLeft.hours, label: 'Jam' },
            { val: timeLeft.minutes, label: 'Menit' },
            { val: timeLeft.seconds, label: 'Detik' }
          ].map((item, i) => (
            <div key={i} className="p-2 rounded-xl bg-[#3D2C24] border border-[#C06C54]/30 text-center">
              <span className="font-serif text-lg font-bold text-[#DDA15E] block">
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-stone-400 font-sans uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Track Controller */}
      <div className="p-3.5 rounded-2xl bg-[#3D2C24] border border-[#C06C54]/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-full bg-[#C06C54] text-white flex items-center justify-center shrink-0 ${
              isPlayingAudio ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
          >
            <Disc3 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] tracking-widest uppercase text-[#DDA15E] font-semibold">
              MUSIK AKUSTIK:
            </p>
            <p className="text-xs font-serif text-white truncate">
              {activeTrack.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onToggleAudio}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#DDA15E] transition-colors cursor-pointer"
            title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
          </button>
          <button
            onClick={onNextTrack}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
            title="Lagu Berikutnya"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
