import React, { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Navigation, CalendarPlus } from 'lucide-react'
import { useInvitationData } from '../context/InvitationContext'
import { FloralDivider, BotanicalCorner } from './Ornament'
import { Reveal3D } from './common/Reveal3D'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const EventSection: React.FC = () => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const isDark =
    activeTemplate.category === 'dark' ||
    activeTemplate.themeColors.textDark === '#FFFFFF' ||
    activeTemplate.slug === 'exclusive-navy' ||
    activeTemplate.slug === 'royal-midnight' ||
    activeTemplate.slug === 'celestial-night'

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(weddingData.countdownDate) - +new Date()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [weddingData.countdownDate])

  const generateGoogleCalendarUrl = (title: string, details: string, location: string, start: string, end: string) => {
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${start}/${end}`
  }

  const { akad, resepsi } = weddingData.events

  return (
    <section id="events" className="relative py-12 px-4 scroll-mt-6 defer-render-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-stone-800'}`}>
          Informasi &amp; Waktu Acara
        </h2>
        <FloralDivider className="my-3" />
        <p className={`font-sans text-xs sm:text-sm leading-relaxed px-4 max-w-xl mx-auto mb-8 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri rangkaian acara kami:
        </p>

        {/* Live Countdown Timer Widget */}
        <Reveal3D
          delay={100}
          interactive
          className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950 text-amber-100 shadow-2xl mb-10 overflow-hidden border border-amber-500/30 max-w-2xl mx-auto"
        >
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-amber-300 font-sans mb-5 font-semibold">
            Menghitung Hari Bahagia
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            <div className="p-3 sm:p-4 rounded-2xl bg-black/40 border border-amber-500/20 backdrop-blur-sm">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-amber-200 block">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-300 uppercase tracking-widest font-sans mt-1 block">
                Hari
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-black/40 border border-amber-500/20 backdrop-blur-sm">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-amber-200 block">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-300 uppercase tracking-widest font-sans mt-1 block">
                Jam
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-black/40 border border-amber-500/20 backdrop-blur-sm">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-amber-200 block">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-300 uppercase tracking-widest font-sans mt-1 block">
                Menit
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-black/40 border border-amber-500/20 backdrop-blur-sm">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-amber-200 block">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-300 uppercase tracking-widest font-sans mt-1 block">
                Detik
              </span>
            </div>
          </div>
        </Reveal3D>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Akad Nikah / Acara Utama */}
          <Reveal3D
            delay={200}
            interactive
            className={`relative p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-xl flex flex-col justify-between ${
              isDark
                ? 'bg-stone-900/85 border border-amber-500/30 text-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
                : 'bg-white/90 border border-amber-800/15 text-stone-800'
            }`}
          >
            <BotanicalCorner position="top-left" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-serif font-bold uppercase tracking-wider mb-4 border border-amber-500/30">
                <Calendar className="w-3.5 h-3.5" />
                <span>{akad.title}</span>
              </div>

              <h3 className={`font-serif text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-stone-800'}`}>
                {akad.title}
              </h3>

              <div className="space-y-3 my-5 text-xs sm:text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold">{akad.date}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{akad.time}</span>
                </div>
                <div className="flex items-start justify-center gap-2 pt-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{akad.venue}</p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{akad.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <a
                href={akad.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Petunjuk Arah (Maps)</span>
              </a>

              <a
                href={generateGoogleCalendarUrl(
                  `${akad.title} - ${weddingData.couple.groom.shortName} & ${weddingData.couple.bride.shortName}`,
                  `Acara ${akad.title} di ${akad.venue}`,
                  akad.address,
                  akad.calendarDate?.start || '20271024T080000',
                  akad.calendarDate?.end || '20271024T100000'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border text-xs font-medium transition-all cursor-pointer active:scale-95 ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 border-white/20 text-stone-200'
                    : 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700'
                }`}
              >
                <CalendarPlus className="w-3.5 h-3.5 text-amber-400" />
                <span>Simpan Kalender</span>
              </a>
            </div>
          </Reveal3D>

          {/* Card 2: Resepsi / Acara Kedua */}
          <Reveal3D
            delay={300}
            interactive
            className={`relative p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-xl flex flex-col justify-between ${
              isDark
                ? 'bg-stone-900/85 border border-amber-500/30 text-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
                : 'bg-white/90 border border-amber-800/15 text-stone-800'
            }`}
          >
            <BotanicalCorner position="top-right" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-serif font-bold uppercase tracking-wider mb-4 border border-amber-500/30">
                <Calendar className="w-3.5 h-3.5" />
                <span>{resepsi.title}</span>
              </div>

              <h3 className={`font-serif text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-stone-800'}`}>
                {resepsi.title}
              </h3>

              <div className="space-y-3 my-5 text-xs sm:text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold">{resepsi.date}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{resepsi.time}</span>
                </div>
                <div className="flex items-start justify-center gap-2 pt-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{resepsi.venue}</p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{resepsi.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <a
                href={resepsi.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Petunjuk Arah (Maps)</span>
              </a>

              <a
                href={generateGoogleCalendarUrl(
                  `${resepsi.title} - ${weddingData.couple.groom.shortName} & ${weddingData.couple.bride.shortName}`,
                  `Acara ${resepsi.title} di ${resepsi.venue}`,
                  resepsi.address,
                  resepsi.calendarDate?.start || '20271024T110000',
                  resepsi.calendarDate?.end || '20271024T140000'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border text-xs font-medium transition-all cursor-pointer active:scale-95 ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 border-white/20 text-stone-200'
                    : 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700'
                }`}
              >
                <CalendarPlus className="w-3.5 h-3.5 text-amber-400" />
                <span>Simpan Kalender</span>
              </a>
            </div>
          </Reveal3D>
        </div>
      </div>
    </section>
  )
}
