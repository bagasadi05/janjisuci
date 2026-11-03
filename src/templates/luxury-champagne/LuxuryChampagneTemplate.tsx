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
  Sparkles
} from 'lucide-react'
import { useInvitationData } from '../../context/InvitationContext'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { LuxuryChampagneCoverScreen } from './LuxuryChampagneCoverScreen'
import { GoldBokehShimmer } from './GoldBokehShimmer'
import { LuxuryChampagneDesktopShowcase } from './LuxuryChampagneDesktopShowcase'
import { useToast } from '../../components/Toast'

export const LuxuryChampagneTemplate: React.FC<TemplateViewProps> = ({
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
  const [attendance, setAttendance] = useState<'attending' | 'not-attending' | 'uncertain'>('attending')
  const [guestCount, setGuestCount] = useState('2')
  const [blessingMessage, setBlessingMessage] = useState('')
  const [wishes, setWishes] = useState([
    {
      name: 'Jessica Pratama',
      attendance: 'attending',
      message: 'Selamat atas pernikahan Kevin dan Clarissa! Undangan yang sangat mewah dan berkelas. Semoga langgeng dan bahagia selamanya.',
      time: '2 jam yang lalu'
    },
    {
      name: 'Marcus & Felicia',
      attendance: 'attending',
      message: 'Selamat menempuh hidup baru sahabatku! Semoga rumah tangganya selalu dilimpahi keberkahan dan kebahagiaan tanpa akhir.',
      time: '4 jam yang lalu'
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
      showToast('Mohon tuliskan nama dan doa restu terbaik Anda', 'info')
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
    showToast('Terima kasih! Doa dan ucapan Anda berhasil dikirimkan.', 'success')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex justify-center text-stone-200 selection:bg-[#D4AF37] selection:text-stone-950 overflow-x-hidden pt-12">
      {/* Cover Gate: Vogue Editorial Curtain Split */}
      <LuxuryChampagneCoverScreen isOpen={isOpened} onOpenWithAudio={onOpenWithAudio} />

      {/* Ambiance: Golden Bokeh Shimmer */}
      <GoldBokehShimmer active={isOpened} />

      {/* Adaptive Layout: Dual-Column Desktop vs Mobile */}
      <div className="w-full flex flex-col lg:flex-row min-h-screen">
        {/* Left Column: Desktop Sticky Showcase */}
        <LuxuryChampagneDesktopShowcase
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={onToggleAudio}
          activeTrack={activeTrack}
          onNextTrack={onNextTrack}
        />

        {/* Right Column: Editorial Scrollable Content */}
        <div className="w-full lg:w-[58%] xl:w-[62%] min-h-screen shadow-2xl relative border-l border-white/10 bg-[#0A0A0A]">
          <main className="w-full max-w-4xl mx-auto px-4 sm:px-10 py-10 space-y-20">
            {/* 1. HERO SECTION */}
            <section className="text-center relative pt-8 pb-10 border-b border-white/10">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] font-semibold block mb-3">
                PERAYAAN CINTA SEJATI
              </span>
              <h1 className="font-serif text-4xl sm:text-7xl font-extralight tracking-tight text-white uppercase">
                {weddingData.couple.groom.shortName} <span className="text-[#D4AF37] font-script normal-case text-5xl sm:text-8xl px-2">&</span> {weddingData.couple.bride.shortName}
              </h1>
              <div className="h-[1px] w-24 bg-[#D4AF37]/60 mx-auto my-6" />

              {/* Main Editorial Hero Image */}
              <div className="relative mx-auto w-full max-w-md h-96 sm:h-[480px] p-2 border border-[#D4AF37]/50 bg-[#121212] shadow-2xl my-6">
                <img
                  src={template.heroImage}
                  alt="Modern Luxury Couple"
                  className="w-full h-full object-cover object-center filter grayscale contrast-110"
                />
              </div>

              <p className="font-sans text-xs tracking-widest text-[#D4AF37] uppercase">
                {weddingData.events.akad.date}
              </p>
              <p className="text-xs text-stone-400 font-sans tracking-wide mt-1">
                {weddingData.events.akad.venue}
              </p>
            </section>

            {/* 2. EDITORIAL QUOTE */}
            <section className="text-center py-6 px-4 max-w-xl mx-auto">
              <span className="text-4xl font-serif text-[#D4AF37] opacity-60">“</span>
              <p className="font-serif text-lg sm:text-xl font-light text-white leading-relaxed -mt-4 italic">
                Di seluruh penjuru bumi, tiada hati yang tercipta untukku seperti hatimu. Dan tiada cinta yang tercurah untukmu seperti cintaku.
              </p>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-sans block mt-4 font-semibold">
                — MAYA ANGELOU
              </span>
            </section>

            {/* 3. COUPLE PROFILES */}
            <section className="space-y-10">
              <div className="text-center">
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] font-semibold">
                  KEDUA MEMPELAI
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-white uppercase mt-1">
                  MEMPELAI PENGANTIN
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Groom */}
                <div className="p-6 border border-white/10 bg-[#121212] space-y-4 text-center">
                  <div className="w-44 h-56 mx-auto overflow-hidden border border-[#D4AF37]/40">
                    <img
                      src={weddingData.couple.groom.photo}
                      alt={weddingData.couple.groom.fullName}
                      className="w-full h-full object-cover filter grayscale contrast-115"
                    />
                  </div>
                  <span className="text-[10px] tracking-widest uppercase text-[#D4AF37] block font-semibold">
                    MEMPELAI PRIA
                  </span>
                  <h3 className="font-serif text-xl text-white font-normal uppercase">
                    {weddingData.couple.groom.fullName}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">
                    Putra tercinta dari Bpk. {weddingData.couple.groom.fatherName} & Ibu {weddingData.couple.groom.motherName}
                  </p>
                </div>

                {/* Bride */}
                <div className="p-6 border border-white/10 bg-[#121212] space-y-4 text-center">
                  <div className="w-44 h-56 mx-auto overflow-hidden border border-[#D4AF37]/40">
                    <img
                      src={weddingData.couple.bride.photo}
                      alt={weddingData.couple.bride.fullName}
                      className="w-full h-full object-cover filter grayscale contrast-115"
                    />
                  </div>
                  <span className="text-[10px] tracking-widest uppercase text-[#D4AF37] block font-semibold">
                    MEMPELAI WANITA
                  </span>
                  <h3 className="font-serif text-xl text-white font-normal uppercase">
                    {weddingData.couple.bride.fullName}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">
                    Putri tercinta dari Bpk. {weddingData.couple.bride.fatherName} & Ibu {weddingData.couple.bride.motherName}
                  </p>
                </div>
              </div>
            </section>

            {/* 4. ITINERARY & EVENTS */}
            <section className="space-y-8">
              <div className="text-center">
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] font-semibold">
                  RANGKAIAN ACARA
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-white uppercase mt-1">
                  JADWAL HARI BAHAGIA
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ceremony */}
                <div className="p-8 border border-white/10 bg-[#121212] space-y-4">
                  <span className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-semibold block">
                    AKAD NIKAH / IKRAR SUCI
                  </span>
                  <h3 className="font-serif text-2xl text-white font-light">
                    Akad Nikah
                  </h3>
                  <div className="space-y-2 text-xs text-stone-300 font-sans">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      <span>{weddingData.events.akad.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      <span>{weddingData.events.akad.time}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{weddingData.events.akad.venue} — {weddingData.events.akad.address}</span>
                    </div>
                  </div>
                </div>

                {/* Evening Reception */}
                <div className="p-8 border border-white/10 bg-[#121212] space-y-4">
                  <span className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-semibold block">
                    RESEPSI PERNIKAHAN
                  </span>
                  <h3 className="font-serif text-2xl text-white font-light">
                    Ramah Tamah & Perayaan
                  </h3>
                  <div className="space-y-2 text-xs text-stone-300 font-sans">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      <span>{weddingData.events.resepsi.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      <span>{weddingData.events.resepsi.time}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{weddingData.events.resepsi.venue} — {weddingData.events.resepsi.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maps Button */}
              <div className="text-center pt-2">
                <a
                  href={weddingData.events.akad.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#D4AF37] bg-transparent hover:bg-[#D4AF37] text-white hover:text-stone-950 text-xs font-sans font-bold uppercase tracking-[0.2em] transition-all cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>PETUNJUK LOKASI DI GOOGLE MAPS</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>

            {/* 5. DRESS CODE */}
            <section className="p-8 border border-white/10 bg-[#121212] text-center space-y-4">
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] font-semibold block">
                KODE BUSANA TAMU
              </span>
              <h3 className="font-serif text-2xl text-white font-light uppercase">
                FORMAL HITAM & CHAMPAGNE
              </h3>
              <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                Para tamu undangan diharapkan dapat mengenakan pakaian formal bernuansa hitam atau champagne gold:
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
                {[
                  { color: '#0A0A0A', name: 'Onyx Black' },
                  { color: '#D4AF37', name: 'Champagne Gold' },
                  { color: '#F3E5AB', name: 'Krem Gading' },
                  { color: '#2B2B2B', name: 'Charcoal' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <span
                      className="w-9 h-9 border border-white/20 shadow-md"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[10px] text-stone-300 font-sans tracking-wider uppercase">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. WEDDING GIFT */}
            <section className="space-y-6">
              <div className="text-center">
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] font-semibold">
                  TANDA KASIH
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-white uppercase mt-1">
                  AMPLOP DIGITAL & KADO
                </h2>
                <p className="text-xs text-stone-400 max-w-md mx-auto mt-2">
                  Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila Anda berkenan memberikan tanda kasih:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {weddingData.gift.accounts.map((acc, idx) => {
                  const isCopied = copiedBank === acc.bank
                  return (
                    <div
                      key={idx}
                      className="p-6 border border-white/10 bg-[#121212] space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base tracking-wider text-[#D4AF37] uppercase">
                          {acc.logoText}
                        </span>
                        <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="font-mono text-xl text-white tracking-widest font-light">
                          {acc.accountNumber}
                        </p>
                        <p className="text-xs text-stone-400 mt-0.5 uppercase tracking-wider">
                          A.N. {acc.accountHolder || acc.holderName}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(acc.accountNumber, acc.bank)}
                        className="w-full py-2.5 px-3 border border-white/15 bg-white/5 hover:bg-white/10 text-xs text-[#D4AF37] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">NOMOR TERSALIN</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>SALIN NOMOR REKENING</span>
                          </>
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* 7. RSVP FORM */}
            <section className="p-8 border border-white/10 bg-[#121212] space-y-6">
              <div className="text-center">
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] font-semibold">
                  KONFIRMASI KEHADIRAN
                </span>
                <h3 className="font-serif text-2xl text-white font-light uppercase mt-1">
                  RSVP & UCAPAN DOA RESTU
                </h3>
              </div>

              <form onSubmit={handleSendWish} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-sans mb-1">
                    Nama Lengkap Anda *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full px-4 py-3 bg-black border border-white/15 text-stone-200 text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-sans mb-1">
                    Konfirmasi Kehadiran *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'attending', label: 'Pasti Hadir' },
                      { id: 'uncertain', label: 'Masih Ragu' },
                      { id: 'not-attending', label: 'Berhalangan' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAttendance(opt.id as any)}
                        className={`py-2.5 px-2 text-xs uppercase tracking-wider transition-colors cursor-pointer border ${
                          attendance === opt.id
                            ? 'bg-[#D4AF37] text-stone-950 font-bold border-[#D4AF37]'
                            : 'bg-black text-stone-400 border-white/10'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-sans mb-1">
                    Untaian Doa & Ucapan Selamat *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={blessingMessage}
                    onChange={(e) => setBlessingMessage(e.target.value)}
                    placeholder="Tuliskan pesan dan doa terbaik untuk kedua mempelai..."
                    className="w-full px-4 py-3 bg-black border border-white/15 text-stone-200 text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#F3E5AB] text-stone-950 font-sans font-bold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>KIRIMKAN KONFIRMASI & DOA</span>
                </button>
              </form>

              {/* Wishes List */}
              <div className="space-y-3 pt-6 border-t border-white/10 max-h-72 overflow-y-auto pr-1">
                {wishes.map((w, idx) => (
                  <div key={idx} className="p-4 bg-black border border-white/10 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-[#D4AF37] uppercase tracking-wider font-serif">{w.name}</strong>
                      <span className="text-[10px] text-stone-500 uppercase">{w.time}</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed italic">
                      "{w.message}"
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. FOOTER */}
            <footer className="text-center pt-8 pb-12 space-y-4 border-t border-white/10">
              <p className="font-serif text-lg tracking-widest text-white uppercase">
                {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
              </p>
              <p className="text-xs tracking-widest text-stone-500 uppercase">
                TERIMA KASIH ATAS DOA RESTU & KEHADIRAN BAPAK/IBU/SAUDARA/I
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
