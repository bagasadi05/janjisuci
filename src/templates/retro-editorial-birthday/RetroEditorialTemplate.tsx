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
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Package,
  Music,
  Volume2,
  VolumeX,
  MapPin,
  Ticket,
  Disc3,
  Shirt,
  Gift,
  Radio,
  Bookmark
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { RetroEditorialCoverScreen } from './RetroEditorialCoverScreen'
import { RetroEditorialDesktopShowcase } from './RetroEditorialDesktopShowcase'
import { useInvitationData } from '../../context/InvitationContext'
import { useToast } from '../../components/Toast'

// Milestone growing-up photo strip
const MILESTONE_CHAPTERS = [
  {
    id: 1,
    chapter: 'Chapter 01',
    ageTag: 'Age 3 • Little Dreamer',
    src: 'https://images.unsplash.com/photo-1544155891-969f15a055d3?auto=format&fit=crop&w=1000&q=85',
    caption: 'Langkah-langkah kecil penuh tawa ceria dan rasa ingin tahu yang tak pernah pudar.'
  },
  {
    id: 2,
    chapter: 'Chapter 02',
    ageTag: 'Age 8 • Playful Smiles',
    src: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1000&q=85',
    caption: 'Masa kanak-kanak yang hangat bersama petualangan seru dan tawa riang bersama sahabat.'
  },
  {
    id: 3,
    chapter: 'Chapter 03',
    ageTag: 'Age 14 • Teen Wonder',
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85',
    caption: 'Menemukan passion baru, musik favorit, dan persahabatan yang mewarnai masa remaja.'
  },
  {
    id: 4,
    chapter: 'Chapter 04',
    ageTag: 'Sweet 17 • The Golden Chapter',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    caption: 'Menyambut usia 17 tahun dengan rasa syukur mendalam, keberanian, dan mimpi-mimpi besar.'
  }
]

// Rundown party ticket items
const PARTY_RUNDOWN = [
  {
    time: '18:00 WIB',
    label: 'DOORS OPEN & RED CARPET',
    description: 'Welcome mocktails, Polaroid photobooth frenzy, & acoustic ambient set.',
    badge: 'ACT I'
  },
  {
    time: '19:00 WIB',
    label: 'CANDLE BLOWING & 17 WISHES',
    description: 'Special milestone video screening, 17 candles ceremony, & celebratory toast.',
    badge: 'ACT II'
  },
  {
    time: '19:45 WIB',
    label: 'DINNER FEAST & SERENADE',
    description: 'Exquisite dinner buffet, live acoustic band, & intimate heartfelt speeches.',
    badge: 'ACT III'
  },
  {
    time: '20:30 WIB',
    label: 'DJ SET, DANCE FLOOR & AFTERPARTY',
    description: 'DJ spinning requested guest tracks, party games, glow sticks, & fireworks.',
    badge: 'ACT IV'
  }
]

// Dresscode color swatches
const DRESSCODE_SWATCHES = [
  { name: 'Vintage Terracotta', hex: '#C25E38', bgClass: 'bg-[#C25E38]', textLight: true },
  { name: 'Warm Mustard Ochre', hex: '#D97706', bgClass: 'bg-[#D97706]', textLight: true },
  { name: 'Warm Milk-Tea Paper', hex: '#FBF8F3', bgClass: 'bg-[#FBF8F3]', textLight: false },
  { name: 'Muted Vintage Sage', hex: '#4D6A56', bgClass: 'bg-[#4D6A56]', textLight: true },
  { name: 'Deep Espresso Noir', hex: '#1C1917', bgClass: 'bg-[#1C1917]', textLight: true }
]

interface WishItem {
  id: number
  name: string
  attendance: 'hadir' | 'ragu' | 'tidak'
  guests: string
  songRequest?: string
  message: string
  time: string
}

