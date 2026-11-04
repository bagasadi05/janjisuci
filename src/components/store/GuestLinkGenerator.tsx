import React, { useState } from 'react'
import {
  Link2,
  Copy,
  Check,
  Send,
  Users,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Moon,
  Sun,
  ShieldCheck,
  PhoneCall,
  Video,
  MoreVertical
} from 'lucide-react'
import { storeConfig } from '../../config/storeConfig'
import { track } from '../../lib/analytics'
import { useToast } from '../Toast'

export const GuestLinkGenerator: React.FC = () => {
  const { showToast } = useToast()
  const [selectedTemplateSlug, setSelectedTemplateSlug] = useState(storeConfig.templates[0].slug)
  const [coupleName, setCoupleName] = useState('Rian & Sarah')
  const [guestInput, setGuestInput] = useState(
    'Bpk. Budi Santoso & Keluarga\nIbu Hj. Siti Aminah\nDimas Pratama & Partner'
  )
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [isCopiedSingle, setIsCopiedSingle] = useState(false)
  const [waTheme, setWaTheme] = useState<'dark' | 'light'>('dark')

  const guestList = guestInput
    .split('\n')
    .map((g) => g.trim())
    .filter(Boolean)

  const selectedTemplate =
    storeConfig.templates.find((t) => t.slug === selectedTemplateSlug) || storeConfig.templates[0]

  const activeGuestForPreview = guestList[0] || 'Bpk. Budi Santoso & Keluarga'

  const buildInvitationUrl = (guestName: string) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://janjisuci.web.id'
    return `${baseUrl}/?template=${encodeURIComponent(selectedTemplateSlug)}&to=${encodeURIComponent(guestName)}`
  }

  const buildWhatsAppMessage = (guestName: string) => {
    const url = buildInvitationUrl(guestName)
    return [
      `Kepada Yth. *${guestName}*`,
      ``,
      `Assalamu'alaikum Wr. Wb. / Salam Sejahtera,`,
      `Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:`,
      ``,
      `💍 *Pernikahan ${coupleName}*`,
      ``,
      `Informasi lengkap mengenai detail acara, peta lokasi, hitung mundur, dan konfirmasi kehadiran (RSVP) dapat dilihat melalui tautan undangan digital resmi kami berikut:`,
      `👉 ${url}`,
      ``,
      `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.`,
      ``,
      `Kami yang berbahagia,`,
      `*${coupleName}*`
    ].join('\n')
  }

  const handleCopyText = (guestName: string, idx?: number) => {
    const text = buildWhatsAppMessage(guestName)
    navigator.clipboard.writeText(text)
    track('copy_guest_link', {
      template: selectedTemplateSlug,
      guest_index: typeof idx === 'number' ? idx : 0
    })
    if (typeof idx === 'number') {
      setCopiedIndex(idx)
      setTimeout(() => setCopiedIndex(null), 2500)
    } else {
      setIsCopiedSingle(true)
      setTimeout(() => setIsCopiedSingle(false), 2500)
    }
    showToast(`Teks undangan WhatsApp untuk "${guestName}" berhasil disalin!`, 'success')
  }

  const previewUrl = buildInvitationUrl(activeGuestForPreview)
  const previewThumbnail =
    selectedTemplate.coverImage ||
    selectedTemplate.thumbnail ||
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&h=630&q=85'

  return (
    <section id="generator" className="py-16 px-4 bg-stone-900/60 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-sans font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fitur Ekstra Siap Sebar JanjiSuci.id</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Generator Nama Tamu & Dynamic WhatsApp Preview
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto mt-2 leading-relaxed">
            Ketik daftar nama tamu undangan Anda. Sistem otomatis membuat link khusus per tamu, kalimat pengantar sopan, serta kartu pratinjau (*Open Graph Preview*) yang elegan saat diterima di aplikasi WhatsApp.
          </p>
        </div>

        {/* Input Configuration & Live WhatsApp Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          {/* Left Column: Form Setup */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-stone-900 border border-white/10 space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-amber-200 border-b border-white/10 pb-3 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-amber-400" />
              <span>Pengaturan Undangan</span>
            </h3>

            <div>
              <label htmlFor="gen-template" className="block text-xs font-semibold text-amber-200 uppercase tracking-wider mb-1.5">
                Pilih Tema Desain
              </label>
              <select
                id="gen-template"
                value={selectedTemplateSlug}
                onChange={(e) => setSelectedTemplateSlug(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                {storeConfig.templates.map((t) => (
                  <option key={t.id} value={t.slug}>
                    {t.name} ({t.categoryLabel})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="gen-couple-name" className="block text-xs font-semibold text-amber-200 uppercase tracking-wider mb-1.5">
                Nama Panggilan Kedua Mempelai
              </label>
              <input
                id="gen-couple-name"
                type="text"
                value={coupleName}
                onChange={(e) => setCoupleName(e.target.value)}
                placeholder="Contoh: Rian & Sarah"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="gen-guest-input" className="block text-xs font-semibold text-amber-200 uppercase tracking-wider">
                  Daftar Nama Tamu
                </label>
                <span className="text-[11px] text-amber-300/80 font-mono">
                  {guestList.length} tamu terdeteksi
                </span>
              </div>
              <textarea
                id="gen-guest-input"
                rows={5}
                value={guestInput}
                onChange={(e) => setGuestInput(e.target.value)}
                placeholder="Ketik 1 nama per baris (tekan Enter untuk tamu berikutnya)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-400 resize-none font-sans"
              />
              <p className="text-[11px] text-stone-400 mt-1">
                Tip: Tekan Enter untuk membuat nama tamu berikutnya. Tiap baris akan memiliki link dan preview unik!
              </p>
            </div>
          </div>

          {/* Right Column: Live WhatsApp Chat Mockup */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-stone-900">
              {/* WhatsApp App Bar */}
              <div className="bg-[#1F2C34] text-white px-4 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/40 border border-emerald-400/40 flex items-center justify-center font-bold text-emerald-300 text-sm">
                    💍
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-sm leading-tight">
                        {coupleName} • Undangan
                      </p>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-[11px] text-emerald-400">online (Simulasi Tamu)</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWaTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 text-xs flex items-center gap-1.5 transition-colors"
                    title="Ganti Tema WA"
                  >
                    {waTheme === 'dark' ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                        <span className="hidden sm:inline text-[11px]">Mode Terang</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-sky-400" />
                        <span className="hidden sm:inline text-[11px]">Mode Gelap</span>
                      </>
                    )}
                  </button>
                  <div className="text-stone-400 flex items-center gap-2 pl-2">
                    <Video className="w-4 h-4 opacity-70" />
                    <PhoneCall className="w-4 h-4 opacity-70" />
                    <MoreVertical className="w-4 h-4 opacity-70" />
                  </div>
                </div>
              </div>

              {/* WhatsApp Chat Body */}
              <div
                className={`p-4 sm:p-6 min-h-[380px] flex flex-col justify-end transition-colors duration-300 ${
                  waTheme === 'dark'
                    ? 'bg-[#0B141A] text-stone-100'
                    : 'bg-[#EFEAE2] text-stone-900'
                }`}
                style={{
                  backgroundImage:
                    waTheme === 'dark'
                      ? 'radial-gradient(#1f2c34 1px, transparent 1px)'
                      : 'radial-gradient(#d1d7db 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              >
                {/* Chat Date Pill */}
                <div className="flex justify-center mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-sans shadow-sm ${
                      waTheme === 'dark'
                        ? 'bg-[#182229] text-stone-400'
                        : 'bg-white/90 text-stone-600'
                    }`}
                  >
                    HARI INI
                  </span>
                </div>

                {/* Sent WhatsApp Balloon with Open Graph Card */}
                <div className="max-w-md ml-auto w-full">
                  <div
                    className={`p-3 rounded-2xl rounded-tr-none shadow-lg border text-xs sm:text-sm font-sans transition-all ${
                      waTheme === 'dark'
                        ? 'bg-[#005C4B] border-emerald-500/20 text-[#E9EDEF]'
                        : 'bg-[#D9FDD3] border-emerald-600/10 text-stone-900'
                    }`}
                  >
                    {/* RICH EMBEDDED WHATSAPP PREVIEW CARD */}
                    <div
                      className={`mb-3 rounded-xl overflow-hidden border shadow-md transition-all ${
                        waTheme === 'dark'
                          ? 'bg-[#025144] border-emerald-400/20'
                          : 'bg-[#C7F7BF] border-emerald-600/20'
                      }`}
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
                        <img
                          src={previewThumbnail}
                          alt="Pratinjau Undangan WhatsApp"
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-amber-300 tracking-wider uppercase border border-amber-400/40">
                          {selectedTemplate.name}
                        </div>
                      </div>

                      <div className="p-3">
                        <p className="text-[10px] uppercase tracking-wider text-emerald-200/80 font-mono">
                          JANJISUCI.WEB.ID
                        </p>
                        <h4 className="font-bold text-xs sm:text-sm mt-0.5 leading-snug line-clamp-1">
                          Undangan Spesial untuk {activeGuestForPreview} 💍
                        </h4>
                        <p
                          className={`text-[11px] mt-1 line-clamp-2 leading-relaxed ${
                            waTheme === 'dark' ? 'text-emerald-100/80' : 'text-stone-700'
                          }`}
                        >
                          Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i {activeGuestForPreview} untuk menghadiri hari bahagia kami: Pernikahan {coupleName}.
                        </p>
                      </div>
                    </div>

                    {/* WhatsApp Body Text */}
                    <div className="space-y-2 whitespace-pre-line leading-relaxed text-xs">
                      <p>
                        Kepada Yth. <strong>{activeGuestForPreview}</strong>
                      </p>
                      <p>
                        Assalamu&apos;alaikum Wr. Wb. / Salam Sejahtera,<br />
                        Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:
                      </p>
                      <p className="font-semibold text-amber-300">
                        💍 Pernikahan {coupleName}
                      </p>
                      <p className="break-all font-mono text-[11px] text-sky-300 underline">
                        👉 {previewUrl}
                      </p>
                      <p>
                        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
                      </p>
                      <p>
                        Kami yang berbahagia,<br />
                        <strong>{coupleName}</strong>
                      </p>
                    </div>

                    {/* Timestamp & Double Checkmarks */}
                    <div className="flex items-center justify-end gap-1 mt-2 text-[10px] opacity-75 font-sans">
                      <span>19:45</span>
                      <span className="text-sky-300 font-bold">✓✓</span>
                    </div>
                  </div>

                  {/* Actions under simulator */}
                  <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-sans transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Tes Buka Sebagai {activeGuestForPreview.split(' ')[0]}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopyText(activeGuestForPreview)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                    >
                      {isCopiedSingle ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-200" />
                          <span>Pesan Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Teks Contoh Ini</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel: Bulk Guest Link List */}
        <div className="p-6 rounded-3xl bg-stone-900 border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
              <Users className="w-5 h-5 text-amber-400" aria-hidden="true" />
              <h3 className="text-white font-serif font-bold text-lg">
                Daftar Link Tamu Siap Kirim ({guestList.length})
              </h3>
            </div>
            <span className="text-xs text-stone-400 hidden sm:inline">
              Klik &quot;Kirim WA&quot; untuk langsung membuka aplikasi WhatsApp di ponsel atau web
            </span>
          </div>

          <div role="region" aria-live="polite" aria-label="Hasil Link Tamu" className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {guestList.length === 0 ? (
              <div role="status" className="text-center py-10 px-4 text-stone-300 text-xs sm:text-sm">
                <p>Belum ada nama tamu yang dimasukkan.</p>
                <p className="text-stone-400 text-xs mt-1">Ketik nama tamu pada formulir di sebelah kiri untuk membuat link otomatis.</p>
              </div>
            ) : (
              guestList.map((guest, idx) => {
                const isCopied = copiedIndex === idx
                const inviteUrl = buildInvitationUrl(guest)
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-stone-800/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-400/30 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] flex items-center justify-center font-bold font-mono">
                          {idx + 1}
                        </span>
                        <p className="font-serif font-bold text-amber-200 text-base truncate">
                          {guest}
                        </p>
                      </div>
                      <p className="text-[11px] text-stone-400 font-mono truncate mt-1 pl-7">
                        {inviteUrl}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pl-7 sm:pl-0">
                      <button
                        type="button"
                        onClick={() => handleCopyText(guest, idx)}
                        aria-label={`Salin teks undangan WhatsApp untuk ${guest}`}
                        className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-sans font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                            <span className="text-emerald-400">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Salin Teks</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(buildWhatsAppMessage(guest))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          track('send_guest_wa', {
                            template: selectedTemplateSlug,
                            guest_index: idx
                          })
                        }
                        aria-label={`Kirim undangan WhatsApp langsung untuk ${guest}`}
                        className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-sans font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 shadow-md"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Kirim WA</span>
                      </a>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
