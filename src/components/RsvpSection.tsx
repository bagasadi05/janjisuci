import React, { useState, useEffect } from 'react'
import { Send, CheckCircle2, HelpCircle, XCircle, MessageSquareHeart, Heart, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'
import { weddingData, WishMessage } from '../config/weddingData'
import { useInvitationData } from '../context/InvitationContext'
import { FloralDivider } from './Ornament'
import { useToast } from './Toast'
import { safeDecodeUri } from '../utils/seo'
import { StaggerContainer, MotionItem, ScrollReveal } from './common/MotionReveal'

export const RsvpSection: React.FC = () => {
  const { activeTemplate } = useInvitationData()
  const [wishes, setWishes] = useState<WishMessage[]>([])
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState<'hadir' | 'ragu' | 'berhalangan'>('hadir')
  const [guestCount, setGuestCount] = useState<number>(1)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filter, setFilter] = useState<'semua' | 'hadir' | 'berhalangan'>('semua')
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({})
  const { showToast } = useToast()

  const isDark =
    activeTemplate.category === 'dark' ||
    activeTemplate.themeColors.textDark === '#FFFFFF' ||
    activeTemplate.slug === 'exclusive-navy' ||
    activeTemplate.slug === 'royal-midnight' ||
    activeTemplate.slug === 'celestial-night'

  useEffect(() => {
    // Read query parameter for personalized name
    const urlParams = new URLSearchParams(window.location.search)
    const to = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest')
    if (to) {
      setName(safeDecodeUri(to))
    }

    // Load persisted wishes
    const stored = localStorage.getItem('wedding_wishes_v2')
    if (stored) {
      try {
        setWishes(JSON.parse(stored))
      } catch {
        setWishes(weddingData.initialWishes)
      }
    } else {
      setWishes(weddingData.initialWishes)
    }

    // Load liked map
    const storedLikes = localStorage.getItem('wedding_likes_map')
    if (storedLikes) {
      try {
        setLikedMap(JSON.parse(storedLikes))
      } catch {
        // ignore
      }
    }
  }, [])

  const handleLike = (id: string) => {
    const isCurrentlyLiked = !!likedMap[id]
    const newLikedMap = { ...likedMap, [id]: !isCurrentlyLiked }
    setLikedMap(newLikedMap)
    localStorage.setItem('wedding_likes_map', JSON.stringify(newLikedMap))

    const updatedWishes = wishes.map((w) => {
      if (w.id === id) {
        return {
          ...w,
          likes: isCurrentlyLiked ? Math.max(0, (w.likes || 0) - 1) : (w.likes || 0) + 1,
        }
      }
      return w
    })

    setWishes(updatedWishes)
    localStorage.setItem('wedding_wishes_v2', JSON.stringify(updatedWishes))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setIsSubmitting(true)

    const newWish: WishMessage = {
      id: 'w_' + Date.now(),
      name: name.trim(),
      attendance,
      message: message.trim(),
      createdAt: 'Baru saja',
      likes: 1
    }

    setTimeout(() => {
      const updatedWishes = [newWish, ...wishes]
      setWishes(updatedWishes)
      localStorage.setItem('wedding_wishes_v2', JSON.stringify(updatedWishes))

      setMessage('')
      setIsSubmitting(false)

      // Celebration confetti
      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#D4AF37', '#849688', '#FAF7F2', '#B86B5A']
        })
      } catch {
        // ignore
      }

      showToast("Terima kasih! Ucapan & konfirmasi Anda berhasil dikirim.", "success")
    }, 400)
  }

  const filteredWishes = wishes.filter((w) => {
    if (filter === 'hadir') return w.attendance === 'hadir'
    if (filter === 'berhalangan') return w.attendance === 'berhalangan'
    return true
  })

  return (
    <section id="rsvp" className="relative py-12 px-4 scroll-mt-6 defer-render">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header Staggered Sequence */}
        <StaggerContainer stagger={0.12} delayChildren={0.05} className="mb-10">
          <MotionItem variant="pop" className="flex justify-center">
            <div
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-sans font-medium mb-3 ${
                isDark
                  ? 'bg-amber-500/15 border border-amber-400/30 text-amber-300'
                  : 'bg-amber-900/10 border border-amber-700/20 text-amber-900'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
              <span>Doa &amp; Restu</span>
            </div>
          </MotionItem>

          <MotionItem variant="fadeUp">
            <h2 className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-stone-800'}`}>
              Buku Tamu &amp; RSVP
            </h2>
          </MotionItem>

          <MotionItem variant="expand">
            <FloralDivider className="my-3" />
          </MotionItem>

          <MotionItem variant="fadeUp">
            <p className={`font-sans text-xs sm:text-sm leading-relaxed px-4 max-w-xl mx-auto ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan memberikan konfirmasi kehadiran serta doa restu:
            </p>
          </MotionItem>
        </StaggerContainer>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
          {/* Form Container with Slide-in Entrance */}
          <ScrollReveal
            variant="slideLeft"
            interactive
            className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-xl border ${
              isDark
                ? 'bg-stone-900/85 border-amber-500/30 text-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
                : 'bg-white/95 border-amber-800/15 text-stone-800'
            }`}
          >
            <h3 className={`font-serif text-xl font-bold mb-4 pb-2 border-b ${isDark ? 'text-white border-white/10' : 'text-stone-800 border-stone-200/60'}`}>
              Konfirmasi Kehadiran
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama */}
              <div>
                <label htmlFor="rsvp-name" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                  Nama Lengkap *
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  autoComplete="name"
                  enterKeyHint="next"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso & Keluarga"
                  className={`w-full px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark
                      ? 'bg-stone-950 border-white/15 text-white placeholder-stone-500'
                      : 'bg-stone-50/50 border-stone-300 text-stone-800'
                  }`}
                />
              </div>

              {/* Status Kehadiran Segmented Tabs */}
              <div>
                <label id="rsvp-status-label" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                  Status Kehadiran *
                </label>
                <div
                  role="radiogroup"
                  aria-labelledby="rsvp-status-label"
                  className="grid grid-cols-3 gap-2"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={attendance === 'hadir'}
                    onClick={() => setAttendance('hadir')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-medium transition-all cursor-pointer min-h-[56px] ${
                      attendance === 'hadir'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-sm ring-1 ring-emerald-500/30'
                        : isDark
                        ? 'bg-stone-950 border-white/10 text-stone-400 hover:bg-stone-850'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mb-1" aria-hidden="true" />
                    <span>Hadir</span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={attendance === 'ragu'}
                    onClick={() => setAttendance('ragu')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-medium transition-all cursor-pointer min-h-[56px] ${
                      attendance === 'ragu'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-sm ring-1 ring-amber-500/30'
                        : isDark
                        ? 'bg-stone-950 border-white/10 text-stone-400 hover:bg-stone-850'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4 text-amber-500 mb-1" aria-hidden="true" />
                    <span>Ragu</span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={attendance === 'berhalangan'}
                    onClick={() => setAttendance('berhalangan')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-medium transition-all cursor-pointer min-h-[56px] ${
                      attendance === 'berhalangan'
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold shadow-sm ring-1 ring-rose-500/30'
                        : isDark
                        ? 'bg-stone-950 border-white/10 text-stone-400 hover:bg-stone-850'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <XCircle className="w-4 h-4 text-rose-500 mb-1" aria-hidden="true" />
                    <span>Berhalangan</span>
                  </button>
                </div>
              </div>

              {/* Jumlah Tamu (jika hadir) */}
              {attendance === 'hadir' && (
                <div>
                  <label htmlFor="rsvp-guest-count" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                    Jumlah Orang yang Hadir
                  </label>
                  <select
                    id="rsvp-guest-count"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className={`w-full px-4 py-3 rounded-2xl border text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-stone-950 border-white/15 text-white' : 'bg-stone-50/50 border-stone-300 text-stone-800'
                    }`}
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                  </select>
                </div>
              )}

              {/* Ucapan & Doa */}
              <div>
                <label htmlFor="rsvp-message" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                  Ucapan &amp; Doa Restu *
                </label>

                {/* Pilihan Doa Cepat Khas Indonesia */}
                <div className="mb-2.5">
                  <span className={`text-[10px] font-sans font-medium uppercase tracking-wider block mb-1.5 ${isDark ? 'text-amber-400/90' : 'text-amber-800'}`}>
                    ⚡ Pilih Doa Cepat (1-Klik):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Baarakallahu laka wa baaraka 'alaika wa jama'a bainakuma fii khoir 🤲",
                      "Selamat menempuh hidup baru! Semoga menjadi keluarga sakinah, mawaddah, warahmah 💍",
                      "Happy Wedding! Langgeng sampai kakek nenek & bahagia selalu ✨",
                      "Doa tulus dari kami sekeluarga, semoga acaranya lancar & penuh berkah 🤍"
                    ].map((templateWish, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setMessage(templateWish)
                          showToast('Doa berhasil dipilih!', 'info')
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-xl border text-left transition-all cursor-pointer ${
                          message === templateWish
                            ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-medium shadow-sm'
                            : isDark
                            ? 'bg-stone-900/90 border-white/10 text-stone-300 hover:border-amber-400/40 hover:text-white'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-amber-600/30'
                        }`}
                      >
                        {templateWish.slice(0, 36)}...
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  id="rsvp-message"
                  required
                  rows={4}
                  enterKeyHint="send"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan doa dan harapan terbaik untuk kedua mempelai..."
                  className={`w-full px-4 py-3 rounded-2xl border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark
                      ? 'bg-stone-950 border-white/15 text-white placeholder-stone-500'
                      : 'bg-stone-50/50 border-stone-300 text-stone-800'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 active:scale-[0.98] text-stone-950 font-sans font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim Ucapan & Konfirmasi'}</span>
              </button>
            </form>
          </ScrollReveal>

          {/* Wishes List Feed with Slide-in from Right */}
          <ScrollReveal
            variant="slideRight"
            delay={0.15}
            interactive
            className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-xl border ${
              isDark
                ? 'bg-stone-900/85 border border-amber-500/30 text-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
                : 'bg-white/95 border border-amber-800/15 text-stone-800'
            }`}
          >
            <div className={`flex items-center justify-between mb-4 pb-2 border-b ${isDark ? 'border-white/10' : 'border-stone-200/60'}`}>
              <div className="flex items-center gap-2">
                <MessageSquareHeart className="w-5 h-5 text-amber-400" aria-hidden="true" />
                <h3 className={`font-serif text-xl font-bold ${isDark ? 'text-white' : 'text-stone-800'}`}>
                  Doa &amp; Ucapan ({wishes.length})
                </h3>
              </div>

              {/* Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter ucapan berdasarkan kehadiran"
                className="flex items-center gap-1 text-[11px]"
              >
                {(['semua', 'hadir', 'berhalangan'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    role="tab"
                    aria-selected={filter === mode}
                    onClick={() => setFilter(mode)}
                    className={`min-h-[44px] px-3.5 py-2 rounded-full capitalize transition-colors cursor-pointer ${
                      filter === mode
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : isDark
                        ? 'text-stone-400 hover:text-white'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Wishes Scrollable Feed */}
            <div className="space-y-3.5 max-h-[480px] overflow-y-auto pr-1.5">
              {filteredWishes.length === 0 ? (
                <p className="text-center text-xs text-stone-400 py-8">
                  Belum ada ucapan untuk kategori ini.
                </p>
              ) : (
                filteredWishes.map((item) => {
                  const isLiked = !!likedMap[item.id]
                  return (
                    <div
                      key={item.id}
                      className={`p-4 sm:p-5 rounded-2xl border shadow-sm transition-all ${
                        isDark
                          ? 'bg-stone-950/70 border-white/10 hover:border-amber-500/30'
                          : 'bg-stone-50/80 border-stone-200/80 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-stone-950 border border-amber-600/30 flex items-center justify-center text-xs font-bold font-serif shadow-sm"
                            aria-hidden="true"
                          >
                            {item.name.charAt(0).toUpperCase()}
                          </div>
                          <span className={`font-serif font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-stone-800'}`}>
                            {item.name}
                          </span>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            item.attendance === 'hadir'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : item.attendance === 'ragu'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {item.attendance === 'hadir' ? 'Hadir' : item.attendance === 'ragu' ? 'Ragu' : 'Berhalangan'}
                        </span>
                      </div>

                      <p className={`font-sans text-xs sm:text-sm leading-relaxed pl-10 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                        "{item.message}"
                      </p>

                      <div className="flex items-center justify-between pl-10 mt-3 pt-2 border-t border-white/5">
                        <span className="text-[10px] sm:text-[11px] text-stone-400 font-mono">
                          {item.createdAt}
                        </span>

                        {/* Interactive Heart Reaction Button */}
                        <button
                          type="button"
                          onClick={() => handleLike(item.id)}
                          aria-label={`${isLiked ? 'Batal sukai' : 'Sukai'} ucapan dari ${item.name}`}
                          className={`min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs transition-all cursor-pointer ${
                            isLiked
                              ? 'bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30'
                              : 'text-stone-400 hover:text-rose-400'
                          }`}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              isLiked ? 'fill-rose-500 text-rose-500 animate-bounce' : ''
                            }`}
                            aria-hidden="true"
                          />
                          <span>{item.likes || 0}</span>
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
