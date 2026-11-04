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
  X,
  ZoomIn,
  Package,
  Music,
  Volume2,
  VolumeX,
  MapPin,
  Video,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  QrCode
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { EmeraldBotanicalCoverScreen } from './EmeraldBotanicalCoverScreen'
import { EmeraldBotanicalDesktopShowcase } from './EmeraldBotanicalDesktopShowcase'
import { useInvitationData } from '../../context/InvitationContext'
import { useToast } from '../../components/Toast'

const AQIQAH_GALLERY_PHOTOS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1656633702381-939966720da4?auto=format&fit=crop&w=1200&q=85',
    title: 'Amanah Terindah',
    caption: 'Malaikat kecil penyejuk pandangan mata Ayah & Bunda, penuh berkah dan karunia Ilahi.'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1641222113497-f1904803f654?auto=format&fit=crop&w=1200&q=85',
    title: 'Ketenangan Jiwa',
    caption: 'Lelap dalam dekapan doa para malaikat, tumbuh sehat dalam naungan kasih sayang.'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=85',
    title: 'Sentuhan Lembut',
    caption: 'Kehangatan belaian suci keluarga menyambut kehadiran buah hati pertama tercinta.'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1200&q=85',
    title: 'Cahaya Masa Depan',
    caption: 'Langkah awal meniti jalan keshalihan, meneladani akhlak mulia Rasulullah SAW.'
  }
]

