import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { QRCodeSVG } from 'qrcode.react'
import { toPng } from 'html-to-image'
import { X, Download, Check, QrCode, ShieldCheck } from 'lucide-react'
import { useToast } from '../Toast'

interface QrisModalProps {
  isOpen: boolean
  onClose: () => void
  bankName: string
  accountNumber: string
  accountHolder: string
  coupleName: string
}

export const QrisModal: React.FC<QrisModalProps> = ({
  isOpen,
  onClose,
  bankName,
  accountNumber,
  accountHolder,
  coupleName
}) => {
  const { showToast } = useToast()
  const qrisCardRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)

  // Standard payload for Indonesia QR transfer / digital envelope identification
  const qrisPayload = `https://janjisuci.web.id/pay?to=${encodeURIComponent(accountHolder)}&acc=${encodeURIComponent(accountNumber)}&bank=${encodeURIComponent(bankName)}`

  const handleDownloadQris = async () => {
    if (!qrisCardRef.current) return
    setIsDownloading(true)
    try {
      const dataUrl = await toPng(qrisCardRef.current, {
        quality: 0.98,
        pixelRatio: 2.5,
        backgroundColor: '#0c0a09'
      })
      const link = document.createElement('a')
      link.download = `QRIS-${bankName.replace(/\s+/g, '-')}-${accountHolder.replace(/\s+/g, '-').slice(0, 16)}.png`
      link.href = dataUrl
      link.click()
      setIsDownloaded(true)
      showToast('Gambar QRIS berhasil diunduh ke galeri!', 'success')
      setTimeout(() => setIsDownloaded(false), 3000)
    } catch (err) {
      console.error('Failed to download QRIS image:', err)
      showToast('Gagal mengunduh gambar QRIS, silakan coba lagi', 'error')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="QRIS Amplop Digital"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            className="relative w-full max-w-sm flex flex-col items-center"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup QRIS"
              className="absolute -top-12 right-0 p-2 text-white hover:text-amber-300 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Capturable QRIS Card */}
            <div
              ref={qrisCardRef}
              className="w-full rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-amber-500/40 p-6 text-white text-center shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-400/40">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <span className="font-serif font-bold text-sm text-white">
                    QRIS &bull; Amplop Digital
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] border border-amber-400/30">
                  {bankName}
                </span>
              </div>

              <p className="text-[11px] text-stone-300 mb-1">
                Tanda Kasih untuk Pernikahan
              </p>
              <h3 className="font-script text-2xl sm:text-3xl text-amber-200 mb-4 drop-shadow">
                {coupleName}
              </h3>

              {/* White Box for QR Code */}
              <div className="p-4 rounded-2xl bg-white shadow-xl mx-auto inline-block border-2 border-stone-200 mb-4">
                <QRCodeSVG
                  value={qrisPayload}
                  size={180}
                  level="H"
                  fgColor="#0c0a09"
                  bgColor="#ffffff"
                />
              </div>

              <div className="space-y-1">
                <p className="font-mono text-sm sm:text-base font-bold text-amber-300 tracking-wider">
                  {accountNumber}
                </p>
                <p className="text-xs text-stone-300 uppercase font-serif">
                  a.n. {accountHolder}
                </p>
              </div>

              <p className="text-[10px] text-stone-400 mt-4 leading-relaxed font-sans">
                Scan kode QR menggunakan aplikasi BCA Mobile, Livin Mandiri, GoPay, OVO, DANA, atau ShopeePay.
              </p>
            </div>

            {/* Download Button */}
            <button
              type="button"
              onClick={handleDownloadQris}
              disabled={isDownloading}
              className="w-full mt-3 min-h-[46px] py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-xs sm:text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isDownloaded ? (
                <>
                  <Check className="w-4 h-4 text-stone-950" />
                  <span>Gambar QRIS Tersimpan!</span>
                </>
              ) : isDownloading ? (
                <>
                  <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  <span>Memproses QRIS HD...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-stone-950" />
                  <span>📥 Simpan QRIS ke Galeri HP (PNG)</span>
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

