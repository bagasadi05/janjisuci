import React, { useState } from 'react'
import { Link2, Copy, Check, Send, Users, Sparkles } from 'lucide-react'
import { storeConfig } from '../../config/storeConfig'
import { useToast } from '../Toast'

export const GuestLinkGenerator: React.FC = () => {
  const { showToast } = useToast()
  const [selectedTemplateSlug, setSelectedTemplateSlug] = useState(storeConfig.templates[0].slug)
  const [coupleName, setCoupleName] = useState('Rian & Sarah')
  const [guestInput, setGuestInput] = useState('Bpk. Budi Santoso & Keluarga\nIbu Hj. Siti Aminah\nDimas Pratama & Partner')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const guestList = guestInput
    .split('\n')
    .map((g) => g.trim())
    .filter(Boolean)

  const buildInvitationUrl = (guestName: string) => {
    const baseUrl = window.location.origin
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
      `Informasi lengkap mengenai detail acara dan lokasi dapat dilihat melalui tautan undangan digital berikut:`,
      `👉 ${url}`,
      ``,
      `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.`,
      ``,
      `Kami yang berbahagia,`,
      `*${coupleName}*`
    ].join('\n')
  }

  const handleCopyText = (guestName: string, idx: number) => {
    navigator.clipboard.writeText(buildWhatsAppMessage(guestName))
    setCopiedIndex(idx)
    showToast(`Teks undangan untuk "${guestName}" berhasil disalin!`, 'success')
    setTimeout(() => setCopiedIndex(null), 2500)
  }

  return (
    <section id="generator" className="py-16 px-4 bg-stone-900/50 border-t border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-sans font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fitur Gratis Pelanggan JanjiSuci.id</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Generator Nama Tamu & Teks WhatsApp
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto mt-2 leading-relaxed">
            Ketik daftar nama tamu undangan Anda (satu nama per baris), dan sistem otomatis membuatkan link khusus beserta kalimat pengantar WhatsApp yang sopan dan siap kirim!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Input Panel */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-stone-900 border border-white/10 space-y-4 shadow-xl">
            <div>
              <label className="block text-xs font-semibold text-amber-200 uppercase tracking-wider mb-1.5">
                Pilih Tema Undangan
              </label>
              <select
                value={selectedTemplateSlug}
                onChange={(e) => setSelectedTemplateSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-500"
              >
                {storeConfig.templates.map((t) => (
                  <option key={t.id} value={t.slug}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-200 uppercase tracking-wider mb-1.5">
                Nama Panggilan Kedua Mempelai
              </label>
              <input
                type="text"
                value={coupleName}
                onChange={(e) => setCoupleName(e.target.value)}
                placeholder="Contoh: Rian & Sarah"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-200 uppercase tracking-wider mb-1.5">
                Daftar Nama Tamu (1 Baris = 1 Tamu)
              </label>
              <textarea
                rows={5}
                value={guestInput}
                onChange={(e) => setGuestInput(e.target.value)}
                placeholder="Ketik nama tamu, pisahkan dengan baris baru (Enter)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>
          </div>

          {/* Right Output List */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-stone-900 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
                <Users className="w-5 h-5 text-amber-400" />
                <span>Daftar Link Tamu Siap Kirim ({guestList.length})</span>
              </div>
            </div>

            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {guestList.map((guest, idx) => {
                const isCopied = copiedIndex === idx
                const inviteUrl = buildInvitationUrl(guest)
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-stone-800/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="font-serif font-bold text-amber-200 text-base truncate">
                        {guest}
                      </p>
                      <p className="text-[11px] text-stone-400 font-mono truncate mt-0.5">
                        {inviteUrl}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopyText(guest, idx)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-sans font-semibold transition-all cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Teks WA</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(buildWhatsAppMessage(guest))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-sans font-semibold transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Kirim WA</span>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
