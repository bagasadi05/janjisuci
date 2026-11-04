import React from 'react'
import { Heart, Sparkles } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { useInvitationData } from '../context/InvitationContext'
import { FloralDivider } from './Ornament'

export const StorySection: React.FC = () => {
  const { activeTemplate } = useInvitationData()

  const isDark =
    activeTemplate.category === 'dark' ||
    activeTemplate.themeColors.textDark === '#FFFFFF' ||
    activeTemplate.slug === 'exclusive-navy' ||
    activeTemplate.slug === 'royal-midnight' ||
    activeTemplate.slug === 'celestial-night'

  return (
    <section id="story" className="relative py-12 px-4 scroll-mt-6 defer-render">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-sans font-medium mb-3 ${
            isDark
              ? 'bg-amber-500/15 border border-amber-400/30 text-amber-300'
              : 'bg-amber-900/10 border border-amber-700/20 text-amber-900'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
          <span>Perjalanan Cinta</span>
        </div>

        <h2 className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-stone-800'}`}>
          Kisah Cinta Kami
        </h2>
        <FloralDivider className="my-3" />
        <p className={`font-serif italic text-xs sm:text-sm mb-12 px-4 max-w-lg mx-auto leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
          "Setiap kisah cinta itu indah, namun kisah kami adalah anugerah yang paling kami syukuri."
        </p>

        {/* Timeline Container */}
        <div className="relative text-left">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-amber-600/10 via-amber-500/50 to-amber-600/10" />

          <div className="space-y-10 sm:space-y-14">
            {weddingData.loveStory.map((story, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Pin/Dot */}
                  <div
                    className={`absolute left-6 md:left-1/2 -translate-x-1/2 top-4 z-10 w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 flex items-center justify-center border-4 shadow-lg ${
                      isDark ? 'border-stone-900' : 'border-[#FAF7F2]'
                    }`}
                  >
                    <Heart className="w-4 h-4 fill-stone-950" />
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Story Card */}
                  <div className="w-full pl-14 md:pl-0 md:w-1/2 md:px-8">
                    <div
                      className={`p-5 sm:p-7 rounded-3xl backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 group ${
                        isDark
                          ? 'bg-stone-900/85 border border-amber-500/30 text-stone-100 shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
                          : 'bg-white/95 border border-amber-800/15'
                      }`}
                    >
                      {/* Year Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 text-xs font-serif font-bold tracking-wider shadow-sm">
                          {story.year}
                        </span>
                        <span className="text-[10px] text-stone-400 font-sans uppercase tracking-widest font-mono">
                          Momen Ke-{idx + 1}
                        </span>
                      </div>

                      <h3 className={`font-serif text-lg sm:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-stone-800'}`}>
                        {story.title}
                      </h3>

                      {story.image && (
                        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-3.5 bg-stone-100 border border-white/10 shadow-inner">
                          <img
                            src={story.image}
                            alt={story.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                          />
                        </div>
                      )}

                      <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                        {story.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
