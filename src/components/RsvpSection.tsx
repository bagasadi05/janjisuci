import React, { useState, useEffect } from 'react'
import { Send, CheckCircle2, HelpCircle, XCircle, MessageSquareHeart, Heart, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'
import { weddingData, WishMessage } from '../config/weddingData'
import { FloralDivider } from './Ornament'
import { useToast } from './Toast'

export const RsvpSection: React.FC = () => {
  const [wishes, setWishes] = useState<WishMessage[]>([])
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState<'hadir' | 'ragu' | 'berhalangan'>('hadir')
  const [guestCount, setGuestCount] = useState<number>(1)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filter, setFilter] = useState<'semua' | 'hadir' | 'berhalangan'>('semua')
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({})
  const { showToast } = useToast()

  useEffect(() => {
    // Read query parameter for personalized name
    const urlParams = new URLSearchParams(window.location.search)
    const to = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest')
    if (to) {
      setName(decodeURIComponent(to.replace(/\+/g, ' ')))
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
    <section id="rsvp" className="relative py-12 px-4 scroll-mt-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-900/10 border border-amber-700/20 text-amber-900 text-xs uppercase tracking-widest font-sans font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Doa & Restu</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
          Buku Tamu & RSVP
        </h2>
        <FloralDivider className="my-3" />
        <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed px-4 max-w-xl mx-auto mb-10">
          Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan memberikan konfirmasi kehadiran serta doa restu:
        </p>

        {/* Responsive Grid: Form on left, Feed on right on desktop (lg:) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
          
          {/* Form Container (col-span-12 on mobile, col-span-5 on desktop) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-amber-800/15 shadow-xl">
            <h3 className="font-serif text-xl font-bold text-stone-800 mb-4 pb-2 border-b border-stone-200/60">
              Konfirmasi Kehadiran
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama */}
              <div>
                <label htmlFor="rsvp-name" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap *
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso & Keluarga"
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/40 text-stone-800 text-sm bg-stone-50/50"
                />
              </div>

              {/* Status Kehadiran Segmented Tabs */}
              <div>
                <label id="rsvp-status-label" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
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
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 min-h-[56px] ${
                      attendance === 'hadir'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-sm ring-1 ring-emerald-500/30'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50 active:scale-95'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1" aria-hidden="true" />
                    <span>Hadir</span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={attendance === 'ragu'}
                    onClick={() => setAttendance('ragu')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 min-h-[56px] ${
                      attendance === 'ragu'
                        ? 'bg-amber-50 border-amber-500 text-amber-800 font-bold shadow-sm ring-1 ring-amber-500/30'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50 active:scale-95'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4 text-amber-600 mb-1" aria-hidden="true" />
                    <span>Ragu</span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={attendance === 'berhalangan'}
                    onClick={() => setAttendance('berhalangan')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 min-h-[56px] ${
                      attendance === 'berhalangan'
                        ? 'bg-rose-50 border-rose-500 text-rose-800 font-bold shadow-sm ring-1 ring-rose-500/30'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50 active:scale-95'
                    }`}
                  >
                    <XCircle className="w-4 h-4 text-rose-600 mb-1" aria-hidden="true" />
                    <span>Berhalangan</span>
                  </button>
                </div>
              </div>

              {/* Jumlah Tamu (jika hadir) */}
              {attendance === 'hadir' && (
                <div>
                  <label htmlFor="rsvp-guest-count" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Jumlah Orang yang Hadir
                  </label>
                  <select
                    id="rsvp-guest-count"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/40 text-stone-800 text-sm bg-stone-50/50 cursor-pointer"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                  </select>
                </div>
              )}

              {/* Ucapan & Doa */}
              <div>
                <label htmlFor="rsvp-message" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Ucapan & Doa Restu *
                </label>
                <textarea
                  id="rsvp-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan doa dan harapan terbaik untuk kedua mempelai..."
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/40 text-stone-800 text-sm bg-stone-50/50 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-900 hover:to-amber-800 active:scale-[0.98] text-white font-sans font-semibold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim Ucapan & Konfirmasi'}</span>
              </button>
            </form>
          </div>

          {/* Wishes List Feed (col-span-12 on mobile, col-span-7 on desktop) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-amber-800/15 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-200/60">
              <div className="flex items-center gap-2">
                <MessageSquareHeart className="w-5 h-5 text-amber-800" aria-hidden="true" />
                <h3 className="font-serif text-xl font-bold text-stone-800">
                  Doa & Ucapan ({wishes.length})
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
                    className={`min-h-[44px] px-3.5 py-2 rounded-full capitalize transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 ${
                      filter === mode
                        ? 'bg-amber-800 text-white font-medium'
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
                <p className="text-center text-xs text-stone-500 py-8">
                  Belum ada ucapan untuk kategori ini.
                </p>
              ) : (
                filteredWishes.map((item) => {
                  const isLiked = !!likedMap[item.id]
                  return (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 shadow-sm transition-all hover:bg-white"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-200 to-amber-100 text-amber-900 border border-amber-600/30 flex items-center justify-center text-xs font-bold font-serif shadow-sm" aria-hidden="true">
                            {item.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-serif font-bold text-sm sm:text-base text-stone-800">
                            {item.name}
                          </span>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            item.attendance === 'hadir'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.attendance === 'ragu'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {item.attendance === 'hadir' ? 'Hadir' : item.attendance === 'ragu' ? 'Ragu' : 'Berhalangan'}
                        </span>
                      </div>

                      <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed pl-10">
                        "{item.message}"
                      </p>

                      <div className="flex items-center justify-between pl-10 mt-3 pt-2 border-t border-stone-200/50">
                        <span className="text-[10px] sm:text-[11px] text-stone-500 font-sans">
                          {item.createdAt}
                        </span>

                        {/* Interactive Heart Reaction Button */}
                        <button
                          type="button"
                          onClick={() => handleLike(item.id)}
                          aria-label={`${isLiked ? 'Batal sukai' : 'Sukai'} ucapan dari ${item.name}`}
                          className={`min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                            isLiked
                              ? 'bg-rose-50 text-rose-600 font-semibold'
                              : 'text-stone-600 hover:text-rose-600'
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
          </div>

        </div>
      </div>
    </section>
  )
}
