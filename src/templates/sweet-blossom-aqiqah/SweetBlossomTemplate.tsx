import React, { useState, useEffect } from 'react'
import {
  Clock,
  Navigation,
  Calendar,
  CreditCard,
  Copy,
  Check,
  Send,
  Heart,
  X,
  ZoomIn,
  Package,
  Music,
  VolumeX,
  MapPin,
  Sparkles
} from 'lucide-react'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { SweetBlossomCoverScreen } from './SweetBlossomCoverScreen'
import { SweetBlossomDesktopShowcase } from './SweetBlossomDesktopShowcase'
import { useInvitationData } from '../../context/InvitationContext'
import { useToast } from '../../components/Toast'

const AQIQAH_PHOTOS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1200&q=85',
    caption: 'Momen Indah Kehadiran Putri Pertama Kami'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=85',
    caption: 'Tidur Pulas Dalam Dekapan Hangat Ibunda'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=85',
    caption: 'Jari-Jari Kecil Penyejuk Hati Keluarga'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=85',
    caption: 'Senyum Damai Buah Hati Penuh Berkah'
  }
]

export const SweetBlossomTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack
}) => {
  const { data: weddingData } = useInvitationData()
  const { showToast } = useToast()

  const targetDateStr = '2026-08-08T09:00:00+07:00'
  const [copiedBank, setCopiedBank] = useState<string | null>(null)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null)

  const [guestNameInput, setGuestNameInput] = useState('')
  const [attendance, setAttendance] = useState<'hadir' | 'tidak' | 'ragu'>('hadir')
  const [blessingMessage, setBlessingMessage] = useState('')
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'Ustadzah Maryam & Keluarga',
      attendance: 'hadir',
      message: 'Barakallahu laka fil mawhubi laka wa syakartal wahib. Semoga ananda Shafiyyah menjadi anak yang sholihah, hafidzah Qur\'an, dan penyejuk pandangan kedua orang tuanya.',
      time: '1 jam yang lalu'
    },
    {
      id: 2,
      name: 'Keluarga Besar Bpk. Ahmad Hidayat',
      attendance: 'hadir',
      message: 'Alhamdulillah selamat atas kelahiran putri cantiknya. Sehat selalu untuk ibu dan bayinya, berkah selalu untuk sekeluarga.',
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
    showToast('Terima kasih atas doa tulusnya!', 'success')
  }

  return (
    <div className="min-h-screen bg-[#2B0E14] text-stone-100 flex flex-col lg:flex-row relative selection:bg-rose-400 selection:text-stone-900 font-sans">
      {!isOpened && (
        <SweetBlossomCoverScreen
          onOpen={onOpenWithAudio}
          guestName={guestName}
          babyName="Shafiyyah Almahyra"
          dateText="Sabtu, 08 Agustus 2026"
        />
      )}

      <SweetBlossomDesktopShowcase
        babyName="Shafiyyah Almahyra"
        dateText="Sabtu, 08 Agustus 2026"
        venueText="Kediaman Keluarga, Cempaka Putih Jakarta Pusat"
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
        activeTrack={activeTrack}
        targetDate={targetDateStr}
      />

      <main className="w-full lg:w-7/12 min-h-screen pb-24 overflow-x-hidden relative z-10">
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <button
            onClick={onToggleAudio}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-400 to-pink-300 text-stone-950 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.5)] active:scale-95 transition-transform"
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
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-400/40 text-rose-200 text-xs font-serif uppercase tracking-widest mb-4">
            <span>🌸</span>
            <span>Tasyakuran Aqiqah & Tasmiyah</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-200 to-amber-200 font-bold tracking-wide">
            Shafiyyah Almahyra
          </h1>
          <p className="text-sm font-serif italic text-rose-300/90 mt-1">
            Putri Pertama Tercinta
          </p>

          <p className="text-xs font-mono tracking-widest text-rose-200/80 mt-2">
            Sabtu, 08 Agustus 2026 • 09.00 - 13.00 WIB
          </p>

          <div className="relative my-8">
            <div className="w-52 sm:w-60 h-72 sm:h-84 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-rose-400/40 via-pink-400/20 to-transparent shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=85"
                alt="Shafiyyah Almahyra"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
            </div>
            <div className="absolute -inset-2 rounded-3xl border border-rose-400/20 pointer-events-none -z-10" />
          </div>

          <p className="max-w-md text-xs sm:text-sm text-rose-100/90 leading-relaxed font-sans px-4">
            Bismillahirahmanirrahim. Atas limpahan karunia dan amanah terindah dari Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir memberikan doa restu pada tasyakuran aqiqah putri kami.
          </p>
        </section>

        {/* SECTION 2: BIODATA LAHIR BAYI */}
        <section className="px-6 py-6">
          <div className="max-w-lg mx-auto rounded-2xl bg-[#3D141C] border border-rose-400/25 p-6 shadow-xl">
            <div className="text-center mb-5">
              <span className="text-[11px] uppercase tracking-widest text-rose-300 font-serif">Kabar Kelahiran</span>
              <h3 className="text-xl font-serif font-bold text-white mt-0.5">Statistik Kelahiran Putri</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-400/20">
                <span className="text-[10px] text-rose-300/80 block uppercase">Tanggal Lahir</span>
                <span className="font-serif font-bold text-xs text-white mt-1 block">17 Juni 2026</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-400/20">
                <span className="text-[10px] text-rose-300/80 block uppercase">Jam Lahir</span>
                <span className="font-serif font-bold text-xs text-white mt-1 block">06.30 WIB</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-400/20">
                <span className="text-[10px] text-rose-300/80 block uppercase">Berat Badan</span>
                <span className="font-serif font-bold text-xs text-white mt-1 block">3.100 gram</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-400/20">
                <span className="text-[10px] text-rose-300/80 block uppercase">Panjang Badan</span>
                <span className="font-serif font-bold text-xs text-white mt-1 block">48 cm</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: DOA TAHNIK & ORANG TUA */}
        <section className="px-6 py-8">
          <div className="max-w-lg mx-auto rounded-2xl bg-gradient-to-b from-[#3D141C] to-[#2B0E14] border border-rose-400/20 p-6 sm:p-8 text-center shadow-xl">
            <div className="w-10 h-10 rounded-full bg-rose-400/10 border border-rose-400/30 flex items-center justify-center mx-auto mb-4 text-rose-300">
              <Heart className="w-5 h-5 fill-rose-300/30" />
            </div>

            <p className="font-serif text-rose-200/90 text-sm tracking-widest uppercase mb-3">
              Doa Untuk Bayi Baru Lahir
            </p>

            <blockquote className="text-xs sm:text-sm text-rose-100/90 leading-relaxed italic mb-4">
              &ldquo;Ya Allah, jadikanlah ananda anak yang sholihah, bertaqwa kepada-Mu, berbakti kepada kedua orang tua, cerdas akalnya, dan mulia akhlaknya di dunia dan akhirat.&rdquo;
            </blockquote>

            <div className="pt-2 border-t border-rose-400/15 text-xs text-rose-200/90">
              <p className="text-[11px] uppercase tracking-wider text-rose-300/60 mb-1">Putri Tercinta Dari:</p>
              <p className="font-serif font-bold text-white text-sm">Bpk. Muhammad Zikri & Ibu Nabila Maharani</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: RUNDOWN ACARA AQIQAH */}
        <section className="px-6 py-10 bg-[#1F0A0E]/60 border-y border-rose-900/30">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-rose-300 font-serif">Susunan Acara</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Rangkaian Tasyakuran</h3>
            </div>

            <div className="space-y-3">
              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#3D141C]/80 border border-rose-400/15">
                <div className="px-2.5 py-1 rounded bg-rose-400/10 text-rose-300 font-mono text-xs font-bold shrink-0">
                  09.00 - 09.30
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-sm">Pembacaan Al-Qur'an & Shalawat Nabi</h4>
                  <p className="text-xs text-rose-200/80 mt-0.5">Lantunan ayat suci QS. Maryam dan doa pembuka majelis tasyakuran.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#3D141C]/80 border border-rose-400/15">
                <div className="px-2.5 py-1 rounded bg-rose-400/10 text-rose-300 font-mono text-xs font-bold shrink-0">
                  09.30 - 10.30
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-sm">Prosesi Cukur Rambut & Doa Tasmiyah</h4>
                  <p className="text-xs text-rose-200/80 mt-0.5">Pemotongan ujung rambut simbolis oleh para sesepuh keluarga & peniupan doa.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#3D141C]/80 border border-rose-400/15">
                <div className="px-2.5 py-1 rounded bg-rose-400/10 text-rose-300 font-mono text-xs font-bold shrink-0">
                  10.30 - 11.30
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-sm">Tausiyah Hikmah Aqiqah & Doa Keberkahan</h4>
                  <p className="text-xs text-rose-200/80 mt-0.5">Mauidzah hasanah tentang hak anak dalam Islam dan doa penutup.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#3D141C]/80 border border-rose-400/15">
                <div className="px-2.5 py-1 rounded bg-rose-400/10 text-rose-300 font-mono text-xs font-bold shrink-0">
                  11.30 - 13.00
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-sm">Santap Siang Bersama & Ramah Tamah</h4>
                  <p className="text-xs text-rose-200/80 mt-0.5">Menikmati hidangan olahan aqiqah dan sesi foto bersama ananda Shafiyyah.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: LOKASI & PETA */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-rose-300 font-serif">Lokasi Acara</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Kediaman Keluarga</h3>
              <p className="text-xs text-rose-200/80 mt-1">Jl. Cempaka Putih Timur No. 24, Jakarta Pusat</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-rose-400/20 shadow-2xl bg-[#3D141C]">
              <div className="aspect-video w-full bg-slate-900 relative">
                <iframe
                  title="Lokasi Acara"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.623456789!2d106.87!3d-6.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnNDguMCJTIDEwNsKwNTInMTIuMCJF!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full filter contrast-105"
                />
              </div>

              <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#2B0E14]">
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">Akses Lokasi Mudah:</p>
                  <p className="text-[11px] text-rose-300/80">Dekat Rumah Sakit Islam Jakarta Cempaka Putih</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Cempaka+Putih+Jakarta+Pusat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: GALERI FOTO */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-rose-300 font-serif">Momen Manis</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Potret Shafiyyah</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {AQIQAH_PHOTOS.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIdx(idx)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-rose-400/20 bg-rose-950/60"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-rose-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
              className="absolute top-4 right-4 text-white hover:text-rose-300 transition-colors p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative max-w-2xl w-full flex flex-col items-center">
              <img
                src={AQIQAH_PHOTOS[selectedPhotoIdx].src}
                alt={AQIQAH_PHOTOS[selectedPhotoIdx].caption}
                className="max-h-[75vh] w-auto rounded-lg shadow-2xl object-contain"
              />
              <p className="text-center text-xs text-rose-200 mt-3 font-serif">
                {AQIQAH_PHOTOS[selectedPhotoIdx].caption}
              </p>
            </div>
          </div>
        )}

        {/* SECTION 7: TANDA KASIH & KADO BAYI */}
        <section className="px-6 py-10 bg-[#1F0A0E]/60 border-y border-rose-900/30">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-rose-300 font-serif">Tanda Kasih</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Hadiah Perlengkapan Bayi</h3>
              <p className="text-xs text-rose-200/80 mt-1 max-w-sm mx-auto">
                Doa tulus Bapak/Ibu/Saudara/i merupakan hadiah terindah bagi keluarga kami. Bagi yang ingin mengirimkan tanda kasih:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#3D141C] border border-rose-400/25 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-rose-400" />
                    <span className="font-bold text-xs uppercase text-white">Bank Syariah Indonesia (BSI)</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-900/60 text-rose-200">Rekening Ibunda</span>
                </div>
                <p className="font-mono text-lg font-bold text-rose-200 tracking-wider">719-823-4512</p>
                <p className="text-xs text-rose-200/80 mt-0.5">a.n. Nabila Maharani</p>
                <button
                  onClick={() => handleCopy('7198234512', 'Rekening BSI')}
                  className="mt-3 w-full py-2 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-400/30 text-xs font-semibold text-rose-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedBank === 'Rekening BSI' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBank === 'Rekening BSI' ? 'Tersalin' : 'Salin Nomor Rekening'}</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#3D141C] border border-rose-400/25 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-rose-400" />
                  <span className="font-bold text-xs uppercase text-white">Alamat Pengiriman Kado</span>
                </div>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  Jl. Cempaka Putih Timur No. 24, Cempaka Putih, Jakarta Pusat 10510 (Penerima: Nabila Maharani - 0812-3456-7890)
                </p>
                <button
                  onClick={() => handleCopy('Jl. Cempaka Putih Timur No. 24, Cempaka Putih, Jakarta Pusat 10510 (Penerima: Nabila Maharani - 0812-3456-7890)', 'Alamat Rumah', true)}
                  className="mt-3 w-full py-2 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-400/30 text-xs font-semibold text-rose-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAddress ? 'Alamat Tersalin' : 'Salin Alamat Rumah'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: RSVP & DOA RESTU */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-rose-300 font-serif">Konfirmasi Kehadiran</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">RSVP & Untaian Doa</h3>
            </div>

            <form onSubmit={handleSubmitRsvp} className="p-6 rounded-2xl bg-[#3D141C] border border-rose-400/25 shadow-xl space-y-4">
              <div>
                <label className="block text-xs font-medium text-rose-200 mb-1">Nama Lengkap Anda</label>
                <input
                  type="text"
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Contoh: Keluarga Bpk. Ridwan"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#2B0E14] border border-rose-400/30 text-white placeholder-rose-400/40 text-xs focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-rose-200 mb-1">Konfirmasi Kehadiran</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttendance('hadir')}
                    className={`py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      attendance === 'hadir'
                        ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold'
                        : 'bg-[#2B0E14] border-rose-400/30 text-rose-300'
                    }`}
                  >
                    Hadir
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('ragu')}
                    className={`py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      attendance === 'ragu'
                        ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold'
                        : 'bg-[#2B0E14] border-rose-400/30 text-rose-300'
                    }`}
                  >
                    Masih Ragu
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('tidak')}
                    className={`py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      attendance === 'tidak'
                        ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold'
                        : 'bg-[#2B0E14] border-rose-400/30 text-rose-300'
                    }`}
                  >
                    Berhalangan
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-rose-200 mb-1">Untaian Doa untuk Shafiyyah</label>
                <textarea
                  rows={3}
                  value={blessingMessage}
                  onChange={(e) => setBlessingMessage(e.target.value)}
                  placeholder="Tuliskan doa kebaikan dan harapan untuk ananda..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#2B0E14] border border-rose-400/30 text-white placeholder-rose-400/40 text-xs focus:outline-none focus:border-rose-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 text-stone-950 font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Doa Restu 🌸</span>
              </button>
            </form>

            <div className="mt-8 space-y-3">
              <h4 className="text-xs font-serif font-bold text-rose-200 uppercase tracking-wider">
                Doa Dari Sahabat & Keluarga ({wishes.length})
              </h4>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {wishes.map((w) => (
                  <div key={w.id} className="p-4 rounded-xl bg-[#3D141C]/80 border border-rose-400/15 text-left">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-serif font-bold text-white text-xs">{w.name}</span>
                      <span className="text-[10px] text-rose-300/60 font-mono">{w.time}</span>
                    </div>
                    <p className="text-xs text-rose-100/90 leading-relaxed font-sans">{w.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 pt-8 pb-12 text-center text-xs text-rose-300/60 border-t border-rose-900/30 space-y-2">
          <p className="font-serif text-rose-200/80 italic text-sm">
            &ldquo;Semoga menjadi anak yang berbakti, sholihah, dan qurrata a\'yun.&rdquo;
          </p>
          <p className="text-[11px] font-sans">
            Keluarga Besar Shafiyyah Almahyra • Cempaka Putih 2026
          </p>
          <p className="text-[10px] pt-4 font-mono text-rose-400/50">
            Dibuat dengan penuh cinta oleh <span className="text-rose-300 font-serif">JanjiSuci.id</span>
          </p>
        </footer>
      </main>
    </div>
  )
}
