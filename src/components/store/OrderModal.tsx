import React, { useState, useEffect, useMemo } from 'react'
import {
  X,
  Check,
  Copy,
  Send,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Eye,
  Wallet,
  UserCheck,
  Heart,
  Calendar,
  Music,
  CheckCircle2
} from 'lucide-react'
import {
  storeConfig,
  TemplateItem,
  PricingTier,
  CustomOrderData,
  formatRupiah
} from '../../config/storeConfig'
import { useToast } from '../Toast'

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  initialTemplate: TemplateItem
  initialPackage?: PricingTier
  onApplyCustomPreview: (template: TemplateItem, customData: CustomOrderData) => void
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialTemplate,
  initialPackage,
  onApplyCustomPreview
}) => {
  const { showToast } = useToast()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [dataMode, setDataMode] = useState<'full' | 'later'>('full')
  const [copiedPayment, setCopiedPayment] = useState(false)

  const invoiceCode = useMemo(() => {
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    return `INV-JS-${randomNum}`
  }, [isOpen])

  const [formData, setFormData] = useState<CustomOrderData>(() => {
    try {
      const saved = localStorage.getItem('janjisuci_order_draft')
      if (saved) {
        return {
          ...JSON.parse(saved),
          templateId: initialTemplate.id,
          packageId: initialPackage?.id || 'paket-exclusive'
        }
      }
    } catch {
      // ignore
    }
    return {
      templateId: initialTemplate.id,
      packageId: initialPackage?.id || 'paket-exclusive',
      buyerName: '',
      buyerPhone: '',
      buyerNotes: '',
      groomFullName: '',
      groomShortName: '',
      groomParents: '',
      groomIg: '',
      brideFullName: '',
      brideShortName: '',
      brideParents: '',
      brideIg: '',
      akadDate: '',
      akadTime: '08:00 - 10:00 WIB',
      akadVenue: '',
      resepsiDate: '',
      resepsiTime: '11:00 - 14:00 WIB',
      resepsiVenue: '',
      mapsAddress: '',
      mapsLink: '',
      musicChoice: 'Payung Teduh - Akad',
      giftBankInfo: '',
      photoDriveLink: '',
      paymentMethodId: 'gopay'
    }
  })

  // Auto-save draft on changes
  useEffect(() => {
    try {
      localStorage.setItem('janjisuci_order_draft', JSON.stringify(formData))
    } catch {
      // ignore
    }
  }, [formData])

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      templateId: initialTemplate.id,
      packageId: initialPackage?.id || prev.packageId
    }))
  }, [initialTemplate, initialPackage])

  if (!isOpen) return null

  const selectedTemplate =
    storeConfig.templates.find((t) => t.id === formData.templateId) || storeConfig.templates[0]
  const selectedPackage =
    storeConfig.pricingTiers.find((p) => p.id === formData.packageId) || storeConfig.pricingTiers[1]
  const selectedPayment =
    storeConfig.paymentMethods.find((m) => m.id === formData.paymentMethodId) || storeConfig.paymentMethods[0]

  // Total price uses the chosen package price (or template price if higher, capped in 75k-149k range)
  const finalPrice = selectedPackage.price

  const updateField = (field: keyof CustomOrderData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCopyPaymentNumber = () => {
    navigator.clipboard.writeText(selectedPayment.number)
    setCopiedPayment(true)
    showToast(`Nomor ${selectedPayment.name} (${selectedPayment.number}) berhasil disalin!`, 'success')
    setTimeout(() => setCopiedPayment(false), 2500)
  }

  const handlePreviewWithMyData = () => {
    onApplyCustomPreview(selectedTemplate, formData)
    showToast('Data Anda berhasil diterapkan ke Pratinjau!', 'success')
    onClose()
  }

  const handleSendToWhatsApp = () => {
    if (!formData.buyerName.trim()) {
      showToast('Mohon isi Nama Pemesan terlebih dahulu pada Langkah 1', 'info')
      setStep(1)
      return
    }

    const lines = [
      `Halo Admin *${storeConfig.brand.name}*, saya ingin memesan Undangan Pernikahan Digital! 💍`,
      ``,
      `🧾 *DETAIL PEMESANAN & PEMBAYARAN*`,
      `• No. Invoice: *#${invoiceCode}*`,
      `• Desain Template: *${selectedTemplate.name}*`,
      `• Paket Layanan: *${selectedPackage.name}*`,
      `• Total Tagihan: *${formatRupiah(finalPrice)}*`,
      `• Metode Pembayaran: *${selectedPayment.name} (${selectedPayment.number})*`,
      `• Nama Pemesan: ${formData.buyerName}`,
      `• No. WA Pemesan: ${formData.buyerPhone || '-'}`,
      `• Mode Pengisian Data: *${dataMode === 'later' ? '⚡ Booking Promo (Data Menyusul di WA)' : '📝 Data Lengkap Terlampir'}*`,
      ``
    ]

    if (dataMode === 'later') {
      lines.push(
        `📌 *STATUS DATA ACARA & PENGANTIN:*`,
        `Saya memilih *Booking Slot Promo Terlebih Dahulu*. Data lengkap mempelai, jadwal acara, rekening gift, dan foto prewedding akan segera saya kirimkan menyusul di ruang chat WhatsApp ini.`,
        ``
      )
    } else {
      lines.push(
        `🤵👰 *DATA MEMPELAI PENGANTIN*`,
        `• Mempelai Pria: ${formData.groomFullName || '(Menyusul)'} (${formData.groomShortName || '-'})`,
        `  Ortu Pria: ${formData.groomParents || '-'} | IG: ${formData.groomIg || '-'}`,
        `• Mempelai Wanita: ${formData.brideFullName || '(Menyusul)'} (${formData.brideShortName || '-'})`,
        `  Ortu Wanita: ${formData.brideParents || '-'} | IG: ${formData.brideIg || '-'}`,
        ``,
        `📅 *JADWAL & LOKASI ACARA*`,
        `• Akad Nikah: ${formData.akadDate || '-'} | ${formData.akadTime || '-'}`,
        `  Tempat Akad: ${formData.akadVenue || '-'}`,
        `• Resepsi: ${formData.resepsiDate || formData.akadDate || '-'} | ${formData.resepsiTime || '-'}`,
        `  Tempat Resepsi: ${formData.resepsiVenue || '-'}`,
        `• Alamat Lengkap: ${formData.mapsAddress || '-'}`,
        `• Link Google Maps: ${formData.mapsLink || '-'}`,
        ``,
        `🎵 *MUSIK, AMPLOP & GALERI FOTO*`,
        `• Lagu Backsound: ${formData.musicChoice || 'Payung Teduh - Akad'}`,
        `• Rekening Amplop Digital: ${formData.giftBankInfo || '-'}`,
        `• Link Foto Prewedding: ${formData.photoDriveLink || 'Kirim menyusul via chat WA'}`,
        `• Catatan Tambahan: ${formData.buyerNotes || '-'}`,
        ``
      )
    }

    lines.push(
      `Berikut saya konfirmasi pesanan saya & lampirkan bukti pembayarannya ke *${selectedPayment.name} ${selectedPayment.number}*. Terima kasih! 🙏`
    )

    const waUrl = `https://wa.me/${storeConfig.brand.whatsappNumber}?text=${encodeURIComponent(
      lines.join('\n')
    )}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl bg-white text-stone-800 shadow-2xl border border-amber-500/30 overflow-hidden my-auto max-h-[94dvh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-sans uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Formulir Pemesanan & Setor Data</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
              {selectedTemplate.name} — {formatRupiah(finalPrice)}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup formulir pemesanan"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="bg-stone-100 px-4 sm:px-8 py-3 border-b border-stone-200 shrink-0">
          <div className="grid grid-cols-3 gap-2">
            {[
              { num: 1, label: '1. Pilih Paket' },
              { num: 2, label: '2. Setor Data' },
              { num: 3, label: '3. Bayar & WA' }
            ].map((item) => {
              const active = step === item.num
              const completed = step > item.num
              return (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => setStep(item.num as 1 | 2 | 3)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-800 text-white shadow-sm'
                      : completed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-white text-stone-500 border border-stone-200'
                  }`}
                >
                  {completed && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                  <span className="truncate">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: PILIH TEMPLATE, PAKET & IDENTITAS PEMESAN */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Template Choice */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Desain Template Pilihan Anda
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {storeConfig.templates.map((tpl) => {
                    const isSelected = formData.templateId === tpl.id
                    return (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => updateField('templateId', tpl.id)}
                        className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'border-amber-700 bg-amber-50/70 ring-2 ring-amber-700/20'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <img
                          src={tpl.thumbnail}
                          alt={tpl.name}
                          className="w-11 h-11 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-serif font-bold text-xs text-stone-900 truncate">
                            {tpl.name}
                          </p>
                          <p className="text-[11px] font-sans text-amber-800 font-semibold">
                            {formatRupiah(tpl.price)}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Package Tier Choice */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Pilih Paket Layanan (Rp 75.000 – Rp 149.000)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {storeConfig.pricingTiers.map((pkg) => {
                    const isSelected = formData.packageId === pkg.id
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => updateField('packageId', pkg.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                          isSelected
                            ? 'border-amber-700 bg-amber-50/60 ring-2 ring-amber-700/20 shadow-md'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        {pkg.badge && (
                          <span className="inline-block px-2 py-0.5 rounded-full bg-amber-800 text-white text-[10px] font-semibold mb-1.5">
                            {pkg.badge}
                          </span>
                        )}
                        <h4 className="font-serif font-bold text-base text-stone-900">
                          {pkg.name}
                        </h4>
                        <div className="flex items-baseline gap-1.5 my-1">
                          <span className="text-lg font-bold text-amber-900">
                            {formatRupiah(pkg.price)}
                          </span>
                          <span className="text-[11px] text-stone-400 line-through">
                            {formatRupiah(pkg.originalPrice)}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Buyer Contact Details */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                <div className="flex items-center gap-2 text-stone-800 font-serif font-bold text-base">
                  <UserCheck className="w-4 h-4 text-amber-800" />
                  <span>Identitas Pemesan</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nama Pemesan *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.buyerName}
                      onChange={(e) => updateField('buyerName', e.target.value)}
                      placeholder="Contoh: Rian Mahendra"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.buyerPhone}
                      onChange={(e) => updateField('buyerPhone', e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SETOR DATA PENGANTIN & ACARA */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Data Mode Selector */}
              <div className="bg-stone-100 p-1.5 rounded-2xl flex gap-1.5 border border-stone-200">
                <button
                  type="button"
                  onClick={() => setDataMode('full')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    dataMode === 'full'
                      ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>📝 Isi Data Lengkap Sekarang</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDataMode('later')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    dataMode === 'later'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-600 hover:text-amber-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>⚡ Booking Dulu (Data Menyusul di WA)</span>
                </button>
              </div>

              {dataMode === 'later' ? (
                /* Fast-Track Mode: Data menyusul */
                <div className="p-6 rounded-3xl bg-amber-50/80 border-2 border-dashed border-amber-400 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-2xl shadow-inner">
                    ⚡
                  </div>
                  <div className="max-w-md mx-auto space-y-1.5">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      Amankan Slot Diskon & Promo Spesial
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Sedang terburu-buru atau data pernikahan belum fiks? Tidak masalah! Anda bisa langsung melanjutkan ke proses pembayaran untuk mengunci harga promo. Seluruh rincian foto, jadwal, dan nama mempelai bisa Anda kirimkan santai di WhatsApp Admin kami.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs sm:text-sm font-sans font-bold shadow-md cursor-pointer transition-all active:scale-95"
                    >
                      <span>Lanjut ke Pembayaran & WA</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Full Mode: Isi Form Lengkap */
                <>
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-3 flex-wrap">
                    <span>
                      💡 <strong>Petunjuk:</strong> Isi data di bawah ini untuk langsung dicoba di Pratinjau atau dikirim ke WhatsApp Admin. Jika ada yang belum pasti, boleh dikosongkan dan menyusul via WA!
                    </span>
                    <button
                      type="button"
                      onClick={handlePreviewWithMyData}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-800 text-white font-semibold text-xs hover:bg-amber-900 cursor-pointer shrink-0 shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Coba Pratinjau Data Saya</span>
                    </button>
                  </div>

                  {/* Data Mempelai Pria & Wanita */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Mempelai Pria */}
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                      <div className="flex items-center gap-1.5 font-serif font-bold text-stone-800 text-sm border-b border-stone-200 pb-2">
                        <Heart className="w-4 h-4 text-amber-700" />
                        <span>Data Mempelai Pria</span>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Nama Panggilan Pria
                        </label>
                        <input
                          type="text"
                          value={formData.groomShortName}
                          onChange={(e) => updateField('groomShortName', e.target.value)}
                          placeholder="Contoh: Rian"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Nama Lengkap & Gelar
                        </label>
                        <input
                          type="text"
                          value={formData.groomFullName}
                          onChange={(e) => updateField('groomFullName', e.target.value)}
                          placeholder="Contoh: M. Arrian Mahendra, S.T."
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Nama Kedua Orang Tua Pria
                        </label>
                        <input
                          type="text"
                          value={formData.groomParents}
                          onChange={(e) => updateField('groomParents', e.target.value)}
                          placeholder="Bpk. Hendra & Ibu Siti"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Username Instagram (Opsional)
                        </label>
                        <input
                          type="text"
                          value={formData.groomIg}
                          onChange={(e) => updateField('groomIg', e.target.value)}
                          placeholder="@rian.mahendra"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                    </div>

                    {/* Mempelai Wanita */}
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                      <div className="flex items-center gap-1.5 font-serif font-bold text-stone-800 text-sm border-b border-stone-200 pb-2">
                        <Heart className="w-4 h-4 text-rose-600" />
                        <span>Data Mempelai Wanita</span>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Nama Panggilan Wanita
                        </label>
                        <input
                          type="text"
                          value={formData.brideShortName}
                          onChange={(e) => updateField('brideShortName', e.target.value)}
                          placeholder="Contoh: Sarah"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Nama Lengkap & Gelar
                        </label>
                        <input
                          type="text"
                          value={formData.brideFullName}
                          onChange={(e) => updateField('brideFullName', e.target.value)}
                          placeholder="Contoh: Sarah Az-Zahra, S.Psi."
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Nama Kedua Orang Tua Wanita
                        </label>
                        <input
                          type="text"
                          value={formData.brideParents}
                          onChange={(e) => updateField('brideParents', e.target.value)}
                          placeholder="Bpk. Ahmad & Ibu Fatimah"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Username Instagram (Opsional)
                        </label>
                        <input
                          type="text"
                          value={formData.brideIg}
                          onChange={(e) => updateField('brideIg', e.target.value)}
                          placeholder="@sarah.azzahra"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Detail Waktu & Lokasi Acara */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                    <div className="flex items-center gap-1.5 font-serif font-bold text-stone-800 text-sm border-b border-stone-200 pb-2">
                      <Calendar className="w-4 h-4 text-amber-800" />
                      <span>Jadwal & Lokasi Acara</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Hari & Tanggal Akad
                        </label>
                        <input
                          type="text"
                          value={formData.akadDate}
                          onChange={(e) => updateField('akadDate', e.target.value)}
                          placeholder="Minggu, 20 Oktober 2026"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Jam Akad Nikah
                        </label>
                        <input
                          type="text"
                          value={formData.akadTime}
                          onChange={(e) => updateField('akadTime', e.target.value)}
                          placeholder="08:00 - 10:00 WIB"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Tempat / Gedung Akad
                        </label>
                        <input
                          type="text"
                          value={formData.akadVenue}
                          onChange={(e) => updateField('akadVenue', e.target.value)}
                          placeholder="Masjid Agung / Kediaman"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Hari & Tanggal Resepsi
                        </label>
                        <input
                          type="text"
                          value={formData.resepsiDate}
                          onChange={(e) => updateField('resepsiDate', e.target.value)}
                          placeholder="Minggu, 20 Oktober 2026"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Jam Resepsi
                        </label>
                        <input
                          type="text"
                          value={formData.resepsiTime}
                          onChange={(e) => updateField('resepsiTime', e.target.value)}
                          placeholder="11:00 - 14:00 WIB"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Tempat / Gedung Resepsi
                        </label>
                        <input
                          type="text"
                          value={formData.resepsiVenue}
                          onChange={(e) => updateField('resepsiVenue', e.target.value)}
                          placeholder="Ballroom Hotel Ciputra"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Alamat Lengkap Lokasi
                        </label>
                        <input
                          type="text"
                          value={formData.mapsAddress}
                          onChange={(e) => updateField('mapsAddress', e.target.value)}
                          placeholder="Jl. Simpang Lima No. 1, Kota Semarang"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Link Titik Google Maps (Opsional)
                        </label>
                        <input
                          type="text"
                          value={formData.mapsLink}
                          onChange={(e) => updateField('mapsLink', e.target.value)}
                          placeholder="https://maps.app.goo.gl/..."
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Musik, Amplop Digital & Foto */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                    <div className="flex items-center gap-1.5 font-serif font-bold text-stone-800 text-sm border-b border-stone-200 pb-2">
                      <Music className="w-4 h-4 text-amber-800" />
                      <span>Lagu Backsound, Amplop Digital & Foto</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Pilihan Lagu Latar Indonesia
                        </label>
                        <select
                          value={formData.musicChoice}
                          onChange={(e) => updateField('musicChoice', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        >
                          <option value="Payung Teduh - Akad">Payung Teduh - Akad</option>
                          <option value="Payung Teduh - Berdua Saja">Payung Teduh - Berdua Saja</option>
                          <option value="Tulus - Teman Hidup">Tulus - Teman Hidup (Request)</option>
                          <option value="Yovie & Nuno - Janji Suci">Yovie & Nuno - Janji Suci (Request)</option>
                          <option value="Tiara Andini & Arsy - Lagu Pernikahan Kita">Lagu Pernikahan Kita (Request)</option>
                          <option value="Gending Jawa Keraton Klasik">Gending Jawa Keraton Klasik</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          No. Rekening Amplop Digital Pengantin
                        </label>
                        <input
                          type="text"
                          value={formData.giftBankInfo}
                          onChange={(e) => updateField('giftBankInfo', e.target.value)}
                          placeholder="Contoh: BCA 84650192 a.n Rian"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Link Google Drive Foto Prewedding / Catatan Tambahan (Atau Kirim langsung di WA)
                      </label>
                      <input
                        type="text"
                        value={formData.photoDriveLink}
                        onChange={(e) => updateField('photoDriveLink', e.target.value)}
                        placeholder="Contoh: https://drive.google.com/... atau 'Foto saya kirim menyusul di chat WA'"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 3: PEMBAYARAN E-WALLET (GOPAY / SHOPEEPAY / DANA) & KONFIRMASI WA */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Invoice Banner */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950 text-white shadow-xl border border-amber-500/30">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-amber-300 font-sans">
                      Nomor Invoice Pesanan
                    </span>
                    <h3 className="font-mono text-xl font-bold text-white">
                      #{invoiceCode}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] uppercase tracking-widest text-stone-300 font-sans">
                      Total Pembayaran
                    </span>
                    <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
                      {formatRupiah(finalPrice)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs">
                  <div>
                    <span className="text-stone-400 block">Template Pilihan:</span>
                    <strong className="text-amber-100">{selectedTemplate.name}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Paket Layanan:</span>
                    <strong className="text-amber-100">{selectedPackage.name}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Pemesan:</span>
                    <strong className="text-amber-100">{formData.buyerName || '-'}</strong>
                  </div>
                </div>
              </div>

              {/* Pilih Metode Pembayaran E-Wallet (GoPay / ShopeePay / DANA) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2.5">
                  Pilih Metode Pembayaran (GoPay / ShopeePay / DANA)
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {storeConfig.paymentMethods.map((method) => {
                    const active = formData.paymentMethodId === method.id
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => updateField('paymentMethodId', method.id)}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                          active
                            ? 'border-amber-700 bg-amber-50 ring-2 ring-amber-700/20 font-bold text-stone-900 shadow-sm'
                            : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <Wallet className={`w-5 h-5 ${active ? 'text-amber-800' : 'text-stone-400'}`} />
                        <span className="text-xs sm:text-sm">{method.name}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Payment Destination Card */}
                <div className="p-5 rounded-2xl bg-stone-50 border-2 border-dashed border-amber-600/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                      <span>Transfer {selectedPayment.name}</span>
                    </div>
                    <p className="font-mono text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-wider pt-1">
                      {selectedPayment.number}
                    </p>
                    <p className="text-xs text-stone-600">
                      a.n. <strong>{selectedPayment.holder}</strong> • Sebesar{' '}
                      <strong className="text-amber-900">{formatRupiah(finalPrice)}</strong>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPaymentNumber}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-sans font-semibold transition-all cursor-pointer active:scale-95 shadow-md"
                  >
                    {copiedPayment ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Nomor Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin Nomor {selectedPayment.name}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Petunjuk Konfirmasi */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Langkah Terakhir (Sangat Mudah):</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-emerald-800 pl-1">
                  <li>
                    Salin nomor <strong>{selectedPayment.name} ({selectedPayment.number})</strong> di atas dan lakukan pembayaran sejumlah <strong>{formatRupiah(finalPrice)}</strong>.
                  </li>
                  <li>
                    Klik tombol hijau <strong>"Konfirmasi & Kirim Data ke WhatsApp"</strong> di bawah ini.
                  </li>
                  <li>
                    Seluruh data undangan yang sudah Anda isi akan otomatis tertulis rapi di chat WhatsApp Admin <strong>({storeConfig.brand.whatsappDisplay})</strong>.
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Navigation */}
        <div className="px-5 sm:px-8 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-xs font-sans font-semibold text-stone-700 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2.5">
            {step === 2 && (
              <button
                type="button"
                onClick={handlePreviewWithMyData}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-amber-700/40 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-sans font-semibold cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Lihat di Pratinjau</span>
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && !formData.buyerName.trim()) {
                    showToast('Mohon isi Nama Pemesan terlebih dahulu', 'info')
                    return
                  }
                  setStep((prev) => (prev + 1) as 1 | 2 | 3)
                }}
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs sm:text-sm font-sans font-bold shadow-md transition-all cursor-pointer active:scale-95"
              >
                <span>Lanjut ke Langkah {step + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-sans font-bold shadow-lg shadow-emerald-600/25 transition-all cursor-pointer active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Konfirmasi & Setor Data via WhatsApp</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
