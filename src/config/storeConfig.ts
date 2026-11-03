export type EventType =
  | 'wedding'
  | 'khitan'
  | 'birthday'
  | 'aqiqah'
  | 'graduation'
  | 'syukuran'
  | 'event'

export type EventCategoryFilter =
  | 'all'
  | 'wedding'
  | 'khitan'
  | 'birthday'
  | 'aqiqah'
  | 'graduation'
  | 'syukuran'

export interface PaymentMethod {
  id: string
  name: string
  type: 'ewallet' | 'qris'
  number: string
  holder: string
  badgeColor: string
  instructions: string
}

export interface PricingTier {
  id: string
  name: string
  price: number
  originalPrice: number
  badge?: string
  isPopular?: boolean
  description: string
  features: string[]
}

export interface TestimonialItem {
  id: string
  coupleName: string
  city: string
  templateName: string
  templateId?: string
  eventDate?: string
  rating: number
  comment: string
  date: string
  avatar: string
  verified?: boolean
}

export interface FaqItem {
  question: string
  answer: string
}

export interface TemplateItem {
  id: string
  name: string
  slug: string
  eventType?: EventType
  category: 'floral' | 'adat' | 'luxury' | 'dark' | 'pastel' | 'islamic' | 'kids' | 'formal'
  categoryLabel: string
  price: number
  originalPrice: number
  badge?: string
  isPopular?: boolean
  thumbnail: string
  coverImage: string
  heroImage: string
  description: string
  features: string[]
  openingType:
    | 'wax-seal'
    | 'gunungan-split'
    | 'curtain-split'
    | 'celestial-orbit'
    | 'kraft-vintage'
    | 'peony-wreath'
    | 'islamic-arch'
    | 'gift-box'
    | 'baby-ribbon'
    | 'diploma-scroll'
  particleType:
    | 'petals'
    | 'gold-dust'
    | 'none'
    | 'stars'
    | 'autumn-leaves'
    | 'sakura'
    | 'confetti'
    | 'balloons'
  defaultSongTitle: string
  defaultSongSrc: string
  eventMeta?: {
    primaryTitle: string
    secondaryTitle?: string
    parentsOrHost?: string
    dateText: string
    venueText: string
  }
  sampleCouple: {
    groomShort: string
    groomFull: string
    groomParents: string
    groomPhoto: string
    brideShort: string
    brideFull: string
    brideParents: string
    bridePhoto: string
    dateText: string
    venueText: string
  }
  themeColors: {
    primaryBg: string
    cardBg: string
    accentHex: string
    secondaryHex: string
    textDark: string
    badgeBg: string
    filterStyle?: string
  }
}

export interface CustomOrderData {
  // Step 1: Paket & Pemesan
  templateId: string
  packageId: string
  buyerName: string
  buyerPhone: string
  buyerNotes: string
  // Step 2: Data Pengantin & Acara
  groomFullName: string
  groomShortName: string
  groomParents: string
  groomIg: string
  brideFullName: string
  brideShortName: string
  brideParents: string
  brideIg: string
  akadDate: string
  akadTime: string
  akadVenue: string
  resepsiDate: string
  resepsiTime: string
  resepsiVenue: string
  // Fleksibel Multi-Event
  celebrantName?: string
  celebrantNickname?: string
  celebrantAge?: string
  parentsName?: string
  institutionName?: string
  degreeTitle?: string
  eventDate?: string
  eventTime?: string
  eventVenue?: string
  khitanChildFullName?: string
  khitanChildShortName?: string
  khitanParents?: string
  birthdayCelebrantName?: string
  birthdayAge?: string
  birthdayDresscode?: string
  aqiqahBabyName?: string
  aqiqahParents?: string
  aqiqahBirthStats?: string
  gradInstitution?: string
  gradFacultyOrMajor?: string
  gradDegreeTitle?: string
  // Lokasi & Media
  mapsAddress: string
  mapsLink: string
  musicChoice: string
  giftBankInfo: string
  photoDriveLink: string
  // Step 3: Pembayaran
  paymentMethodId: string
}

