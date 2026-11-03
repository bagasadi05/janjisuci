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
  VolumeX,
  MapPin,
  Utensils
} from 'lucide-react'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { JungleSafariCoverScreen } from './JungleSafariCoverScreen'
import { JungleSafariDesktopShowcase } from './JungleSafariDesktopShowcase'
import { useInvitationData } from '../../context/InvitationContext'
import { useToast } from '../../components/Toast'

const SAFARI_PHOTOS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=85',
    caption: 'Momen Ceria Kenzo Menginjak Usia 3 Tahun'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=85',
    caption: 'Penuh Warna dan Tawa Bersama Keluarga'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85',
    caption: 'Petualang Kecil yang Penuh Rasa Ingin Tahu'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1200&q=85',
    caption: 'Senyum Bahagia Buah Hati Tercinta'
  }
]

export const JungleSafariTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack
}) => {
  const { data: weddingData } = useInvitationData()
  const { showToast } = useToast()

  const targetDateStr = '2026-10-18T10:00:00+07:00'
  const [copiedBank, setCopiedBank] = useState<string | null>(null)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null)

  const [guestNameInput, setGuestNameInput] = useState('')
  const [attendance, setAttendance] = useState<'hadir' | 'tidak' | 'ragu'>('hadir')
  const [mealPreference, setMealPreference] = useState('Chicken Nuggets & Fries')
  const [blessingMessage, setBlessingMessage] = useState('')
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'Tante Sarah & Om Kevin',
      attendance: 'hadir',
      meal: 'Chicken Nuggets & Fries',
      message: 'Happy 3rd Birthday Kenzo jagoan! Semoga makin pintar, sehat, dan tumbuh jadi anak sholeh yang hebat. Nanti kita main bareng ya!',
      time: '1 jam yang lalu'
    },
    {
      id: 2,
      name: 'Keluarga Bpk. Rian Mahendra',
      attendance: 'hadir',
      meal: 'Macaroni Cheese',
      message: 'Selamat ulang tahun Kenzo sayang! Doa terbaik dari kami sekeluarga, lekas besar dan membanggakan papa mama.',
      time: '3 jam yang lalu'
    }
  ])

  const [guestName, setGuestName] = useState('Teman Petualang')
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
      showToast('Mohon tulis ucapan ulang tahun untuk Kenzo', 'info')
      return
    }

    setWishes([
      {
        id: Date.now(),
        name: guestNameInput.trim(),
        attendance,
        meal: mealPreference,
        message: blessingMessage.trim(),
        time: 'Baru saja'
      },
      ...wishes
    ])
    setGuestNameInput('')
    setBlessingMessage('')
    showToast('Terima kasih atas doa dan konfirmasinya!', 'success')
  }

  return (
    <div className="min-h-screen bg-[#132317] text-stone-100 flex flex-col lg:flex-row relative selection:bg-amber-400 selection:text-stone-900 font-sans">
      {!isOpened && (
        <JungleSafariCoverScreen
          onOpen={onOpenWithAudio}
          guestName={guestName}
          celebrantName="Kenzo Dirgantara"
          ageText="Turning 3rd Birthday!"
          dateText="Minggu, 18 Oktober 2026"
        />
      )}

      <JungleSafariDesktopShowcase
        celebrantName="Kenzo Dirgantara"
        dateText="Minggu, 18 Oktober 2026"
        venueText="Playground Safari Café, Kemang Jakarta"
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
        activeTrack={activeTrack}
        targetDate={targetDateStr}
      />

      <main className="w-full lg:w-7/12 min-h-screen pb-24 overflow-x-hidden relative z-10">
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <button
            onClick={onToggleAudio}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-lime-300 text-stone-950 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-transform"
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
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <span>🦁</span>
            <span>Safari Kids Birthday Bash</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-lime-200 font-extrabold tracking-wide">
            Kenzo Dirgantara
          </h1>
          <div className="mt-2 inline-block px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 text-sm font-bold">
            🎉 Turning 3rd Birthday Party!
          </div>

          <p className="text-xs font-mono tracking-widest text-emerald-200/80 mt-3">
            Minggu, 18 Oktober 2026 • 10:00 - 13:00 WIB
          </p>

          <div className="relative my-8">
            <div className="w-52 sm:w-60 h-72 sm:h-84 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-amber-400/40 via-lime-400/20 to-emerald-950 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=85"
                alt="Kenzo Dirgantara"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
            </div>
            <div className="absolute -inset-2 rounded-3xl border border-amber-400/20 pointer-events-none -z-10" />
          </div>

          <p className="max-w-md text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans px-4">
            Halo teman-teman tersayang! Kenzo sekarang sudah berusia 3 tahun! Yuk ikut berpetualang dan bersenang-senang di pesta hutan safari bersama hewan-hewan lucu, sulap seru, dan kue ulang tahun lezat!
          </p>
        </section>

        {/* SECTION 2: PROFIL ORANG TUA */}
        <section className="px-6 py-8">
          <div className="max-w-lg mx-auto rounded-2xl bg-gradient-to-b from-[#1C3121] to-[#122316] border border-emerald-500/25 p-6 text-center shadow-xl">
            <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-3 text-amber-300">
              <Heart className="w-5 h-5 fill-amber-300/30" />
            </div>

            <p className="font-serif text-amber-300 text-sm font-bold uppercase tracking-wider mb-2">
              Doa Penuh Kasih Dari Orang Tua
            </p>

            <blockquote className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed italic mb-4">
              &ldquo;Semoga ananda Kenzo tumbuh menjadi anak yang sehat, pemberani, berhati lembut, ceria, dan selalu membawa tawa serta kebahagiaan bagi orang-orang di sekitarnya.&rdquo;
            </blockquote>

            <p className="text-xs text-amber-200 font-sans font-semibold">
              Keluarga Bpk. Aditya Dirgantara & Ibu Renata Anggraini
            </p>
          </div>
        </section>

        {/* SECTION 3: RUNDOWN ACARA SAFARI */}
        <section className="px-6 py-10 bg-[#0E1A11]/60 border-y border-emerald-900/30">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-sans font-bold">Jadwal Petualangan</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Susunan Acara Pesta</h3>
            </div>

            <div className="space-y-3">
              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#1C3121]/80 border border-emerald-500/20">
                <div className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 font-mono text-xs font-bold shrink-0">
                  10.00 - 10.30
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Registrasi Explorer & Safari Welcoming Snack</h4>
                  <p className="text-xs text-emerald-200/80 mt-0.5">Penyerahan topi safari petualang & welcome juice buah segar.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#1C3121]/80 border border-emerald-500/20">
                <div className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 font-mono text-xs font-bold shrink-0">
                  10.30 - 11.15
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Animal Safari Games & Magic Show</h4>
                  <p className="text-xs text-emerald-200/80 mt-0.5">Pertunjukan sulap interaktif, quiz berhadiah, dan parade badut satwa.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#1C3121]/80 border border-emerald-500/20">
                <div className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 font-mono text-xs font-bold shrink-0">
                  11.15 - 11.45
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Tiup Lilin, Potong Kue & Foto Bersama</h4>
                  <p className="text-xs text-emerald-200/80 mt-0.5">Menyanyikan lagu ulang tahun, tiup lilin kue safari 3D, dan sesi foto keluarga.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#1C3121]/80 border border-emerald-500/20">
                <div className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 font-mono text-xs font-bold shrink-0">
                  11.45 - 13.00
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Makan Siang Bersama & Goodie Bag</h4>
                  <p className="text-xs text-emerald-200/80 mt-0.5">Santap siang lezat anak & orang tua, free play di playground, serta bingkisan spesial.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: LOKASI & GOOGLE MAPS */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-sans font-bold">Tempat Pesta</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Playground Safari Café</h3>
              <p className="text-xs text-emerald-200/80 mt-1">Jl. Kemang Raya No. 45B, Mampang Prapatan, Jakarta Selatan</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl bg-[#1C3121]">
              <div className="aspect-video w-full bg-stone-900 relative">
                <iframe
                  title="Lokasi Acara"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.123456789!2d106.815!3d-6.275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTYnMzAuMCJTIDEwNsKwNDgnNTQuMCJF!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full filter contrast-105"
                />
              </div>

              <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#122316]">
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">Area Parkir & Playground Luas</p>
                  <p className="text-[11px] text-emerald-300/80">Indoor AC + Outdoor Safari Playground</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Kemang+Jakarta+Selatan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-lime-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: DRESSCODE */}
        <section className="px-6 py-6">
          <div className="max-w-lg mx-auto rounded-2xl bg-amber-500/10 border border-amber-400/30 p-5 text-center">
            <span className="text-xl">👕 👒</span>
            <h4 className="font-serif font-bold text-amber-300 text-sm mt-1">Dresscode Petualang Safari</h4>
            <p className="text-xs text-emerald-100/90 mt-1 max-w-sm mx-auto">
              Kenakan pakaian bernuansa <strong className="text-amber-300">Khaki, Olive Green, Cokelat Tanah</strong> atau bermotif satwa lucu. Topi petualang akan dibagikan di lokasi!
            </p>
          </div>
        </section>

        {/* SECTION 6: GALERI FOTO */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-sans font-bold">Momen Ceria</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Tumbuh Kembang Kenzo</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {SAFARI_PHOTOS.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIdx(idx)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-emerald-500/20 bg-emerald-950/60"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedPhotoIdx(null)}
              className="absolute top-4 right-4 text-white hover:text-amber-300 transition-colors p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative max-w-2xl w-full flex flex-col items-center">
              <img
                src={SAFARI_PHOTOS[selectedPhotoIdx].src}
                alt={SAFARI_PHOTOS[selectedPhotoIdx].caption}
                className="max-h-[75vh] w-auto rounded-lg shadow-2xl object-contain"
              />
              <p className="text-center text-xs text-emerald-200 mt-3">
                {SAFARI_PHOTOS[selectedPhotoIdx].caption}
              </p>
            </div>
          </div>
        )}

        {/* SECTION 7: TABUNGAN & KADO MAINAN */}
        <section className="px-6 py-10 bg-[#0E1A11]/60 border-y border-emerald-900/30">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-sans font-bold">Tanda Kasih</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Kado & Tabungan Kenzo</h3>
              <p className="text-xs text-emerald-200/80 mt-1">
                Kehadiran dan senyum teman-teman adalah kado terindah bagi Kenzo. Bagi yang ingin mengirimkan kado mainan atau tabungan:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#1C3121] border border-emerald-500/25 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-xs uppercase text-white">Bank BCA</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-200">Tabungan Anak</span>
                </div>
                <p className="font-mono text-lg font-bold text-amber-300 tracking-wider">731-089-2341</p>
                <p className="text-xs text-emerald-200/80 mt-0.5">a.n. Aditya Dirgantara (QQ Kenzo)</p>
                <button
                  onClick={() => handleCopy('7310892341', 'Rekening BCA')}
                  className="mt-3 w-full py-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/30 text-xs font-semibold text-amber-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedBank === 'Rekening BCA' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBank === 'Rekening BCA' ? 'Tersalin' : 'Salin Nomor Rekening'}</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#1C3121] border border-emerald-500/25 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-xs uppercase text-white">Alamat Pengiriman Kado</span>
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  Jl. Ampera Raya No. 12, Cilandak Timur, Pasar Minggu, Jakarta Selatan 12560 (Penerima: Kenzo / Aditya - 0812-9876-1234)
                </p>
                <button
                  onClick={() => handleCopy('Jl. Ampera Raya No. 12, Cilandak Timur, Pasar Minggu, Jakarta Selatan 12560 (Penerima: Kenzo / Aditya - 0812-9876-1234)', 'Alamat Rumah', true)}
                  className="mt-3 w-full py-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/30 text-xs font-semibold text-amber-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAddress ? 'Alamat Tersalin' : 'Salin Alamat Rumah'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: RSVP & PILIHAN MENU */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-sans font-bold">Konfirmasi Kehadiran</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">RSVP & Pilihan Menu Anak</h3>
            </div>

            <form onSubmit={handleSubmitRsvp} className="p-6 rounded-2xl bg-[#1C3121] border border-emerald-500/25 shadow-xl space-y-4">
              <div>
                <label className="block text-xs font-medium text-emerald-200 mb-1">Nama Teman / Keluarga</label>
                <input
                  type="text"
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Contoh: Tante Sarah & Ken"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#132317] border border-emerald-500/30 text-white placeholder-emerald-400/40 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-emerald-200 mb-1">Pilihan Menu Favorit Anak</label>
                <select
                  value={mealPreference}
                  onChange={(e) => setMealPreference(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#132317] border border-emerald-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="Chicken Nuggets & Fries">Crispy Chicken Nuggets & Fries 🍟</option>
                  <option value="Macaroni Cheese">Creamy Macaroni & Cheese 🧀</option>
                  <option value="Safari Bento Rice">Safari Animal Bento Rice 🍱</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-emerald-200 mb-1">Ucapan Ulang Tahun untuk Kenzo</label>
                <textarea
                  rows={3}
                  value={blessingMessage}
                  onChange={(e) => setBlessingMessage(e.target.value)}
                  placeholder="Tulis ucapan dan doa seru untuk Kenzo..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#132317] border border-emerald-500/30 text-white placeholder-emerald-400/40 text-xs focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-lime-400 text-stone-950 font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Ucapan Ulang Tahun 🎈</span>
              </button>
            </form>

            <div className="mt-8 space-y-3">
              <h4 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider">
                Ucapan Teman-Teman ({wishes.length})
              </h4>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {wishes.map((w) => (
                  <div key={w.id} className="p-4 rounded-xl bg-[#1C3121]/80 border border-emerald-500/15 text-left">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-white text-xs">{w.name}</span>
                      <span className="text-[10px] text-emerald-300/60 font-mono">{w.time}</span>
                    </div>
                    <div className="inline-block px-2 py-0.5 rounded bg-emerald-950 text-amber-300 text-[10px] font-mono mb-2">
                      Menu: {w.meal}
                    </div>
                    <p className="text-xs text-emerald-100/90 leading-relaxed font-sans">{w.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 pt-8 pb-12 text-center text-xs text-emerald-300/60 border-t border-emerald-900/30 space-y-2">
          <p className="font-serif text-amber-300/80 italic text-sm">
            &ldquo;Semoga langkah kecilmu selalu dipenuhi tawa dan petualangan indah.&rdquo;
          </p>
          <p className="text-[11px] font-sans">
            Keluarga Kenzo Dirgantara • Playground Safari Café 2026
          </p>
          <p className="text-[10px] pt-4 font-mono text-emerald-400/50">
            Dibuat dengan penuh cinta oleh <span className="text-amber-300 font-serif">JanjiSuci.id</span>
          </p>
        </footer>
      </main>
    </div>
  )
}
