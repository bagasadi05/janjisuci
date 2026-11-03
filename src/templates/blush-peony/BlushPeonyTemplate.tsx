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
  Sparkles,
  Flower2
} from 'lucide-react'
import { useInvitationData } from '../../context/InvitationContext'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { BlushPeonyCoverScreen } from './BlushPeonyCoverScreen'
import { SakuraPetalsAmbiance } from './SakuraPetalsAmbiance'
import { BlushPeonyDesktopShowcase } from './BlushPeonyDesktopShowcase'
import { useToast } from '../../components/Toast'

export const BlushPeonyTemplate: React.FC<TemplateViewProps> = ({
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
      name: 'Bella & Farel',
      attendance: 'hadir',
      message: 'So happy for you both! A truly gorgeous wedding invitation, wishing you both endless love and happiness.',
      time: '1 jam yang lalu'
    },
    {
      name: 'Tante Diana & Om Hendra',
      attendance: 'hadir',
      message: 'Selamat menempuh hidup baru. Semoga rukun selalu dan langgeng hingga kakek nenek, sakinah mawaddah warohmah.',
      time: '2 jam yang lalu'
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
    showToast('Terima kasih! Doa restu Anda telah terkirim.', 'success')
  }

  return (
    <div className="min-h-screen bg-[#FFF8F9] flex justify-center text-[#4A2033] selection:bg-[#B76E79] selection:text-white overflow-x-hidden pt-12">
      {/* Cover Gate: Blooming Floral Peony Wreath */}
      <BlushPeonyCoverScreen isOpen={isOpened} onOpenWithAudio={onOpenWithAudio} />

      {/* Ambiance: Floating Sakura & Rose Petals */}
      <SakuraPetalsAmbiance active={isOpened} />

      {/* Adaptive Layout: Dual-Column Desktop vs Mobile */}
      <div className="w-full flex flex-col lg:flex-row min-h-screen">
        {/* Left Column: Desktop Sticky Showcase */}
        <BlushPeonyDesktopShowcase
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={onToggleAudio}
          activeTrack={activeTrack}
          onNextTrack={onNextTrack}
        />

        {/* Right Column: Floral Scrollable Content */}
        <div className="w-full lg:w-[58%] xl:w-[62%] min-h-screen shadow-2xl relative border-l border-[#FFCCD5]/40 bg-[#FFF8F9]">
          <main className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-16">
            {/* 1. HERO SECTION */}
            <section className="text-center relative pt-6 pb-8">
              <div className="flex justify-center mb-3">
                <Flower2 className="w-10 h-10 text-[#B76E79]" />
              </div>

              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B76E79] font-bold font-sans block mb-2">
                PERAYAAN CINTA SEJATI
              </span>
              <h1 className="font-script text-5xl sm:text-7xl text-[#6A2E46] leading-tight">
                {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
              </h1>

              {/* Arch Photo Frame */}
              <div className="relative mx-auto w-64 sm:w-80 rounded-t-full rounded-b-3xl p-3 bg-gradient-to-b from-[#FFB3C6]/30 via-white to-white shadow-xl my-6 border-2 border-[#FFCCD5]">
                <div className="w-full h-80 sm:h-96 rounded-t-full rounded-b-2xl overflow-hidden bg-stone-100">
                  <img
                    src={template.heroImage}
                    alt="Blush Peony Couple"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <p className="font-serif text-[#B76E79] text-sm sm:text-base font-semibold">
                {weddingData.events.akad.date}
              </p>
              <p className="text-xs text-stone-500 mt-1 font-sans">
                {weddingData.events.akad.venue}
              </p>
            </section>

            {/* 2. QUOTE SECTION */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#FFCCD5] text-center shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[#FFE5EC] text-[#B76E79] flex items-center justify-center mx-auto mb-3">
                <Heart className="w-4 h-4 fill-[#B76E79]" />
              </div>
              <p className="font-serif italic text-[#4A2033] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                "Cinta sejati bukanlah menemukan seseorang yang sempurna, melainkan melihat seseorang yang tidak sempurna secara sempurna. Menemukan rumah ternyaman di dalam satu pelukan."
              </p>
              <p className="text-[10px] uppercase tracking-widest text-[#B76E79] font-bold font-sans mt-3">
                — QS. AR-RUM: 21 —
              </p>
            </section>

            {/* 3. COUPLE SECTION (CIRCULAR FLORAL FRAMES) */}
            <section className="space-y-8">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B76E79] font-bold">
                  KEDUA MEMPELAI
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6A2E46] mt-1">
                  Mempelai Pengantin
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Groom */}
                <div className="p-6 rounded-3xl bg-white border border-[#FFCCD5] text-center space-y-3 shadow-sm">
                  <div className="w-36 h-36 mx-auto rounded-full p-1.5 border-2 border-dashed border-[#B76E79]">
                    <img
                      src={weddingData.couple.groom.photo}
                      alt={weddingData.couple.groom.fullName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="px-3 py-0.5 rounded-full bg-[#FFE5EC] text-[#B76E79] text-[10px] font-bold uppercase tracking-wider inline-block">
                    Mempelai Pria
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#6A2E46]">
                    {weddingData.couple.groom.fullName}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Putra tercinta dari: Bpk. {weddingData.couple.groom.fatherName} & Ibu {weddingData.couple.groom.motherName}
                  </p>
                </div>

                {/* Bride */}
                <div className="p-6 rounded-3xl bg-white border border-[#FFCCD5] text-center space-y-3 shadow-sm">
                  <div className="w-36 h-36 mx-auto rounded-full p-1.5 border-2 border-dashed border-[#B76E79]">
                    <img
                      src={weddingData.couple.bride.photo}
                      alt={weddingData.couple.bride.fullName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="px-3 py-0.5 rounded-full bg-[#FFE5EC] text-[#B76E79] text-[10px] font-bold uppercase tracking-wider inline-block">
                    Mempelai Wanita
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#6A2E46]">
                    {weddingData.couple.bride.fullName}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Putri tercinta dari: Bpk. {weddingData.couple.bride.fatherName} & Ibu {weddingData.couple.bride.motherName}
                  </p>
                </div>
              </div>
            </section>

            {/* 4. EVENTS */}
            <section className="space-y-6">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B76E79] font-bold">
                  RANGKAIAN ACARA
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6A2E46] mt-1">
                  Hari Bahagia
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Akad */}
                <div className="p-6 rounded-3xl bg-white border border-[#FFCCD5] space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-[#6A2E46] font-serif font-bold text-lg border-b border-[#FFE5EC] pb-2">
                    <Sparkles className="w-5 h-5 text-[#B76E79]" />
                    <span>Akad Nikah</span>
                  </div>
                  <div className="space-y-2 text-xs text-stone-700">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#B76E79]" />
                      <span>{weddingData.events.akad.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#B76E79]" />
                      <span>{weddingData.events.akad.time}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                      <span>{weddingData.events.akad.venue} — {weddingData.events.akad.address}</span>
                    </div>
                  </div>
                </div>

                {/* Resepsi */}
                <div className="p-6 rounded-3xl bg-white border border-[#FFCCD5] space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-[#6A2E46] font-serif font-bold text-lg border-b border-[#FFE5EC] pb-2">
                    <Flower2 className="w-5 h-5 text-[#B76E79]" />
                    <span>Resepsi Pernikahan</span>
                  </div>
                  <div className="space-y-2 text-xs text-stone-700">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#B76E79]" />
                      <span>{weddingData.events.resepsi.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#B76E79]" />
                      <span>{weddingData.events.resepsi.time}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#B76E79] to-[#DDA7A5] text-white font-serif font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Petunjuk Arah Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>

            {/* 5. DRESS CODE */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#FFCCD5] text-center space-y-4 shadow-sm">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#6A2E46]">
                Dress Code Acara
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                Kami mengundang Bapak/Ibu/Saudara/i untuk hadir mengenakan pakaian bernuansa pastel lembut:
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
                {[
                  { color: '#F7CAD0', name: 'Blush Pink' },
                  { color: '#B76E79', name: 'Rose Gold' },
                  { color: '#DDA7A5', name: 'Soft Mauve' },
                  { color: '#FFFFFF', name: 'Pearl White' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <span
                      className="w-10 h-10 rounded-full border-2 border-stone-200 shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[10px] text-stone-700 font-sans font-medium">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. GIFT */}
            <section className="space-y-6">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B76E79] font-bold">
                  TANDA KASIH
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6A2E46] mt-1">
                  Amplop Digital & Kado
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {weddingData.gift.accounts.map((acc, idx) => {
                  const isCopied = copiedBank === acc.bank
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-[#FFCCD5] space-y-3 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-[#6A2E46]">
                          {acc.logoText}
                        </span>
                        <CreditCard className="w-5 h-5 text-[#B76E79]" />
                      </div>
                      <div>
                        <p className="font-mono text-lg font-bold text-[#4A2033] tracking-wider">
                          {acc.accountNumber}
                        </p>
                        <p className="text-xs text-stone-500 mt-0.5">
                          a.n {acc.accountHolder || acc.holderName}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(acc.accountNumber, acc.bank)}
                        className="w-full py-2 px-3 rounded-xl bg-[#FFE5EC] hover:bg-[#FFCCD5] text-xs text-[#6A2E46] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Nomor Tersalin!</span>
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
            <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#FFCCD5] space-y-6 shadow-sm">
              <div className="text-center">
                <h3 className="font-serif text-2xl font-bold text-[#6A2E46]">
                  Doa Restu & Konfirmasi Kehadiran
                </h3>
              </div>

              <form onSubmit={handleSendWish} className="space-y-4">
                <div>
                  <label className="block text-xs text-stone-700 font-sans font-semibold mb-1">
                    Nama Anda *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Contoh: Bella Paramitha"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9FA] border border-[#FFCCD5] text-stone-800 text-sm focus:outline-none focus:border-[#B76E79]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-700 font-sans font-semibold mb-1">
                    Konfirmasi Kehadiran *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'hadir', label: 'Hadir' },
                      { id: 'ragu', label: 'Ragu-ragu' },
                      { id: 'tidak', label: 'Berhalangan' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAttendance(opt.id as any)}
                        className={`py-2 px-2 rounded-xl text-xs font-sans transition-colors cursor-pointer ${
                          attendance === opt.id
                            ? 'bg-[#B76E79] text-white font-bold'
                            : 'bg-[#FFF9FA] text-stone-600 border border-[#FFCCD5]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-700 font-sans font-semibold mb-1">
                    Untaian Doa Restu *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={blessingMessage}
                    onChange={(e) => setBlessingMessage(e.target.value)}
                    placeholder="Tuliskan ucapan dan doa manis Anda..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FFF9FA] border border-[#FFCCD5] text-stone-800 text-sm focus:outline-none focus:border-[#B76E79]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B76E79] to-[#DDA7A5] text-white font-serif font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer hover:brightness-105 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirimkan Doa Restu</span>
                </button>
              </form>

              {/* Wishes List */}
              <div className="space-y-3 pt-4 border-t border-[#FFE5EC] max-h-72 overflow-y-auto pr-1">
                {wishes.map((w, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#FFF9FA] border border-[#FFCCD5] space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-[#6A2E46] font-serif">{w.name}</strong>
                      <span className="text-[10px] text-stone-400">{w.time}</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed italic">
                      "{w.message}"
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. FOOTER */}
            <footer className="text-center pt-8 pb-12 space-y-3">
              <p className="font-script text-3xl text-[#B76E79]">
                Dengan penuh rasa cinta dan kebahagiaan
              </p>
              <h4 className="font-serif text-xl font-bold text-[#6A2E46]">
                {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
              </h4>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
