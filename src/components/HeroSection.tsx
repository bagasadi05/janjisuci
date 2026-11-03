import React from 'react'
import { Calendar, Heart } from 'lucide-react'
import { useInvitationData } from '../context/InvitationContext'
import { FloralDivider } from './Ornament'

export const HeroSection: React.FC = () => {
  const { data: weddingData, activeTemplate } = useInvitationData()

  return (
    <section id="home" className="relative pt-12 pb-14 px-4 text-center overflow-hidden">
      {/* Soft Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

      {/* Intro Label */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/10 border border-amber-700/20 text-amber-900 text-xs font-sans tracking-widest uppercase mb-5">
        <Heart className="w-3.5 h-3.5 text-amber-700 fill-amber-700" />
        <span>Walimatul 'Ursy</span>
      </div>

      <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-800 font-bold tracking-tight">
        The Wedding Celebration
      </h1>

      <FloralDivider className="my-3 sm:my-4" />

      {/* Couple Names */}
      <div className="my-4 sm:my-6 space-y-1 sm:space-y-2">
        <div className="font-script text-5xl sm:text-6xl md:text-7xl text-amber-900 drop-shadow-sm">
          {weddingData.couple.groom.shortName}
        </div>
        <div className="font-script text-3xl sm:text-4xl text-amber-700/80 -my-2">&</div>
        <div className="font-script text-5xl sm:text-6xl md:text-7xl text-amber-900 drop-shadow-sm">
          {weddingData.couple.bride.shortName}
        </div>
      </div>

      {/* Hero Image in Aesthetic Arch Frame */}
      <div className="relative mx-auto my-6 sm:my-8 max-w-xs sm:max-w-sm">
        <div className="relative rounded-t-[140px] rounded-b-3xl overflow-hidden border-4 border-amber-100/90 shadow-2xl bg-amber-50">
          <img
            src={activeTemplate.heroImage}
            alt={`Mempelai ${weddingData.couple.groom.shortName} & ${weddingData.couple.bride.shortName}`}
            className="w-full h-[360px] sm:h-[420px] object-cover object-center hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-0 right-0 text-white font-serif text-xs sm:text-sm tracking-widest uppercase">
            {weddingData.events.akad.date}
          </div>
        </div>

        {/* Decorative Badge */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-amber-600/30 shadow-lg flex items-center gap-2 whitespace-nowrap text-stone-800 text-xs font-serif font-semibold">
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          <span>Simpan Tanggal</span>
        </div>
      </div>

      <p className="font-serif italic text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-7 px-4 leading-relaxed">
        "Menyatukan dua hati, melangkah bersama dalam ridho Ilahi."
      </p>
    </section>
  )
}
