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
import { NusantaraKhitanCoverScreen } from './NusantaraKhitanCoverScreen'
import { NusantaraKhitanDesktopShowcase } from './NusantaraKhitanDesktopShowcase'
import { useInvitationData } from '../../context/InvitationContext'
import { useToast } from '../../components/Toast'

const KHITAN_PHOTOS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1720238281687-dcc6d8a6e7d4?auto=format&fit=crop&crop=top,right&w=1200&h=1200&q=85',
    caption: 'Senyum Ceria Raden Arya Danendra'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1566559532224-6d65e9fc0f37?auto=format&fit=crop&w=1200&q=85',
    caption: 'Nuansa Sakral Keagungan Borobudur'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1576233475048-55f08b53a8bd?auto=format&fit=crop&w=1200&q=85',
    caption: 'Warisan Luhur Budaya Candi Prambanan'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1200&q=85',
    caption: 'Momen Bersejarah Doa & Syukur Walimah'
  }
]

export const NusantaraKhitanTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack
}) => {
  const { data: weddingData } = useInvitationData()
  const { showToast } = useToast()

  const targetDateStr = '2027-09-06T09:00:00+07:00'
  const [copiedBank, setCopiedBank] = useState<string | null>(null)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null)

  const [guestNameInput, setGuestNameInput] = useState('')
  const [attendance, setAttendance] = useState<'hadir' | 'tidak' | 'ragu'>('hadir')
  const [blessingMessage, setBlessingMessage] = useState('')
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'Keluarga Bpk. H. Bambang Sudiro',
      attendance: 'hadir',
      message: 'Ndherek bingah awit khitananipun ananda Raden Arya Danendra. Mugi dados lare ingkang sholeh, mikul dhuwur mendhem jero dhumateng tiyang sepuh lan migunani tumrap sesami.',
      time: '1 jam yang lalu'
    },
    {
      id: 2,
      name: 'Bpk. Ir. Joko Susanto & Ibu',
      attendance: 'hadir',
      message: 'Selamat atas khitanan ananda Arya! Lekas sembuh, tambah pintar dan sholeh, aamiin ya rabbal alamin.',
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
      showToast('Mohon tulis doa pangestu untuk ananda', 'info')
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
    showToast('Matur nuwun sanget awit donga pangestunipun!', 'success')
  }

  return (
    <div className="min-h-screen bg-[#17120E] text-stone-100 flex flex-col lg:flex-row relative selection:bg-amber-500 selection:text-stone-900 font-sans">
      <NusantaraKhitanCoverScreen
        isOpen={isOpened}
        onOpenWithAudio={onOpenWithAudio}
        guestName={guestName}
        childName="Raden Arya Danendra"
        dateText="Minggu, 06 September 2026"
      />

      <NusantaraKhitanDesktopShowcase
        childName="Raden Arya Danendra"
        dateText="Minggu, 06 September 2026"
        venueText="Pendopo Sasana Krida, Malioboro Yogyakarta"
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
        activeTrack={activeTrack}
        targetDate={targetDateStr}
      />

      <main className="w-full lg:w-7/12 min-h-screen pb-24 overflow-x-hidden relative z-10">
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <button
            onClick={onToggleAudio}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-stone-950 flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.5)] active:scale-95 transition-transform"
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
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-400/40 text-amber-300 text-xs font-serif uppercase tracking-widest mb-4">
            <span>⚜️</span>
            <span>Tasyakuran Walimatul Khitan</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 font-bold tracking-wide">
            Raden Arya Danendra
          </h1>
          <p className="text-sm font-serif italic text-amber-300/90 mt-1">
            (Ananda Arya)
          </p>

          <p className="text-xs font-mono tracking-widest text-amber-200/80 mt-2">
            Minggu, 06 September 2026 • 09.00 - 13.00 WIB
          </p>

          <div className="relative my-8">
            <div className="w-52 sm:w-60 h-72 sm:h-84 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-amber-400/50 via-yellow-600/30 to-amber-950 shadow-2xl">
              <img
                src={weddingData.couple.groom.photo || "https://images.unsplash.com/photo-1720238281687-dcc6d8a6e7d4?auto=format&fit=crop&crop=top,right&w=800&h=800&q=85"}
                alt="Raden Arya Danendra"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
            </div>
            <div className="absolute -inset-2 rounded-3xl border border-amber-500/20 pointer-events-none -z-10" />
          </div>

          <p className="max-w-md text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans px-4">
            Assalamu’alaikum Warahmatullahi Wabarakatuh. Kanthi hangajab rahmat sarta barokahing Gusti Allah SWT, kula sakulawarga ngaturaken serat ulem tasyakuran khitanan putra kula.
          </p>
        </section>

        {/* SECTION 2: DOA KHITAN & KELUARGA */}
        <section className="px-6 py-8">
          <div className="max-w-lg mx-auto rounded-2xl bg-gradient-to-b from-[#231B15] to-[#17120E] border border-amber-500/20 p-6 sm:p-8 text-center shadow-xl">
            <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4 text-amber-300">
              <Heart className="w-5 h-5 fill-amber-300/30" />
            </div>

            <p className="font-serif text-amber-300 text-sm tracking-widest uppercase mb-3">
              Donga Pangestu Kagem Ananda
            </p>

            <blockquote className="text-xs sm:text-sm text-amber-100/90 leading-relaxed italic mb-4 font-serif">
              &ldquo;Ya Allah, mugi paringana ananda Arya dados putra ingkang sholeh, bekti dhumateng tiyang sepuh kalih, migunani tumrap agami, bangsa, lan nagari.&rdquo;
            </blockquote>

            <div className="pt-2 border-t border-amber-500/15 text-xs text-amber-200/90">
              <p className="text-[11px] uppercase tracking-wider text-amber-300/60 mb-1">Putra Tercinta Dari Pasangan:</p>
              <p className="font-serif font-bold text-white text-sm">Bpk. R. Danang Suroso & Ibu Ayu Wardani</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: RUNDOWN ACARA */}
        <section className="px-6 py-10 bg-[#100C09]/60 border-y border-amber-900/30">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-serif">Reroncening Adicara</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Susunan Acara Tasyakuran</h3>
            </div>

            <div className="space-y-3">
              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#231B15]/80 border border-amber-500/15">
                <div className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 font-mono text-xs font-bold shrink-0">
                  09.00 - 09.30
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-sm">Pasrah Tinampi Rawuhipun Tamu Undangan</h4>
                  <p className="text-xs text-amber-200/80 mt-0.5">Penyambutan tamu dengan gending Jawa uyon-uyon klasik.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#231B15]/80 border border-amber-500/15">
                <div className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 font-mono text-xs font-bold shrink-0">
                  09.30 - 10.30
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-sm">Khotmil Qur'an & Doa Walimatul Khitan</h4>
                  <p className="text-xs text-amber-200/80 mt-0.5">Lantunan ayat suci Al-Qur'an dan doa keselamatan untuk ananda Arya.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#231B15]/80 border border-amber-500/15">
                <div className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 font-mono text-xs font-bold shrink-0">
                  10.30 - 11.30
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-sm">Sungkeman Ananda & Tausiyah Singkat</h4>
                  <p className="text-xs text-amber-200/80 mt-0.5">Sungkeman ananda kepada kedua orang tua memohon restu dan bimbingan.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#231B15]/80 border border-amber-500/15">
                <div className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 font-mono text-xs font-bold shrink-0">
                  11.30 - 13.00
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-sm">Bojana Andrawina & Foto Sesarengan</h4>
                  <p className="text-xs text-amber-200/80 mt-0.5">Santap siang hidangan prasmanan khas keraton dan ramah tamah.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: LOKASI & GOOGLE MAPS */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-serif">Papan Palenggahan</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Pendopo Sasana Krida</h3>
              <p className="text-xs text-amber-200/80 mt-1">Jl. Malioboro No. 56, Sosromenduran, Gedong Tengen, Kota Yogyakarta</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl bg-[#231B15]">
              <div className="aspect-video w-full bg-stone-900 relative">
                <iframe
                  title="Lokasi Acara"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.923456789!2d110.365!3d-7.795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDcnNDIuMCJTIDExMMKwMjEnNTQuMCJF!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full filter contrast-105"
                />
              </div>

              <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#17120E]">
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">Area Pendopo Tradisional</p>
                  <p className="text-[11px] text-amber-300/80">Parkir Luas & Akses Strategis Pusat Kota</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Malioboro+Yogyakarta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: GALERI FOTO */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-serif">Dokumentasi</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Galeri Kenangan Ananda</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {KHITAN_PHOTOS.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIdx(idx)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-amber-500/20 bg-amber-950/60"
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
                src={KHITAN_PHOTOS[selectedPhotoIdx].src}
                alt={KHITAN_PHOTOS[selectedPhotoIdx].caption}
                className="max-h-[75vh] w-auto rounded-lg shadow-2xl object-contain"
              />
              <p className="text-center text-xs text-amber-200 mt-3 font-serif">
                {KHITAN_PHOTOS[selectedPhotoIdx].caption}
              </p>
            </div>
          </div>
        )}

        {/* SECTION 6: CELENGAN TABUNGAN ANANDA */}
        <section className="px-6 py-10 bg-[#100C09]/60 border-y border-amber-900/30">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-serif">Tandha Asih</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">Kado & Tabungan Ananda</h3>
              <p className="text-xs text-amber-200/80 mt-1 max-w-sm mx-auto">
                Donga pangestu panjenengan dados kanugrahan ingkang tanpa upami. Kagem ingkang kepareng ngaturaken tandha asih:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#231B15] border border-amber-500/25 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-xs uppercase text-white">Bank Mandiri</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/60 text-amber-200">Tabungan Anak</span>
                </div>
                <p className="font-mono text-lg font-bold text-amber-300 tracking-wider">137-00-1982341-0</p>
                <p className="text-xs text-amber-200/80 mt-0.5">a.n. Danang Suroso (QQ Arya Danendra)</p>
                <button
                  onClick={() => handleCopy('1370019823410', 'Rekening Mandiri')}
                  className="mt-3 w-full py-2 rounded-lg bg-amber-950 hover:bg-amber-900 border border-amber-500/30 text-xs font-semibold text-amber-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedBank === 'Rekening Mandiri' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBank === 'Rekening Mandiri' ? 'Tersalin' : 'Salin Nomor Rekening'}</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#231B15] border border-amber-500/25 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-xs uppercase text-white">Alamat Pengiriman Kado</span>
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  Jl. Sagan Kidul No. 18, Gondokusuman, Kota Yogyakarta 55223 (Penerima: Danang Suroso - 0812-3456-9988)
                </p>
                <button
                  onClick={() => handleCopy('Jl. Sagan Kidul No. 18, Gondokusuman, Kota Yogyakarta 55223 (Penerima: Danang Suroso - 0812-3456-9988)', 'Alamat Rumah', true)}
                  className="mt-3 w-full py-2 rounded-lg bg-amber-950 hover:bg-amber-900 border border-amber-500/30 text-xs font-semibold text-amber-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAddress ? 'Alamat Tersalin' : 'Salin Alamat Rumah'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: RSVP & DONGA PANGESTU */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-serif">Konfirmasi Rawuh</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">RSVP & Donga Pangestu</h3>
            </div>

            <form onSubmit={handleSubmitRsvp} className="p-6 rounded-2xl bg-[#231B15] border border-amber-500/25 shadow-xl space-y-4">
              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">Nama Jenengan</label>
                <input
                  type="text"
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Tuladha: Bpk. Bambang & Garwa"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#17120E] border border-amber-500/30 text-white placeholder-amber-400/40 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">Katrangan Rawuh</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttendance('hadir')}
                    className={`py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      attendance === 'hadir'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                        : 'bg-[#17120E] border-amber-500/30 text-amber-300'
                    }`}
                  >
                    Kepareng Rawuh
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('ragu')}
                    className={`py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      attendance === 'ragu'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                        : 'bg-[#17120E] border-amber-500/30 text-amber-300'
                    }`}
                  >
                    Taksih Rangu
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('tidak')}
                    className={`py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      attendance === 'tidak'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                        : 'bg-[#17120E] border-amber-500/30 text-amber-300'
                    }`}
                  >
                    Nyenyuwun Donga
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">Donga Pangestu kagem Ananda</label>
                <textarea
                  rows={3}
                  value={blessingMessage}
                  onChange={(e) => setBlessingMessage(e.target.value)}
                  placeholder="Kintun donga pangestu kagem ananda Arya..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#17120E] border border-amber-500/30 text-white placeholder-amber-400/40 text-xs focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Donga Pangestu ⚜️</span>
              </button>
            </form>

            <div className="mt-8 space-y-3">
              <h4 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider">
                Donga Saking Sedherek ({wishes.length})
              </h4>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {wishes.map((w) => (
                  <div key={w.id} className="p-4 rounded-xl bg-[#231B15]/80 border border-amber-500/15 text-left">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-serif font-bold text-white text-xs">{w.name}</span>
                      <span className="text-[10px] text-amber-300/60 font-mono">{w.time}</span>
                    </div>
                    <p className="text-xs text-amber-100/90 leading-relaxed font-sans">{w.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 pt-8 pb-12 text-center text-xs text-amber-300/60 border-t border-amber-900/30 space-y-2">
          <p className="font-serif text-amber-200/80 italic text-sm">
            &ldquo;Mugi ananda dados lare ingkang migunani tumrap bangsa lan nagari.&rdquo;
          </p>
          <p className="text-[11px] font-sans">
            Kulawarga Ageng Bpk. Danang Suroso • Pendopo Sasana Krida Yogyakarta 2026
          </p>
          <p className="text-[10px] pt-4 font-mono text-amber-400/50">
            Dipun damel kanthi tresna dening <span className="text-amber-300 font-serif">JanjiSuci.id</span>
          </p>
        </footer>
      </main>
    </div>
  )
}
