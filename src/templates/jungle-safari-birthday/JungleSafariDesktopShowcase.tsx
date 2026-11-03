import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Music, Volume2, VolumeX } from 'lucide-react'
import { AudioTrack } from '../../config/weddingData'

interface JungleSafariDesktopShowcaseProps {
  celebrantName?: string
  dateText?: string
  venueText?: string
  isPlayingAudio: boolean
  onToggleAudio: () => void
  activeTrack?: AudioTrack
  targetDate?: string
}

export const JungleSafariDesktopShowcase: React.FC<JungleSafariDesktopShowcaseProps> = ({
  celebrantName = 'Kenzo Dirgantara',
  dateText = 'Minggu, 18 Oktober 2026',
  venueText = 'Playground Safari Café, Kemang Jakarta',
  isPlayingAudio,
  onToggleAudio,
  activeTrack,
  targetDate = '2026-10-18T10:00:00+07:00'
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
    <aside className="hidden lg:flex w-5/12 h-screen sticky top-0 bg-[#132317] text-white flex-col justify-between p-8 xl:p-12 border-r border-emerald-900/40 overflow-hidden select-none">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/40 via-[#132317] to-[#0A140D] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-amber-500/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-lime-500/10 blur-[120px] pointer-events-none" />

      {/* Frame */}
      <div className="absolute inset-4 border border-amber-400/20 rounded-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
          <span>🦁</span>
          <span>Kids Safari Explorer</span>
        </div>
        <h2 className="text-3xl xl:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-lime-200 font-extrabold">
          {celebrantName}
        </h2>
        <div className="flex flex-col gap-1 text-xs text-emerald-200/80 pt-1 font-sans">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>{dateText}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="truncate">{venueText}</span>
          </div>
        </div>
      </div>

      {/* Center Photo & Countdown */}
      <div className="relative z-10 my-auto flex flex-col items-center">
        <div className="w-52 xl:w-60 h-64 xl:h-72 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-amber-400/40 via-lime-400/20 to-emerald-950/50 shadow-2xl shadow-black/80">
          <div className="w-full h-full rounded-2xl overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1772724317403-63337bf58fff?auto=format&fit=crop&w=800&q=85"
              alt="Kenzo Safari"
              className="w-full h-full object-cover object-center filter brightness-95 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#132317]/80 via-transparent to-transparent" />
          </div>
        </div>

        {/* Live Countdown */}
        <div className="grid grid-cols-4 gap-2 mt-5 w-full max-w-xs text-center">
          <div className="bg-[#1C3121]/90 border border-emerald-500/25 rounded-lg p-2 backdrop-blur-sm shadow-md">
            <div className="text-lg xl:text-xl font-bold font-serif text-amber-200">{timeLeft.days}</div>
            <div className="text-[10px] text-emerald-300/70 uppercase">Hari</div>
          </div>
          <div className="bg-[#1C3121]/90 border border-emerald-500/25 rounded-lg p-2 backdrop-blur-sm shadow-md">
            <div className="text-lg xl:text-xl font-bold font-serif text-amber-200">{timeLeft.hours}</div>
            <div className="text-[10px] text-emerald-300/70 uppercase">Jam</div>
          </div>
          <div className="bg-[#1C3121]/90 border border-emerald-500/25 rounded-lg p-2 backdrop-blur-sm shadow-md">
            <div className="text-lg xl:text-xl font-bold font-serif text-amber-200">{timeLeft.minutes}</div>
            <div className="text-[10px] text-emerald-300/70 uppercase">Menit</div>
          </div>
          <div className="bg-[#1C3121]/90 border border-emerald-500/25 rounded-lg p-2 backdrop-blur-sm shadow-md">
            <div className="text-lg xl:text-xl font-bold font-serif text-amber-200">{timeLeft.seconds}</div>
            <div className="text-[10px] text-emerald-300/70 uppercase">Detik</div>
          </div>
        </div>
      </div>

      {/* Bottom Music Controller */}
      <div className="relative z-10 p-3 rounded-2xl bg-[#1C3121]/80 border border-emerald-500/25 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleAudio}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-lime-300 text-stone-950 flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform"
          >
            {isPlayingAudio ? <Music className="w-4 h-4 animate-spin" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <div className="text-left text-xs">
            <p className="font-semibold text-white truncate max-w-[170px]">
              {activeTrack?.title || 'Happy Birthday Melody'}
            </p>
            <p className="text-[10px] text-emerald-300/70">
              {isPlayingAudio ? 'Sedang Memutar Musik' : 'Musik Dijeda'}
            </p>
          </div>
        </div>
        <div className="text-right text-[10px] font-mono text-amber-300/80">
          JanjiSuci.id
        </div>
      </div>
    </aside>
  )
}
