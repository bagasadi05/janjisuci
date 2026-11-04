import React, { useState, useEffect, useRef } from 'react'
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  Copy,
  Users,
  MessageCircle,
  Sparkles,
  Download,
  Calendar,
  Share2,
  Phone,
  HeartHandshake
} from 'lucide-react'
import { storeConfig, formatRupiah } from '../../config/storeConfig'
import { useToast } from '../Toast'

interface ClientPortalModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenPreview?: (slug: string) => void
}

interface MockRsvpEntry {
  id: string
  name: string
  status: 'hadir' | 'tidak_hadir' | 'ragu'
  pax: number
  message: string
  createdAt: string
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenPreview
}) => {
  const { showToast } = useToast()
  const modalRef = useRef<HTMLDivElement>(null)
  const [invoiceQuery, setInvoiceQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'status' | 'rsvp' | 'generator'>('status')
  const [copiedLink, setCopiedLink] = useState(false)
  const [guestNameInput, setGuestNameInput] = useState('')
  const [copiedGuestMessage, setCopiedGuestMessage] = useState(false)

  // Retrieve last saved order draft if available
  const [orderData, setOrderData] = useState<{
    invoiceCode: string
    templateName: string
    templateSlug: string
    coupleName: string
    eventDate: string
    packageName: string
    totalPrice: number
    status: 'active' | 'processing'
  }>(() => {
    try {
      const draft = localStorage.getItem('janjisuci_order_draft')
      if (draft) {
        const parsed = JSON.parse(draft)
        const tpl = storeConfig.templates.find((t) => t.id === parsed.templateId) || storeConfig.templates[0]
        const pkg = storeConfig.pricingTiers.find((p) => p.id === parsed.packageId) || storeConfig.pricingTiers[1]
        const groom = parsed.groomShortName || parsed.groomFullName || 'Rian'
        const bride = parsed.brideShortName || parsed.brideFullName || 'Sarah'
        return {
          invoiceCode: 'INV-JS-7821',
          templateName: tpl.name,
          templateSlug: tpl.slug,
          coupleName: `${groom} & ${bride}`,
          eventDate: parsed.akadDate || parsed.resepsiDate || 'Sabtu, 28 November 2026',
          packageName: pkg.name,
          totalPrice: pkg.price,
          status: 'active'
        }
      }
    } catch {
      // ignore
    }
    return {
      invoiceCode: 'INV-JS-7821',
      templateName: 'Exclusive Royal Navy',
      templateSlug: 'exclusive-navy',
      coupleName: 'Rian & Sarah',
      eventDate: 'Sabtu, 28 November 2026',
      packageName: 'Paket Exclusive VIP',
      totalPrice: 109000,
      status: 'active'
    }
  })

  // Sample RSVP data for illustration in portal
  const [rsvpList] = useState<MockRsvpEntry[]>([
    {
      id: '1',
      name: 'Bpk. Hendra Gunawan & Keluarga',
      status: 'hadir',
      pax: 3,
      message: 'Selamat menempuh hidup baru untuk kedua mempelai. Semoga menjadi keluarga sakinah, mawaddah, warahmah.',
      createdAt: '15 menit yang lalu'
    },
    {
      id: '2',
      name: 'Ibu Hj. Siti Nurhasanah',
      status: 'hadir',
      pax: 2,
      message: 'Barakallahu lakum wa baraka alaikum. Bahagia selalu ya Ananda!',
      createdAt: '1 jam yang lalu'
    },
    {
      id: '3',
      name: 'Dimas Kurniawan Pratama',
      status: 'hadir',
      pax: 1,
      message: 'Lancar sampai hari H bro! Pasti hadir dong!',
      createdAt: '3 jam yang lalu'
    },
    {
      id: '4',
      name: 'Dr. Ahmad Fauzi (Sahabat Kampus)',
      status: 'tidak_hadir',
      pax: 0,
      message: 'Mohon maaf belum bisa hadir secara langsung karena sedang tugas dinas di luar kota. Doa terbaik untuk kalian berdua.',
      createdAt: 'Kemarin'
    },
    {
      id: '5',
      name: 'Rina Oktaviani & Suami',
      status: 'hadir',
      pax: 2,
      message: 'Cantik banget undangannya! Selamat ya cantikk, see you on your big day!',
      createdAt: 'Kemarin'
    }
  ])

  // Focus trap & escape handler
  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const invitationUrl = `${window.location.origin}/?template=${orderData.templateSlug}`
  const guestUrl = `${invitationUrl}&to=${encodeURIComponent(guestNameInput || 'Tamu Undangan')}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationUrl)
    setCopiedLink(true)
    showToast('Tautan undangan berhasil disalin!', 'success')
    setTimeout(() => setCopiedLink(false), 2500)
  }

  const handleCopyGuestInvitation = () => {
    const text = [
      `Kepada Yth. *${guestNameInput.trim() || 'Bapak/Ibu/Saudara/i'}*`,
      ``,
      `Assalamu'alaikum Wr. Wb. / Salam Sejahtera,`,
      `Tanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk hadir di momen bahagia kami:`,
      ``,
      `💍 *Pernikahan ${orderData.coupleName}*`,
      `📅 *${orderData.eventDate}*`,
      ``,
      `Buka tautan undangan digital Anda di sini:`,
      `👉 ${guestUrl}`,
      ``,
      `Merupakan kehormatan bagi kami apabila Anda berkenan hadir dan memberikan doa restu. Terima kasih.`,
      `Salam hangat,`,
      `*${orderData.coupleName}*`
    ].join('\n')

    navigator.clipboard.writeText(text)
    setCopiedGuestMessage(true)
    showToast('Pesan WhatsApp untuk tamu berhasil disalin!', 'success')
    setTimeout(() => setCopiedGuestMessage(false), 2500)
  }

  const handleExportCsv = () => {
    const headers = 'Nama Tamu,Status Kehadiran,Jumlah Pax,Ucapan Doa,Waktu\n'
    const rows = rsvpList
      .map(
        (r) =>
          `"${r.name}","${r.status === 'hadir' ? 'Hadir' : r.status === 'tidak_hadir' ? 'Berhalangan' : 'Ragu-ragu'}",${r.pax},"${r.message.replace(/"/g, '""')}","${r.createdAt}"`
      )
      .join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `Rekap-RSVP-${orderData.coupleName.replace(/\s+/g, '-')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('File rekap tamu (.CSV) berhasil diunduh!', 'success')
  }

  const hadirCount = rsvpList.filter((r) => r.status === 'hadir').length
  const totalPax = rsvpList.filter((r) => r.status === 'hadir').reduce((acc, curr) => acc + curr.pax, 0)
  const tidakHadirCount = rsvpList.filter((r) => r.status === 'tidak_hadir').length

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-stone-900 border border-amber-500/30 text-stone-100 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 id="portal-modal-title" className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Portal Pelanggan JanjiSuci</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                  {orderData.invoiceCode}
                </span>
              </h2>
              <p className="text-[11px] text-stone-400">
                Kelola undangan, pantau rekap RSVP tamu, dan sebar tautan WhatsApp
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela portal"
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-white/10 bg-stone-950/40 px-5 gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('status')}
            className={`min-h-[44px] py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'status'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Status Undangan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rsvp')}
            className={`min-h-[44px] py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'rsvp'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Rekap RSVP Tamu ({rsvpList.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('generator')}
            className={`min-h-[44px] py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'generator'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Kirim WhatsApp Cepat</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-5 sm:p-7 overflow-y-auto max-h-[70vh] space-y-6">
          {/* TAB 1: STATUS & LINKS */}
          {activeTab === 'status' && (
            <div className="space-y-6">
              {/* Order Status Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-stone-900 to-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-lg text-white">{orderData.coupleName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-stone-950 text-[10px] font-extrabold uppercase">
                        Aktif & Siap Sebar
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 mt-0.5">
                      {orderData.templateName} • {orderData.packageName} • {orderData.eventDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={`/?template=${orderData.templateSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[40px] flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Buka Undangan</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="min-h-[40px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-stone-200 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Tersalin!' : 'Salin URL'}</span>
                  </button>
                </div>
              </div>

              {/* Invitation URL Box */}
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-white/10">
                <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                  Tautan Utama Undangan Digital Anda:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={invitationUrl}
                    className="flex-1 bg-stone-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 font-mono select-all focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-colors cursor-pointer shrink-0"
                  >
                    {copiedLink ? 'Disalin!' : 'Salin'}
                  </button>
                </div>
                <p className="text-[11px] text-stone-400 mt-2">
                  💡 <em>Gunakan menu "Kirim WhatsApp Cepat" di atas untuk menambahkan nama tamu spesifik pada tautan undangan.</em>
                </p>
              </div>

              {/* Order Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-white/10">
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider">No. Invoice</p>
                  <p className="font-mono text-sm font-bold text-amber-300 mt-0.5">{orderData.invoiceCode}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-white/10">
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider">Masa Aktif</p>
                  <p className="text-sm font-bold text-white mt-0.5">Aktif Selamanya</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-white/10">
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider">Total Biaya</p>
                  <p className="text-sm font-bold text-emerald-400 mt-0.5">{formatRupiah(orderData.totalPrice)}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-white/10">
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider">Bantuan CS</p>
                  <a
                    href={`https://wa.me/${storeConfig.brand.whatsappNumber}?text=${encodeURIComponent(
                      `Halo Admin, saya ingin konsultasi revisi pesanan ${orderData.invoiceCode} atas nama ${orderData.coupleName}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-amber-400 hover:underline mt-0.5 flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat Admin</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RSVP & GUESTBOOK */}
          {activeTab === 'rsvp' && (
            <div className="space-y-6">
              {/* RSVP Counter Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center">
                  <p className="text-[10px] sm:text-xs text-emerald-300 uppercase tracking-wider font-semibold">Tamu Hadir</p>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">{hadirCount} Tamu</p>
                  <p className="text-[10px] text-emerald-300/80 mt-0.5">{totalPax} Estimasi Pax</p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-center">
                  <p className="text-[10px] sm:text-xs text-rose-300 uppercase tracking-wider font-semibold">Berhalangan</p>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-rose-400 mt-1">{tidakHadirCount} Tamu</p>
                  <p className="text-[10px] text-rose-300/80 mt-0.5">Doa terkirim</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-center">
                  <p className="text-[10px] sm:text-xs text-amber-300 uppercase tracking-wider font-semibold">Total Respon</p>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-400 mt-1">{rsvpList.length}</p>
                  <p className="text-[10px] text-amber-300/80 mt-0.5">Konfirmasi RSVP</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Daftar Konfirmasi &amp; Doa Tamu</span>
                </h3>

                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="min-h-[38px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-stone-200 font-medium transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download Excel (.CSV)</span>
                </button>
              </div>

              {/* RSVP List Feed */}
              <div className="space-y-3">
                {rsvpList.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-stone-200">{entry.name}</span>
                        {entry.status === 'hadir' ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                            ✓ Hadir ({entry.pax} orang)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                            ✕ Berhalangan
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">{entry.createdAt}</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed italic bg-stone-900/60 p-2.5 rounded-xl border border-white/5">
                      "{entry.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GENERATOR WHATSAPP TAMU */}
          {activeTab === 'generator' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
                <p className="font-bold flex items-center gap-1.5 mb-1 text-amber-300">
                  <Sparkles className="w-4 h-4" />
                  Kirim Undangan dengan Nama Tamu Khusus:
                </p>
                Ketik nama tamu di bawah, lalu klik tombol untuk menyalin teks format WhatsApp yang sopan beserta link yang otomatis menampilkan nama mereka pada halaman pembuka undangan!
              </div>

              <div>
                <label htmlFor="client-guest-input" className="block text-xs font-semibold text-stone-300 mb-2">
                  Nama Tamu Undangan:
                </label>
                <div className="flex gap-2">
                  <input
                    id="client-guest-input"
                    type="text"
                    value={guestNameInput}
                    onChange={(e) => setGuestNameInput(e.target.value)}
                    placeholder="Contoh: Bpk. Bambang Pamungkas & Partner"
                    className="flex-1 bg-stone-950 border border-white/15 focus:border-amber-400 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-200 placeholder-stone-400 focus:outline-none transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={handleCopyGuestInvitation}
                    className="min-h-[44px] px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copiedGuestMessage ? 'Tersalin!' : 'Salin Teks WA'}</span>
                  </button>
                </div>
              </div>

              {/* Preview Message Box */}
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-white/10">
                <p className="text-[10px] uppercase font-mono tracking-wider text-amber-400 mb-2">
                  Pratinjau Pesan yang Akan Dikirim:
                </p>
                <div className="p-3.5 rounded-xl bg-stone-900 border border-white/5 text-xs text-stone-300 whitespace-pre-wrap font-sans leading-relaxed">
                  {`Kepada Yth. *${guestNameInput.trim() || 'Bapak/Ibu/Saudara/i'}*\n\nAssalamu'alaikum Wr. Wb. / Salam Sejahtera,\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk hadir di momen bahagia kami:\n\n💍 *Pernikahan ${orderData.coupleName}*\n📅 *${orderData.eventDate}*\n\nBuka tautan undangan digital Anda di sini:\n👉 ${guestUrl}\n\nMerupakan kehormatan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.\n\nSalam hangat,\n*${orderData.coupleName}*`}
                </div>
              </div>

              {/* Direct WhatsApp Share Link */}
              <div className="text-right">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Kepada Yth. *${guestNameInput.trim() || 'Bapak/Ibu/Saudara/i'}*\n\nAssalamu'alaikum Wr. Wb. / Salam Sejahtera,\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk hadir di momen bahagia kami:\n\n💍 *Pernikahan ${orderData.coupleName}*\n📅 *${orderData.eventDate}*\n\nBuka tautan undangan digital Anda di sini:\n👉 ${guestUrl}\n\nMerupakan kehormatan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.\n\nSalam hangat,\n*${orderData.coupleName}*`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Buka Langsung di WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-stone-950/70 flex items-center justify-between">
          <p className="text-[11px] text-stone-400">
            Butuh revisi data atau bantuan tim JanjiSuci?
          </p>
          <a
            href={`https://wa.me/${storeConfig.brand.whatsappNumber}?text=${encodeURIComponent(
              `Halo Admin JanjiSuci, saya ingin konsultasi terkait pesanan #${orderData.invoiceCode}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Hubungi Admin WA</span>
          </a>
        </div>
      </div>
    </div>
  )
}
