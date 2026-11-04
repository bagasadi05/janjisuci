import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Copy,
  Check,
  Send,
  ExternalLink,
  CreditCard,
  Moon,
  Sparkles,
  Star
} from 'lucide-react'
import { useInvitationData } from '../../context/InvitationContext'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { CelestialNightCoverScreen } from './CelestialNightCoverScreen'
import { TwinklingStarsAmbiance } from './TwinklingStarsAmbiance'
import { CelestialNightDesktopShowcase } from './CelestialNightDesktopShowcase'
import { useToast } from '../../components/Toast'

export const CelestialNightTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack,
  onNextTrack
}) => {
  const { data: weddingData } = useInvitationData()
  const { showToast } = useToast()
  const [copiedBank, setCopiedBank] = useState<string | null>(null)

  // RSVP Form States
  const [guestName, setGuestName] = useState('')
  const [attendance, setAttendance] = useState<'hadir' | 'tidak' | 'ragu'>('hadir')
  const [blessingMessage, setBlessingMessage] = useState('')
  const [wishes, setWishes] = useState([
    {
      name: 'Aditya & Stephanie',
      attendance: 'hadir',
      message: 'Semoga cinta kalian abadi bagaikan bintang-bintang di angkasa, saling menerangi dalam setiap langkah kehidupan.',
      time: '1 jam yang lalu'
    },
    {
      name: 'dr. Farhan Pratama',
      attendance: 'hadir',
      message: 'Selamat menempuh hidup baru sahabatku! Konsep celestial night-nya magis dan luar biasa indah.',
      time: '3 jam yang lalu'
    }
  ])

  const handleCopy = (text: string, bank: string) => {
    navigator.clipboard.writeText(text)
    setCopiedBank(bank)
    showToast(`Nomor rekening ${bank} berhasil disalin!`, 'success')
    setTimeout(() => setCopiedBank(null), 2500)
  }

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestName.trim() || !blessingMessage.trim()) {
      showToast('Mohon tuliskan nama dan doa restu Anda', 'info')
      return
    }

    setWishes((prev) => [
      {
        name: guestName,
        attendance,
        message: blessingMessage,
        time: 'Baru saja'
      },
      ...prev
    ])

    setGuestName('')
    setBlessingMessage('')
    showToast('Terima kasih! Doa restu Anda telah dipanjatkan ke langit.', 'success')
  }

  return (
    <div className="min-h-screen bg-[#0B132B] flex justify-center text-stone-200 selection:bg-[#F4D06F] selection:text-stone-950 overflow-x-hidden pt-16">
      {/* Cover Gate: Constellation Orbit Gate */}
      <CelestialNightCoverScreen isOpen={isOpened} onOpenWithAudio={onOpenWithAudio} />

      {/* Ambiance: Twinkling Stars & Meteors */}
      <TwinklingStarsAmbiance active={isOpened} />

      {/* Adaptive Layout: Dual-Column Desktop vs Mobile */}
      <div className="w-full flex flex-col lg:flex-row min-h-screen">
        {/* Left Column: Desktop Sticky Showcase */}
        <CelestialNightDesktopShowcase
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={onToggleAudio}
          activeTrack={activeTrack}
          onNextTrack={onNextTrack}
        />

        {/* Right Column: Celestial Scrollable Content */}
        <div className="w-full lg:w-[58%] xl:w-[62%] min-h-screen shadow-2xl relative border-l border-[#F4D06F]/20 bg-[#0B132B]">
          <main className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-16">
            {/* 1. HERO SECTION */}
            <section className="text-center relative pt-6 pb-8">
              <div className="flex justify-center mb-3">
                <Moon className="w-12 h-12 text-[#F4D06F] animate-pulse" />
              </div>

              <span className="text-[10px] uppercase tracking-[0.35em] text-[#F4D06F] font-semibold block mb-2">
                PERNIKAHAN ABADI DI BAWAH NAUNGAN BINTANG
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF9] via-[#F4D06F] to-[#E0E1DD] leading-tight">
                {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
              </h1>

              {/* Crystal Oval Frame */}
              <div className="relative mx-auto w-64 sm:w-80 h-80 sm:h-96 rounded-full p-3 bg-gradient-to-b from-[#F4D06F]/40 via-[#1C2541] to-[#0B132B] border-2 border-[#F4D06F]/60 shadow-[0_0_50px_rgba(244,208,111,0.3)] my-6">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={template.heroImage}
                    alt="Celestial Couple"
                    className="w-full h-full object-cover object-center filter brightness-95"
                  />
                </div>
              </div>

              <p className="font-serif text-[#F4D06F] text-sm sm:text-base font-medium">
                {weddingData.events.akad.date}
              </p>
              <p className="text-xs text-stone-400 mt-1 font-sans">
                {weddingData.events.akad.venue}
              </p>
            </section>

            {/* 2. CELESTIAL LOVE QUOTE */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#1C2541]/70 border border-[#F4D06F]/30 text-center shadow-[0_0_30px_rgba(244,208,111,0.15)]">
              <div className="w-8 h-8 rounded-full bg-[#F4D06F]/10 text-[#F4D06F] flex items-center justify-center mx-auto mb-3">
                <Star className="w-4 h-4 fill-[#F4D06F]" />
              </div>
              <p className="font-serif italic text-white text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                "Dari apa pun jiwa kita tercipta, jiwaku dan jiwanya adalah satu. Di tengah luasnya semesta dan keabadian waktu, adalah sebuah anugerah terindah dapat berbagi orbit kehidupan bersamamu."
              </p>
              <p className="text-[10px] uppercase tracking-widest text-[#F4D06F] font-sans font-bold mt-3">
                — EMILY BRONTË & CARL SAGAN —
              </p>
            </section>

            {/* 3. COUPLE SECTION */}
            <section className="space-y-8">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#F4D06F] font-semibold">
                  DUA JIWA BERSATU
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                  Mempelai Pengantin
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Groom */}
                <div className="p-6 rounded-3xl bg-[#1C2541]/80 border border-[#F4D06F]/30 text-center space-y-3">
                  <div className="w-36 h-36 mx-auto rounded-full p-1.5 border-2 border-dashed border-[#F4D06F]/60">
                    <img
                      src={weddingData.couple.groom.photo}
                      alt={weddingData.couple.groom.fullName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="px-3 py-0.5 rounded-full bg-[#0B132B] border border-[#F4D06F]/30 text-[#F4D06F] text-[10px] uppercase tracking-widest inline-block">
                    Mempelai Pria
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {weddingData.couple.groom.fullName}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Putra dari Bpk. {weddingData.couple.groom.fatherName} & Ibu {weddingData.couple.groom.motherName}
                  </p>
                </div>

                {/* Bride */}
                <div className="p-6 rounded-3xl bg-[#1C2541]/80 border border-[#F4D06F]/30 text-center space-y-3">
                  <div className="w-36 h-36 mx-auto rounded-full p-1.5 border-2 border-dashed border-[#F4D06F]/60">
                    <img
                      src={weddingData.couple.bride.photo}
                      alt={weddingData.couple.bride.fullName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="px-3 py-0.5 rounded-full bg-[#0B132B] border border-[#F4D06F]/30 text-[#F4D06F] text-[10px] uppercase tracking-widest inline-block">
                    Mempelai Wanita
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {weddingData.couple.bride.fullName}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Putri dari Bpk. {weddingData.couple.bride.fatherName} & Ibu {weddingData.couple.bride.motherName}
                  </p>
                </div>
              </div>
            </section>

            {/* 4. CONSTELLATION EVENTS */}
            <section className="space-y-6">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#F4D06F] font-semibold">
                  RANGKAIAN ACARA
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                  Jadwal Acara Pernikahan
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Akad */}
                <div className="p-6 rounded-3xl bg-[#1C2541]/80 border border-[#F4D06F]/30 space-y-3">
                  <div className="flex items-center gap-2 text-[#F4D06F] font-serif font-bold text-lg border-b border-white/10 pb-2">
                    <Sparkles className="w-5 h-5 text-[#F4D06F]" />
                    <span>Akad Nikah</span>
                  </div>
                  <div className="space-y-2 text-xs text-stone-300">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#F4D06F]" />
                      <span>{weddingData.events.akad.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#F4D06F]" />
                      <span>{weddingData.events.akad.time}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#F4D06F] shrink-0 mt-0.5" />
                      <span>{weddingData.events.akad.venue} — {weddingData.events.akad.address}</span>
                    </div>
                  </div>
                </div>

                {/* Resepsi */}
                <div className="p-6 rounded-3xl bg-[#1C2541]/80 border border-[#F4D06F]/30 space-y-3">
                  <div className="flex items-center gap-2 text-[#F4D06F] font-serif font-bold text-lg border-b border-white/10 pb-2">
                    <Moon className="w-5 h-5 text-[#F4D06F]" />
                    <span>Resepsi Malam Bertabur Bintang</span>
                  </div>
                  <div className="space-y-2 text-xs text-stone-300">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#F4D06F]" />
                      <span>{weddingData.events.resepsi.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#F4D06F]" />
                      <span>{weddingData.events.resepsi.time}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#F4D06F] shrink-0 mt-0.5" />
                      <span>{weddingData.events.resepsi.venue} — {weddingData.events.resepsi.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maps Link */}
              <div className="text-center pt-2">
                <a
                  href={weddingData.events.akad.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F4D06F] to-[#FFE29A] text-stone-950 font-serif font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Buka Titik Lokasi di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>

            {/* 5. DRESS CODE */}
            <section className="p-6 sm:p-8 rounded-3xl bg-[#1C2541]/70 border border-[#F4D06F]/30 text-center space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F4D06F]">
                Kode Busana Tamu
              </h3>
              <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                Kami mengundang Bapak/Ibu/Saudara/i untuk hadir mengenakan pakaian bernuansa malam bertabur bintang:
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
                {[
                  { color: '#0B132B', name: 'Biru Dongker' },
                  { color: '#1C2541', name: 'Biru Kosmis' },
                  { color: '#F4D06F', name: 'Emas Astral' },
                  { color: '#E0E1DD', name: 'Perak Rembulan' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <span
                      className="w-10 h-10 rounded-full border-2 border-white/20 shadow-md"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[10px] text-stone-300 font-sans">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. ASTRAL WEDDING GIFT */}
            <section className="space-y-6">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#F4D06F] font-semibold">
                  TANDA KASIH
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                  Amplop Digital & Kado Pernikahan
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {weddingData.gift.accounts.map((acc, idx) => {
                  const isCopied = copiedBank === acc.bank
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-gradient-to-br from-[#1C2541] to-[#0B132B] border border-[#F4D06F]/30 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-[#F4D06F]">
                          {acc.logoText}
                        </span>
                        <CreditCard className="w-5 h-5 text-[#F4D06F]" />
                      </div>
                      <div>
                        <p className="font-mono text-lg font-bold text-white tracking-wider">
                          {acc.accountNumber}
                        </p>
                        <p className="text-xs text-stone-400 mt-0.5">
                          a.n {acc.accountHolder || acc.holderName}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(acc.accountNumber, acc.bank)}
                        className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-[#F4D06F] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Nomor Rekening Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Nomor Rekening</span>
                          </>
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* 7. RSVP & WISHES */}
            <section className="p-6 sm:p-8 rounded-3xl bg-[#1C2541]/80 border border-[#F4D06F]/30 space-y-6">
              <div className="text-center">
                <h3 className="font-serif text-2xl font-bold text-white">
                  Doa Restu & Konfirmasi Kehadiran
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Kirimkan doa dan ucapan terbaik Anda untuk menerangi langkah kedua mempelai:
                </p>
              </div>

              <form onSubmit={handleSendWish} className="space-y-4">
                <div>
                  <label className="block text-xs text-stone-300 font-sans mb-1">
                    Nama Lengkap Anda *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B132B] border border-[#F4D06F]/30 text-stone-200 text-sm focus:outline-none focus:border-[#F4D06F]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 font-sans mb-1">
                    Konfirmasi Kehadiran *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'hadir', label: 'Hadir' },
                      { id: 'ragu', label: 'Masih Ragu' },
                      { id: 'tidak', label: 'Berhalangan' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAttendance(opt.id as any)}
                        className={`py-2 px-2 rounded-xl text-xs font-sans transition-colors cursor-pointer ${
                          attendance === opt.id
                            ? 'bg-[#F4D06F] text-stone-950 font-bold'
                            : 'bg-[#0B132B] text-stone-400 border border-white/10'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-300 font-sans mb-1">
                    Untaian Doa Restu *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={blessingMessage}
                    onChange={(e) => setBlessingMessage(e.target.value)}
                    placeholder="Tuliskan untaian doa dan ucapan selamat..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0B132B] border border-[#F4D06F]/30 text-stone-200 text-sm focus:outline-none focus:border-[#F4D06F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F4D06F] to-[#FFE29A] text-stone-950 font-serif font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer hover:brightness-110 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirimkan Doa Restu</span>
                </button>
              </form>

              {/* Wishes List */}
              <div className="space-y-3 pt-4 border-t border-white/10 max-h-72 overflow-y-auto pr-1">
                {wishes.map((w, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#0B132B] border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-[#F4D06F] font-serif">{w.name}</strong>
                      <span className="text-[10px] text-stone-400">{w.time}</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed italic">
                      "{w.message}"
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. FOOTER */}
            <footer className="text-center pt-8 pb-12 space-y-3">
              <p className="font-serif italic text-[#F4D06F] text-sm">
                Rasa syukur dan terima kasih tak terhingga,
              </p>
              <h4 className="font-serif text-2xl font-bold text-white">
                {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
              </h4>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
