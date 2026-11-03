import React from 'react'
import { Heart, Sparkles } from 'lucide-react'
import { weddingData } from '../config/weddingData'
import { FloralDivider } from './Ornament'

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="relative py-12 px-4 scroll-mt-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-900/10 border border-amber-700/20 text-amber-900 text-xs uppercase tracking-widest font-sans font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Perjalanan Cinta</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
          Kisah Cinta Kami
        </h2>
        <FloralDivider className="my-3" />
        <p className="font-serif italic text-xs sm:text-sm text-stone-600 mb-12 px-4 max-w-lg mx-auto leading-relaxed">
          "Setiap kisah cinta itu indah, namun kisah kami adalah anugerah yang paling kami syukuri."
        </p>

        {/* Timeline Container: Left aligned on mobile, alternating zig-zag on tablet/desktop */}
        <div className="relative text-left">
          {/* Center line on desktop, left line on mobile */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-amber-600/10 via-amber-600/50 to-amber-600/10" />

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
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 z-10 w-9 h-9 rounded-full bg-gradient-to-tr from-amber-800 to-amber-600 text-amber-100 flex items-center justify-center border-4 border-[#FAF7F2] shadow-lg">
                    <Heart className="w-4 h-4 fill-amber-100" />
                  </div>

                  {/* Spacer for the other side on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Story Polaroid Card */}
                  <div className="w-full pl-14 md:pl-0 md:w-1/2 md:px-8">
                    <div className="p-5 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-md border border-amber-800/15 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                      
                      {/* Year Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-700 to-amber-600 text-white text-xs font-serif font-bold tracking-wider shadow-sm">
                          {story.year}
                        </span>
                        <span className="text-[10px] text-stone-400 font-sans uppercase tracking-widest">
                          Momen Ke-{idx + 1}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-800 mb-2">
                        {story.title}
                      </h3>

                      {story.image && (
                        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-3.5 bg-stone-100 border-2 border-stone-100 shadow-inner">
                          <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}

                      <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
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
