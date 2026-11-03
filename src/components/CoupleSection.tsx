import React from 'react'
import { Heart, Sparkles } from 'lucide-react'
import { useInvitationData } from '../context/InvitationContext'
import { FloralDivider, BotanicalCorner } from './Ornament'
import { Reveal3D } from './common/Reveal3D'

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export const CoupleSection: React.FC = () => {
  const { data: weddingData } = useInvitationData()
  const { groom, bride, title, subtitle } = weddingData.couple

  return (
    <section id="couple" className="relative py-12 px-4 scroll-mt-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-900/10 border border-amber-700/20 text-amber-900 text-xs uppercase tracking-widest font-sans font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Sang Mempelai</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
          {title}
        </h2>
        <FloralDivider className="my-3" />
        <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed px-4 max-w-xl mx-auto mb-10">
          {subtitle}
        </p>

        {/* Responsive Grid: Single column on mobile, 2 columns on tablet/desktop */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Groom Card */}
          <Reveal3D delay={100} interactive className="relative p-6 sm:p-9 rounded-3xl bg-white/90 backdrop-blur-md border border-amber-800/15 shadow-xl transition-all duration-300 hover:shadow-2xl flex flex-col items-center">
            <BotanicalCorner position="top-left" />
            
            {/* Double Arch Frame with Gold Rim */}
            <div className="relative p-1.5 rounded-t-[84px] rounded-b-3xl bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-lg mb-5">
              <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-t-[80px] rounded-b-[22px] overflow-hidden bg-stone-100">
                <img
                  src={groom.photo}
                  alt={groom.fullName}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <h3 className="font-script text-4xl sm:text-5xl text-amber-900 font-bold">
              {groom.shortName}
            </h3>
            <p className="font-serif text-base sm:text-lg font-bold text-stone-800 mt-1">
              {groom.fullName}
            </p>

            <p className="text-xs text-stone-500 font-sans mt-2">
              {groom.childOrder}
            </p>
            <p className="text-xs sm:text-sm font-serif font-semibold text-stone-700">
              {groom.fatherName} & {groom.motherName}
            </p>

            {/* Personal Quote */}
            <p className="font-serif italic text-xs text-stone-500 mt-4 px-2 leading-relaxed bg-amber-50/60 p-3 rounded-2xl border border-amber-600/10">
              "{groom.quote}"
            </p>

            <div className="mt-5 pt-3 border-t border-stone-200/60 w-full flex justify-center">
              <a
                href={`https://instagram.com/${groom.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 hover:text-amber-800 text-xs font-sans transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                <span>@{groom.instagram}</span>
              </a>
            </div>
          </Reveal3D>

          {/* Desktop/Tablet Central Heart Connector Badge */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-800 to-amber-600 text-amber-100 flex items-center justify-center shadow-2xl border-4 border-[#FAF7F2] animate-pulse">
              <Heart className="w-6 h-6 fill-amber-100" />
            </div>
          </div>

          {/* Bride Card */}
          <Reveal3D delay={200} interactive className="relative p-6 sm:p-9 rounded-3xl bg-white/90 backdrop-blur-md border border-amber-800/15 shadow-xl transition-all duration-300 hover:shadow-2xl flex flex-col items-center">
            <BotanicalCorner position="top-right" />
            
            {/* Double Arch Frame with Gold Rim */}
            <div className="relative p-1.5 rounded-t-[84px] rounded-b-3xl bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-lg mb-5">
              <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-t-[80px] rounded-b-[22px] overflow-hidden bg-stone-100">
                <img
                  src={bride.photo}
                  alt={bride.fullName}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <h3 className="font-script text-4xl sm:text-5xl text-amber-900 font-bold">
              {bride.shortName}
            </h3>
            <p className="font-serif text-base sm:text-lg font-bold text-stone-800 mt-1">
              {bride.fullName}
            </p>

            <p className="text-xs text-stone-500 font-sans mt-2">
              {bride.childOrder}
            </p>
            <p className="text-xs sm:text-sm font-serif font-semibold text-stone-700">
              {bride.fatherName} & {bride.motherName}
            </p>

            {/* Personal Quote */}
            <p className="font-serif italic text-xs text-stone-500 mt-4 px-2 leading-relaxed bg-amber-50/60 p-3 rounded-2xl border border-amber-600/10">
              "{bride.quote}"
            </p>

            <div className="mt-5 pt-3 border-t border-stone-200/60 w-full flex justify-center">
              <a
                href={`https://instagram.com/${bride.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 hover:text-amber-800 text-xs font-sans transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                <span>@{bride.instagram}</span>
              </a>
            </div>
          </Reveal3D>

        </div>
      </div>
    </section>
  )
}
