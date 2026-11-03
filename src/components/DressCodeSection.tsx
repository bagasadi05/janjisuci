import React from 'react'
import { Sparkles, Clock, ShieldCheck, Camera } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { FloralDivider, BotanicalCorner } from './Ornament'

export const DressCodeSection: React.FC = () => {
  const { dressCode } = weddingData

  return (
    <section className="relative py-8 px-4">
      <div className="relative max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-amber-800/15 shadow-xl text-center overflow-hidden">
        <BotanicalCorner position="top-left" />
        <BotanicalCorner position="bottom-right" />

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-800 mb-3 shadow-sm">
          <Sparkles className="w-6 h-6" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800 mb-2">
          {dressCode.title}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
          {dressCode.description}
        </p>

        {/* Color Swatches Grid */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 my-6 flex-wrap">
          {dressCode.colors.map((color, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg border-2 border-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs font-sans font-medium text-stone-800 mt-2">
                {color.name}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                {color.hex}
              </span>
            </div>
          ))}
        </div>

        <FloralDivider className="my-6" />

        {/* Event Etiquette Tips: 1 col on mobile, 3 cols on desktop */}
        <div className="text-left pt-2">
          <p className="font-serif font-bold text-stone-800 text-sm sm:text-base text-center mb-4">
            Himbauan & Kenyamanan Bersama
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/60 text-stone-600 text-xs sm:text-sm leading-relaxed">
              <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <span>Mohon hadir 15 menit sebelum acara dimulai demi kelancaran prosesi.</span>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/60 text-stone-600 text-xs sm:text-sm leading-relaxed">
              <Camera className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <span>Dipersilakan mengambil foto & video tanpa mengganggu tim dokumentasi resmi.</span>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/60 text-stone-600 text-xs sm:text-sm leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <span>Kondisikan ponsel dalam mode hening (*silent*) selama prosesi sakral berlangsung.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
