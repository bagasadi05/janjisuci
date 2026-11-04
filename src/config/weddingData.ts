export interface EventDetail {
  title: string
  date: string
  time: string
  venue: string
  address: string
  mapsUrl: string
  calendarDate: {
    start: string // YYYYMMDDTHHmmss
    end: string
  }
}

export interface BankAccount {
  bank: string
  accountNumber: string
  accountHolder: string
  holderName?: string
  logoText: string
}

export interface StoryItem {
  year: string
  title: string
  description: string
  image?: string
}

export interface GalleryItem {
  id: number
  src: string
  thumb: string
  caption: string
  category: 'all' | 'prewed' | 'ceremony'
  aspect: 'portrait' | 'landscape' | 'square'
}

export interface WishMessage {
  id: string
  name: string
  attendance: 'hadir' | 'ragu' | 'berhalangan'
  message: string
  createdAt: string
  likes: number
}

export interface AudioTrack {
  id: string
  title: string
  artist: string
  src: string
}

export interface WeddingConfig {
  meta: {
    title: string
    description: string
    ogImage: string
  }
  couple: {
    title: string
    subtitle: string
    groom: {
      shortName: string
      fullName: string
      fatherName: string
      motherName: string
      childOrder: string
      instagram: string
      photo: string
      quote: string
    }
    bride: {
      shortName: string
      fullName: string
      fatherName: string
      motherName: string
      childOrder: string
      instagram: string
      photo: string
      quote: string
    }
  }
  quote: {
    arabic?: string
    text: string
    source: string
  }
  countdownDate: string // ISO string
  events: {
    akad: EventDetail
    resepsi: EventDetail
  }
  loveStory: StoryItem[]
  gallery: GalleryItem[]
  dressCode: {
    title: string
    description: string
    colors: { name: string; hex: string }[]
  }
  gift: {
    title: string
    description: string
    accounts: BankAccount[]
    qrisUrl?: string
    giftAddress: {
      recipient: string
      phone: string
      address: string
    }
  }
  audio: {
    activeTrack: AudioTrack
    playlist: AudioTrack[]
  }
  initialWishes: WishMessage[]
}

