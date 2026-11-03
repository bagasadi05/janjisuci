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
  VolumeX,
  MapPin
} from 'lucide-react'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { LittleStarAqiqahCoverScreen } from './LittleStarAqiqahCoverScreen'
import { LittleStarAqiqahDesktopShowcase } from './LittleStarAqiqahDesktopShowcase'
import { useToast } from '../../components/Toast'

const AQIQAH_PHOTOS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1656633702381-939966720da4?auto=format&fit=crop&w=1200&q=85',
    caption: 'Malaikat Kecil Penyejuk Hati Ayah & Bunda'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1641222113497-f1904803f654?auto=format&fit=crop&w=1200&q=85',
    caption: 'Tidur Lelap Penuh Ketenangan & Rahmat'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=85',
    caption: 'Kelembutan Selimut & Hangat Kasih Sayang'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1200&q=85',
    caption: 'Doa Keberkahan & Keshalihan Ananda'
  }
]

export const LittleStarAqiqahTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack
}) => {
  const { showToast } = useToast()

  const targetDateStr = '2027-05-24T09:00:00+07:00'
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
  const [blessingMessage, setBlessingMessage] = useState('')
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'Bude Haryani & Keluarga',
      attendance: 'hadir',
      message: 'Alhamdulillah selamat atas aqiqah baby Kinan! Semoga menjadi anak yang sholehah, penyejuk hati orang tua, dan pembawa berkah dunia akhirat. Aamiin.',
      time: '1 jam yang lalu'
    },
    {
      id: 2,
      name: 'Keluarga Bpk. Dimas Pratama',
      attendance: 'hadir',
      message: 'Selamat untuk Irfan & Annisa. Semoga ananda tumbuh sehat, pintar, dan bahagia selalu!',
      time: '4 jam yang lalu'
    }
  ])

  const [guestName, setGuestName] = useState('Tamu Terhormat')
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const to = params.get('to') || params.get('u') || params.get('guest')
    if (to) setGuestName(to)
  }, [])

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
      showToast('Mohon tulis ucapan atau doa untuk bayi', 'info')
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
    showToast('Terima kasih atas doa dan konfirmasinya! 👶', 'success')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col lg:flex-row relative selection:bg-sky-500 selection:text-white font-sans">
      <LittleStarAqiqahCoverScreen
        isOpen={isOpened}
        onOpenWithAudio={onOpenWithAudio}
        guestName={guestName}
        babyName="Kinan Althafunnisa"
        dateText="Minggu, 24 Mei 2026"
      />

      <LittleStarAqiqahDesktopShowcase
        babyName="Kinan Althafunnisa"
        dateText="Minggu, 24 Mei 2026"
        venueText="Kediaman Keluarga, Jl. Melati No. 12, Bandung"
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
        activeTrack={activeTrack}
        targetDate={targetDateStr}
      />

      <main className="w-full lg:w-7/12 min-h-screen pb-24 overflow-x-hidden relative z-10">
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <button
            onClick={onToggleAudio}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(2,132,199,0.4)] active:scale-95 transition-transform cursor-pointer"
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
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-300/60 text-sky-800 text-xs font-serif uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Tasyakuran Aqiqah &amp; Tasmiyah</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-slate-800 font-bold tracking-wide">
            Kinan Althafunnisa
          </h1>

          <p className="text-xs font-mono tracking-widest text-slate-500 mt-2">
            Minggu, 24 Mei 2026
          </p>

          <div className="relative my-8">
            <div className="w-52 sm:w-60 h-64 sm:h-76 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-sky-300 via-amber-200 to-sky-200 shadow-xl">
              <img
                src={template?.heroImage || "https://images.unsplash.com/photo-1656633702381-939966720da4?auto=format&fit=crop&w=800&q=85"}
                alt="Baby Kinan"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-slate-600 leading-relaxed font-sans px-4">
            Bismillahirahmanirrahim. Ungkapan syukur yang mendalam atas kelahiran putri pertama kami, yang merupakan anugerah dan amanah terindah dari Allah SWT.
          </p>
        </section>

        {/* SECTION 2: DOA AQIQAH */}
        <section className="px-6 py-10">
          <div className="max-w-lg mx-auto rounded-2xl bg-white border border-sky-200 p-6 sm:p-8 text-center shadow-lg">
            <div className="w-10 h-10 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center mx-auto mb-4 text-sky-600">
              <Heart className="w-5 h-5 fill-sky-200" />
            </div>

            <p className="font-serif text-sky-800 text-sm tracking-widest uppercase mb-4 font-semibold">
              Doa Keberkahan Kelahiran Bayi
            </p>

            <blockquote className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-4">
              &ldquo;Semoga Allah memberkahimu atas anak yang dianugerahkan kepadamu, semoga engkau bersyukur kepada Sang Pemberi, semoga anak ini tumbuh dewasa dan engkau dikaruniai kebaktiannya.&rdquo;
            </blockquote>

            <span className="inline-block px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[11px] font-mono text-sky-700">
              Doa Hasan Al-Bashri
            </span>
          </div>
        </section>

        {/* SECTION 3: KARTU BIODATA BAYI */}
        <section className="px-6 py-10">
          <div className="max-w-lg mx-auto rounded-2xl bg-gradient-to-tr from-sky-50 via-white to-amber-50 border border-sky-200 p-6 shadow-md space-y-4 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-800 font-bold">
              Biodata Buah Hati
            </span>
            <h3 className="text-2xl font-serif font-bold text-slate-800">
              Kinan Althafunnisa
            </h3>

            <div className="grid grid-cols-2 gap-3 text-left pt-2">
              <div className="bg-white/80 p-3 rounded-xl border border-sky-100">
                <p className="text-[10px] text-slate-500 font-mono uppercase">Hari &amp; Tanggal Lahir</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">Minggu, 10 Mei 2026</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-sky-100">
                <p className="text-[10px] text-slate-500 font-mono uppercase">Jam Kelahiran</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">Pukul 05.15 WIB</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-sky-100">
                <p className="text-[10px] text-slate-500 font-mono uppercase">Berat Badan (BB)</p>
                <p className="text-xs font-bold text-sky-700 mt-0.5">3.200 Gram (3.2 kg)</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-sky-100">
                <p className="text-[10px] text-slate-500 font-mono uppercase">Panjang Badan (PB)</p>
                <p className="text-xs font-bold text-sky-700 mt-0.5">49 cm</p>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-600 bg-white/60 p-3 rounded-xl border border-sky-100">
              <p className="font-semibold text-sky-800">Arti Nama:</p>
              <p className="italic mt-0.5">
                &ldquo;Kinan: Tempat berlindung yang aman. Althafunnisa: Wanita yang memiliki kelembutan hati.&rdquo;
              </p>
            </div>

            <p className="text-xs text-slate-500 pt-1">
              Putri Pertama dari: <strong>Bpk. Irfan Hakim &amp; Ibu Annisa Larasati</strong>
            </p>
          </div>
        </section>

        {/* SECTION 4: JADWAL ACARA */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-serif tracking-widest uppercase text-sky-700 font-bold">
                Waktu &amp; Tempat
              </span>
              <h2 className="text-3xl font-serif text-slate-800 font-bold">Rangkaian Acara</h2>
            </div>

            <div className="rounded-2xl bg-white border border-sky-200 p-6 sm:p-7 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-slate-800 font-bold">
                      Tasyakuran &amp; Cukur Rambut
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono">Tasmiyah &amp; Ramah Tamah</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-sky-50 text-sky-700 font-semibold border border-sky-200">
                  Aqiqah
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-600 font-sans">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">Minggu, 24 Mei 2026</p>
                    <p className="text-slate-500 text-xs">Pukul 09.00 – 12.00 WIB</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">Kediaman Keluarga</p>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Jl. Melati No. 12, Kel. Cidadap, Kec. Coblong, Kota Bandung, Jawa Barat
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href="https://maps.google.com/?q=Bandung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-xs text-white font-medium transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Petunjuk Peta Maps</span>
                </a>
                <a
                  href="https://calendar.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 transition-all"
                >
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  <span>Simpan Kalender</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: COUNTDOWN */}
        <section className="px-6 py-10">
          <div className="max-w-lg mx-auto text-center space-y-6">
            <h2 className="text-2xl font-serif text-slate-800 font-bold">Hitung Mundur Acara</h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              <div className="bg-white border border-sky-200 rounded-xl p-3 shadow-md">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-sky-700">{timeLeft.days}</div>
                <div className="text-[11px] text-slate-500 font-sans uppercase mt-1">Hari</div>
              </div>
              <div className="bg-white border border-sky-200 rounded-xl p-3 shadow-md">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-sky-700">{timeLeft.hours}</div>
                <div className="text-[11px] text-slate-500 font-sans uppercase mt-1">Jam</div>
              </div>
              <div className="bg-white border border-sky-200 rounded-xl p-3 shadow-md">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-sky-700">{timeLeft.minutes}</div>
                <div className="text-[11px] text-slate-500 font-sans uppercase mt-1">Menit</div>
              </div>
              <div className="bg-white border border-sky-200 rounded-xl p-3 shadow-md">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-sky-700">{timeLeft.seconds}</div>
                <div className="text-[11px] text-slate-500 font-sans uppercase mt-1">Detik</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: GALERI FOTO */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono tracking-widest uppercase text-sky-700 font-bold">
                Album Kenangan
              </span>
              <h2 className="text-3xl font-serif text-slate-800 font-bold">Galeri Foto Bayi</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {AQIQAH_PHOTOS.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIdx(idx)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md border border-sky-100 h-40 sm:h-48"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: KADO PERLENGKAPAN BAYI */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono tracking-widest uppercase text-sky-700 font-bold">
                Tanda Kasih
              </span>
              <h2 className="text-3xl font-serif text-slate-800 font-bold">Kado Buah Hati</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed pt-1">
                Doa restu Anda adalah karunia yang paling utama. Namun jika hendak memberikan tanda kasih untuk perlengkapan bayi:
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-sky-200 p-5 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="px-3 py-1 rounded-md bg-blue-600 text-white font-bold text-xs tracking-wider">
                  BANK BCA
                </div>
                <CreditCard className="w-5 h-5 text-sky-600" />
              </div>
              <p className="text-[11px] text-slate-400 font-mono uppercase">Nomor Rekening</p>
              <p className="text-lg sm:text-xl font-mono font-bold text-sky-800 tracking-wider">
                1230491823
              </p>
              <p className="text-xs text-slate-600">a.n. Irfan Hakim (Ayah Bayi)</p>
              <button
                onClick={() => handleCopy('1230491823', 'Rekening BCA')}
                className="w-full py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs text-sky-800 font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedBank === 'Rekening BCA' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-sky-600" />
                    <span>Salin Nomor Rekening</span>
                  </>
                )}
              </button>
            </div>

            <div className="rounded-2xl bg-white border border-sky-200 p-5 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-sky-600" />
                <h4 className="text-base font-serif text-slate-800 font-semibold">Kirim Kado Perlengkapan</h4>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">Penerima: Kinan Althafunnisa / Irfan (0896-1977-4116)</p>
                <p className="leading-relaxed">
                  Jl. Melati No. 12, Kel. Cidadap, Kec. Coblong, Kota Bandung, Jawa Barat
                </p>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    'Jl. Melati No. 12, Kel. Cidadap, Kec. Coblong, Kota Bandung (Penerima: Baby Kinan / Irfan - 089619774116)',
                    'Alamat Rumah',
                    true
                  )
                }
                className="w-full py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs text-sky-800 font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Alamat Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-sky-600" />
                    <span>Salin Alamat Rumah</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 8: RSVP & BUKU TAMU */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono tracking-widest uppercase text-sky-700 font-bold">
                Untaian Doa
              </span>
              <h2 className="text-3xl font-serif text-slate-800 font-bold">RSVP &amp; Doa Untuk Bayi</h2>
            </div>

            <form
              onSubmit={handleSubmitRsvp}
              className="rounded-2xl bg-white border border-sky-200 p-5 sm:p-6 shadow-md space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Nama Anda
                </label>
                <input
                  type="text"
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Contoh: Bude Haryani &amp; Keluarga"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Konfirmasi Kehadiran
                </label>
                <select
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value as 'hadir' | 'tidak' | 'ragu')}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-sky-500"
                >
                  <option value="hadir">Insya Allah Hadir</option>
                  <option value="ragu">Masih Ragu</option>
                  <option value="tidak">Mohon Maaf Berhalangan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Doa Untuk Kinan
                </label>
                <textarea
                  rows={3}
                  value={blessingMessage}
                  onChange={(e) => setBlessingMessage(e.target.value)}
                  placeholder="Tuliskan untaian doa untuk ananda Kinan..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 text-xs focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-white" />
                <span>Kirim Doa Restu 👶</span>
              </button>
            </form>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase tracking-wider text-sky-800 font-mono font-medium">
                Untaian Doa ({wishes.length})
              </h4>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {wishes.map((w) => (
                  <div
                    key={w.id}
                    className="rounded-xl bg-white border border-sky-100 p-4 shadow-sm space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-800">{w.name}</span>
                      <span className="text-[10px] text-slate-400">{w.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{w.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FOOTER */}
        <footer className="px-6 pt-10 pb-16 text-center space-y-4">
          <h3 className="text-2xl font-serif text-sky-800 font-bold">Kinan Althafunnisa</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Keluarga Besar Bpk. Irfan Hakim &amp; Ibu Annisa Larasati mengucapkan terima kasih yang tulus atas kehadiran dan doa restu Bapak/Ibu/Saudara/i sekalian.
          </p>
          <p className="text-[11px] text-slate-400 pt-4 border-t border-slate-200 font-mono">
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
              src={AQIQAH_PHOTOS[selectedPhotoIdx].src}
              alt={AQIQAH_PHOTOS[selectedPhotoIdx].caption}
              className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <p className="text-sm font-serif text-sky-300 mt-3 text-center px-4">
              {AQIQAH_PHOTOS[selectedPhotoIdx].caption}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
