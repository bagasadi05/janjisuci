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
  rating: number
  comment: string
  date: string
  avatar: string
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
    tagline: "Platform Undangan Digital Segala Acara & Pernikahan Premium",
    subTagline: "Wujudkan undangan online impianmu untuk pernikahan, khitanan, ulang tahun, aqiqah, dan wisuda yang elegan, interaktif, dan siap sebar ke ribuan tamu dalam hitungan menit.",
    whatsappNumber: "6289619774116",
    whatsappDisplay: "0896-1977-4116",
    instagram: "@janjisuci.id",
    workingHours: "Senin – Minggu (08.00 – 22.00 WIB)"
  },

  paymentMethods: [
    {
      id: "gopay",
      name: "GoPay",
      type: "ewallet" as const,
      number: "089619774116",
      holder: "Admin JanjiSuci.id",
      badgeColor: "from-sky-500 to-cyan-600",
      instructions: "Transfer saldo GoPay ke nomor 0896-1977-4116 lalu screenshot bukti pembayaran."
    },
    {
      id: "shopeepay",
      name: "ShopeePay",
      type: "ewallet" as const,
      number: "089619774116",
      holder: "Admin JanjiSuci.id",
      badgeColor: "from-orange-500 to-red-500",
      instructions: "Transfer saldo ShopeePay ke nomor 0896-1977-4116 lalu screenshot bukti pembayaran."
    },
    {
      id: "dana",
      name: "DANA",
      type: "ewallet" as const,
      number: "089619774116",
      holder: "Admin JanjiSuci.id",
      badgeColor: "from-blue-500 to-indigo-600",
      instructions: "Transfer saldo DANA ke nomor 0896-1977-4116 lalu screenshot bukti pembayaran."
    }
  ] satisfies PaymentMethod[],

  pricingTiers: [
    {
      id: "paket-hemat",
      name: "Paket Hemat",
      price: 75000,
      originalPrice: 140000,
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
      price: 109000,
      originalPrice: 200000,
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
      price: 149000,
      originalPrice: 275000,
      badge: "Terima Beres 👑",
      isPopular: false,
      description: "Layanan prioritas VIP. Anda cukup kirim data di WA, tim kami yang kerjakan semuanya!",
      features: [
        "Semua Fitur Paket Exclusive",
        "Masa Aktif Undangan Selamanya",
        "TERIMA BERES (Dibantu Input Data & Foto)",
        "Pengerjaan Prioritas Ekspres (< 3 Jam Jadi)",
        "Bebas Request Lagu Backsound Khusus",
        "Galeri Foto & Video Tanpa Batas",
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
      originalPrice: 175000,
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
        groomPhoto: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        brideShort: "Sarah",
        brideFull: "Sarah Az-Zahra, S.Psi.",
        brideParents: "Bpk. H. Ahmad Dahlan & Ibu Hj. Fatimah Zahra",
        bridePhoto: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80",
        dateText: "Minggu, 20 Oktober 2026",
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
      price: 119000,
      originalPrice: 210000,
      badge: "Adat Keraton 👑",
      isPopular: true,
      thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85",
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
        groomPhoto: "https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&w=800&q=80",
        brideShort: "Ayu",
        brideFull: "Roro Ayu Wandira, S.Ked.",
        brideParents: "Bpk. Drs. Bambang Wijaya & Ibu Sri Lestari",
        bridePhoto: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
        dateText: "Sabtu, 14 November 2026",
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
      price: 139000,
      originalPrice: 250000,
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
        groomPhoto: "https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=800&q=80",
        brideShort: "Clarissa",
        brideFull: "Clarissa Aurelia Putri, M.B.A.",
        brideParents: "Bpk. Irwan Setiawan & Ibu Diana Kusuma",
        bridePhoto: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
        dateText: "Minggu, 06 Desember 2026",
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
      price: 115000,
      originalPrice: 200000,
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
        groomPhoto: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=800&q=80",
        brideShort: "Nadia",
        brideFull: "drg. Nadia Safitri",
        brideParents: "Bpk. Ir. Ridwan Kamiludin & Ibu Laila Majnun",
        bridePhoto: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&w=800&q=80",
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
      price: 75000,
      originalPrice: 145000,
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
        groomPhoto: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        brideShort: "Kirana",
        brideFull: "Kirana Larasati, S.Ds.",
        brideParents: "Bpk. Joko Susilo & Ibu Endang",
        bridePhoto: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80",
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
      price: 89000,
      originalPrice: 165000,
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
        groomPhoto: "https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&w=800&q=80",
        brideShort: "Aisyah",
        brideFull: "Aisyah Humaira, S.Farm.",
        brideParents: "Bpk. H. Yusuf Mansur & Ibu Hj. Khadijah",
        bridePhoto: "https://images.unsplash.com/photo-1583939411023-14783179e581?auto=format&fit=crop&w=800&q=80",
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
      price: 119000,
      originalPrice: 220000,
      badge: "Eksklusif VIP ✨",
      isPopular: true,
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
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
        groomPhoto: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        brideShort: "Alisha",
        brideFull: "Alisha Zahra, S.Farm.",
        brideParents: "Bpk. H. Irwan Gunawan & Ibu Hj. Ratna Sari",
        bridePhoto: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80",
        dateText: "Sabtu, 28 November 2026",
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
      price: 109000,
      originalPrice: 200000,
      badge: "Koleksi Terbaru 💙",
      isPopular: true,
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
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
        groomPhoto: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        brideShort: "Nabilah",
        brideFull: "Nabilah Putri Kusuma, S.Pd.",
        brideParents: "Bpk. Ichsan & Ibu Susilowati",
        bridePhoto: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80",
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
      price: 89000,
      originalPrice: 160000,
      badge: "Tasyakuran Khitan ✂️",
      isPopular: true,
      thumbnail: "https://images.unsplash.com/photo-1584281729288-89826acac5b0?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1584281729288-89826acac5b0?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1584281729288-89826acac5b0?auto=format&fit=crop&w=900&q=85",
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
        dateText: "Minggu, 12 Juli 2026",
        venueText: "Gedung Pertemuan Al-Ikhlas, Semarang"
      },
      sampleCouple: {
        groomShort: "Kiki",
        groomFull: "Muhammad Rizky Pratama",
        groomParents: "Bpk. Hendra Gunawan & Ibu Dian Sastro",
        groomPhoto: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
        brideShort: "Khitan",
        brideFull: "Walimatul Khitan",
        brideParents: "Putra tercinta dari Bpk. Hendra & Ibu Dian",
        bridePhoto: "https://images.unsplash.com/photo-1584281729288-89826acac5b0?auto=format&fit=crop&w=800&q=80",
        dateText: "Minggu, 12 Juli 2026",
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
      thumbnail: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=85",
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
        dateText: "Sabtu, 15 Agustus 2026",
        venueText: "Fun World Ballroom, Mall Kelapa Gading Jakarta"
      },
      sampleCouple: {
        groomShort: "Hayden",
        groomFull: "Hayden Arvy Kusuma",
        groomParents: "Putra ceria dari Bpk. Kevin & Ibu Aurel",
        groomPhoto: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
        brideShort: "5 Tahun",
        brideFull: "5th Birthday Bash",
        brideParents: "Dresscode: Colourful & Superhero",
        bridePhoto: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
        dateText: "Sabtu, 15 Agustus 2026",
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
      price: 85000,
      originalPrice: 155000,
      badge: "Kelahiran Bayi 👶",
      isPopular: false,
      thumbnail: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=85",
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
        dateText: "Minggu, 24 Mei 2026",
        venueText: "Kediaman Keluarga, Jl. Melati No. 12, Bandung"
      },
      sampleCouple: {
        groomShort: "Kinan",
        groomFull: "Kinan Althafunnisa",
        groomParents: "Putri pertama dari Bpk. Irfan & Ibu Annisa",
        groomPhoto: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
        brideShort: "Aqiqah",
        brideFull: "Tasyakuran Kelahiran",
        brideParents: "BB: 3.2 kg | PB: 49 cm | Jam: 05.15 WIB",
        bridePhoto: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
        dateText: "Minggu, 24 Mei 2026",
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
      price: 89000,
      originalPrice: 165000,
      badge: "Wisuda Akbar 🎓",
      isPopular: false,
      thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=85",
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
        dateText: "Sabtu, 19 September 2026",
        venueText: "Balairung UI, Kampus UI Depok"
      },
      sampleCouple: {
        groomShort: "Wisuda UI",
        groomFull: "Wisuda Sarjana & Magister UI",
        groomParents: "Sidang Terbuka Senat Akademik",
        groomPhoto: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        brideShort: "Kelulusan",
        brideFull: "Tahun Akademik 2025/2026",
        brideParents: "Gedung Balairung UI, Depok",
        bridePhoto: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        dateText: "Sabtu, 19 September 2026",
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
    }
  ] as TemplateItem[],

  testimonials: [
    {
      id: "t1",
      coupleName: "Bagus & Ayu",
      city: "Yogyakarta",
      templateName: "Royal Javanese Heritage",
      rating: 5,
      comment: "Awalnya bingung cari undangan adat Jawa yang modern tapi tetap sakral. Pas nemu tema Royal Java di JanjiSuci.id, langsung jatuh cinta! Tamu-tamu sepuh pada kagum sama musik dan ornamen gunungannya.",
      date: "2 minggu yang lalu",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "t2",
      coupleName: "Kevin & Clarissa",
      city: "Jakarta Selatan",
      templateName: "Modern Luxury Champagne",
      rating: 5,
      comment: "Desain editorialnya beneran kayak majalah Vogue! Gak murahan sama sekali. Fitur amplop digitalnya kepake banget, tamu tinggal klik salin rekening atau scan QRIS. Adminnya juga ramah dan fast response di WhatsApp.",
      date: "1 bulan yang lalu",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "t3",
      coupleName: "Dimas & Kirana",
      city: "Bandung",
      templateName: "Rustic Terracotta Boho",
      rating: 5,
      comment: "Konsep pernikahan outdoor kami di Lembang klop banget sama tema Terracotta ini. Foto-foto polaroid miringnya estetik parah. Harga 75rb tapi kualitasnya bintang lima!",
      date: "3 minggu yang lalu",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    }
  ] satisfies TestimonialItem[],

  faqs: [
    {
      question: "Berapa lama proses pembuatan undangan digital?",
      answer: "Untuk Paket Hemat dan Exclusive biasanya selesai dalam 1x24 jam setelah data dan foto disetor. Khusus Paket Royal VIP (Terima Beres), kami kerjakan secara prioritas ekspres selesai kurang dari 3 jam!"
    },
    {
      question: "Bagaimana cara menyetor data dan foto pernikahan?",
      answer: "Anda bisa langsung mengisi formulir order di website ini, atau memilih opsi 'Booking Slot Promo Dulu' dan mengirimkan foto serta data menyusul melalui chat WhatsApp Admin kami."
    },
    {
      question: "Apakah bisa revisi jika ada perubahan jadwal atau lokasi?",
      answer: "Bisa! Paket Hemat mendapatkan 2x gratis revisi, sedangkan Paket Exclusive dan Royal VIP mendapatkan fasilitas revisi data sepuasnya tanpa biaya tambahan."
    },
    {
      question: "Bagaimana cara membuat link undangan untuk masing-masing nama tamu?",
      answer: "Kami menyediakan 'Generator Nama Tamu' gratis di halaman website ini. Anda cukup mengetikkan daftar nama teman/keluarga, dan sistem otomatis membuatkan link khusus beserta kalimat pengantar WhatsApp siap kirim!"
    },
    {
      question: "Metode pembayaran apa saja yang didukung?",
      answer: "Saat ini kami menerima transfer mudah via GoPay, ShopeePay, dan DANA ke nomor resmi kami 0896-1977-4116."
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
