import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Music, VolumeX, GraduationCap } from 'lucide-react'
import { AudioTrack } from '../../config/weddingData'

interface MonochromeGradDesktopShowcaseProps {
  graduateName?: string
  institutionName?: string
  dateText?: string
  venueText?: string
  isPlayingAudio: boolean
  onToggleAudio: () => void
  activeTrack?: AudioTrack
  targetDate?: string
}

export const MonochromeGradDesktopShowcase: React.FC<MonochromeGradDesktopShowcaseProps> = ({
  graduateName = 'Nadine Aulia, S.Ds.',
  institutionName = 'Institut Teknologi Bandung (ITB)',
  dateText = 'Sabtu, 24 Oktober 2026',
  venueText = 'Sasana Budaya Ganesa (Sabuga ITB), Bandung',
  isPlayingAudio,
  onToggleAudio,
  activeTrack,
  targetDate = '2027-10-23T08:00:00+07:00'
}) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTime = () => {
      const diff = +new Date(targetDate) - +new Date()
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        })
      }
    }
    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <aside className="hidden lg:flex w-5/12 h-screen sticky top-0 bg-[#09090B] text-white flex-col justify-between p-8 xl:p-12 border-r border-zinc-800 overflow-hidden select-none">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-zinc-800/40 via-[#09090B] to-[#040405] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-zinc-600/10 blur-[140px] pointer-events-none" />

      {/* Frame */}
      <div className="absolute inset-4 border border-white/10 rounded-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-white/20 text-zinc-200 text-xs font-mono uppercase tracking-widest">
          <GraduationCap className="w-3.5 h-3.5 text-zinc-100" />
          <span>Sidang Terbuka Senat</span>
        </div>
        <h2 className="text-3xl xl:text-4xl font-serif text-white font-bold">
          {graduateName}
        </h2>
        <p className="text-xs text-zinc-400 font-sans">{institutionName}</p>
        <div className="flex flex-col gap-1 text-xs text-zinc-400 pt-1 font-sans">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-zinc-200 shrink-0" />
            <span>{dateText}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-zinc-200 shrink-0" />
            <span className="truncate">{venueText}</span>
          </div>
        </div>
      </div>

      {/* Center Photo & Countdown */}
      <div className="relative z-10 my-auto flex flex-col items-center">
        <div className="w-52 xl:w-60 h-64 xl:h-72 rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-white/30 via-zinc-600/20 to-transparent shadow-2xl shadow-black/90">
          <div className="w-full h-full rounded-xl overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1672839415384-95cdbcba77ee?auto=format&fit=crop&w=800&q=85"
              alt="Nadine Wisuda"
              className="w-full h-full object-cover object-center filter grayscale contrast-110 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-transparent to-transparent" />
          </div>
        </div>

        {/* Live Countdown */}
        <div className="grid grid-cols-4 gap-2 mt-5 w-full max-w-xs text-center">
          <div className="bg-[#18181B]/90 border border-white/10 rounded-lg p-2 backdrop-blur-sm shadow-md">
            <div className="text-lg xl:text-xl font-bold font-mono text-white">{timeLeft.days}</div>
            <div className="text-[10px] text-zinc-400 uppercase">Hari</div>
          </div>
          <div className="bg-[#18181B]/90 border border-white/10 rounded-lg p-2 backdrop-blur-sm shadow-md">
            <div className="text-lg xl:text-xl font-bold font-mono text-white">{timeLeft.hours}</div>
            <div className="text-[10px] text-zinc-400 uppercase">Jam</div>
          </div>
          <div className="bg-[#18181B]/90 border border-white/10 rounded-lg p-2 backdrop-blur-sm shadow-md">
            <div className="text-lg xl:text-xl font-bold font-mono text-white">{timeLeft.minutes}</div>
            <div className="text-[10px] text-zinc-400 uppercase">Menit</div>
          </div>
          <div className="bg-[#18181B]/90 border border-white/10 rounded-lg p-2 backdrop-blur-sm shadow-md">
            <div className="text-lg xl:text-xl font-bold font-mono text-white">{timeLeft.seconds}</div>
            <div className="text-[10px] text-zinc-400 uppercase">Detik</div>
          </div>
        </div>
      </div>

      {/* Bottom Music Controller */}
      <div className="relative z-10 p-3 rounded-2xl bg-[#18181B]/80 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleAudio}
            aria-label={isPlayingAudio ? 'Jeda Musik Wisuda' : 'Putar Musik Wisuda'}
            className="min-w-[44px] min-h-[44px] rounded-full bg-white text-stone-950 flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {isPlayingAudio ? <Music className="w-4 h-4 animate-spin" aria-hidden="true" /> : <VolumeX className="w-4 h-4" aria-hidden="true" />}
          </button>
          <div className="text-left text-xs">
            <p className="font-semibold text-white truncate max-w-[170px]">
              {activeTrack?.title || 'Payung Teduh - Berdua Saja'}
            </p>
            <p className="text-[10px] text-zinc-400">
              {isPlayingAudio ? 'Sedang Memutar Musik' : 'Musik Dijeda'}
            </p>
          </div>
        </div>
        <div className="text-right text-[10px] font-mono text-zinc-400">
          JanjiSuci.id
        </div>
      </div>
    </aside>
  )
}
