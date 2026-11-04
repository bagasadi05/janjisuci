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
import { RoyalKhitanCoverScreen } from './RoyalKhitanCoverScreen'
import { RoyalKhitanDesktopShowcase } from './RoyalKhitanDesktopShowcase'
import { useInvitationData } from '../../context/InvitationContext'
import { useToast } from '../../components/Toast'

const KHITAN_PHOTOS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1200&q=85',
    caption: 'Lantunan Doa & Ayat Suci Al-Qur\'an'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=85',
    caption: 'Kemegahan Masjid Agung Walimah'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1720238281687-dcc6d8a6e7d4?auto=format&fit=crop&crop=top,right&w=1200&h=1200&q=85',
    caption: 'Senyum Bahagia Buah Hati Sholeh'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=85',
    caption: 'Keberkahan & Rahmat Ilahi'
  }
]

export const RoyalKhitanTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack
}) => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const { showToast } = useToast()

  const childName = weddingData.couple.groom.fullName || activeTemplate.sampleCouple?.groomFull || 'Muhammad Rizky Pratama'
  const childShort = weddingData.couple.groom.shortName || activeTemplate.sampleCouple?.groomShort || 'Kiki'
  const parentsName = weddingData.couple.groom.fatherName && weddingData.couple.groom.motherName
    ? `Bpk. ${weddingData.couple.groom.fatherName} & Ibu ${weddingData.couple.groom.motherName}`
    : 'Bpk. Hendra Gunawan & Ibu Dian Sastro'
  const dateText = weddingData.events.akad.date
  const timeText = weddingData.events.akad.time
  const venueText = weddingData.events.akad.venue
  const addressText = weddingData.events.akad.address
  const mapsUrl = weddingData.events.akad.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(addressText || venueText)}`
  const targetDateStr = weddingData.countdownDate || '2027-07-12T09:00:00+07:00'
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
  const [guestCount, setGuestCount] = useState<number>(1)
  const [blessingMessage, setBlessingMessage] = useState('')
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'Ustadz Ahmad & Keluarga',
      attendance: 'hadir',
      message: 'Barakallahu fiik. Semoga ananda Kiki lekas pulih, tumbuh menjadi anak yang sholeh, cerdas, dan membanggakan orang tua serta agama. Aamiin.',
      time: '1 jam yang lalu'
    },
    {
      id: 2,
      name: 'Keluarga Bpk. Rahmat Santoso',
      attendance: 'hadir',
      message: 'Selamat atas khitanan ananda Kiki! Semoga dilancarkan semua acaranya dan berkah untuk sekeluarga.',
      time: '3 jam yang lalu'
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
      showToast('Mohon tulis ucapan atau doa untuk ananda', 'info')
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
    showToast('Terima kasih atas doa dan konfirmasinya!', 'success')
  }

  return (
    <div className="min-h-screen bg-[#021812] text-slate-100 flex flex-col lg:flex-row relative selection:bg-amber-400 selection:text-slate-900 font-sans">
      <RoyalKhitanCoverScreen
        isOpen={isOpened}
        onOpenWithAudio={onOpenWithAudio}
        guestName={guestName}
        childName={childName}
        dateText={dateText}
      />

      <RoyalKhitanDesktopShowcase
        childName={childName}
        dateText={dateText}
        venueText={venueText}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
        activeTrack={activeTrack}
        targetDate={targetDateStr}
      />

      <main className="w-full lg:w-7/12 min-h-screen pb-24 overflow-x-hidden relative z-10">
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <button
            onClick={onToggleAudio}
            className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-transform cursor-pointer"
            aria-label={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
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
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-amber-300/30 text-amber-200 text-xs font-serif uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Tasyakuran Walimatul Khitan</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-bold tracking-wide">
            {childName}
          </h1>
          <p className="text-sm font-serif italic text-amber-300/90 mt-1">(Ananda {childShort})</p>

          <p className="text-xs font-mono tracking-widest text-emerald-200/80 mt-2">
            {dateText}
          </p>

          <div className="relative my-8">
            <div className="w-52 sm:w-60 h-72 sm:h-84 rounded-t-full rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-amber-400/40 via-emerald-400/20 to-transparent shadow-2xl">
              <img
                src={weddingData.couple.groom.photo || activeTemplate.sampleCouple?.groomPhoto || template?.heroImage || "https://images.unsplash.com/photo-1720238281687-dcc6d8a6e7d4?auto=format&fit=crop&crop=top,right&w=800&h=800&q=85"}
                alt={`Khitanan ${childName}`}
                width={240}
                height={336}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
            </div>
            <div className="absolute -inset-2 rounded-t-full rounded-b-3xl border border-amber-400/20 pointer-events-none -z-10" />
          </div>

          <p className="max-w-md text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans px-4">
            Bismillahirahmanirrahim. Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara tasyakuran khitanan putra kami.
          </p>
        </section>

        {/* SECTION 2: DOA KHITAN */}
        <section className="px-6 py-10">
          <div className="max-w-lg mx-auto rounded-2xl bg-gradient-to-b from-[#063327] to-[#032219] border border-emerald-400/20 p-6 sm:p-8 text-center shadow-xl">
            <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4 text-amber-300">
              <Heart className="w-5 h-5 fill-amber-300/30" />
            </div>

            <p className="font-serif text-amber-200/90 text-sm tracking-widest uppercase mb-4">
              Doa Untuk Anak Yang Dikhitan
            </p>

            <blockquote className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed italic mb-4">
              &ldquo;Ya Allah, jadikanlah ananda putra yang sholeh, taat beribadah kepada-Mu, berbakti kepada kedua orang tua, dan membawa manfaat serta keberkahan bagi nusa, bangsa, dan agama.&rdquo;
            </blockquote>

            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-amber-300/90">
              Aamiin Ya Rabbal 'Alamin
            </span>
          </div>
        </section>

        {/* SECTION 3: PROFIL ANAK & ORANG TUA */}
        <section className="px-6 py-10">
          <div className="max-w-lg mx-auto text-center space-y-4">
            <div className="w-36 h-36 rounded-full overflow-hidden mx-auto border-2 border-amber-400/40 p-1 shadow-lg bg-emerald-950/60">
              <img
                src={weddingData.couple.groom.photo || activeTemplate.sampleCouple?.groomPhoto || "https://images.unsplash.com/photo-1720238281687-dcc6d8a6e7d4?auto=format&fit=crop&crop=top,right&w=600&h=600&q=85"}
                alt={childName}
                width={144}
                height={144}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-300">
                Putra Tercinta Dari
              </span>
              <h3 className="text-xl font-serif text-white font-semibold">
                {parentsName}
              </h3>
              <p className="text-xs text-emerald-200/80 max-w-sm mx-auto pt-1">
                Semoga Allah senantiasa membimbing langkah ananda menuju masa depan yang cerah dan diridhoi-Nya.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: JADWAL ACARA */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-serif tracking-widest uppercase text-amber-300/80">
                Waktu &amp; Tempat
              </span>
              <h2 className="text-3xl font-serif text-white">Rangkaian Acara</h2>
            </div>

            <div className="rounded-2xl bg-gradient-to-b from-[#063327] to-[#032219] border border-emerald-400/20 p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-400/15 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-amber-100 font-semibold">
                      Tasyakuran &amp; Ramah Tamah
                    </h3>
                    <p className="text-[11px] text-emerald-200/70 font-mono">Walimatul Khitan</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 font-medium border border-amber-400/20">
                  Syukuran
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-emerald-100/90 font-sans">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{dateText}</p>
                    <p className="text-emerald-200/70 text-xs">{timeText}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{venueText}</p>
                    <p className="text-emerald-200/70 text-xs leading-relaxed">
                      {addressText}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[130px] min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/30 text-xs text-white font-medium transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-300" />
                  <span>Petunjuk Peta Maps</span>
                </a>
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Walimatul Khitan ${childName}`)}&location=${encodeURIComponent(addressText)}&details=${encodeURIComponent(`Tasyakuran Walimatul Khitan ${childName}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-emerald-200 hover:text-white transition-all cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Simpan Kalender</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: COUNTDOWN */}
        <section className="px-6 py-10">
          <div className="max-w-lg mx-auto text-center space-y-6">
            <h2 className="text-2xl font-serif text-white">Hitung Mundur Acara</h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              <div className="bg-[#053024]/90 border border-emerald-400/25 rounded-xl p-3 shadow-lg">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">{timeLeft.days}</div>
                <div className="text-[11px] text-emerald-200/70 font-sans uppercase mt-1">Hari</div>
              </div>
              <div className="bg-[#053024]/90 border border-emerald-400/25 rounded-xl p-3 shadow-lg">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">{timeLeft.hours}</div>
                <div className="text-[11px] text-emerald-200/70 font-sans uppercase mt-1">Jam</div>
              </div>
              <div className="bg-[#053024]/90 border border-emerald-400/25 rounded-xl p-3 shadow-lg">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">{timeLeft.minutes}</div>
                <div className="text-[11px] text-emerald-200/70 font-sans uppercase mt-1">Menit</div>
              </div>
              <div className="bg-[#053024]/90 border border-emerald-400/25 rounded-xl p-3 shadow-lg">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">{timeLeft.seconds}</div>
                <div className="text-[11px] text-emerald-200/70 font-sans uppercase mt-1">Detik</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: GALERI FOTO */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-serif tracking-widest uppercase text-amber-300/80">
                Dokumentasi
              </span>
              <h2 className="text-3xl font-serif text-white">Galeri Ceria</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {KHITAN_PHOTOS.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIdx(idx)}
                  className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg border border-emerald-400/20 h-40 sm:h-48"
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

        {/* SECTION 7: TABUNGAN KADO KHITAN */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-serif tracking-widest uppercase text-amber-300/80">
                Tanda Kasih
              </span>
              <h2 className="text-3xl font-serif text-white">Tabungan Kado Khitan</h2>
              <p className="text-xs text-emerald-200/80 max-w-md mx-auto leading-relaxed pt-1">
                Doa restu Anda merupakan karunia yang sangat berharga. Apabila Bapak/Ibu berkehendak memberikan tanda kasih berupa kado tabungan untuk ananda, dapat melalui:
              </p>
            </div>

            {weddingData.gift.accounts && weddingData.gift.accounts.length > 0 && (
              <div className="space-y-3">
                {weddingData.gift.accounts.map((acc, idx) => (
                  <div key={idx} className="rounded-2xl bg-gradient-to-tr from-[#06382B] to-[#04261D] border border-emerald-400/20 p-5 shadow-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="px-3 py-1 rounded-md bg-blue-600/40 border border-blue-400/30 text-white font-bold text-xs tracking-wider">
                        {acc.bank}
                      </div>
                      <CreditCard className="w-5 h-5 text-amber-300/80" />
                    </div>
                    <p className="text-[11px] text-emerald-200/70 font-mono uppercase">Nomor Rekening</p>
                    <p className="text-lg sm:text-xl font-mono font-bold text-amber-200 tracking-wider">
                      {acc.accountNumber}
                    </p>
                    <p className="text-xs text-emerald-100/80">a.n. {acc.accountHolder || acc.holderName}</p>
                    <button
                      onClick={() => handleCopy(acc.accountNumber, `Rekening ${acc.bank}`)}
                      className="w-full min-h-[44px] py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      {copiedBank === `Rekening ${acc.bank}` ? (
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
                ))}
              </div>
            )}

            {weddingData.gift.giftAddress && (
              <div className="rounded-2xl bg-gradient-to-b from-[#063327] to-[#032219] border border-emerald-400/20 p-5 shadow-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-amber-300" />
                  <h4 className="text-base font-serif text-white font-semibold">Kirim Kado Mainan/Buku</h4>
                </div>
                <div className="text-xs text-emerald-100/80 space-y-1">
                  <p className="font-semibold text-white">
                    Penerima: {weddingData.gift.giftAddress.recipient || `Ananda ${childShort}`} ({weddingData.gift.giftAddress.phone})
                  </p>
                  <p className="leading-relaxed">
                    {weddingData.gift.giftAddress.address}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleCopy(
                      `${weddingData.gift.giftAddress.recipient || `Ananda ${childShort}`} - ${weddingData.gift.giftAddress.address} (${weddingData.gift.giftAddress.phone})`,
                      'Alamat Rumah',
                      true
                    )
                  }
                  className="w-full min-h-[44px] py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Alamat Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-300" />
                      <span>Salin Alamat Rumah</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 8: RSVP & BUKU TAMU */}
        <section className="px-6 py-12">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-serif tracking-widest uppercase text-amber-300/80">
                Untaian Doa
              </span>
              <h2 className="text-3xl font-serif text-white">RSVP &amp; Doa Restu</h2>
            </div>

            <form
              onSubmit={handleSubmitRsvp}
              className="rounded-2xl bg-gradient-to-b from-[#063327] to-[#032219] border border-emerald-400/20 p-5 sm:p-6 shadow-xl space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-emerald-200/80 mb-1">
                  Nama Anda
                </label>
                <input
                  type="text"
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Contoh: Om Budi &amp; Tante Rina"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-emerald-200/80 mb-1">
                  Konfirmasi Kehadiran
                </label>
                <select
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value as 'hadir' | 'tidak' | 'ragu')}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#063327] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-300"
                >
                  <option value="hadir">Insya Allah Hadir</option>
                  <option value="ragu">Masih Ragu</option>
                  <option value="tidak">Mohon Maaf Berhalangan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-emerald-200/80 mb-1">
                  Doa Untuk Ananda {childShort}
                </label>
                <textarea
                  rows={3}
                  value={blessingMessage}
                  onChange={(e) => setBlessingMessage(e.target.value)}
                  placeholder={`Tuliskan untaian doa dan selamat untuk ananda ${childShort}...`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-amber-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[44px] py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-slate-900" />
                <span>Kirim Doa Restu</span>
              </button>
            </form>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase tracking-wider text-emerald-200/70 font-mono font-medium">
                Untaian Doa ({wishes.length})
              </h4>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {wishes.map((w) => (
                  <div
                    key={w.id}
                    className="rounded-xl bg-[#063327]/80 border border-emerald-400/15 p-4 shadow-sm space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-white">{w.name}</span>
                      <span className="text-[10px] text-emerald-200/50">{w.time}</span>
                    </div>
                    <p className="text-xs text-emerald-100/90 leading-relaxed">{w.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FOOTER */}
        <footer className="px-6 pt-10 pb-16 text-center space-y-4">
          <h3 className="text-2xl font-serif text-amber-200">{childName}</h3>
          <p className="text-xs text-emerald-100/80 max-w-sm mx-auto leading-relaxed">
            Keluarga Besar {parentsName} mengucapkan terima kasih yang sebesar-besarnya atas doa restu Bapak/Ibu/Saudara/i sekalian.
          </p>
          <p className="text-[11px] text-emerald-200/50 pt-4 border-t border-emerald-400/15 font-mono">
            Digital Invitation by JanjiSuci.id
          </p>
        </footer>
      </main>

      {/* LIGHTBOX */}
      {selectedPhotoIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhotoIdx(null)}
            className="absolute top-5 right-5 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
            aria-label="Tutup Foto"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-3xl max-h-[85vh] flex flex-col items-center">
            <img
              src={KHITAN_PHOTOS[selectedPhotoIdx].src}
              alt={KHITAN_PHOTOS[selectedPhotoIdx].caption}
              className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <p className="text-sm font-serif text-amber-200 mt-3 text-center px-4">
              {KHITAN_PHOTOS[selectedPhotoIdx].caption}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