export const EmeraldBotanicalTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack
}) => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const { showToast } = useToast()

  // Dynamic baby and event data
  const babyName =
    weddingData.couple.groom.fullName ||
    activeTemplate.sampleCouple?.groomFull ||
    'Muhammad Rayyan Al-Ghifari'
  const babyShort =
    weddingData.couple.groom.shortName ||
    activeTemplate.sampleCouple?.groomShort ||
    'Rayyan'
  const babyArabicName = 'مُحَمَّد رَيَّان الْغِفَارِي'
  const parentsName =
    weddingData.couple.groom.fatherName && weddingData.couple.groom.motherName
      ? `Bpk. ${weddingData.couple.groom.fatherName} & Ibu ${weddingData.couple.groom.motherName}`
      : activeTemplate.eventMeta?.parentsOrHost || 'Bpk. M. Ilham Pratama & Ibu Nurul Fadhilah'

  const dateText = weddingData.events.akad.date || 'Ahad, 25 Juli 2027'
  const timeText = weddingData.events.akad.time || '09.00 - 13.00 WIB'
  const venueText = weddingData.events.akad.venue || 'Kediaman Keluarga Pratama'
  const addressText =
    weddingData.events.akad.address ||
    'Jl. Taman Emerald Botanical No. 7, Kebayoran Baru, Jakarta Selatan'
  const mapsUrl =
    weddingData.events.akad.mapsUrl ||
    `https://maps.google.com/?q=${encodeURIComponent(addressText || venueText)}`
  const hijriDate = '14 Muharram 1449 H'
  const targetDateStr = weddingData.countdownDate || '2027-07-25T09:00:00+07:00'

  // Live countdown state
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

  // Interactive tab and copy states
  const [activeGiftTab, setActiveGiftTab] = useState<'syariah' | 'kado'>('syariah')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null)
  const [showStreamingModal, setShowStreamingModal] = useState(false)
  const [showQrisModal, setShowQrisModal] = useState(false)

  // Dismiss modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhotoIdx(null)
        setShowStreamingModal(false)
        setShowQrisModal(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // RSVP Form state
  const [guestNameInput, setGuestNameInput] = useState('')
  const [attendance, setAttendance] = useState<'hadir' | 'virtual' | 'tidak'>('hadir')
  const [paxCount, setPaxCount] = useState('2 Orang')
  const [blessingMessage, setBlessingMessage] = useState('')

  // Real guestbook wishes state
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'Ustadz H. Abdullah Faqih & Keluarga',
      attendance: 'hadir',
      pax: '2 Orang',
      message:
        'Barakallahu laka fil mauhubi laka wa syakarta al-wahiba wa balagha asyuddahu wa ruziqa birrahu. Semoga ananda Rayyan menjadi anak yang sholeh, berakhlak mulia, hafidz Al-Qur\'an, dan membawa barakah bagi keluarga.',
      time: '30 menit yang lalu'
    },
    {
      id: 2,
      name: 'Keluarga Besar Bpk. Hendra Wijaya',
      attendance: 'hadir',
      pax: 'Keluarga (4 Orang)',
      message:
        'Alhamdulillah selamat atas tasyakuran aqiqah dan tasmiyah ananda Muhammad Rayyan. Semoga kelak menjadi pemimpin yang amanah dan membanggakan orang tua serta umat.',
      time: '2 jam yang lalu'
    },
    {
      id: 3,
      name: 'dr. Farhan & dr. Sarah (Kerabat Surabaya)',
      attendance: 'virtual',
      pax: 'Virtual Streaming',
      message:
        'Masya Allah tabarakallah! Ikut berbahagia dari kejauhan. Insya Allah kami akan bergabung mendoakan bersama lewat YouTube Live Streaming. Sehat dan sholeh selalu untuk baby Rayyan!',
      time: '5 jam yang lalu'
    }
  ])

  // Personalized guest greeting from URL
  const [guestName, setGuestName] = useState('Tamu Undangan')
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const to = params.get('to') || params.get('u') || params.get('guest')
    if (to && to.trim()) {
      try {
        setGuestName(decodeURIComponent(to.replace(/\+/g, ' ')))
      } catch {
        setGuestName(to.trim())
      }
    }
  }, [])

  const handleCopy = (text: string, label: string) => {
    if (!navigator.clipboard) {
      showToast(`Fitur salin tidak didukung pada peramban ini`, 'info')
      return
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedKey(label)
        setTimeout(() => setCopiedKey(null), 2500)
        showToast(`${label} berhasil disalin ke clipboard!`, 'success')
      })
      .catch(() => {
        showToast(`Gagal menyalin ${label}`, 'info')
      })
  }

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestNameInput.trim()) {
      showToast('Mohon masukkan nama Anda', 'info')
      return
    }
    if (!blessingMessage.trim()) {
      showToast('Mohon tulis untaian doa berkah untuk ananda', 'info')
      return
    }

    const newWish = {
      id: Date.now(),
      name: guestNameInput.trim(),
      attendance,
      pax: attendance === 'virtual' ? 'Virtual Streaming' : paxCount,
      message: blessingMessage.trim(),
      time: 'Baru saja'
    }

    setWishes([newWish, ...wishes])
    setGuestNameInput('')
    setBlessingMessage('')
    showToast('Alhamdulillah, doa dan konfirmasi kehadiran Anda telah tersimpan!', 'success')

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#D4AF37', '#10B981', '#FEF3C7', '#FFFFFF']
      })
    } catch {
      // ignore
    }
  }

  const handleSaveToCalendar = () => {
    const title = encodeURIComponent(`Walimatul Aqiqah & Tasmiyah ${babyName}`)
    const details = encodeURIComponent(
      `Tasyakuran Aqiqah & Tasmiyah Ananda ${babyName}\nPutra tercinta ${parentsName}\nLokasi: ${venueText}\nAlamat: ${addressText}`
    )
    const location = encodeURIComponent(`${venueText}, ${addressText}`)
    // Format: 20270725T020000Z to 20270725T060000Z (09.00 - 13.00 WIB = 02.00 - 06.00 UTC)
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270725T020000Z/20270725T060000Z&details=${details}&location=${location}`
    window.open(googleCalendarUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#062D23] text-[#F0FDF4] selection:bg-amber-400 selection:text-emerald-950 font-sans">
      {/* 1. COVER GATE OPENING */}
      <EmeraldBotanicalCoverScreen
        isOpen={isOpened}
        onOpenWithAudio={onOpenWithAudio}
        guestName={guestName}
        babyName={babyName}
        babyArabicName={babyArabicName}
        dateText={dateText}
        hijriDate={hijriDate}
      />

      {/* 2. DUAL-COLUMN DESKTOP + MOBILE RESPONSIVE SHELL */}
      <div className="flex flex-col lg:flex-row relative">
        {/* Sticky Desktop Showcase Column */}
        <EmeraldBotanicalDesktopShowcase
          babyName={babyName}
          babyArabicName={babyArabicName}
          parentsName={parentsName}
          dateText={dateText}
          hijriDate={hijriDate}
          venueText={venueText}
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={onToggleAudio}
          activeTrack={activeTrack}
          targetDate={targetDateStr}
          onOpenStreaming={() => setShowStreamingModal(true)}
        />

        {/* Main Content Column (Mobile 100% / Desktop 7/12) */}
        <main className="w-full lg:w-7/12 min-h-screen relative overflow-x-hidden bg-[#062D23]">
          {/* Subtle Islamic arabesque geometric watermark pattern */}
          <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* Ambient background glow accents */}
          <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-emerald-600/10 blur-[130px] pointer-events-none" />
          <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />

          <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16 relative z-10">
            {/* ============================================================ */}
            {/* HERO / ROYAL ARCHED PORTAL SECTION                           */}
            {/* ============================================================ */}
            <section className="text-center space-y-4 pt-4 sm:pt-6">
              {/* Top Celebration Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#083B2E]/90 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-serif uppercase tracking-[0.2em] shadow-lg">
                <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true" />
                <span>Walimatul Aqiqah & Tasmiyah 🌿</span>
              </div>

              {/* Bismillah Calligraphy */}
              <div className="pt-2">
                <p className="font-serif text-xl sm:text-2xl text-amber-200 tracking-wider" dir="rtl">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-xs text-emerald-200/70 italic mt-1 font-sans">
                  Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang
                </p>
              </div>

              {/* Baby Portrait Encased in Scalloped Moroccan Arch */}
              <div className="relative my-6 flex justify-center">
                <div className="relative w-44 h-58 sm:w-52 sm:h-68 rounded-t-[100px] rounded-b-3xl p-1.5 bg-gradient-to-b from-amber-400/70 via-emerald-500/30 to-amber-300/40 shadow-2xl shadow-black/80">
                  <div className="w-full h-full rounded-t-[94px] rounded-b-2xl overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1656633702381-939966720da4?auto=format&fit=crop&w=1000&q=85"
                      alt={babyName}
                      className="w-full h-full object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#062D23]/80 via-transparent to-transparent" />
                  </div>
                </div>
                {/* Glowing Outer Arch Ring */}
                <div className="absolute -inset-2.5 rounded-t-[112px] rounded-b-4xl border border-amber-400/30 pointer-events-none" />
                
                {/* Decorative Andalusian Corner Motifs */}
                <div className="absolute -top-3 left-1/4 text-amber-300/40 text-lg select-none">✧</div>
                <div className="absolute -top-3 right-1/4 text-amber-300/40 text-lg select-none">✧</div>
              </div>

              {/* Baby Naming Titles */}
              <div className="space-y-2">
                <p className="font-serif text-xl sm:text-2xl text-amber-200 font-medium tracking-wide" dir="rtl">
                  {babyArabicName}
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-bold tracking-wide">
                  {babyName}
                </h1>
                <p className="text-xs sm:text-sm text-emerald-200/90 font-sans max-w-md mx-auto leading-relaxed">
                  Putra tercinta dari <span className="font-semibold text-amber-200">{parentsName}</span>
                </p>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#04241C] border border-emerald-400/30 text-xs font-mono text-emerald-300">
                  <Calendar className="w-3.5 h-3.5 text-amber-300" />
                  <span>{dateText} • {hijriDate}</span>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SACRED VERSES & PARENTAL DOA SECTION                         */}
            {/* ============================================================ */}
            <section className="space-y-4">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#083B2E]/90 border border-amber-400/35 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                {/* Corner golden ornaments */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-400/60 rounded-tl pointer-events-none" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-400/60 rounded-tr pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-400/60 rounded-bl pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-400/60 rounded-br pointer-events-none" />

                <div className="text-center space-y-6">
                  {/* Verse 1: Surah An-Nahl (16:78) */}
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#031C15] border border-amber-400/30 text-amber-300 text-[11px] font-serif uppercase tracking-wider">
                      <BookOpen className="w-3 h-3 text-amber-300" />
                      <span>QS. An-Nahl : 78</span>
                    </div>
                    <p className="font-serif text-lg sm:text-xl text-amber-100 leading-loose text-center" dir="rtl">
                      وَاللَّهُ أَخْرَجَكُم مِّن بُطُونِ أُمَّهَاتِكُمْ لَا تَعْلَمُونَ شَيْئًا وَجَعَلَ لَكُمُ السَّمْعَ وَالْأَبْصَارَ وَالْأَفْئِدَةَ ۙ لَعَلَّكُمْ تَشْكُرُونَ
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-100/80 italic font-sans leading-relaxed">
                      &ldquo;Dan Allah mengeluarkan kamu dari perut ibumu dalam keadaan tidak mengetahui sesuatu pun, dan Dia memberimu pendengaran, penglihatan, dan hati nurani, agar kamu bersyukur.&rdquo;
                    </p>
                  </div>

                  <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto" />

                  {/* Verse 2: Surah Luqman (31:14) */}
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#031C15] border border-amber-400/30 text-amber-300 text-[11px] font-serif uppercase tracking-wider">
                      <BookOpen className="w-3 h-3 text-amber-300" />
                      <span>QS. Luqman : 14</span>
                    </div>
                    <p className="font-serif text-base sm:text-lg text-amber-100/95 leading-loose text-center" dir="rtl">
                      وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ حَمَلَتْهُ أُمُّهُ وَهْنًا عَلَىٰ وَهْنٍ وَفِصَالُهُ فِي عَامَيْنِ أَنِ اشْكُرْ لِي وَلِوَالِدَيْكَ إِلَيَّ الْمَصِيرُ
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-100/80 italic font-sans leading-relaxed">
                      &ldquo;Dan Kami perintahkan kepada manusia (agar berbuat baik) kepada kedua orang tuanya. Ibunya telah mengandungnya dalam keadaan lemah yang bertambah-tambah, dan menyapihnya dalam dua tahun. Bersyukurlah kepada-Ku dan kepada kedua orang tuamu. Hanya kepada-Ku tempat kembalimu.&rdquo;
                    </p>
                  </div>

                  <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto" />

                  {/* Parental Doa */}
                  <div className="p-4 rounded-2xl bg-[#04251D]/90 border border-emerald-400/20 text-center space-y-2">
                    <p className="text-xs uppercase tracking-widest text-amber-300 font-serif font-semibold">
                      Untaian Doa Orang Tua
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans">
                      &ldquo;Ya Allah, jadikanlah ananda <span className="text-amber-200 font-semibold">{babyName}</span> sebagai anak yang sholeh, berbakti kepada kedua orang tua, berakhlak mulia, cerdas, berilmu manfaat, dan senantiasa mencintai Al-Qur&apos;an dan Sunnah. Jadikanlah ia penyejuk hati keluarga di dunia dan pembuka pintu ridho-Mu di akhirat kelak. Aamiin ya Rabbal &apos;Alamin.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* ILLUMINATED BABY BIRTH STATISTICS PLAQUE                     */}
            {/* ============================================================ */}
            <section className="space-y-4">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#083B2E] border border-amber-400/30 text-amber-300 text-xs font-serif uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>Sertifikat Tasmiyah & Kelahiran</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-amber-100 font-bold tracking-wide">
                  Biodata & Makna Nama Ananda
                </h2>
                <p className="text-xs text-emerald-200/70 font-sans">
                  Tanda syukur atas kelahiran buah hati tercinta ke dunia yang fana ini
                </p>
              </div>

              {/* Desert Ivory Linen Royal Card */}
              <div className="bg-[#FDFBF7] text-[#1C1917] rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-2xl relative overflow-hidden">
                {/* Corner flourishes */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-600/60 rounded-tl pointer-events-none" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-600/60 rounded-tr pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-600/60 rounded-bl pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-600/60 rounded-br pointer-events-none" />

                {/* Plaque Header */}
                <div className="text-center border-b border-amber-200/80 pb-4 mb-6">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 font-bold block">
                    SURAT KETERANGAN KELAHIRAN & TASMIYAH
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-950 mt-1">
                    {babyName}
                  </h3>
                  <p className="font-serif text-sm sm:text-base text-amber-800 font-medium" dir="rtl">
                    {babyArabicName}
                  </p>
                </div>

                {/* 4-Stat Grid: Date, Time, Weight, Height */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-center">
                    <span className="text-[10px] uppercase font-mono text-amber-800 font-semibold block">
                      Hari & Tanggal
                    </span>
                    <span className="font-serif text-sm sm:text-base font-bold text-stone-900 block mt-0.5">
                      Ahad, 18 Juli 2027
                    </span>
                    <span className="text-[9px] text-stone-500 block">7 Muharram 1449 H</span>
                  </div>

                  <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-center">
                    <span className="text-[10px] uppercase font-mono text-amber-800 font-semibold block">
                      Waktu Kelahiran
                    </span>
                    <span className="font-serif text-sm sm:text-base font-bold text-stone-900 block mt-0.5">
                      06.30 WIB
                    </span>
                    <span className="text-[9px] text-stone-500 block">Pagi Hari Penuh Rahmat</span>
                  </div>

                  <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-center">
                    <span className="text-[10px] uppercase font-mono text-amber-800 font-semibold block">
                      Berat Badan (BB)
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-emerald-800 block mt-0.5">
                      3.350 Gram
                    </span>
                    <span className="text-[9px] text-stone-500 block">3.35 Kg (Sehat & Kuat)</span>
                  </div>

                  <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-center">
                    <span className="text-[10px] uppercase font-mono text-amber-800 font-semibold block">
                      Panjang Badan (PB)
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-emerald-800 block mt-0.5">
                      49.5 Cm
                    </span>
                    <span className="text-[9px] text-stone-500 block">Goldar: O (Positif)</span>
                  </div>
                </div>

                {/* Additional Clinical Info */}
                <div className="flex flex-wrap items-center justify-between text-xs text-stone-600 bg-stone-100/80 px-4 py-2 rounded-xl mb-6 border border-stone-200">
                  <span>Tempat Bersalin: <strong>RSIA Bunda Aliyah Jakarta</strong></span>
                  <span>Dokter Obgyn: <strong>dr. Sarah Sp.OG</strong></span>
                </div>

                {/* Philosophical Meaning of Baby's Name */}
                <div className="space-y-3 bg-gradient-to-br from-amber-50 to-stone-50 p-4 sm:p-5 rounded-2xl border border-amber-200">
                  <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Arti Filosofis & Doa Dalam Nama Ananda</span>
                  </h4>

                  <div className="space-y-2 text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
                    <div className="flex gap-2 items-start">
                      <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-950 font-bold text-xs shrink-0">
                        Muhammad
                      </span>
                      <p>
                        <strong>Yang Terpuji</strong> — Berharap ananda kelak senantiasa meneladani sifat mulia, kelembutan tutur kata, dan kepemimpinan Baginda Rasulullah Muhammad SAW.
                      </p>
                    </div>

                    <div className="flex gap-2 items-start">
                      <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-950 font-bold text-xs shrink-0">
                        Rayyan
                      </span>
                      <p>
                        <strong>Pintu Surga Ar-Rayyan</strong> — Pintu surga kemuliaan yang diperuntukkan bagi kaum yang ikhlas berpuasa, perlambang ketakwaan dan ketulusan hati.
                      </p>
                    </div>

                    <div className="flex gap-2 items-start">
                      <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-950 font-bold text-xs shrink-0">
                        Al-Ghifari
                      </span>
                      <p>
                        <strong>Pemaaf & Berjiwa Lapang</strong> — Mengharapkan ananda tumbuh menjadi pribadi yang berhati lembut, gemar memaafkan, dan senantiasa dalam ampunan Allah SWT.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SYARIAH AQIQAH LIVESTOCK VERIFICATION                        */}
            {/* ============================================================ */}
            <section className="space-y-4">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#083B2E] to-[#04281F] border border-amber-400/40 shadow-2xl relative overflow-hidden">
                {/* Watermark badge */}
                <div className="absolute top-4 right-4 text-emerald-400/10 font-serif text-8xl select-none pointer-events-none">
                  ۞
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-400/20 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                        Fasilitas Syariah Terverifikasi
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-amber-100 font-bold">
                        Penyembelihan Aqiqah Sesuai Sunnah
                      </h3>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-sans font-semibold">
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Status: Ditunaikan Syar&apos;i</span>
                  </div>
                </div>

                {/* Hadits Box */}
                <div className="bg-[#031C15]/80 p-4 rounded-2xl border border-amber-400/20 mb-5 space-y-2">
                  <p className="font-serif text-sm sm:text-base text-amber-200 text-center leading-loose" dir="rtl">
                    كُلُّ غُلَامٍ رَهِينَةٌ بِعَقِيقَتِهِ تُذْبَحُ عَنْهُ يَوْمَ سَابِعِهِ وَيُحْلَقُ وَيُسَمَّى
                  </p>
                  <p className="text-xs text-emerald-100/75 italic text-center font-sans">
                    &ldquo;Setiap anak tergadai dengan aqiqahnya, disembelihkan untuknya pada hari ketujuh kelahirannya, dicukur rambutnya, dan diberi nama.&rdquo; (HR. Abu Dawud, At-Tirmidzi, & An-Nasa&apos;i)
                  </p>
                </div>

                {/* Verification Points Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#062D23]/90 border border-emerald-400/20 rounded-xl p-3">
                    <span className="text-[10px] uppercase font-mono text-amber-300 block">
                      Hewan Sembelihan
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-white mt-1">
                      2 Ekor Domba Jantan Sehat
                    </p>
                    <span className="text-[10px] text-emerald-200/60 block mt-0.5">
                      Cukup Umur & Sesuai Syariat Bayi Laki-laki
                    </span>
                  </div>

                  <div className="bg-[#062D23]/90 border border-emerald-400/20 rounded-xl p-3">
                    <span className="text-[10px] uppercase font-mono text-amber-300 block">
                      Waktu Penyembelihan
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-white mt-1">
                      Sabtu, 24 Juli 2027
                    </p>
                    <span className="text-[10px] text-emerald-200/60 block mt-0.5">
                      Hari ke-7 Kelahiran Ananda
                    </span>
                  </div>

                  <div className="bg-[#062D23]/90 border border-emerald-400/20 rounded-xl p-3">
                    <span className="text-[10px] uppercase font-mono text-amber-300 block">
                      Penyaluran Berkah
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-white mt-1">
                      Hidangan Matang Siap Santap
                    </p>
                    <span className="text-[10px] text-emerald-200/60 block mt-0.5">
                      Kaum Dhuafa, Yatim Piatu, & Kerabat
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* CEREMONY RUNDOWN / SUSUNAN ACARA TASMIYAH                    */}
            {/* ============================================================ */}
            <section className="space-y-4">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#083B2E] border border-amber-400/30 text-amber-300 text-xs font-serif uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Susunan Acara Tasyakuran</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-amber-100 font-bold tracking-wide">
                  Rangkaian Prosesi Tasmiyah & Doa
                </h2>
                <p className="text-xs text-emerald-200/70 font-sans">
                  Rangkaian prosesi sunnah penyambutan kelahiran ananda
                </p>
              </div>

              {/* Timeline Items */}
              <div className="space-y-3">
                {[
                  {
                    time: '09.00 - 09.30 WIB',
                    title: 'Pembacaan Ayat Suci Al-Qur\'an & Sholawat Nabi',
                    desc: 'Pembukaan majelis berkah, melantunkan ayat-ayat suci dan sholawat badar bersama para alim ulama dan keluarga.'
                  },
                  {
                    time: '09.30 - 10.00 WIB',
                    title: 'Prosesi Tasmiyah & Doa Tahnik Kurma Berkah',
                    desc: 'Pemberian nama resmi ananda dan prosesi tahnik menggunakan kurma ajwah berkah oleh sesepuh ulama.'
                  },
                  {
                    time: '10.00 - 10.30 WIB',
                    title: 'Cukur Rambut & Penimbangan Rambut Sedekah',
                    desc: 'Pemotongan rambut bayi secara simbolis dan penimbangan helai rambut untuk disedekahkan senilai perak/emas kepada dhuafa.'
                  },
                  {
                    time: '10.30 - 11.00 WIB',
                    title: 'Tausiyah Singkat & Doa Keberkahan Ananda',
                    desc: 'Mauidhoh hasanah mengenai adab mendidik anak dalam Islam serta untaian doa bersama untuk keselamatan dunia akhirat.'
                  },
                  {
                    time: '11.00 - 13.00 WIB',
                    title: 'Ramah Tamah & Santap Siang Berkah',
                    desc: 'Menikmati hidangan olahan aqiqah berkah bersama keluarga besar, tetangga, dan segenap tamu undangan.'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#083B2E]/90 border border-emerald-400/25 hover:border-amber-400/40 transition-all flex items-start gap-4 shadow-lg group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0 text-amber-300 font-serif font-bold text-sm group-hover:scale-105 transition-transform">
                      0{idx + 1}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-serif text-base sm:text-lg font-bold text-amber-200">
                          {item.title}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#031C15] border border-amber-400/30 text-[11px] font-mono text-amber-300 shrink-0">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-100/80 font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================================ */}
            {/* COUNTDOWN & CALENDAR SECTION                                 */}
            {/* ============================================================ */}
            <section className="p-6 sm:p-8 rounded-3xl bg-[#083B2E]/90 border border-amber-400/35 text-center shadow-2xl relative">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-300 font-semibold block mb-1">
                Menuju Hari Bahagia
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-amber-100 font-bold mb-4">
                Hitung Mundur Acara Tasmiyah
              </h3>

              {/* Countdown cards */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto mb-6">
                {[
                  { label: 'Hari', val: timeLeft.days },
                  { label: 'Jam', val: timeLeft.hours },
                  { label: 'Menit', val: timeLeft.minutes },
                  { label: 'Detik', val: timeLeft.seconds }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-2xl bg-[#032018] border border-amber-400/30 shadow-inner"
                  >
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-200 block leading-tight">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-emerald-200/70 font-sans">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Add to Google Calendar Action Button */}
              <button
                type="button"
                onClick={handleSaveToCalendar}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-sans font-bold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Simpan Tanggal ke Google Calendar</span>
              </button>
            </section>

            {/* ============================================================ */}
            {/* LOCATION, MAP & VIRTUAL LIVE STREAMING                       */}
            {/* ============================================================ */}
            <section id="livestream" className="space-y-4">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#083B2E] border border-amber-400/30 text-amber-300 text-xs font-serif uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>Lokasi & Siaran Langsung</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-amber-100 font-bold tracking-wide">
                  Kehadiran & Akses Acara
                </h2>
                <p className="text-xs text-emerald-200/70 font-sans">
                  Dapat dihadiri langsung secara khidmat atau disaksikan melalui Live Streaming
                </p>
              </div>

              {/* Physical Venue Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#083B2E]/90 border border-emerald-400/30 shadow-2xl space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                      Tempat Acara Fisik
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-bold mt-0.5">
                      {venueText}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-amber-300" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-emerald-100/85 font-sans leading-relaxed">
                  {addressText}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs sm:text-sm font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    <Navigation className="w-4 h-4 text-amber-300" />
                    <span>Petunjuk Arah Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
                  </a>
                </div>
              </div>

              {/* Virtual Live Streaming Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0A3E31] to-[#04241C] border border-amber-400/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/40 text-[10px] font-mono text-red-300 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span>SIARAN LANGSUNG (LIVE)</span>
                      </div>
                      <h4 className="font-serif text-lg sm:text-xl text-amber-100 font-bold mt-1">
                        Doa Bersama Virtual via YouTube / Instagram
                      </h4>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-emerald-100/80 font-sans leading-relaxed">
                  Bagi keluarga, sahabat, dan kerabat yang berada di luar kota atau berhalangan hadir langsung, dapat ikut bergabung mengaminkan doa tasyakuran secara virtual melalui kanal resmi kami.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowStreamingModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Video className="w-4 h-4 text-slate-950" />
                    <span>Akses Ruang Live Streaming</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-900" />
                  </button>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* BABY PHOTO GALLERY & LIGHTBOX                                */}
            {/* ============================================================ */}
            <section className="space-y-4">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#083B2E] border border-amber-400/30 text-amber-300 text-xs font-serif uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Galeri Potret Buah Hati</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-amber-100 font-bold tracking-wide">
                  Momen Berkah & Senyuman Suci
                </h2>
                <p className="text-xs text-emerald-200/70 font-sans">
                  Sentuh foto untuk memperbesar tampilan potret ananda
                </p>
              </div>

              {/* 4-Image Grid with Moroccan Arched Top Frames */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {AQIQAH_GALLERY_PHOTOS.map((photo, idx) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhotoIdx(idx)}
                    className="group cursor-pointer rounded-t-[50px] rounded-b-2xl overflow-hidden p-1 bg-gradient-to-b from-amber-400/40 via-emerald-500/20 to-transparent border border-amber-400/30 hover:border-amber-400 transition-all shadow-xl"
                  >
                    <div className="w-full h-44 sm:h-56 rounded-t-[46px] rounded-b-xl overflow-hidden relative">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#062D23]/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                      <div className="absolute bottom-2 left-2 right-2 text-center">
                        <span className="font-serif text-xs sm:text-sm text-amber-200 font-bold block truncate drop-shadow">
                          {photo.title}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================================ */}
            {/* KEHADIRAN & DOA RESTU (RSVP FORM)                            */}
            {/* ============================================================ */}
            <section className="space-y-4">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#083B2E] border border-amber-400/30 text-amber-300 text-xs font-serif uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5 text-amber-300" />
                  <span>Konfirmasi Kehadiran & Doa Restu</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-amber-100 font-bold tracking-wide">
                  RSVP & Doa Berkah Tamu
                </h2>
                <p className="text-xs text-emerald-200/70 font-sans">
                  Mohon kesediaan konfirmasi kehadiran demi kelancaran jamuan berkah
                </p>
              </div>

              <form
                onSubmit={handleSubmitRsvp}
                className="p-6 sm:p-8 rounded-3xl bg-[#083B2E]/90 border border-amber-400/35 shadow-2xl backdrop-blur-xl space-y-4"
              >
                {/* Guest Name Input */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-amber-300 mb-1.5">
                    Nama Lengkap Tamu Undangan
                  </label>
                  <input
                    type="text"
                    value={guestNameInput}
                    onChange={(e) => setGuestNameInput(e.target.value)}
                    placeholder="Contoh: Bpk. Ahmad Dahlan & Keluarga"
                    className="w-full px-4 py-3 rounded-xl bg-[#031C15] border border-emerald-400/30 text-white placeholder-emerald-300/40 focus:outline-none focus:border-amber-400 text-sm transition-colors"
                  />
                </div>

                {/* Attendance Status (3 Choices) */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-amber-300 mb-1.5">
                    Konfirmasi Kehadiran
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { key: 'hadir', label: 'Hadir Langsung' },
                      { key: 'virtual', label: 'Hadir Virtual (Live)' },
                      { key: 'tidak', label: 'Berhalangan Hadir' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setAttendance(opt.key as any)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                          attendance === opt.key
                            ? 'bg-amber-400 border-amber-300 text-slate-950 shadow-md font-bold'
                            : 'bg-[#031C15] border-emerald-400/25 text-emerald-100 hover:border-amber-400/50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest Pax Count (if hadir) */}
                {attendance === 'hadir' && (
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-amber-300 mb-1.5">
                      Jumlah Tamu yang Hadir
                    </label>
                    <select
                      value={paxCount}
                      onChange={(e) => setPaxCount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#031C15] border border-emerald-400/30 text-white focus:outline-none focus:border-amber-400 text-sm cursor-pointer"
                    >
                      <option value="1 Orang">1 Orang Tamu</option>
                      <option value="2 Orang">2 Orang Tamu</option>
                      <option value="Keluarga (3-4 Orang)">Keluarga (3 - 4 Orang)</option>
                      <option value="Rombongan (> 4 Orang)">Rombongan (&gt; 4 Orang)</option>
                    </select>
                  </div>
                )}

                {/* Newborn Blessing Message */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-amber-300 mb-1.5">
                    Untaian Doa & Ucapan untuk Ananda {babyShort}
                  </label>
                  <textarea
                    rows={3}
                    value={blessingMessage}
                    onChange={(e) => setBlessingMessage(e.target.value)}
                    placeholder="Tuliskan doa kebaikan, kesehatan, dan keshalihan untuk ananda..."
                    className="w-full px-4 py-3 rounded-xl bg-[#031C15] border border-emerald-400/30 text-white placeholder-emerald-300/40 focus:outline-none focus:border-amber-400 text-sm transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-sans font-bold text-sm tracking-wide shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-slate-900" />
                  <span>Kirim Konfirmasi Kehadiran & Doa Berkah</span>
                </button>
              </form>
            </section>

            {/* ============================================================ */}
            {/* BUKU TAMU & DOA BERKAH (WISHES WALL)                         */}
            {/* ============================================================ */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-amber-300 font-semibold block">
                    Untaian Kasih Sayang
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-amber-100 font-bold">
                    Buku Tamu & Doa Berkah ({wishes.length})
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                </div>
              </div>

              {/* Wishes list */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {wishes.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#083B2E]/90 border border-amber-400/30 shadow-lg space-y-2 relative"
                  >
                    <div className="flex items-start justify-between gap-2 min-w-0">
                      <div className="min-w-0">
                        <h4 className="font-serif text-base font-bold text-amber-200 break-words">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-emerald-200/60 font-sans">
                          {item.time} • {item.pax}
                        </span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider shrink-0 ${
                          item.attendance === 'hadir'
                            ? 'bg-emerald-950 border border-emerald-400 text-emerald-300'
                            : item.attendance === 'virtual'
                            ? 'bg-amber-950 border border-amber-400 text-amber-300'
                            : 'bg-stone-900 border border-stone-600 text-stone-300'
                        }`}
                      >
                        {item.attendance === 'hadir'
                          ? 'Hadir Langsung'
                          : item.attendance === 'virtual'
                          ? 'Hadir Virtual'
                          : 'Berhalangan'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-emerald-100/90 font-sans leading-relaxed italic break-words">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================================ */}
            {/* TANDA KASIH & TABUNGAN SYARIAH ANANDA (DIGITAL GIFT)         */}
            {/* ============================================================ */}
            <section className="space-y-4">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#083B2E] border border-amber-400/30 text-amber-300 text-xs font-serif uppercase tracking-wider">
                  <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                  <span>Tanda Kasih & Hadiah</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-amber-100 font-bold tracking-wide">
                  Tabungan Syariah & Kado Perlengkapan Bayi
                </h2>
                <p className="text-xs text-emerald-200/70 font-sans max-w-md mx-auto">
                  Doa restu Anda adalah anugerah terindah. Namun apabila hendak memberikan tanda kasih untuk ananda, kami sediakan sarana digital berikut
                </p>
              </div>

              {/* Tab Selector */}
              <div className="flex rounded-2xl bg-[#031C15] p-1 border border-emerald-400/30">
                <button
                  type="button"
                  onClick={() => setActiveGiftTab('syariah')}
                  className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeGiftTab === 'syariah'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                      : 'text-emerald-200/80 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Tabungan Syariah Ananda</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGiftTab('kado')}
                  className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeGiftTab === 'kado'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                      : 'text-emerald-200/80 hover:text-white'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Kado Fisik Perlengkapan Bayi</span>
                </button>
              </div>

              {/* Tab Content */}
              {activeGiftTab === 'syariah' ? (
                <div className="space-y-3">
                  {/* Bank BSI Card */}
                  <div className="p-5 rounded-2xl bg-[#083B2E]/90 border border-amber-400/35 shadow-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-teal-800 text-white font-mono font-bold text-xs">
                          BSI
                        </span>
                        <span className="font-serif text-sm font-semibold text-amber-200">
                          Bank Syariah Indonesia (BSI)
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-400/30">
                        Tabungan Syariah
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-[#031C15] p-3 rounded-xl border border-emerald-400/20">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-emerald-300/70 block">
                          Nomor Rekening
                        </span>
                        <span className="font-mono text-base sm:text-lg font-bold text-white tracking-wider">
                          7218 0921 88
                        </span>
                        <span className="text-[11px] text-amber-200 block">
                          a.n. Muhammad Rayyan Al-Ghifari
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy('7218092188', 'Rekening BSI Ananda')}
                        className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        {copiedKey === 'Rekening BSI Ananda' ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bank BCA Card */}
                  <div className="p-5 rounded-2xl bg-[#083B2E]/90 border border-amber-400/35 shadow-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-800 text-white font-mono font-bold text-xs">
                          BCA
                        </span>
                        <span className="font-serif text-sm font-semibold text-amber-200">
                          Bank Central Asia (BCA)
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-400/30">
                        Orang Tua Ananda
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-[#031C15] p-3 rounded-xl border border-emerald-400/20">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-emerald-300/70 block">
                          Nomor Rekening
                        </span>
                        <span className="font-mono text-base sm:text-lg font-bold text-white tracking-wider">
                          8735 0291 11
                        </span>
                        <span className="text-[11px] text-amber-200 block">
                          a.n. M. Ilham Pratama
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy('8735029111', 'Rekening BCA Ayah')}
                        className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        {copiedKey === 'Rekening BCA Ayah' ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* QRIS Card */}
                  <div className="p-4 rounded-2xl bg-[#031C15] border border-amber-400/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0">
                        <QrCode className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-white">
                          QRIS Donasi & Tabungan Berkah Bayi
                        </h4>
                        <span className="text-[10px] text-emerald-200/70">
                          Mendukung GoPay, OVO, ShopeePay, DANA & Seluruh Mobile Banking
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowQrisModal(true)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shrink-0 cursor-pointer"
                    >
                      Lihat QR
                    </button>
                  </div>
                </div>
              ) : (
                /* Tab B: Physical Baby Gift Shipping */
                <div className="p-6 rounded-3xl bg-[#083B2E]/90 border border-amber-400/35 shadow-xl space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                        Alamat Pengiriman Kado Fisik
                      </span>
                      <h4 className="font-serif text-lg text-white font-bold mt-0.5">
                        Kediaman Keluarga Pratama
                      </h4>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-amber-300" />
                    </div>
                  </div>

                  <div className="bg-[#031C15] p-3.5 rounded-xl border border-emerald-400/20 text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans">
                    <p className="font-semibold text-amber-200">
                      Penerima: M. Ilham Pratama / Rayyan
                    </p>
                    <p className="mt-1">
                      Jl. Taman Emerald Botanical No. 7, RT 04 / RW 08, Kelurahan Melawai, Kecamatan Kebayoran Baru, Jakarta Selatan, DKI Jakarta, 12160
                    </p>
                    <p className="mt-1 text-emerald-300/70 text-xs">
                      Patokan: Rumah Pagar Putih Sebelah Masjid Al-Barakah (Telp: 0812-9876-5432)
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          'Jl. Taman Emerald Botanical No. 7, RT 04 / RW 08, Kebayoran Baru, Jakarta Selatan 12160 (Penerima: M. Ilham Pratama / 0812-9876-5432)',
                          'Alamat Pengiriman Kado'
                        )
                      }
                      className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      {copiedKey === 'Alamat Pengiriman Kado' ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Alamat Berhasil Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Salin Alamat Lengkap</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Baby Gift Wishlist Inspiration Pills */}
                  <div className="pt-2 border-t border-emerald-400/20 space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300/80 block">
                      Inspirasi Perlengkapan yang Dibutuhkan Ananda:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Baby Stroller & Car Seat',
                        'Sabun & Minyak Telon Organik',
                        'Set Baju Bayi Katun Bambu',
                        'Mainan Edukasi Sensori Bayi',
                        'Buku Boardbook Islami Balita'
                      ].map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full bg-[#031C15] border border-emerald-400/30 text-[11px] text-emerald-200"
                        >
                          🌿 {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* ============================================================ */}
            {/* CLOSING DOA & SALAM SECTION                                  */}
            {/* ============================================================ */}
            <section className="text-center space-y-4 pt-6 pb-12 border-t border-emerald-400/20">
              <p className="font-serif text-lg sm:text-xl text-amber-200" dir="rtl">
                جَزَاكُمُ اللَّهُ خَيْرًا كَثِيرًا
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
                Terima Kasih Atas Doa & Kasih Sayang
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 font-sans max-w-md mx-auto leading-relaxed">
                Merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan memberikan doa restu bagi kelangsungan hidup buah hati kami tercinta.
              </p>

              <div className="pt-2 space-y-1">
                <p className="text-xs text-emerald-300 font-mono tracking-wider">
                  Keluarga Besar Yang Berbahagia:
                </p>
                <p className="font-serif text-lg text-amber-200 font-bold">
                  {parentsName}
                </p>
                <p className="text-xs text-emerald-200/60 font-serif italic">
                  Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
                </p>
              </div>

              {/* Colophon & Brand Signature */}
              <div className="pt-8 text-[11px] text-emerald-300/40 font-mono tracking-widest uppercase">
                JanjiSuci.id • Emerald Botanical Aqiqah Collection
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* ============================================================ */}
      {/* FLOATING ISLAMIC AUDIO PLAYER (MOBILE ONLY, <1024px)         */}
      {/* ============================================================ */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={onToggleAudio}
          aria-label={isPlayingAudio ? 'Jeda Audio Lantunan' : 'Putar Audio Lantunan'}
          className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-700 p-0.5 shadow-2xl shadow-black/80 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
        >
          {/* Outer glowing pulsing ring */}
          <span
            className={`absolute -inset-1 rounded-full bg-amber-400 opacity-60 blur-sm pointer-events-none ${
              isPlayingAudio ? 'animate-pulse' : ''
            }`}
          />

          <div
            className={`w-full h-full rounded-full bg-[#04241C] border border-amber-300/80 flex items-center justify-center transition-transform ${
              isPlayingAudio ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
          >
            {/* Arabesque floral center icon */}
            <span className="text-amber-300 font-serif text-lg select-none">۞</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            {isPlayingAudio ? (
              <Volume2 className="w-5 h-5 text-amber-300 drop-shadow" />
            ) : (
              <VolumeX className="w-5 h-5 text-amber-300/80 drop-shadow" />
            )}
          </div>
        </button>
      </div>

      {/* ============================================================ */}
      {/* MODAL: PHOTO GALLERY LIGHTBOX                                */}
      {/* ============================================================ */}
      {selectedPhotoIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhotoIdx(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedPhotoIdx(null)
            }}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors z-10"
            aria-label="Tutup Galeri"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedPhotoIdx(
                (selectedPhotoIdx - 1 + AQIQAH_GALLERY_PHOTOS.length) %
                  AQIQAH_GALLERY_PHOTOS.length
              )
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors z-10"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedPhotoIdx((selectedPhotoIdx + 1) % AQIQAH_GALLERY_PHOTOS.length)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors z-10"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full rounded-3xl overflow-hidden bg-[#062D23] border border-amber-400/40 p-2 shadow-2xl cursor-default"
          >
            <div className="rounded-2xl overflow-hidden max-h-[70vh] bg-black">
              <img
                src={AQIQAH_GALLERY_PHOTOS[selectedPhotoIdx].src}
                alt={AQIQAH_GALLERY_PHOTOS[selectedPhotoIdx].title}
                className="w-full h-full object-contain max-h-[70vh] mx-auto"
              />
            </div>
            <div className="p-4 text-center">
              <h4 className="font-serif text-lg text-amber-200 font-bold">
                {AQIQAH_GALLERY_PHOTOS[selectedPhotoIdx].title}
              </h4>
              <p className="text-xs text-emerald-100/80 mt-1 font-sans">
                {AQIQAH_GALLERY_PHOTOS[selectedPhotoIdx].caption}
              </p>
              <span className="text-[10px] text-amber-300/60 font-mono mt-2 block">
                {selectedPhotoIdx + 1} dari {AQIQAH_GALLERY_PHOTOS.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: LIVE STREAMING ACCESS INFO                            */}
      {/* ============================================================ */}
      {showStreamingModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowStreamingModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full rounded-3xl bg-[#083B2E] border border-amber-400/50 p-6 shadow-2xl space-y-4 relative text-center cursor-default"
          >
            <button
              type="button"
              onClick={() => setShowStreamingModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#04241C] hover:bg-[#031C15] text-white flex items-center justify-center cursor-pointer"
              aria-label="Tutup Dialog Streaming"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
              <Video className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                Akses Doa Bersama Virtual
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-bold mt-1">
                Live Streaming Aqiqah Ananda
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 font-sans leading-relaxed">
              Siaran langsung akan dimulai pada hari <strong>{dateText}</strong> pukul <strong>09.30 WIB</strong> bertepatan dengan prosesi Tahnik & Doa Berkah.
            </p>

            <div className="space-y-2 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
              >
                <Video className="w-4 h-4" />
                <span>Buka Siaran Langsung via YouTube Channel</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
              >
                <span>Saksikan via Instagram Live @ilhamnurul</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: QRIS DIGITAL TABUNGAN                                 */}
      {/* ============================================================ */}
      {showQrisModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowQrisModal(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-sm w-full rounded-3xl bg-white text-slate-900 p-6 shadow-2xl space-y-4 relative text-center cursor-default"
          >
            <button
              type="button"
              onClick={() => setShowQrisModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center cursor-pointer"
              aria-label="Tutup Dialog QRIS"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold">
                STANDAR QRIS NASIONAL
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                Tabungan Berkah Ananda {babyShort}
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                NMID: ID1029384756192 • JanjiSuci Syariah
              </p>
            </div>

            {/* QR Code Illustration */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block shadow-inner">
              <div className="w-48 h-48 bg-white border border-slate-300 rounded-xl flex flex-col items-center justify-center p-3">
                <QrCode className="w-36 h-36 text-slate-900" />
                <span className="text-[9px] font-mono text-slate-600 font-bold mt-1">
                  SCAN DENGAN APLIKASI BANK/E-WALLET
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 font-sans">
              Buka aplikasi GoPay, OVO, Dana, LinkAja, BCA Mobile, atau BSI Mobile Anda, lalu scan kode QR di atas.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
