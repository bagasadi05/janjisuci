import React, { useState } from 'react'
import { Copy, Check, CreditCard, QrCode, Package, Wifi } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { FloralDivider, BotanicalCorner } from './Ornament'
import { useToast } from './Toast'
import { Reveal3D } from './common/Reveal3D'

export const GiftSection: React.FC = () => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [showQris, setShowQris] = useState(false)
  const { showToast } = useToast()

  const handleCopy = (text: string, identifier: string, label: string) => {
    navigator.clipboard.writeText(text)
    if (identifier === 'address') {
      setCopiedAddress(true)
      showToast('Alamat lengkap berhasil disalin!', 'success')
      setTimeout(() => setCopiedAddress(false), 2500)
    } else {
      setCopiedBank(identifier)
      showToast(`Nomor rekening ${label} berhasil disalin!`, 'success')
      setTimeout(() => setCopiedBank(null), 2500)
    }
  }

  const { gift } = weddingData

  return (
    <section id="gift" className="relative py-12 px-4 scroll-mt-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
          {gift.title}
        </h2>
        <FloralDivider className="my-3" />
        <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed px-4 max-w-xl mx-auto mb-10">
          {gift.description}
        </p>

        {/* Bank Cards Grid: 1 col on mobile, 2 cols on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {gift.accounts.map((acc, idx) => {
            const isCopied = copiedBank === acc.bank
            const isBca = acc.logoText.toLowerCase().includes('bca')
            return (
              <Reveal3D
                key={idx}
                delay={idx === 0 ? 100 : 200}
                interactive
                className={`relative p-6 sm:p-7 rounded-3xl text-white shadow-2xl overflow-hidden border border-white/15 text-left transition-all ${
                  isBca ? 'bg-card-bca' : 'bg-card-mandiri'
                }`}
              >
                {/* Background Card Waves / Texture */}
                <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
                  <CreditCard className="w-24 h-24" />
                </div>

                {/* Top Row: Bank Name & Contactless Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif font-bold text-lg sm:text-xl text-amber-200 tracking-wider">
                    {acc.logoText}
                  </span>
                  <Wifi className="w-5 h-5 text-amber-300/80 rotate-90" />
                </div>

                {/* Golden Microchip Graphic */}
                <div className="w-11 h-8 rounded-lg bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-md mb-5 border border-amber-600/40 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-amber-800/40" />
                  <div className="absolute inset-y-0 left-1/3 w-px bg-amber-800/40" />
                  <div className="absolute inset-y-0 right-1/3 w-px bg-amber-800/40" />
                </div>

                {/* Account Number */}
                <div className="my-2">
                  <p className="text-[10px] text-stone-300 uppercase tracking-widest font-sans mb-1">
                    Nomor Rekening
                  </p>
                  <p className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-amber-100 drop-shadow-sm">
                    {acc.accountNumber}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-200 font-serif mt-1 font-semibold uppercase tracking-wide">
                    a.n. {acc.accountHolder}
                  </p>
                </div>

                {/* Copy Button */}
                <div className="pt-4 mt-4 border-t border-white/10 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleCopy(acc.accountNumber, acc.bank, acc.logoText)}
                    aria-label={`Salin nomor rekening ${acc.logoText} (${acc.accountNumber})`}
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 text-xs font-sans font-medium transition-all cursor-pointer border border-amber-400/30 active:scale-95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span className="text-emerald-400 font-bold">Nomor Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Salin No. Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              </Reveal3D>
            )
          })}
        </div>

        {/* QRIS Section (Toggleable) */}
        {gift.qrisUrl && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-amber-800/15 shadow-xl mb-10 max-w-xl mx-auto">
            <button
              type="button"
              onClick={() => setShowQris(!showQris)}
              aria-expanded={showQris}
              aria-controls="qris-content-panel"
              className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-sans font-semibold transition-colors cursor-pointer shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
            >
              <QrCode className="w-4 h-4 text-amber-700" aria-hidden="true" />
              <span>{showQris ? 'Sembunyikan QRIS' : 'Buka QRIS Pembayaran'}</span>
            </button>

            {showQris && (
              <div id="qris-content-panel" className="mt-6 pt-6 border-t border-stone-200 flex flex-col items-center animate-in fade-in">
                <p className="text-xs sm:text-sm font-serif font-bold text-stone-800 mb-3">
                  Scan QRIS (M-Banking & E-Wallet)
                </p>
                <div className="p-4 bg-white rounded-2xl shadow-lg border border-stone-200">
                  <img
                    src={gift.qrisUrl}
                    alt="Kode QRIS Donasi Hadiah Pernikahan"
                    className="w-52 h-52 object-contain"
                  />
                </div>
                <p className="text-[11px] text-stone-600 mt-3 font-sans max-w-xs text-center">
                  Mendukung BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA, ShopeePay & LinkAja.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Physical Gift Section */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-amber-800/15 shadow-xl text-left overflow-hidden max-w-2xl mx-auto">
          <BotanicalCorner position="top-right" />
          <div className="flex items-center gap-2.5 mb-3 text-stone-800">
            <Package className="w-5 h-5 text-amber-800" aria-hidden="true" />
            <h3 className="font-serif text-lg sm:text-xl font-bold">
              Kirim Kado Fisik
            </h3>
          </div>

          <p className="font-sans text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
            Bagi keluarga dan sahabat yang ingin mengirimkan bingkisan tanda kasih, dapat dialamatkan ke lokasi berikut:
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-sans space-y-1.5 mb-5">
            <p className="font-bold text-stone-800">
              Penerima: {gift.giftAddress.recipient}
            </p>
            <p className="text-stone-700">
              No. HP: {gift.giftAddress.phone}
            </p>
            <p className="text-stone-700 leading-relaxed pt-1">
              Alamat: {gift.giftAddress.address}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() =>
                handleCopy(
                  `${gift.giftAddress.recipient} (${gift.giftAddress.phone}) - ${gift.giftAddress.address}`,
                  'address',
                  'Alamat'
                )
              }
              aria-label="Salin alamat lengkap penerima kado fisik"
              className="min-h-[44px] inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 text-xs font-sans font-medium transition-colors cursor-pointer active:scale-95 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  <span className="text-emerald-400 font-bold">Alamat Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Salin Alamat Lengkap</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