export const storeConfig = {
  brand: {
    name: "JanjiSuci.id",
    companyName: "JanjiSuci Digital Studio",
    tagline: "Platform Undangan Digital Segala Acara & Pernikahan Premium",
    subTagline: "Wujudkan undangan online impianmu yang elegan dan interaktif. Input data praktis 5 menit via formulir, pengerjaan kilat 1–4 jam (VIP Express) atau maksimal 24 jam (Reguler) langsung rapi siap disebar ke ribuan tamu!",
    whatsappNumber: "6289619774116",
    whatsappDisplay: "0896-1977-4116",
    email: "halo@janjisuci.web.id",
    address: "Jl. Pandanaran No. 88, Pleburan, Semarang Selatan, Kota Semarang, Jawa Tengah 50241",
    instagram: "@janjisuci.id",
    workingHours: "Senin – Minggu (08.00 – 22.00 WIB)",
    accountHolder: "Bagas Adi (Founder & Owner JanjiSuci)"
  },

  promo: {
    badge: "PROMO FLASH SALE HINGGA 45% 🔥",
    title: "Promo Terbatas Minggu Ini • Diskon Langsung Mulai Rp 59.000 s/d Rp 99.000 (Hemat s/d Rp 80.000)!",
    voucherCode: "JANJISUCIHEMAT",
    expiryText: "Berlaku khusus minggu ini s/d Minggu malam",
    discountPercent: 45
  },

  paymentMethods: [
    {
      id: "gopay",
      name: "GoPay",
      type: "ewallet" as const,
      number: "089619774116",
      holder: "Bagas Adi (JanjiSuci Studio)",
      badgeColor: "from-sky-500 to-cyan-600",
      instructions: "Transfer saldo GoPay ke nomor 0896-1977-4116 a.n. Bagas Adi lalu simpan bukti pembayaran."
    },
    {
      id: "shopeepay",
      name: "ShopeePay",
      type: "ewallet" as const,
      number: "089619774116",
      holder: "Bagas Adi (JanjiSuci Studio)",
      badgeColor: "from-orange-500 to-red-500",
      instructions: "Transfer saldo ShopeePay ke nomor 0896-1977-4116 a.n. Bagas Adi lalu simpan bukti pembayaran."
    },
    {
      id: "dana",
      name: "DANA",
      type: "ewallet" as const,
      number: "089619774116",
      holder: "Bagas Adi (JanjiSuci Studio)",
      badgeColor: "from-blue-500 to-indigo-600",
      instructions: "Transfer saldo DANA ke nomor 0896-1977-4116 a.n. Bagas Adi lalu simpan bukti pembayaran."
    },
    {
      id: "bca",
      name: "Bank BCA / Transfer Bank",
      type: "ewallet" as const,
      number: "089619774116",
      holder: "Bagas Adi (JanjiSuci Studio)",
      badgeColor: "from-emerald-600 to-teal-700",
      instructions: "Transfer bank atau Virtual Account ke 0896-1977-4116 a.n. Bagas Adi (JanjiSuci Studio)."
    }
  ] satisfies PaymentMethod[],

  pricingTiers: [
    {
      id: "paket-hemat",
      name: "Paket Hemat",
      price: 75000,
      originalPrice: 130000,
      badge: "Ekonomis",
      isPopular: false,
      description: "Cocok untuk acara akad atau syukuran pernikahan yang simpel dan hangat.",
      features: [
        "Bebas Pilih Semua Tema Katalog",
        "Kuota Nama Tamu Tak Terbatas",
        "Masa Aktif Undangan 3 Bulan",
        "Musik Latar Indonesia Otomatis",
        "Navigasi Peta Google Maps & Kalender",
        "Hitung Mundur (Countdown Timer)",
        "Maksimal 4 Foto Galeri Prewedding",
        "Gratis 2x Revisi Data"
      ]
    },
    {
      id: "paket-exclusive",
      name: "Paket Exclusive",
      price: 99000,
      originalPrice: 180000,
      badge: "Paling Laris 🔥",
      isPopular: true,
      description: "Pilihan favorit pasangan! Fitur paling lengkap untuk resepsi megah dan berkesan.",
      features: [
        "Semua Fitur Paket Hemat",
        "Masa Aktif Undangan 1 Tahun Penuh",
        "Fitur Amplop Digital (Rekening & QRIS)",
        "Buku Tamu & RSVP Konfirmasi Kehadiran",
        "Timeline Kisah Cinta (Love Story)",
        "Maksimal 10 Foto Galeri + Lightbox",
        "Tools Generator Nama Tamu WhatsApp",
        "Gratis Revisi Data Sepuasnya"
      ]
    },
    {
      id: "paket-vip",
      name: "Paket Royal VIP",
      price: 139000,
      originalPrice: 250000,
      badge: "Terima Beres 👑",
      isPopular: false,
      description: "Layanan prioritas VIP. Anda cukup kirim data di WA, tim kami yang kerjakan semuanya!",
      features: [
        "Semua Fitur Paket Exclusive",
        "Masa Aktif Undangan Selamanya",
        "TERIMA BERES (Dibantu Input Data & Foto)",
        "Pengerjaan Prioritas Ekspres (1–3 Jam Jadi)",
        "Bebas Request Lagu Backsound Khusus",
        "Galeri Foto & Video Tanpa Batas",
        "Dibuatkan Ratusan Link Nama Tamu Siap Sebar",
        "Support Prioritas Admin 24/7"
      ]
    }
  ] satisfies PricingTier[],

  eventPricingTiers: [
    {
      id: "paket-syukuran-hemat",
      name: "Paket Syukuran Hemat",
      price: 59000,
      originalPrice: 110000,
      badge: "Paling Hemat ⚡",
      isPopular: false,
      description: "Pilihan pas untuk tasyakuran khitan, ulang tahun anak, aqiqah, dan wisuda keluarga.",
      features: [
        "Desain Responsif HP & Laptop",
        "Masa Aktif Undangan 6 Bulan",
        "Peta Petunjuk Arah Google Maps",
        "Formulir RSVP Konfirmasi Tamu",
        "Rekening Kado / Amplop Digital",
        "Gratis Revisi Data 3x"
      ]
    },
    {
      id: "paket-syukuran-exclusive",
      name: "Paket Syukuran Exclusive",
      price: 79000,
      originalPrice: 150000,
      badge: "Paling Laris ⭐",
      isPopular: true,
      description: "Paket terpopuler untuk pesta ultah meriah, tasyakuran aqiqah, dan wisuda lengkap.",
      features: [
        "Semua Fitur Paket Hemat",
        "Masa Aktif Undangan 1 Tahun",
        "Bebas Request Lagu Backsound",
        "Galeri Foto Kenangan Tanpa Batas",
        "Buku Ucapan & Doa Interaktif",
        "Tools Generator Nama Tamu WhatsApp",
        "Gratis Revisi Data Sepuasnya"
      ]
    },
    {
      id: "paket-syukuran-vip",
      name: "Paket Syukuran VIP",
      price: 119000,
      originalPrice: 210000,
      badge: "Terima Beres 👑",
      isPopular: false,
      description: "Layanan prioritas kilat (1–3 jam jadi). Anda cukup kirim data di WhatsApp, tim kami yang kerjakan semuanya!",
      features: [
        "Semua Fitur Paket Exclusive",
        "Masa Aktif Undangan Selamanya",
        "TERIMA BERES (Dibantu Input Foto & Teks)",
        "Pengerjaan Kilat Prioritas (< 3 Jam Jadi)",
        "Bebas Request Lagu Backsound Khusus",
        "Dibuatkan Ratusan Link Nama Tamu Siap Sebar",
        "Support Prioritas Admin 24/7"
      ]
    }
  ] satisfies PricingTier[],

  templates: [
    {
      id: "botanical-sage",
      name: "Botanical Sage & Gold",
      slug: "botanical-sage",
      eventType: "wedding",
      category: "floral",
      categoryLabel: "Bunga & Alam",
      price: 99000,
      originalPrice: 180000,
      badge: "Terlaris ⭐",
      isPopular: true,
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=85",
      description: "Perpaduan warna hijau sage alami, cream gading, dan ornamen emas dengan segel lilin 3D yang menenangkan.",
      features: ["Segel Lilin 3D", "Animasi Kelopak Bunga", "Lagu Payung Teduh - Akad", "Dual-Column Desktop"],
      openingType: "wax-seal",
      particleType: "petals",
      defaultSongTitle: "Payung Teduh - Akad",
      defaultSongSrc: "/audio/payung-teduh-akad.mp3",
      sampleCouple: {
        groomShort: "Rian",
        groomFull: "M. Arrian Mahendra, S.T.",
        groomParents: "Bpk. Hendra Mahendra & Ibu Siti Rahmawati",
        groomPhoto: "https://images.unsplash.com/photo-1766104798125-314e9659cf5a?auto=format&fit=crop&w=800&q=80",
        brideShort: "Sarah",
        brideFull: "Sarah Az-Zahra, S.Psi.",
        brideParents: "Bpk. H. Ahmad Dahlan & Ibu Hj. Fatimah Zahra",
        bridePhoto: "https://images.unsplash.com/photo-1693074445833-0fdce5f1f29f?auto=format&fit=crop&w=800&q=80",
        dateText: "Minggu, 20 Oktober 2027",
        venueText: "Masjid Agung & Hotel Ciputra Semarang"
      },
      themeColors: {
        primaryBg: "#FAF7F2",
        cardBg: "rgba(255, 255, 255, 0.92)",
        accentHex: "#92400E",
        secondaryHex: "#7D8C7C",
        textDark: "#292524",
        badgeBg: "#FEF3C7"
      }
    },
    {
      id: "royal-java",
      name: "Royal Javanese Heritage",
      slug: "royal-java",
      eventType: "wedding",
      category: "adat",
      categoryLabel: "Adat Nusantara",
      price: 99000,
      originalPrice: 180000,
      badge: "Adat Keraton 👑",
      isPopular: true,
      thumbnail: "https://images.unsplash.com/photo-1749883530078-2d9096c93da3?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1749883530078-2d9096c93da3?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1749883530078-2d9096c93da3?auto=format&fit=crop&w=900&q=85",
      description: "Kemegahan nuansa adat Jawa/Nusantara dengan sentuhan warna cokelat sogan, krem keraton, dan ukiran emas klasik.",
      features: ["Nuansa Adat Sakral", "Bingkai Kubah Emas", "RSVP & Amplop Digital", "Backsound Romantis"],
      openingType: "gunungan-split",
      particleType: "gold-dust",
      defaultSongTitle: "Payung Teduh - Akad",
      defaultSongSrc: "/audio/payung-teduh-akad.mp3",
      sampleCouple: {
        groomShort: "Bagus",
        groomFull: "R. Bagus Suryo Ningrat, S.E.",
        groomParents: "Bpk. K.R.T. Suryo Diningrat & Ibu R.A. Sekar Arum",
        groomPhoto: "https://images.unsplash.com/photo-1749883530078-2d9096c93da3?auto=format&fit=crop&crop=left&w=800&h=800&q=85",
        brideShort: "Ayu",
        brideFull: "Roro Ayu Wandira, S.Ked.",
        brideParents: "Bpk. Drs. Bambang Wijaya & Ibu Sri Lestari",
        bridePhoto: "https://images.unsplash.com/photo-1749883530078-2d9096c93da3?auto=format&fit=crop&crop=right&w=800&h=800&q=85",
        dateText: "Sabtu, 14 November 2027",
        venueText: "Pendopo Agung Royal Ambarrukmo Yogyakarta"
      },
      themeColors: {
        primaryBg: "#F5EFE6",
        cardBg: "rgba(255, 252, 247, 0.94)",
        accentHex: "#78350F",
        secondaryHex: "#B45309",
        textDark: "#1C1917",
        badgeBg: "#FDE68A"
      }
    },
    {
      id: "luxury-champagne",
      name: "Modern Luxury Champagne",
      slug: "luxury-champagne",
      eventType: "wedding",
      category: "luxury",
      categoryLabel: "Kemewahan Modern",
      price: 99000,
      originalPrice: 180000,
      badge: "Editorial VIP ✨",
      isPopular: true,
      thumbnail: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=85",
      description: "Desain ala majalah high-fashion dengan palet warna champagne gold, pearl white, dan tipografi serif berkelas.",
      features: ["Gaya Editorial Mewah", "Kartu ATM Metalik", "Galeri Lightbox HD", "Countdown Presisi"],
      openingType: "curtain-split",
      particleType: "none",
      defaultSongTitle: "Payung Teduh - Berdua Saja",
      defaultSongSrc: "/audio/berdua-saja.mp3",
      sampleCouple: {
        groomShort: "Kevin",
        groomFull: "Kevin Alexander Wijaya, B.Bus.",
        groomParents: "Bpk. Haryanto Wijaya & Ibu Veronica Tan",
        groomPhoto: "https://images.unsplash.com/photo-1766104798125-314e9659cf5a?auto=format&fit=crop&w=800&q=80",
        brideShort: "Clarissa",
        brideFull: "Clarissa Aurelia Putri, M.B.A.",
        brideParents: "Bpk. Irwan Setiawan & Ibu Diana Kusuma",
        bridePhoto: "https://images.unsplash.com/photo-1693074445833-0fdce5f1f29f?auto=format&fit=crop&w=800&q=80",
        dateText: "Minggu, 06 Desember 2027",
        venueText: "The Langham Grand Ballroom Jakarta"
      },
      themeColors: {
        primaryBg: "#F8F6F4",
        cardBg: "rgba(255, 255, 255, 0.95)",
        accentHex: "#854D0E",
        secondaryHex: "#A16207",
        textDark: "#18181B",
        badgeBg: "#FEF08A"
      }
    },
    {
      id: "celestial-night",
      name: "Celestial Midnight Star",
      slug: "celestial-night",
      eventType: "wedding",
      category: "dark",
      categoryLabel: "Malam Elegan",
      price: 99000,
      originalPrice: 180000,
      badge: "Malam Bintang 🌙",
      isPopular: false,
      thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=85",
      description: "Pesona romantis malam berbintang dengan perpaduan warna navy klasik, warm ivory, dan kilau cahaya keemasan.",
      features: ["Nuansa Intimate Night", "Ornamen Bintang & Bunga", "Musik Latar Syahdu", "Buku Tamu Interaktif"],
      openingType: "celestial-orbit",
      particleType: "stars",
      defaultSongTitle: "Payung Teduh - Berdua Saja",
      defaultSongSrc: "/audio/berdua-saja.mp3",
      sampleCouple: {
        groomShort: "Reza",
        groomFull: "Dr. Reza Pahlevi, Sp.JP",
        groomParents: "Bpk. Prof. Dr. Lukman Hakim & Ibu Dra. Ratna Sari",
        groomPhoto: "https://images.unsplash.com/photo-1766104798125-314e9659cf5a?auto=format&fit=crop&w=800&q=80",
        brideShort: "Nadia",
        brideFull: "drg. Nadia Safitri",
        brideParents: "Bpk. Ir. Ridwan Kamiludin & Ibu Laila Majnun",
        bridePhoto: "https://images.unsplash.com/photo-1693074445833-0fdce5f1f29f?auto=format&fit=crop&w=800&q=80",
        dateText: "Sabtu, 23 Januari 2027",
        venueText: "Glass House The Papandayan Bandung"
      },
      themeColors: {
        primaryBg: "#F4F5F7",
        cardBg: "rgba(255, 255, 255, 0.92)",
        accentHex: "#1E3A8A",
        secondaryHex: "#B45309",
        textDark: "#0F172A",
        badgeBg: "#DBEAFE"
      }
    },
    {
      id: "rustic-terracotta",
      name: "Rustic Terracotta Boho",
      slug: "rustic-terracotta",
      eventType: "wedding",
      category: "floral",
      categoryLabel: "Bunga & Alam",
      price: 99000,
      originalPrice: 180000,
      badge: "Harga Promo 🍂",
      isPopular: false,
      thumbnail: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=85",
      description: "Kehangatan warna bumi terracotta, bunga kering bohemian, dan nuansa senja yang akrab serta estetik.",
      features: ["Palet Warm Terracotta", "Gaya Garden Party", "Peta & Kalender Instan", "Mobile Friendly"],
      openingType: "kraft-vintage",
      particleType: "autumn-leaves",
      defaultSongTitle: "Payung Teduh - Akad",
      defaultSongSrc: "/audio/payung-teduh-akad.mp3",
      sampleCouple: {
        groomShort: "Dimas",
        groomFull: "Dimas Anggara Putra, S.Kom.",
        groomParents: "Bpk. Agus Salim & Ibu Ningsih",
        groomPhoto: "https://images.unsplash.com/photo-1766104798125-314e9659cf5a?auto=format&fit=crop&w=800&q=80",
        brideShort: "Kirana",
        brideFull: "Kirana Larasati, S.Ds.",
        brideParents: "Bpk. Joko Susilo & Ibu Endang",
        bridePhoto: "https://images.unsplash.com/photo-1693074445833-0fdce5f1f29f?auto=format&fit=crop&w=800&q=80",
        dateText: "Minggu, 14 Februari 2027",
        venueText: "Pine Forest Camp Lembang"
      },
      themeColors: {
        primaryBg: "#FDF6F0",
        cardBg: "rgba(255, 255, 255, 0.92)",
        accentHex: "#9A3412",
        secondaryHex: "#C2410C",
        textDark: "#27272A",
        badgeBg: "#FFEDD5"
      }
    },
    {
      id: "blush-peony",
      name: "Romantic Blush Peony",
      slug: "blush-peony",
      eventType: "wedding",
      category: "pastel",
      categoryLabel: "Pastel Romantis",
      price: 99000,
      originalPrice: 180000,
      badge: "Bunga Manis 🌸",
      isPopular: false,
      thumbnail: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=900&q=85",
      description: "Kelembutan kelopak bunga peony merah muda (blush pink) dipadukan dengan rose gold yang manis dan romantis.",
      features: ["Efek Kelopak Sakura", "Nuansa Dusty Pink", "Polaroid Love Story", "Amplop Cashless"],
      openingType: "peony-wreath",
      particleType: "sakura",
      defaultSongTitle: "Payung Teduh - Akad",
      defaultSongSrc: "/audio/payung-teduh-akad.mp3",
      sampleCouple: {
        groomShort: "Fajar",
        groomFull: "M. Fajar Siddiq, S.Ars.",
        groomParents: "Bpk. H. Sulaiman & Ibu Hj. Maryam",
        groomPhoto: "https://images.unsplash.com/photo-1766104798125-314e9659cf5a?auto=format&fit=crop&w=800&q=80",
        brideShort: "Aisyah",
        brideFull: "Aisyah Humaira, S.Farm.",
        brideParents: "Bpk. H. Yusuf Mansur & Ibu Hj. Khadijah",
        bridePhoto: "https://images.unsplash.com/photo-1693074445833-0fdce5f1f29f?auto=format&fit=crop&w=800&q=80",
        dateText: "Sabtu, 02 Mei 2027",
        venueText: "Masjid Al-Akbar & Sheraton Surabaya"
      },
      themeColors: {
        primaryBg: "#FFF8F9",
        cardBg: "rgba(255, 255, 255, 0.93)",
        accentHex: "#9D174D",
        secondaryHex: "#BE185D",
        textDark: "#3F3F46",
        badgeBg: "#FCE7F3"
      }
    },
    {
      id: "royal-midnight",
      name: "Royal Midnight Gold",
      slug: "royal-midnight",
      eventType: "wedding",
      category: "dark",
      categoryLabel: "Malam Elegan",
      price: 139000,
      originalPrice: 250000,
      badge: "Eksklusif VIP ✨",
      isPopular: true,
      thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85",
      description: "Desain romantis malam berbintang dengan sentuhan emas klasik, kartu debit ATM BNI, dan lantunan lagu Maher Zain yang syahdu.",
      features: ["Ornamen Midnight Emas", "Kartu Debit ATM BNI", "Lagu Maher Zain", "Kubah Lengkung Artistik"],
      openingType: "celestial-orbit",
      particleType: "stars",
      defaultSongTitle: "Maher Zain - For The Rest of My Life",
      defaultSongSrc: "https://dev.apdesignku.com/wp-content/uploads/2025/06/Maher-Zain-For-The-Rest-of-My-Life.mp3",
      sampleCouple: {
        groomShort: "Faris",
        groomFull: "Faris Pratama, S.T.",
        groomParents: "Bpk. H. Bambang Pratama & Ibu Hj. Rina Wulandari",
        groomPhoto: "https://images.unsplash.com/photo-1766104798125-314e9659cf5a?auto=format&fit=crop&w=800&q=80",
        brideShort: "Alisha",
        brideFull: "Alisha Zahra, S.Farm.",
        brideParents: "Bpk. H. Irwan Gunawan & Ibu Hj. Ratna Sari",
        bridePhoto: "https://images.unsplash.com/photo-1693074445833-0fdce5f1f29f?auto=format&fit=crop&w=800&q=80",
        dateText: "Sabtu, 28 November 2027",
        venueText: "Grand Ballroom Hotel Mulia Senayan, Jakarta"
      },
      themeColors: {
        primaryBg: "#0A0A0A",
        cardBg: "rgba(20, 20, 20, 0.95)",
        accentHex: "#D7BB83",
        secondaryHex: "#B99A5C",
        textDark: "#FFFCF3",
        badgeBg: "rgba(215, 187, 131, 0.2)"
      }
    },
    {
      id: "exclusive-navy",
      name: "Exclusive Royal Navy",
      slug: "exclusive-navy",
      eventType: "wedding",
      category: "luxury",
      categoryLabel: "Kemewahan Modern",
      price: 99000,
      originalPrice: 180000,
      badge: "Koleksi Terbaru 💙",
      isPopular: true,
      thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
      description: "Kemewahan biru navy royal dipadukan aksen emas murni, bingkai kubah pengantin, dan lantunan syahdu Penjaga Hati - Nadhif Basalamah.",
      features: ["Lagu Nadhif Basalamah", "Bingkai Kubah Royal Arch", "Kartu Rekening BCA & Mandiri", "Live Streaming Instagram"],
      openingType: "curtain-split",
      particleType: "gold-dust",
      defaultSongTitle: "Nadhif Basalamah - Penjaga Hati",
      defaultSongSrc: "https://undanganwebkami.id/wp-content/uploads/2025/07/yt1s.com-nadhif-basalamah-penjaga-hati-Official-Lyric-Video.mp3",
      sampleCouple: {
        groomShort: "Yoga",
        groomFull: "Yoga Ardiansyah, S.Kom.",
        groomParents: "Bpk. Ichsan & Ibu Susilowati",
        groomPhoto: "https://images.unsplash.com/photo-1766104798125-314e9659cf5a?auto=format&fit=crop&w=800&q=80",
        brideShort: "Nabilah",
        brideFull: "Nabilah Putri Kusuma, S.Pd.",
        brideParents: "Bpk. Ichsan & Ibu Susilowati",
        bridePhoto: "https://images.unsplash.com/photo-1693074445833-0fdce5f1f29f?auto=format&fit=crop&w=800&q=80",
        dateText: "Sabtu, 20 Desember 2025",
        venueText: "Grand Ballroom Margonda, Depok"
      },
      themeColors: {
        primaryBg: "#07101E",
        cardBg: "rgba(15, 34, 58, 0.95)",
        accentHex: "#F59E0B",
        secondaryHex: "#3B82F6",
        textDark: "#FFFFFF",
        badgeBg: "rgba(245, 158, 11, 0.2)"
      }
    },
    {
      id: "royal-khitan",
      name: "Royal Barakah Khitan",
      slug: "royal-khitan",
      eventType: "khitan",
      category: "islamic",
      categoryLabel: "Tasyakuran Khitan",
      price: 79000,
      originalPrice: 150000,
      badge: "Tasyakuran Khitan ✂️",
      isPopular: true,
      thumbnail: "https://images.unsplash.com/photo-1720238281687-dcc6d8a6e7d4?auto=format&fit=crop&crop=top,right&w=800&h=800&q=85",
      coverImage: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1720238281687-dcc6d8a6e7d4?auto=format&fit=crop&crop=top,right&w=900&h=900&q=85",
      description: "Nuansa islami hijau zamrud dipadukan ornamen kubah emas, kaligrafi Walimatul Khitan, doa anak sholeh, dan tabungan kado khitan.",
      features: ["Pintu Kubah Islami 3D", "Doa Anak Sholeh", "Tabungan Kado Khitan", "Lagu Religi Syahdu"],
      openingType: "islamic-arch",
      particleType: "gold-dust",
      defaultSongTitle: "Maher Zain - For The Rest of My Life",
      defaultSongSrc: "https://dev.apdesignku.com/wp-content/uploads/2025/06/Maher-Zain-For-The-Rest-of-My-Life.mp3",
      eventMeta: {
        primaryTitle: "Muhammad Rizky Pratama",
        secondaryTitle: "Walimatul Khitan",
        parentsOrHost: "Bpk. Hendra Gunawan & Ibu Dian Sastro",
        dateText: "Minggu, 12 Juli 2027",
        venueText: "Gedung Pertemuan Al-Ikhlas, Semarang"
      },
      sampleCouple: {
        groomShort: "Kiki",
        groomFull: "Muhammad Rizky Pratama",
        groomParents: "Bpk. Hendra Gunawan & Ibu Dian Sastro",
        groomPhoto: "https://images.unsplash.com/photo-1720238281687-dcc6d8a6e7d4?auto=format&fit=crop&crop=top,right&w=800&h=800&q=85",
        brideShort: "Khitan",
        brideFull: "Walimatul Khitan",
        brideParents: "Putra tercinta dari Bpk. Hendra & Ibu Dian",
        bridePhoto: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80",
        dateText: "Minggu, 12 Juli 2027",
        venueText: "Gedung Pertemuan Al-Ikhlas, Semarang"
      },
      themeColors: {
        primaryBg: "#032219",
        cardBg: "rgba(6, 46, 35, 0.95)",
        accentHex: "#F59E0B",
        secondaryHex: "#10B981",
        textDark: "#F0FDF4",
        badgeBg: "rgba(245, 158, 11, 0.2)"
      }
    },
    {
      id: "confetti-birthday",
      name: "Confetti Pop Birthday",
      slug: "confetti-birthday",
      eventType: "birthday",
      category: "kids",
      categoryLabel: "Pesta Ulang Tahun",
      price: 79000,
      originalPrice: 150000,
      badge: "Ulang Tahun Ceria 🎂",
      isPopular: true,
      thumbnail: "https://images.unsplash.com/photo-1544155891-969f15a055d3?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1544155891-969f15a055d3?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1544155891-969f15a055d3?auto=format&fit=crop&w=900&q=85",
      description: "Warna-warni ceria dengan animasi kotak kado 3D pita terbuka yang meletuskan confetti, kartu dresscode pesta, dan RSVP konfirmasi anak.",
      features: ["Letusan Confetti 3D", "Info Dresscode Pesta", "RSVP Anak & Pendamping", "Kado Mainan Fisik"],
      openingType: "gift-box",
      particleType: "confetti",
      defaultSongTitle: "Payung Teduh - Berdua Saja",
      defaultSongSrc: "/audio/berdua-saja.mp3",
      eventMeta: {
        primaryTitle: "Hayden Arvy",
        secondaryTitle: "Turning 5th Birthday Party!",
        parentsOrHost: "Bpk. Kevin & Ibu Aurel",
        dateText: "Sabtu, 15 Agustus 2027",
        venueText: "Fun World Ballroom, Mall Kelapa Gading Jakarta"
      },
      sampleCouple: {
        groomShort: "Hayden",
        groomFull: "Hayden Arvy Kusuma",
        groomParents: "Putra ceria dari Bpk. Kevin & Ibu Aurel",
        groomPhoto: "https://images.unsplash.com/photo-1544155891-969f15a055d3?auto=format&fit=crop&w=800&q=80",
        brideShort: "5 Tahun",
        brideFull: "5th Birthday Bash",
        brideParents: "Dresscode: Colourful & Superhero",
        bridePhoto: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80",
        dateText: "Sabtu, 15 Agustus 2027",
        venueText: "Fun World Ballroom, Mall Kelapa Gading Jakarta"
      },
      themeColors: {
        primaryBg: "#0F172A",
        cardBg: "rgba(30, 41, 59, 0.95)",
        accentHex: "#EC4899",
        secondaryHex: "#38BDF8",
        textDark: "#FFFFFF",
        badgeBg: "rgba(236, 72, 153, 0.2)"
      }
    },
    {
      id: "little-star-aqiqah",
      name: "Little Star Aqiqah & Tasmiyah",
      slug: "little-star-aqiqah",
      eventType: "aqiqah",
      category: "pastel",
      categoryLabel: "Tasyakuran Aqiqah",
      price: 79000,
      originalPrice: 150000,
      badge: "Kelahiran Bayi 👶",
      isPopular: false,
      thumbnail: "https://images.unsplash.com/photo-1656633702381-939966720da4?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1656633702381-939966720da4?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1656633702381-939966720da4?auto=format&fit=crop&w=900&q=85",
      description: "Kelembutan warna pastel cream dan soft blue bertabur awan dan bintang keemasan, lengkap dengan biodata lahir bayi (BB & PB) dan doa tasmiyah.",
      features: ["Kartu Biodata Lahir BB/PB", "Doa Keberkahan Bayi", "Rangkaian Cukur Rambut", "Kado Perlengkapan Bayi"],
      openingType: "baby-ribbon",
      particleType: "stars",
      defaultSongTitle: "Payung Teduh - Akad",
      defaultSongSrc: "/audio/payung-teduh-akad.mp3",
      eventMeta: {
        primaryTitle: "Kinan Althafunnisa",
        secondaryTitle: "Tasyakuran Aqiqah & Tasmiyah",
        parentsOrHost: "Bpk. Irfan Hakim & Ibu Annisa Larasati",
        dateText: "Minggu, 24 Mei 2027",
        venueText: "Kediaman Keluarga, Jl. Melati No. 12, Bandung"
      },
      sampleCouple: {
        groomShort: "Kinan",
        groomFull: "Kinan Althafunnisa",
        groomParents: "Putri pertama dari Bpk. Irfan & Ibu Annisa",
        groomPhoto: "https://images.unsplash.com/photo-1656633702381-939966720da4?auto=format&fit=crop&w=800&q=80",
        brideShort: "Aqiqah",
        brideFull: "Tasyakuran Kelahiran",
        brideParents: "BB: 3.2 kg | PB: 49 cm | Jam: 05.15 WIB",
        bridePhoto: "https://images.unsplash.com/photo-1641222113497-f1904803f654?auto=format&fit=crop&w=800&q=80",
        dateText: "Minggu, 24 Mei 2027",
        venueText: "Kediaman Keluarga, Jl. Melati No. 12, Bandung"
      },
      themeColors: {
        primaryBg: "#F8FAFC",
        cardBg: "rgba(255, 255, 255, 0.94)",
        accentHex: "#0284C7",
        secondaryHex: "#F59E0B",
        textDark: "#0F172A",
        badgeBg: "#E0F2FE"
      }
    },
    {
      id: "academic-elegance",
      name: "Academic Elegance Graduation",
      slug: "academic-elegance",
      eventType: "graduation",
      category: "formal",
      categoryLabel: "Wisuda & Kelulusan",
      price: 79000,
      originalPrice: 150000,
      badge: "Wisuda Akbar 🎓",
      isPopular: false,
      thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?auto=format&fit=crop&w=900&q=85",
      description: "Kemegahan prosesi wisuda dengan warna royal navy & gold akademik, tabung ijazah bergulir, rundown sidang senat terbuka, dan streaming YouTube.",
      features: ["Tabung Ijazah Bergulir", "Rundown Sidang Senat", "Tata Tertib Pendamping", "Streaming YouTube HD"],
      openingType: "diploma-scroll",
      particleType: "gold-dust",
      defaultSongTitle: "Payung Teduh - Berdua Saja",
      defaultSongSrc: "/audio/berdua-saja.mp3",
      eventMeta: {
        primaryTitle: "Universitas Indonesia",
        secondaryTitle: "Wisuda Program Sarjana & Pascasarjana Semester Genap",
        parentsOrHost: "Rektor & Senat Akademik Universitas Indonesia",
        dateText: "Sabtu, 19 September 2027",
        venueText: "Balairung UI, Kampus UI Depok"
      },
      sampleCouple: {
        groomShort: "Wisuda UI",
        groomFull: "Wisuda Sarjana & Magister UI",
        groomParents: "Sidang Terbuka Senat Akademik",
        groomPhoto: "https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?auto=format&fit=crop&w=800&q=80",
        brideShort: "Kelulusan",
        brideFull: "Tahun Akademik 2025/2027",
        brideParents: "Gedung Balairung UI, Depok",
        bridePhoto: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
        dateText: "Sabtu, 19 September 2027",
        venueText: "Balairung UI, Kampus UI Depok"
      },
      themeColors: {
        primaryBg: "#0B132B",
        cardBg: "rgba(28, 37, 65, 0.95)",
        accentHex: "#E0A96D",
        secondaryHex: "#48CAE4",
        textDark: "#FFFFFF",
        badgeBg: "rgba(224, 169, 109, 0.2)"
      }
    },
    {
      id: "jungle-safari-birthday",
      name: "Safari Adventure Kids",
      slug: "jungle-safari-birthday",
      eventType: "birthday",
      category: "kids",
      categoryLabel: "Ulang Tahun Anak",
      price: 79000,
      originalPrice: 150000,
      badge: "Favorit Anak 🦁",
      isPopular: true,
      thumbnail: "https://images.unsplash.com/photo-1772724317403-63337bf58fff?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1772724317403-63337bf58fff?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1772724317403-63337bf58fff?auto=format&fit=crop&w=900&q=85",
      description: "Petualangan hutan safari ceria dengan balon melayang, stiker satwa lucu, dresscode jungle explorer, dan mini games seru untuk anak.",
      features: ["Balon Melayang Interaktif", "Stiker Satwa Safari Ceria", "Info Dresscode Explorer", "RSVP Menu Anak & Games"],
      openingType: "gift-box",
      particleType: "balloons",
      defaultSongTitle: "Payung Teduh - Berdua Saja",
      defaultSongSrc: "/audio/berdua-saja.mp3",
      eventMeta: {
        primaryTitle: "Kenzo Dirgantara",
        secondaryTitle: "Turning 3rd Safari Explorer Party!",
        parentsOrHost: "Bpk. Aditya & Ibu Renata",
        dateText: "Minggu, 18 Oktober 2027",
        venueText: "Playground Safari Café, Kemang Jakarta Selatan"
      },
      sampleCouple: {
        groomShort: "Kenzo",
        groomFull: "Kenzo Dirgantara",
        groomParents: "Putra ceria dari Bpk. Aditya & Ibu Renata",
        groomPhoto: "https://images.unsplash.com/photo-1772724317403-63337bf58fff?auto=format&fit=crop&w=800&q=80",
        brideShort: "3 Tahun",
        brideFull: "Safari Explorer Party",
        brideParents: "Dresscode: Khaki, Green Safari & Explorer Hat",
        bridePhoto: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
        dateText: "Minggu, 18 Oktober 2027",
        venueText: "Playground Safari Café, Kemang Jakarta Selatan"
      },
      themeColors: {
        primaryBg: "#1C3121",
        cardBg: "rgba(35, 61, 41, 0.95)",
        accentHex: "#F59E0B",
        secondaryHex: "#84CC16",
        textDark: "#FEFCE8",
        badgeBg: "rgba(245, 158, 11, 0.2)"
      }
    },
    {
      id: "sweet-blossom-aqiqah",
      name: "Sweet Blossom Aqiqah Girl",
      slug: "sweet-blossom-aqiqah",
      eventType: "aqiqah",
      category: "pastel",
      categoryLabel: "Aqiqah Bayi Perempuan",
      price: 79000,
      originalPrice: 150000,
      badge: "Bayi Perempuan 🌸",
      isPopular: true,
      thumbnail: "https://images.unsplash.com/photo-1564172420073-e553c280b6f7?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1564172420073-e553c280b6f7?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1564172420073-e553c280b6f7?auto=format&fit=crop&w=900&q=85",
      description: "Nuansa lembut floral blush peach & rose gold untuk menyambut putri tercinta, dilengkapi kartu biodata kelahiran (BB/PB) dan doa tasmiyah.",
      features: ["Pita Sutra Pembuka 3D", "Kartu Biodata Lahir BB/PB", "Doa Tahnik & Tasmiyah", "Tanda Kasih Perlengkapan Bayi"],
      openingType: "baby-ribbon",
      particleType: "sakura",
      defaultSongTitle: "Payung Teduh - Akad",
      defaultSongSrc: "/audio/payung-teduh-akad.mp3",
      eventMeta: {
        primaryTitle: "Shafiyyah Almahyra",
        secondaryTitle: "Tasyakuran Aqiqah & Tasmiyah Putri Pertama",
        parentsOrHost: "Bpk. M. Zikri & Ibu Nabila Maharani",
        dateText: "Sabtu, 08 Agustus 2027",
        venueText: "Kediaman Keluarga, Jl. Cempaka Putih Timur No. 24, Jakarta Pusat"
      },
      sampleCouple: {
        groomShort: "Shafiyyah",
        groomFull: "Shafiyyah Almahyra",
        groomParents: "Putri pertama dari Bpk. Zikri & Ibu Nabila",
        groomPhoto: "https://images.unsplash.com/photo-1564172420073-e553c280b6f7?auto=format&fit=crop&w=800&q=80",
        brideShort: "Aqiqah",
        brideFull: "Tasyakuran Tasmiyah Putri",
        brideParents: "BB: 3.1 kg | PB: 48 cm | Jam: 06.30 WIB",
        bridePhoto: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80",
        dateText: "Sabtu, 08 Agustus 2027",
        venueText: "Kediaman Keluarga, Jl. Cempaka Putih Timur No. 24, Jakarta Pusat"
      },
      themeColors: {
        primaryBg: "#FFF7F7",
        cardBg: "rgba(255, 255, 255, 0.95)",
        accentHex: "#FB7185",
        secondaryHex: "#F43F5E",
        textDark: "#881337",
        badgeBg: "#FFE4E6"
      }
    },
    {
      id: "nusantara-khitan",
      name: "Nusantara Heritage Khitan",
      slug: "nusantara-khitan",
      eventType: "khitan",
      category: "adat",
      categoryLabel: "Khitan Adat Nusantara",
      price: 79000,
      originalPrice: 150000,
      badge: "Adat Nusantara ✂️",
      isPopular: false,
      thumbnail: "https://images.unsplash.com/photo-1720238281687-dcc6d8a6e7d4?auto=format&fit=crop&crop=top,right&w=800&h=800&q=85",
      coverImage: "https://images.unsplash.com/photo-1566559532224-6d65e9fc0f37?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1720238281687-dcc6d8a6e7d4?auto=format&fit=crop&crop=top,right&w=900&h=900&q=85",
      description: "Kehangatan tradisi Jawa & Nusantara dengan ornamen gunungan wayang anak, batik sogan keraton, doa walimah khitan, dan tabungan ananda.",
      features: ["Gunungan Wayang Split 3D", "Batik Sogan Keraton Sakral", "Celengan Tabungan Anak", "Rundown Syukuran Adat"],
      openingType: "gunungan-split",
      particleType: "gold-dust",
      defaultSongTitle: "Payung Teduh - Akad",
      defaultSongSrc: "/audio/payung-teduh-akad.mp3",
      eventMeta: {
        primaryTitle: "Raden Arya Danendra",
        secondaryTitle: "Tasyakuran Walimatul Khitan",
        parentsOrHost: "Bpk. R. Danang Suroso & Ibu Ayu Wardani",
        dateText: "Minggu, 06 September 2027",
        venueText: "Pendopo Sasana Krida, Jl. Malioboro No. 56, Yogyakarta"
      },
      sampleCouple: {
        groomShort: "Arya",
        groomFull: "Raden Arya Danendra",
        groomParents: "Putra tersayang dari Bpk. Danang & Ibu Ayu",
        groomPhoto: "https://images.unsplash.com/photo-1720238281687-dcc6d8a6e7d4?auto=format&fit=crop&crop=top,right&w=800&h=800&q=85",
        brideShort: "Khitan Adat",
        brideFull: "Walimatul Khitan Putra",
        brideParents: "Trah Dalem Keraton Surakarta Hadiningrat",
        bridePhoto: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80",
        dateText: "Minggu, 06 September 2027",
        venueText: "Pendopo Sasana Krida, Jl. Malioboro No. 56, Yogyakarta"
      },
      themeColors: {
        primaryBg: "#17120E",
        cardBg: "rgba(35, 27, 21, 0.95)",
        accentHex: "#D97706",
        secondaryHex: "#B45309",
        textDark: "#FFFBEB",
        badgeBg: "rgba(217, 119, 6, 0.2)"
      }
    },
    {
      id: "monochrome-grad",
      name: "Monochrome Studio Grad",
      slug: "monochrome-grad",
      eventType: "graduation",
      category: "formal",
      categoryLabel: "Wisuda Modern Minimalis",
      price: 79000,
      originalPrice: 150000,
      badge: "Modern Minimalis 🎓",
      isPopular: true,
      thumbnail: "https://images.unsplash.com/photo-1672839415384-95cdbcba77ee?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1672839415384-95cdbcba77ee?auto=format&fit=crop&w=900&q=85",
      description: "Gaya studio fotografi monokrom modern hitam-putih yang sleek, tipografi serif editorial, YouTube live stream, dan kartu ucapan apresiasi.",
      features: ["Gaya Studio Monokrom Sleek", "Tipografi Minimalis Editorial", "Streaming YouTube Resmi", "Kartu Tanda Kasih & Bunga"],
      openingType: "diploma-scroll",
      particleType: "none",
      defaultSongTitle: "Payung Teduh - Berdua Saja",
      defaultSongSrc: "/audio/berdua-saja.mp3",
      eventMeta: {
        primaryTitle: "Nadine Aulia, S.Ds.",
        secondaryTitle: "Wisuda Sarjana Desain Komunikasi Visual",
        parentsOrHost: "Institut Teknologi Bandung (ITB)",
        dateText: "Sabtu, 24 Oktober 2027",
        venueText: "Sasana Budaya Ganesa (Sabuga ITB), Bandung"
      },
      sampleCouple: {
        groomShort: "Nadine",
        groomFull: "Nadine Aulia, S.Ds.",
        groomParents: "Wisudawan Terbaik FSRD ITB",
        groomPhoto: "https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?auto=format&fit=crop&w=800&q=80",
        brideShort: "Wisuda ITB",
        brideFull: "Wisuda Sarjana ITB 2027",
        brideParents: "Sasana Budaya Ganesa (Sabuga), Bandung",
        bridePhoto: "https://images.unsplash.com/photo-1672839415384-95cdbcba77ee?auto=format&fit=crop&w=800&q=80",
        dateText: "Sabtu, 24 Oktober 2027",
        venueText: "Sasana Budaya Ganesa (Sabuga ITB), Bandung"
      },
      themeColors: {
        primaryBg: "#09090B",
        cardBg: "rgba(24, 24, 27, 0.95)",
        accentHex: "#FAFAFA",
        secondaryHex: "#A1A1AA",
        textDark: "#FAFAFA",
        badgeBg: "rgba(255, 255, 255, 0.15)"
      }
    }
  ] as TemplateItem[],

  testimonials: [
    {
      id: "t1",
      coupleName: "Bagus & Ayu",
      city: "Yogyakarta",
      templateName: "Royal Javanese Heritage",
      templateId: "royal-java",
      eventDate: "14 November 2027",
      rating: 5,
      comment: "Awalnya bingung cari undangan adat Jawa yang modern tapi tetap sakral. Pas nemu tema Royal Java di JanjiSuci.id, langsung jatuh cinta! Tamu-tamu sepuh pada kagum sama musik dan ornamen gunungannya.",
      date: "28 Oktober 2027",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      verified: true
    },
    {
      id: "t2",
      coupleName: "Kevin & Clarissa",
      city: "Jakarta Selatan",
      templateName: "Modern Luxury Champagne",
      templateId: "luxury-champagne",
      eventDate: "06 Desember 2027",
      rating: 5,
      comment: "Desain editorialnya beneran kayak majalah Vogue! Gak murahan sama sekali. Fitur amplop digitalnya kepake banget, tamu tinggal klik salin rekening atau scan QRIS. Adminnya juga ramah dan fast response di WhatsApp.",
      date: "15 Oktober 2027",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
      verified: true
    },
    {
      id: "t3",
      coupleName: "Dimas & Kirana",
      city: "Bandung",
      templateName: "Rustic Terracotta Boho",
      templateId: "rustic-terracotta",
      eventDate: "24 Oktober 2027",
      rating: 5,
      comment: "Konsep pernikahan outdoor kami di Lembang klop banget sama tema Terracotta ini. Foto-foto polaroid miringnya estetik parah. Harga 99rb tapi kualitasnya bintang lima!",
      date: "02 Oktober 2027",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      verified: true
    },
    {
      id: "t4",
      coupleName: "Faris Alamsyah & Keluarga",
      city: "Depok",
      templateName: "Academic Elegance UI",
      templateId: "academic-elegance",
      eventDate: "19 September 2027",
      rating: 5,
      comment: "Undangan wisuda kami jadi kelihatan sangat prestisius dan resmi. Fitur YouTube live streaming di dalam undangannya sangat membantu keluarga besar di luar kota untuk ikut menyaksikan sidang senat!",
      date: "24 September 2027",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      verified: true
    },
    {
      id: "t5",
      coupleName: "dr. Zikri & Nabila",
      city: "Jakarta Pusat",
      templateName: "Sweet Blossom Aqiqah",
      templateId: "sweet-blossom-aqiqah",
      eventDate: "08 Agustus 2027",
      rating: 5,
      comment: "Tasyakuran tasmiyah aqiqah putri pertama kami jadi terasa sangat anggun. Font kaligrafi dan ornamen bunganya sangat manis. Rekening kado digitalnya memudahkan saudara jauh mengirimkan doa dan tanda kasih.",
      date: "12 Agustus 2027",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      verified: true
    }
  ] satisfies TestimonialItem[],

  faqs: [
    {
      question: "Berapa lama proses pengerjaan undangan sampai siap disebar?",
      answer: "Pengisian formulir data acara hanya butuh waktu 5 menit. Setelah pembayaran & konfirmasi dikirim ke WhatsApp kami, tim desainer JanjiSuci.id langsung mengerjakan undangan Anda. Khusus Paket VIP Express (Terima Beres), pengerjaan kilat selesai dalam 1–3 jam! Untuk Paket Reguler (Hemat & Exclusive) selesai maksimal 1x24 jam rapi dan siap disebar ke ribuan tamu dengan jaminan revisi sampai puas."
    },
    {
      question: "Bagaimana sistem harga JanjiSuci? Apakah harga template dan paket terpisah?",
      answer: "TIDAK TERPISAH, SISTEM KAMI 100% ALL-IN & TRANSPARAN! Anda bebas memilih desain template mana saja di katalog kami tanpa biaya tambahan desain. Total tagihan akhir yang Anda bayar murni sesuai paket layanan yang dipilih (mulai Rp 59rb untuk acara syukuran dan Rp 75rb untuk pernikahan). Harga sudah mencakup lisensi desain, masa aktif domain link, backsound lagu, dan revisi."
    },
    {
      question: "Bagaimana cara menyetor data dan foto pernikahan / acara?",
      answer: "Sangat fleksibel! Anda bisa langsung melengkapi data pada formulir pemesanan interaktif di website ini, atau memilih opsi '⚡ Booking Slot Promo Dulu (Data Menyusul)' jika foto atau jadwal belum final. Anda bisa menyetorkan data teks dan foto kapan saja lewat chat WhatsApp Admin resmi kami di 0896-1977-4116."
    },
    {
      question: "Apakah data pribadi, nomor telepon, dan foto kami aman?",
      answer: "100% Dijamin Aman & Terlindungi. JanjiSuci Digital Studio berkomitmen penuh menjaga privasi Anda. Data pribadi mempelai/keluarga, nomor telepon tamu, catatan kado, dan foto tidak akan pernah disebarluaskan atau dijual kepada pihak ketiga manapun."
    },
    {
      question: "Apakah ada garansi uang kembali (refund)?",
      answer: "Ya, kami memberikan Garansi 100% Uang Kembali (Money-Back Guarantee) tanpa potongan jika pesanan undangan Anda gagal diselesaikan melewati batas waktu komitmen pengerjaan atau terdapat kendala teknis sistemik yang tidak dapat diselesaikan oleh tim teknis kami."
    },
    {
      question: "Bagaimana cara membuat link undangan khusus untuk masing-masing nama tamu?",
      answer: "Kami menyediakan fitur 'Generator Nama Tamu' gratis tanpa batas di website ini. Anda cukup memasukkan daftar nama kerabat/sahabat, dan sistem otomatis membuatkan link unik berpola '?to=Nama+Tamu' beserta draft teks pengantar WhatsApp siap kirim!"
    },
    {
      question: "Metode pembayaran apa saja yang resmi didukung?",
      answer: "Kami menerima transfer instan via GoPay, ShopeePay, DANA, dan Transfer Bank ke nomor 0896-1977-4116 atas nama resmi founder kami: Bagas Adi (JanjiSuci Digital Studio)."
    }
  ] satisfies FaqItem[]
}

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
