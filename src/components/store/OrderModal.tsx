import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  X,
  Check,
  Copy,
  Send,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Eye,
  Wallet,
  UserCheck,
  Heart,
  Calendar,
  Music,
  CheckCircle2,
  GraduationCap,
  Cake,
  Baby,
  Scissors,
  QrCode,
  Clock,
  ArrowRight,
  ExternalLink,
  Info,
  Gift,
  MapPin,
  Camera,
  Download
} from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { toPng } from 'html-to-image'
import {
  storeConfig,
  TemplateItem,
  PricingTier,
  CustomOrderData,
  formatRupiah
} from '../../config/storeConfig'
import { useToast } from '../Toast'
import { track, getAttribution } from '../../lib/analytics'

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  initialTemplate: TemplateItem
  initialPackage?: PricingTier
  onApplyCustomPreview: (template: TemplateItem, customData: CustomOrderData) => void
  onOpenPortal?: () => void
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialTemplate,
  initialPackage,
  onApplyCustomPreview,
  onOpenPortal
}) => {
  const { showToast } = useToast()
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [dataSubTab, setDataSubTab] = useState<'couple' | 'event' | 'gift'>('couple')
  const [dataMode, setDataMode] = useState<'full' | 'later'>('later')
  const [copiedPayment, setCopiedPayment] = useState(false)
  const [copiedPrice, setCopiedPrice] = useState(false)
  const [buyerNameError, setBuyerNameError] = useState(false)
  const [qrisTimer, setQrisTimer] = useState(900) // 15 minutes countdown
  const modalRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const invoiceCode = useMemo(() => {
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    return `INV-JS-${randomNum}`
  }, [isOpen])

  // Unique 3-digit nominal code for automated reconciliation simulator
  const uniqueCode = useMemo(() => {
    return Math.floor(100 + Math.random() * 900)
  }, [isOpen])

  const getDefaultPackageId = (tpl: TemplateItem, pkg?: PricingTier) => {
    if (pkg) return pkg.id
    const isEvent = Boolean(tpl.eventType && tpl.eventType !== 'wedding')
    if (isEvent) return 'paket-syukuran-exclusive'
    if (tpl.slug === 'royal-midnight') return 'paket-vip'
    return 'paket-exclusive'
  }

  const [formData, setFormData] = useState<CustomOrderData>(() => {
    try {
      const saved = localStorage.getItem('janjisuci_order_draft')
      if (saved) {
        return {
          ...JSON.parse(saved),
          templateId: initialTemplate.id,
          packageId: initialPackage?.id || getDefaultPackageId(initialTemplate, initialPackage)
        }
      }
    } catch {
      // ignore
    }
    return {
      templateId: initialTemplate.id,
      packageId: getDefaultPackageId(initialTemplate, initialPackage),
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
      paymentMethodId: 'qris'
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
      packageId: initialPackage?.id || getDefaultPackageId(initialTemplate, initialPackage)
    }))
  }, [initialTemplate, initialPackage])

  // QRIS Countdown Timer
  useEffect(() => {
    if (step !== 3) return
    const interval = setInterval(() => {
      setQrisTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [step])

  // WAI-ARIA Dialog focus trap & autofocus
  useEffect(() => {
    if (!isOpen) return
    triggerRef.current = document.activeElement as HTMLElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length > 0) {
          focusable[0].focus()
        }
      }
    }, 50)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      triggerRef.current?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const selectedTemplate =
    storeConfig.templates.find((t) => t.id === formData.templateId) || storeConfig.templates[0]
  const isNonWedding = Boolean(selectedTemplate.eventType && selectedTemplate.eventType !== 'wedding')
  const availablePackages = isNonWedding ? storeConfig.eventPricingTiers : storeConfig.pricingTiers
  const selectedPackage =
    availablePackages.find((p) => p.id === formData.packageId) ||
    storeConfig.pricingTiers.find((p) => p.id === formData.packageId) ||
    availablePackages[0]
  const selectedPayment =
    storeConfig.paymentMethods.find((m) => m.id === formData.paymentMethodId) || storeConfig.paymentMethods[0]

  const finalPrice = selectedPackage.price + uniqueCode

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSelectTemplate = (tplId: string) => {
    const tpl = storeConfig.templates.find((t) => t.id === tplId) || storeConfig.templates[0]
    const isNowNonWedding = Boolean(tpl.eventType && tpl.eventType !== 'wedding')
    const targetPackages = isNowNonWedding ? storeConfig.eventPricingTiers : storeConfig.pricingTiers
    const defaultPackageId = isNowNonWedding
      ? 'paket-syukuran-exclusive'
      : tpl.slug === 'royal-midnight'
      ? 'paket-vip'
      : 'paket-exclusive'
    const pkgStillValid = targetPackages.some((p) => p.id === formData.packageId)
    setFormData((prev) => ({
      ...prev,
      templateId: tplId,
      packageId: pkgStillValid ? prev.packageId : defaultPackageId
    }))
  }

  const updateField = (field: keyof CustomOrderData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFillSampleData = () => {
    setFormData((prev) => ({
      ...prev,
      buyerName: prev.buyerName || 'Bagas Pratama',
      buyerPhone: prev.buyerPhone || '081234567890',
      groomFullName: 'Bagas Pratama, S.T.',
      groomShortName: 'Bagas',
      groomParents: 'Putra pertama dari Bpk. Bambang & Ibu Sri',
      groomIg: '@bagaspratama',
      brideFullName: 'Anindita Kirana, S.Ked.',
      brideShortName: 'Anin',
      brideParents: 'Putri kedua dari Bpk. H. Sukarno & Ibu Hj. Ratna',
      brideIg: '@aninditakirana',
      akadDate: 'Sabtu, 28 November 2026',
      akadTime: '08:00 - 10:00 WIB',
      akadVenue: 'Masjid Agung Jawa Tengah, Semarang',
      resepsiDate: 'Sabtu, 28 November 2026',
      resepsiTime: '11:00 - 14:00 WIB',
      resepsiVenue: 'Grand Ball Room Hotel Tentrem Semarang',
      mapsAddress: 'Jl. Gajah Raya, Sambirejo, Kec. Gayamsari, Kota Semarang',
      mapsLink: 'https://maps.google.com',
      musicChoice: 'Nadhif Basalamah - Penjaga Hati',
      giftBankInfo: 'BCA 1234567890 a.n Bagas Pratama | Mandiri 9876543210 a.n Anindita Kirana',
      photoDriveLink: 'https://drive.google.com/sample-prewedding-photos'
    }))
    showToast('Data contoh pernikahan berhasil diisikan!', 'success')
  }

  const handleCopyPaymentNumber = () => {
    navigator.clipboard.writeText(selectedPayment.number)
    setCopiedPayment(true)
    showToast(`Nomor ${selectedPayment.name} (${selectedPayment.number}) berhasil disalin!`, 'success')
    setTimeout(() => setCopiedPayment(false), 2500)
  }

  const handleCopyFinalPrice = () => {
    navigator.clipboard.writeText(finalPrice.toString())
    setCopiedPrice(true)
    showToast(`Nominal transfer ${formatRupiah(finalPrice)} berhasil disalin!`, 'success')
    setTimeout(() => setCopiedPrice(false), 2500)
  }

  const qrisCaptureRef = useRef<HTMLDivElement>(null)
  const [isDownloadingQris, setIsDownloadingQris] = useState(false)

  const handleDownloadOrderQris = async () => {
    if (!qrisCaptureRef.current) return
    setIsDownloadingQris(true)
    try {
      const dataUrl = await toPng(qrisCaptureRef.current, {
        quality: 0.98,
        pixelRatio: 2.5,
        backgroundColor: '#ffffff'
      })
      const link = document.createElement('a')
      link.download = `QRIS-JanjiSuci-${invoiceCode}.png`
      link.href = dataUrl
      link.click()
      showToast('QRIS pembayaran berhasil diunduh ke galeri!', 'success')
    } catch (err) {
      console.error('Failed to download QRIS:', err)
      showToast('Gagal mengunduh QRIS, silakan screenshot layar', 'error')
    } finally {
      setIsDownloadingQris(false)
    }
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
      setBuyerNameError(true)
      return
    }

    const eventType = selectedTemplate.eventType || 'wedding'
    let eventTitle = 'Undangan Pernikahan Digital! 💍'
    if (eventType === 'khitan') eventTitle = 'Undangan Digital Tasyakuran Khitan! ✂️'
    else if (eventType === 'birthday') eventTitle = 'Undangan Digital Ulang Tahun! 🎂'
    else if (eventType === 'aqiqah') eventTitle = 'Undangan Digital Tasyakuran Aqiqah! 👶'
    else if (eventType === 'graduation') eventTitle = 'Undangan Digital Wisuda! 🎓'

    const lines = [
      `Halo Admin *${storeConfig.brand.name}*, saya ingin konfirmasi pemesanan ${eventTitle}`,
      ``,
      `🧾 *FAKTUR RESMI PEMESANAN*`,
      `• No. Invoice: *#${invoiceCode}*`,
      `• Desain Template: *${selectedTemplate.name}*`,
      `• Paket Layanan: *${selectedPackage.name}*`,
      `• Total Transfer: *${formatRupiah(finalPrice)}* (Termasuk Kode Unik)`,
      `• Metode Pembayaran: *${selectedPayment.name} (${selectedPayment.number})*`,
      `• Nama Pemesan: *${formData.buyerName}*`,
      `• No. WA Pemesan: ${formData.buyerPhone || '-'}`,
      `• Mode Pengisian: *${dataMode === 'later' ? '⚡ Booking Kilat Promo (Data Acara Menyusul)' : '📝 Data Acara Terlampir Lengkap'}*`,
      ``
    ]

    if (dataMode === 'later') {
      lines.push(
        `📌 *STATUS DATA ACARA:*`,
        `Saya memilih *Booking Slot Promo Kilat Terlebih Dahulu*. Data lengkap mempelai, waktu, tempat, dan foto akan saya lengkapi menyusul via chat ini atau Portal Pelanggan.`,
        ``
      )
    } else {
      lines.push(
        `🤵👰 *DATA MEMPELAI:*`,
        `• Pria: ${formData.groomFullName || formData.groomShortName || '(Menyusul)'} (${formData.groomShortName || '-'})`,
        `  Orang Tua: ${formData.groomParents || '-'} | IG: ${formData.groomIg || '-'}`,
        `• Wanita: ${formData.brideFullName || formData.brideShortName || '(Menyusul)'} (${formData.brideShortName || '-'})`,
        `  Orang Tua: ${formData.brideParents || '-'} | IG: ${formData.brideIg || '-'}`,
        ``,
        `📅 *JADWAL & LOKASI ACARA:*`,
        `• Akad: ${formData.akadDate || '-'} (${formData.akadTime || '-'}) @ ${formData.akadVenue || '-'}`,
        `• Resepsi: ${formData.resepsiDate || formData.akadDate || '-'} (${formData.resepsiTime || '-'}) @ ${formData.resepsiVenue || '-'}`,
        `• Alamat: ${formData.mapsAddress || '-'}`,
        `• Link Maps: ${formData.mapsLink || '-'}`,
        ``,
        `🎁 *AMPLOP, LAGU & FOTO:*`,
        `• Lagu: ${formData.musicChoice || 'Payung Teduh - Akad'}`,
        `• Rekening Kado: ${formData.giftBankInfo || '-'}`,
        `• Link Foto Prewedding: ${formData.photoDriveLink || 'Kirim menyusul di WA'}`,
        `• Catatan Khusus: ${formData.buyerNotes || '-'}`,
        ``
      )
    }

    const attribution = getAttribution()
    if (attribution.ref || attribution.source) {
      lines.push(
        `🔗 *Info Rujukan:* ${[
          attribution.ref ? `Kode ${attribution.ref}` : '',
          attribution.source ? `Sumber ${attribution.source}` : '',
          attribution.campaign ? `Tema ${attribution.campaign}` : ''
        ]
          .filter(Boolean)
          .join(' • ')}`
      )
    }

    lines.push(
      `Saya lampirkan bukti transfer pembayarannya. Mohon segera diproses ya Admin. Terima kasih banyak! 🙏`
    )

    track('submit_order_wa', {
      template: selectedTemplate.slug,
      package: selectedPackage.id,
      value: finalPrice,
      payment_method: selectedPayment.id,
      data_mode: dataMode,
      ref: attribution.ref,
      source: attribution.source
    })

    const waUrl = `https://wa.me/${storeConfig.brand.whatsappNumber}?text=${encodeURIComponent(
      lines.join('\n')
    )}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')
    setStep(4)
  }

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fade-in"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl bg-stone-900 text-stone-100 shadow-[0_25px_80px_rgba(0,0,0,0.9)] border border-amber-500/30 overflow-hidden my-auto max-h-[94dvh] flex flex-col"
      >
        {/* Header */}
        <div className="px-5 sm:px-8 py-4 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pendaftaran &amp; Pemesanan Cepat</span>
            </div>
            <h2 id="order-modal-title" className="font-serif text-lg sm:text-2xl font-bold text-white mt-0.5 flex items-center gap-2">
              <span>{selectedTemplate.name}</span>
              <span className="text-amber-400 font-mono text-base sm:text-xl font-bold">
                • {formatRupiah(finalPrice)}
              </span>
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Wizard Progress */}
        <div className="bg-stone-950/70 px-4 sm:px-8 py-2.5 border-b border-white/10 shrink-0">
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {[
              { num: 1, label: '1. Paket' },
              { num: 2, label: '2. Data Acara' },
              { num: 3, label: '3. QRIS / Bayar' },
              { num: 4, label: '4. Selesai' }
            ].map((item) => {
              const active = step === item.num
              const completed = step > item.num
              return (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => setStep(item.num as 1 | 2 | 3 | 4)}
                  className={`min-h-[38px] flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                      : completed
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                      : 'bg-stone-900 text-stone-400 border border-white/5'
                  }`}
                >
                  {completed ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                      {item.num}
                    </span>
                  )}
                  <span className="hidden sm:inline truncate">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: PAKET & MODE PEMESANAN */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Mode Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-2">
                  Pilih Cara Pemesanan:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setDataMode('later')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                      dataMode === 'later'
                        ? 'border-amber-400 bg-amber-500/10 shadow-lg'
                        : 'border-white/10 bg-stone-950/50 hover:border-white/20'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-base shrink-0 shadow-md">
                      ⚡
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">Booking Kilat Promo</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-extrabold uppercase">
                          Populer
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        Cukup isi Nama &amp; No. WhatsApp. Amankan slot diskon sekarang, data acara bisa dikirimkan menyusul kapan saja via WA/Portal.
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => setDataMode('full')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                      dataMode === 'full'
                        ? 'border-amber-400 bg-amber-500/10 shadow-lg'
                        : 'border-white/10 bg-stone-950/50 hover:border-white/20'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-stone-800 text-amber-300 flex items-center justify-center font-bold text-base shrink-0 border border-white/10">
                      📝
                    </div>
                    <div>
                      <span className="font-bold text-sm text-white">Kustomisasi Lengkap</span>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        Isi langsung data kedua mempelai, jadwal acara akad &amp; resepsi, dan coba lihat langsung hasilnya di pratinjau live.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Pemesan Ringkas */}
              <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span>Data Kontak Pemesan</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="order-buyer-name" className="text-xs font-semibold text-stone-300 block mb-1">
                      Nama Pemesan / Calon Pengantin <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="order-buyer-name"
                      type="text"
                      autoComplete="name"
                      enterKeyHint="next"
                      aria-invalid={buyerNameError}
                      value={formData.buyerName}
                      onChange={(e) => {
                        updateField('buyerName', e.target.value)
                        setBuyerNameError(false)
                      }}
                      placeholder="Contoh: Bagas Pratama"
                      className={`w-full bg-stone-900 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none transition-all ${
                        buyerNameError ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-white/15 focus:border-amber-400'
                      }`}
                    />
                    {buyerNameError && (
                      <p className="text-[11px] text-rose-400 mt-1">Nama pemesan wajib diisi.</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="order-buyer-phone" className="text-xs font-semibold text-stone-300 block mb-1">
                      Nomor WhatsApp Aktif <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="order-buyer-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      enterKeyHint="done"
                      value={formData.buyerPhone}
                      onChange={(e) => updateField('buyerPhone', e.target.value)}
                      placeholder="Contoh: 0812-3456-7890"
                      className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Pilihan Paket Harga */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-2">
                  Pilih Paket Layanan:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {availablePackages.map((pkg) => {
                    const isSelected = formData.packageId === pkg.id
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => updateField('packageId', pkg.id)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-400 bg-amber-500/10 shadow-lg'
                            : 'border-white/10 bg-stone-950/50 hover:border-white/20'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-white">{pkg.name}</span>
                            {pkg.badge && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[9px] font-extrabold uppercase">
                                {pkg.badge}
                              </span>
                            )}
                          </div>
                          <div className="mt-2">
                            <span className="text-[10px] text-stone-400 line-through block">
                              {formatRupiah(pkg.originalPrice)}
                            </span>
                            <span className="font-serif text-xl font-bold text-amber-300">
                              {formatRupiah(pkg.price)}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-300 mt-1">{pkg.description}</p>
                        </div>
                        <ul className="mt-3 space-y-1 border-t border-white/10 pt-2 text-[10px] text-stone-300">
                          {pkg.features.slice(0, 3).map((f, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <Check className="w-3 h-3 text-amber-400 shrink-0" />
                              <span className="truncate">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Next Step Action */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  Kembali ke Katalog
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!formData.buyerName.trim()) {
                      setBuyerNameError(true)
                      showToast('Mohon isi Nama Pemesan terlebih dahulu', 'info')
                      return
                    }
                    if (dataMode === 'later') {
                      setStep(3) // Langsung lompat ke Pembayaran & QRIS
                    } else {
                      setStep(2) // Masuk ke Pengisian Data Lengkap
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Lanjut ke {dataMode === 'later' ? 'Pembayaran & QRIS' : 'Data Acara'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DATA ACARA & PRATINJAU LANGSUNG */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Quick Helper Bar */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-xs text-amber-200">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Ingin coba pratinjau kilat tanpa ketik satu per satu?</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillSampleData}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs hover:bg-amber-300 transition-colors cursor-pointer shadow-sm"
                >
                  ✨ Isi Data Contoh
                </button>
              </div>

              {/* Sub-tabs for Data Entry */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <button
                  type="button"
                  onClick={() => setDataSubTab('couple')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    dataSubTab === 'couple' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Data Mempelai</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDataSubTab('event')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    dataSubTab === 'event' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Jadwal &amp; Lokasi</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDataSubTab('gift')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    dataSubTab === 'gift' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Amplop &amp; Musik</span>
                </button>
              </div>

              {/* Sub-tab 1: Couple Data */}
              {dataSubTab === 'couple' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-3">
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">Mempelai Pria</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-stone-300 block mb-1">Nama Lengkap &amp; Gelar</label>
                        <input
                          type="text"
                          value={formData.groomFullName}
                          onChange={(e) => updateField('groomFullName', e.target.value)}
                          placeholder="Bagas Pratama, S.T."
                          className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-stone-300 block mb-1">Nama Panggilan</label>
                        <input
                          type="text"
                          value={formData.groomShortName}
                          onChange={(e) => updateField('groomShortName', e.target.value)}
                          placeholder="Bagas"
                          className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-300 block mb-1">Nama Orang Tua Mempelai Pria</label>
                      <input
                        type="text"
                        value={formData.groomParents}
                        onChange={(e) => updateField('groomParents', e.target.value)}
                        placeholder="Putra pertama dari Bpk. Bambang & Ibu Sri"
                        className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-3">
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">Mempelai Wanita</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-stone-300 block mb-1">Nama Lengkap &amp; Gelar</label>
                        <input
                          type="text"
                          value={formData.brideFullName}
                          onChange={(e) => updateField('brideFullName', e.target.value)}
                          placeholder="Anindita Kirana, S.Ked."
                          className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-stone-300 block mb-1">Nama Panggilan</label>
                        <input
                          type="text"
                          value={formData.brideShortName}
                          onChange={(e) => updateField('brideShortName', e.target.value)}
                          placeholder="Anin"
                          className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-300 block mb-1">Nama Orang Tua Mempelai Wanita</label>
                      <input
                        type="text"
                        value={formData.brideParents}
                        onChange={(e) => updateField('brideParents', e.target.value)}
                        placeholder="Putri kedua dari Bpk. H. Sukarno & Ibu Hj. Ratna"
                        className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-tab 2: Event Schedule */}
              {dataSubTab === 'event' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-3">
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">Akad Nikah / Pemberkatan</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-stone-300 block mb-1">Hari &amp; Tanggal</label>
                        <input
                          type="text"
                          value={formData.akadDate}
                          onChange={(e) => updateField('akadDate', e.target.value)}
                          placeholder="Sabtu, 28 November 2026"
                          className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-stone-300 block mb-1">Waktu</label>
                        <input
                          type="text"
                          value={formData.akadTime}
                          onChange={(e) => updateField('akadTime', e.target.value)}
                          placeholder="08:00 - 10:00 WIB"
                          className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-300 block mb-1">Nama Tempat / Gedung</label>
                      <input
                        type="text"
                        value={formData.akadVenue}
                        onChange={(e) => updateField('akadVenue', e.target.value)}
                        placeholder="Masjid Agung Jawa Tengah"
                        className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-3">
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">Resepsi Pernikahan</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-stone-300 block mb-1">Hari &amp; Tanggal</label>
                        <input
                          type="text"
                          value={formData.resepsiDate}
                          onChange={(e) => updateField('resepsiDate', e.target.value)}
                          placeholder="Sabtu, 28 November 2026"
                          className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-stone-300 block mb-1">Waktu</label>
                        <input
                          type="text"
                          value={formData.resepsiTime}
                          onChange={(e) => updateField('resepsiTime', e.target.value)}
                          placeholder="11:00 - 14:00 WIB"
                          className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-300 block mb-1">Alamat Lengkap &amp; Link Google Maps</label>
                      <input
                        type="text"
                        value={formData.mapsAddress}
                        onChange={(e) => updateField('mapsAddress', e.target.value)}
                        placeholder="Jl. Gajah Raya, Sambirejo, Gayamsari, Semarang"
                        className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-tab 3: Gift & Media */}
              {dataSubTab === 'gift' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-3">
                    <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                      Rekening Amplop Digital &amp; Kado
                    </label>
                    <textarea
                      rows={2}
                      value={formData.giftBankInfo}
                      onChange={(e) => updateField('giftBankInfo', e.target.value)}
                      placeholder="BCA: 1234567890 a.n Bagas Pratama&#10;DANA: 081234567890 a.n Anindita Kirana"
                      className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-3">
                    <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                      Pilihan Lagu Backsound
                    </label>
                    <select
                      value={formData.musicChoice}
                      onChange={(e) => updateField('musicChoice', e.target.value)}
                      className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Payung Teduh - Akad">Payung Teduh - Akad</option>
                      <option value="Payung Teduh - Berdua Saja">Payung Teduh - Berdua Saja</option>
                      <option value="Nadhif Basalamah - Penjaga Hati">Nadhif Basalamah - Penjaga Hati</option>
                      <option value="Maher Zain - For The Rest of My Life">Maher Zain - For The Rest of My Life (Religi)</option>
                    </select>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-3">
                    <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                      Link Google Drive Foto Prewedding
                    </label>
                    <input
                      type="url"
                      value={formData.photoDriveLink}
                      onChange={(e) => updateField('photoDriveLink', e.target.value)}
                      placeholder="https://drive.google.com/... (atau kirimkan via WhatsApp)"
                      className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  ← Kembali ke Paket
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePreviewWithMyData}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-400/30 text-amber-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Coba di Pratinjau</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Lanjut ke Pembayaran</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DYNAMIC QRIS & PEMBAYARAN */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Dynamic QRIS Card Showcase */}
              <div className="p-5 rounded-3xl bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border border-amber-500/40 shadow-2xl relative overflow-hidden text-center">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 animate-spin" />
                    <span>Batas Pembayaran: {formatTimer(qrisTimer)}</span>
                  </span>
                  <span className="font-mono text-xs text-amber-300 font-bold">
                    Invoice: #{invoiceCode}
                  </span>
                </div>

                {/* QRIS Code Box */}
                <div
                  ref={qrisCaptureRef}
                  className="w-52 sm:w-60 mx-auto bg-white p-3.5 rounded-2xl shadow-xl flex flex-col items-center justify-between border-4 border-amber-400/50"
                >
                  <div className="flex items-center justify-between w-full px-1 mb-2">
                    <span className="text-[11px] font-black text-rose-600 tracking-tighter">QRIS</span>
                    <span className="text-[8px] font-bold text-stone-500 uppercase tracking-widest">NSP INDONESIA</span>
                  </div>

                  {/* Real Sharp QR Code */}
                  <div className="p-2 rounded-xl bg-white border border-stone-200 shadow-inner flex items-center justify-center">
                    <QRCodeSVG
                      value={`https://janjisuci.web.id/pay?invoice=${invoiceCode}&amount=${finalPrice}&method=${selectedPayment.id}`}
                      size={148}
                      level="H"
                      fgColor="#0c0a09"
                      bgColor="#ffffff"
                    />
                  </div>

                  <div className="mt-2 text-center">
                    <p className="text-[10px] font-bold text-stone-800 font-mono">
                      JANJISUCI DIGITAL STUDIO
                    </p>
                    <p className="text-[8px] text-stone-500 font-bold">
                      Scan via BCA, Mandiri, GoPay, OVO, ShopeePay &amp; DANA
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex justify-center">
                  <button
                    type="button"
                    onClick={handleDownloadOrderQris}
                    disabled={isDownloadingQris}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-amber-400/30 text-amber-300 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>📥 Unduh Kode QRIS (PNG)</span>
                  </button>
                </div>

                {/* Total Payment Details */}
                <div className="mt-5 p-4 rounded-2xl bg-stone-950/80 border border-white/10 max-w-md mx-auto">
                  <p className="text-xs text-stone-400">Total Tagihan (Termasuk Kode Unik Verifikasi):</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="font-serif text-3xl font-bold text-amber-300 tracking-tight">
                      {formatRupiah(finalPrice)}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyFinalPrice}
                      aria-label="Salin total tagihan"
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 transition-colors cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-amber-300/80 mt-1">
                    3 digit terakhir ({uniqueCode}) adalah kode unik agar pembayaran terverifikasi otomatis.
                  </p>
                </div>
              </div>

              {/* Alternative E-Wallets & Bank Accounts */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300 block mb-2">
                  Atau Transfer Manual Melalui E-Wallet / Bank:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {storeConfig.paymentMethods.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => updateField('paymentMethodId', m.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        formData.paymentMethodId === m.id
                          ? 'border-amber-400 bg-amber-500/10'
                          : 'border-white/10 bg-stone-950/50 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-white block">{m.name}</span>
                        <span className="text-xs text-amber-300 font-mono">{m.number}</span>
                        <span className="text-[10px] text-stone-400 block -mt-0.5">a.n {m.holder}</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigator.clipboard.writeText(m.number)
                          showToast(`Nomor ${m.name} berhasil disalin!`, 'success')
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-stone-200 transition-colors"
                      >
                        Salin
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setStep(dataMode === 'later' ? 1 : 2)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  ← Kembali
                </button>

                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Konfirmasi Pesanan ke WhatsApp</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: INVOICE SUKSES & PORTAL AKSES */}
          {step === 4 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-white">Pesanan Berhasil Dikirimkan!</h3>
                <p className="text-xs text-stone-300 max-w-md mx-auto mt-1 leading-relaxed">
                  Terima kasih, <strong>{formData.buyerName}</strong>! Pesanan Anda telah tercatat dengan nomor invoice{' '}
                  <strong className="text-amber-300 font-mono">#{invoiceCode}</strong>. Tim JanjiSuci akan segera menyiapkan undangan Anda.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950/80 border border-white/10 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">Desain Template:</span>
                  <span className="font-bold text-white">{selectedTemplate.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Paket:</span>
                  <span className="font-bold text-white">{selectedPackage.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Total Tagihan:</span>
                  <span className="font-bold text-amber-300">{formatRupiah(finalPrice)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                {onOpenPortal && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      onOpenPortal()
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Buka Portal Pelanggan Saya</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
