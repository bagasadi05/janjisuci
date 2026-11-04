import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { QRCodeSVG } from 'qrcode.react'
import { toPng } from 'html-to-image'
import { X, Download, Check, Sparkles, ShieldCheck, Ticket } from 'lucide-react'
import { useToast } from '../Toast'

interface VipGuestTicketModalProps {
  isOpen: boolean
  onClose: () => void
  guestName: string
  coupleName: string
  eventDate: string
  venue: string
  templateName: string
  checkinCode?: string
}

export const VipGuestTicketModal: React.FC<VipGuestTicketModalProps> = ({
  isOpen,
  onClose,
  guestName,
  coupleName,
  eventDate,
  venue,
  templateName,
  checkinCode
}) => {
  const { showToast } = useToast()
  const ticketRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)

  const ticketCode =
    checkinCode ||
    `VIP-${Math.abs(
      guestName.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0) % 90000 + 10000
    )}`

  const qrPayload = JSON.stringify({
    studio: 'JanjiSuci.id',
    type: 'VIP_PASS',
    guest: guestName,
    couple: coupleName,
    date: eventDate,
    code: ticketCode
  })

  const handleDownloadTicketImage = async () => {
    if (!ticketRef.current) return
    setIsDownloading(true)
    try {
      const dataUrl = await toPng(ticketRef.current, {
        quality: 0.98,
        pixelRatio: 2.5,
        backgroundColor: '#0c0a09'
      })
      const link = document.createElement('a')
      link.download = `Tiket-VIP-${guestName.replace(/\s+/g, '-').slice(0, 24)}.png`
      link.href = dataUrl
      link.click()
      setIsDownloaded(true)
      showToast('Tiket VIP berhasil diunduh ke galeri!', 'success')
      setTimeout(() => setIsDownloaded(false), 3000)
    } catch (err) {
      console.error('Failed to generate ticket image:', err)
      showToast('Gagal membuat gambar tiket, silakan coba lagi', 'error')
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
          aria-label="Tiket VIP Undangan Digital"
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
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup tiket"
              className="absolute -top-12 right-0 p-2 text-white hover:text-amber-300 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* CAPTURABLE VIP TICKET CARD */}
            <div
              ref={ticketRef}
              className="w-full rounded-3xl bg-gradient-to-b from-[#1c1815] via-[#141210] to-[#0d0c0b] border-2 border-amber-500/40 p-5 sm:p-6 text-white shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden"
            >
              {/* Gold Lens Sheen */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Perforated Notches on Side Borders */}
              <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-black border border-amber-500/40" />
              <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-black border border-amber-500/40" />

              {/* Ticket Top Header */}
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs border border-amber-400/40">
                    💍
                  </div>
                  <div>
                    <span className="font-serif font-bold text-xs tracking-wider text-amber-200 block">
                      JANJISUCI.ID
                    </span>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-amber-400/80 block">
                      OFFICIAL VIP PASS
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-[10px] font-mono text-amber-300">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>VERIFIED</span>
                </div>
              </div>

              {/* Event Title & Couple */}
              <div className="text-center my-3">
                <p className="text-[10px] text-amber-300 uppercase tracking-widest font-mono">
                  The Wedding Celebration
                </p>
                <h3 className="font-script text-3xl sm:text-4xl text-amber-100 my-1 drop-shadow">
                  {coupleName}
                </h3>
                <p className="text-[11px] text-stone-300 font-serif">
                  {eventDate}
                </p>
              </div>

              {/* Guest Identity Box */}
              <div className="my-4 p-3.5 rounded-2xl bg-black/60 border border-amber-500/30 text-center shadow-inner">
                <p className="text-[9px] text-amber-300/80 uppercase tracking-widest font-mono mb-0.5">
                  Kepada Yth. Tamu Undangan
                </p>
                <h4 className="font-serif font-bold text-lg sm:text-xl text-white capitalize drop-shadow">
                  {guestName}
                </h4>
                <p className="text-[10px] text-stone-400 font-sans mt-0.5 truncate max-w-full">
                  {venue}
                </p>
              </div>

              {/* QR Code Check-in Section */}
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-dashed border-amber-500/30">
                <div className="text-left">
                  <p className="text-[9px] text-stone-400 uppercase tracking-widest font-mono">
                    KODE VERIFIKASI
                  </p>
                  <p className="font-mono text-sm sm:text-base font-bold text-amber-300 tracking-wider">
                    {ticketCode}
                  </p>
                  <p className="text-[9px] text-stone-400 font-sans mt-0.5 leading-tight">
                    Tunjukkan QR code ini ke petugas penerima tamu resepsi
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-white shadow-md shrink-0">
                  <QRCodeSVG
                    value={qrPayload}
                    size={76}
                    level="M"
                    fgColor="#000000"
                    bgColor="#FFFFFF"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons under ticket */}
            <div className="w-full mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleDownloadTicketImage}
                disabled={isDownloading}
                className="w-full min-h-[48px] py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-xs sm:text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isDownloaded ? (
                  <>
                    <Check className="w-4 h-4 text-stone-950" />
                    <span>Gambar Berhasil Disimpan!</span>
                  </>
                ) : isDownloading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                    <span>Memproses Gambar HD...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-stone-950" />
                    <span>📥 Simpan Kartu VIP ke Galeri HP (PNG)</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

