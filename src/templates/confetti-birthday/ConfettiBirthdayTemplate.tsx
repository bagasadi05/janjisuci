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
  Gift,
  X,
  ZoomIn,
  Package,
  Music,
  VolumeX,
  MapPin,
  PartyPopper,
  Shirt
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { ConfettiBirthdayCoverScreen } from './ConfettiBirthdayCoverScreen'
import { ConfettiBirthdayDesktopShowcase } from './ConfettiBirthdayDesktopShowcase'
import { useToast } from '../../components/Toast'

const BIRTHDAY_PHOTOS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1544155891-969f15a055d3?auto=format&fit=crop&w=1200&q=85',
    caption: 'Momen Penuh Senyum & Doa Ulang Tahun'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=1200&q=85',
    caption: 'Kue Ulang Tahun Mewah Penuh Harapan'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=85',
    caption: 'Hujan Confetti & Warna-Warni Pesta'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85',
    caption: 'Balon Ceria Bersama Teman & Keluarga'
  }
]

export const ConfettiBirthdayTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack
}) => {
  const { showToast } = useToast()

  const targetDateStr = '2027-08-15T15:00:00+07:00'
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

  const [copiedBank, setCopiedBank] = useState<string | null>(null)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null)

  const [guestNameInput, setGuestNameInput] = useState('')
  const [attendance, setAttendance] = useState<'hadir' | 'tidak' | 'ragu'>('hadir')
  const [childCount, setChildCount] = useState<number>(1)
  const [blessingMessage, setBlessingMessage] = useState('')
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'Tante Jessica & Kenzo',
      attendance: 'hadir',
      message: 'Happy 5th Birthday Hayden! Semoga sehat selalu, tambah pintar, dan ceria selalu yaa. Kenzo gak sabar main bareng di pesta!',
      time: '2 jam yang lalu'
    },
    {
      id: 2,
      name: 'Om Daniel & Tante Sarah',
      attendance: 'hadir',
      message: 'Selamat ulang tahun Hayden tersayang! Tumbuhlah jadi anak hebat dan kebanggaan papa mama.',
      time: '5 jam yang lalu'
    }
  ])

  const [guestName, setGuestName] = useState('Sahabat Ceria')
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const to = params.get('to') || params.get('u') || params.get('guest')
    if (to) setGuestName(to)
  }, [])

  const handleBurstConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    })
  }

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

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestNameInput.trim()) {
      showToast('Mohon masukkan nama Anda', 'info')
      return
    }
    if (!blessingMessage.trim()) {
      showToast('Mohon tulis ucapan ulang tahun', 'info')
      return
    }

    setWishes([
      {
        id: Date.now(),
        name: guestNameInput.trim(),
        attendance,
        message: blessingMessage.trim(),
        time: 'Baru saja'
      },
      ...wishes
    ])
    setGuestNameInput('')
    setBlessingMessage('')
    handleBurstConfetti()
    showToast('Terima kasih atas ucapan manis dan konfirmasinya! 🎉', 'success')
  }

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col lg:flex-row relative selection:bg-pink-500 selection:text-white font-sans">
      {!isOpened && (
        <ConfettiBirthdayCoverScreen
          onOpen={onOpenWithAudio}
          guestName={guestName}
          celebrantName="Hayden Arvy"
          ageText="Turning 5th Birthday!"
          dateText="Sabtu, 15 Agustus 2026"
        />
      )}

      <ConfettiBirthdayDesktopShowcase
        celebrantName="Hayden Arvy"
        dateText="Sabtu, 15 Agustus 2026"
        venueText="Fun World Ballroom, Mall Kelapa Gading Jakarta"
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
        activeTrack={activeTrack}
        targetDate={targetDateStr}
      />

      <main className="w-full lg:w-7/12 min-h-screen pb-24 overflow-x-hidden relative z-10">
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <button
            onClick={onToggleAudio}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-amber-300 text-white flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)] active:scale-95 transition-transform cursor-pointer"
          >
            {isPlayingAudio ? (
              <Music className="w-5 h-5 animate-spin" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* SECTION 1: HERO */}
        <section className="relative px-6 pt-16 pb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-mono uppercase tracking-widest mb-3">
            <PartyPopper className="w-3.5 h-3.5 text-pink-400" />
            <span>It&apos;s Party Time! 🎈</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-sky-300 font-bold tracking-wide">
            Hayden Arvy
          </h1>
          <div className="inline-block px-4 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-200 text-sm font-bold font-mono mt-2">
            Turning 5th Birthday Party!
          </div>

          <p className="text-xs font-mono tracking-widest text-slate-300 mt-2">
            Sabtu, 15 Agustus 2026
          </p>

          <div className="relative my-8">
            <div className="w-56 sm:w-64 h-64 sm:h-76 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-pink-500 via-amber-400 to-sky-400 shadow-2xl">
              <img
                src={template?.heroImage || "https://images.unsplash.com/photo-1544155891-969f15a055d3?auto=format&fit=crop&w=800&q=85"}
                alt="Birthday Celebrant"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
            </div>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-slate-200 leading-relaxed font-sans px-4">
            Halo sahabat dan keluarga tersayang! Yuk datang dan meriahkan pesta ulang tahun ke-5 Hayden dengan permainan seru, balon warna-warni, dan kue ulang tahun lezat!
          </p>
        </section>

        {/* SECTION 2: DRESSCODE & JADWAL */}
        <section className="px-6 py-10">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="rounded-2xl bg-gradient-to-r from-pink-950/60 via-slate-900 to-sky-950/60 border border-pink-400/25 p-5 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-pink-500/20 border border-pink-400/30 flex items-center justify-center mx-auto text-pink-300">
                <Shirt className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-white">Dresscode Pesta</h3>
              <p className="text-xs text-pink-200 font-mono font-semibold">
                Colourful Casual / Superhero &amp; Princess
              </p>
              <p className="text-[11px] text-slate-300 italic">
                Kenakan pakaian ceria dan ternyaman untuk bermain bersama!
              </p>
            </div>

            <div className="rounded-2xl bg-[#1E293B]/90 border border-slate-700 p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-amber-100 font-bold">
                      Pesta &amp; Tiup Lilin
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">Fun &amp; Games Celebration</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30">
                  Party 🎉
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-200 font-sans">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Sabtu, 15 Agustus 2026</p>
                    <p className="text-slate-400 text-xs">Pukul 15.00 – 18.00 WIB</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Fun World Ballroom</p>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Mall Kelapa Gading 3 Lt. 3, Jl. Boulevard Raya, Kelapa Gading, Jakarta Utara
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href="https://maps.google.com/?q=Mall+Kelapa+Gading+3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600/30 hover:bg-pink-600/50 border border-pink-400/30 text-xs text-white font-medium transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 text-pink-300" />
                  <span>Petunjuk Peta Maps</span>
                </a>
                <a
                  href="https://calendar.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-slate-200 hover:text-white transition-all"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Simpan Kalender</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: COUNTDOWN */}
        <section className="px-6 py-10">
          <div className="max-w-lg mx-auto text-center space-y-6">
            <h2 className="text-2xl font-serif text-white font-bold">Menuju Hari Pesta</h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              <div className="bg-[#1E293B]/90 border border-slate-700 rounded-xl p-3 shadow-lg">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-pink-300">{timeLeft.days}</div>
                <div className="text-[11px] text-slate-400 font-sans uppercase mt-1">Hari</div>
              </div>
              <div className="bg-[#1E293B]/90 border border-slate-700 rounded-xl p-3 shadow-lg">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-pink-300">{timeLeft.hours}</div>
                <div className="text-[11px] text-slate-400 font-sans uppercase mt-1">Jam</div>
              </div>
              <div className="bg-[#1E293B]/90 border border-slate-700 rounded-xl p-3 shadow-lg">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-pink-300">{timeLeft.minutes}</div>
                <div className="text-[11px] text-slate-400 font-sans uppercase mt-1">Menit</div>
              </div>
              <div className="bg-[#1E293B]/90 border border-slate-700 rounded-xl p-3 shadow-lg">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-pink-300">{timeLeft.seconds}</div>
                <div className="text-[11px] text-slate-400 font-sans uppercase mt-1">Detik</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: GALERI FOTO */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono tracking-widest uppercase text-pink-300">
                Momen Seru
              </span>
              <h2 className="text-3xl font-serif text-white font-bold">Galeri Ceria Hayden</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {BIRTHDAY_PHOTOS.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIdx(idx)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-slate-700 h-40 sm:h-48"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: KADO ULANG TAHUN */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono tracking-widest uppercase text-pink-300">
                Tanda Kasih
              </span>
              <h2 className="text-3xl font-serif text-white font-bold">Kado Ulang Tahun</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed pt-1">
                Kehadiran dan tawa ceria teman-teman adalah kado terindah bagi Hayden! Apabila ingin mengirimkan hadiah mainan/buku atau tabungan kado anak:
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-tr from-[#1E293B] to-[#0F172A] border border-slate-700 p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="px-3 py-1 rounded-md bg-blue-600/40 border border-blue-400/30 text-white font-bold text-xs tracking-wider">
                  BANK BCA
                </div>
                <CreditCard className="w-5 h-5 text-amber-300/80" />
              </div>
              <p className="text-[11px] text-slate-400 font-mono uppercase">Nomor Rekening Tabungan</p>
              <p className="text-lg sm:text-xl font-mono font-bold text-pink-300 tracking-wider">
                5420199281
              </p>
              <p className="text-xs text-slate-300">a.n. Kevin Kusuma (Papa Hayden)</p>
              <button
                onClick={() => handleCopy('5420199281', 'Rekening BCA')}
                className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedBank === 'Rekening BCA' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-pink-300" />
                    <span>Salin Nomor Rekening</span>
                  </>
                )}
              </button>
            </div>

            <div className="rounded-2xl bg-[#1E293B]/80 border border-slate-700 p-5 shadow-lg space-y-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-pink-400" />
                <h4 className="text-base font-serif text-white font-semibold">Kirim Kado Mainan/Buku</h4>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-white">Penerima: Hayden Arvy (0896-1977-4116)</p>
                <p className="leading-relaxed">
                  Jl. Boulevard Bukit Gading Raya No. 18, Kelapa Gading Barat, Jakarta Utara
                </p>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    'Jl. Boulevard Bukit Gading Raya No. 18, Kelapa Gading Barat, Jakarta Utara (Penerima: Hayden Arvy - 089619774116)',
                    'Alamat Rumah',
                    true
                  )
                }
                className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Alamat Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-pink-300" />
                    <span>Salin Alamat Kirim Kado</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 6: RSVP */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono tracking-widest uppercase text-pink-300">
                Konfirmasi Kehadiran
              </span>
              <h2 className="text-3xl font-serif text-white font-bold">RSVP &amp; Ucapan Pesta</h2>
            </div>

            <form
              onSubmit={handleSubmitRsvp}
              className="rounded-2xl bg-[#1E293B]/90 border border-slate-700 p-5 sm:p-6 shadow-xl space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nama Tamu / Sahabat
                </label>
                <input
                  type="text"
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Contoh: Tante Jessica &amp; Kenzo"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-pink-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Konfirmasi Kehadiran
                  </label>
                  <select
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value as 'hadir' | 'tidak' | 'ragu')}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white text-xs focus:outline-none focus:border-pink-400"
                  >
                    <option value="hadir">Pasti Hadir! 🎉</option>
                    <option value="ragu">Masih Ragu</option>
                    <option value="tidak">Maaf Berhalangan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Jumlah Anak Ikut Serta
                  </label>
                  <select
                    value={childCount}
                    onChange={(e) => setChildCount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white text-xs focus:outline-none focus:border-pink-400"
                  >
                    <option value={1}>1 Anak</option>
                    <option value={2}>2 Anak</option>
                    <option value={3}>3 Anak</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Ucapan Ulang Tahun Untuk Hayden
                </label>
                <textarea
                  rows={3}
                  value={blessingMessage}
                  onChange={(e) => setBlessingMessage(e.target.value)}
                  placeholder="Tuliskan ucapan selamat ulang tahun untuk Hayden..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-pink-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-amber-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-white" />
                <span>Kirim Ucapan &amp; Konfirmasi 🎉</span>
              </button>
            </form>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase tracking-wider text-pink-300 font-mono font-medium">
                Pesan Sahabat ({wishes.length})
              </h4>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {wishes.map((w) => (
                  <div
                    key={w.id}
                    className="rounded-xl bg-[#1E293B]/70 border border-slate-700/80 p-4 shadow-sm space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-white">{w.name}</span>
                      <span className="text-[10px] text-slate-400">{w.time}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">{w.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FOOTER */}
        <footer className="px-6 pt-10 pb-16 text-center space-y-4">
          <h3 className="text-2xl font-serif text-pink-300 font-bold">Hayden Arvy</h3>
          <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
            Terima kasih banyak atas kehadiran, kado, dan doa ceria dari semua sahabat dan keluarga tersayang!
          </p>
          <p className="text-[11px] text-slate-500 pt-4 border-t border-slate-800 font-mono">
            Digital Invitation by JanjiSuci.id
          </p>
        </footer>
      </main>

      {/* LIGHTBOX */}
      {selectedPhotoIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhotoIdx(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-3xl max-h-[85vh] flex flex-col items-center">
            <img
              src={BIRTHDAY_PHOTOS[selectedPhotoIdx].src}
              alt={BIRTHDAY_PHOTOS[selectedPhotoIdx].caption}
              className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <p className="text-sm font-serif text-pink-300 mt-3 text-center px-4">
              {BIRTHDAY_PHOTOS[selectedPhotoIdx].caption}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
