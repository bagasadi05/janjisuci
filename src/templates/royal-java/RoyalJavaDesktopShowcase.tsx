import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX, SkipForward, Disc3, Sparkles } from 'lucide-react'
import { useInvitationData } from '../../context/InvitationContext'
import { AudioTrack } from '../../config/weddingData'
import { GununganWayangSvg, SuryaMajapahitSeal, JavaneseCorner } from './RoyalJavaOrnaments'

interface RoyalJavaDesktopShowcaseProps {
  isPlayingAudio: boolean
  onToggleAudio: () => void
  activeTrack: AudioTrack
  onNextTrack: () => void
}

export const RoyalJavaDesktopShowcase: React.FC<RoyalJavaDesktopShowcaseProps> = ({
  isPlayingAudio,
  onToggleAudio,
  activeTrack,
  onNextTrack
}) => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date('2026-10-20T08:00:00+07:00').getTime()
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
    <aside className="hidden lg:flex lg:w-[42%] xl:w-[38%] h-screen sticky top-0 bg-[#120F0D] text-stone-100 flex-col justify-between p-8 xl:p-12 border-r border-[#C8963E]/30 overflow-hidden select-none">
      {/* Background Watermark Gunungan */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none translate-x-1/3">
        <GununganWayangSvg className="w-[500px] h-auto" />
      </div>

      {/* Top Brand & Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SuryaMajapahitSeal className="w-10 h-10" />
          <div>
            <p className="font-serif font-bold text-base text-amber-200 tracking-wider">
              Pawiwahan Ageng
            </p>
            <p className="text-[11px] text-stone-400 font-serif italic">
              Serat Ulem Dhauping Penganten
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#251E19] border border-[#C8963E]/40 text-amber-300 text-[10px] font-sans uppercase tracking-widest">
          Adat Jawa Klasik
        </span>
      </div>

      {/* Center Couple Photo in Royal Arch Frame */}
      <div className="relative z-10 my-auto py-4 text-center">
        <div className="relative mx-auto w-64 h-80 xl:w-72 xl:h-96 rounded-3xl p-3 bg-gradient-to-b from-[#C8963E]/40 via-[#251E19] to-[#120F0D] border border-[#C8963E]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <JavaneseCorner position="top-left" />
          <JavaneseCorner position="top-right" />
          <JavaneseCorner position="bottom-left" />
          <JavaneseCorner position="bottom-right" />

          <div className="w-full h-full rounded-2xl overflow-hidden relative">
            <img
              src={activeTemplate.heroImage}
              alt="Mempelai Adat Jawa"
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120F0D] via-transparent to-transparent opacity-60" />
          </div>
        </div>

        <div className="mt-6 space-y-1">
          <h2 className="font-serif text-3xl xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#C8963E]">
            {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
          </h2>
          <p className="text-xs text-amber-200/80 font-serif italic">
            {weddingData.events.akad.date}
          </p>
        </div>

        {/* Javanese Countdown Grid */}
        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mt-6">
          {[
            { val: timeLeft.days, label: 'Dinten' },
            { val: timeLeft.hours, label: 'Jam' },
            { val: timeLeft.minutes, label: 'Menit' },
            { val: timeLeft.seconds, label: 'Detik' }
          ].map((item, i) => (
            <div
              key={i}
              className="p-2 rounded-xl bg-[#1A1512] border border-[#C8963E]/30 text-center"
            >
              <span className="font-serif font-bold text-lg text-amber-300 block">
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-stone-400 font-sans uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gendhing Music Controller */}
      <div className="relative z-10 p-3.5 rounded-2xl bg-[#1A1512] border border-[#C8963E]/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-tr from-[#8A5A1B] via-[#C8963E] to-[#FFF2B2] flex items-center justify-center text-[#120F0D] shadow-md shrink-0 ${
              isPlayingAudio ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '8s' }}
          >
            <Disc3 className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-amber-400 font-sans font-semibold">
              Gendhing Penganten:
            </p>
            <p className="text-xs font-serif font-bold text-white truncate">
              {activeTrack.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onToggleAudio}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 transition-colors cursor-pointer"
            title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>
          <button
            onClick={onNextTrack}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
            title="Ganti Gendhing Berikutnya"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
