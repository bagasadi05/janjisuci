import React from 'react'
import { Calendar, Heart } from 'lucide-react'
import { useInvitationData } from '../context/InvitationContext'
import { FloralDivider } from './Ornament'
import { CalligraphyReveal } from './common/CalligraphyReveal'
import { FloatingFloralFrame } from './common/FloatingFloralFrame'
import { StaggerContainer, MotionItem } from './common/MotionReveal'

export const HeroSection: React.FC = () => {
  const { data: weddingData, activeTemplate } = useInvitationData()

  const isDark =
    activeTemplate.category === 'dark' ||
    activeTemplate.themeColors.textDark === '#FFFFFF' ||
    activeTemplate.slug === 'exclusive-navy' ||
    activeTemplate.slug === 'royal-midnight' ||
    activeTemplate.slug === 'celestial-night'

  const eventLabel =
    activeTemplate.eventType === 'khitan'
      ? "Walimatul Khitan"
      : activeTemplate.eventType === 'birthday'
      ? "Birthday Celebration"
      : activeTemplate.eventType === 'aqiqah'
      ? "Tasyakuran Aqiqah"
      : activeTemplate.eventType === 'graduation'
      ? "Graduation Ceremony"
      : "Walimatul 'Ursy"

  const celebrationTitle =
    activeTemplate.eventType === 'khitan'
      ? "Tasyakuran & Khitanan"
      : activeTemplate.eventType === 'birthday'
      ? "The Birthday Party"
      : activeTemplate.eventType === 'aqiqah'
      ? "Tasyakuran Kelahiran & Aqiqah"
      : activeTemplate.eventType === 'graduation'
      ? "The Graduation Ceremony"
      : "The Wedding Celebration"

  return (
    <section id="home" className="relative pt-12 pb-14 px-4 text-center overflow-hidden">
      {/* Soft Ambient Radial Glow */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
          isDark ? 'bg-amber-500/15' : 'bg-amber-200/35'
        }`}
      />

      <StaggerContainer stagger={0.13} delayChildren={0.06} className="relative z-10">
        {/* Intro Label with Pop Stagger */}
        <MotionItem variant="pop" className="flex justify-center">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-sans tracking-widest uppercase mb-5 transition-colors shadow-sm ${
              isDark
                ? 'bg-amber-500/15 border border-amber-400/30 text-amber-300'
                : 'bg-amber-900/10 border border-amber-700/20 text-amber-900'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400 fill-amber-400' : 'text-amber-700 fill-amber-700'}`} />
            <span>{eventLabel}</span>
          </div>
        </MotionItem>

        {/* Celebration Title */}
        <MotionItem variant="fadeUp">
          <h1
            className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-colors ${
              isDark ? 'text-white drop-shadow' : 'text-stone-800'
            }`}
          >
            {celebrationTitle}
          </h1>
        </MotionItem>

        {/* Expanding Floral Divider */}
        <MotionItem variant="expand">
          <FloralDivider className="my-3 sm:my-4" />
        </MotionItem>

        {/* Couple / Celebrant Names with Cinematic Calligraphy Reveal */}
        <MotionItem variant="zoomIn" className="my-4 sm:my-6 space-y-1 sm:space-y-2">
          <div
            className={`font-script text-5xl sm:text-6xl md:text-7xl drop-shadow-sm transition-colors ${
              isDark ? 'text-amber-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]' : 'text-amber-900'
            }`}
          >
            <CalligraphyReveal text={weddingData.couple.groom.shortName} delay={0.2} shimmer />
          </div>
          {weddingData.couple.bride.shortName && (
            <>
              <div className={`font-script text-3xl sm:text-4xl -my-2 ${isDark ? 'text-amber-400/80' : 'text-amber-700/80'}`}>
                &
              </div>
              <div
                className={`font-script text-5xl sm:text-6xl md:text-7xl drop-shadow-sm transition-colors ${
                  isDark ? 'text-amber-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]' : 'text-amber-900'
                }`}
              >
                <CalligraphyReveal text={weddingData.couple.bride.shortName} delay={0.4} shimmer />
              </div>
            </>
          )}
        </MotionItem>

        {/* Hero Image in Aesthetic Arch Frame with Floating Floral Frame */}
        <MotionItem variant="zoomIn">
          <div className="relative mx-auto my-6 sm:my-8 max-w-xs sm:max-w-sm">
            <FloatingFloralFrame variant={isDark ? 'gold' : 'sage'} className="rounded-t-[140px] rounded-b-3xl">
              <div
                className={`relative rounded-t-[140px] rounded-b-3xl overflow-hidden border-4 shadow-2xl transition-all ${
                  isDark ? 'border-amber-400/50 bg-stone-900 shadow-[0_20px_50px_rgba(0,0,0,0.8)]' : 'border-amber-100/90 bg-amber-50'
                }`}
              >
                <img
                  src={activeTemplate.heroImage}
                  alt={`Mempelai ${weddingData.couple.groom.shortName}`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-[360px] sm:h-[420px] object-cover object-center hover:scale-105 transition-transform duration-700 aspect-[3/4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-0 right-0 text-white font-serif text-xs sm:text-sm tracking-widest uppercase drop-shadow font-semibold">
                  {weddingData.events.akad.date}
                </div>
              </div>
            </FloatingFloralFrame>

            {/* Decorative Date Badge popping up */}
            <div
              className={`absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full backdrop-blur-md border shadow-lg flex items-center gap-2 whitespace-nowrap text-xs font-serif font-semibold transition-all hover:scale-105 ${
                isDark
                  ? 'bg-stone-900/95 border-amber-500/40 text-amber-200 shadow-[0_5px_20px_rgba(0,0,0,0.6)]'
                  : 'bg-white/95 border-amber-600/30 text-stone-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Simpan Tanggal</span>
            </div>
          </div>
        </MotionItem>

        {/* Romantic Quote */}
        <MotionItem variant="fadeUp">
          <p
            className={`font-serif italic text-xs sm:text-sm max-w-md mx-auto mt-7 px-4 leading-relaxed transition-colors ${
              isDark ? 'text-stone-300' : 'text-stone-600'
            }`}
          >
            "Menyatukan dua hati, melangkah bersama dalam ketulusan dan ridho Ilahi."
          </p>
        </MotionItem>
      </StaggerContainer>
    </section>
  )
}
