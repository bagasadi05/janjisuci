import React from 'react'
import { Heart, Sparkles, ArrowUpRight } from 'lucide-react'
import { useInvitationData } from '../context/InvitationContext'
import { FloralDivider } from './Ornament'
import { track } from '../lib/analytics'
import { StaggerContainer, MotionItem, ScrollReveal } from './common/MotionReveal'

export const ViralStudioAttribution: React.FC<{ isDark?: boolean; templateSlug?: string; templateName?: string }> = ({
  isDark = true,
  templateSlug = 'botanical-sage',
  templateName = 'Botanical Sage'
}) => {
  const catalogHref = `/?utm_source=invitation_footer&utm_medium=viral_loop&utm_campaign=${encodeURIComponent(
    templateSlug
  )}&ref=TAMUJANJISUCI`

  return (
    <div
      className={`mt-6 mx-auto max-w-md rounded-2xl p-4 border text-center transition-all ${
        isDark
          ? 'bg-stone-950/75 border-amber-500/25 text-stone-300 shadow-[0_10px_30px_rgba(0,0,0,0.45)]'
          : 'bg-white/85 border-amber-700/20 text-stone-700 shadow-sm'
      }`}
    >
      <div className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold text-amber-400">
        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Dibuat dengan JanjiSuci.id • Tema {templateName}</span>
      </div>
      <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
        Ingin undangan digital seperti ini untuk acara Anda? Tamu undangan ini mendapat harga khusus dengan kode{' '}
        <strong className={isDark ? 'text-amber-200 font-mono' : 'text-amber-800 font-mono'}>TAMUJANJISUCI</strong>.
      </p>
      <a
        href={catalogHref}
        onClick={() =>
          track('invitation_footer_click', {
            template: templateSlug,
            code: 'TAMUJANJISUCI'
          })
        }
        className="mt-2.5 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-sans font-bold text-[11px] shadow-md hover:brightness-110 active:scale-95 transition-all"
      >
        <span>Lihat Katalog &amp; Buat Undanganmu</span>
        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
      </a>
    </div>
  )
}

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
        <StaggerContainer stagger={0.12} delayChildren={0.05}>
          <MotionItem variant="expand">
            <FloralDivider className="my-4" />
          </MotionItem>

          <MotionItem variant="fadeUp">
            <p
              className={`font-serif italic text-xs sm:text-base leading-relaxed px-4 max-w-lg mx-auto ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}
            >
              &ldquo;Merupakan suatu kehormatan dan kebahagiaan yang tiada terkira bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.&rdquo;
            </p>
          </MotionItem>

          <MotionItem variant="fadeDown">
            <p
              className={`font-sans text-xs sm:text-sm uppercase tracking-widest mt-7 ${
                isDark ? 'text-amber-400 font-semibold' : 'text-stone-500'
              }`}
            >
              Kami yang berbahagia,
            </p>
          </MotionItem>

          <MotionItem variant="zoomIn">
            <div
              className={`font-script text-5xl sm:text-7xl my-4 drop-shadow-sm ${
                isDark ? 'text-amber-300' : 'text-amber-900'
              }`}
            >
              {weddingData.couple.groom.shortName}
              {weddingData.couple.bride.shortName && ` & ${weddingData.couple.bride.shortName}`}
            </div>
          </MotionItem>

          {/* Turut Mengundang Family Box with 3D Flip Entrance */}
          <MotionItem variant="flipUp">
            <div className={`mt-3 mb-8 p-5 rounded-2xl border text-xs sm:text-sm font-serif leading-relaxed max-w-lg mx-auto shadow-lg ${
              isDark ? 'bg-stone-950/70 border-amber-500/25 text-stone-300' : 'bg-white/85 border-amber-700/20 text-stone-700'
            }`}>
              <p className="text-[10px] font-sans font-semibold uppercase tracking-widest text-amber-400 mb-2">
                Turut Mengundang:
              </p>
              <p className={`font-semibold ${isDark ? 'text-amber-100' : 'text-stone-800'}`}>
                Keluarga {weddingData.couple.groom.fatherName} &amp; {weddingData.couple.groom.motherName}
              </p>
              <p className={`font-semibold ${isDark ? 'text-amber-100' : 'text-stone-800'} mt-1`}>
                Keluarga {weddingData.couple.bride.fatherName} &amp; {weddingData.couple.bride.motherName}
              </p>
              <p className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-stone-600'} font-sans italic mt-2`}>
                Serta segenap sanak saudara &amp; keluarga besar kedua mempelai
              </p>
            </div>
          </MotionItem>

          <MotionItem variant="fadeUp">
            <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-1.5 text-xs text-stone-400 font-sans">
              <div className="flex items-center gap-1.5">
                <span>Dirajut dengan penuh cinta</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>untuk hari bahagia Anda</span>
              </div>
              <p>© 2026 {weddingData.meta.title}. Seluruh hak cipta dilindungi.</p>

              <ViralStudioAttribution
                isDark={isDark}
                templateSlug={activeTemplate.slug}
                templateName={activeTemplate.name}
              />
            </div>
          </MotionItem>
        </StaggerContainer>
      </div>
    </footer>
  )
}
