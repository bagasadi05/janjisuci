import React, { useState, useEffect } from 'react'
import { Sparkles, SkipForward, Disc3 } from 'lucide-react'
import { AudioTrack } from '../../config/weddingData'
import { useInvitationData } from '../../context/InvitationContext'

interface AdatBanjarDesktopShowcaseProps {
  isPlayingAudio: boolean
  onToggleAudio: () => void
  activeTrack: AudioTrack
  onNextTrack: () => void
}

export const AdatBanjarDesktopShowcase: React.FC<AdatBanjarDesktopShowcaseProps> = ({
  isPlayingAudio,
  onToggleAudio,
  activeTrack,
  onNextTrack
}) => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(weddingData.countdownDate) - +new Date()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <aside className="hidden lg:flex lg:w-[42%] xl:w-[38%] lg:h-screen lg:sticky lg:top-0 z-20 flex-col justify-between p-8 xl:p-12 bg-[#1A0A0A] text-white overflow-hidden border-r border-[#D7BB83]/30 shadow-2xl relative">
      {/* Background Sasirangan & Dark Velvet Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("https://undanganwebkami.id/wp-content/uploads/2025/12/Banjar-Seamless-Pattern.png")`,
          backgroundSize: '260px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#120606] via-[#1A0A0A]/90 to-[#120606]/95 pointer-events-none" />

      {/* Top Section: Emblem & Tagline */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#722C2C]/30 border border-[#D7BB83]/40 text-[#D7BB83] text-xs font-sans uppercase tracking-[0.2em] w-fit backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#D7BB83]" />
          <span>Adat Banjar Kalimantan Selatan</span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="https://undanganwebkami.id/wp-content/uploads/2025/12/Banjar-Icon.png"
            alt="Emblem Banjar"
            className="w-14 h-auto drop-shadow-md"
          />
          <div>
            <h1 className="font-serif text-2xl xl:text-3xl font-bold tracking-tight text-[#FFFCF3]">
              The Wedding Celebration
            </h1>
            <p className="font-script text-3xl xl:text-4xl text-[#D7BB83] mt-0.5">
              {weddingData.couple.groom.shortName} &amp; {weddingData.couple.bride.shortName}
            </p>
          </div>
        </div>
      </div>

      {/* Middle Section: Prewedding Portrait Frame & Music Vinyl */}
      <div className="relative z-10 my-auto py-6 flex flex-col items-center">
        {/* Arch Frame with Real Photo */}
        <div className="relative rounded-t-[100px] rounded-b-2xl overflow-hidden border-2 border-[#D7BB83] shadow-2xl w-48 xl:w-56 h-64 xl:h-76 bg-black/40 mb-5">
          <img
            src={activeTemplate.heroImage || 'https://undanganwebkami.id/wp-content/uploads/2025/12/RAN_4245-.jpg'}
            alt="Adat Banjar"
            className="w-full h-full object-cover object-top filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F0A0A]/70 via-transparent to-transparent" />
        </div>

        {/* Music Player Vinyl Card */}
        <div className="w-full max-w-xs p-3.5 rounded-2xl bg-[#2B1010]/80 backdrop-blur-md border border-[#D7BB83]/40 shadow-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <button
              onClick={onToggleAudio}
              className={`w-9 h-9 rounded-full bg-gradient-to-tr from-[#D7BB83] to-[#A38C5E] text-[#1E0B0B] flex items-center justify-center shrink-0 shadow-md ${
                isPlayingAudio ? 'animate-spin-slow' : ''
              }`}
            >
              <Disc3 className="w-5 h-5" />
            </button>
            <div className="truncate text-left">
              <p className="text-[11px] font-semibold text-[#FFFCF3] truncate">
                {activeTrack.title}
              </p>
              <p className="text-[9px] text-[#D7BB83]/80 uppercase tracking-widest">
                {isPlayingAudio ? 'Sedang Memutar' : 'Musik Jeda'}
              </p>
            </div>
          </div>

          <button
            onClick={onNextTrack}
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Lagu Selanjutnya"
          >
            <SkipForward className="w-4 h-4 text-[#D7BB83]" />
          </button>
        </div>
      </div>

      {/* Bottom Section: Live Countdown & Navigation Pills */}
      <div className="relative z-10 space-y-4">
        {/* Live Countdown Grid */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: 'Hari', val: timeLeft.days },
            { label: 'Jam', val: timeLeft.hours },
            { label: 'Menit', val: timeLeft.minutes },
            { label: 'Detik', val: timeLeft.seconds }
          ].map((item, i) => (
            <div
              key={i}
              className="p-2 rounded-xl bg-[#2B1010]/70 border border-[#D7BB83]/30 backdrop-blur-sm"
            >
              <span className="font-serif text-lg xl:text-xl font-bold text-[#D7BB83] block">
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-stone-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Jump Buttons */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-stone-300 pt-2 border-t border-white/10">
          <button onClick={() => scrollTo('mempelai')} className="hover:text-[#D7BB83] transition-colors cursor-pointer">
            Mempelai
          </button>
          <span>•</span>
          <button onClick={() => scrollTo('acara')} className="hover:text-[#D7BB83] transition-colors cursor-pointer">
            Jadwal Acara
          </button>
          <span>•</span>
          <button onClick={() => scrollTo('cerita')} className="hover:text-[#D7BB83] transition-colors cursor-pointer">
            Love Story
          </button>
          <span>•</span>
          <button onClick={() => scrollTo('galeri')} className="hover:text-[#D7BB83] transition-colors cursor-pointer">
            Galeri
          </button>
          <span>•</span>
          <button onClick={() => scrollTo('hadiah')} className="hover:text-[#D7BB83] transition-colors cursor-pointer">
            Amplop
          </button>
        </div>
      </div>
    </aside>
  )
}
