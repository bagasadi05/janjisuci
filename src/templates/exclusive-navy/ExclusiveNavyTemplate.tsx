import React, { useState, useEffect } from 'react'
import {
  Clock,
  Navigation,
  Calendar,
  CreditCard,
  Copy,
  Check,
  Send,
  Sparkles,
  Heart,
  Video,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Package,
  Music,
  Volume2,
  VolumeX,
  MapPin
} from 'lucide-react'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { ExclusiveNavyCoverScreen } from './ExclusiveNavyCoverScreen'
import { ExclusiveNavyDesktopShowcase } from './ExclusiveNavyDesktopShowcase'
import { NavyParticlesAmbiance } from './NavyParticlesAmbiance'
import { useInvitationData } from '../../context/InvitationContext'
import { useToast } from '../../components/Toast'

// Real authentic wedding photography curated collection
const WEDDING_PHOTOS = {
  cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
  bride: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=85', // Bride in wedding dress with bridal bouquet
  groom: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85', // Groom in formal wedding tuxedo & tie
  gallery: [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      caption: 'The Wedding Ceremony - Ikrar Suci di Pelaminan'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
      caption: 'Penyematan Cincin Pernikahan Sakral'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
      caption: 'Janji Setia Sehidup Semati di Hadapan Altar'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
      caption: 'Melangkah Menuju Babak Baru Penuh Kasih'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85',
      caption: 'Buket Bunga Pengantin & Cincin Emas'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85',
      caption: 'Tarian Pertama Resepsi Malam Hari'
    }
  ]
}

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export const ExclusiveNavyTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack
}) => {
  const { data: weddingData } = useInvitationData()
  const { showToast } = useToast()

  // Countdown timer state
  const targetDateStr = '2025-12-20T09:00:00+07:00'
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTime = () => {
      const diff = +new Date(targetDateStr) - +new Date()
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
  }, [targetDateStr])

  // Copy state
  const [copiedBank, setCopiedBank] = useState<string | null>(null)
  const [copiedAddress, setCopiedAddress] = useState(false)

  // Lightbox state
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null)

  // RSVP Form state
  const [guestNameInput, setGuestNameInput] = useState('')
  const [attendance, setAttendance] = useState<'hadir' | 'tidak' | 'ragu'>('hadir')
  const [guestCount, setGuestCount] = useState<number>(1)
  const [blessingMessage, setBlessingMessage] = useState('')
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'Aditya & Riska',
      attendance: 'hadir',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khoir. Selamat ya Nabilah & Yoga! Semoga langgeng dan sakinah mawaddah warahmah.',
      time: '2 jam yang lalu',
      likes: 6
    },
    {
      id: 2,
      name: 'Keluarga Bpk. H. Sudirman',
      attendance: 'hadir',
      message: 'Selamat berbahagia untuk kedua mempelai serta keluarga besar. Semoga acaranya berjalan lancar dan penuh keberkahan.',
      time: '4 jam yang lalu',
      likes: 9
    },
    {
      id: 3,
      name: 'Sahabat Teknik 2018',
      attendance: 'hadir',
      message: 'Akhirnya berlabuh ke pelaminan! Selamat menempuh hidup baru Yoga & Nabilah. Samawa selalu kawan!',
      time: 'Kemarin',
      likes: 14
    }
  ])

  // Read guest name from URL parameter (?to=...)
  const [guestName, setGuestName] = useState('Tamu Undangan')
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const to = params.get('to') || params.get('u') || params.get('guest')
    if (to) {
      setGuestName(to)
    }
  }, [])

  // Copy helper
  const handleCopy = (text: string, label: string, isAddress = false) => {
    navigator.clipboard.writeText(text).then(() => {
      if (isAddress) {
        setCopiedAddress(true)
        setTimeout(() => setCopiedAddress(false), 2500)
      } else {
        setCopiedBank(label)
        setTimeout(() => setCopiedBank(null), 2500)
      }
      showToast(`${label} berhasil disalin!`, 'success')
    })
  }

  // RSVP Submit helper
  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestNameInput.trim()) {
      showToast('Mohon masukkan nama Anda', 'info')
      return
    }
    if (!blessingMessage.trim()) {
      showToast('Mohon tulis ucapan atau doa restu', 'info')
      return
    }

    const newWish = {
      id: Date.now(),
      name: guestNameInput.trim(),
      attendance,
      message: blessingMessage.trim(),
      time: 'Baru saja',
      likes: 0
    }
    setWishes([newWish, ...wishes])
    setGuestNameInput('')
    setBlessingMessage('')
    showToast('Terima kasih atas doa restu dan konfirmasinya!', 'success')
  }

  return (
    <div className="min-h-screen bg-[#07101E] text-slate-100 flex flex-col lg:flex-row relative selection:bg-amber-400 selection:text-slate-900 font-sans">
      {/* 1. Cover Gate if not opened */}
      {!isOpened && (
        <ExclusiveNavyCoverScreen
          onOpen={onOpenWithAudio}
          guestName={guestName}
          coupleNames="Nabilah & Yoga"
          dateText="20 . 12 . 2025"
        />
      )}

      {/* Floating Particles Ambiance */}
      <NavyParticlesAmbiance />

      {/* 2. Left Column: Desktop Showcase */}
      <ExclusiveNavyDesktopShowcase
        coupleNames="Nabilah & Yoga"
        dateText="Sabtu, 20 Desember 2025"
        venueText="Grand Ballroom Margonda, Depok"
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
        activeTrack={activeTrack}
        targetDate={targetDateStr}
      />

      {/* 3. Right Column: Main Invitation Content */}
      <main className="w-full lg:w-7/12 min-h-screen pb-24 overflow-x-hidden relative z-10">
        {/* Floating Audio Toggle for Mobile / Quick Access */}
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <button
            onClick={onToggleAudio}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-transform"
            aria-label={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
          >
            {isPlayingAudio ? (
              <Music className="w-5 h-5 animate-spin" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* =========================================
            SECTION 1: HERO & OPENING
        ========================================= */}
        <section className="relative px-6 pt-16 pb-12 flex flex-col items-center text-center">
          {/* Subtle gold badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-amber-300/30 text-amber-200 text-xs font-serif uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>The Wedding of</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-normal tracking-wide drop-shadow-md">
            Nabilah &amp; Yoga
          </h1>

          <p className="text-sm font-mono tracking-widest text-blue-200/80 mt-2">
            20 . 12 . 2025
          </p>

          {/* Arch Frame Wedding Photo */}
          <div className="relative my-8">
            <div className="w-56 sm:w-64 h-80 sm:h-92 rounded-t-full rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-amber-300/40 via-amber-400/20 to-transparent shadow-2xl shadow-black/80">
              <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden relative">
                <img
                  src={WEDDING_PHOTOS.cover}
                  alt="Wedding Couple Nabilah & Yoga"
                  className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07101E]/80 via-transparent to-transparent" />
              </div>
            </div>
            {/* Outer golden ornament ring */}
            <div className="absolute -inset-2 rounded-t-full rounded-b-3xl border border-amber-400/20 pointer-events-none -z-10" />
          </div>

          <p className="max-w-md text-xs sm:text-sm text-blue-100/90 leading-relaxed font-sans px-4">
            Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.
          </p>
        </section>

        {/* =========================================
            SECTION 2: QURANIC VERSE (AR-RUM 21)
        ========================================= */}
        <section className="px-6 py-10">
          <div className="max-w-lg mx-auto rounded-2xl bg-gradient-to-b from-[#0F223A] to-[#0A182A] border border-blue-400/20 p-6 sm:p-8 text-center shadow-xl relative overflow-hidden">
            {/* Top gold sparkle icon */}
            <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4 text-amber-300">
              <Heart className="w-5 h-5 fill-amber-300/30" />
            </div>

            <p className="font-serif text-amber-200/90 text-sm tracking-widest uppercase mb-4">
              We Found Love
            </p>

            <p className="font-arabic text-xl sm:text-2xl text-amber-100/95 leading-loose mb-4 dir-rtl" dir="rtl">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
            </p>

            <blockquote className="text-xs sm:text-sm text-blue-100/80 leading-relaxed italic mb-4">
              &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.&rdquo;
            </blockquote>

            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-amber-300/90">
              Q.S Ar-Rum : 21
            </span>
          </div>
        </section>

        {/* =========================================
            SECTION 3: THE BRIDE & GROOM
        ========================================= */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto text-center space-y-12">
            <div className="space-y-1">
              <span className="text-xs font-serif tracking-widest uppercase text-amber-300/80">
                Mempelai Pengantin
              </span>
              <h2 className="text-3xl font-serif text-white">The Bride &amp; The Groom</h2>
            </div>

            {/* Mempelai Wanita (Bride) */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-44 h-56 rounded-t-full rounded-b-xl overflow-hidden p-1 bg-gradient-to-b from-amber-300/50 via-amber-400/20 to-transparent shadow-xl">
                  <img
                    src={WEDDING_PHOTOS.bride}
                    alt="Nabilah Putri Kusuma"
                    className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0B1E36] border border-amber-300/40 text-[11px] text-amber-200 font-serif">
                  The Bride
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <h3 className="text-2xl font-serif text-amber-100 font-medium">
                  Nabilah Putri Kusuma, S.Pd.
                </h3>
                <p className="text-xs text-blue-200/80">
                  Putri tercinta dari Bapak Ichsan &amp; Ibu Susilowati
                </p>
                <a
                  href="https://instagram.com/nabilah_ptr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-blue-200 hover:text-white transition-colors mt-2"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-amber-300" />
                  <span>@nabilah_ptr</span>
                </a>
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
              <span className="font-serif text-2xl text-amber-300 italic">&amp;</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            </div>

            {/* Mempelai Pria (Groom) */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-44 h-56 rounded-t-full rounded-b-xl overflow-hidden p-1 bg-gradient-to-b from-amber-300/50 via-amber-400/20 to-transparent shadow-xl">
                  <img
                    src={WEDDING_PHOTOS.groom}
                    alt="Yoga Ardiansyah"
                    className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0B1E36] border border-amber-300/40 text-[11px] text-amber-200 font-serif">
                  The Groom
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <h3 className="text-2xl font-serif text-amber-100 font-medium">
                  Yoga Ardiansyah, S.Kom.
                </h3>
                <p className="text-xs text-blue-200/80">
                  Putra tercinta dari Bapak Ichsan &amp; Ibu Susilowati
                </p>
                <a
                  href="https://instagram.com/yogaaa_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-blue-200 hover:text-white transition-colors mt-2"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-amber-300" />
                  <span>@yogaaa_</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 4: WEDDING EVENTS
        ========================================= */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center space-y-1">
              <span className="text-xs font-serif tracking-widest uppercase text-amber-300/80">
                Waktu &amp; Tempat
              </span>
              <h2 className="text-3xl font-serif text-white">Wedding Event</h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Event 1: Akad Nikah */}
              <div className="rounded-2xl bg-gradient-to-b from-[#0F243E] to-[#0A182A] border border-blue-400/20 p-6 sm:p-7 shadow-xl space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-blue-400/15 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-amber-100 font-semibold">
                        Akad Nikah
                      </h3>
                      <p className="text-[11px] text-blue-200/70 font-mono">Prosesi Ijab Kabul</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 font-medium border border-amber-400/20">
                    Khidmat
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-blue-100/90 font-sans">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Sabtu, 20 Desember 2025</p>
                      <p className="text-blue-200/70 text-xs">Pukul 09.00 WIB – Selesai</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Masjid Al-Barkah Margonda</p>
                      <p className="text-blue-200/70 text-xs leading-relaxed">
                        Jl. Margonda Raya No. 230A, Kemiri Muka, Kec. Beji, Kota Depok, Jawa Barat 16423
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <a
                    href="https://maps.google.com/?q=Jl.+Margonda+Raya+No.230A+Kemiri+Muka+Beji+Kota+Depok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/30 text-xs text-white font-medium transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-300" />
                    <span>Klik Maps</span>
                  </a>
                  <a
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Nabilah+%26+Yoga&dates=20251220T020000Z/20251220T040000Z&details=Pernikahan+Nabilah+Putri+Kusuma+%26+Yoga+Ardiansyah&location=Jl.+Margonda+Raya+No.230A+Depok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-blue-200 hover:text-white transition-all"
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    <span>Simpan Kalender</span>
                  </a>
                </div>
              </div>

              {/* Event 2: Resepsi Pernikahan */}
              <div className="rounded-2xl bg-gradient-to-b from-[#0F243E] to-[#0A182A] border border-blue-400/20 p-6 sm:p-7 shadow-xl space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-blue-400/15 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-amber-100 font-semibold">
                        Resepsi Pernikahan
                      </h3>
                      <p className="text-[11px] text-blue-200/70 font-mono">Perayaan &amp; Ramah Tamah</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-blue-500/15 text-blue-200 font-medium border border-blue-400/20">
                    Resepsi
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-blue-100/90 font-sans">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Sabtu, 20 Desember 2025</p>
                      <p className="text-blue-200/70 text-xs">Pukul 11.00 – 14.00 WIB</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Grand Ballroom Margonda</p>
                      <p className="text-blue-200/70 text-xs leading-relaxed">
                        Jl. Margonda Raya No. 230A, Kemiri Muka, Kec. Beji, Kota Depok, Jawa Barat 16423
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <a
                    href="https://maps.google.com/?q=Jl.+Margonda+Raya+No.230A+Kemiri+Muka+Beji+Kota+Depok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/30 text-xs text-white font-medium transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-300" />
                    <span>Klik Maps &amp; Panduan Rute</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 5: COUNTDOWN TIMER
        ========================================= */}
        <section className="px-6 py-10">
          <div className="max-w-lg mx-auto text-center space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-serif tracking-widest uppercase text-amber-300/80">
                Hitung Mundur Acara
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white">Event Countdown</h2>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              <div className="bg-[#0B1E36]/90 border border-blue-400/25 rounded-xl p-3 sm:p-4 shadow-lg backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">{timeLeft.days}</div>
                <div className="text-[11px] text-blue-200/70 font-sans uppercase mt-1">Hari</div>
              </div>
              <div className="bg-[#0B1E36]/90 border border-blue-400/25 rounded-xl p-3 sm:p-4 shadow-lg backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">{timeLeft.hours}</div>
                <div className="text-[11px] text-blue-200/70 font-sans uppercase mt-1">Jam</div>
              </div>
              <div className="bg-[#0B1E36]/90 border border-blue-400/25 rounded-xl p-3 sm:p-4 shadow-lg backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">{timeLeft.minutes}</div>
                <div className="text-[11px] text-blue-200/70 font-sans uppercase mt-1">Menit</div>
              </div>
              <div className="bg-[#0B1E36]/90 border border-blue-400/25 rounded-xl p-3 sm:p-4 shadow-lg backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">{timeLeft.seconds}</div>
                <div className="text-[11px] text-blue-200/70 font-sans uppercase mt-1">Detik</div>
              </div>
            </div>

            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Nabilah+%26+Yoga&dates=20251220T020000Z/20251220T070000Z&details=Akad+dan+Resepsi+Pernikahan+Nabilah+Putri+Kusuma+%26+Yoga+Ardiansyah&location=Jl.+Margonda+Raya+No.230A+Depok"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-amber-300/30 text-xs text-amber-200 hover:text-white transition-all shadow-md"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Save to Google Calendar</span>
            </a>
          </div>
        </section>

        {/* =========================================
            SECTION 6: LOVE STORY TIMELINE
        ========================================= */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center space-y-1">
              <span className="text-xs font-serif tracking-widest uppercase text-amber-300/80">
                Kisah Indah Kami
              </span>
              <h2 className="text-3xl font-serif text-white">Love Story</h2>
            </div>

            <div className="space-y-6 relative border-l-2 border-blue-400/20 ml-4 sm:ml-6 pl-6 sm:pl-8">
              {[
                {
                  year: '2020',
                  title: 'Awal Pertemuan',
                  desc: 'Berawal dari kegiatan seminar organisasi kampus di Margonda Depok, perbincangan hangat membuka takdir pertemuan dua hati.'
                },
                {
                  year: '2022',
                  title: 'Menjalin Hubungan',
                  desc: 'Dua tahun saling mengenal kebiasaan dan menyelaraskan pandangan hidup, kami memutuskan untuk berkomitmen melangkah bersama.'
                },
                {
                  year: '2024',
                  title: 'Momen Lamaran',
                  desc: 'Di hadapan kedua orang tua dan keluarga besar yang kami cintai, cincin pertunangan disematkan sebagai ikrar keseriusan kami.'
                },
                {
                  year: '2025',
                  title: 'Menuju Pelaminan',
                  desc: 'Dengan memohon ridho dan keberkahan dari Allah SWT, kami mengikat janji suci pernikahan untuk bersama hingga jannah-Nya.'
                }
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-amber-400 border-4 border-[#07101E] group-hover:scale-125 transition-transform" />

                  <div className="rounded-xl bg-[#0F223A]/80 border border-blue-400/20 p-4 shadow-md backdrop-blur-sm">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-amber-400/15 text-amber-300 text-[11px] font-mono font-semibold mb-1 border border-amber-400/30">
                      {item.year}
                    </span>
                    <h3 className="text-base font-serif text-white font-semibold">{item.title}</h3>
                    <p className="text-xs text-blue-100/80 mt-1 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 7: OUR MOMENTS GALLERY & LIGHTBOX
        ========================================= */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-serif tracking-widest uppercase text-amber-300/80">
                Dokumentasi Indah
              </span>
              <h2 className="text-3xl font-serif text-white">Our Moments Gallery</h2>
              <p className="text-xs text-blue-200/70">
                Klik salah satu foto untuk memperbesar tampilan
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {WEDDING_PHOTOS.gallery.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIdx(idx)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer shadow-lg border border-blue-400/20 ${
                    idx === 0 || idx === 3 ? 'row-span-2 h-72 sm:h-80' : 'h-36 sm:h-40'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07101E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-[11px] text-amber-200 font-serif line-clamp-1">
                      {photo.caption}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 8: LIVE STREAMING
        ========================================= */}
        <section className="px-6 py-8">
          <div className="max-w-lg mx-auto rounded-2xl bg-gradient-to-r from-[#0F223A] via-[#162D4A] to-[#0F223A] border border-blue-400/25 p-6 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
              <Video className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[11px] font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                <span>Live Streaming</span>
              </div>
              <h3 className="text-xl font-serif text-white font-semibold">Siaran Langsung Acara</h3>
              <p className="text-xs text-blue-100/80 max-w-sm mx-auto leading-relaxed">
                Bagi Bapak/Ibu/Saudara/i yang berhalangan hadir langsung di lokasi, prosesi sakral ini dapat disaksikan secara virtual melalui siaran langsung Instagram.
              </p>
            </div>

            <a
              href="https://instagram.com/nabilah_ptr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-medium text-xs shadow-lg hover:brightness-110 transition-all"
            >
              <InstagramIcon className="w-4 h-4 text-white" />
              <span>Buka Instagram Live</span>
            </a>
          </div>
        </section>

        {/* =========================================
            SECTION 9: WEDDING GIFT (CASHLESS & FISIK)
        ========================================= */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center space-y-1">
              <span className="text-xs font-serif tracking-widest uppercase text-amber-300/80">
                Tanda Kasih
              </span>
              <h2 className="text-3xl font-serif text-white">Wedding Gift</h2>
              <p className="text-xs text-blue-200/80 max-w-md mx-auto leading-relaxed pt-1">
                Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
              </p>
            </div>

            {/* Bank Transfer Cards */}
            <div className="space-y-4">
              {/* BCA */}
              <div className="rounded-2xl bg-gradient-to-tr from-[#0F243E] to-[#122A48] border border-blue-400/20 p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="px-3 py-1 rounded-md bg-blue-600/40 border border-blue-400/30 text-white font-bold text-xs tracking-wider">
                    BANK BCA
                  </div>
                  <CreditCard className="w-5 h-5 text-amber-300/80" />
                </div>
                <p className="text-[11px] text-blue-200/70 font-mono uppercase">Nomor Rekening</p>
                <p className="text-lg sm:text-xl font-mono font-bold text-amber-200 tracking-wider">
                  8961977411
                </p>
                <p className="text-xs text-blue-100/80 mt-0.5">a.n. Nabilah Putri Kusuma</p>
                <button
                  onClick={() => handleCopy('8961977411', 'Rekening BCA')}
                  className="mt-3 w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedBank === 'Rekening BCA' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-300" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mandiri */}
              <div className="rounded-2xl bg-gradient-to-tr from-[#0F243E] to-[#122A48] border border-blue-400/20 p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="px-3 py-1 rounded-md bg-amber-600/40 border border-amber-400/30 text-amber-100 font-bold text-xs tracking-wider">
                    BANK MANDIRI
                  </div>
                  <CreditCard className="w-5 h-5 text-amber-300/80" />
                </div>
                <p className="text-[11px] text-blue-200/70 font-mono uppercase">Nomor Rekening</p>
                <p className="text-lg sm:text-xl font-mono font-bold text-amber-200 tracking-wider">
                  1570008961977
                </p>
                <p className="text-xs text-blue-100/80 mt-0.5">a.n. Yoga Ardiansyah</p>
                <button
                  onClick={() => handleCopy('1570008961977', 'Rekening Mandiri')}
                  className="mt-3 w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedBank === 'Rekening Mandiri' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-300" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>
              </div>

              {/* DANA E-Wallet */}
              <div className="rounded-2xl bg-gradient-to-tr from-[#0F243E] to-[#122A48] border border-blue-400/20 p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="px-3 py-1 rounded-md bg-sky-600/40 border border-sky-400/30 text-white font-bold text-xs tracking-wider">
                    DANA / E-WALLET
                  </div>
                  <CreditCard className="w-5 h-5 text-amber-300/80" />
                </div>
                <p className="text-[11px] text-blue-200/70 font-mono uppercase">Nomor Akun DANA</p>
                <p className="text-lg sm:text-xl font-mono font-bold text-amber-200 tracking-wider">
                  0896 1977 4116
                </p>
                <p className="text-xs text-blue-100/80 mt-0.5">a.n. Nabilah Putri Kusuma</p>
                <button
                  onClick={() => handleCopy('089619774116', 'Nomor DANA')}
                  className="mt-3 w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedBank === 'Nomor DANA' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-300" />
                      <span>Salin Nomor E-Wallet</span>
                    </>
                  )}
                </button>
              </div>

              {/* Kirim Hadiah Fisik */}
              <div className="rounded-2xl bg-gradient-to-b from-[#0F223A] to-[#0A182A] border border-blue-400/20 p-5 shadow-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-amber-300" />
                  <h4 className="text-base font-serif text-white font-semibold">Kirim Kado Fisik</h4>
                </div>
                <div className="text-xs text-blue-100/80 space-y-1">
                  <p className="font-semibold text-white">Penerima: Nabilah &amp; Yoga (0896-1977-4116)</p>
                  <p className="leading-relaxed">
                    Jl. Margonda Raya No. 230A Kemiri Muka, Kecamatan Beji, Kota Depok, Jawa Barat 16423
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    onClick={() =>
                      handleCopy(
                        'Jl. Margonda Raya No. 230A Kemiri Muka, Kecamatan Beji, Kota Depok, Jawa Barat 16423 (Penerima: Nabilah & Yoga - 089619774116)',
                        'Alamat Pengiriman',
                        true
                      )
                    }
                    className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Alamat Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-300" />
                        <span>Salin Alamat Lengkap</span>
                      </>
                    )}
                  </button>
                  <a
                    href="https://wa.me/6289619774116?text=Halo%20Nabilah%20%26%20Yoga,%20saya%20sudah%20mengirimkan%20kado%20pernikahan%20untuk%20kalian"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/30 text-xs text-white font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Konfirmasi via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 10: RSVP & DO'A UCAPAN (BUKU TAMU)
        ========================================= */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-serif tracking-widest uppercase text-amber-300/80">
                Konfirmasi &amp; Harapan
              </span>
              <h2 className="text-3xl font-serif text-white">RSVP &amp; Doa Restu</h2>
              <p className="text-xs text-blue-200/70">
                Berikan konfirmasi kehadiran serta untaian doa hangat Anda
              </p>
            </div>

            {/* Quick stats indicator */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-[#0F223A]/80 border border-blue-400/20 p-2.5">
                <div className="text-lg font-bold font-serif text-emerald-400">
                  {wishes.filter((w) => w.attendance === 'hadir').length + 15}
                </div>
                <div className="text-[10px] text-blue-200/70 uppercase">Akan Hadir</div>
              </div>
              <div className="rounded-xl bg-[#0F223A]/80 border border-blue-400/20 p-2.5">
                <div className="text-lg font-bold font-serif text-rose-400">
                  {wishes.filter((w) => w.attendance === 'tidak').length + 2}
                </div>
                <div className="text-[10px] text-blue-200/70 uppercase">Berhalangan</div>
              </div>
              <div className="rounded-xl bg-[#0F223A]/80 border border-blue-400/20 p-2.5">
                <div className="text-lg font-bold font-serif text-amber-300">
                  {wishes.filter((w) => w.attendance === 'ragu').length + 4}
                </div>
                <div className="text-[10px] text-blue-200/70 uppercase">Masih Ragu</div>
              </div>
            </div>

            {/* RSVP Form */}
            <form
              onSubmit={handleSubmitRsvp}
              className="rounded-2xl bg-gradient-to-b from-[#0F223A] to-[#0A182A] border border-blue-400/20 p-5 sm:p-6 shadow-xl space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-blue-200/80 mb-1">
                  Nama Anda
                </label>
                <input
                  type="text"
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Contoh: Dimas &amp; Istri"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-amber-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-blue-200/80 mb-1">
                    Konfirmasi Kehadiran
                  </label>
                  <select
                    value={attendance}
                    onChange={(e) =>
                      setAttendance(e.target.value as 'hadir' | 'tidak' | 'ragu')
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0F223A] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-300"
                  >
                    <option value="hadir">Ya, Saya Akan Hadir</option>
                    <option value="ragu">Masih Ragu / Belum Pasti</option>
                    <option value="tidak">Maaf, Berhalangan Hadir</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-blue-200/80 mb-1">
                    Jumlah Tamu
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0F223A] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-300"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                    <option value={5}>5 Orang</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-blue-200/80 mb-1">
                  Ucapan &amp; Doa Restu
                </label>
                <textarea
                  rows={3}
                  value={blessingMessage}
                  onChange={(e) => setBlessingMessage(e.target.value)}
                  placeholder="Tuliskan ucapan selamat atau doa restu untuk kedua mempelai..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-amber-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 hover:brightness-105 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5 text-slate-900" />
                <span>Kirim Ucapan &amp; Konfirmasi</span>
              </button>
            </form>

            {/* Wishes Feed */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase tracking-wider text-blue-200/70 font-mono font-medium">
                Untaian Doa ({wishes.length})
              </h4>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {wishes.map((w) => (
                  <div
                    key={w.id}
                    className="rounded-xl bg-[#0F223A]/70 border border-blue-400/15 p-4 shadow-sm space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-white">{w.name}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                            w.attendance === 'hadir'
                              ? 'bg-emerald-500/15 text-emerald-300'
                              : w.attendance === 'ragu'
                              ? 'bg-amber-500/15 text-amber-300'
                              : 'bg-rose-500/15 text-rose-300'
                          }`}
                        >
                          {w.attendance === 'hadir'
                            ? 'Hadir'
                            : w.attendance === 'ragu'
                            ? 'Ragu'
                            : 'Absen'}
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-200/50 font-sans">{w.time}</span>
                    </div>
                    <p className="text-xs text-blue-100/90 leading-relaxed font-sans">{w.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 11: CLOSING & FOOTER
        ========================================= */}
        <footer className="px-6 pt-12 pb-16 text-center space-y-6">
          <div className="max-w-md mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300">
              Nabilah &amp; Yoga
            </h3>
            <p className="text-xs font-mono tracking-widest text-blue-200/70">20 . 12 . 2025</p>

            <p className="text-xs text-blue-100/80 leading-relaxed font-sans">
              Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i sekalian, kami mengucapkan terima kasih yang tulus dari lubuk hati kami yang terdalam.
            </p>

            <p className="text-xs text-amber-200/90 italic font-serif">
              Kami yang berbahagia: Nabilah &amp; Yoga beserta kedua keluarga besar.
            </p>
          </div>

          <div className="pt-6 border-t border-blue-400/15 text-[11px] text-blue-200/50 space-y-1">
            <p>Digital Invitation by JanjiSuci.id</p>
            <p className="font-mono text-[10px]">Exclusive Royal Navy Collection</p>
          </div>
        </footer>
      </main>

      {/* =========================================
          LIGHTBOX MODAL FOR GALLERY
      ========================================= */}
      {selectedPhotoIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhotoIdx(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={() =>
              setSelectedPhotoIdx(
                (selectedPhotoIdx - 1 + WEDDING_PHOTOS.gallery.length) %
                  WEDDING_PHOTOS.gallery.length
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() =>
              setSelectedPhotoIdx((selectedPhotoIdx + 1) % WEDDING_PHOTOS.gallery.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-3xl max-h-[85vh] flex flex-col items-center">
            <img
              src={WEDDING_PHOTOS.gallery[selectedPhotoIdx].src}
              alt={WEDDING_PHOTOS.gallery[selectedPhotoIdx].caption}
              className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <p className="text-sm font-serif text-amber-200 mt-3 text-center px-4">
              {WEDDING_PHOTOS.gallery[selectedPhotoIdx].caption}
            </p>
            <p className="text-[11px] font-mono text-blue-200/60 mt-0.5">
              {selectedPhotoIdx + 1} / {WEDDING_PHOTOS.gallery.length}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
