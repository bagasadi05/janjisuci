import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Copy,
  Check,
  Send,
  Sparkles,
  ExternalLink,
  CreditCard,
  UserCheck
} from 'lucide-react'
import { useInvitationData } from '../../context/InvitationContext'
import { TemplateViewProps } from '../botanical-sage/BotanicalSageTemplate'
import { RoyalJavaCoverScreen } from './RoyalJavaCoverScreen'
import { AscendingGoldDust } from './AscendingGoldDust'
import { RoyalJavaDesktopShowcase } from './RoyalJavaDesktopShowcase'
import {
  GununganWayangSvg,
  SuryaMajapahitSeal,
  JavaneseDivider,
  JavaneseCorner
} from './RoyalJavaOrnaments'
import { useToast } from '../../components/Toast'

export const RoyalJavaTemplate: React.FC<TemplateViewProps> = ({
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
      name: 'Kanjeng Raden Mas Arya',
      attendance: 'hadir',
      message: 'Ndherek mangayubagya awit dhaupipun mas Bagas kaliyan mbak Ayu. Mugi dados keluarga ingkang tansah pinaringan kabagyan, sakinah, mawaddah, warohmah.',
      time: '1 jam yang lalu'
    },
    {
      name: 'Ibu Hj. Retno Wulandari',
      attendance: 'hadir',
      message: 'Selamat menempuh hidup baru untuk kedua mempelai. Semoga dilancarkan seluruh prosesi ijab dan panggih adat Jawanya, langgeng sampai kaken-kaken ninen-ninen.',
      time: '3 jam yang lalu'
    },
    {
      name: 'Bimo & Sekar (Jakarta)',
      attendance: 'hadir',
      message: 'InsyaAllah rawuh mas Bagas! Undangan adat Jawanya elok tenan, sakral sanget!',
      time: '5 jam yang lalu'
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
      showToast('Mohon isi nama dan untaian doa restu Panjenengan', 'info')
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
    showToast('Matur nuwun! Untaian doa restu Panjenengan sampun katampi.', 'success')
  }

  return (
    <div className="min-h-screen bg-[#120F0D] flex justify-center text-stone-200 selection:bg-amber-500 selection:text-stone-950 overflow-x-hidden pt-16">
      {/* Cover Gate: Gunungan Wayang Split Emas */}
      <RoyalJavaCoverScreen isOpen={isOpened} onOpenWithAudio={onOpenWithAudio} />

      {/* Ambiance: Ascending Golden Dust / Sparkles */}
      <AscendingGoldDust active={isOpened} />

      {/* Adaptive Layout: Left Desktop Column & Right Scrollable Content */}
      <div className="w-full flex flex-col lg:flex-row min-h-screen">
        {/* Left Column: Desktop Sticky Showcase */}
        <RoyalJavaDesktopShowcase
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={onToggleAudio}
          activeTrack={activeTrack}
          onNextTrack={onNextTrack}
        />

        {/* Right Column: Scrollable Content in Ebony & Sogan Gold */}
        <div className="w-full lg:w-[58%] xl:w-[62%] min-h-screen shadow-2xl relative border-l border-[#C8963E]/30 bg-[#120F0D]">
          <main className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-16">
            {/* 1. HERO SECTION */}
            <section className="text-center relative pt-6 pb-8">
              <div className="flex justify-center mb-3">
                <SuryaMajapahitSeal className="w-16 h-16 sm:w-20 sm:h-20" />
              </div>

              <p className="text-xs uppercase tracking-[0.3em] font-serif text-amber-300 font-semibold mb-2">
                Pawiwahan Ageng
              </p>
              <h1 className="font-serif text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#C8963E] leading-tight">
                {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
              </h1>

              <JavaneseDivider className="my-5" />

              {/* Main Photo Arch */}
              <div className="relative mx-auto w-64 sm:w-80 h-80 sm:h-96 rounded-3xl p-3 bg-gradient-to-b from-[#C8963E]/40 via-[#251E19] to-[#120F0D] border border-[#C8963E]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] my-6">
                <JavaneseCorner position="top-left" />
                <JavaneseCorner position="top-right" />
                <JavaneseCorner position="bottom-left" />
                <JavaneseCorner position="bottom-right" />
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src={template.heroImage}
                    alt="Penganten Jawa"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <p className="font-serif text-amber-200/90 text-sm sm:text-base font-medium">
                {weddingData.events.akad.date}
              </p>
              <p className="text-xs text-stone-400 mt-1 font-sans">
                {weddingData.events.akad.venue}
              </p>
            </section>

            {/* 2. SERAT WULANGREH / AYAT SUCI AR-RUM 21 */}
            <section className="relative p-6 sm:p-9 rounded-3xl bg-[#1A1512]/90 border border-[#C8963E]/40 text-center shadow-xl">
              <JavaneseCorner position="top-left" />
              <JavaneseCorner position="top-right" />
              <JavaneseCorner position="bottom-left" />
              <JavaneseCorner position="bottom-right" />

              <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-300 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-4 h-4 fill-amber-300" />
              </div>

              <p className="font-serif italic text-amber-100 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                "Dene pratandha katresnaning Gusti, inggih punika Panjenengane nitahake garwa tumrap sira kabeh saking jinisira pribadi, supaya sira ngrasa tentrem ana ing sandhinge, lan Panjenengane ndadekake ing antaramu rasa tresna lan welas asih."
              </p>
              <p className="text-xs uppercase tracking-widest text-amber-300 font-serif font-bold mt-4">
                — Serat Pitedah (QS. Ar-Rum: 21) —
              </p>
            </section>

            {/* 3. PENGANTEN KAKUNG & PENGANTEN PUTRI (COUPLE SECTION) */}
            <section className="space-y-8">
              <div className="text-center">
                <span className="text-[11px] uppercase tracking-[0.25em] text-amber-300 font-semibold font-serif">
                  Dhauping Penganten
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                  Mempelai Pengantin
                </h2>
                <JavaneseDivider className="my-3" />
                <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
                  Kanthi asihing Gusti Ingkang Maha Agung, kaparenga kula ngenalaken calon penganten kekalih:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Penganten Kakung */}
                <div className="p-6 rounded-3xl bg-[#1A1512] border border-[#C8963E]/40 text-center relative overflow-hidden group">
                  <JavaneseCorner position="top-left" />
                  <JavaneseCorner position="top-right" />
                  <div className="w-36 h-36 mx-auto rounded-full p-2 border-2 border-dashed border-[#C8963E]/60 mb-4">
                    <img
                      src={weddingData.couple.groom.photo}
                      alt={weddingData.couple.groom.fullName}
                      className="w-full h-full rounded-full object-cover object-top"
                    />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#251E19] border border-[#C8963E]/30 text-amber-300 text-[10px] font-serif uppercase tracking-widest inline-block mb-2">
                    Penganten Kakung
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                    {weddingData.couple.groom.fullName}
                  </h3>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                    Putra Kakung saking:{' '}
                    <strong className="text-stone-300 block">
                      {weddingData.couple.groom.fatherName} & {weddingData.couple.groom.motherName}
                    </strong>
                  </p>
                </div>

                {/* Penganten Putri */}
                <div className="p-6 rounded-3xl bg-[#1A1512] border border-[#C8963E]/40 text-center relative overflow-hidden group">
                  <JavaneseCorner position="top-left" />
                  <JavaneseCorner position="top-right" />
                  <div className="w-36 h-36 mx-auto rounded-full p-2 border-2 border-dashed border-[#C8963E]/60 mb-4">
                    <img
                      src={weddingData.couple.bride.photo}
                      alt={weddingData.couple.bride.fullName}
                      className="w-full h-full rounded-full object-cover object-top"
                    />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#251E19] border border-[#C8963E]/30 text-amber-300 text-[10px] font-serif uppercase tracking-widest inline-block mb-2">
                    Penganten Putri
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                    {weddingData.couple.bride.fullName}
                  </h3>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                    Putra Putri saking:{' '}
                    <strong className="text-stone-300 block">
                      {weddingData.couple.bride.fatherName} & {weddingData.couple.bride.motherName}
                    </strong>
                  </p>
                </div>
              </div>
            </section>

            {/* 4. RANGKAIAN ADAT & JADWAL ACARA */}
            <section className="space-y-6">
              <div className="text-center">
                <span className="text-[11px] uppercase tracking-[0.25em] text-amber-300 font-semibold font-serif">
                  Tata Lampahing Adat
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                  Rangkaian Acara & Panggih
                </h2>
                <JavaneseDivider className="my-3" />
                <p className="text-xs text-stone-400 max-w-md mx-auto">
                  Sinartan puji syukur ing ngarsanipun Gusti, lampahing acara badhe kalampahan ing:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ijab Qobul */}
                <div className="p-6 rounded-3xl bg-[#1A1512] border border-[#C8963E]/40 space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-lg border-b border-white/10 pb-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Ijab Qobul (Akad Nikah)</span>
                  </div>
                  <div className="space-y-2 text-xs text-stone-300">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{weddingData.events.akad.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{weddingData.events.akad.time}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{weddingData.events.akad.venue} — {weddingData.events.akad.address}</span>
                    </div>
                  </div>
                </div>

                {/* Upacara Panggih & Resepsi Dhahar Kembul */}
                <div className="p-6 rounded-3xl bg-[#1A1512] border border-[#C8963E]/40 space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-lg border-b border-white/10 pb-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Upacara Panggih & Resepsi</span>
                  </div>
                  <div className="space-y-2 text-xs text-stone-300">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{weddingData.events.resepsi.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{weddingData.events.resepsi.time}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{weddingData.events.resepsi.venue} — {weddingData.events.resepsi.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Button */}
              <div className="text-center pt-2">
                <a
                  href={weddingData.events.akad.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#C8963E] to-[#E5C158] text-[#120F0D] font-serif font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Buka Peta Lokasi (Google Maps)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>

            {/* 5. TATA BUSANA (DRESS CODE ADAT) */}
            <section className="p-6 sm:p-8 rounded-3xl bg-[#1A1512] border border-[#C8963E]/40 text-center space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-200">
                Ageman & Tata Busana Tamu
              </h3>
              <p className="text-xs text-stone-300 max-w-lg mx-auto leading-relaxed">
                Kagem kurmatipun suwasana adat Jawa, para rawuh katuran ngagem busana Batik Klasik, Kebaya Nusantara, utawi Busana Formal kanthi palet werni ing ngandhap punika:
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
                {[
                  { color: '#6B3E11', name: 'Cokelat Sogan' },
                  { color: '#1A1615', name: 'Beludru Ireng' },
                  { color: '#C8963E', name: 'Emas Keraton' },
                  { color: '#F5EEDB', name: 'Kemben Gading' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <span
                      className="w-10 h-10 rounded-full border-2 border-white/20 shadow-md"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[10px] text-stone-300 font-serif">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. PUNDI KENCANA (AMPLOP DIGITAL & TANDA KASIH) */}
            <section className="space-y-6">
              <div className="text-center">
                <span className="text-[11px] uppercase tracking-[0.25em] text-amber-300 font-semibold font-serif">
                  Tandha Asih
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                  Pundi Kencana (Amplop Digital)
                </h2>
                <JavaneseDivider className="my-3" />
                <p className="text-xs text-stone-400 max-w-md mx-auto">
                  Doa restu Panjenengan sedaya sampun dados kabagyan ingkang tanpa upami tumrap kula kekalih. Nanging menawi kepareng paring tandha asih, saged lumantar:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {weddingData.gift.accounts.map((acc, idx) => {
                  const isCopied = copiedBank === acc.bank
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-gradient-to-br from-[#251E19] to-[#1A1512] border border-[#C8963E]/40 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-amber-200">
                          {acc.logoText}
                        </span>
                        <CreditCard className="w-5 h-5 text-amber-400" />
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
                        className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-amber-200 font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Nomer Rekening Kersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Nomer Rekening</span>
                          </>
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* 7. SERAT PANGESTU & RSVP */}
            <section className="p-6 sm:p-8 rounded-3xl bg-[#1A1512] border border-[#C8963E]/40 space-y-6">
              <div className="text-center">
                <h3 className="font-serif text-2xl font-bold text-white">
                  Serat Doa Restu & Konfirmasi Rawuh
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Kula suwun rawuh lan donga pangestunipun para sesepuh, sanak kadang, lan para mitra:
                </p>
              </div>

              <form onSubmit={handleSendWish} className="space-y-4">
                <div>
                  <label className="block text-xs text-stone-300 font-serif mb-1">
                    Asma Panjenengan (Nama Lengkap) *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Tuladhane: Kanjeng Raden..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#251E19] border border-[#C8963E]/30 text-stone-200 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 font-serif mb-1">
                    Konfirmasi Kehadiran *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'hadir', label: 'InsyaAllah Rawuh' },
                      { id: 'ragu', label: 'Taksih Ragu' },
                      { id: 'tidak', label: 'Nyuwun Pangapunten' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAttendance(opt.id as any)}
                        className={`py-2 px-2 rounded-xl text-xs font-serif transition-colors cursor-pointer ${
                          attendance === opt.id
                            ? 'bg-[#C8963E] text-[#120F0D] font-bold'
                            : 'bg-[#251E19] text-stone-400 border border-white/10'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-300 font-serif mb-1">
                    Untaian Donga Pangestu (Doa & Ucapan) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={blessingMessage}
                    onChange={(e) => setBlessingMessage(e.target.value)}
                    placeholder="Serat donga pangestu Panjenengan..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#251E19] border border-[#C8963E]/30 text-stone-200 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C8963E] to-[#E5C158] text-[#120F0D] font-serif font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer hover:brightness-110 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Donga Pangestu</span>
                </button>
              </form>

              {/* Greetings Wall List */}
              <div className="space-y-3 pt-4 border-t border-white/10 max-h-72 overflow-y-auto pr-1">
                {wishes.map((w, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#251E19] border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-amber-200 font-serif">{w.name}</strong>
                      <span className="text-[10px] text-stone-400">{w.time}</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed italic">
                      "{w.message}"
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. MATUR NUWUN (FOOTER SECTION) */}
            <footer className="text-center pt-8 pb-12 space-y-4">
              <JavaneseDivider className="my-4" />
              <div className="space-y-1">
                <p className="font-serif italic text-amber-200 text-sm">
                  Matur Nuwun ingkang Tanpa Pepindhan
                </p>
                <h4 className="font-serif text-2xl font-bold text-white">
                  {weddingData.couple.groom.shortName} & {weddingData.couple.bride.shortName}
                </h4>
              </div>
              <p className="text-xs text-stone-400">
                Keluarga Ageng Bpk. {weddingData.couple.groom.fatherName} & Bpk. {weddingData.couple.bride.fatherName}
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
