import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX, SkipForward, Disc3, Heart } from 'lucide-react'
import { useInvitationData } from '../../context/InvitationContext'
import { AudioTrack } from '../../config/weddingData'

interface BlushPeonyDesktopShowcaseProps {
  isPlayingAudio: boolean
  onToggleAudio: () => void
  activeTrack: AudioTrack
  onNextTrack: () => void
}

export const BlushPeonyDesktopShowcase: React.FC<BlushPeonyDesktopShowcaseProps> = ({
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
    <aside className="hidden lg:flex lg:w-[42%] xl:w-[38%] h-screen sticky top-0 bg-[#2E1822] text-stone-100 flex-col justify-between p-8 xl:p-12 border-r border-[#FFCCD5]/20 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Heart className="w-5 h-5 text-[#FFB3C6] fill-[#FFB3C6]" />
          <div>
            <p className="font-serif font-bold text-sm tracking-wider text-[#FFCCD5]">
              SWEET BLUSH & PEONY
            </p>
            <p className="text-[10px] text-pink-200 uppercase tracking-widest">
              Taman Cinta Penuh Bunga
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#421D2F] border border-[#FFCCD5]/30 text-[#FFCCD5] text-[10px] font-sans tracking-widest uppercase">
          Edisi Floral Manis
        </span>
      </div>

      {/* Center Floral Arch Portrait */}
      <div className="my-auto py-4 text-center">
        <div className="relative mx-auto w-64 h-80 xl:w-72 xl:h-96 rounded-t-full rounded-b-3xl p-3 bg-gradient-to-b from-[#FFB3C6]/40 via-[#421D2F] to-[#2E1822] border-2 border-[#FFCCD5]/60 shadow-[0_0_40px_rgba(255,179,198,0.25)]">
          <div className="w-full h-full rounded-t-full rounded-b-2xl overflow-hidden relative">
            <img
              src={activeTemplate.heroImage}
              alt="Romantic Couple"
              className="w-full h-full object-cover object-center filter brightness-95"
            />
          </div>
        </div>

        <div className="mt-6 space-y-1">
          <h2 className="font-script text-4xl xl:text-5xl text-[#FFCCD5]">
            {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
          </h2>
          <p className="text-xs text-pink-200 font-serif italic">
            {weddingData.events.akad.date}
          </p>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mt-6">
          {[
            { val: timeLeft.days, label: 'Hari' },
            { val: timeLeft.hours, label: 'Jam' },
            { val: timeLeft.minutes, label: 'Menit' },
            { val: timeLeft.seconds, label: 'Detik' }
          ].map((item, i) => (
            <div key={i} className="p-2 rounded-xl bg-[#421D2F] border border-[#FFCCD5]/20 text-center">
              <span className="font-serif text-lg font-bold text-[#FFCCD5] block">
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-pink-200 font-sans uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Player */}
      <div className="p-3.5 rounded-2xl bg-[#421D2F] border border-[#FFCCD5]/25 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-full bg-[#B76E79] text-white flex items-center justify-center shrink-0 ${
              isPlayingAudio ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
          >
            <Disc3 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] tracking-widest uppercase text-[#FFCCD5] font-semibold">
              MUSIK ROMANTIS:
            </p>
            <p className="text-xs font-serif text-white truncate">
              {activeTrack.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onToggleAudio}
            aria-label={isPlayingAudio ? 'Jeda Musik Latar' : 'Putar Musik Latar'}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-[#FFCCD5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCCD5]"
            title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4" aria-hidden="true" /> : <VolumeX className="w-4 h-4 text-stone-400" aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={onNextTrack}
            aria-label="Putar lagu berikutnya"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCCD5]"
            title="Lagu Berikutnya"
          >
            <SkipForward className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  )
}
