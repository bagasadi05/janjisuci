import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Volume2, VolumeX, Sparkles, Music, Video, ExternalLink } from 'lucide-react'
import { AudioTrack } from '../../config/weddingData'

interface EmeraldBotanicalDesktopShowcaseProps {
  babyName?: string
  babyArabicName?: string
  parentsName?: string
  dateText?: string
  hijriDate?: string
  venueText?: string
  isPlayingAudio: boolean
  onToggleAudio: () => void
  activeTrack?: AudioTrack
  targetDate?: string
  onOpenStreaming?: () => void
}

export const EmeraldBotanicalDesktopShowcase: React.FC<EmeraldBotanicalDesktopShowcaseProps> = ({
  babyName = 'Muhammad Rayyan Al-Ghifari',
  babyArabicName = 'مُحَمَّد رَيَّان الْغِفَارِي',
  parentsName = 'Bpk. M. Ilham Pratama & Ibu Nurul Fadhilah',
  dateText = 'Ahad, 25 Juli 2027',
  hijriDate = '14 Muharram 1449 H',
  venueText = 'Kediaman Keluarga Pratama, Kebayoran Baru, Jakarta Selatan',
  isPlayingAudio,
  onToggleAudio,
  activeTrack,
  targetDate = '2027-07-25T09:00:00+07:00',
  onOpenStreaming
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
    <aside className="hidden lg:flex w-5/12 h-screen sticky top-0 bg-[#04241C] text-[#F0FDF4] flex-col justify-between p-7 xl:p-9 border-r border-amber-400/25 overflow-hidden select-none">
      {/* Background radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#0A4D3C]/60 via-[#062D23] to-[#02140F] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      {/* Decorative hairline gold frame */}
      <div className="absolute inset-3 border border-amber-400/20 rounded-3xl pointer-events-none" />
      <div className="absolute inset-5 border border-emerald-400/10 rounded-2xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="relative z-10 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#031A14]/90 border border-amber-400/35 text-amber-300 text-xs font-serif uppercase tracking-widest font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
            <span>Walimatul Aqiqah & Tasmiyah</span>
          </div>
          <span className="text-xs font-mono text-emerald-300/80 font-medium">
            {hijriDate}
          </span>
        </div>
        <p className="font-serif text-sm text-amber-200/90 text-right tracking-wide" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>

      {/* Center Showcase: Baby Portrait & Regality */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
        {/* Moroccan Scalloped Arch Frame */}
        <div className="relative mb-4">
          <div className="w-44 h-60 xl:w-52 xl:h-68 rounded-t-[100px] rounded-b-2xl p-1.5 bg-gradient-to-b from-amber-400/70 via-emerald-500/30 to-amber-300/40 shadow-2xl shadow-black/80">
            <div className="w-full h-full rounded-t-[94px] rounded-b-xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1656633702381-939966720da4?auto=format&fit=crop&w=1000&q=85"
                alt={babyName}
                className="w-full h-full object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04241C]/80 via-transparent to-transparent" />
            </div>
          </div>
          {/* Subtle Outer Arch Glow Line */}
          <div className="absolute -inset-2 rounded-t-[108px] rounded-b-3xl border border-amber-400/30 pointer-events-none" />
          
          {/* Halal Syariah Sunnah Badge overlay */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#021812] border border-amber-400/60 shadow-lg text-[10px] font-serif font-semibold text-amber-300 uppercase tracking-wider whitespace-nowrap">
            🌿 Sunnah Nabawiyyah
          </div>
        </div>

        {/* Baby Arabic & Full Naming */}
        <p className="font-serif text-lg xl:text-xl text-amber-200 tracking-wide mb-1" dir="rtl">
          {babyArabicName}
        </p>
        <h2 className="font-serif text-2xl xl:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-bold tracking-wide">
          {babyName}
        </h2>
        <p className="text-xs text-emerald-200/80 font-sans mt-1 max-w-xs">
          Putra Tercinta dari {parentsName}
        </p>

        {/* Virtual Live Streaming Pill */}
        <div className="mt-3">
          <a
            href="#livestream"
            onClick={(e) => {
              if (onOpenStreaming) {
                e.preventDefault()
                onOpenStreaming()
              }
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#063B2C]/90 hover:bg-[#084D3A] border border-emerald-400/40 text-emerald-100 text-xs font-sans font-medium transition-all shadow-md group cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <Video className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
            <span>Live Streaming Doa Bersama</span>
            <ExternalLink className="w-3 h-3 text-emerald-300/70" />
          </a>
        </div>

        {/* Live Countdown to Tasmiyah Prayer */}
        <div className="w-full mt-4 max-w-xs">
          <p className="text-[10px] uppercase font-mono tracking-widest text-amber-300/80 mb-2">
            Hitung Mundur Doa Tasmiyah
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Hari', val: timeLeft.days },
              { label: 'Jam', val: timeLeft.hours },
              { label: 'Menit', val: timeLeft.minutes },
              { label: 'Detik', val: timeLeft.seconds }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#031D15]/90 border border-amber-400/30 rounded-xl p-2 text-center shadow-inner"
              >
                <span className="font-serif text-lg xl:text-xl font-bold text-amber-200 block leading-tight">
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-emerald-300/70 font-sans">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Controls: Islamic Arabesque Audio Player & Venue Stamp */}
      <div className="relative z-10 space-y-3 pt-2">
        {/* Arabesque Music Player Card */}
        <div className="p-3 rounded-2xl bg-[#031F17]/90 border border-amber-400/30 shadow-lg flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Rotating Arabesque Medallion */}
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-600 flex items-center justify-center border border-amber-300 shadow-md shrink-0 transition-transform ${
                isPlayingAudio ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '6s' }}
            >
              <span className="text-white font-serif text-base select-none">۞</span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-mono tracking-wider text-amber-300/80 flex items-center gap-1">
                <Music className="w-3 h-3 text-amber-300" />
                Lantunan Shalawat & Syahdu
              </p>
              <p className="text-xs text-white font-medium truncate">
                {activeTrack?.title || 'Maher Zain - For The Rest of My Life (Instrumental Oud)'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleAudio}
            aria-label={isPlayingAudio ? 'Jeda Audio' : 'Putar Audio'}
            className="w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shrink-0 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {isPlayingAudio ? (
              <Volume2 className="w-4 h-4 text-slate-950" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-950" />
            )}
          </button>
        </div>

        {/* Date & Location Summary */}
        <div className="flex items-center justify-between text-[11px] text-emerald-200/70 px-1 font-sans">
          <div className="flex items-center gap-1 truncate max-w-[55%]">
            <Calendar className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="truncate">{dateText}</span>
          </div>
          <div className="flex items-center gap-1 truncate max-w-[42%]">
            <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="truncate">{venueText}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