export const RetroEditorialTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack
}) => {
  const { data: weddingData } = useInvitationData()
  const { showToast } = useToast()

  const targetDateStr = weddingData.countdownDate || '2027-08-14T18:00:00+07:00'
  const celebrantName = weddingData.couple.groom.fullName || 'Aurelia Clarissa Ramadhani'
  const celebrantShort = weddingData.couple.groom.shortName || 'Aurelia'
  const parentsName = weddingData.couple.groom.fatherName && weddingData.couple.groom.motherName
    ? `Keluarga Bpk. ${weddingData.couple.groom.fatherName} & Ibu ${weddingData.couple.groom.motherName}`
    : 'Keluarga Bpk. Irwan Pratama & Ibu Selvi Anggraeni'
  const dateText = weddingData.events.akad.date || 'Sabtu, 14 Agustus 2027'
  const timeText = weddingData.events.akad.time || '18:00 - 22:00 WIB'
  const venueText = weddingData.events.akad.venue || 'The Glasshouse Bistro & Rooftop'
  const addressText = weddingData.events.akad.address || 'Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan'
  const mapsUrl = weddingData.events.akad.mapsUrl || 'https://maps.google.com/?q=The+Glasshouse+Bistro+Jakarta'

  const physicalAddress = weddingData.gift.giftAddress
    ? `${weddingData.gift.giftAddress.address} (Penerima: ${weddingData.gift.giftAddress.recipient} - ${weddingData.gift.giftAddress.phone})`
    : 'Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan 12190 (Penerima: Aurelia Clarissa - 0813-8899-7711)'

  const accounts = weddingData.gift.accounts?.length > 0
    ? weddingData.gift.accounts
    : [
        { bank: 'Bank BCA', accountNumber: '883-124-7890', accountHolder: 'AURELIA CLARISSA', logoText: 'BCA' },
        { bank: 'Bank Mandiri', accountNumber: '137-00-1928374-1', accountHolder: 'AURELIA CLARISSA', logoText: 'MANDIRI' },
        { bank: 'GoPay / ShopeePay', accountNumber: '0813-8899-7711', accountHolder: 'AURELIA CLARISSA', logoText: 'E-WALLET' }
      ]

  // State management
  const [copiedBank, setCopiedBank] = useState<string | null>(null)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [activeGiftTab, setActiveGiftTab] = useState<'bank' | 'physical'>('bank')
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null)

  // RSVP state
  const [guestNameInput, setGuestNameInput] = useState('')
  const [attendance, setAttendance] = useState<'hadir' | 'ragu' | 'tidak'>('hadir')
  const [guestCount, setGuestCount] = useState('1 Orang')
  const [songRequest, setSongRequest] = useState('')
  const [blessingMessage, setBlessingMessage] = useState('')

  // Wishes guestbook initial items
  const [wishes, setWishes] = useState<WishItem[]>([
    {
      id: 1,
      name: 'Nadia Salsabila & Teman SMA',
      attendance: 'hadir',
      guests: '2 Orang',
      songRequest: 'Nadhif Basalamah - Penjaga Hati',
      message: 'Happy Sweet 17th Aurel sayaaang! Semoga selalu bersinar, kuliah impian tercapai, dan bahagia terus! Nggak sabar buat seru-seruan di party!',
      time: '2 jam yang lalu'
    },
    {
      id: 2,
      name: 'Dimas Pratama',
      attendance: 'hadir',
      guests: '1 Orang',
      songRequest: 'Sheila on 7 - Dan',
      message: 'Selamat ulang tahun ke-17 Aurel! Semoga panjang umur, sehat selalu, dan tercapai semua cita-citanya.',
      time: '4 jam yang lalu'
    },
    {
      id: 3,
      name: 'Tante Rina & Om David',
      attendance: 'hadir',
      guests: '2 Orang',
      songRequest: 'Tulus - Tujuh Belas',
      message: 'Selamat memasuki usia 17 tahun untuk keponakan kami tersayang Aurelia. Semoga menjadi pribadi yang semakin bijak dan membanggakan papa mama.',
      time: 'Kemarin'
    }
  ])

  // Personalized URL greeting
  const [guestGreetingName, setGuestGreetingName] = useState('Tamu Spesial')
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const to = params.get('to') || params.get('u') || params.get('guest')
    if (to && to.trim()) {
      try {
        setGuestGreetingName(decodeURIComponent(to.replace(/\+/g, ' ')))
      } catch {
        setGuestGreetingName(to.trim())
      }
    }
  }, [])

  // Live Countdown logic
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const updateCountdown = () => {
      const diff = +new Date(targetDateStr) - +new Date()
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        })
      }
    }
    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [targetDateStr])

  // Clipboard handler
  const handleCopy = (text: string, label: string, isAddress = false) => {
    if (!navigator.clipboard) {
      showToast(`Fitur salin tidak didukung pada peramban ini`, 'info')
      return
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (isAddress) {
          setCopiedAddress(true)
          setTimeout(() => setCopiedAddress(false), 2500)
        } else {
          setCopiedBank(label)
          setTimeout(() => setCopiedBank(null), 2500)
        }
        showToast(`${label} berhasil disalin!`, 'success')
      })
      .catch(() => {
        showToast(`Gagal menyalin ${label}`, 'info')
      })
  }

  // RSVP submission
  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestNameInput.trim()) {
      showToast('Mohon masukkan nama Anda', 'info')
      return
    }
    if (!blessingMessage.trim()) {
      showToast('Mohon tulis ucapan & doa ulang tahun', 'info')
      return
    }

    const newWish: WishItem = {
      id: Date.now(),
      name: guestNameInput.trim(),
      attendance,
      guests: guestCount,
      songRequest: songRequest.trim() || undefined,
      message: blessingMessage.trim(),
      time: 'Baru saja'
    }

    setWishes([newWish, ...wishes])
    setGuestNameInput('')
    setSongRequest('')
    setBlessingMessage('')

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#C25E38', '#D97706', '#4D6A56', '#FEF3C7', '#F59E0B']
      })
    } catch {
      // ignore
    }

    showToast('Terima kasih! Konfirmasi & ucapan Anda telah tersimpan.', 'success')
  }

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Sweet 17th Birthday Party: ${celebrantShort}`)
    const details = encodeURIComponent(
      `Perayaan Ulang Tahun ke-17 ${celebrantName} di ${venueText}. Dresscode: Retro Chic & Glam.`
    )
    const location = encodeURIComponent(`${venueText}, ${addressText}`)
    // Format: YYYYMMDDTHHMMSSZ (approx)
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`
  }

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#1C1917] flex flex-col lg:flex-row relative selection:bg-[#FEF3C7] selection:text-[#92400E] font-sans">
      {/* 1. Cover Screen Gate */}
      <RetroEditorialCoverScreen
        isOpen={isOpened}
        onOpenWithAudio={onOpenWithAudio}
        guestName={guestGreetingName}
        celebrantName={celebrantShort}
        ageText="Sweet Seventeen • 17th Birthday"
        dateText={dateText}
      />

      {/* 2. Desktop Sticky Showcase (Left Column 5/12) */}
      <RetroEditorialDesktopShowcase
        celebrantName={celebrantName}
        ageText="Sweet Seventeen • 17th Birthday"
        dateText={dateText}
        venueText={venueText}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
        activeTrack={activeTrack}
        targetDate={targetDateStr}
      />

      {/* 3. Main Content Column (Right Column 7/12) */}
      <main className="w-full lg:w-7/12 min-h-screen flex flex-col overflow-x-hidden">
        {/* TOP EDITORIAL MASTHEAD RIBBON */}
        <header className="w-full bg-[#1C1917] text-[#FBF8F3] py-2 px-4 sm:px-8 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C25E38] animate-pulse" />
            <span>THE ARCHIVE ISSUE</span>
          </div>
          <div className="hidden sm:block text-stone-400">
            VOL. XVII • {dateText.toUpperCase()}
          </div>
          <div className="text-[#F59E0B] font-semibold">
            LIMITED EDITION
          </div>
        </header>

        {/* SECTION 1: MAGAZINE COVER HERO */}
        <section className="px-4 sm:px-8 md:px-12 pt-8 pb-12 sm:pt-12 sm:pb-16 flex flex-col items-center text-center relative border-b border-stone-200">
          {/* Issue Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/40 text-[#92400E] text-xs font-mono tracking-widest uppercase font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" aria-hidden="true" />
            <span>SWEET 17TH MILESTONE ISSUE</span>
          </div>

          {/* Main Masthead Headline */}
          <h1 className="font-serif italic font-bold text-4xl sm:text-6xl md:text-7xl text-[#C25E38] tracking-[0.12em] sm:tracking-[0.18em] uppercase leading-none drop-shadow-xs">
            AURELIA
          </h1>
          <p className="font-pinyon text-2xl sm:text-4xl text-[#D97706] -mt-1 sm:-mt-2 mb-4">
            Clarissa Ramadhani
          </p>

          <p className="max-w-md text-xs sm:text-sm text-stone-600 font-serif italic tracking-wide pb-4">
            "A chapter of grace, dreams, and golden memories — celebrating 17 years of life, laughter, and love."
          </p>

          {/* Hero Editorial Polaroid */}
          <div className="relative my-4 max-w-sm sm:max-w-md w-full">
            {/* Washi tape accents */}
            <div className="absolute -top-3 left-6 z-20 px-4 py-1 bg-[#FEF3C7]/95 border border-dashed border-[#F59E0B] text-[10px] font-mono text-[#92400E] uppercase tracking-widest rotate-[-4deg] shadow-xs">
              VOL. 17 ARCHIVE
            </div>
            <div className="absolute -top-3 right-6 z-20 px-4 py-1 bg-[#FEF3C7]/95 border border-dashed border-[#F59E0B] text-[10px] font-mono text-[#92400E] uppercase tracking-widest rotate-[3deg] shadow-xs">
              EST. 2010
            </div>

            <div className="bg-white p-4 sm:p-5 pb-6 rounded-2xl shadow-xl border border-stone-200/90 rotate-[-0.5deg]">
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                  alt={celebrantName}
                  className="w-full h-full object-cover object-center filter sepia-[0.06] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-4 text-left text-white">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#FBBF24]">
                    COVER STORY
                  </span>
                  <p className="font-serif italic text-lg sm:text-xl font-bold">
                    Stepping Into Seventeen
                  </p>
                </div>
              </div>

              {/* Barcode simulation & meta info */}
              <div className="pt-4 flex items-center justify-between border-t border-stone-200 mt-4 text-left font-mono">
                <div>
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest">PUBLISHED FOR</p>
                  <p className="text-xs font-bold text-stone-800">{guestGreetingName}</p>
                </div>
                <div className="text-right">
                  <div className="h-6 flex items-center gap-[2px]">
                    {[4, 2, 5, 2, 6, 3, 2, 5, 3, 4, 2, 6, 3, 4].map((h, i) => (
                      <span
                        key={i}
                        className="bg-stone-800 inline-block"
                        style={{ width: `${(i % 3) + 1}px`, height: `${h * 3.5}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-stone-500 tracking-wider">ISSUE-2027</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CELEBRANT WELCOME & INVITATION LETTER */}
        <section className="px-4 sm:px-8 md:px-12 py-12 sm:py-16 bg-[#F5EFE6]/70 border-b border-stone-200">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <div className="inline-block px-3 py-1 bg-white border border-[#D97706]/30 rounded-full text-[11px] font-mono text-[#D97706] uppercase tracking-wider font-semibold">
              SURAT UNDANGAN HANGAT
            </div>

            <h2 className="font-serif italic text-3xl sm:text-4xl text-[#1C1917] font-bold">
              A Dear Note from Aurelia
            </h2>

            <div className="w-16 h-0.5 bg-[#C25E38] mx-auto my-2" />

            <div className="space-y-3 text-stone-700 text-sm sm:text-base leading-relaxed text-justify sm:text-center font-sans">
              <p>
                Halo sahabat, keluarga, dan teman-teman tercinta!
              </p>
              <p>
                Tak terasa langkah kecilku kini telah tiba di angka tujuh belas. Tujuh belas tahun penuh dengan tawa, impian, dan jutaan memori berharga yang tak akan pernah kulupakan.
              </p>
              <p>
                Di momen yang sangat istimewa ini, aku ingin mengundang kalian semua untuk hadir, bernyanyi, berdansa, dan merayakan malam penuh keajaiban ini bersamaku. Kehadiran dan senyuman kalian adalah kado paling berharga di ulang tahunku.
              </p>
            </div>

            <div className="pt-4 space-y-1">
              <p className="text-xs font-mono text-stone-500 tracking-wider uppercase">
                DENGAN PENUH CINTA & SYUKUR,
              </p>
              <p className="font-pinyon text-4xl sm:text-5xl text-[#C25E38] pt-1">
                {celebrantShort}
              </p>
              <p className="text-xs text-stone-600 font-sans italic pt-1">
                {parentsName}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: MILESTONE SCRAPBOOK (GROWING UP PHOTO STRIP) */}
        <section className="px-4 sm:px-8 md:px-12 py-12 sm:py-16 border-b border-stone-200">
          <div className="text-center space-y-2 mb-8">
            <span className="text-[11px] font-mono text-[#C25E38] tracking-widest uppercase font-semibold">
              TIME CAPSULE MEMORIES
            </span>
            <h2 className="font-serif italic text-3xl sm:text-4xl font-bold text-[#1C1917]">
              Growing Up Photo Strip
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-serif italic max-w-md mx-auto">
              Perjalanan dari seorang pemimpi cilik hingga melangkah anggun di babak ke-17. Ketuk foto untuk memperbesar momen.
            </p>
          </div>

          {/* 4-Stage Photo Strip Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {MILESTONE_CHAPTERS.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhotoIdx(idx)}
                className="group relative bg-white p-3.5 pb-5 rounded-2xl shadow-md border border-stone-200 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                {/* Washi tape header */}
                <div className="absolute -top-2.5 left-6 px-3 py-0.5 bg-[#FEF3C7] border border-dashed border-[#F59E0B]/60 text-[9px] font-mono text-[#92400E] uppercase tracking-wider shadow-2xs">
                  {item.chapter}
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100">
                  <img
                    src={item.src}
                    alt={item.ageTag}
                    className="w-full h-full object-cover object-center filter sepia-[0.08] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xs text-xs font-mono flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Buka Foto</span>
                    </span>
                  </div>
                </div>

                <div className="pt-3 text-left">
                  <div className="flex items-center justify-between">
                    <p className="font-serif italic font-bold text-sm text-[#C25E38]">
                      {item.ageTag}
                    </p>
                    <Bookmark className="w-3.5 h-3.5 text-[#D97706]" aria-hidden="true" />
                  </div>
                  <p className="text-xs text-stone-600 font-sans mt-1 leading-snug line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Lightbox for Milestone Photos */}
          {selectedPhotoIdx !== null && (
            <div
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedPhotoIdx(null)}
            >
              <div
                className="relative max-w-xl w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl text-stone-900 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelectedPhotoIdx(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-800 transition-colors"
                  aria-label="Tutup pratinjau foto"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
                  <img
                    src={MILESTONE_CHAPTERS[selectedPhotoIdx].src}
                    alt={MILESTONE_CHAPTERS[selectedPhotoIdx].ageTag}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="pt-4 text-left">
                  <div className="inline-block px-2.5 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] font-mono text-[10px] uppercase font-bold tracking-wider mb-1">
                    {MILESTONE_CHAPTERS[selectedPhotoIdx].chapter}
                  </div>
                  <h3 className="font-serif italic text-xl font-bold text-[#C25E38]">
                    {MILESTONE_CHAPTERS[selectedPhotoIdx].ageTag}
                  </h3>
                  <p className="text-stone-700 text-xs sm:text-sm font-sans mt-1 leading-relaxed">
                    {MILESTONE_CHAPTERS[selectedPhotoIdx].caption}
                  </p>
                </div>

                {/* Lightbox Navigation */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPhotoIdx((prev) =>
                        prev !== null && prev > 0 ? prev - 1 : MILESTONE_CHAPTERS.length - 1
                      )
                    }
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-mono text-stone-700 hover:bg-stone-50"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    <span>Sebelumnya</span>
                  </button>

                  <span className="text-xs font-mono text-stone-500">
                    {selectedPhotoIdx + 1} / {MILESTONE_CHAPTERS.length}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPhotoIdx((prev) =>
                        prev !== null && prev < MILESTONE_CHAPTERS.length - 1 ? prev + 1 : 0
                      )
                    }
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-mono text-stone-700 hover:bg-stone-50"
                  >
                    <span>Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 4: FLIP COUNTDOWN CLOCK & CALENDAR EXPORT */}
        <section className="px-4 sm:px-8 md:px-12 py-12 sm:py-16 bg-[#F5EFE6]/60 border-b border-stone-200">
          <div className="max-w-xl mx-auto text-center space-y-3">
            <span className="text-[11px] font-mono text-[#D97706] tracking-widest uppercase font-semibold">
              COUNTDOWN TO THE BIG NIGHT
            </span>
            <h2 className="font-serif italic text-3xl sm:text-4xl font-bold text-[#1C1917]">
              Party Countdown Clock
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Menghitung setiap detik menuju momen tiup lilin dan malam pesta tujuh belasan.
            </p>

            {/* Flip Countdown Block Grid */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 pt-4 max-w-md mx-auto">
              <div className="bg-white border-2 border-[#E7DFD5] rounded-2xl p-3 sm:p-4 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#C25E38]">
                  {String(countdown.days).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-stone-500 uppercase mt-1">
                  Hari
                </div>
              </div>
              <div className="bg-white border-2 border-[#E7DFD5] rounded-2xl p-3 sm:p-4 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#C25E38]">
                  {String(countdown.hours).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-stone-500 uppercase mt-1">
                  Jam
                </div>
              </div>
              <div className="bg-white border-2 border-[#E7DFD5] rounded-2xl p-3 sm:p-4 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#C25E38]">
                  {String(countdown.minutes).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-stone-500 uppercase mt-1">
                  Menit
                </div>
              </div>
              <div className="bg-white border-2 border-[#E7DFD5] rounded-2xl p-3 sm:p-4 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#C25E38]">
                  {String(countdown.seconds).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-stone-500 uppercase mt-1">
                  Detik
                </div>
              </div>
            </div>

            {/* Calendar Export Button */}
            <div className="pt-6">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C1917] text-white hover:bg-stone-800 transition-colors text-xs font-mono tracking-wider uppercase font-semibold shadow-md"
              >
                <Calendar className="w-4 h-4 text-[#F59E0B]" aria-hidden="true" />
                <span>Simpan Ke Google Calendar</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 5: FESTIVAL RUNDOWN (VIP PERFORATED TICKET STUBS) */}
        <section className="px-4 sm:px-8 md:px-12 py-12 sm:py-16 border-b border-stone-200">
          <div className="text-center space-y-2 mb-8">
            <span className="text-[11px] font-mono text-[#C25E38] tracking-widest uppercase font-semibold">
              FESTIVAL TIMETABLE
            </span>
            <h2 className="font-serif italic text-3xl sm:text-4xl font-bold text-[#1C1917]">
              VIP Ticket Rundown
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto">
              Susunan kemeriahan pesta dari kedatangan di karpet merah hingga dentuman DJ set.
            </p>
          </div>

          {/* Ticket Stubs Stack */}
          <div className="max-w-xl mx-auto space-y-4">
            {PARTY_RUNDOWN.map((item, idx) => (
              <div
                key={idx}
                className="relative bg-white border-2 border-dashed border-[#D97706]/40 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 overflow-hidden"
              >
                {/* Left Cutout Circle */}
                <div className="hidden sm:block absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FBF8F3] border-r-2 border-[#D97706]/40" />
                {/* Right Cutout Circle */}
                <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FBF8F3] border-l-2 border-[#D97706]/40" />

                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-xl bg-[#FEF3C7] border border-[#F59E0B]/50 text-[#92400E] font-mono text-xs font-bold shrink-0">
                    {item.time}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600 uppercase font-semibold">
                        {item.badge}
                      </span>
                      <h4 className="font-serif italic font-bold text-sm sm:text-base text-[#1C1917]">
                        {item.label}
                      </h4>
                    </div>
                    <p className="text-xs text-stone-600 font-sans mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="self-end sm:self-center shrink-0">
                  <Ticket className="w-5 h-5 text-[#C25E38]/60" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: INTERACTIVE DRESS CODE GUIDE */}
        <section className="px-4 sm:px-8 md:px-12 py-12 sm:py-16 bg-[#F5EFE6]/70 border-b border-stone-200">
          <div className="max-w-xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#4D6A56]/30 rounded-full text-[11px] font-mono text-[#4D6A56] uppercase tracking-wider font-semibold">
              <Shirt className="w-3.5 h-3.5 text-[#4D6A56]" aria-hidden="true" />
              <span>OOTD PALETTE GUIDE</span>
            </div>

            <h2 className="font-serif italic text-3xl sm:text-4xl font-bold text-[#1C1917]">
              Dress Code & Color Swatches
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto">
              Kenakan outfit ternyamanmu dengan sentuhan tema <strong className="text-[#C25E38]">Retro Chic, 90s/Y2K Glam, atau Smart Casual</strong>.
            </p>

            {/* Swatch Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4">
              {DRESSCODE_SWATCHES.map((swatch, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-2xl shadow-xs border border-stone-200/90 flex flex-col items-center space-y-2 text-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full ${swatch.bgClass} shadow-inner border-2 border-white`}
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <div>
                    <p className="text-[11px] font-semibold text-stone-800 leading-tight">
                      {swatch.name}
                    </p>
                    <p className="text-[10px] font-mono text-stone-500 uppercase mt-0.5">
                      {swatch.hex}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-stone-500 font-mono italic pt-2">
              *Disarankan menghindari warna neon terang agar selaras dengan nuansa foto retro pesta
            </p>
          </div>
        </section>

        {/* SECTION 7: VENUE & GOOGLE MAPS NAVIGATION */}
        <section className="px-4 sm:px-8 md:px-12 py-12 sm:py-16 border-b border-stone-200">
          <div className="max-w-xl mx-auto text-center space-y-3">
            <span className="text-[11px] font-mono text-[#C25E38] tracking-widest uppercase font-semibold">
              PARTY LOCATION
            </span>
            <h2 className="font-serif italic text-3xl sm:text-4xl font-bold text-[#1C1917]">
              Venue & Directions
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Lokasi rooftop nyaman dengan pemandangan gemerlap kota Jakarta.
            </p>

            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-lg border border-stone-200 text-left space-y-4 mt-6">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-[#FEF3C7] text-[#92400E] shrink-0">
                  <MapPin className="w-6 h-6 text-[#D97706]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif italic font-bold text-lg sm:text-xl text-[#1C1917]">
                    {venueText}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans mt-0.5 leading-relaxed">
                    {addressText}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#C25E38] mt-2 font-semibold">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{dateText} • {timeText}</span>
                  </div>
                </div>
              </div>

              {/* Map Preview Button */}
              <div className="pt-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#C25E38] via-[#D97706] to-[#C25E38] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-98 transition-all"
                >
                  <Navigation className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>Buka Petunjuk Arah Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: VIP RSVP FORM WITH DJ SONG REQUEST */}
        <section className="px-4 sm:px-8 md:px-12 py-12 sm:py-16 bg-[#F5EFE6]/70 border-b border-stone-200">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#D97706]/30 rounded-full text-[11px] font-mono text-[#92400E] uppercase tracking-wider font-semibold">
                <Radio className="w-3.5 h-3.5 text-[#D97706]" aria-hidden="true" />
                <span>VIP RSVP & DJ SONG REQUEST</span>
              </div>
              <h2 className="font-serif italic text-3xl sm:text-4xl font-bold text-[#1C1917]">
                Konfirmasi Kehadiran
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                Mohon konfirmasikan kehadiranmu untuk reservasi kursi VIP dan request lagu pesta kesukaanmu.
              </p>
            </div>

            <form
              onSubmit={handleSubmitRsvp}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 space-y-4"
            >
              {/* Guest Name */}
              <div>
                <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Nama Tamu / Sahabat *
                </label>
                <input
                  type="text"
                  required
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Contoh: Nadia Salsabila & Teman"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C25E38] text-sm text-stone-800"
                />
              </div>

              {/* Attendance Options */}
              <div>
                <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Konfirmasi Kehadiran *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttendance('hadir')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      attendance === 'hadir'
                        ? 'bg-[#C25E38] text-white border-[#C25E38] shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Hadir 🎉
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('ragu')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      attendance === 'ragu'
                        ? 'bg-[#D97706] text-white border-[#D97706] shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Masih Ragu 🤔
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('tidak')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      attendance === 'tidak'
                        ? 'bg-stone-800 text-white border-stone-800 shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Berhalangan 💌
                  </button>
                </div>
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Jumlah Kehadiran
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C25E38] text-sm text-stone-800 bg-white"
                >
                  <option value="1 Orang">1 Orang (Sendiri)</option>
                  <option value="2 Orang">2 Orang (+1 Pendamping / Sahabat)</option>
                  <option value="3 Orang">3 Orang (+2 Sahabat)</option>
                </select>
              </div>

              {/* EXCLUSIVE FEATURE: DJ SONG REQUEST */}
              <div className="p-4 rounded-2xl bg-[#FEF3C7]/60 border border-[#F59E0B]/40 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Disc3 className="w-4 h-4 text-[#D97706] animate-spin" aria-hidden="true" />
                  <label className="text-xs font-mono font-bold text-[#92400E] uppercase tracking-wider">
                    Request Lagu Pesta untuk Diputar DJ
                  </label>
                </div>
                <input
                  type="text"
                  value={songRequest}
                  onChange={(e) => setSongRequest(e.target.value)}
                  placeholder="Misal: Nadhif Basalamah - Penjaga Hati / Taylor Swift"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F59E0B]/50 bg-white focus:outline-none focus:ring-2 focus:ring-[#D97706] text-xs text-stone-800"
                />
                <p className="text-[10px] text-[#92400E]/80 font-mono">
                  *Lagu pilihanmu akan dimasukkan ke dalam DJ Playlist malam pesta!
                </p>
              </div>

              {/* Birthday Message */}
              <div>
                <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Ucapan & Doa Ulang Tahun *
                </label>
                <textarea
                  required
                  rows={3}
                  value={blessingMessage}
                  onChange={(e) => setBlessingMessage(e.target.value)}
                  placeholder="Tulis ucapan selamat ulang tahun ke-17 untuk Aurelia..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C25E38] text-sm text-stone-800"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1C1917] text-white hover:bg-stone-800 font-sans font-bold text-xs uppercase tracking-wider shadow-md active:scale-98 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#F59E0B]" aria-hidden="true" />
                <span>Kirim RSVP & Doa Ulang Tahun</span>
              </button>
            </form>
          </div>
        </section>

        {/* SECTION 9: PINNED POLAROID WISHES WALL (GUESTBOOK) */}
        <section className="px-4 sm:px-8 md:px-12 py-12 sm:py-16 border-b border-stone-200">
          <div className="text-center space-y-2 mb-8">
            <span className="text-[11px] font-mono text-[#C25E38] tracking-widest uppercase font-semibold">
              POLAROID GUESTBOOK
            </span>
            <h2 className="font-serif italic text-3xl sm:text-4xl font-bold text-[#1C1917]">
              Wishes & Song Requests Wall
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto">
              Kumpulan doa manis, ucapan selamat, dan lagu-lagu pilihan dari para tamu istimewa.
            </p>
          </div>

          <div className="max-w-xl mx-auto space-y-4">
            {wishes.map((item) => (
              <div
                key={item.id}
                className="relative bg-white p-5 rounded-2xl shadow-sm border border-stone-200 text-left hover:shadow-md transition-shadow"
              >
                {/* Thumbtack / Pin Badge */}
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base select-none shrink-0">📌</span>
                    <div className="min-w-0">
                      <h4 className="font-serif italic font-bold text-sm text-stone-900 break-words">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-mono text-stone-400">
                        {item.time}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-semibold shrink-0 ${
                      item.attendance === 'hadir'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.attendance === 'ragu'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {item.attendance === 'hadir'
                      ? 'Pasti Hadir 🎉'
                      : item.attendance === 'ragu'
                      ? 'Masih Ragu'
                      : 'Berhalangan'}
                  </span>
                </div>

                {/* Song Request Pill */}
                {item.songRequest && (
                  <div className="my-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-[11px] font-mono font-medium max-w-full">
                    <Music className="w-3 h-3 text-[#D97706] shrink-0" aria-hidden="true" />
                    <span className="break-words">DJ Song: {item.songRequest}</span>
                  </div>
                )}

                {/* Message */}
                <p className="text-xs sm:text-sm text-stone-700 font-sans mt-2 leading-relaxed italic break-words">
                  "{item.message}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10: DIGITAL BIRTHDAY GIFT & WISHLIST */}
        <section className="px-4 sm:px-8 md:px-12 py-12 sm:py-16 bg-[#F5EFE6]/70 border-b border-stone-200">
          <div className="max-w-xl mx-auto space-y-4 text-center">
            <span className="text-[11px] font-mono text-[#D97706] tracking-widest uppercase font-semibold">
              BIRTHDAY BLESSING
            </span>
            <h2 className="font-serif italic text-3xl sm:text-4xl font-bold text-[#1C1917]">
              Digital Gift & Wishlist
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto">
              Doa restu Anda adalah kado paling istimewa. Namun jika ingin memberikan tanda kasih secara digital atau mengirimkan kado fisik, silakan gunakan opsi di bawah ini.
            </p>

            {/* Tab Buttons */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveGiftTab('bank')}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                  activeGiftTab === 'bank'
                    ? 'bg-[#C25E38] text-white shadow-md'
                    : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
                }`}
              >
                Transfer Digital Angpao
              </button>
              <button
                type="button"
                onClick={() => setActiveGiftTab('physical')}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                  activeGiftTab === 'physical'
                    ? 'bg-[#C25E38] text-white shadow-md'
                    : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
                }`}
              >
                Kirim Kado Fisik
              </button>
            </div>

            {/* TAB CONTENT A: BANK ACCOUNTS */}
            {activeGiftTab === 'bank' && (
              <div className="space-y-3 pt-4 text-left">
                {accounts.map((acc, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-stone-100 text-stone-700 font-bold uppercase">
                        {acc.bank}
                      </span>
                      <p className="font-mono text-base sm:text-lg font-bold text-stone-900 mt-1 tracking-wider">
                        {acc.accountNumber}
                      </p>
                      <p className="text-xs text-stone-500 font-sans">
                        a.n. {acc.accountHolder}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(acc.accountNumber, acc.bank)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-mono font-semibold transition-colors shrink-0"
                    >
                      {copiedBank === acc.bank ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                          <span className="text-emerald-700">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Salin No. Rekening</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT B: PHYSICAL PARCEL & WISHLIST INSPIRATION */}
            {activeGiftTab === 'physical' && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 text-left space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-2xl bg-[#FEF3C7] text-[#92400E] shrink-0">
                    <Package className="w-5 h-5 text-[#D97706]" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-serif italic font-bold text-base text-stone-900">
                      Alamat Pengiriman Kado Fisik
                    </h4>
                    <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">
                      {physicalAddress}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(physicalAddress, 'Alamat Kado', true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-mono font-semibold transition-colors"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                      <span className="text-emerald-700">Alamat Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>Salin Alamat Lengkap</span>
                    </>
                  )}
                </button>

                <div className="pt-2 border-t border-stone-100">
                  <p className="text-[11px] font-mono font-bold text-stone-600 uppercase tracking-wider mb-2">
                    Inspirasi Kado Wishlist Favorit Aurelia:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Buku Sastra & Puisi', 'Kamera Analog 35mm', 'Piringan Hitam Vinyl Indie', 'Floral Eau de Parfum', 'Art Supplies / Sketchbook'].map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-[#FEF3C7]/80 text-[#92400E] font-mono text-[10px] font-medium"
                      >
                        ✨ {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 11: EDITORIAL BACK COVER COLOPHON & FOOTER */}
        <footer className="px-4 sm:px-8 md:px-12 py-10 bg-[#1C1917] text-[#FBF8F3] text-center space-y-4">
          <div className="space-y-1">
            <h3 className="font-serif italic text-2xl font-bold tracking-wider text-[#C25E38]">
              THE SEVENTEEN ISSUE
            </h3>
            <p className="text-[11px] font-mono text-stone-400 tracking-widest uppercase">
              ARCHIVE EDITION • AURELIA CLARISSA • 2027
            </p>
          </div>

          <p className="text-xs text-stone-400 font-sans max-w-sm mx-auto leading-relaxed">
            Terima kasih atas doa, cinta, dan kehadiran Anda dalam mengukir memori manis di babak ke-17 ini.
          </p>

          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-stone-500 gap-2">
            <span>© 2027 AURELIA CLARISSA. ALL RIGHTS RESERVED.</span>
            <span>POWERED BY JANJISUCI.ID</span>
          </div>
        </footer>

        {/* 12. FLOATING VINYL AUDIO PLAYER (MOBILE & RESPONSIVE <1024px) */}
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <button
            type="button"
            onClick={onToggleAudio}
            aria-label={isPlayingAudio ? 'Jeda Musik Pesta' : 'Putar Musik Pesta'}
            className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-full bg-[#1C1917]/95 border-2 border-[#D97706]/50 text-white shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="relative flex items-center justify-center">
              <Disc3
                className={`w-7 h-7 text-[#F59E0B] ${isPlayingAudio ? 'animate-spin' : ''}`}
                style={{ animationDuration: '4s' }}
                aria-hidden="true"
              />
              <div className="absolute w-2 h-2 rounded-full bg-[#C25E38]" />
            </div>
            <div className="text-left font-mono">
              <p className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider truncate max-w-[120px]">
                {activeTrack?.title || 'Penjaga Hati'}
              </p>
              <p className="text-[8px] text-stone-400">
                {isPlayingAudio ? 'Putar Musik' : 'Jeda Musik'}
              </p>
            </div>
          </button>
        </div>
      </main>
    </div>
  )
}
