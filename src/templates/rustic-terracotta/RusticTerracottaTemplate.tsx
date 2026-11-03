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
import { RusticTerracottaCoverScreen } from './RusticTerracottaCoverScreen'
import { AutumnLeavesAmbiance } from './AutumnLeavesAmbiance'
import { RusticTerracottaDesktopShowcase } from './RusticTerracottaDesktopShowcase'
import { useToast } from '../../components/Toast'

export const RusticTerracottaTemplate: React.FC<TemplateViewProps> = ({
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
      name: 'Rendra & Maya',
      attendance: 'hadir',
      message: 'Selamat berbahagia Dimas dan Kirana! Konsep rustic terracotta-nya hangat dan syahdu banget. Ditunggu pestanya!',
      time: '2 jam yang lalu'
    },
    {
      name: 'Nadia Salsabila',
      attendance: 'hadir',
      message: 'Happy wedding both of you! Semoga pernikahannya selalu dipenuhi kehangatan dan kebahagiaan setiap harinya.',
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
    showToast('Terima kasih! Pesan dan doa restu Anda telah terkirim.', 'success')
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex justify-center text-[#3D2C24] selection:bg-[#C06C54] selection:text-white overflow-x-hidden pt-12">
      {/* Cover Gate: Vintage Airmail Envelope with Twine String */}
      <RusticTerracottaCoverScreen isOpen={isOpened} onOpenWithAudio={onOpenWithAudio} />

      {/* Ambiance: Falling Dried Autumn Leaves */}
      <AutumnLeavesAmbiance active={isOpened} />

      {/* Adaptive Layout: Dual-Column Desktop vs Mobile */}
      <div className="w-full flex flex-col lg:flex-row min-h-screen">
        {/* Left Column: Desktop Sticky Showcase */}
        <RusticTerracottaDesktopShowcase
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={onToggleAudio}
          activeTrack={activeTrack}
          onNextTrack={onNextTrack}
        />

        {/* Right Column: Rustic Scrollable Content */}
        <div className="w-full lg:w-[58%] xl:w-[62%] min-h-screen shadow-2xl relative border-l border-[#C06C54]/20 bg-[#FAF6F0]">
          <main className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-16">
            {/* 1. HERO SECTION */}
            <section className="text-center relative pt-6 pb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C06C54] font-bold font-sans block mb-2">
                KAMI AKAN MENIKAH
              </span>
              <h1 className="font-script text-5xl sm:text-7xl text-[#A0522D] leading-tight">
                {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
              </h1>

              {/* Tilted Polaroid Hero Image */}
              <div className="relative mx-auto w-64 sm:w-80 p-3 pb-8 bg-white shadow-xl rotate-1 hover:rotate-0 transition-transform my-6 border border-stone-200">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#DDA15E]/80 backdrop-blur-sm -rotate-2 opacity-85 shadow-sm" />
                <div className="w-full h-72 sm:h-88 overflow-hidden bg-stone-100">
                  <img
                    src={template.heroImage}
                    alt="Rustic Couple"
                    className="w-full h-full object-cover object-center filter sepia-[0.1]"
                  />
                </div>
                <p className="font-script text-2xl text-[#A0522D] mt-3">
                  Dua hati, satu perjalanan cinta
                </p>
              </div>

              <p className="font-serif text-[#C06C54] text-sm sm:text-base font-semibold">
                {weddingData.events.akad.date}
              </p>
              <p className="text-xs text-stone-600 mt-1 font-sans">
                {weddingData.events.akad.venue}
              </p>
            </section>

            {/* 2. RUSTIC QUOTE */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#F0E6DA] border border-[#D9C3B0] text-center shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[#C06C54]/15 text-[#C06C54] flex items-center justify-center mx-auto mb-3">
                <Heart className="w-4 h-4 fill-[#C06C54]" />
              </div>
              <p className="font-serif italic text-[#3D2C24] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
              </p>
              <p className="text-[10px] uppercase tracking-widest text-[#C06C54] font-bold font-sans mt-3">
                — QS. AR-RUM: 21 —
              </p>
            </section>

            {/* 3. COUPLE PROFILES (POLAROIDS) */}
            <section className="space-y-8">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C06C54] font-bold">
                  KEDUA MEMPELAI
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2C24] mt-1">
                  Mempelai Bahagia
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Groom Polaroid */}
                <div className="p-4 pb-6 bg-white border border-stone-200 shadow-md text-center space-y-3 -rotate-1 hover:rotate-0 transition-transform">
                  <div className="w-40 h-48 mx-auto overflow-hidden bg-stone-100">
                    <img
                      src={weddingData.couple.groom.photo}
                      alt={weddingData.couple.groom.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="px-3 py-0.5 rounded-full bg-[#F0E6DA] text-[#C06C54] text-[10px] font-bold uppercase tracking-wider inline-block">
                    Mempelai Pria
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#3D2C24]">
                    {weddingData.couple.groom.fullName}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Putra tercinta dari: Bpk. {weddingData.couple.groom.fatherName} & Ibu {weddingData.couple.groom.motherName}
                  </p>
                </div>

                {/* Bride Polaroid */}
                <div className="p-4 pb-6 bg-white border border-stone-200 shadow-md text-center space-y-3 rotate-1 hover:rotate-0 transition-transform">
                  <div className="w-40 h-48 mx-auto overflow-hidden bg-stone-100">
                    <img
                      src={weddingData.couple.bride.photo}
                      alt={weddingData.couple.bride.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="px-3 py-0.5 rounded-full bg-[#F0E6DA] text-[#C06C54] text-[10px] font-bold uppercase tracking-wider inline-block">
                    Mempelai Wanita
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#3D2C24]">
                    {weddingData.couple.bride.fullName}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Putri tercinta dari: Bpk. {weddingData.couple.bride.fatherName} & Ibu {weddingData.couple.bride.motherName}
                  </p>
                </div>
              </div>
            </section>

            {/* 4. RUSTIC EVENTS */}
            <section className="space-y-6">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C06C54] font-bold">
                  SIMPAN TANGGAL
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2C24] mt-1">
                  Hari & Lokasi Acara
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Akad */}
                <div className="p-6 rounded-3xl bg-[#F0E6DA] border border-[#D9C3B0] space-y-3">
                  <div className="flex items-center gap-2 text-[#A0522D] font-serif font-bold text-lg border-b border-stone-300 pb-2">
                    <Sparkles className="w-5 h-5 text-[#C06C54]" />
                    <span>Akad Nikah</span>
                  </div>
                  <div className="space-y-2 text-xs text-stone-700">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#C06C54]" />
                      <span>{weddingData.events.akad.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#C06C54]" />
                      <span>{weddingData.events.akad.time}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#C06C54] shrink-0 mt-0.5" />
                      <span>{weddingData.events.akad.venue} — {weddingData.events.akad.address}</span>
                    </div>
                  </div>
                </div>

                {/* Resepsi */}
                <div className="p-6 rounded-3xl bg-[#F0E6DA] border border-[#D9C3B0] space-y-3">
                  <div className="flex items-center gap-2 text-[#A0522D] font-serif font-bold text-lg border-b border-stone-300 pb-2">
                    <Sparkles className="w-5 h-5 text-[#C06C54]" />
                    <span>Resepsi Pernikahan</span>
                  </div>
                  <div className="space-y-2 text-xs text-stone-700">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#C06C54]" />
                      <span>{weddingData.events.resepsi.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#C06C54]" />
                      <span>{weddingData.events.resepsi.time}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#C06C54] shrink-0 mt-0.5" />
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C06C54] hover:bg-[#A0522D] text-white font-serif font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Petunjuk Arah Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>

            {/* 5. DRESS CODE */}
            <section className="p-6 sm:p-8 rounded-3xl bg-[#F0E6DA] border border-[#D9C3B0] text-center space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#A0522D]">
                Dress Code Pilihan
              </h3>
              <p className="text-xs text-stone-700 max-w-md mx-auto leading-relaxed">
                Nuansa pakaian bernada bumi (earth tone) untuk melengkapi keindahan momen perayaan:
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
                {[
                  { color: '#A0522D', name: 'Terracotta' },
                  { color: '#DDA15E', name: 'Mustard Ochre' },
                  { color: '#606C38', name: 'Olive Green' },
                  { color: '#E6CCB2', name: 'Warm Cream' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <span
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
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
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C06C54] font-bold">
                  TANDA KASIH
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2C24] mt-1">
                  Amplop Digital
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {weddingData.gift.accounts.map((acc, idx) => {
                  const isCopied = copiedBank === acc.bank
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-[#D9C3B0] space-y-3 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-[#A0522D]">
                          {acc.logoText}
                        </span>
                        <CreditCard className="w-5 h-5 text-[#C06C54]" />
                      </div>
                      <div>
                        <p className="font-mono text-lg font-bold text-[#3D2C24] tracking-wider">
                          {acc.accountNumber}
                        </p>
                        <p className="text-xs text-stone-500 mt-0.5">
                          a.n {acc.accountHolder || acc.holderName}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(acc.accountNumber, acc.bank)}
                        className="w-full py-2 px-3 rounded-xl bg-[#F0E6DA] hover:bg-[#E6CCB2] text-xs text-[#A0522D] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
            <section className="p-6 sm:p-8 rounded-3xl bg-[#F0E6DA] border border-[#D9C3B0] space-y-6">
              <div className="text-center">
                <h3 className="font-serif text-2xl font-bold text-[#3D2C24]">
                  Kirim Doa Restu & Konfirmasi Kehadiran
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
                    placeholder="Contoh: Rian Mahendra"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9C3B0] text-stone-800 text-sm focus:outline-none focus:border-[#C06C54]"
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
                            ? 'bg-[#C06C54] text-white font-bold'
                            : 'bg-white text-stone-600 border border-[#D9C3B0]'
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
                    placeholder="Tuliskan doa terbaik untuk mempelai..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9C3B0] text-stone-800 text-sm focus:outline-none focus:border-[#C06C54]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#C06C54] hover:bg-[#A0522D] text-white font-serif font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirimkan Doa Restu</span>
                </button>
              </form>

              {/* Wishes List */}
              <div className="space-y-3 pt-4 border-t border-stone-300 max-h-72 overflow-y-auto pr-1">
                {wishes.map((w, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-[#A0522D] font-serif">{w.name}</strong>
                      <span className="text-[10px] text-stone-500">{w.time}</span>
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
              <p className="font-script text-3xl text-[#A0522D]">
                Terima kasih telah menjadi bagian dari kisah bahagia kami
              </p>
              <h4 className="font-serif text-xl font-bold text-[#3D2C24]">
                {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
              </h4>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
