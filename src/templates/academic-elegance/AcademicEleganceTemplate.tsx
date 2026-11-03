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
  MapPin,
  GraduationCap,
  Award,
  BookOpen,
  Users,
  ShieldAlert,
  ExternalLink
} from 'lucide-react'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { AcademicEleganceCoverScreen } from './AcademicEleganceCoverScreen'
import { AcademicEleganceDesktopShowcase } from './AcademicEleganceDesktopShowcase'
import { useInvitationData } from '../../context/InvitationContext'
import { useToast } from '../../components/Toast'

const GRADUATION_PHOTOS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85',
    caption: 'Momen Bersejarah Sidang Terbuka Senat'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?auto=format&fit=crop&w=1200&q=85',
    caption: 'Langkah Awal Menapaki Babak Pengabdian Baru'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
    caption: 'Bersama Sahabat dan Rekan Seperjuangan Kampus'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&w=1200&q=85',
    caption: 'Persembahan Terbaik untuk Kedua Orang Tua'
  }
]

export const AcademicEleganceTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack
}) => {
  const { data: weddingData } = useInvitationData()
  const { showToast } = useToast()

  const targetDateStr = '2026-09-19T08:00:00+07:00'
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
  const [attendance, setAttendance] = useState<'hadir' | 'streaming' | 'doa'>('hadir')
  const [guestCount, setGuestCount] = useState<number>(1)
  const [blessingMessage, setBlessingMessage] = useState('')
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'Prof. Dr. Ir. Gunawan M.Sc',
      attendance: 'hadir',
      message: 'Selamat dan sukses atas kelulusan wisuda ananda Faris Alamsyah, S.Kom., M.T. Teruslah berkarya dan membanggakan almamater serta tanah air!',
      time: '1 jam yang lalu'
    },
    {
      id: 2,
      name: 'Keluarga Besar Bpk. Hendra Alamsyah',
      attendance: 'hadir',
      message: 'Alhamdulillah selamat atas gelarnya Faris sayang! Bangga sekali dengan semua perjuangan dan kerja kerasmu selama ini. Berkah ilmunya.',
      time: '3 jam yang lalu'
    },
    {
      id: 3,
      name: 'Dimas Satria & Rekan FASILKOM',
      attendance: 'streaming',
      message: 'Mantap bro Faris! Summa Cum Laude tiada tanding. Sukses selalu untuk karier riset dan industrinya!',
      time: '5 jam yang lalu'
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
      showToast('Mohon tulis ucapan selamat atau pesan untuk wisudawan', 'info')
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
    showToast('Terima kasih atas ucapan selamat dan konfirmasinya!', 'success')
  }

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 flex flex-col lg:flex-row relative selection:bg-amber-400 selection:text-slate-900 font-sans">
      {!isOpened && (
        <AcademicEleganceCoverScreen
          onOpen={onOpenWithAudio}
          guestName={guestName}
          institutionName="Universitas Indonesia"
          ceremonyTitle="Wisuda Sarjana & Magister Gasal 2026"
          dateText="Sabtu, 19 September 2026"
        />
      )}

      <AcademicEleganceDesktopShowcase
        institutionName="Universitas Indonesia"
        dateText="Sabtu, 19 September 2026"
        venueText="Balairung UI, Kampus UI Depok"
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
        activeTrack={activeTrack}
        targetDate={targetDateStr}
      />

      <main className="w-full lg:w-7/12 min-h-screen pb-24 overflow-x-hidden relative z-10">
        {/* Floating Audio Button for Mobile */}
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <button
            onClick={onToggleAudio}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-transform"
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
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-950/80 border border-amber-400/30 text-amber-200 text-xs font-serif uppercase tracking-widest mb-4 shadow-lg">
            <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            <span>Sidang Terbuka Senat Universitas Indonesia</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 font-bold tracking-wide">
            Faris Alamsyah, S.Kom., M.T.
          </h1>
          <p className="text-sm font-serif italic text-amber-300/90 mt-1">
            Magister Ilmu Komputer (FASILKOM UI)
          </p>

          <p className="text-xs font-mono tracking-widest text-blue-200/80 mt-2">
            Sabtu, 19 September 2026 • Balairung UI Depok
          </p>

          <div className="relative my-8">
            <div className="w-52 sm:w-60 h-72 sm:h-84 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-amber-400/40 via-blue-500/20 to-transparent shadow-2xl">
              <img
                src={template?.heroImage || "https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?auto=format&fit=crop&w=800&q=85"}
                alt="Wisuda Faris Alamsyah"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
            </div>
            <div className="absolute -inset-2 rounded-3xl border border-amber-400/20 pointer-events-none -z-10" />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0B132B] border border-amber-400/40 text-xs text-amber-200 font-serif tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Summa Cum Laude (IPK 3.92)</span>
            </div>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-blue-100/90 leading-relaxed font-sans px-4 mt-2">
            Dengan penuh rasa syukur atas karunia Allah SWT dan dedikasi panjang dalam menuntut ilmu, kami mengundang Bapak/Ibu/Saudara/i untuk berkenan menghadiri dan memberikan restu pada momen wisuda kelulusan kami.
          </p>
        </section>

        {/* SECTION 2: QUOTE & DEDIKASI */}
        <section className="px-6 py-8">
          <div className="max-w-lg mx-auto rounded-2xl bg-gradient-to-b from-[#101B38] to-[#0A1226] border border-blue-400/20 p-6 sm:p-8 text-center shadow-xl">
            <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4 text-amber-300">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>

            <blockquote className="text-xs sm:text-sm text-blue-100/90 leading-relaxed italic mb-4">
              &ldquo;Jadilah mata air yang jernih, yang memberikan kehidupan kepada sekitarmu. Keberhasilan seseorang diukur dari seberapa banyak kebaikan dan kemaslahatan yang dapat ia berikan kepada sesama.&rdquo;
            </blockquote>

            <p className="text-xs font-serif text-amber-300 font-medium">
              — B.J. Habibie
            </p>
          </div>
        </section>

        {/* SECTION 3: PROFIL WISUDAWAN & ORANG TUA */}
        <section className="px-6 py-10">
          <div className="max-w-lg mx-auto text-center space-y-4">
            <div className="w-36 h-36 rounded-full overflow-hidden mx-auto border-2 border-amber-400/40 p-1 shadow-lg bg-blue-950/60">
              <img
                src="https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?auto=format&fit=crop&w=600&q=80"
                alt="Faris Alamsyah"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                Faris Alamsyah, S.Kom., M.T.
              </h2>
              <p className="text-xs text-amber-300 mt-1 font-mono">
                NPM: 2206891204 • Magister Ilmu Komputer
              </p>
              <div className="mt-3 p-3 rounded-xl bg-blue-950/60 border border-blue-400/20 text-xs text-blue-200/90 text-left max-w-sm mx-auto space-y-1">
                <p className="font-semibold text-amber-200 font-serif">Judul Tesis:</p>
                <p className="italic text-[11px] leading-relaxed text-blue-100">
                  &ldquo;Penerapan Deep Learning Multi-Modal pada Diagnostik Radiologi Otomatis Berbasis Federated Learning&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs text-blue-200/90 font-sans">
              <p className="text-[11px] uppercase tracking-wider text-blue-300/60 mb-1">Putra Tercinta Dari Pasangan:</p>
              <p className="font-serif font-semibold text-white text-sm">Bpk. Ir. Hendra Alamsyah</p>
              <p className="text-blue-300/70 text-xs">&</p>
              <p className="font-serif font-semibold text-white text-sm">Ibu Hj. Ratna Juwita, S.E.</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: RUNDOWN PROSESI WISUDA */}
        <section className="px-6 py-10 bg-[#0A1226]/60 border-y border-blue-900/30">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-serif">Susunan Acara</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Rundown Sidang Senat</h3>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#101B38]/80 border border-blue-400/15">
                <div className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 font-mono text-xs font-bold shrink-0 mt-0.5">
                  07.30 - 08.00
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-sm">Registrasi Tamu & Pemeriksaan Barcode</h4>
                  <p className="text-xs text-blue-200/80 mt-0.5 leading-relaxed">
                    Pemeriksaan kartu undangan & penataan tempat duduk pendamping di tribun Balairung.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#101B38]/80 border border-blue-400/15">
                <div className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 font-mono text-xs font-bold shrink-0 mt-0.5">
                  08.00 - 08.45
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-sm">Prosesi Senat Akademik & Lagu Kebangsaan</h4>
                  <p className="text-xs text-blue-200/80 mt-0.5 leading-relaxed">
                    Masuknya Dewan Guru Besar, Rektor UI, mengheningkan cipta, serta pembukaan Sidang Terbuka.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#101B38]/80 border border-blue-400/15">
                <div className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 font-mono text-xs font-bold shrink-0 mt-0.5">
                  08.45 - 11.15
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-sm">Pelantikan & Pemindahan Kuncir Toga</h4>
                  <p className="text-xs text-blue-200/80 mt-0.5 leading-relaxed">
                    Pemindahan kuncir wisudawan oleh Dekan FASILKOM UI & penyerahan ijazah kehormatan.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#101B38]/80 border border-blue-400/15">
                <div className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 font-mono text-xs font-bold shrink-0 mt-0.5">
                  11.15 - 12.00
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-sm">Janji Wisudawan, Orasi Ilmiah & Penutupan</h4>
                  <p className="text-xs text-blue-200/80 mt-0.5 leading-relaxed">
                    Pengucapan janji sarjana/magister, doa bersama, dan pelemparan topi toga di plaza Balairung.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: LOKASI & PETA BALAIRUNG */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-serif">Lokasi Acara</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Balairung Universitas Indonesia</h3>
              <p className="text-xs text-blue-200/80 mt-1">Kampus Baru UI Depok, Jawa Barat 16424</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-blue-400/20 shadow-2xl bg-[#101B38]">
              <div className="aspect-video w-full bg-slate-900 relative">
                <iframe
                  title="Lokasi Balairung UI"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.234509748674!2d106.82869597587023!3d-6.363678993626357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec1a49db23cb%3A0xe54e56ce81cb4321!2sBalairung%20Universitas%20Indonesia!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full filter contrast-105"
                />
              </div>

              <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0B132B]">
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">Akses Transportasi Mudah:</p>
                  <p className="text-[11px] text-blue-200/80">KRL Commuterline Stasiun UI (Jalan Kaki 5 Menit)</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Balairung+Universitas+Indonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 transition-all shrink-0 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: LIVE STREAMING YOUTUBE */}
        <section className="px-6 py-8">
          <div className="max-w-lg mx-auto rounded-2xl bg-gradient-to-r from-red-950/40 via-[#101B38] to-red-950/40 border border-red-500/25 p-6 text-center shadow-xl">
            <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center mx-auto mb-3 text-red-400">
              <Video className="w-6 h-6 text-red-400" />
            </div>

            <h3 className="text-lg font-serif font-bold text-white">Live Streaming Wisuda UI</h3>
            <p className="text-xs text-blue-200/90 mt-1 leading-relaxed max-w-sm mx-auto">
              Bagi sanak saudara dan kerabat yang belum dapat berhadir langsung di Balairung UI, prosesi wisuda dapat disaksikan secara langsung melalui kanal resmi YouTube Universitas Indonesia.
            </p>

            <a
              href="https://www.youtube.com/@UniversitasIndonesiaOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-900/40 transition-all cursor-pointer"
            >
              <span>Tonton Siaran Langsung di YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* SECTION 7: TATA TERTIB & KETENTUAN TAMU */}
        <section className="px-6 py-10 bg-[#0A1226]/60 border-y border-blue-900/30">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-serif">Protokol Acara</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Tata Tertib & Ketentuan Tamu</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[#101B38]/80 border border-blue-400/20 flex items-start gap-3">
                <Users className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-left text-xs">
                  <p className="font-semibold text-white">Kapasitas Pendamping</p>
                  <p className="text-blue-200/80 text-[11px] mt-0.5">Maksimal 2 (dua) pendamping per wisudawan di dalam Balairung.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#101B38]/80 border border-blue-400/20 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-left text-xs">
                  <p className="font-semibold text-white">Ketentuan Anak</p>
                  <p className="text-blue-200/80 text-[11px] mt-0.5">Anak usia di bawah 12 tahun tidak diperkenankan masuk ke ruang sidang utama.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#101B38]/80 border border-blue-400/20 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-left text-xs">
                  <p className="font-semibold text-white">Dresscode Busana</p>
                  <p className="text-blue-200/80 text-[11px] mt-0.5">Pakaian Nasional / Kebaya / Jas Formal Resmi / Batik Lengan Panjang.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#101B38]/80 border border-blue-400/20 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-left text-xs">
                  <p className="font-semibold text-white">Waktu Kehadiran</p>
                  <p className="text-blue-200/80 text-[11px] mt-0.5">Pintu Balairung ditutup pukul 08.00 WIB tepat saat prosesi senat masuk.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: GALERI FOTO WISUDA */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-serif">Galeri Kenangan</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Perjalanan Menuju Wisuda</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {GRADUATION_PHOTOS.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIdx(idx)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-blue-400/20 bg-blue-950/60"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIGHTBOX MODAL */}
        {selectedPhotoIdx !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedPhotoIdx(null)}
              className="absolute top-4 right-4 text-white hover:text-amber-300 transition-colors p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative max-w-2xl w-full flex flex-col items-center">
              <img
                src={GRADUATION_PHOTOS[selectedPhotoIdx].src}
                alt={GRADUATION_PHOTOS[selectedPhotoIdx].caption}
                className="max-h-[75vh] w-auto rounded-lg shadow-2xl object-contain"
              />
              <p className="text-center text-xs text-blue-200 mt-3 font-serif">
                {GRADUATION_PHOTOS[selectedPhotoIdx].caption}
              </p>
              <div className="flex gap-4 mt-3">
                <button
                  onClick={() => setSelectedPhotoIdx((prev) => (prev! > 0 ? prev! - 1 : GRADUATION_PHOTOS.length - 1))}
                  className="px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 text-xs flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  onClick={() => setSelectedPhotoIdx((prev) => (prev! < GRADUATION_PHOTOS.length - 1 ? prev! + 1 : 0))}
                  className="px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 text-xs flex items-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 9: TANDA KASIH & GRADUATION GIFT */}
        <section className="px-6 py-10 bg-[#0A1226]/60 border-y border-blue-900/30">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-serif">Tanda Kasih</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Graduation Gift & Apresiasi</h3>
              <p className="text-xs text-blue-200/80 mt-1 max-w-sm mx-auto">
                Doa restu Bapak/Ibu/Saudara/i merupakan karunia terindah bagi kami. Bagi yang hendak mengirimkan tanda kasih atau kado kelulusan:
              </p>
            </div>

            <div className="space-y-4">
              {/* Rekening Bank */}
              <div className="p-5 rounded-2xl bg-[#101B38] border border-blue-400/25 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-xs uppercase tracking-wider text-white">Bank Mandiri</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 border border-blue-500/30">Rekening Wisudawan</span>
                </div>
                <p className="font-mono text-lg font-bold text-amber-200 tracking-wider">157-00-0982341-2</p>
                <p className="text-xs text-blue-200/80 mt-0.5">a.n. Faris Alamsyah</p>
                <button
                  onClick={() => handleCopy('1570009823412', 'Nomor Rekening Mandiri')}
                  className="mt-3 w-full py-2 rounded-lg bg-blue-950 hover:bg-blue-900 border border-blue-400/30 text-xs font-semibold text-amber-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedBank === 'Nomor Rekening Mandiri' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBank === 'Nomor Rekening Mandiri' ? 'Tersalin' : 'Salin Nomor Rekening'}</span>
                </button>
              </div>

              {/* Kirim Hadiah Fisik / Bunga Wisuda */}
              <div className="p-5 rounded-2xl bg-[#101B38] border border-blue-400/25 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-xs uppercase tracking-wider text-white">Kirim Kado / Buket Bunga Wisuda</span>
                </div>
                <p className="text-xs text-blue-200/90 leading-relaxed">
                  Jl. Margonda Raya No. 45B, Beji, Kota Depok, Jawa Barat 16424 (Penerima: Faris Alamsyah - 0812-9876-5432)
                </p>
                <button
                  onClick={() => handleCopy('Jl. Margonda Raya No. 45B, Beji, Kota Depok, Jawa Barat 16424 (Penerima: Faris Alamsyah - 0812-9876-5432)', 'Alamat Pengiriman', true)}
                  className="mt-3 w-full py-2 rounded-lg bg-blue-950 hover:bg-blue-900 border border-blue-400/30 text-xs font-semibold text-amber-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAddress ? 'Alamat Tersalin' : 'Salin Alamat Penerima'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: RSVP & UCAPAN KELULUSAN */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-serif">Konfirmasi Kehadiran</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">RSVP & Ucapan Selamat</h3>
            </div>

            <form onSubmit={handleSubmitRsvp} className="p-6 rounded-2xl bg-[#101B38] border border-blue-400/25 shadow-xl space-y-4">
              <div>
                <label className="block text-xs font-medium text-blue-200 mb-1">Nama Lengkap Anda</label>
                <input
                  type="text"
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Contoh: Dr. Budi Santoso"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#070D1E] border border-blue-400/30 text-white placeholder-blue-400/40 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-blue-200 mb-1">Kehadiran</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttendance('hadir')}
                    className={`py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      attendance === 'hadir'
                        ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                        : 'bg-[#070D1E] border-blue-400/30 text-blue-200 hover:border-blue-400/60'
                    }`}
                  >
                    Hadir di Balairung
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('streaming')}
                    className={`py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      attendance === 'streaming'
                        ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                        : 'bg-[#070D1E] border-blue-400/30 text-blue-200 hover:border-blue-400/60'
                    }`}
                  >
                    Nonton Streaming
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('doa')}
                    className={`py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      attendance === 'doa'
                        ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                        : 'bg-[#070D1E] border-blue-400/30 text-blue-200 hover:border-blue-400/60'
                    }`}
                  >
                    Titip Doa
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-blue-200 mb-1">Ucapan & Pesan untuk Wisudawan</label>
                <textarea
                  rows={3}
                  value={blessingMessage}
                  onChange={(e) => setBlessingMessage(e.target.value)}
                  placeholder="Tuliskan ucapan selamat kelulusan atau doa untuk wisudawan..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#070D1E] border border-blue-400/30 text-white placeholder-blue-400/40 text-xs focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Ucapan Selamat</span>
              </button>
            </form>

            {/* List Wishes */}
            <div className="mt-8 space-y-3">
              <h4 className="text-xs font-serif font-bold text-amber-200 uppercase tracking-wider">
                Doa & Ucapan Teman & Kerabat ({wishes.length})
              </h4>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {wishes.map((w) => (
                  <div key={w.id} className="p-4 rounded-xl bg-[#101B38]/80 border border-blue-400/15 text-left">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-serif font-bold text-white text-xs">{w.name}</span>
                      <span className="text-[10px] text-blue-300/60 font-mono">{w.time}</span>
                    </div>
                    <div className="inline-block px-2 py-0.5 rounded bg-blue-900/60 text-amber-300 text-[10px] font-mono mb-2">
                      {w.attendance === 'hadir' ? '✓ Hadir di Balairung' : w.attendance === 'streaming' ? '▶ Nonton Streaming' : '✉ Titip Doa'}
                    </div>
                    <p className="text-xs text-blue-100/90 leading-relaxed font-sans">{w.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 pt-8 pb-12 text-center text-xs text-blue-300/60 border-t border-blue-900/30 space-y-2">
          <p className="font-serif text-amber-200/80 italic text-sm">
            &ldquo;Berilmu Amaliah, Beramal Ilmiah, Berakhlakul Karimah&rdquo;
          </p>
          <p className="text-[11px] font-sans">
            Keluarga Besar Faris Alamsyah • Balairung Universitas Indonesia 2026
          </p>
          <p className="text-[10px] pt-4 font-mono text-blue-400/50">
            Dibuat dengan penuh dedikasi oleh <span className="text-amber-300 font-serif">JanjiSuci.id</span>
          </p>
        </footer>
      </main>
    </div>
  )
}
