import React, { useState, useRef, useEffect } from 'react'
import {
  Sparkles,
  Eye,
  ShoppingBag,
  Check,
  Heart,
  Smartphone,
  Music,
  ShieldCheck,
  Clock,
  MessageCircle,
  Wallet,
  ArrowRight,
  Star,
  ChevronDown,
  ChevronUp,
  Quote,
  X,
  Search,
  Volume2,
  VolumeX,
  KeyRound,
  Users,
  Play,
  Pause,
  Zap,
  CheckCircle2,
  Gift,
  Palette,
  Calendar,
  Layers,
  Award
} from 'lucide-react'
import {
  storeConfig,
  TemplateItem,
  PricingTier,
  formatRupiah
} from '../../config/storeConfig'
import { track } from '../../lib/analytics'
import { GuestLinkGenerator } from './GuestLinkGenerator'
import { useToast } from '../Toast'
import { CalligraphyReveal } from '../common/CalligraphyReveal'

interface StorefrontPageProps {
  onPreviewTemplate: (template: TemplateItem) => void
  onOrderTemplate: (template: TemplateItem, pkg?: PricingTier) => void
  onOpenClientPortal?: () => void
}

type DesignVibe = 'royal' | 'modern' | 'romantic'

export const StorefrontPage: React.FC<StorefrontPageProps> = ({
  onPreviewTemplate,
  onOrderTemplate,
  onOpenClientPortal
}) => {
  const { showToast } = useToast()
  const [selectedEvent, setSelectedEvent] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [pricingCategory, setPricingCategory] = useState<'wedding' | 'event'>('wedding')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // Design Direction / Vibe Switcher ('royal' | 'modern' | 'romantic')
  const [designVibe, setDesignVibe] = useState<DesignVibe>('royal')

  // Interactive Couple Simulator state in Hero
  const [heroGroomName, setHeroGroomName] = useState('Bagas')
  const [heroBrideName, setHeroBrideName] = useState('Anindita')
  const [heroEventDate, setHeroEventDate] = useState('Sabtu, 28 November 2026')
  const [heroTemplateId, setHeroTemplateId] = useState(storeConfig.templates[0].id)
  const [isHeroSimulating, setIsHeroSimulating] = useState(false)

  // Catalog Card Mini Audio Preview State
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null)
  const cardAudioRef = useRef<HTMLAudioElement | null>(null)

  // Stop card audio on unmount
  useEffect(() => {
    return () => {
      if (cardAudioRef.current) {
        cardAudioRef.current.pause()
      }
    }
  }, [])

  const currentHeroTemplate =
    storeConfig.templates.find((t) => t.id === heroTemplateId) || storeConfig.templates[0]

  const handleHeroSimulate = () => {
    setIsHeroSimulating(true)
    showToast(`Mockup diperbarui: ${heroGroomName} & ${heroBrideName}!`, 'success')
    setTimeout(() => setIsHeroSimulating(false), 500)
  }

  const handleToggleCardAudio = (tpl: TemplateItem) => {
    if (playingAudioId === tpl.id) {
      if (cardAudioRef.current) {
        cardAudioRef.current.pause()
      }
      setPlayingAudioId(null)
      showToast('Audio dijeda', 'info')
    } else {
      if (cardAudioRef.current) {
        cardAudioRef.current.pause()
      }
      const audio = new Audio(tpl.defaultSongSrc)
      audio.volume = 0.85
      audio.onended = () => setPlayingAudioId(null)
      audio.onerror = () => {
        showToast('Gagal memuat pratinjau audio', 'info')
        setPlayingAudioId(null)
      }
      audio
        .play()
        .then(() => {
          track('play_audio_preview', { template: tpl.slug })
          cardAudioRef.current = audio
          setPlayingAudioId(tpl.id)
          showToast(`Memutar: ${tpl.defaultSongTitle}`, 'success')
        })
        .catch((e) => {
          console.warn('Audio play block:', e)
          setPlayingAudioId(null)
        })
    }
  }

  const eventFilters = [
    { id: 'all', label: 'Semua Acara', count: storeConfig.templates.length, icon: '✨' },
    { id: 'wedding', label: 'Pernikahan', count: storeConfig.templates.filter((t) => !t.eventType || t.eventType === 'wedding').length, icon: '💍' },
    { id: 'khitan', label: 'Khitanan', count: storeConfig.templates.filter((t) => t.eventType === 'khitan').length, icon: '✂️' },
    { id: 'birthday', label: 'Ulang Tahun', count: storeConfig.templates.filter((t) => t.eventType === 'birthday').length, icon: '🎂' },
    { id: 'aqiqah', label: 'Aqiqah', count: storeConfig.templates.filter((t) => t.eventType === 'aqiqah').length, icon: '👶' },
    { id: 'graduation', label: 'Wisuda', count: storeConfig.templates.filter((t) => t.eventType === 'graduation').length, icon: '🎓' }
  ]

  const filteredTemplates = storeConfig.templates.filter((t) => {
    const matchesEvent =
      selectedEvent === 'all'
        ? true
        : selectedEvent === 'wedding'
        ? !t.eventType || t.eventType === 'wedding'
        : t.eventType === selectedEvent

    const query = searchQuery.toLowerCase().trim()
    if (!query) return matchesEvent

    return (
      matchesEvent &&
      (t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.categoryLabel.toLowerCase().includes(query) ||
        (t.badge && t.badge.toLowerCase().includes(query)) ||
        (t.features && t.features.some((f) => f.toLowerCase().includes(query))))
    )
  })

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Dynamic Theme Styling Variables based on designVibe
  const vibeConfig = {
    royal: {
      name: 'Royal Gold Luxury',
      subtitle: 'Kemegahan Emas Murni & Royal Arch Indonesia',
      glow: 'from-amber-600/20 via-amber-500/10 to-transparent',
      accentText: 'text-amber-300',
      badgeBg: 'bg-amber-500 text-stone-950',
      borderAccent: 'border-amber-500/40',
      heroTagline: 'Momen Sakral Paling Berkelas & Prestisius',
      buttonGradient: 'from-amber-500 via-amber-400 to-amber-600'
    },
    modern: {
      name: 'Interactive Modern Showcase',
      subtitle: 'Pengalaman Interaktif Live Preview & Cepat Siap Sebar',
      glow: 'from-cyan-600/20 via-emerald-500/10 to-transparent',
      accentText: 'text-cyan-300',
      badgeBg: 'bg-cyan-400 text-stone-950',
      borderAccent: 'border-cyan-500/40',
      heroTagline: 'Canggih, Interaktif & Langsung Siap dalam 1 Jam',
      buttonGradient: 'from-cyan-400 via-amber-300 to-emerald-400'
    },
    romantic: {
      name: 'Romantic Floral & Warm Sand',
      subtitle: 'Kelembutan Kelopak Bunga & Kehangatan Suasana Cinta',
      glow: 'from-rose-600/20 via-amber-500/10 to-transparent',
      accentText: 'text-rose-300',
      badgeBg: 'bg-rose-400 text-stone-950',
      borderAccent: 'border-rose-400/40',
      heroTagline: 'Kisah Cinta Abadi Bernuansa Bunga & Romantisme',
      buttonGradient: 'from-rose-400 via-pink-400 to-amber-300'
    }
  }[designVibe]

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-400 selection:text-stone-950 relative">
      {/* Ambient Top Glow that shifts according to selected vibe */}
      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b ${vibeConfig.glow} rounded-full blur-[140px] pointer-events-none z-0 transition-all duration-700`}
      />

      {/* Sticky Top Navbar */}
      <header className="sticky top-0 z-50 bg-stone-950/85 backdrop-blur-xl border-b border-amber-500/20 px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={`${storeConfig.brand.name} - Beranda Undangan Digital`}
            className="flex items-center gap-2.5 cursor-pointer group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl p-1 -m-1"
          >
            <div
              className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${vibeConfig.buttonGradient} flex items-center justify-center text-stone-950 font-serif font-extrabold text-lg shadow-md transition-all`}
              aria-hidden="true"
            >
              💍
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                {storeConfig.brand.name}
              </span>
              <span className="hidden sm:block text-[10px] text-amber-300/80 uppercase tracking-widest -mt-1 font-mono">
                Studio Undangan Digital
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav aria-label="Navigasi Halaman Toko" className="hidden lg:flex items-center gap-6 text-xs font-semibold text-stone-300">
            <button
              type="button"
              onClick={() => scrollTo('katalog')}
              className="hover:text-amber-300 transition-colors cursor-pointer py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
            >
              Katalog Desain
            </button>
            <button
              type="button"
              onClick={() => scrollTo('paket-harga')}
              className="hover:text-amber-300 transition-colors cursor-pointer py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
            >
              Paket Harga
            </button>
            <button
              type="button"
              onClick={() => scrollTo('cara-order')}
              className="hover:text-amber-300 transition-colors cursor-pointer py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
            >
              Cara Pemesanan
            </button>
            <button
              type="button"
              onClick={() => scrollTo('garansi')}
              className="hover:text-amber-300 transition-colors cursor-pointer py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
            >
              Garansi
            </button>
            <button
              type="button"
              onClick={() => scrollTo('generator')}
              className="hover:text-amber-300 transition-colors cursor-pointer py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
            >
              Generator Tamu
            </button>
          </nav>

          {/* Action CTAs: Portal & Order */}
          <div className="flex items-center gap-2.5">
            {onOpenClientPortal && (
              <button
                type="button"
                onClick={onOpenClientPortal}
                aria-label="Buka portal pelanggan untuk cek status atau RSVP"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-stone-900 hover:bg-stone-850 border border-amber-500/30 text-xs font-semibold text-amber-300 transition-all cursor-pointer shadow-sm hover:border-amber-400"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Cek Pesanan / Portal</span>
                <span className="sm:hidden">Portal</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                track('start_order', { template: storeConfig.templates[0].slug, source: 'navbar' })
                onOrderTemplate(storeConfig.templates[0])
              }}
              aria-label="Pesan template undangan pernikahan sekarang"
              className={`min-h-[40px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r ${vibeConfig.buttonGradient} text-stone-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300`}
            >
              <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Pesan Sekarang</span>
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="outline-none relative z-10">
        {/* HERO SECTION WITH VIBE SWITCHER & LIVE COUPLE SIMULATOR */}
        <section className="relative pt-8 pb-16 sm:py-20 px-4 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            {/* DESIGN VIBE SWITCHER PILL BAR */}
            <div className="flex items-center justify-center mb-6">
              <div className="inline-flex items-center gap-1 p-1 rounded-full bg-stone-900/90 border border-white/15 backdrop-blur-xl shadow-xl max-w-full overflow-x-auto">
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 pl-3 pr-2 hidden sm:inline flex items-center gap-1">
                  <Palette className="w-3 h-3 text-amber-400" />
                  Gaya Desain:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setDesignVibe('royal')
                    showToast('Beralih ke Gaya: 👑 Royal Gold Luxury', 'info')
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    designVibe === 'royal'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span>👑</span>
                  <span>Royal Gold</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDesignVibe('modern')
                    showToast('Beralih ke Gaya: ⚡ Interactive Modern', 'info')
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    designVibe === 'modern'
                      ? 'bg-cyan-400 text-stone-950 font-bold shadow-md'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span>⚡</span>
                  <span>Modern Interactive</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDesignVibe('romantic')
                    showToast('Beralih ke Gaya: 🌸 Romantic Floral', 'info')
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    designVibe === 'romantic'
                      ? 'bg-rose-400 text-stone-950 font-bold shadow-md'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span>🌸</span>
                  <span>Romantic Floral</span>
                </button>
              </div>
            </div>

            {/* Top Promo Pill */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Harga Perkenalan Studio Baru • Paket Mulai Rp 39.000</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="text-center max-w-4xl mx-auto mb-10">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                <span className="block text-stone-100">Sebarkan Momen Sakral dengan</span>
                <span className="block my-2">
                  <span
                    className={`inline-block italic ${
                      designVibe === 'romantic'
                        ? 'font-pinyon text-rose-300 text-6xl sm:text-8xl'
                        : 'text-gold-gradient font-script text-5xl sm:text-7xl lg:text-8xl'
                    } px-6 py-2 -my-2 align-middle drop-shadow`}
                  >
                    Undangan Digital
                  </span>
                </span>
                <span className={`block ${vibeConfig.accentText} font-serif font-bold tracking-tight transition-colors`}>
                  {vibeConfig.heroTagline}
                </span>
              </h1>

              <p className="text-stone-300 text-xs sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
                {vibeConfig.subtitle}. Dilengkapi musik otomatis, amplop tanda kasih 1-klik, rute Google Maps, serta generator link tamu tanpa batas.
              </p>
            </div>

            {/* INTERACTIVE NAME & DATE SIMULATOR BOX */}
            <div
              className={`max-w-2xl mx-auto p-5 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border ${vibeConfig.borderAccent} shadow-[0_15px_40px_rgba(0,0,0,0.6)] mb-12 transition-all`}
            >
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className={`text-xs font-bold ${vibeConfig.accentText} uppercase tracking-wider font-mono`}>
                    Simulator Undangan Anda
                  </span>
                </div>
                <span className="text-[10px] text-stone-400">Hasil langsung tampil di ponsel bawah</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <div>
                  <label htmlFor="hero-groom" className="block text-[11px] font-semibold text-stone-300 mb-1">
                    Nama Mempelai Pria:
                  </label>
                  <input
                    id="hero-groom"
                    type="text"
                    value={heroGroomName}
                    onChange={(e) => setHeroGroomName(e.target.value)}
                    placeholder="Nama Pria (e.g. Bagas)"
                    className="w-full bg-stone-950 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none transition-all font-serif"
                  />
                </div>
                <div>
                  <label htmlFor="hero-bride" className="block text-[11px] font-semibold text-stone-300 mb-1">
                    Nama Mempelai Wanita:
                  </label>
                  <input
                    id="hero-bride"
                    type="text"
                    value={heroBrideName}
                    onChange={(e) => setHeroBrideName(e.target.value)}
                    placeholder="Nama Wanita (e.g. Anindita)"
                    className="w-full bg-stone-950 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none transition-all font-serif"
                  />
                </div>
                <div>
                  <label htmlFor="hero-date" className="block text-[11px] font-semibold text-stone-300 mb-1">
                    Tanggal Pernikahan:
                  </label>
                  <input
                    id="hero-date"
                    type="text"
                    value={heroEventDate}
                    onChange={(e) => setHeroEventDate(e.target.value)}
                    placeholder="Contoh: 28 November 2026"
                    className="w-full bg-stone-950 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Template Theme Selector for Hero Mockup */}
              <div className="mt-3.5 flex items-center justify-between gap-2 flex-wrap pt-3 border-t border-white/10">
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {storeConfig.templates.slice(0, 5).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setHeroTemplateId(t.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shrink-0 ${
                        heroTemplateId === t.id
                          ? `${vibeConfig.badgeBg} font-bold shadow-sm`
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-750'
                      }`}
                    >
                      {t.name.split(' ')[0]} {t.name.split(' ')[1] || ''}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleHeroSimulate}
                  className="px-4 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all cursor-pointer shadow-md ml-auto"
                >
                  ✨ Perbarui Tampilan
                </button>
              </div>
            </div>

            {/* Central 3D Device Showcase with Live Couple Name */}
            <div className="relative max-w-4xl mx-auto px-4 flex items-center justify-center">
              {/* Floating Badge Left */}
              <div className="hidden md:flex absolute -left-4 lg:left-4 top-1/4 z-20 items-center gap-3 p-3.5 rounded-2xl bg-stone-900/90 backdrop-blur-xl border border-amber-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.6)] animate-float">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shadow-inner">
                  <Music className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-amber-300 uppercase tracking-widest font-mono font-semibold">
                    Musik Romantis
                  </p>
                  <p className="text-xs font-bold text-white truncate max-w-[140px]">
                    {currentHeroTemplate.defaultSongTitle}
                  </p>
                </div>
              </div>

              {/* Central Premium Smartphone Mockup (iPhone 16 Pro Style) */}
              <div
                onClick={() => {
                  track('view_template_demo', { template: currentHeroTemplate.slug, source: 'hero_mockup' })
                  onPreviewTemplate(currentHeroTemplate)
                }}
                className={`group relative w-64 sm:w-72 rounded-[44px] p-3.5 bg-gradient-to-b from-stone-600 via-stone-850 to-stone-950 border-4 border-stone-600/70 shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_30px_rgba(212,175,55,0.22)] hover:shadow-[0_35px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.35)] transition-all duration-500 cursor-pointer hover:scale-[1.02] ring-1 ring-amber-400/30 ${
                  isHeroSimulating ? 'scale-95 brightness-125' : ''
                }`}
              >
                {/* Dynamic Island Pill */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-stone-950 rounded-full z-30 flex items-center justify-center gap-2 border border-white/10 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-stone-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                </div>

                {/* Inner Screen Preview */}
                <div className="relative rounded-[32px] overflow-hidden bg-stone-900 aspect-[9/18]">
                  <img
                    src={currentHeroTemplate.thumbnail}
                    alt={currentHeroTemplate.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

                  {/* Glass Glare Sheen */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                  {/* Top Live Badge */}
                  <div className="absolute top-7 left-4 right-4 flex items-center justify-between z-20">
                    <span className="px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Live Preview
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold shadow-md">
                      {currentHeroTemplate.name.split(' ')[0]}
                    </span>
                  </div>

                  {/* Dynamic Couple Name Overlay with Calligraphy Reveal */}
                  <div className="absolute bottom-5 inset-x-4 text-center z-20">
                    <p className="text-[10px] text-amber-300 uppercase tracking-widest font-mono font-semibold">
                      The Wedding Celebration
                    </p>
                    <p className="font-serif text-xl sm:text-2xl font-bold text-white drop-shadow my-0.5 line-clamp-1">
                      <CalligraphyReveal
                        key={`${heroGroomName}-${heroBrideName}`}
                        text={`${heroGroomName.trim() || 'Rian'} & ${heroBrideName.trim() || 'Sarah'}`}
                        shimmer
                      />
                    </p>
                    <p className="text-[10px] text-stone-300 font-sans">
                      {heroEventDate}
                    </p>

                    <div className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 group-hover:bg-amber-400 text-white group-hover:text-stone-950 backdrop-blur-md border border-white/30 text-xs font-bold transition-all shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Buka Undangan Penuh</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge Right */}
              <div
                className="hidden md:flex absolute -right-4 lg:right-4 bottom-1/4 z-20 items-center gap-3 p-3.5 rounded-2xl bg-stone-900/90 backdrop-blur-xl border border-amber-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.6)] animate-float"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono font-semibold">
                    Tamu Tanpa Batas
                  </p>
                  <p className="text-xs font-bold text-white">Generator Link Otomatis</p>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-10">
              <button
                type="button"
                onClick={() => scrollTo('katalog')}
                aria-label="Lihat katalog desain template undangan"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r ${vibeConfig.buttonGradient} text-stone-950 font-bold text-sm shadow-[0_10px_30px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300`}
              >
                <span>Pilih Desain di Katalog</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => {
                  track('view_template_demo', { template: currentHeroTemplate.slug, source: 'hero_button' })
                  onPreviewTemplate(currentHeroTemplate)
                }}
                aria-label="Coba demo template undangan pernikahan"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-amber-400/30 text-amber-200 font-semibold text-sm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Eye className="w-4 h-4" aria-hidden="true" />
                <span>Coba Demo Penuh</span>
              </button>
            </div>

            {/* Trust Feature Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-14">
              {[
                { icon: Smartphone, title: 'Desktop & Mobile', desc: 'Desain responsif megah di semua layar' },
                { icon: Music, title: 'Musik Otomatis', desc: 'Autoplay seketika saat tamu buka cover' },
                { icon: Clock, title: 'Pengerjaan Kilat', desc: 'Siap sebar dalam 1–4 jam (VIP Express)' },
                { icon: Wallet, title: 'QRIS & E-Wallet', desc: 'Bayar mudah via GoPay, DANA & QRIS' }
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-stone-900/80 border border-white/10 flex flex-col items-center text-center hover:border-amber-500/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-300 flex items-center justify-center mb-2.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif font-bold text-base text-white">{item.title}</h3>
                    <p className="text-[11px] text-stone-400 mt-0.5">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* KATALOG TEMPLATE SECTION */}
        <section id="katalog" className="py-16 sm:py-20 px-4 bg-stone-900/60 border-t border-white/10 scroll-mt-14 defer-render-lg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Koleksi 17+ Desain Eksklusif</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
                Pilih Template Undangan Impianmu
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto mt-2">
                Dengarkan cuplikan lagu langsung dari kartu atau klik <strong>"Lihat Demo"</strong> untuk membuka gerbang animasi setiap template.
              </p>

              {/* Event Category Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter kategori acara undangan"
                className="flex items-center justify-center gap-2 flex-wrap mt-7"
              >
                {eventFilters.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedEvent === cat.id}
                    onClick={() => setSelectedEvent(cat.id)}
                    className={`min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      selectedEvent === cat.id
                        ? 'bg-amber-500 text-stone-950 shadow-md scale-105 font-bold'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    <span aria-hidden="true">{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        selectedEvent === cat.id ? 'bg-stone-950/20 text-stone-950' : 'bg-white/10 text-stone-300'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Instant Search Bar */}
              <div className="relative max-w-md mx-auto mt-6">
                <label htmlFor="store-search-templates" className="sr-only">
                  Cari tema undangan berdasarkan nama atau fitur
                </label>
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-stone-400 absolute left-4 pointer-events-none" aria-hidden="true" />
                  <input
                    id="store-search-templates"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari tema... (misal: Banjar, Jawa, Sage, Navy, Safari, Khitan)"
                    className="w-full min-h-[48px] pl-11 pr-10 py-3 rounded-full bg-stone-900/90 border border-white/15 focus:border-amber-400 text-xs sm:text-sm text-stone-200 placeholder-stone-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-all shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Hapus kata kunci pencarian"
                      className="absolute right-3 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {filteredTemplates.length === 0 ? (
              <div className="text-center py-16 px-4 bg-stone-900/40 rounded-3xl border border-white/10 max-w-md mx-auto">
                <Sparkles className="w-10 h-10 text-amber-400/60 mx-auto mb-3" />
                <h3 className="font-serif font-bold text-lg text-white">Tidak ada template yang cocok</h3>
                <p className="text-xs text-stone-400 mt-1 mb-5">
                  Coba cari dengan kata kunci lain atau pilih kategori acara di atas.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedEvent('all')
                  }}
                  className="min-h-[44px] px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  Tampilkan Semua Template
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredTemplates.map((tpl) => {
                  const isAudioPlaying = playingAudioId === tpl.id
                  return (
                    <div
                      key={tpl.id}
                      className="group rounded-3xl bg-stone-900/95 border border-white/10 hover:border-amber-400/60 overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(245,158,11,0.18)] transition-all duration-500 flex flex-col justify-between"
                    >
                      <div>
                        {/* Smartphone Mockup Preview Frame */}
                        <div className="relative p-2.5 bg-stone-950/70 border-b border-white/10">
                          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-stone-800 border-2 border-stone-800 shadow-inner">
                            {/* Dynamic Island / Speaker */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-stone-900/90 rounded-full z-20 backdrop-blur-md border border-white/10 flex items-center justify-center gap-1.5 shadow-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                              <div className="w-1 h-1 rounded-full bg-stone-800" />
                            </div>

                            <img
                              src={tpl.thumbnail}
                              alt={tpl.name}
                              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

                            {/* Top Badges */}
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                              <span className="px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-medium text-stone-200">
                                {tpl.categoryLabel}
                              </span>
                              {tpl.badge && (
                                <span className={`px-2.5 py-0.5 rounded-full ${vibeConfig.badgeBg} text-[10px] font-bold shadow-md`}>
                                  {tpl.badge}
                                </span>
                              )}
                            </div>

                            {/* Sample Overlay */}
                            <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between z-10">
                              <div>
                                <p className="text-[10px] uppercase tracking-widest text-amber-300 font-mono">
                                  {tpl.eventType === 'khitan'
                                    ? 'Demo Khitan:'
                                    : tpl.eventType === 'birthday'
                                    ? 'Demo Birthday:'
                                    : tpl.eventType === 'aqiqah'
                                    ? 'Demo Aqiqah:'
                                    : tpl.eventType === 'graduation'
                                    ? 'Demo Wisuda:'
                                    : 'Demo Pasangan:'}
                                </p>
                                <p className="font-serif text-lg sm:text-xl font-bold text-white drop-shadow line-clamp-1">
                                  {tpl.eventMeta?.primaryTitle || `${tpl.sampleCouple?.groomShort} & ${tpl.sampleCouple?.brideShort}`}
                                </p>
                                {tpl.eventMeta?.secondaryTitle && (
                                  <p className="text-[10px] text-amber-200/90 font-sans italic truncate max-w-[170px]">
                                    {tpl.eventMeta.secondaryTitle}
                                  </p>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  track('view_template_demo', { template: tpl.slug, source: 'catalog_card' })
                                  onPreviewTemplate(tpl)
                                }}
                                aria-label={`Lihat demo template ${tpl.name}`}
                                className="min-h-[44px] px-3.5 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                              >
                                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Lihat Demo</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 sm:p-6">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                              {tpl.name}
                            </h3>
                          </div>

                          <p className="text-xs text-stone-400 leading-relaxed mb-3">
                            {tpl.description}
                          </p>

                          {/* Interactive Mini Audio Preview Player with Visualizer */}
                          <div className="flex items-center justify-between gap-2 text-[11px] text-amber-300 font-medium mb-3.5 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                            <div className="flex items-center gap-2 truncate">
                              <Music className={`w-3.5 h-3.5 shrink-0 ${isAudioPlaying ? 'animate-bounce text-amber-300' : 'text-stone-400'}`} />
                              <span className="truncate">{tpl.defaultSongTitle}</span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleToggleCardAudio(tpl)}
                              aria-label={isAudioPlaying ? 'Jeda cuplikan audio' : 'Dengarkan cuplikan audio'}
                              className={`px-3 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                                isAudioPlaying
                                  ? 'bg-rose-500 text-white shadow-md'
                                  : 'bg-amber-400 text-stone-950 hover:bg-amber-300'
                              }`}
                            >
                              {isAudioPlaying ? (
                                <>
                                  <div className="flex items-center gap-0.5">
                                    <span className="w-1 h-2.5 bg-white rounded-full animate-pulse" />
                                    <span className="w-1 h-3.5 bg-white rounded-full animate-bounce" />
                                    <span className="w-1 h-2 bg-white rounded-full animate-pulse" />
                                  </div>
                                  <span>Jeda</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-3 h-3 fill-current" />
                                  <span>Dengar</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Feature Chips */}
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {tpl.features.map((feat, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-0.5 rounded-lg bg-stone-800/90 border border-stone-700/70 text-[11px] text-stone-300"
                              >
                                ✓ {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Price & Action Footer */}
                      <div className="px-6 py-4 bg-stone-950/60 border-t border-white/10 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[11px] text-stone-400 line-through block">
                            {formatRupiah(tpl.originalPrice)}
                          </span>
                          <span className="font-serif text-2xl font-bold text-amber-300">
                            {formatRupiah(tpl.price)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              track('view_template_demo', { template: tpl.slug, source: 'catalog_card' })
                              onPreviewTemplate(tpl)
                            }}
                            aria-label={`Lihat demo template ${tpl.name}`}
                            className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                          >
                            Demo
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              track('start_order', { template: tpl.slug, source: 'catalog_card' })
                              onOrderTemplate(tpl)
                            }}
                            aria-label={`Pilih dan pesan template ${tpl.name}`}
                            className={`min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r ${vibeConfig.buttonGradient} text-stone-950 text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300`}
                          >
                            <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Pesan</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* PAKET HARGA SECTION */}
        <section id="paket-harga" className="py-16 sm:py-20 px-4 scroll-mt-14 defer-render-lg">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
                <Star className="w-3.5 h-3.5" />
                <span>Harga Terjangkau &amp; Transparan</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
                Pilihan Paket Undangan Digital
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 mb-6">
                Bebas pilih desain mana saja dari katalog kami dan sesuaikan dengan fitur yang Anda butuhkan:
              </p>

              {/* Toggle Tab */}
              <div
                role="tablist"
                aria-label="Pilihan kategori paket harga"
                className="inline-flex p-1.5 rounded-2xl bg-stone-900 border border-amber-500/30 max-w-lg mx-auto shadow-xl"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={pricingCategory === 'wedding'}
                  onClick={() => setPricingCategory('wedding')}
                  className={`min-h-[44px] px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    pricingCategory === 'wedding'
                      ? `bg-gradient-to-r ${vibeConfig.buttonGradient} text-stone-950 shadow-md font-bold`
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span>💍 Paket Pernikahan (Mulai 49k)</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={pricingCategory === 'event'}
                  onClick={() => setPricingCategory('event')}
                  className={`min-h-[44px] px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    pricingCategory === 'event'
                      ? `bg-gradient-to-r ${vibeConfig.buttonGradient} text-stone-950 shadow-md font-bold`
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span>🎉 Khitan, Ultah &amp; Wisuda (Mulai 39k)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {(pricingCategory === 'event' ? storeConfig.eventPricingTiers : storeConfig.pricingTiers).map((pkg) => {
                const defaultTemplate =
                  pricingCategory === 'event'
                    ? storeConfig.templates.find((t) => t.eventType && t.eventType !== 'wedding') || storeConfig.templates[0]
                    : storeConfig.templates[0]
                return (
                  <div
                    key={pkg.id}
                    className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                      pkg.isPopular
                        ? `bg-gradient-to-b from-amber-950/70 via-stone-900 to-stone-900 border-2 ${vibeConfig.borderAccent} popular-package-shimmer scale-[1.02] z-10`
                        : 'bg-stone-900/90 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      {pkg.badge && (
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                            pkg.isPopular
                              ? vibeConfig.badgeBg
                              : 'bg-white/10 text-amber-300'
                          }`}
                        >
                          {pkg.badge}
                        </span>
                      )}

                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className="my-6 pb-6 border-b border-white/10">
                        <span className="text-xs text-stone-400 line-through block">
                          Harga Normal {formatRupiah(pkg.originalPrice)}
                        </span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-300">
                            {formatRupiah(pkg.price)}
                          </span>
                          <span className="text-xs text-stone-400">/ sekali bayar</span>
                        </div>
                      </div>

                      <ul className="space-y-3 text-xs sm:text-sm text-stone-300 mb-8">
                        {pkg.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        track('start_order', { template: defaultTemplate.slug, package: pkg.id, source: 'pricing_tier' })
                        onOrderTemplate(defaultTemplate, pkg)
                      }}
                      aria-label={`Pilih ${pkg.name} seharga ${formatRupiah(pkg.price)}`}
                      className={`min-h-[48px] w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                        pkg.isPopular
                          ? `bg-gradient-to-r ${vibeConfig.buttonGradient} text-stone-950 shadow-lg hover:brightness-110`
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                      }`}
                    >
                      Pilih {pkg.name} ({formatRupiah(pkg.price)})
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CARA ORDER SECTION */}
        <section id="cara-order" className="py-16 sm:py-20 px-4 bg-stone-900/40 border-t border-white/10 scroll-mt-14 defer-render">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                4 Langkah Mudah Pemesanan
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm max-w-lg mx-auto mt-2">
                Pilih opsi <strong>Booking Kilat</strong> (data menyusul) atau <strong>Kustomisasi Lengkap</strong> dengan simulasi pratinjau langsung:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  step: '01',
                  title: 'Pilih Template & Paket',
                  desc: 'Eksplorasi katalog kami dan pilih desain favorit Anda sesuai kebutuhan acara.'
                },
                {
                  step: '02',
                  title: 'Pilih Mode Pemesanan',
                  desc: 'Pilih Booking Kilat 1-menit untuk amankan promo, atau isi data mempelai lengkap.'
                },
                {
                  step: '03',
                  title: 'Bayar via QRIS / E-Wallet',
                  desc: 'Scan QRIS otomatis atau transfer ke GoPay, ShopeePay, DANA & BCA.'
                },
                {
                  step: '04',
                  title: 'Akses Portal & WhatsApp',
                  desc: 'Kirim konfirmasi ke WA Admin dan kelola RSVP tamu via Portal Pelanggan Anda.'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-stone-900 border border-white/10 relative overflow-hidden"
                >
                  <span className="font-serif text-5xl font-bold text-amber-500/15 absolute top-3 right-4">
                    {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GENERATOR LINK TAMU SECTION */}
        <GuestLinkGenerator />

        {/* GARANSI & PROGRAM PELANGGAN PERDANA SECTION */}
        <section id="garansi" className="py-16 sm:py-20 px-4 bg-stone-900/60 border-t border-white/10 scroll-mt-14 defer-render relative">
          <span id="testimoni" className="sr-only" aria-hidden="true" />
          <div className="max-w-6xl mx-auto">
            {/* Real Testimonials Grid (only rendered if authentic customer reviews exist) */}
            {storeConfig.testimonials && storeConfig.testimonials.length > 0 && (
              <div className="mb-14">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span>Ulasan Nyata Pelanggan</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Cerita Kebahagiaan Pasangan
                  </h3>
                  <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto mt-1">
                    Ulasan jujur dari mempelai yang telah merayakan momen istimewa mereka bersama JanjiSuci.id:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {storeConfig.testimonials.map((t) => (
                    <div
                      key={t.id}
                      className="p-6 rounded-3xl bg-stone-900/90 border border-white/10 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-xl"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="flex text-amber-400 gap-0.5">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-[11px] text-stone-500 font-mono">{t.date}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic mb-6">
                          "{t.comment}"
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <img
                          src={t.avatar}
                          alt={t.coupleName}
                          className="w-11 h-11 rounded-full object-cover border border-amber-400/40"
                        />
                        <div>
                          <h4 className="font-serif font-bold text-sm text-white">
                            {t.coupleName}
                          </h4>
                          <p className="text-[11px] text-amber-300/80">
                            Tema: {t.templateName} • {t.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Header: Kenapa Aman Pesan di JanjiSuci.id? */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs uppercase tracking-widest font-semibold mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Jaminan Kualitas &amp; Keamanan</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
                Kenapa Aman Pesan di JanjiSuci.id?
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
                Kami berkomitmen memberikan kepastian dan ketenangan pikiran di setiap tahapan pembuatan undangan tanpa rasa was-was:
              </p>
            </div>

            {/* 4 Guarantee Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <div className="p-6 rounded-3xl bg-stone-900/90 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-semibold block mb-1">
                    Garansi Revisi
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    Revisi Gratis Sampai Puas
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Perubahan jadwal, penulisan nama, denah, atau rute acara kami bantu revisi tanpa biaya hingga H-1 acara.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-stone-900/90 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-300 flex items-center justify-center mb-4">
                    <Eye className="w-5 h-5 text-sky-300" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-sky-400 font-semibold block mb-1">
                    Coba Interaktif
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    Lihat Dulu, Bayar Kemudian
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Coba simulator demo lengkap dengan nama Anda sendiri di website sebelum memutuskan untuk melakukan transfer pembayaran.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-stone-900/90 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center justify-center mb-4">
                    <MessageCircle className="w-5 h-5 text-emerald-300" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold block mb-1">
                    Layanan Ramah
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    Admin Responsif via WhatsApp
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Didampingi admin ramah yang siap membantu konsultasi setiap {storeConfig.brand.workingHours}. Respons cepat &amp; transparan.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-stone-900/90 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-rose-300" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 font-semibold block mb-1">
                    Jaminan Refund
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    Uang Kembali 100%
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Jika pesanan belum mulai dikerjakan dan Anda membatalkan, uang kembali utuh 100% tanpa potongan berbelit.
                  </p>
                </div>
              </div>
            </div>

            {/* Highlighted "Program Pelanggan Perdana" Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 border-2 border-amber-500/30 shadow-[0_20px_50px_rgba(212,175,55,0.12)] relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30 mb-3">
                    <Gift className="w-3.5 h-3.5" />
                    <span>Program Pelanggan Perdana</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2.5">
                    Studio Baru, Dedikasi Penuh untuk Hari Bahagia Anda
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                    JanjiSuci.id adalah studio kreatif yang baru hadir untuk menghadirkan standar baru undangan digital di Indonesia. Untuk 20 pasangan pengantin pertama yang bersedia memberikan masukan dan ulasan jujur setelah acara, kami memberikan apresiasi istimewa:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Gratis Upgrade Fitur</strong> (Amplop Digital &amp; Generator Tamu)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Prioritas Pengerjaan Kilat</strong> langsung oleh lead desainer</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-2.5">
                  <a
                    href={`https://wa.me/${storeConfig.brand.whatsappNumber}?text=${encodeURIComponent(
                      'Halo Admin JanjiSuci.id, saya tertarik dengan Program Pelanggan Perdana. Apakah kuota bonus upgrade masih tersedia untuk tanggal acara saya?'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('contact_wa', { source: 'program_pelanggan_perdana' })}
                    className={`min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r ${vibeConfig.buttonGradient} text-stone-950 font-bold text-xs sm:text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Tanya Program Perdana via WA</span>
                  </a>
                  <span className="text-[11px] text-stone-400 text-center lg:text-left">
                    Konsultasi santai • Tanpa komitmen order di awal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="py-16 sm:py-20 px-4 bg-stone-900/40 border-t border-white/10 scroll-mt-14 defer-render">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Pertanyaan yang Sering Diajukan (FAQ)
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm max-w-lg mx-auto mt-2">
                Segala hal yang perlu Anda ketahui tentang pemesanan, fitur, dan proses pembuatan undangan digital di JanjiSuci.id:
              </p>
            </div>

            <div className="space-y-3">
              {storeConfig.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx
                const questionId = `faq-question-${idx}`
                const answerId = `faq-answer-${idx}`
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-stone-900 border border-white/10 overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      id={questionId}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[56px]"
                    >
                      <span className="font-serif font-bold text-sm sm:text-base text-white">
                        {faq.question}
                      </span>
                      <span className="p-1 rounded-full bg-white/10 text-amber-300 shrink-0" aria-hidden="true">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        id={answerId}
                        role="region"
                        aria-labelledby={questionId}
                        className="px-5 pb-5 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-150"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/${storeConfig.brand.whatsappNumber}?text=${encodeURIComponent(
          'Halo Admin JanjiSuci.id, saya ingin konsultasi atau pesan undangan pernikahan digital. Boleh dibantu?'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('contact_wa', { source: 'floating_button' })}
        aria-label={`Konsultasi via WhatsApp Admin (${storeConfig.brand.whatsappDisplay})`}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_10px_25px_rgba(16,185,129,0.4)] transition-all duration-300 active:scale-95 border border-emerald-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[44px]"
      >
        <span className="relative flex h-3 w-3" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200" />
        </span>
        <MessageCircle className="w-5 h-5 fill-white" aria-hidden="true" />
        <span className="font-bold text-xs sm:text-sm hidden sm:inline">
          Konsultasi Admin WA
        </span>
      </a>

      {/* FOOTER */}
      <footer className="py-12 px-4 bg-stone-950 border-t border-white/10 text-center text-xs text-stone-400 mb-16 sm:mb-0">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg" aria-hidden="true">💍</span>
            <span className="font-serif text-xl font-bold text-white">
              {storeConfig.brand.name}
            </span>
          </div>
          <p className="max-w-md mx-auto text-stone-400">
            {storeConfig.brand.tagline} — Melayani pembuatan undangan pernikahan digital elegan di seluruh Indonesia.
          </p>
          <p className="text-amber-300/90 font-medium font-mono">
            WhatsApp CS &amp; Rekening Resmi: {storeConfig.brand.whatsappDisplay}
          </p>
          <div className="pt-4 border-t border-white/5 text-[11px] text-stone-400 flex items-center justify-center gap-1">
            <span>© 2026 {storeConfig.brand.name}. Dirancang dengan</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" aria-hidden="true" />
            <span>untuk kebahagiaan Anda.</span>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 inset-x-0 z-30 p-2.5 bg-stone-950/95 backdrop-blur-xl border-t border-amber-500/25 flex items-center justify-around gap-2 sm:hidden shadow-2xl pb-[max(0.625rem,env(safe-area-inset-bottom,0.625rem))]">
        <button
          type="button"
          onClick={() => scrollTo('katalog')}
          className="flex flex-col items-center gap-1 text-[10px] text-stone-300 hover:text-amber-300 font-semibold cursor-pointer py-1"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Katalog</span>
        </button>

        <button
          type="button"
          onClick={() => {
            track('start_order', { template: storeConfig.templates[0].slug, source: 'mobile_nav' })
            onOrderTemplate(storeConfig.templates[0])
          }}
          className="flex flex-col items-center gap-1 text-[10px] text-amber-300 font-bold cursor-pointer py-1"
        >
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>Pesan</span>
        </button>

        {onOpenClientPortal && (
          <button
            type="button"
            onClick={onOpenClientPortal}
            className="flex flex-col items-center gap-1 text-[10px] text-stone-300 hover:text-amber-300 font-semibold cursor-pointer py-1"
          >
            <KeyRound className="w-4 h-4 text-amber-400" />
            <span>Portal</span>
          </button>
        )}

        <a
          href={`https://wa.me/${storeConfig.brand.whatsappNumber}?text=${encodeURIComponent(
            'Halo Admin JanjiSuci, saya ingin konsultasi undangan pernikahan digital.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('contact_wa', { source: 'mobile_nav' })}
          className="flex flex-col items-center gap-1 text-[10px] text-emerald-400 font-semibold cursor-pointer py-1"
        >
          <MessageCircle className="w-4 h-4 fill-emerald-500 text-emerald-500" />
          <span>Chat WA</span>
        </a>
      </div>
    </div>
  )
}
