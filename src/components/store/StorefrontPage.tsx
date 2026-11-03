import React, { useState } from 'react'
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
  Search
} from 'lucide-react'
import {
  storeConfig,
  TemplateItem,
  PricingTier,
  formatRupiah
} from '../../config/storeConfig'
import { GuestLinkGenerator } from './GuestLinkGenerator'

interface StorefrontPageProps {
  onPreviewTemplate: (template: TemplateItem) => void
  onOrderTemplate: (template: TemplateItem, pkg?: PricingTier) => void
}

export const StorefrontPage: React.FC<StorefrontPageProps> = ({
  onPreviewTemplate,
  onOrderTemplate
}) => {
  const [selectedEvent, setSelectedEvent] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [pricingCategory, setPricingCategory] = useState<'wedding' | 'event'>('wedding')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

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

    const matchesQuery =
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.categoryLabel.toLowerCase().includes(query) ||
      (t.badge && t.badge.toLowerCase().includes(query)) ||
      (t.features && t.features.some((f) => f.toLowerCase().includes(query)))

    return matchesEvent && matchesQuery
  })

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-400 selection:text-stone-950">
      {/* Sticky Top Navbar */}
      <header className="sticky top-0 z-50 bg-stone-950/85 backdrop-blur-xl border-b border-amber-500/20 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={`${storeConfig.brand.name} - Beranda Undangan Digital`}
            className="flex items-center gap-2.5 cursor-pointer group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl p-1 -m-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 flex items-center justify-center text-stone-950 font-serif font-extrabold text-lg shadow-md" aria-hidden="true">
              💍
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                {storeConfig.brand.name}
              </span>
              <span className="hidden sm:block text-[10px] text-amber-300/80 uppercase tracking-widest -mt-1">
                Undangan Digital Premium
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav aria-label="Navigasi Halaman Toko" className="hidden lg:flex items-center gap-6 text-xs font-medium text-stone-300">
            <button type="button" onClick={() => scrollTo('katalog')} className="hover:text-amber-300 transition-colors cursor-pointer py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg">
              Katalog
            </button>
            <button type="button" onClick={() => scrollTo('paket-harga')} className="hover:text-amber-300 transition-colors cursor-pointer py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg">
              Paket Harga
            </button>
            <button type="button" onClick={() => scrollTo('cara-order')} className="hover:text-amber-300 transition-colors cursor-pointer py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg">
              Cara Pemesanan
            </button>
            <button type="button" onClick={() => scrollTo('testimoni')} className="hover:text-amber-300 transition-colors cursor-pointer py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg">
              Testimoni
            </button>
            <button type="button" onClick={() => scrollTo('faq')} className="hover:text-amber-300 transition-colors cursor-pointer py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg">
              FAQ
            </button>
            <button type="button" onClick={() => scrollTo('generator')} className="hover:text-amber-300 transition-colors cursor-pointer py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg">
              Generator Tamu
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href={`https://wa.me/${storeConfig.brand.whatsappNumber}?text=${encodeURIComponent(
                'Halo Admin JanjiSuci.id, saya ingin tanya-tanya mengenai pemesanan undangan pernikahan digital.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat WhatsApp Admin di ${storeConfig.brand.whatsappDisplay}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-medium text-stone-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 min-h-[38px]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span>WA: {storeConfig.brand.whatsappDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => onOrderTemplate(storeConfig.templates[0])}
              aria-label="Pesan template undangan pernikahan sekarang"
              className="min-h-[40px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Pesan Sekarang</span>
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:py-24 px-4 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Promo Spesial Hari Ini • Harga Mulai Rp 75.000 Saja!</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            <span className="block text-stone-200">Sebarkan Kabar Bahagia dengan</span>
            <span className="block my-2 sm:my-3">
              <span className="inline-block text-gold-gradient italic font-script text-5xl sm:text-7xl lg:text-8xl px-6 py-2 -my-2 align-middle drop-shadow-sm">
                Undangan Digital
              </span>
            </span>
            <span className="block text-amber-200/90 font-serif font-bold tracking-tight">
              Paling Berkelas
            </span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mt-6 leading-relaxed">
            {storeConfig.brand.subTagline} Pilih template favoritmu, isi data pengantin, bayar mudah via{' '}
            <strong className="text-amber-300">GoPay, ShopeePay, atau DANA</strong>, dan langsung konfirmasi ke WhatsApp kami!
          </p>

          {/* Primary Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-9">
            <button
              type="button"
              onClick={() => scrollTo('katalog')}
              aria-label="Lihat katalog desain template undangan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-sm shadow-[0_10px_30px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <span>Pilih Desain Template</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onPreviewTemplate(storeConfig.templates[0])}
              aria-label="Coba demo template undangan pernikahan terlaris"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-amber-400/30 text-amber-200 font-semibold text-sm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span>Coba Demo Terlaris</span>
            </button>
          </div>

          {/* Interactive Floating 3D Device Showcase */}
          <div className="relative mt-12 sm:mt-16 max-w-4xl mx-auto px-4">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] bg-gradient-to-tr from-amber-600/20 via-amber-400/10 to-transparent rounded-full blur-[90px] pointer-events-none" />

            <div className="relative flex items-center justify-center">
              {/* Floating Badge Left */}
              <div className="hidden md:flex absolute -left-4 lg:left-4 top-1/4 z-20 items-center gap-3 p-3.5 rounded-2xl bg-stone-900/90 backdrop-blur-xl border border-amber-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.6)] animate-float">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shadow-inner">
                  <Music className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-amber-300 uppercase tracking-widest font-mono font-semibold">Autoplay Musik</p>
                  <p className="text-xs font-bold text-white">Lagu Romantis Pilihan</p>
                </div>
              </div>

              {/* Central Premium Smartphone Mockup */}
              <div
                onClick={() => onPreviewTemplate(storeConfig.templates[0])}
                className="group relative w-64 sm:w-72 rounded-[42px] p-3 bg-gradient-to-b from-stone-700 via-stone-800 to-stone-950 border-4 border-stone-700/80 shadow-[0_25px_60px_rgba(212,175,55,0.25)] hover:shadow-[0_30px_70px_rgba(212,175,55,0.4)] transition-all duration-500 cursor-pointer hover:scale-[1.02]"
              >
                {/* Dynamic Island Pill */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-stone-950 rounded-full z-30 flex items-center justify-center gap-2 border border-white/10 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-stone-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                </div>

                {/* Inner Screen Preview */}
                <div className="relative rounded-[32px] overflow-hidden bg-stone-900 aspect-[9/18]">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                    alt="Preview Undangan"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                  {/* Top Live Badge */}
                  <div className="absolute top-7 left-4 right-4 flex items-center justify-between z-20">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Live Demo
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold shadow-md">
                      17+ Template
                    </span>
                  </div>

                  {/* Bottom Preview Overlay */}
                  <div className="absolute bottom-5 inset-x-4 text-center z-20">
                    <p className="font-serif text-lg font-bold text-white drop-shadow">
                      Rian &amp; Sarah
                    </p>
                    <p className="text-[11px] text-amber-300 font-mono tracking-wider mt-0.5">
                      The Wedding Celebration
                    </p>
                    <div className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 group-hover:bg-amber-400 text-white group-hover:text-stone-950 backdrop-blur-md border border-white/30 text-xs font-bold transition-all shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ketuk Untuk Mencoba</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge Right */}
              <div className="hidden md:flex absolute -right-4 lg:right-4 bottom-1/4 z-20 items-center gap-3 p-3.5 rounded-2xl bg-stone-900/90 backdrop-blur-xl border border-amber-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.6)] animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono font-semibold">Tamu Tanpa Batas</p>
                  <p className="text-xs font-bold text-white">Generator Link Otomatis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Feature Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-14">
            {[
              { icon: Smartphone, title: 'Desktop & Mobile', desc: 'Tampilan mewah di HP & Laptop' },
              { icon: Music, title: 'Musik Indonesia', desc: 'Autoplay lagu romantis pilihan' },
              { icon: Clock, title: 'Proses Ekspres', desc: 'Siap sebar dalam hitungan jam' },
              { icon: Wallet, title: 'Bayar Praktis', desc: 'GoPay, ShopeePay & DANA' }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-900/80 border border-white/10 flex flex-col items-center text-center"
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
      <section id="katalog" className="py-16 sm:py-20 px-4 bg-stone-900/60 border-t border-white/10 scroll-mt-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Koleksi Desain Eksklusif</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Pilih Template Undangan Impianmu
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto mt-2">
              Klik tombol <strong>"Lihat Demo"</strong> untuk mencoba langsung tampilan dan musik masing-masing template, atau klik <strong>"Pilih &amp; Pesan"</strong> untuk mengisi data acaramu.
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
                      ? 'bg-amber-500 text-stone-950 shadow-md scale-105'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedEvent === cat.id ? 'bg-stone-950/20 text-stone-950' : 'bg-white/10 text-stone-300'
                  }`}>
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
                  setSearchQuery('');
                  setSelectedEvent('all');
                }}
                className="min-h-[44px] px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                Tampilkan Semua Template
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="group rounded-3xl bg-stone-900 border border-white/10 hover:border-amber-500/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Smartphone Mockup Preview Frame */}
                  <div className="relative p-2.5 bg-stone-950/70 border-b border-white/10">
                    <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-stone-800 border-2 border-stone-800 shadow-inner">
                      {/* Top Dynamic Island / Phone Speaker */}
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
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold shadow-md">
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
                          onClick={() => onPreviewTemplate(tpl)}
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

                    {/* Music & Animation Tag */}
                    <div className="flex items-center gap-2 text-[11px] text-amber-300/90 font-medium mb-3.5 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      <Music className="w-3 h-3 shrink-0" />
                      <span className="truncate">Lagu: {tpl.defaultSongTitle}</span>
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
                      onClick={() => onPreviewTemplate(tpl)}
                      aria-label={`Lihat demo langsung template ${tpl.name}`}
                      className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      Lihat Demo
                    </button>
                    <button
                      type="button"
                      onClick={() => onOrderTemplate(tpl)}
                      aria-label={`Pilih dan pesan template ${tpl.name} seharga ${formatRupiah(tpl.price)}`}
                      className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Pilih & Pesan</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* PAKET HARGA SECTION (75rb - 149rb) */}
      <section id="paket-harga" className="py-16 sm:py-20 px-4 scroll-mt-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
              <Star className="w-3.5 h-3.5" />
              <span>Harga Terjangkau & Transparan</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Pilihan Paket Undangan Digital
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 mb-6">
              Bebas pilih desain template mana saja dari katalog kami dan sesuaikan dengan paket fitur yang Anda butuhkan:
            </p>

            {/* Toggle Tab: Paket Pernikahan vs Paket Syukuran/Ultah/Wisuda */}
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
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <span>💍 Paket Pernikahan (Mulai 75k)</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={pricingCategory === 'event'}
                onClick={() => setPricingCategory('event')}
                className={`min-h-[44px] px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  pricingCategory === 'event'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <span>🎉 Khitan, Ultah & Wisuda (Mulai 59k)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {(pricingCategory === 'event' ? storeConfig.eventPricingTiers : storeConfig.pricingTiers).map((pkg) => {
              const defaultTemplate = pricingCategory === 'event'
                ? storeConfig.templates.find((t) => t.eventType && t.eventType !== 'wedding') || storeConfig.templates[0]
                : storeConfig.templates[0]
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                    pkg.isPopular
                      ? 'bg-gradient-to-b from-amber-950/60 via-stone-900 to-stone-900 border-2 border-amber-400 shadow-[0_15px_40px_rgba(212,175,55,0.2)] scale-[1.02]'
                      : 'bg-stone-900 border border-white/10'
                  }`}
                >
                  <div>
                    {pkg.badge && (
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                          pkg.isPopular
                            ? 'bg-amber-400 text-stone-950'
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
                    onClick={() => onOrderTemplate(defaultTemplate, pkg)}
                    aria-label={`Pilih ${pkg.name} seharga ${formatRupiah(pkg.price)}`}
                    className={`min-h-[48px] w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                      pkg.isPopular
                        ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 shadow-lg hover:brightness-110'
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

      {/* CARA ORDER & PEMBAYARAN SECTION */}
      <section id="cara-order" className="py-16 sm:py-20 px-4 bg-stone-900/40 border-t border-white/10 scroll-mt-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              4 Langkah Mudah Pemesanan & Setor Data
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm max-w-lg mx-auto mt-2">
              Tanpa ribet! Seluruh proses dari pemilihan template, setor data pengantin, hingga pembayaran terhubung langsung ke WhatsApp Admin kami:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: '01',
                title: 'Pilih Template & Paket',
                desc: 'Lihat Demo di katalog kami dan pilih desain serta paket harga (Rp 75rb – Rp 149rb) yang paling cocok.'
              },
              {
                step: '02',
                title: 'Isi Data Pengantin',
                desc: 'Masukkan nama mempelai, nama orang tua, jadwal akad/resepsi, link Maps, serta lagu pilihan di Formulir Pemesanan.'
              },
              {
                step: '03',
                title: 'Bayar via E-Wallet',
                desc: 'Lakukan pembayaran ke GoPay, ShopeePay, atau DANA di nomor 0896-1977-4116 sesuai nominal paket.'
              },
              {
                step: '04',
                title: 'Konfirmasi ke WhatsApp',
                desc: 'Klik tombol Kirim ke WhatsApp. Data otomatis terkirim rapi ke Admin & undangan segera diproses aktif!'
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

          {/* Payment Info Highlight Banner */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Metode Pembayaran Resmi {storeConfig.brand.name}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                GoPay • ShopeePay • DANA :{' '}
                <span className="text-amber-300 font-mono">{storeConfig.brand.whatsappDisplay}</span>
              </h3>
              <p className="text-xs text-stone-300">
                Konfirmasi pesanan & konsultasi gratis langsung ke WhatsApp Admin ({storeConfig.brand.whatsappDisplay})
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOrderTemplate(storeConfig.templates[0])}
              aria-label="Buat pesanan sekarang"
              className="min-h-[44px] px-7 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              Buat Pesanan Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* GENERATOR LINK TAMU SECTION */}
      <GuestLinkGenerator />

      {/* TESTIMONIALS SECTION */}
      <section id="testimoni" className="py-16 sm:py-20 px-4 bg-stone-900/60 border-t border-white/10 scroll-mt-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>Cerita Kebahagiaan Klien</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Dipercaya Ratusan Pasangan Pengantin
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto mt-2">
              Kisah nyata dari mempelai yang telah merayakan momen istimewa mereka bersama JanjiSuci.id:
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
                    <span className="text-[11px] text-stone-500">{t.date}</span>
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
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section id="faq" className="py-16 sm:py-20 px-4 bg-stone-900/40 border-t border-white/10 scroll-mt-14">
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

      {/* FLOATING WHATSAPP BUTTON (Single Consolidated Accessible Button) */}
      <a
        href={`https://wa.me/${storeConfig.brand.whatsappNumber}?text=${encodeURIComponent(
          'Halo Admin JanjiSuci.id, saya ingin konsultasi atau pesan undangan pernikahan digital. Boleh dibantu?'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Konsultasi langsung via WhatsApp Admin (${storeConfig.brand.whatsappDisplay})`}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_10px_25px_rgba(16,185,129,0.4)] transition-all duration-300 active:scale-95 border border-emerald-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[44px]"
      >
        <span className="relative flex h-3 w-3" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200" />
        </span>
        <MessageCircle className="w-5 h-5 fill-white" aria-hidden="true" />
        <span className="font-sans font-bold text-xs sm:text-sm hidden sm:inline">
          Konsultasi Admin WA
        </span>
        <span className="px-1.5 py-0.5 rounded-full bg-emerald-800/80 text-[10px] text-emerald-200 font-semibold sm:hidden">
          WA
        </span>
      </a>
      </main>

      {/* FOOTER STOREFRONT */}
      <footer className="py-12 px-4 bg-stone-950 border-t border-white/10 text-center text-xs text-stone-400">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg" aria-hidden="true">💍</span>
            <span className="font-serif text-xl font-bold text-white">
              {storeConfig.brand.name}
            </span>
          </div>
          <p className="max-w-md mx-auto text-stone-400">
            {storeConfig.brand.tagline} — Melayani pembuatan undangan pernikahan digital seluruh Indonesia.
          </p>
          <p className="text-amber-300/90 font-medium">
            WhatsApp & Pembayaran (GoPay / ShopeePay / DANA): {storeConfig.brand.whatsappDisplay}
          </p>
          <div className="pt-4 border-t border-white/5 text-[11px] text-stone-400 flex items-center justify-center gap-1">
            <span>© 2026 {storeConfig.brand.name}. Dibuat dengan</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" aria-hidden="true" />
            <span>untuk hari bahagia Anda.</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Sticky Quick Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 p-2.5 bg-stone-950/95 backdrop-blur-xl border-t border-amber-500/25 flex items-center justify-between gap-3 sm:hidden shadow-2xl pb-[max(0.625rem,env(safe-area-inset-bottom,0.625rem))]">
        <div>
          <p className="text-[10px] text-amber-300 uppercase tracking-widest font-mono font-semibold">Promo Spesial</p>
          <p className="text-xs font-bold text-white">Mulai Rp 75.000 Saja</p>
        </div>
        <button
          type="button"
          onClick={() => scrollTo('katalog')}
          aria-label="Lihat katalog pilihan template undangan"
          className="min-h-[44px] px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 flex items-center justify-center"
        >
          Pilih Template
        </button>
      </div>
    </div>
  )
}
