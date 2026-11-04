import React from 'react'
import { weddingData } from '../config/weddingData'
import { useInvitationData } from '../context/InvitationContext'
import { BotanicalCorner, FloralDivider } from './Ornament'

export const QuoteSection: React.FC = () => {
  const { activeTemplate } = useInvitationData()

  const isDark =
    activeTemplate.category === 'dark' ||
    activeTemplate.themeColors.textDark === '#FFFFFF' ||
    activeTemplate.slug === 'exclusive-navy' ||
    activeTemplate.slug === 'royal-midnight' ||
    activeTemplate.slug === 'celestial-night'

  return (
    <section className="relative my-6 sm:my-10 px-4">
      <div
        className={`relative max-w-2xl sm:max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl backdrop-blur-md border shadow-xl text-center overflow-hidden transition-all duration-300 ${
          isDark
            ? 'bg-stone-900/85 border-amber-500/30 text-stone-100 shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
            : 'bg-white/90 border-amber-800/15 text-stone-800'
        }`}
      >
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="top-right" />
        <BotanicalCorner position="bottom-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Basmalah */}
        <p className={`font-serif text-lg sm:text-2xl font-medium mb-3 sm:mb-4 ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>

        {/* Arabic Verse if available */}
        {weddingData.quote.arabic && (
          <p
            className={`font-serif text-base sm:text-xl leading-loose sm:leading-loose my-4 px-2 ${
              isDark ? 'text-amber-100/95' : 'text-stone-800'
            }`}
            dir="rtl"
          >
            {weddingData.quote.arabic}
          </p>
        )}

        <FloralDivider className="my-3 sm:my-4" />

        {/* Translation */}
        <p
          className={`font-serif italic text-xs sm:text-base leading-relaxed px-2 max-w-2xl mx-auto ${
            isDark ? 'text-stone-300' : 'text-stone-700'
          }`}
        >
          "{weddingData.quote.text}"
        </p>

        <p
          className={`font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider mt-5 ${
            isDark ? 'text-amber-400' : 'text-amber-800'
          }`}
        >
          — {weddingData.quote.source} —
        </p>
      </div>
    </section>
  )
}
