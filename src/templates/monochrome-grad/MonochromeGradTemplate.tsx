import React, { useState, useEffect } from 'react'
import {
  Clock,
  Navigation,
  Calendar,
  CreditCard,
  Copy,
  Check,
  Send,
  Video,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Package,
  Music,
  VolumeX,
  MapPin,
  GraduationCap,
  Award,
  BookOpen,
  Users,
  ShieldAlert,
  ExternalLink
} from 'lucide-react'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { MonochromeGradCoverScreen } from './MonochromeGradCoverScreen'
import { MonochromeGradDesktopShowcase } from './MonochromeGradDesktopShowcase'
import { useInvitationData } from '../../context/InvitationContext'
import { useToast } from '../../components/Toast'

const GRAD_PHOTOS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
    caption: 'Momen Kelulusan Studio FSRD ITB'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85',
    caption: 'Dedikasi Panjang Karya Tugas Akhir'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85',
    caption: 'Melangkah Mantap Menuju Babak Pengabdian'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
    caption: 'Bersama Sahabat Seperjuangan Kampus Ganesha'
  }
]

export const MonochromeGradTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack
}) => {
  const { data: weddingData } = useInvitationData()
  const { showToast } = useToast()

  const targetDateStr = '2026-10-24T08:00:00+07:00'
  const [copiedBank, setCopiedBank] = useState<string | null>(null)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null)

  const [guestNameInput, setGuestNameInput] = useState('')
  const [attendance, setAttendance] = useState<'hadir' | 'streaming' | 'doa'>('hadir')
  const [blessingMessage, setBlessingMessage] = useState('')
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'Dr. Andika Pratama, M.Sn.',
      attendance: 'hadir',
      message: 'Selamat dan sukses atas kelulusan wisuda ananda Nadine Aulia, S.Ds. Desain tugas akhirmu sangat inspiratif. Teruslah berkarya dan membanggakan almamater Ganesha!',
      time: '1 jam yang lalu'
    },
    {
      id: 2,
      name: 'Keluarga Bpk. Hendro Prabowo',
      attendance: 'hadir',
      message: 'Alhamdulillah selamat atas gelarnya Nadine sayang! Bangga sekali dengan seluruh dedikasi dan kerja kerasmu. Berkah ilmunya.',
      time: '2 jam yang lalu'
    }
  ])

  const [guestName, setGuestName] = useState('Tamu Undangan')
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
      showToast('Mohon tulis ucapan selamat untuk wisudawan', 'info')
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
    showToast('Terima kasih atas ucapan selamat dan apresiasinya!', 'success')
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col lg:flex-row relative selection:bg-white selection:text-black font-sans">
      {!isOpened && (
        <MonochromeGradCoverScreen
          onOpen={onOpenWithAudio}
          guestName={guestName}
          graduateName="Nadine Aulia, S.Ds."
          institutionName="Institut Teknologi Bandung (ITB)"
          dateText="Sabtu, 24 Oktober 2026"
        />
      )}

      <MonochromeGradDesktopShowcase
        graduateName="Nadine Aulia, S.Ds."
        institutionName="Institut Teknologi Bandung (ITB)"
        dateText="Sabtu, 24 Oktober 2026"
        venueText="Sasana Budaya Ganesa (Sabuga ITB), Bandung"
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
        activeTrack={activeTrack}
        targetDate={targetDateStr}
      />

      <main className="w-full lg:w-7/12 min-h-screen pb-24 overflow-x-hidden relative z-10">
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <button
            onClick={onToggleAudio}
            className="w-12 h-12 rounded-full bg-white text-stone-950 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-95 transition-transform"
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
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-200 text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
            <GraduationCap className="w-3.5 h-3.5 text-zinc-100" />
            <span>Sidang Terbuka Senat ITB 2026</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-tight">
            Nadine Aulia, S.Ds.
          </h1>
          <p className="text-sm font-sans text-zinc-400 mt-1">
            Sarjana Desain Komunikasi Visual (FSRD ITB)
          </p>

          <p className="text-xs font-mono tracking-widest text-zinc-400 mt-2">
            Sabtu, 24 Oktober 2026 • Sabuga ITB Bandung
          </p>

          <div className="relative my-8">
            <div className="w-52 sm:w-60 h-72 sm:h-84 rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-white/30 via-zinc-600/20 to-transparent shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=85"
                alt="Nadine Aulia"
                className="w-full h-full object-cover object-center filter grayscale contrast-110"
              />
            </div>
            <div className="absolute -inset-2 rounded-2xl border border-white/10 pointer-events-none -z-10" />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#18181B] border border-white/20 text-xs text-white font-mono tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
              <Award className="w-3.5 h-3.5 text-zinc-200" />
              <span>Cum Laude (IPK 3.94)</span>
            </div>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans px-4 mt-2">
            Dengan penuh rasa syukur atas kelulusan dan tuntasnya masa studi di Institut Teknologi Bandung, kami mengundang Bapak/Ibu/Saudara/i untuk berkenan hadir dan memberikan restu pada momen wisuda kami.
          </p>
        </section>

        {/* SECTION 2: QUOTE & PROFIL */}
        <section className="px-6 py-8">
          <div className="max-w-lg mx-auto rounded-2xl bg-[#18181B] border border-white/10 p-6 sm:p-8 text-center shadow-xl">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 text-white">
              <BookOpen className="w-5 h-5 text-zinc-200" />
            </div>

            <blockquote className="text-xs sm:text-sm text-zinc-200 leading-relaxed italic mb-4 font-serif">
              &ldquo;Karya terbaik lahir dari keberanian untuk terus bereksplorasi dan kerendahan hati untuk terus belajar mengabdi.&rdquo;
            </blockquote>

            <div className="pt-2 border-t border-white/10 text-xs text-zinc-400">
              <p className="text-[11px] uppercase tracking-wider text-zinc-400 mb-1">Putri Tercinta Dari:</p>
              <p className="font-serif font-bold text-white text-sm">Bpk. Ir. Hendro Prabowo & Ibu Dr. Sri Rejeki</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: RUNDOWN ACARA */}
        <section className="px-6 py-10 bg-zinc-950/60 border-y border-zinc-800">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-mono">Susunan Acara</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Rundown Sidang Senat Sabuga</h3>
            </div>

            <div className="space-y-3">
              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#18181B]/80 border border-white/10">
                <div className="px-2.5 py-1 rounded bg-white/10 text-white font-mono text-xs font-bold shrink-0">
                  07.30 - 08.00
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Pemeriksaan Barcode & Masuk Ruang Sabuga</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Penataan tempat duduk pendamping wisudawan di tribun utama.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#18181B]/80 border border-white/10">
                <div className="px-2.5 py-1 rounded bg-white/10 text-white font-mono text-xs font-bold shrink-0">
                  08.00 - 08.45
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Prosesi Masuknya Dewan Guru Besar ITB</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Lagu Indonesia Raya, Mengheningkan Cipta, dan Pembukaan Sidang Rektor.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#18181B]/80 border border-white/10">
                <div className="px-2.5 py-1 rounded bg-white/10 text-white font-mono text-xs font-bold shrink-0">
                  08.45 - 11.00
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Pelantikan Sarjana & Pemindahan Kuncir Toga</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Penyerahan ijazah kehormatan oleh Dekan FSRD ITB.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#18181B]/80 border border-white/10">
                <div className="px-2.5 py-1 rounded bg-white/10 text-white font-mono text-xs font-bold shrink-0">
                  11.00 - 12.00
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Janji Wisudawan & Pelemparan Toga Bersama</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Janji sarjana ITB, orasi penutup, dan foto bersama di plaza Sabuga.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: LOKASI & MAPS */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-mono">Lokasi Prosesi</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Sasana Budaya Ganesa (Sabuga)</h3>
              <p className="text-xs text-zinc-400 mt-1">Jl. Tamansari No. 73, Lb. Siliwangi, Coblong, Kota Bandung</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#18181B]">
              <div className="aspect-video w-full bg-stone-900 relative">
                <iframe
                  title="Lokasi Acara"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.923456789!2d107.61!3d-6.89!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTMnMjQuMCJTIDEwN8KwMzYnMzYuMCJF!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full filter grayscale contrast-125"
                />
              </div>

              <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#111113]">
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">Area Sabuga ITB</p>
                  <p className="text-[11px] text-zinc-400">Parkir Khusus Tamu & Pendamping Wisudawan</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Sabuga+ITB+Bandung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 rounded-full bg-white text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer hover:bg-zinc-200 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: LIVE STREAMING YOUTUBE */}
        <section className="px-6 py-8">
          <div className="max-w-lg mx-auto rounded-2xl bg-zinc-900 border border-white/10 p-6 text-center shadow-xl">
            <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center mx-auto mb-3 text-red-400">
              <Video className="w-6 h-6 text-red-400" />
            </div>

            <h3 className="text-lg font-serif font-bold text-white">Live Streaming Wisuda ITB</h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-sm mx-auto">
              Bagi kerabat dan sahabat yang belum dapat hadir langsung di Sabuga Bandung, prosesi wisuda dapat disaksikan secara live di kanal resmi YouTube ITB.
            </p>

            <a
              href="https://www.youtube.com/@itbofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
            >
              <span>Tonton Live di YouTube ITB</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* SECTION 6: GALERI FOTO STUDIO */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-mono">Studio Photography</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Galeri Nadine Aulia</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {GRAD_PHOTOS.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIdx(idx)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-white/15 bg-zinc-900"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIGHTBOX MODAL */}
        {selectedPhotoIdx !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedPhotoIdx(null)}
              className="absolute top-4 right-4 text-white hover:text-zinc-400 transition-colors p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative max-w-2xl w-full flex flex-col items-center">
              <img
                src={GRAD_PHOTOS[selectedPhotoIdx].src}
                alt={GRAD_PHOTOS[selectedPhotoIdx].caption}
                className="max-h-[75vh] w-auto rounded-lg shadow-2xl object-contain filter grayscale"
              />
              <p className="text-center text-xs text-zinc-300 mt-3 font-mono">
                {GRAD_PHOTOS[selectedPhotoIdx].caption}
              </p>
            </div>
          </div>
        )}

        {/* SECTION 7: APRESIASI & KADO WISUDA */}
        <section className="px-6 py-10 bg-zinc-950/60 border-y border-zinc-800">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-mono">Tanda Kasih</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Graduation Gift & Apresiasi</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                Doa restu Anda adalah karunia terindah. Bagi yang ingin mengirimkan ucapan bunga atau hadiah kelulusan:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#18181B] border border-white/10 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-zinc-200" />
                    <span className="font-bold text-xs uppercase text-white">Bank BCA</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">Rekening Wisudawan</span>
                </div>
                <p className="font-mono text-lg font-bold text-white tracking-wider">846-512-9081</p>
                <p className="text-xs text-zinc-400 mt-0.5">a.n. Nadine Aulia</p>
                <button
                  onClick={() => handleCopy('8465129081', 'Rekening BCA')}
                  className="mt-3 w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedBank === 'Rekening BCA' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBank === 'Rekening BCA' ? 'Tersalin' : 'Salin Nomor Rekening'}</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#18181B] border border-white/10 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-zinc-200" />
                  <span className="font-bold text-xs uppercase text-white">Kirim Buket Bunga / Hadiah</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Jl. Dago Asri No. 15, Dago, Coblong, Kota Bandung 40135 (Penerima: Nadine Aulia - 0812-7788-9900)
                </p>
                <button
                  onClick={() => handleCopy('Jl. Dago Asri No. 15, Dago, Coblong, Kota Bandung 40135 (Penerima: Nadine Aulia - 0812-7788-9900)', 'Alamat Rumah', true)}
                  className="mt-3 w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAddress ? 'Alamat Tersalin' : 'Salin Alamat Penerima'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: RSVP & UCAPAN SELAMAT */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-mono">Buku Tamu</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">RSVP & Ucapan Kelulusan</h3>
            </div>

            <form onSubmit={handleSubmitRsvp} className="p-6 rounded-2xl bg-[#18181B] border border-white/10 shadow-xl space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Nama Lengkap Anda</label>
                <input
                  type="text"
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Contoh: Sarah Az-Zahra"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-white/15 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Kehadiran</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttendance('hadir')}
                    className={`py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      attendance === 'hadir'
                        ? 'bg-white text-stone-950 font-bold border-white'
                        : 'bg-[#09090B] border-white/15 text-zinc-300'
                    }`}
                  >
                    Hadir di Sabuga
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('streaming')}
                    className={`py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      attendance === 'streaming'
                        ? 'bg-white text-stone-950 font-bold border-white'
                        : 'bg-[#09090B] border-white/15 text-zinc-300'
                    }`}
                  >
                    Live Streaming
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('doa')}
                    className={`py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      attendance === 'doa'
                        ? 'bg-white text-stone-950 font-bold border-white'
                        : 'bg-[#09090B] border-white/15 text-zinc-300'
                    }`}
                  >
                    Titip Doa
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Pesan & Ucapan Selamat</label>
                <textarea
                  rows={3}
                  value={blessingMessage}
                  onChange={(e) => setBlessingMessage(e.target.value)}
                  placeholder="Tuliskan ucapan selamat kelulusan untuk Nadine..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-white/15 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-stone-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Ucapan Kelulusan</span>
              </button>
            </form>

            <div className="mt-8 space-y-3">
              <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                Ucapan Rekan & Keluarga ({wishes.length})
              </h4>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {wishes.map((w) => (
                  <div key={w.id} className="p-4 rounded-xl bg-[#18181B]/80 border border-white/10 text-left">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-white text-xs">{w.name}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">{w.time}</span>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed font-sans">{w.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 pt-8 pb-12 text-center text-xs text-zinc-500 border-t border-zinc-800 space-y-2">
          <p className="font-serif text-zinc-300 italic text-sm">
            &ldquo;In Harmonia Progressio — Demi Kemajuan Bangsa&rdquo;
          </p>
          <p className="text-[11px] font-sans">
            Nadine Aulia, S.Ds. • Sasana Budaya Ganesa ITB Bandung 2026
          </p>
          <p className="text-[10px] pt-4 font-mono text-zinc-600">
            Dibuat dengan penuh dedikasi oleh <span className="text-white font-serif">JanjiSuci.id</span>
          </p>
        </footer>
      </main>
    </div>
  )
}
