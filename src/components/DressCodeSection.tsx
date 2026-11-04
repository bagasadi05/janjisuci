import React from 'react'
import { Sparkles, Clock, ShieldCheck, Camera } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { useInvitationData } from '../context/InvitationContext'
import { FloralDivider, BotanicalCorner } from './Ornament'
import { StaggerContainer, MotionItem, ScrollReveal } from './common/MotionReveal'

export const DressCodeSection: React.FC = () => {
  const { activeTemplate } = useInvitationData()
  const { dressCode } = weddingData

  const isDark =
    activeTemplate.category === 'dark' ||
    activeTemplate.themeColors.textDark === '#FFFFFF' ||
    activeTemplate.slug === 'exclusive-navy' ||
    activeTemplate.slug === 'royal-midnight' ||
    activeTemplate.slug === 'celestial-night'

  return (
    <section className="relative py-8 px-4 defer-render">
      <ScrollReveal
        variant="flipUp"
        interactive
        className={`relative max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl backdrop-blur-md shadow-xl text-center overflow-hidden border ${
          isDark
            ? 'bg-stone-900/85 border-amber-500/30 text-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
            : 'bg-white/90 border-amber-800/15 text-stone-800'
        }`}
      >
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="bottom-right" />

        <StaggerContainer stagger={0.1} delayChildren={0.1}>
          <MotionItem variant="pop" className="flex justify-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 mb-3 shadow-sm border border-amber-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
          </MotionItem>

          <MotionItem variant="fadeUp">
            <h3 className={`font-serif text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-stone-800'}`}>
              {dressCode.title}
            </h3>
          </MotionItem>

          <MotionItem variant="fadeUp">
            <p className={`font-sans text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              {dressCode.description}
            </p>
          </MotionItem>

          {/* Color Swatches Grid with Spring Bloom Entrance */}
          <MotionItem variant="zoomIn">
            <StaggerContainer stagger={0.08} delayChildren={0.05} className="flex items-center justify-center gap-4 sm:gap-8 my-6 flex-wrap">
              {dressCode.colors.map((color, idx) => (
                <MotionItem key={idx} variant="pop">
                  <div className="flex flex-col items-center group">
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg border-2 border-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className={`text-xs font-sans font-medium mt-2 ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>
                      {color.name}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {color.hex}
                    </span>
                  </div>
                </MotionItem>
              ))}
            </StaggerContainer>
          </MotionItem>

          <MotionItem variant="expand">
            <FloralDivider className="my-6" />
          </MotionItem>

          {/* Event Etiquette Tips */}
          <MotionItem variant="fadeUp">
            <div className="text-left pt-2">
              <p className={`font-serif font-bold text-sm sm:text-base text-center mb-4 ${isDark ? 'text-white' : 'text-stone-800'}`}>
                Himbauan &amp; Kenyamanan Bersama
              </p>
              <StaggerContainer stagger={0.1} delayChildren={0.05} className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                <MotionItem variant="fadeUp">
                  <div
                    className={`flex items-start gap-3 p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed h-full ${
                      isDark
                        ? 'bg-stone-950/70 border-white/10 text-stone-300'
                        : 'bg-stone-50 border-stone-200/60 text-stone-600'
                    }`}
                  >
                    <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Mohon hadir 15 menit sebelum acara dimulai demi kelancaran prosesi.</span>
                  </div>
                </MotionItem>

                <MotionItem variant="fadeUp">
                  <div
                    className={`flex items-start gap-3 p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed h-full ${
                      isDark
                        ? 'bg-stone-950/70 border-white/10 text-stone-300'
                        : 'bg-stone-50 border-stone-200/60 text-stone-600'
                    }`}
                  >
                    <Camera className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Dipersilakan mengambil foto &amp; video tanpa mengganggu tim dokumentasi resmi.</span>
                  </div>
                </MotionItem>

                <MotionItem variant="fadeUp">
                  <div
                    className={`flex items-start gap-3 p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed h-full ${
                      isDark
                        ? 'bg-stone-950/70 border-white/10 text-stone-300'
                        : 'bg-stone-50 border-stone-200/60 text-stone-600'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Kondisikan ponsel dalam mode hening (*silent*) selama prosesi sakral berlangsung.</span>
                  </div>
                </MotionItem>
              </StaggerContainer>
            </div>
          </MotionItem>
        </StaggerContainer>
      </ScrollReveal>
    </section>
  )
}
