import React, { useState, useEffect } from 'react'
import { Music, Volume2, VolumeX, Calendar, MapPin, Sparkles, GraduationCap } from 'lucide-react'
import { AudioTrack } from '../../config/weddingData'

interface AcademicEleganceDesktopShowcaseProps {
  institutionName?: string
  dateText?: string
  venueText?: string
  isPlayingAudio: boolean
  onToggleAudio: () => void
  activeTrack?: AudioTrack
  targetDate?: string
}

export const AcademicEleganceDesktopShowcase: React.FC<AcademicEleganceDesktopShowcaseProps> = ({
  institutionName = 'Universitas Indonesia',
  dateText = 'Sabtu, 19 September 2026',
  venueText = 'Balairung UI, Kampus UI Depok',
  isPlayingAudio,
  onToggleAudio,
  activeTrack,
  targetDate = '2027-09-19T08:00:00+07:00'
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
    <aside className="hidden lg:flex w-5/12 h-screen sticky top-0 bg-[#070D1E] text-white flex-col justify-between p-8 xl:p-12 border-r border-blue-900/40 overflow-hidden select-none">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0B132B] to-[#040813] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />

      {/* Frame */}
      <div className="absolute inset-4 border border-amber-400/20 rounded-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-amber-400/30 text-amber-200 text-xs font-serif uppercase tracking-widest">
          <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
          <span>Sidang Terbuka Senat</span>
        </div>
        <h2 className="text-3xl xl:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-bold">
          {institutionName}
        </h2>
        <div className="flex flex-col gap-1 text-xs text-blue-200/80 pt-1 font-sans">
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
        <div className="w-52 xl:w-60 h-64 xl:h-72 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-amber-400/40 via-blue-500/20 to-blue-950/50 shadow-2xl shadow-black/80">
          <div className="w-full h-full rounded-2xl overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?auto=format&fit=crop&w=800&q=85"
              alt="Wisuda"
              className="w-full h-full object-cover object-center filter brightness-95 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 via-transparent to-transparent" />
          </div>
        </div>

        {/* Live Countdown */}
        <div className="grid grid-cols-4 gap-2 mt-5 w-full max-w-xs text-center">
          <div className="bg-[#141E38]/90 border border-blue-400/25 rounded-lg p-2 backdrop-blur-sm shadow-md">
            <div className="text-lg xl:text-xl font-bold font-serif text-amber-200">{timeLeft.days}</div>
            <div className="text-[10px] text-blue-200/70 font-sans uppercase">Hari</div>
          </div>
          <div className="bg-[#141E38]/90 border border-blue-400/25 rounded-lg p-2 backdrop-blur-sm shadow-md">
            <div className="text-lg xl:text-xl font-bold font-serif text-amber-200">{timeLeft.hours}</div>
            <div className="text-[10px] text-blue-200/70 font-sans uppercase">Jam</div>
          </div>
          <div className="bg-[#141E38]/90 border border-blue-400/25 rounded-lg p-2 backdrop-blur-sm shadow-md">
            <div className="text-lg xl:text-xl font-bold font-serif text-amber-200">{timeLeft.minutes}</div>
            <div className="text-[10px] text-blue-200/70 font-sans uppercase">Menit</div>
          </div>
          <div className="bg-[#141E38]/90 border border-blue-400/25 rounded-lg p-2 backdrop-blur-sm shadow-md">
            <div className="text-lg xl:text-xl font-bold font-serif text-amber-200">{timeLeft.seconds}</div>
            <div className="text-[10px] text-blue-200/70 font-sans uppercase">Detik</div>
          </div>
        </div>
      </div>

      {/* Bottom Audio Controller */}
      <div className="relative z-10 rounded-xl bg-[#141E38]/85 border border-blue-400/20 p-3.5 flex items-center justify-between backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-slate-900 shadow-md ${
              isPlayingAudio ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
          >
            <Music className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase font-mono tracking-wider text-amber-300">
              {isPlayingAudio ? 'Sedang Memutar' : 'Simfoni Akademik'}
            </p>
            <p className="text-xs font-semibold text-white truncate max-w-[190px]">
              {activeTrack?.title || 'Gaudeamus Igitur Symphony'}
            </p>
          </div>
        </div>

        <button
          onClick={onToggleAudio}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
          title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
        >
          {isPlayingAudio ? (
            <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>
    </aside>
  )
}