export const weddingData: WeddingConfig = {
  meta: {
    title: "Pernikahan Rian & Sarah",
    description: "Undangan Pernikahan Online M. Arrian Mahendra & Sarah Az-Zahra",
    ogImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
  },
  couple: {
    title: "Mempelai Pengantin",
    subtitle: "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon rahmat dan ridho-Nya, kami bermaksud melangsungkan pernikahan putra-putri kami:",
    groom: {
      shortName: "Rian",
      fullName: "M. Arrian Mahendra, S.T.",
      fatherName: "Bpk. Hendra Mahendra",
      motherName: "Ibu Siti Rahmawati",
      childOrder: "Putra pertama dari",
      instagram: "rian.mahendra",
      photo: "https://images.unsplash.com/photo-1766104798125-314e9659cf5a?auto=format&fit=crop&w=800&q=80",
      quote: "Di antara miliaran jiwa di dunia, hatiku memilihmu untuk menjadi pelengkap imanku dan teman seumur hidupku."
    },
    bride: {
      shortName: "Sarah",
      fullName: "Sarah Az-Zahra, S.Psi.",
      fatherName: "Bpk. H. Ahmad Dahlan",
      motherName: "Ibu Hj. Fatimah Zahra",
      childOrder: "Putri kedua dari",
      instagram: "sarah.azzahra",
      photo: "https://images.unsplash.com/photo-1693074445833-0fdce5f1f29f?auto=format&fit=crop&w=800&q=80",
      quote: "Menemukanmu adalah anugerah terindah. Bersamamu, aku siap melangkah merajut masa depan penuh cinta dan berkah."
    }
  },
  quote: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.",
    source: "QS. Ar-Rum: 21"
  },
  countdownDate: "2027-10-24T08:00:00+07:00",
  events: {
    akad: {
      title: "Akad Nikah",
      date: "Minggu, 24 Oktober 2027",
      time: "08:00 - 10:00 WIB",
      venue: "Masjid Agung Jawa Tengah",
      address: "Jl. Gajah Raya, Sambirejo, Kec. Gayamsari, Kota Semarang, Jawa Tengah",
      mapsUrl: "https://maps.google.com/?q=Masjid+Agung+Jawa+Tengah+Semarang",
      calendarDate: {
        start: "20271024T010000Z",
        end: "20271024T030000Z"
      }
    },
    resepsi: {
      title: "Resepsi Pernikahan",
      date: "Minggu, 24 Oktober 2027",
      time: "11:00 - 14:00 WIB",
      venue: "Grand Ballroom Hotel Ciputra",
      address: "Simpang Lima, Jl. Simpang Lima No. 1, Pekunden, Kec. Semarang Tengah, Kota Semarang",
      mapsUrl: "https://maps.google.com/?q=Hotel+Ciputra+Semarang",
      calendarDate: {
        start: "20271024T040000Z",
        end: "20271024T070000Z"
      }
    }
  },
  loveStory: [
    {
      year: "2021",
      title: "Pertemuan Pertama",
      description: "Takdir mempertemukan kami dalam satu forum pelatihan kepemimpinan mahasiswa nasional. Sebuah percakapan sederhana tentang cita-cita menjadi awal perjalanan panjang kami.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80"
    },
    {
      year: "2023",
      title: "Menjalin Komitmen",
      description: "Setelah saling mengenal visi hidup dan keluarga masing-masing, kami membulatkan niat untuk melangkah dalam satu komitmen yang lebih mantap dan terarah.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80"
    },
    {
      year: "2025",
      title: "Momen Lamaran Suci",
      description: "Dengan izin dan restu kedua orang tua serta keluarga besar, ikatan pertunangan resmi terjalin di hari yang penuh senyum dan rasa syukur.",
      image: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80"
    },
    {
      year: "2026",
      title: "Menuju Babak Baru",
      description: "Kini kami siap menyatukan dua hati dan dua keluarga dalam mahligai rumah tangga yang sakinah, mawaddah, warahmah.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80"
    }
  ],
  gallery: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
      thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80",
      caption: "Cinta bukan tentang mencari yang sempurna, tetapi menyempurnakan yang ada bersama.",
      category: "prewed",
      aspect: "landscape"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85",
      thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80",
      caption: "Senyumanmu adalah tempat ternyaman untuk pulang dan bersandar.",
      category: "ceremony",
      aspect: "portrait"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=85",
      thumb: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=700&q=80",
      caption: "Langkah kecil menuju janji suci seumur hidup yang diberkahi.",
      category: "prewed",
      aspect: "portrait"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=85",
      thumb: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=700&q=80",
      caption: "Masa depan indah yang kita rajut bersama hari demi hari dengan penuh rasa syukur.",
      category: "prewed",
      aspect: "landscape"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=85",
      thumb: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=700&q=80",
      caption: "Dalam genggaman tanganmu, kutemukan rasa aman dan kehangatan yang sejati.",
      category: "ceremony",
      aspect: "square"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=85",
      thumb: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=700&q=80",
      caption: "Satu komitmen sakral, ribuan doa tulus, selamanya berdampingan.",
      category: "ceremony",
      aspect: "portrait"
    }
  ],
  dressCode: {
    title: "Panduan Busana Acara",
    description: "Kami sangat mengapresiasi apabila tamu undangan dapat mengenakan pakaian bernuansa palet warna berikut:",
    colors: [
      { name: "Hijau Sage", hex: "#7D8C7C" },
      { name: "Champagne Hangat", hex: "#D4AF37" },
      { name: "Gading Lembut", hex: "#F3EDE2" },
      { name: "Terracotta Lembut", hex: "#B86B5A" }
    ]
  },
  gift: {
    title: "Tanda Kasih & Kado Digital",
    description: "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberikan hadiah melalui transfer digital berikut:",
    accounts: [
      {
        bank: "Bank Central Asia (BCA)",
        accountNumber: "8465019283",
        accountHolder: "M. Arrian Mahendra",
        logoText: "BCA"
      },
      {
        bank: "Bank Mandiri",
        accountNumber: "1350019283746",
        accountHolder: "Sarah Az-Zahra",
        logoText: "MANDIRI"
      }
    ],
    qrisUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=WEDDING-GIFT-RIAN-SARAH",
    giftAddress: {
      recipient: "Rian Mahendra & Sarah Az-Zahra",
      phone: "0812-3456-7890",
      address: "Jl. Melati Indah No. 45, RT 03/RW 04, Gayamsari, Kota Semarang, Jawa Tengah 50161"
    }
  },
  audio: {
    activeTrack: {
      id: "track-1",
      title: "Payung Teduh - Akad",
      artist: "Payung Teduh",
      src: "/audio/payung-teduh-akad.mp3"
    },
    playlist: [
      {
        id: "track-1",
        title: "Payung Teduh - Akad",
        artist: "Payung Teduh",
        src: "/audio/payung-teduh-akad.mp3"
      },
      {
        id: "track-2",
        title: "Payung Teduh - Berdua Saja",
        artist: "Payung Teduh",
        src: "/audio/berdua-saja.mp3"
      }
    ]
  },
  initialWishes: [
    {
      id: "w1",
      name: "Dimas & Annisa",
      attendance: "hadir",
      message: "Selamat ya Rian dan Sarah! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Lancar sampai hari H!",
      createdAt: "1 jam yang lalu",
      likes: 12
    },
    {
      id: "w2",
      name: "Bpk. Bambang Sujarwo",
      attendance: "hadir",
      message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khoir. Turut berbahagia untuk kedua mempelai dan keluarga besar.",
      createdAt: "3 jam yang lalu",
      likes: 18
    },
    {
      id: "w3",
      name: "Farhan Pratama",
      attendance: "hadir",
      message: "Selamat menempuh hidup baru bro Rian! Akhirnya berlabuh juga di pelaminan. Sukses dan bahagia selalu bersama istri tercinta!",
      createdAt: "Kemarin",
      likes: 9
    },
    {
      id: "w4",
      name: "Clara & Kevin",
      attendance: "ragu",
      message: "Selamat Sarah & Rian! Semoga segala persiapan dimudahkan Tuhan Yang Maha Esa.",
      createdAt: "2 hari yang lalu",
      likes: 5
    }
  ]
}
