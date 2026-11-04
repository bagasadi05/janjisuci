import React from 'react'
import { Heart } from 'lucide-react'
import { useInvitationData } from '../context/InvitationContext'
import { FloralDivider } from './Ornament'

export const FooterSection: React.FC = () => {
  const { data: weddingData, activeTemplate } = useInvitationData()

  const isDark =
    activeTemplate.category === 'dark' ||
    activeTemplate.themeColors.textDark === '#FFFFFF' ||
    activeTemplate.slug === 'exclusive-navy' ||
    activeTemplate.slug === 'royal-midnight' ||
    activeTemplate.slug === 'celestial-night'

  return (
    <footer className="relative pt-12 pb-24 sm:pb-28 px-4 text-center bg-gradient-to-b from-transparent to-stone-900/10 defer-render">
      <div className="max-w-2xl mx-auto">
        <FloralDivider className="my-4" />

        <p className={`font-serif italic text-xs sm:text-base leading-relaxed px-4 max-w-lg mx-auto ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
          "Merupakan suatu kehormatan dan kebahagiaan yang tiada terkira bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami."
        </p>

        <p className={`font-sans text-xs sm:text-sm uppercase tracking-widest mt-7 ${isDark ? 'text-amber-400 font-semibold' : 'text-stone-500'}`}>
          Kami yang berbahagia,
        </p>

        <div className={`font-script text-5xl sm:text-7xl my-4 drop-shadow-sm ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
          {weddingData.couple.groom.shortName}
          {weddingData.couple.bride.shortName && ` & ${weddingData.couple.bride.shortName}`}
        </div>

        <p className={`font-serif text-xs sm:text-sm mb-8 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
          Beserta Seluruh Keluarga Besar
        </p>

        <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-1.5 text-xs text-stone-400 font-sans">
          <div className="flex items-center gap-1.5">
            <span>Dirajut dengan penuh cinta</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>untuk hari bahagia Anda</span>
          </div>
          <p>© 2026 {weddingData.meta.title}. Seluruh hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
