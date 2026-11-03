import React from 'react'

export const FloralDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-5 ${className}`}>
      <span className="h-[1px] w-14 sm:w-24 bg-gradient-to-r from-transparent via-amber-600/50 to-amber-700/80" />
      <div className="relative flex items-center justify-center text-amber-700/90">
        <svg
          className="w-6 h-6 animate-pulse"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C12 2 13.8 6.8 17.5 8.2C13.8 9.6 12 14.5 12 14.5C12 14.5 10.2 9.6 6.5 8.2C10.2 6.8 12 2 12 2Z" />
          <path d="M12 14.5C12 14.5 13.2 17.5 15 18.5C13.2 19.5 12 22.5 12 22.5C12 22.5 10.8 19.5 9 18.5C10.8 17.5 12 14.5 12 14.5Z" opacity="0.6" />
        </svg>
      </div>
      <span className="h-[1px] w-14 sm:w-24 bg-gradient-to-l from-transparent via-amber-600/50 to-amber-700/80" />
    </div>
  )
}

export const BotanicalCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}> = ({ position, className = "" }) => {
  const getTransforms = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0'
      case 'top-right':
        return 'top-0 right-0 scale-x-[-1]'
      case 'bottom-left':
        return 'bottom-0 left-0 scale-y-[-1]'
      case 'bottom-right':
        return 'bottom-0 right-0 scale-[-1]'
    }
  }

  return (
    <div className={`absolute pointer-events-none p-3.5 z-0 opacity-45 ${getTransforms()} ${className}`}>
      <svg width="68" height="68" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6 C28 12, 52 32, 62 72" stroke="#849688" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M6 6 C12 28, 32 52, 72 62" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="24" cy="18" r="3.5" fill="#849688" />
        <circle cx="42" cy="30" r="3" fill="#D4AF37" />
        <circle cx="18" cy="40" r="3" fill="#849688" />
        <path d="M24 18 C28 10, 36 12, 34 20 C32 28, 24 24, 24 18 Z" fill="#849688" opacity="0.6" />
        <path d="M18 40 C10 44, 12 52, 20 50 C28 48, 24 40, 18 40 Z" fill="#D4AF37" opacity="0.6" />
      </svg>
    </div>
  )
}

export const WaxSealEmblem: React.FC<{
  monogram?: string
  className?: string
  onClick?: () => void
}> = ({ monogram = "R 💍 S", className = "", onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none group transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
    >
      {/* Outer Glow */}
      <span className="absolute -inset-2 rounded-full bg-amber-500/30 blur-lg animate-pulse" />

      {/* 3D Wax Body */}
      <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-rose-950 via-rose-900 to-amber-900 border-2 border-amber-400/60 shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center justify-center p-2 overflow-hidden">
        {/* Irregular wax edge simulation */}
        <div className="absolute inset-1 rounded-full border border-amber-300/30 opacity-70" />
        <div className="absolute inset-2.5 rounded-full border border-dashed border-amber-300/40 opacity-80" />

        {/* Embossed Center */}
        <div className="relative flex flex-col items-center justify-center text-center">
          <span className="font-serif font-extrabold text-amber-200 tracking-wider text-xs sm:text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            {monogram}
          </span>
          <span className="text-[8px] font-sans uppercase tracking-[0.2em] text-amber-300/80 mt-0.5 font-bold">
            WALIMAH
          </span>
        </div>
      </div>
    </div>
  )
}
