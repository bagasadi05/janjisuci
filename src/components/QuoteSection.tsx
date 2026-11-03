import React from 'react'
import { weddingData } from '../config/weddingData'
import { BotanicalCorner, FloralDivider } from './Ornament'

export const QuoteSection: React.FC = () => {
  return (
    <section className="relative my-6 sm:my-10 px-4">
      <div className="relative max-w-2xl sm:max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-md border border-amber-800/15 shadow-xl text-center overflow-hidden">
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="top-right" />
        <BotanicalCorner position="bottom-left" />
        <BotanicalCorner position="bottom-right" />

        {/* Basmalah */}
        <p className="font-serif text-lg sm:text-2xl text-amber-900 font-medium mb-3 sm:mb-4">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>

        {/* Arabic Verse if available */}
        {weddingData.quote.arabic && (
          <p
            className="font-serif text-base sm:text-xl text-stone-800 leading-loose sm:leading-loose my-4 px-2"
            dir="rtl"
          >
            {weddingData.quote.arabic}
          </p>
        )}

        <FloralDivider className="my-3 sm:my-4" />

        {/* Translation */}
        <p className="font-serif italic text-stone-700 text-xs sm:text-base leading-relaxed px-2 max-w-2xl mx-auto">
          "{weddingData.quote.text}"
        </p>

        <p className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-800 mt-5">
          — {weddingData.quote.source} —
        </p>
      </div>
    </section>
  )
}
