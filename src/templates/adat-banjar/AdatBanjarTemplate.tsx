import React, { useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Copy,
  Check,
  Send,
  Sparkles,
  ExternalLink,
  CreditCard,
  UserCheck,
  Navigation,
  CalendarPlus,
  Video,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  Wifi
} from 'lucide-react'
import { useInvitationData } from '../../context/InvitationContext'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { AdatBanjarCoverScreen } from './AdatBanjarCoverScreen'
import { AdatBanjarDesktopShowcase } from './AdatBanjarDesktopShowcase'
import { BottomNav } from '../../components/BottomNav'
import { useToast } from '../../components/Toast'
import { Reveal3D } from '../../components/common/Reveal3D'

export const AdatBanjarTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack,
  onNextTrack
}) => {
  const { data: weddingData } = useInvitationData()
  const { showToast } = useToast()
  const [copiedBank, setCopiedBank] = useState<string | null>(null)
  const [copiedAddress, setCopiedAddress] = useState(false)

  // Countdown State
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
  }, [weddingData.countdownDate])

  // RSVP Form States
  const [guestName, setGuestName] = useState('')
  const [attendance, setAttendance] = useState<'hadir' | 'tidak' | 'ragu'>('hadir')
  const [blessingMessage, setBlessingMessage] = useState('')
  const [wishes, setWishes] = useState([
    {
      name: 'H. Gusti Rusdi Effendi',
      attendance: 'hadir',
      message: 'Selamat menempuh hidup baru gasan ananda Syahril & Elyana. Mugi dados keluarga sakinah mawaddah warahmah, babarakat sampai ka anak cucu.',
      time: '2 jam yang lalu'
    },
    {
      name: 'Hj. Siti Raudhah & Keluarga (Banjarmasin)',
      attendance: 'hadir',
      message: 'Alhamdulillah barakallah lakuma wa baraka alaikuma wa jama\'a bainakuma fii khoir. Selamat berbahagia kedua mempelai.',
      time: '4 jam yang lalu'
    },
    {
      name: 'Rahmat & Dinda (Banjarbaru)',
      attendance: 'hadir',
      message: 'Lancar sampai hari H acaranya. Baju adat Banjarnya rancak banar!',
      time: '6 jam yang lalu'
    }
  ])

  // Gallery & Lightbox
  const galleryImages = [
    { url: 'https://undanganwebkami.id/wp-content/uploads/2025/12/RAN_4182--682x1024.jpg', caption: 'Pesona Agung Busana Baamar Galung Pancar Matahari' },
    { url: 'https://undanganwebkami.id/wp-content/uploads/2025/12/RAN_4245-.jpg', caption: 'Keanggunan Mahkota & Ronce Melati Khas Banjar' },
    { url: 'https://undanganwebkami.id/wp-content/uploads/2025/12/RAN_4275-.jpg', caption: 'Langkah Bersama Menuju Mahligai Suci' },
    { url: 'https://undanganwebkami.id/wp-content/uploads/2025/12/RAN_4278-.jpg', caption: 'Senyum Bahagia Dalam Balutan Kain Sasirangan' },
    { url: 'https://undanganwebkami.id/wp-content/uploads/2025/12/RAN_4331-.jpg', caption: 'Janji Setia Seumur Hidup' }
  ]
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const handleCopy = (text: string, identifier: string, label: string) => {
    navigator.clipboard.writeText(text)
    if (identifier === 'address') {
      setCopiedAddress(true)
      showToast('Alamat lengkap berhasil disalin!', 'success')
      setTimeout(() => setCopiedAddress(false), 2500)
    } else {
      setCopiedBank(identifier)
      showToast(`Nomor rekening ${label} berhasil disalin!`, 'success')
      setTimeout(() => setCopiedBank(null), 2500)
    }
  }

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestName.trim()) {
      showToast('Mohon masukkan nama Anda', 'info')
      return
    }
    if (!blessingMessage.trim()) {
      showToast('Mohon tulis ucapan & doa restu Anda', 'info')
      return
    }

    const newWish = {
      name: guestName.trim(),
      attendance,
      message: blessingMessage.trim(),
      time: 'Baru saja'
    }

    setWishes([newWish, ...wishes])
    setGuestName('')
    setBlessingMessage('')
    showToast('Terima kasih! Doa restu Anda telah terkirim.', 'success')
  }

  const generateGoogleCalendarUrl = (title: string, details: string, location: string, start: string, end: string) => {
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${start}/${end}`
  }

  const { akad, resepsi } = weddingData.events
  const { groom, bride } = weddingData.couple

  return (
    <div className="min-h-screen bg-[#1E0B0B] flex justify-center text-stone-800 selection:bg-[#D7BB83] selection:text-[#1E0B0B] overflow-x-hidden pt-12">
      {/* Cover Gate: Adat Banjar Envelope & Illustrations */}
      <AdatBanjarCoverScreen isOpen={isOpened} onOpenWithAudio={onOpenWithAudio} />

      {/* Floating Bottom Nav */}
      {isOpened && <BottomNav />}

      <div className="w-full flex flex-col lg:flex-row min-h-screen">
        {/* Left Column: Desktop Sticky Showcase */}
        <AdatBanjarDesktopShowcase
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={onToggleAudio}
          activeTrack={activeTrack}
          onNextTrack={onNextTrack}
        />

        {/* Right Column: Scrollable Invitation Content in Traditional Banjar Theme */}
        <div
          className="w-full lg:w-[58%] xl:w-[62%] min-h-screen shadow-2xl relative border-l border-[#D7BB83]/25 transition-colors duration-500 text-[#2B1810]"
          style={{
            backgroundColor: '#FFFCF3',
            backgroundImage: `url("https://undanganwebkami.id/wp-content/uploads/2025/12/Banjar-Seamless-Pattern.png")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '300px'
          }}
        >
          {/* Subtle ivory overlay to keep typography sharp & readable */}
          <div className="absolute inset-0 bg-[#FFFCF3]/92 pointer-events-none" />

          <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-16">
            
            {/* 1. HERO SECTION */}
            <section id="home" className="text-center pt-4 pb-8">
              <div className="relative max-w-md mx-auto">
                <img
                  src="https://undanganwebkami.id/wp-content/uploads/2025/12/Banjar-Motif-Atas.png"
                  alt="Motif Banjar"
                  className="w-48 mx-auto mb-4 opacity-80"
                />

                <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#722C2C] font-semibold mb-2">
                  Walimatul 'Ursy
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F0A0A] tracking-tight">
                  The Wedding of
                </h1>

                {/* Couple Names */}
                <div className="my-5 space-y-1">
                  <div className="font-script text-5xl sm:text-6xl text-[#722C2C] drop-shadow-sm">
                    {groom.shortName}
                  </div>
                  <div className="font-script text-3xl text-[#D7BB83]">&amp;</div>
                  <div className="font-script text-5xl sm:text-6xl text-[#722C2C] drop-shadow-sm">
                    {bride.shortName}
                  </div>
                </div>

                <p className="font-serif text-sm tracking-widest text-stone-600 uppercase mb-8">
                  {akad.date}
                </p>

                {/* Prewedding Arch Portrait */}
                <Reveal3D delay={100} interactive className="relative mx-auto max-w-xs sm:max-w-sm">
                  <div className="relative rounded-t-[140px] rounded-b-3xl overflow-hidden border-4 border-[#D7BB83] shadow-2xl bg-[#1A0A0A]">
                    <img
                      src="https://undanganwebkami.id/wp-content/uploads/2025/12/RAN_4182--682x1024.jpg"
                      alt={`${groom.shortName} & ${bride.shortName}`}
                      className="w-full h-[380px] sm:h-[440px] object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F0A0A]/60 via-transparent to-transparent" />
                  </div>
                </Reveal3D>
              </div>
            </section>

            {/* 2. QUOTE & AYAT SUCI */}
            <section id="ayat" className="text-center py-4">
              <Reveal3D delay={100} interactive className="p-7 sm:p-9 rounded-3xl bg-white/90 backdrop-blur-md border border-[#D7BB83]/60 shadow-xl max-w-2xl mx-auto">
                {/* Monogram Seal */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D7BB83] to-[#A38C5E] text-[#1E0B0B] font-serif font-bold text-xl flex items-center justify-center mx-auto mb-5 shadow-md">
                  {groom.shortName.charAt(0)} &amp; {bride.shortName.charAt(0)}
                </div>

                <p className="font-serif italic text-xs sm:text-sm text-stone-700 leading-relaxed max-w-lg mx-auto">
                  "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
                </p>
                <p className="font-sans font-semibold text-xs tracking-wider text-[#722C2C] mt-4 uppercase">
                  — QS. Ar-Rum : 21 —
                </p>
              </Reveal3D>
            </section>

            {/* 3. MEMPELAI SECTION */}
            <section id="mempelai" className="py-4 text-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#722C2C]/10 border border-[#D7BB83]/60 text-[#722C2C] text-xs uppercase tracking-widest font-sans font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D7BB83]" />
                <span>Sang Mempelai</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F0A0A] mb-2">
                We Are Getting Married!
              </h2>
              <p className="font-sans text-xs sm:text-sm text-stone-600 max-w-lg mx-auto mb-10 leading-relaxed">
                Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {/* Groom Card */}
                <Reveal3D delay={100} interactive className="p-7 sm:p-9 rounded-3xl bg-white/95 backdrop-blur-md border border-[#D7BB83]/60 shadow-xl flex flex-col items-center">
                  <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-t-[80px] rounded-b-2xl overflow-hidden border-2 border-[#D7BB83] mb-5 shadow-lg bg-[#1F0A0A]">
                    <img
                      src="https://undanganwebkami.id/wp-content/uploads/2025/12/cpp-1-17-1.jpg"
                      alt={groom.fullName}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-script text-4xl sm:text-5xl text-[#722C2C]">
                    {groom.shortName}
                  </h3>
                  <p className="font-serif text-base sm:text-lg font-bold text-stone-900 mt-1">
                    {groom.fullName}
                  </p>
                  <p className="text-xs text-stone-500 font-sans mt-2">
                    Putra dari:
                  </p>
                  <p className="text-xs sm:text-sm font-serif font-semibold text-stone-800">
                    {groom.fatherName} &amp; {groom.motherName}
                  </p>
                  <div className="mt-5 pt-3 border-t border-stone-200 w-full flex justify-center">
                    <span className="text-xs text-[#722C2C] font-semibold">@{groom.instagram}</span>
                  </div>
                </Reveal3D>

                {/* Bride Card */}
                <Reveal3D delay={200} interactive className="p-7 sm:p-9 rounded-3xl bg-white/95 backdrop-blur-md border border-[#D7BB83]/60 shadow-xl flex flex-col items-center">
                  <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-t-[80px] rounded-b-2xl overflow-hidden border-2 border-[#D7BB83] mb-5 shadow-lg bg-[#1F0A0A]">
                    <img
                      src="https://undanganwebkami.id/wp-content/uploads/2025/12/cpw-1-17-1.jpg"
                      alt={bride.fullName}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-script text-4xl sm:text-5xl text-[#722C2C]">
                    {bride.shortName}
                  </h3>
                  <p className="font-serif text-base sm:text-lg font-bold text-stone-900 mt-1">
                    {bride.fullName}
                  </p>
                  <p className="text-xs text-stone-500 font-sans mt-2">
                    Putri dari:
                  </p>
                  <p className="text-xs sm:text-sm font-serif font-semibold text-stone-800">
                    {bride.fatherName} &amp; {bride.motherName}
                  </p>
                  <div className="mt-5 pt-3 border-t border-stone-200 w-full flex justify-center">
                    <span className="text-xs text-[#722C2C] font-semibold">@{bride.instagram}</span>
                  </div>
                </Reveal3D>
              </div>
            </section>

            {/* 4. EVENT SCHEDULE & COUNTDOWN */}
            <section id="acara" className="py-4 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F0A0A] mb-3">
                Save The Date
              </h2>
              <p className="font-sans text-xs sm:text-sm text-stone-600 max-w-xl mx-auto mb-8 leading-relaxed">
                Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri rangkaian acara pernikahan kami:
              </p>

              {/* Countdown Card */}
              <Reveal3D delay={100} interactive className="p-6 sm:p-8 rounded-3xl bg-[#2A0F0F] text-[#FFFCF3] border-2 border-[#D7BB83] shadow-2xl max-w-2xl mx-auto mb-10">
                <p className="text-xs uppercase tracking-[0.25em] text-[#D7BB83] font-semibold mb-5 font-sans">
                  Menghitung Hari Bahagia
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'Hari', val: timeLeft.days },
                    { label: 'Jam', val: timeLeft.hours },
                    { label: 'Menit', val: timeLeft.minutes },
                    { label: 'Detik', val: timeLeft.seconds }
                  ].map((unit, idx) => (
                    <div key={idx} className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-[#D7BB83]/30">
                      <span className="font-serif text-2xl sm:text-4xl font-bold text-[#D7BB83]">
                        {String(unit.val).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-stone-300 mt-1 block">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal3D>

              {/* Event Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
                {/* Akad Nikah */}
                <Reveal3D delay={100} interactive className="p-7 sm:p-9 rounded-3xl bg-white/95 border border-[#D7BB83]/60 shadow-xl flex flex-col justify-between text-center">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#722C2C]/10 text-[#722C2C] flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F0A0A] mb-3">
                      {akad.title}
                    </h3>
                    <div className="space-y-2.5 text-xs sm:text-sm text-stone-600 font-sans my-5">
                      <p className="font-bold text-stone-900">{akad.date}</p>
                      <p className="text-[#722C2C] font-semibold">{akad.time}</p>
                      <p className="font-bold text-stone-800 pt-1">{akad.venue}</p>
                      <p className="text-[11px] sm:text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                        {akad.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-5 border-t border-stone-200">
                    <a
                      href={akad.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1F0A0A] text-white hover:bg-[#722C2C] text-xs font-sans font-medium transition-colors cursor-pointer shadow-md"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                    </a>
                    <a
                      href={generateGoogleCalendarUrl(
                        `Akad Nikah: ${groom.shortName} & ${bride.shortName}`,
                        `Pernikahan ${groom.fullName} & ${bride.fullName}`,
                        akad.address,
                        akad.calendarDate.start,
                        akad.calendarDate.end
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFDF7] text-[#722C2C] border border-[#D7BB83] hover:bg-[#FAF4E6] text-xs font-sans font-medium transition-colors"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      <span>Simpan Kalender</span>
                    </a>
                  </div>
                </Reveal3D>

                {/* Resepsi */}
                <Reveal3D delay={200} interactive className="p-7 sm:p-9 rounded-3xl bg-white/95 border border-[#D7BB83]/60 shadow-xl flex flex-col justify-between text-center">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#722C2C]/10 text-[#722C2C] flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F0A0A] mb-3">
                      {resepsi.title}
                    </h3>
                    <div className="space-y-2.5 text-xs sm:text-sm text-stone-600 font-sans my-5">
                      <p className="font-bold text-stone-900">{resepsi.date}</p>
                      <p className="text-[#722C2C] font-semibold">{resepsi.time}</p>
                      <p className="font-bold text-stone-800 pt-1">{resepsi.venue}</p>
                      <p className="text-[11px] sm:text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                        {resepsi.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-5 border-t border-stone-200">
                    <a
                      href={resepsi.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1F0A0A] text-white hover:bg-[#722C2C] text-xs font-sans font-medium transition-colors cursor-pointer shadow-md"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                    </a>
                    <a
                      href={generateGoogleCalendarUrl(
                        `Resepsi: ${groom.shortName} & ${bride.shortName}`,
                        `Resepsi Pernikahan ${groom.fullName} & ${bride.fullName}`,
                        resepsi.address,
                        resepsi.calendarDate.start,
                        resepsi.calendarDate.end
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFDF7] text-[#722C2C] border border-[#D7BB83] hover:bg-[#FAF4E6] text-xs font-sans font-medium transition-colors"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      <span>Simpan Kalender</span>
                    </a>
                  </div>
                </Reveal3D>
              </div>
            </section>

            {/* 5. LIVE STREAMING */}
            <section id="streaming" className="py-4 text-center">
              <Reveal3D delay={100} interactive className="p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#2B1010] to-[#170606] text-white border-2 border-[#D7BB83] shadow-2xl max-w-2xl mx-auto">
                <div className="w-12 h-12 rounded-full bg-[#D7BB83]/20 text-[#D7BB83] flex items-center justify-center mx-auto mb-3">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFCF3] mb-2">
                  Siaran Langsung Virtual
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mb-6 leading-relaxed">
                  Bagi keluarga dan sahabat yang belum dapat hadir secara langsung, silakan menyaksikan prosesi sakral kami melalui tautan berikut:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-sans text-xs font-bold transition-all shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>YouTube Live</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-sans text-xs font-bold transition-all shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Instagram Live</span>
                  </a>
                </div>
              </Reveal3D>
            </section>

            {/* 6. LOVE STORY TIMELINE */}
            <section id="cerita" className="py-4 text-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#722C2C]/10 border border-[#D7BB83]/60 text-[#722C2C] text-xs uppercase tracking-widest font-sans font-semibold mb-3">
                <Heart className="w-3.5 h-3.5 text-[#D7BB83]" />
                <span>Kisah Kasih</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F0A0A] mb-8">
                Love Story
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto text-left">
                {[
                  {
                    year: '2015',
                    title: 'Pertemuan Pertama',
                    desc: 'Kami pertama kali bertemu di sebuah acara kemahasiswaan. Berkenalan secara hangat sebagai perwakilan divisi kegiatan yang kami selenggarakan bersama.'
                  },
                  {
                    year: '2019',
                    title: 'Bertemu Kembali',
                    desc: 'Setelah lama berpisah meniti karier, kami dipertemukan kembali di sebuah seminar profesional. Kebetulan kami berkarya di bidang yang selaras.'
                  },
                  {
                    year: '2023',
                    title: 'Ikatan Lamaran',
                    desc: 'Momen penuh haru yang tak disangka, Syahril mantap melamar dengan langsung meminta restu kepada ayahanda Elyana. Langkah awal menuju kebersamaan abadi.'
                  },
                  {
                    year: '2024 - Seterusnya',
                    title: 'Menuju Mahligai Suci',
                    desc: 'Babak baru kehidupan kami dimulai. Membangun rumah tangga sakinah mawaddah warahmah dalam lindungan dan keberkahan Allah SWT.'
                  }
                ].map((item, idx) => (
                  <Reveal3D
                    key={idx}
                    delay={(idx * 100) as any}
                    interactive
                    className="p-6 rounded-3xl bg-white/95 border border-[#D7BB83]/60 shadow-md relative overflow-hidden"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-serif font-bold text-lg text-[#D7BB83]">
                        {item.year}
                      </span>
                      <span className="h-px flex-1 bg-[#D7BB83]/40" />
                    </div>
                    <h4 className="font-serif font-bold text-base text-stone-900 mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </Reveal3D>
                ))}
              </div>
            </section>

            {/* 7. GALLERY */}
            <section id="galeri" className="py-4 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F0A0A] mb-3">
                Galeri Kenangan
              </h2>
              <p className="font-sans text-xs sm:text-sm text-stone-600 max-w-xl mx-auto mb-8 leading-relaxed">
                Momen-momen indah perjalanan cinta kami dalam balutan pesona busana adat Banjar:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4 max-w-3xl mx-auto">
                {galleryImages.map((img, idx) => (
                  <Reveal3D
                    key={idx}
                    delay={((idx % 3) * 100) as any}
                    interactive
                    onClick={() => setLightboxIndex(idx)}
                    className={`group relative overflow-hidden rounded-3xl bg-stone-900 cursor-pointer shadow-lg hover:shadow-2xl border-2 border-[#D7BB83]/50 ${
                      idx === 0 ? 'col-span-2 md:col-span-2 h-64 sm:h-76' : 'h-52 sm:h-76'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#1F0A0A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-white">
                      <ZoomIn className="w-6 h-6 text-[#D7BB83] mb-1" />
                      <p className="text-xs font-serif italic text-center drop-shadow-md">
                        {img.caption}
                      </p>
                    </div>
                  </Reveal3D>
                ))}
              </div>
            </section>

            {/* 8. LOVE GIFT / AMPLOP DIGITAL */}
            <section id="hadiah" className="py-4 text-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#722C2C]/10 border border-[#D7BB83]/60 text-[#722C2C] text-xs uppercase tracking-widest font-sans font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D7BB83]" />
                <span>Tanda Kasih</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F0A0A] mb-3">
                Love Gift
              </h2>
              <p className="font-sans text-xs sm:text-sm text-stone-600 max-w-xl mx-auto mb-8 leading-relaxed">
                Doa restu Anda merupakan karunia terindah bagi kami. Bagi yang berkenan memberikan tanda kasih, dapat mengirimkannya melalui:
              </p>

              {/* Bank Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8 text-left">
                {/* BCA Card */}
                <Reveal3D delay={100} interactive className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0d3b66] via-[#051e3a] to-[#041224] text-white shadow-2xl border border-white/20 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif font-bold text-lg sm:text-xl text-amber-200 tracking-wider">
                      BANK BCA
                    </span>
                    <Wifi className="w-5 h-5 text-amber-300/80 rotate-90" />
                  </div>
                  <div className="w-11 h-8 rounded-lg bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-md mb-5" />
                  <p className="text-[10px] text-stone-300 uppercase tracking-widest font-sans mb-0.5">
                    Nomor Rekening
                  </p>
                  <p className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-amber-100">
                    1234567890
                  </p>
                  <p className="text-xs text-stone-200 font-serif mt-1 uppercase">
                    a.n. Syahril Rendra Backhtiar
                  </p>
                  <div className="pt-4 mt-4 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => handleCopy('1234567890', 'bca', 'BCA')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 text-xs font-sans font-medium transition-all cursor-pointer border border-amber-400/30"
                    >
                      {copiedBank === 'bca' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Rekening</span>
                        </>
                      )}
                    </button>
                  </div>
                </Reveal3D>

                {/* Mandiri Card */}
                <Reveal3D delay={200} interactive className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#1c3144] via-[#0b1622] to-[#1e3a5f] text-white shadow-2xl border border-white/20 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif font-bold text-lg sm:text-xl text-amber-200 tracking-wider">
                      BANK MANDIRI
                    </span>
                    <Wifi className="w-5 h-5 text-amber-300/80 rotate-90" />
                  </div>
                  <div className="w-11 h-8 rounded-lg bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-md mb-5" />
                  <p className="text-[10px] text-stone-300 uppercase tracking-widest font-sans mb-0.5">
                    Nomor Rekening
                  </p>
                  <p className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-amber-100">
                    9876543210
                  </p>
                  <p className="text-xs text-stone-200 font-serif mt-1 uppercase">
                    a.n. Elyana Azkiya Nur
                  </p>
                  <div className="pt-4 mt-4 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => handleCopy('9876543210', 'mandiri', 'Mandiri')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 text-xs font-sans font-medium transition-all cursor-pointer border border-amber-400/30"
                    >
                      {copiedBank === 'mandiri' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Rekening</span>
                        </>
                      )}
                    </button>
                  </div>
                </Reveal3D>
              </div>

              {/* Kirim Kado Fisik Card */}
              <Reveal3D delay={300} interactive className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-[#D7BB83]/60 shadow-xl max-w-2xl mx-auto text-left">
                <div className="flex items-center gap-2.5 mb-3 text-stone-900">
                  <Package className="w-5 h-5 text-[#722C2C]" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold">Kirim Kado Fisik</h3>
                </div>
                <p className="text-xs text-stone-600 mb-3 leading-relaxed font-sans">
                  Alamat pengiriman tanda kasih berupa bingkisan fisik:
                </p>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1 mb-4 font-sans">
                  <p className="font-bold text-stone-900">Penerima: Elyana Azkiya &amp; Syahril</p>
                  <p className="text-stone-600">No. HP: 0812-9876-5432</p>
                  <p className="text-stone-600">Alamat: Jl. Ahmad Yani Km. 5, Komplek Mahligai No. 12, Banjarmasin, Kalimantan Selatan 70249</p>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleCopy('Jl. Ahmad Yani Km. 5, Komplek Mahligai No. 12, Banjarmasin, Kalimantan Selatan 70249 (Penerima: Elyana Azkiya - 081298765432)', 'address', 'Alamat')}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1F0A0A] text-white hover:bg-[#722C2C] text-xs font-sans font-medium transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedAddress ? 'Alamat Tersalin!' : 'Salin Alamat Lengkap'}</span>
                  </button>
                </div>
              </Reveal3D>
            </section>

            {/* 9. WISHES & RSVP FORM */}
            <section id="ucapan" className="py-4 text-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#722C2C]/10 border border-[#D7BB83]/60 text-[#722C2C] text-xs uppercase tracking-widest font-sans font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D7BB83]" />
                <span>Doa Restu Tamu</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F0A0A] mb-3">
                Wishes &amp; Konfirmasi
              </h2>
              <p className="font-sans text-xs sm:text-sm text-stone-600 max-w-xl mx-auto mb-8 leading-relaxed">
                Tuliskan doa restu serta konfirmasi kehadiran Anda demi kelancaran hari bahagia kami:
              </p>

              <div className="max-w-2xl mx-auto text-left space-y-6">
                {/* RSVP Form */}
                <Reveal3D delay={100} interactive className="p-6 sm:p-8 rounded-3xl bg-white/95 border-2 border-[#D7BB83] shadow-xl">
                  <form onSubmit={handleRsvpSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-sans font-semibold text-stone-700 mb-1.5">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Contoh: Gusti Rian &amp; Keluarga"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#722C2C] text-xs sm:text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-semibold text-stone-700 mb-1.5">
                        Konfirmasi Kehadiran
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'hadir', label: 'Hadir' },
                          { id: 'tidak', label: 'Tidak Hadir' },
                          { id: 'ragu', label: 'Masih Ragu' }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setAttendance(opt.id as any)}
                            className={`py-2 px-3 rounded-xl text-xs font-sans font-medium transition-all border ${
                              attendance === opt.id
                                ? 'bg-[#722C2C] text-white border-[#722C2C] shadow-md'
                                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-semibold text-stone-700 mb-1.5">
                        Doa &amp; Ucapan Selamat
                      </label>
                      <textarea
                        rows={3}
                        value={blessingMessage}
                        onChange={(e) => setBlessingMessage(e.target.value)}
                        placeholder="Tuliskan ucapan selamat dan doa keberkahan..."
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#722C2C] text-xs sm:text-sm bg-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-gradient-to-r from-[#D7BB83] via-[#E5C058] to-[#A38C5E] text-[#1E0B0B] font-sans font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Ucapan &amp; Konfirmasi</span>
                    </button>
                  </form>
                </Reveal3D>

                {/* Wishes Stream */}
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {wishes.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-stone-200 shadow-sm space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-[#1F0A0A]">
                          {item.name}
                        </span>
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-sans font-semibold uppercase ${
                            item.attendance === 'hadir'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.attendance === 'tidak'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.attendance === 'hadir' ? 'Hadir' : item.attendance === 'tidak' ? 'Berhalangan' : 'Ragu'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 font-sans leading-relaxed">
                        "{item.message}"
                      </p>
                      <span className="text-[10px] text-stone-400 font-sans block text-right">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 10. CLOSING & FOOTER */}
            <footer className="text-center pt-8 pb-16 border-t border-stone-300/60">
              <img
                src="https://undanganwebkami.id/wp-content/uploads/2025/12/Banjar-Icon.png"
                alt="Emblem Banjar"
                className="w-16 mx-auto mb-4 opacity-80"
              />
              <p className="font-serif italic text-xs sm:text-sm text-stone-700 max-w-lg mx-auto leading-relaxed px-4">
                "Suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu bagi pernikahan kami."
              </p>
              <p className="font-sans text-xs text-stone-500 uppercase tracking-widest mt-6">
                Kami Yang Berbahagia,
              </p>
              <div className="font-script text-4xl sm:text-6xl text-[#722C2C] my-3">
                {groom.shortName} &amp; {bride.shortName}
              </div>
              <p className="font-serif text-xs text-stone-600">
                Beserta Keluarga Besar Kedua Mempelai
              </p>
              <div className="mt-8 text-[11px] text-stone-400 font-sans flex items-center justify-center gap-1">
                <span>Undangan Digital Adat Banjar by</span>
                <strong className="text-stone-700">JanjiSuci.id</strong>
              </div>
            </footer>

          </main>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/94 backdrop-blur-md p-4 animate-in fade-in duration-300"
        >
          <div className="absolute top-4 left-0 right-0 px-6 flex items-center justify-between text-white z-50">
            <span className="font-sans text-xs bg-white/20 px-3.5 py-1.5 rounded-full">
              Foto {lightboxIndex + 1} dari {galleryImages.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <img
            src={galleryImages[lightboxIndex].url}
            alt={galleryImages[lightboxIndex].caption}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl border-2 border-[#D7BB83]"
          />

          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((lightboxIndex + 1) % galleryImages.length)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  )
}
