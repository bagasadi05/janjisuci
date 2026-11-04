import React from 'react'
import { Sparkles } from 'lucide-react'
import { useInvitationData } from '../context/InvitationContext'
import { FloralDivider, BotanicalCorner } from './Ornament'
import { CalligraphyReveal } from './common/CalligraphyReveal'
import { StaggerContainer, MotionItem, ScrollReveal } from './common/MotionReveal'

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export const CoupleSection: React.FC = () => {
  const { data: weddingData, activeTemplate } = useInvitationData()
  const { groom, bride, title, subtitle } = weddingData.couple

  const isDark =
    activeTemplate.category === 'dark' ||
    activeTemplate.themeColors.textDark === '#FFFFFF' ||
    activeTemplate.slug === 'exclusive-navy' ||
    activeTemplate.slug === 'royal-midnight' ||
    activeTemplate.slug === 'celestial-night'

  return (
    <section id="couple" className="relative py-12 px-4 scroll-mt-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header Staggered Sequence */}
        <StaggerContainer stagger={0.12} delayChildren={0.05} className="mb-10">
          <MotionItem variant="pop" className="flex justify-center">
            <div
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-sans font-medium mb-3 transition-colors ${
                isDark
                  ? 'bg-amber-500/15 border border-amber-400/30 text-amber-300'
                  : 'bg-amber-900/10 border border-amber-700/20 text-amber-900'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
              <span>Sang Mempelai</span>
            </div>
          </MotionItem>

          <MotionItem variant="fadeUp">
            <h2 className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-stone-800'}`}>
              {title}
            </h2>
          </MotionItem>

          <MotionItem variant="expand">
            <FloralDivider className="my-3" />
          </MotionItem>

          <MotionItem variant="fadeUp">
            <p className={`font-sans text-xs sm:text-sm leading-relaxed px-4 max-w-xl mx-auto ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              {subtitle}
            </p>
          </MotionItem>
        </StaggerContainer>

        {/* Responsive Grid with Alternating Slide-In Entrances */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Groom Card */}
          <ScrollReveal
            variant="slideLeft"
            interactive
            className={`relative p-6 sm:p-9 rounded-3xl backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-2xl flex flex-col items-center ${
              isDark
                ? 'bg-stone-900/85 border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
                : 'bg-white/90 border border-amber-800/15'
            }`}
          >
            <BotanicalCorner position="top-left" />

            <StaggerContainer stagger={0.09} delayChildren={0.15} className="w-full flex flex-col items-center">
              {/* Double Arch Frame with Gold Rim */}
              <MotionItem variant="zoomIn">
                <div className="relative p-1.5 rounded-t-[84px] rounded-b-3xl bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-lg mb-5">
                  <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-t-[80px] rounded-b-[22px] overflow-hidden bg-stone-100">
                    <img
                      src={groom.photo}
                      alt={groom.fullName}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500 aspect-[3/4]"
                    />
                  </div>
                </div>
              </MotionItem>

              <MotionItem variant="fadeUp">
                <h3 className={`font-script text-4xl sm:text-5xl font-bold ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                  <CalligraphyReveal text={groom.shortName} delay={0.15} shimmer />
                </h3>
              </MotionItem>

              <MotionItem variant="fadeUp">
                <p className={`font-serif text-base sm:text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-stone-800'}`}>
                  {groom.fullName}
                </p>
              </MotionItem>

              <MotionItem variant="fadeUp">
                <p className={`text-xs font-sans mt-2 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {groom.childOrder}
                </p>
                <p className={`text-xs sm:text-sm font-serif font-semibold ${isDark ? 'text-stone-200' : 'text-stone-700'}`}>
                  {groom.fatherName} &amp; {groom.motherName}
                </p>
              </MotionItem>

              {/* Personal Quote */}
              <MotionItem variant="fadeUp" className="w-full">
                <p
                  className={`font-serif italic text-xs mt-4 px-2 leading-relaxed p-3 rounded-2xl border ${
                    isDark
                      ? 'bg-stone-950/60 border-amber-500/20 text-stone-300'
                      : 'bg-amber-50/60 border-amber-600/10 text-stone-600'
                  }`}
                >
                  "{groom.quote}"
                </p>
              </MotionItem>

              {groom.instagram && (
                <MotionItem variant="pop" className="w-full">
                  <div className="mt-5 pt-3 border-t border-white/10 w-full flex justify-center">
                    <a
                      href={`https://instagram.com/${groom.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-sans transition-colors cursor-pointer shadow-sm active:scale-95 ${
                        isDark
                          ? 'bg-white/10 hover:bg-white/20 border-white/20 text-stone-200'
                          : 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700 hover:text-amber-800'
                      }`}
                    >
                      <InstagramIcon className="w-3.5 h-3.5 text-pink-500" />
                      <span>@{groom.instagram}</span>
                    </a>
                  </div>
                </MotionItem>
              )}
            </StaggerContainer>
          </ScrollReveal>

          {/* Bride Card (if present) */}
          {bride.shortName && (
            <ScrollReveal
              variant="slideRight"
              delay={0.15}
              interactive
              className={`relative p-6 sm:p-9 rounded-3xl backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-2xl flex flex-col items-center ${
                isDark
                  ? 'bg-stone-900/85 border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
                  : 'bg-white/90 border border-amber-800/15'
              }`}
            >
              <BotanicalCorner position="top-right" />

              <StaggerContainer stagger={0.09} delayChildren={0.2} className="w-full flex flex-col items-center">
                {/* Double Arch Frame with Gold Rim */}
                <MotionItem variant="zoomIn">
                  <div className="relative p-1.5 rounded-t-[84px] rounded-b-3xl bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-lg mb-5">
                    <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-t-[80px] rounded-b-[22px] overflow-hidden bg-stone-100">
                      <img
                        src={bride.photo}
                        alt={bride.fullName}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500 aspect-[3/4]"
                      />
                    </div>
                  </div>
                </MotionItem>

                <MotionItem variant="fadeUp">
                  <h3 className={`font-script text-4xl sm:text-5xl font-bold ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                    <CalligraphyReveal text={bride.shortName} delay={0.25} shimmer />
                  </h3>
                </MotionItem>

                <MotionItem variant="fadeUp">
                  <p className={`font-serif text-base sm:text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-stone-800'}`}>
                    {bride.fullName}
                  </p>
                </MotionItem>

                <MotionItem variant="fadeUp">
                  <p className={`text-xs font-sans mt-2 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    {bride.childOrder}
                  </p>
                  <p className={`text-xs sm:text-sm font-serif font-semibold ${isDark ? 'text-stone-200' : 'text-stone-700'}`}>
                    {bride.fatherName} &amp; {bride.motherName}
                  </p>
                </MotionItem>

                {/* Personal Quote */}
                <MotionItem variant="fadeUp" className="w-full">
                  <p
                    className={`font-serif italic text-xs mt-4 px-2 leading-relaxed p-3 rounded-2xl border ${
                      isDark
                        ? 'bg-stone-950/60 border-amber-500/20 text-stone-300'
                        : 'bg-amber-50/60 border-amber-600/10 text-stone-600'
                    }`}
                  >
                    "{bride.quote}"
                  </p>
                </MotionItem>

                {bride.instagram && (
                  <MotionItem variant="pop" className="w-full">
                    <div className="mt-5 pt-3 border-t border-white/10 w-full flex justify-center">
                      <a
                        href={`https://instagram.com/${bride.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-sans transition-colors cursor-pointer shadow-sm active:scale-95 ${
                          isDark
                            ? 'bg-white/10 hover:bg-white/20 border-white/20 text-stone-200'
                            : 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-700 hover:text-amber-800'
                        }`}
                      >
                        <InstagramIcon className="w-3.5 h-3.5 text-pink-500" />
                        <span>@{bride.instagram}</span>
                      </a>
                    </div>
                  </MotionItem>
                )}
              </StaggerContainer>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  )
}
