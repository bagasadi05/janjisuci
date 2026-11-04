import React, { useState } from 'react'
import { Copy, Check, CreditCard, QrCode, Package, Wifi } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { useInvitationData } from '../context/InvitationContext'
import { FloralDivider, BotanicalCorner } from './Ornament'
import { useToast } from './Toast'
import { QrisModal } from './common/QrisModal'
import { StaggerContainer, MotionItem, ScrollReveal } from './common/MotionReveal'

export const GiftSection: React.FC = () => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const [copiedBank, setCopiedBank] = useState<string | null>(null)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [activeQrisAccount, setActiveQrisAccount] = useState<{
    bank: string
    accountNumber: string
    accountHolder: string
  } | null>(null)
  const { showToast } = useToast()

  const isDark =
    activeTemplate.category === 'dark' ||
    activeTemplate.themeColors.textDark === '#FFFFFF' ||
    activeTemplate.slug === 'exclusive-navy' ||
    activeTemplate.slug === 'royal-midnight' ||
    activeTemplate.slug === 'celestial-night'

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
    <section id="gift" className="relative py-12 px-4 scroll-mt-6 defer-render">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header Staggered Sequence */}
        <StaggerContainer stagger={0.12} delayChildren={0.05} className="mb-10">
          <MotionItem variant="fadeUp">
            <h2 className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-stone-800'}`}>
              {gift.title}
            </h2>
          </MotionItem>
          <MotionItem variant="expand">
            <FloralDivider className="my-3" />
          </MotionItem>
          <MotionItem variant="fadeUp">
            <p className={`font-sans text-xs sm:text-sm leading-relaxed px-4 max-w-xl mx-auto ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              {gift.description}
            </p>
          </MotionItem>
        </StaggerContainer>

        {/* Bank Cards Grid with Alternating Motion Slide In */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {gift.accounts.map((acc, idx) => {
            const isCopied = copiedBank === acc.bank
            const isBca = acc.logoText.toLowerCase().includes('bca')
            const isEven = idx % 2 === 0
            return (
              <ScrollReveal
                key={idx}
                variant={isEven ? 'slideLeft' : 'slideRight'}
                delay={idx * 0.12}
                interactive
                className={`relative p-6 sm:p-7 rounded-3xl text-white shadow-2xl overflow-hidden border border-white/15 text-left transition-all ${
                  isBca ? 'bg-card-bca' : 'bg-card-mandiri'
                }`}
              >
                {/* Background Waves */}
                <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
                  <CreditCard className="w-24 h-24" />
                </div>

                <StaggerContainer stagger={0.08} delayChildren={0.15}>
                  {/* Top Row */}
                  <MotionItem variant="fadeDown" className="flex items-center justify-between mb-6">
                    <span className="font-serif font-bold text-lg sm:text-xl text-amber-200 tracking-wider">
                      {acc.logoText}
                    </span>
                    <Wifi className="w-5 h-5 text-amber-300/80 rotate-90" />
                  </MotionItem>

                  {/* Golden Microchip Graphic */}
                  <MotionItem variant="pop">
                    <div className="w-11 h-8 rounded-lg bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-md mb-5 border border-amber-600/40 relative overflow-hidden">
                      <div className="absolute inset-x-0 top-1/2 h-px bg-amber-800/40" />
                      <div className="absolute inset-y-0 left-1/3 w-px bg-amber-800/40" />
                      <div className="absolute inset-y-0 right-1/3 w-px bg-amber-800/40" />
                    </div>
                  </MotionItem>

                  {/* Account Number */}
                  <MotionItem variant="fadeUp" className="my-2">
                    <p className="text-[10px] text-stone-300 uppercase tracking-widest font-sans mb-1">
                      Nomor Rekening
                    </p>
                    <p className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-amber-100 drop-shadow-sm">
                      {acc.accountNumber}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-200 font-serif mt-1 font-semibold uppercase tracking-wide">
                      a.n. {acc.accountHolder}
                    </p>
                  </MotionItem>

                  {/* Action Buttons: Copy & QRIS */}
                  <MotionItem variant="pop">
                    <div className="pt-4 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveQrisAccount({
                            bank: acc.logoText,
                            accountNumber: acc.accountNumber,
                            accountHolder: acc.accountHolder
                          })
                        }
                        className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 text-xs font-sans font-medium transition-all cursor-pointer border border-white/20 active:scale-95 shadow-sm"
                      >
                        <QrCode className="w-3.5 h-3.5 text-amber-300" />
                        <span>Scan QRIS</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopy(acc.accountNumber, acc.bank, acc.logoText)}
                        aria-label={`Salin nomor rekening ${acc.logoText} (${acc.accountNumber})`}
                        className="min-h-[40px] inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 text-xs font-sans font-medium transition-all cursor-pointer border border-amber-400/30 active:scale-95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                            <span className="text-emerald-400 font-bold">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Salin Rekening</span>
                          </>
                        )}
                      </button>
                    </div>
                  </MotionItem>
                </StaggerContainer>
              </ScrollReveal>
            )
          })}
        </div>

        {/* WhatsApp Envelope Confirmation Banner for Indonesian Etiquette */}
        <ScrollReveal
          variant="fadeUp"
          className={`mb-10 p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left max-w-2xl mx-auto shadow-md ${
            isDark ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-100' : 'bg-emerald-50 border-emerald-600/20 text-emerald-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">💌</span>
            <div>
              <p className="font-serif font-bold text-sm">Sudah Mengirimkan Tanda Kasih?</p>
              <p className={`text-[11px] ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                Konfirmasikan bukti transfer ke mempelai via WhatsApp agar tercatat di buku ucapan keluarga.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/6289619774116?text=${encodeURIComponent(
              `Assalamu'alaikum / Salam hangat ${weddingData.couple.groom.shortName} & ${weddingData.couple.bride.shortName}, alhamdulillah saya sudah mengirimkan tanda kasih / kado pernikahan untuk kalian. Semoga berkah dan acaranya lancar hingga hari H! 💍`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 min-h-[40px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-sans font-bold shadow-md transition-all cursor-pointer active:scale-95"
          >
            <span>💬 Konfirmasi via WA</span>
          </a>
        </ScrollReveal>

        {/* Physical Gift / Mailing Address */}
        {gift.giftAddress && (
          <ScrollReveal
            variant="flipUp"
            delay={0.1}
            interactive
            className={`relative max-w-xl mx-auto p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-xl text-center border ${
              isDark
                ? 'bg-stone-900/85 border-amber-500/30 text-stone-100 shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
                : 'bg-white/90 border-amber-800/15 text-stone-800'
            }`}
          >
            <BotanicalCorner position="top-right" />
            <StaggerContainer stagger={0.08} delayChildren={0.1}>
              <MotionItem variant="pop" className="flex justify-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 mb-3 border border-amber-500/30">
                  <Package className="w-6 h-6" />
                </div>
              </MotionItem>

              <MotionItem variant="fadeUp">
                <h3 className={`font-serif text-xl sm:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-stone-800'}`}>
                  Kirim Kado Fisik
                </h3>
              </MotionItem>

              <MotionItem variant="fadeUp">
                <p className={`font-sans text-xs sm:text-sm max-w-md mx-auto mb-4 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                  Bagi Bapak/Ibu/Saudara/i yang ingin mengirimkan tanda kasih berupa kado fisik, bingkisan dapat dikirimkan ke alamat:
                </p>
              </MotionItem>

              <MotionItem variant="fadeUp">
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-sans mb-4 text-left leading-relaxed ${
                  isDark ? 'bg-stone-950/70 border-white/10 text-stone-200' : 'bg-amber-50/60 border-amber-600/20 text-stone-700'
                }`}>
                  <p className="font-bold text-amber-400 mb-1">Penerima: {gift.giftAddress.recipient}</p>
                  <p>{gift.giftAddress.address}</p>
                  <p className={`mt-1 font-mono text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Telp: {gift.giftAddress.phone}</p>
                </div>
              </MotionItem>

              <MotionItem variant="pop">
                <button
                  type="button"
                  onClick={() => handleCopy(`${gift.giftAddress?.recipient} - ${gift.giftAddress?.address} (${gift.giftAddress?.phone})`, 'address', 'Alamat Pengiriman')}
                  className={`min-h-[44px] inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-sans font-bold shadow-md transition-all cursor-pointer active:scale-95 ${
                    isDark ? 'bg-amber-500 hover:bg-amber-400 text-stone-950' : 'bg-amber-700 hover:bg-amber-800 text-white'
                  }`}
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Alamat Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Alamat Lengkap</span>
                    </>
                  )}
                </button>
              </MotionItem>
            </StaggerContainer>
          </ScrollReveal>
        )}

        {/* QRIS Transfer Modal */}
        {activeQrisAccount && (
          <QrisModal
            isOpen={Boolean(activeQrisAccount)}
            onClose={() => setActiveQrisAccount(null)}
            bankName={activeQrisAccount.bank}
            accountNumber={activeQrisAccount.accountNumber}
            accountHolder={activeQrisAccount.accountHolder}
            coupleName={`${weddingData.couple.groom.shortName} & ${weddingData.couple.bride.shortName}`}
          />
        )}
      </div>
    </section>
  )
}
