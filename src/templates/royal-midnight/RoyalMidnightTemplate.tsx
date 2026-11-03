import React, { useState, useEffect } from 'react'
import {
  Clock,
  Navigation,
  CreditCard,
  Copy,
  Check,
  Send,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Package
} from 'lucide-react'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { RoyalMidnightCoverScreen } from './RoyalMidnightCoverScreen'
import { RoyalMidnightDesktopShowcase } from './RoyalMidnightDesktopShowcase'
import { StarryAmbiance } from './StarryAmbiance'
import { useInvitationData } from '../../context/InvitationContext'
import { useToast } from '../../components/Toast'

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export const RoyalMidnightTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack,
  onNextTrack
}) => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const { showToast } = useToast()

  // State for Countdown
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // State for Copying Bank / Address
  const [copiedBank, setCopiedBank] = useState<string | null>(null)
  const [copiedAddress, setCopiedAddress] = useState(false)

  // State for Gallery Lightbox
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null)

  // State for RSVP
  const [guestName, setGuestName] = useState('')
  const [attendance, setAttendance] = useState<'hadir' | 'tidak' | 'ragu'>('hadir')
  const [guestCount, setGuestCount] = useState<number>(1)
  const [blessingMessage, setBlessingMessage] = useState('')
  const [wishes, setWishes] = useState([
    {
      name: 'Dimas & Annisa',
      attendance: 'hadir',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khoir. Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.',
      time: '1 jam yang lalu',
      likes: 8
    },
    {
      name: 'Bpk. Bambang Sujarwo',
      attendance: 'hadir',
      message: 'Selamat untuk kedua mempelai dan keluarga besar. Semoga dilancarkan semua prosesi akad dan resepsinya sampai hari H.',
      time: '3 jam yang lalu',
      likes: 12
    },
    {
      name: 'Clara & Kevin',
      attendance: 'hadir',
      message: 'Selamat menempuh babak baru penuh cinta dan kebahagiaan! Lancar dan berkah selalu.',
      time: 'Kemarin',
      likes: 5
    }
  ])

  // Personalized URL parameter ?to=
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const to = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest')
    if (to) {
      setGuestName(decodeURIComponent(to.replace(/\+/g, ' ')))
    }
  }, [])

  // Countdown timer calculation
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

  const handleCopy = (text: string, type: 'bank' | 'address', bankName = '') => {
    navigator.clipboard.writeText(text)
    if (type === 'bank') {
      setCopiedBank(bankName)
      showToast(`Nomor rekening ${bankName} berhasil disalin!`, 'success')
      setTimeout(() => setCopiedBank(null), 2500)
    } else {
      setCopiedAddress(true)
      showToast('Alamat kirim kado berhasil disalin!', 'success')
      setTimeout(() => setCopiedAddress(false), 2500)
    }
  }

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestName.trim() || !blessingMessage.trim()) return

    const newWish = {
      name: guestName.trim(),
      attendance,
      message: blessingMessage.trim(),
      time: 'Baru saja',
      likes: 1
    }

    setWishes([newWish, ...wishes])
    setBlessingMessage('')
    showToast('Terima kasih! Doa & ucapan Anda berhasil dikirimkan.', 'success')
  }

  const galleryImages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=85'
  ]

  const heroPhoto = activeTemplate.heroImage || weddingData.couple.groom.photo || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85'
  const bridePhoto = weddingData.couple.bride.photo || 'https://images.unsplash.com/photo-1693074445833-0fdce5f1f29f?auto=format&fit=crop&w=800&q=85'
  const groomPhoto = weddingData.couple.groom.photo || 'https://images.unsplash.com/photo-1766104798125-314e9659cf5a?auto=format&fit=crop&w=800&q=85'

  const akadVenue = weddingData.events.akad.venue || 'Masjid Agung Sunda Kelapa'
  const akadAddress = weddingData.events.akad.address || 'Jl. Taman Sunda Kelapa No. 16, Menteng, Jakarta Pusat 10310'

  const resepsiVenue = weddingData.events.resepsi.venue || 'Grand Ballroom Hotel Mulia Senayan'
  const resepsiAddress = weddingData.events.resepsi.address || 'Jl. Asia Afrika Senayan, Gelora, Tanah Abang, Jakarta Pusat 10270'

  const physicalGiftRecipient = `${weddingData.couple.bride.fullName} & ${weddingData.couple.groom.fullName}`
  const physicalGiftAddress = 'Jl. Taman Senayan Indah No. 18, Kebayoran Baru, Jakarta Selatan 12190'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-stone-200 font-sans selection:bg-[#D7BB83] selection:text-stone-950 overflow-x-hidden pt-12 relative">
      {/* Cover Gate Overlay */}
      <RoyalMidnightCoverScreen isOpen={isOpened} onOpenWithAudio={onOpenWithAudio} />

      {/* Starry Night Particle Ambiance */}
      <StarryAmbiance active={isOpened} />

      {/* Main Container: Desktop Dual-Column Split Screen vs Mobile Full Width */}
      <div className="w-full flex flex-col lg:flex-row min-h-screen relative z-10">
        {/* Desktop Sticky Sidebar */}
        <RoyalMidnightDesktopShowcase
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={onToggleAudio}
          activeTrack={activeTrack}
          onNextTrack={onNextTrack}
        />

        {/* Scrollable Right Column */}
        <div className="w-full lg:w-[58%] xl:w-[62%] min-h-screen relative bg-[#0A0A0A] border-l border-[#D7BB83]/20">
          {/* Subtle Background Pattern & Gradient */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D7BB83]/20 via-transparent to-transparent" />

          <main className="w-full max-w-2xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20 relative z-10">
            {/* 1. HERO SECTION */}
            <section className="text-center space-y-5 pt-4">
              <div className="flex justify-center">
                <img
                  src="https://websiteinvite.id/wp-content/uploads/2025/07/Midnight-02-Icon.png"
                  alt="Midnight Logo Icon"
                  className="w-14 h-14 object-contain filter drop-shadow-[0_2px_8px_rgba(215,187,131,0.5)]"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D7BB83]/10 border border-[#D7BB83]/30 text-[#D7BB83] text-xs uppercase tracking-[0.25em] font-serif">
                <Sparkles className="w-3.5 h-3.5 text-[#D7BB83]" />
                <span>The Wedding of</span>
              </div>

              <div className="space-y-1">
                <h1 className="font-pinyon text-5xl sm:text-6xl text-[#D7BB83] leading-tight">
                  {weddingData.couple.bride.shortName} <span className="font-serif text-3xl sm:text-4xl text-stone-300">and</span> {weddingData.couple.groom.shortName}
                </h1>
                <p className="font-serif italic text-xs sm:text-sm text-stone-300 tracking-wider">
                  {weddingData.events.akad.date}
                </p>
              </div>

              {/* Arched Hero Photo */}
              <div className="relative mx-auto max-w-sm sm:max-w-md p-1.5 rounded-t-[160px] rounded-b-3xl bg-gradient-to-b from-[#D7BB83] via-[#B99A5C] to-[#5C4324] shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                <div className="rounded-t-[154px] rounded-b-[20px] overflow-hidden bg-stone-900 relative">
                  <img
                    src={heroPhoto}
                    alt="Hero Couple"
                    className="w-full h-80 sm:h-96 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-0 right-0 text-center font-serif text-xs text-[#FFFCF3] tracking-widest uppercase">
                    {weddingData.events.akad.date}
                  </div>
                </div>
              </div>
            </section>

            {/* 2. OUR JOURNEY / AYAT SUCI */}
            <section className="p-6 sm:p-9 rounded-3xl bg-black/60 border border-[#D7BB83]/30 text-center space-y-4 shadow-xl backdrop-blur-md">
              <div className="flex justify-center">
                <img
                  src="https://websiteinvite.id/wp-content/uploads/2025/07/Midnight-02-Icon.png"
                  alt="Icon"
                  className="w-8 h-8 object-contain opacity-80"
                />
              </div>

              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D7BB83] font-serif font-bold">
                OUR JOURNEY
              </span>

              <p className="font-serif text-lg sm:text-xl text-[#FFFCF3] leading-relaxed pt-1">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>

              <p className="font-serif text-base sm:text-lg text-stone-200 leading-loose px-2" dir="rtl">
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
              </p>

              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D7BB83] to-transparent mx-auto my-3" />

              <p className="font-serif italic text-xs sm:text-sm text-stone-300 leading-relaxed max-w-lg mx-auto">
                "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri agar kamu merasa tenteram kepadanya. Dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
              </p>
              <p className="text-[11px] font-serif font-semibold text-[#D7BB83] tracking-widest uppercase">
                (QS. Ar-Rum Ayat 21)
              </p>
            </section>

            {/* 3. THE BRIDE & GROOM */}
            <section className="space-y-8 text-center">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <img
                    src="https://websiteinvite.id/wp-content/uploads/2025/07/Midnight-02-Icon.png"
                    alt="Icon"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFCF3] tracking-tight">
                  The Bride &amp; Groom
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
                  Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri acara pernikahan kami:
                </p>
              </div>

              {/* Couple Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
                {/* Mempelai Wanita (The Bride) */}
                <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-[#D7BB83]/30 shadow-xl flex flex-col items-center text-center space-y-4">
                  {/* Arched Photo */}
                  <div className="p-1 rounded-t-[100px] rounded-b-2xl bg-gradient-to-b from-[#D7BB83] to-[#5C4324] shadow-md">
                    <div className="w-40 h-52 sm:w-44 sm:h-56 rounded-t-[96px] rounded-b-[14px] overflow-hidden bg-stone-900">
                      <img
                        src={bridePhoto}
                        alt={weddingData.couple.bride.fullName}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-pinyon text-4xl sm:text-5xl text-[#D7BB83]">
                      {weddingData.couple.bride.shortName}
                    </h3>
                    <p className="font-serif text-base font-bold text-white mt-1">
                      {weddingData.couple.bride.fullName}
                    </p>
                  </div>

                  <div className="text-xs text-stone-400 space-y-0.5">
                    <p className="font-serif italic">Putri Tercinta Dari:</p>
                    <p className="font-semibold text-stone-300">
                      Bpk. {weddingData.couple.bride.fatherName} &amp; Ibu {weddingData.couple.bride.motherName}
                    </p>
                  </div>

                  <a
                    href={`https://instagram.com/${weddingData.couple.bride.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 border border-[#D7BB83]/30 text-xs text-stone-300 transition-colors"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-500" />
                    <span>@{weddingData.couple.bride.instagram}</span>
                  </a>
                </div>

                {/* Mempelai Pria (The Groom) */}
                <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-[#D7BB83]/30 shadow-xl flex flex-col items-center text-center space-y-4">
                  {/* Arched Photo */}
                  <div className="p-1 rounded-t-[100px] rounded-b-2xl bg-gradient-to-b from-[#D7BB83] to-[#5C4324] shadow-md">
                    <div className="w-40 h-52 sm:w-44 sm:h-56 rounded-t-[96px] rounded-b-[14px] overflow-hidden bg-stone-900">
                      <img
                        src={groomPhoto}
                        alt={weddingData.couple.groom.fullName}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-pinyon text-4xl sm:text-5xl text-[#D7BB83]">
                      {weddingData.couple.groom.shortName}
                    </h3>
                    <p className="font-serif text-base font-bold text-white mt-1">
                      {weddingData.couple.groom.fullName}
                    </p>
                  </div>

                  <div className="text-xs text-stone-400 space-y-0.5">
                    <p className="font-serif italic">Putra Tercinta Dari:</p>
                    <p className="font-semibold text-stone-300">
                      Bpk. {weddingData.couple.groom.fatherName} &amp; Ibu {weddingData.couple.groom.motherName}
                    </p>
                  </div>

                  <a
                    href={`https://instagram.com/${weddingData.couple.groom.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 border border-[#D7BB83]/30 text-xs text-stone-300 transition-colors"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-500" />
                    <span>@{weddingData.couple.groom.instagram}</span>
                  </a>
                </div>
              </div>
            </section>

            {/* 4. SAVE THE DATE & COUNTDOWN */}
            <section className="space-y-8 text-center">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <img
                    src="https://websiteinvite.id/wp-content/uploads/2025/07/Midnight-02-Icon.png"
                    alt="Icon"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFCF3]">
                  Save The Date
                </h2>
              </div>

              {/* 4-Box Countdown */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto">
                {[
                  { label: 'Hari', value: timeLeft.days },
                  { label: 'Jam', value: timeLeft.hours },
                  { label: 'Menit', value: timeLeft.minutes },
                  { label: 'Detik', value: timeLeft.seconds }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-2xl bg-[#141414] border border-[#D7BB83]/35 shadow-lg flex flex-col items-center"
                  >
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#D7BB83]">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] sm:text-xs font-serif uppercase tracking-wider text-stone-400 mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Schedule Event Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch pt-4">
                {/* Akad Nikah */}
                <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-[#D7BB83]/30 shadow-xl text-center space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#D7BB83]/15 border border-[#D7BB83]/30 text-[#D7BB83] font-serif text-xs font-bold uppercase tracking-wider">
                      Akad Nikah
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      {weddingData.events.akad.date}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-stone-300 text-xs font-serif">
                      <Clock className="w-3.5 h-3.5 text-[#D7BB83]" />
                      <span>{weddingData.events.akad.time}</span>
                    </div>
                    <div className="text-xs text-stone-400 leading-relaxed pt-1">
                      <p className="font-semibold text-stone-200">{akadVenue}</p>
                      <p className="text-[11px] mt-0.5">{akadAddress}</p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <a
                      href={weddingData.events.akad.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(akadVenue + ' ' + akadAddress)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#181818] hover:bg-[#222] border border-[#D7BB83]/40 text-xs font-serif text-[#D7BB83] transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                    </a>
                  </div>
                </div>

                {/* Resepsi */}
                <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-[#D7BB83]/30 shadow-xl text-center space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#D7BB83]/15 border border-[#D7BB83]/30 text-[#D7BB83] font-serif text-xs font-bold uppercase tracking-wider">
                      Resepsi Pernikahan
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      {weddingData.events.resepsi.date}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-stone-300 text-xs font-serif">
                      <Clock className="w-3.5 h-3.5 text-[#D7BB83]" />
                      <span>{weddingData.events.resepsi.time}</span>
                    </div>
                    <div className="text-xs text-stone-400 leading-relaxed pt-1">
                      <p className="font-semibold text-stone-200">{resepsiVenue}</p>
                      <p className="text-[11px] mt-0.5">{resepsiAddress}</p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <a
                      href={weddingData.events.resepsi.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(resepsiVenue + ' ' + resepsiAddress)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#181818] hover:bg-[#222] border border-[#D7BB83]/40 text-xs font-serif text-[#D7BB83] transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Romantic Quote */}
              <div className="pt-4 max-w-md mx-auto">
                <p className="font-serif italic text-sm text-[#D7BB83] leading-relaxed">
                  "Karena jika harus memilih sekali lagi, aku tetap akan memilihmu."
                </p>
              </div>
            </section>

            {/* 5. OUR GALLERY */}
            <section className="space-y-6 text-center">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <img
                    src="https://websiteinvite.id/wp-content/uploads/2025/07/Midnight-02-Icon.png"
                    alt="Icon"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFCF3]">
                  Our Gallery
                </h2>
                <p className="text-xs text-stone-400">
                  Momen-momen indah yang terekam dalam perjalanan cinta kami:
                </p>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {galleryImages.map((src, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPhotoIdx(idx)}
                    className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-stone-900 border border-[#D7BB83]/25 cursor-pointer shadow-lg"
                  >
                    <img
                      src={src}
                      alt={`Galeri ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-2.5 rounded-full bg-[#D7BB83] text-stone-950 shadow-lg">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lightbox Modal */}
              {selectedPhotoIdx !== null && (
                <div
                  onClick={() => setSelectedPhotoIdx(null)}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in"
                >
                  <button
                    onClick={() => setSelectedPhotoIdx(null)}
                    className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPhotoIdx((selectedPhotoIdx - 1 + galleryImages.length) % galleryImages.length)
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPhotoIdx((selectedPhotoIdx + 1) % galleryImages.length)
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <img
                    onClick={(e) => e.stopPropagation()}
                    src={galleryImages[selectedPhotoIdx]}
                    alt="Gallery Fullscreen"
                    className="max-h-[82vh] max-w-full rounded-2xl object-contain border border-[#D7BB83]/40 shadow-2xl"
                  />
                </div>
              )}
            </section>

            {/* 6. WEDDING GIFT / KADO ELEKTRONIK */}
            <section id="gift" className="space-y-6 text-center scroll-mt-10">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <img
                    src="https://websiteinvite.id/wp-content/uploads/2025/07/Midnight-02-Icon.png"
                    alt="Icon"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFCF3]">
                  Wedding Gift
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
                  Restu dan doa Anda merupakan hadiah yang sangat berarti bagi kami. Namun, jika pemberian tersebut merupakan ungkapan kasih sayang Anda, Anda dapat memberikannya secara elektronik:
                </p>
              </div>

              {/* Realistic ATM Card Design */}
              <div className="max-w-md mx-auto relative p-6 sm:p-7 rounded-3xl bg-gradient-to-tr from-[#141414] via-[#1F1F1F] to-[#0D0D0D] border border-[#D7BB83]/40 shadow-2xl text-left overflow-hidden">
                {/* Golden Subtle Ornaments */}
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <CreditCard className="w-28 h-28 text-[#D7BB83]" />
                </div>

                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif font-bold text-xl text-[#D7BB83] tracking-widest">
                    BNI
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
                    DEBIT CARD
                  </span>
                </div>

                {/* ATM Chip */}
                <div className="mb-4">
                  <img
                    src="https://websiteinvite.id/wp-content/uploads/2025/05/chip-atm-undangan-1.png"
                    alt="Chip ATM"
                    className="w-12 h-9 object-contain"
                  />
                </div>

                <div className="my-2 space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-sans">
                    Nomor Rekening
                  </p>
                  <p className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-[#FFFCF3]">
                    2031927105
                  </p>
                  <p className="text-xs font-serif uppercase tracking-wider text-[#D7BB83] pt-1">
                    a.n. {weddingData.couple.groom.fullName}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => handleCopy('2031927105', 'bank', 'BNI')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D7BB83]/20 hover:bg-[#D7BB83]/30 border border-[#D7BB83]/40 text-xs font-serif text-[#D7BB83] transition-colors cursor-pointer"
                  >
                    {copiedBank === 'BNI' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Nomor Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Kirim Kado Fisik Box */}
              <div className="max-w-md mx-auto p-6 rounded-3xl bg-black/60 border border-[#D7BB83]/30 shadow-xl text-left space-y-3">
                <div className="flex items-center gap-2 text-[#D7BB83]">
                  <Package className="w-5 h-5" />
                  <h3 className="font-serif font-bold text-base text-white">Kirim Kado Fisik</h3>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  Penerima: <strong>{physicalGiftRecipient}</strong>
                  <br />
                  No. Telepon: <strong>0896-1977-4116</strong>
                  <br />
                  Alamat Lengkap: {physicalGiftAddress}
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() =>
                      handleCopy(
                        `${physicalGiftRecipient} (0896-1977-4116) - ${physicalGiftAddress}`,
                        'address'
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900 hover:bg-stone-800 border border-[#D7BB83]/30 text-xs font-serif text-stone-300 transition-colors cursor-pointer"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Alamat Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Alamat Lengkap</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* 7. DOA & UCAPAN (RSVP) */}
            <section id="rsvp" className="space-y-6 text-center scroll-mt-10">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <img
                    src="https://websiteinvite.id/wp-content/uploads/2025/07/Midnight-02-Icon.png"
                    alt="Icon"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFCF3]">
                  Doa &amp; Ucapan
                </h2>
                <p className="text-xs text-stone-400">
                  Berikan ucapan harapan dan doa kepada kedua mempelai:
                </p>
              </div>

              {/* Form Container */}
              <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-[#D7BB83]/30 shadow-xl text-left space-y-4">
                <form onSubmit={handleSendWish} className="space-y-4">
                  <div>
                    <label className="block text-xs font-serif font-bold text-stone-300 mb-1">
                      Nama Lengkap Anda *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#D7BB83]/30 text-white text-xs focus:outline-none focus:border-[#D7BB83]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-bold text-stone-300 mb-1">
                      Konfirmasi Kehadiran *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'hadir', label: 'Hadir' },
                        { id: 'tidak', label: 'Tidak Hadir' },
                        { id: 'ragu', label: 'Masih Ragu' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setAttendance(item.id as any)}
                          className={`py-2 px-2 rounded-xl text-xs font-serif transition-colors cursor-pointer ${
                            attendance === item.id
                              ? 'bg-[#D7BB83] text-stone-950 font-bold'
                              : 'bg-[#141414] text-stone-400 border border-[#D7BB83]/20'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {attendance === 'hadir' && (
                    <div>
                      <label className="block text-xs font-serif font-bold text-stone-300 mb-1">
                        Jumlah Tamu Hadir
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#D7BB83]/30 text-white text-xs focus:outline-none focus:border-[#D7BB83] cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n} className="bg-stone-900 text-white">
                            {n} orang
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-serif font-bold text-stone-300 mb-1">
                      Untaian Doa &amp; Ucapan *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={blessingMessage}
                      onChange={(e) => setBlessingMessage(e.target.value)}
                      placeholder="Tuliskan ucapan dan doa tulus Anda..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#D7BB83]/30 text-white text-xs focus:outline-none focus:border-[#D7BB83] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#D7BB83] to-[#B99A5C] text-stone-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirimkan Doa &amp; Ucapan</span>
                  </button>
                </form>

                {/* Wishes Feed */}
                <div className="pt-4 border-t border-white/10 space-y-3 max-h-72 overflow-y-auto pr-1">
                  {wishes.map((w, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#141414] border border-[#D7BB83]/20 space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-[#D7BB83] font-serif">{w.name}</strong>
                        <span className="text-[10px] text-stone-400">{w.time}</span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed italic">
                        "{w.message}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 8. FOOTER CLOSING */}
            <footer className="text-center pt-8 pb-16 space-y-4 border-t border-[#D7BB83]/20">
              <p className="font-serif italic text-xs sm:text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
                Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan doa restu kepada kami.
              </p>
              <div className="space-y-1 pt-2">
                <p className="text-[11px] font-serif tracking-widest text-[#D7BB83] uppercase">
                  Kami Yang Berbahagia,
                </p>
                <h4 className="font-pinyon text-4xl sm:text-5xl text-[#D7BB83]">
                  {weddingData.couple.bride.shortName} &amp; {weddingData.couple.groom.shortName}
                </h4>
              </div>
              <p className="text-[10px] text-stone-500 pt-4">
                © 2026 JanjiSuci.id • Seluruh hak cipta dilindungi.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
