import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Disc3, Volume2, VolumeX, Sparkles, Music } from 'lucide-react'
import { AudioTrack } from '../../config/weddingData'

interface RetroEditorialDesktopShowcaseProps {
  celebrantName?: string
  ageText?: string
  dateText?: string
  venueText?: string
  isPlayingAudio: boolean
  onToggleAudio: () => void
  activeTrack?: AudioTrack
  targetDate?: string
}

export const RetroEditorialDesktopShowcase: React.FC<RetroEditorialDesktopShowcaseProps> = ({
  celebrantName = 'Aurelia Clarissa',
  ageText = 'Sweet Seventeen Celebration',
  dateText = 'Sabtu, 14 Agustus 2027',
  venueText = 'The Glasshouse Bistro & Rooftop, Jakarta Selatan',
  isPlayingAudio,
  onToggleAudio,
  activeTrack,
  targetDate = '2027-08-14T18:00:00+07:00'
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
    <aside className="hidden lg:flex w-5/12 h-screen sticky top-0 bg-[#1E1712] text-[#FBF8F3] flex-col justify-between p-8 xl:p-11 border-r border-[#3E2E24] overflow-hidden select-none">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#3D2517]/50 via-[#1E1712] to-[#120D0A] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#C25E38]/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#D97706]/10 blur-[120px] pointer-events-none" />

      {/* Decorative hairline frame */}
      <div className="absolute inset-4 border border-[#D97706]/20 rounded-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A1F18] border border-[#D97706]/30 text-[#F59E0B] text-xs font-mono uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" aria-hidden="true" />
            <span>VOL. XVII • SPECIAL EDITION</span>
          </div>
          <span className="text-[11px] font-mono text-[#A8A29E] tracking-widest uppercase">
            EST. 2010
          </span>
        </div>

        <div>
          <h2 className="text-3xl xl:text-4xl font-serif italic text-white font-extrabold tracking-wide drop-shadow-sm">
            {celebrantName}
          </h2>
          <p className="font-pinyon text-2xl text-[#E0A96D] pt-0.5">
            The Golden Milestone
          </p>
        </div>

        <div className="flex flex-col gap-1 text-xs text-[#D6D3D1] pt-1 font-sans">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" aria-hidden="true" />
            <span>{dateText}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" aria-hidden="true" />
            <span className="truncate">{venueText}</span>
          </div>
        </div>
      </div>

      {/* Center Polaroid Photo & Flip Countdown */}
      <div className="relative z-10 my-auto flex flex-col items-center">
        {/* Editorial Polaroid Frame */}
        <div className="relative bg-[#FBF8F3] p-3 pb-5 rounded-2xl shadow-2xl border border-stone-300/40 rotate-[-1deg] hover:rotate-0 transition-transform duration-500 max-w-[240px] xl:max-w-[270px]">
          {/* Washi Tape */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-[#FEF3C7]/90 border border-dashed border-[#F59E0B]/70 text-[9px] font-mono text-amber-900 uppercase tracking-widest shadow-xs">
            AURELIA • SWEET 17
          </div>

          <div className="w-48 xl:w-56 h-56 xl:h-64 rounded-xl overflow-hidden relative bg-stone-200">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85"
              alt={celebrantName}
              className="w-full h-full object-cover object-center filter sepia-[0.08] contrast-[1.05] transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          <div className="pt-2 text-center text-stone-900">
            <p className="font-serif italic text-sm font-semibold tracking-wide">
              {ageText}
            </p>
          </div>
        </div>

        {/* Live Flip-Style Countdown Clock */}
        <div className="grid grid-cols-4 gap-2 mt-6 w-full max-w-xs text-center">
          <div className="bg-[#2A1F18]/90 border border-[#D97706]/30 rounded-xl p-2.5 backdrop-blur-sm shadow-md">
            <div className="text-xl xl:text-2xl font-bold font-mono text-[#FBBF24]">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="text-[10px] text-[#A8A29E] uppercase font-mono mt-0.5">Hari</div>
          </div>
          <div className="bg-[#2A1F18]/90 border border-[#D97706]/30 rounded-xl p-2.5 backdrop-blur-sm shadow-md">
            <div className="text-xl xl:text-2xl font-bold font-mono text-[#FBBF24]">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-[10px] text-[#A8A29E] uppercase font-mono mt-0.5">Jam</div>
          </div>
          <div className="bg-[#2A1F18]/90 border border-[#D97706]/30 rounded-xl p-2.5 backdrop-blur-sm shadow-md">
            <div className="text-xl xl:text-2xl font-bold font-mono text-[#FBBF24]">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-[10px] text-[#A8A29E] uppercase font-mono mt-0.5">Menit</div>
          </div>
          <div className="bg-[#2A1F18]/90 border border-[#D97706]/30 rounded-xl p-2.5 backdrop-blur-sm shadow-md">
            <div className="text-xl xl:text-2xl font-bold font-mono text-[#FBBF24]">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-[10px] text-[#A8A29E] uppercase font-mono mt-0.5">Detik</div>
          </div>
        </div>
      </div>

      {/* Bottom Vinyl Record Player Widget */}
      <div className="relative z-10 p-3.5 rounded-2xl bg-[#2A1F18]/90 border border-[#D97706]/30 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          {/* Spinning Vinyl Graphic */}
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={onToggleAudio}
              aria-label={isPlayingAudio ? 'Jeda Musik Pesta' : 'Putar Musik Pesta'}
              className="relative min-w-[46px] min-h-[46px] rounded-full bg-gradient-to-tr from-[#1E1712] via-[#2D1B11] to-[#120D0A] text-[#FBBF24] flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform border border-[#D97706]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706]"
            >
              <Disc3
                className={`w-7 h-7 text-[#F59E0B] ${isPlayingAudio ? 'animate-spin' : ''}`}
                style={{ animationDuration: '4s' }}
                aria-hidden="true"
              />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[#C25E38] border border-black" />
            </button>
          </div>

          <div className="text-left text-xs">
            <p className="font-semibold text-white truncate max-w-[170px]">
              {activeTrack?.title || 'Nadhif Basalamah - Penjaga Hati'}
            </p>
            <p className="text-[10px] text-[#A8A29E] flex items-center gap-1 font-mono">
              <Music className="w-3 h-3 text-[#D97706]" aria-hidden="true" />
              <span>{isPlayingAudio ? 'Sedang Diputar' : 'Musik Dijeda'}</span>
            </p>
          </div>
        </div>

        <div className="text-right text-[10px] font-mono text-[#F59E0B] tracking-wider uppercase font-semibold">
          JANJISUCI • 17
        </div>
      </div>
    </aside>
  )
}
