import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX, SkipForward, Disc3, Moon } from 'lucide-react'
import { useInvitationData } from '../../context/InvitationContext'
import { AudioTrack } from '../../config/weddingData'

interface CelestialNightDesktopShowcaseProps {
  isPlayingAudio: boolean
  onToggleAudio: () => void
  activeTrack: AudioTrack
  onNextTrack: () => void
}

export const CelestialNightDesktopShowcase: React.FC<CelestialNightDesktopShowcaseProps> = ({
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
    <aside className="hidden lg:flex lg:w-[42%] xl:w-[38%] h-screen sticky top-0 bg-[#0B132B] text-stone-100 flex-col justify-between p-8 xl:p-12 border-r border-[#F4D06F]/25 overflow-hidden select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Moon className="w-6 h-6 text-[#F4D06F]" />
          <div>
            <p className="font-serif font-bold text-sm tracking-wider text-[#F4D06F]">
              CELESTIAL NIGHT
            </p>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest">
              Di Bawah Naungan Langit Bertabur Bintang
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#1C2541] border border-[#F4D06F]/30 text-[#F4D06F] text-[10px] font-sans tracking-widest uppercase">
          Edisi Malam Bintang
        </span>
      </div>

      {/* Center Crystal Oval Portrait Frame */}
      <div className="my-auto py-4 text-center">
        <div className="relative mx-auto w-64 h-80 xl:w-72 xl:h-96 rounded-full p-3 bg-gradient-to-b from-[#F4D06F]/40 via-[#1C2541] to-[#0B132B] border-2 border-[#F4D06F]/60 shadow-[0_0_40px_rgba(244,208,111,0.25)]">
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <img
              src={activeTemplate.heroImage}
              alt="Celestial Couple"
              className="w-full h-full object-cover object-center filter brightness-95"
            />
          </div>
        </div>

        <div className="mt-6 space-y-1">
          <h2 className="font-serif text-3xl xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF9] via-[#F4D06F] to-[#E0E1DD]">
            {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
          </h2>
          <p className="text-xs text-stone-300 font-sans tracking-widest uppercase">
            {weddingData.events.akad.date}
          </p>
        </div>

        {/* Lunar Countdown */}
        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mt-6">
          {[
            { val: timeLeft.days, label: 'HARI' },
            { val: timeLeft.hours, label: 'JAM' },
            { val: timeLeft.minutes, label: 'MENIT' },
            { val: timeLeft.seconds, label: 'DETIK' }
          ].map((item, i) => (
            <div key={i} className="p-2 rounded-xl bg-[#1C2541]/80 border border-[#F4D06F]/20 text-center">
              <span className="font-serif text-lg font-bold text-[#F4D06F] block">
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-stone-400 font-sans tracking-widest">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Celestial Player */}
      <div className="p-3.5 rounded-2xl bg-[#1C2541]/90 border border-[#F4D06F]/25 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-full bg-[#F4D06F] text-stone-950 flex items-center justify-center shrink-0 ${
              isPlayingAudio ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
          >
            <Disc3 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] tracking-widest uppercase text-[#F4D06F] font-semibold">
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
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-[#F4D06F] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D06F]"
            title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4" aria-hidden="true" /> : <VolumeX className="w-4 h-4 text-stone-400" aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={onNextTrack}
            aria-label="Putar lagu berikutnya"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D06F]"
            title="Lagu Berikutnya"
          >
            <SkipForward className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  )
}
