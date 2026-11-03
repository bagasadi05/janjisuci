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
  const { data: weddingData } = useInvitationData()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

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
  }, [])

  const generateGoogleCalendarUrl = (title: string, details: string, location: string, start: string, end: string) => {
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${start}/${end}`
  }

  const { akad, resepsi } = weddingData.events

  return (
    <section id="events" className="relative py-12 px-4 scroll-mt-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
          Informasi & Waktu Acara
        </h2>
        <FloralDivider className="my-3" />
        <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed px-4 max-w-xl mx-auto mb-8">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri rangkaian acara pernikahan kami:
        </p>

        {/* Live Countdown Timer Widget */}
        <Reveal3D delay={100} interactive className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950 text-amber-100 shadow-2xl mb-10 overflow-hidden border border-amber-500/30 max-w-2xl mx-auto">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-amber-300 font-sans mb-5 font-semibold">
            Menghitung Hari Bahagia
          </p>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-inner"
              >
                <span className="font-serif text-2xl sm:text-4xl font-bold text-amber-200">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-stone-300 mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-amber-200/80 italic mt-5 font-serif">
            {weddingData.events.akad.date}
          </p>
        </Reveal3D>

        {/* Event Cards Grid: Single column on mobile, 2 columns on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* Akad Nikah Card */}
          <Reveal3D delay={100} interactive className="relative p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-amber-800/15 shadow-xl text-center overflow-hidden flex flex-col justify-between transition-all hover:shadow-2xl">
            <BotanicalCorner position="top-right" />
            <BotanicalCorner position="bottom-left" />

            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-800 mb-4 shadow-sm">
                <Calendar className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800 mb-2">
                {akad.title}
              </h3>

              <div className="space-y-3 text-stone-600 text-xs sm:text-sm font-sans my-5">
                <div className="flex items-center justify-center gap-2 font-semibold text-stone-800">
                  <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{akad.date}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-stone-600">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{akad.time}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 pt-2">
                  <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                    <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{akad.venue}</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-500 max-w-xs leading-relaxed">
                    {akad.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 pt-5 border-t border-stone-200/60">
              <a
                href={akad.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full bg-stone-900 text-white hover:bg-amber-800 text-xs font-sans font-medium transition-colors cursor-pointer shadow-md active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Buka Google Maps</span>
              </a>

              <a
                href={generateGoogleCalendarUrl(
                  `Akad Nikah: ${weddingData.couple.groom.shortName} & ${weddingData.couple.bride.shortName}`,
                  `Pernikahan ${weddingData.couple.groom.fullName} & ${weddingData.couple.bride.fullName}`,
                  akad.address,
                  akad.calendarDate.start,
                  akad.calendarDate.end
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full bg-amber-50 text-amber-900 border border-amber-600/30 hover:bg-amber-100 text-xs font-sans font-medium transition-colors cursor-pointer active:scale-95"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>Simpan Kalender</span>
              </a>
            </div>
          </Reveal3D>

          {/* Resepsi Pernikahan Card */}
          <Reveal3D delay={200} interactive className="relative p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-amber-800/15 shadow-xl text-center overflow-hidden flex flex-col justify-between transition-all hover:shadow-2xl">
            <BotanicalCorner position="top-left" />
            <BotanicalCorner position="bottom-right" />

            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-800 mb-4 shadow-sm">
                <Calendar className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800 mb-2">
                {resepsi.title}
              </h3>

              <div className="space-y-3 text-stone-600 text-xs sm:text-sm font-sans my-5">
                <div className="flex items-center justify-center gap-2 font-semibold text-stone-800">
                  <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{resepsi.date}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-stone-600">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{resepsi.time}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 pt-2">
                  <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                    <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{resepsi.venue}</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-500 max-w-xs leading-relaxed">
                    {resepsi.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 pt-5 border-t border-stone-200/60">
              <a
                href={resepsi.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full bg-stone-900 text-white hover:bg-amber-800 text-xs font-sans font-medium transition-colors cursor-pointer shadow-md active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Buka Google Maps</span>
              </a>

              <a
                href={generateGoogleCalendarUrl(
                  `Resepsi: ${weddingData.couple.groom.shortName} & ${weddingData.couple.bride.shortName}`,
                  `Resepsi Pernikahan ${weddingData.couple.groom.fullName} & ${weddingData.couple.bride.fullName}`,
                  resepsi.address,
                  resepsi.calendarDate.start,
                  resepsi.calendarDate.end
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full bg-amber-50 text-amber-900 border border-amber-600/30 hover:bg-amber-100 text-xs font-sans font-medium transition-colors cursor-pointer active:scale-95"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>Simpan Kalender</span>
              </a>
            </div>
          </Reveal3D>

        </div>
      </div>
    </section>
  )
}
