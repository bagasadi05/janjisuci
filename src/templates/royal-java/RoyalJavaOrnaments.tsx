import React from 'react'

// Gunungan Wayang SVG with intricate sacred Javanese details
export const GununganWayangSvg: React.FC<{
  className?: string
  side?: 'left' | 'right' | 'full'
  color?: string
}> = ({ className = 'w-48 h-72', side = 'full', color = '#C8963E' }) => {
  return (
    <svg
      viewBox="0 0 200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="goldGradientGunungan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9E79F" />
          <stop offset="40%" stopColor="#C8963E" />
          <stop offset="80%" stopColor="#8A5A1B" />
          <stop offset="100%" stopColor="#DFB15B" />
        </linearGradient>
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
      </defs>

      {/* Gunungan Leaf Outer Contour */}
      <path
        d="M100 8 C115 45 185 110 185 210 C185 270 140 295 100 300 C60 295 15 270 15 210 C15 110 85 45 100 8 Z"
        fill="#1A1512"
        stroke="url(#goldGradientGunungan)"
        strokeWidth="3.5"
      />

      {/* Inner Decorative Border */}
      <path
        d="M100 24 C112 55 172 118 172 205 C172 258 132 282 100 286 C68 282 28 258 28 205 C28 118 88 55 100 24 Z"
        fill="none"
        stroke="url(#goldGradientGunungan)"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        opacity="0.85"
      />

      {/* Pohon Hayat (Tree of Life) Trunk & Branches */}
      <path
        d="M100 295 L100 130"
        stroke="url(#goldGradientGunungan)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M100 210 Q130 190 145 160"
        stroke="url(#goldGradientGunungan)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M100 210 Q70 190 55 160"
        stroke="url(#goldGradientGunungan)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M100 170 Q125 150 140 120"
        stroke="url(#goldGradientGunungan)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M100 170 Q75 150 60 120"
        stroke="url(#goldGradientGunungan)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Kayon Leaf Sprouts */}
      <circle cx="100" cy="50" r="10" stroke="url(#goldGradientGunungan)" strokeWidth="2" fill="none" />
      <circle cx="100" cy="50" r="4" fill="url(#goldGradientGunungan)" />
      <circle cx="145" cy="160" r="5" fill="url(#goldGradientGunungan)" />
      <circle cx="55" cy="160" r="5" fill="url(#goldGradientGunungan)" />
      <circle cx="140" cy="120" r="4" fill="url(#goldGradientGunungan)" />
      <circle cx="60" cy="120" r="4" fill="url(#goldGradientGunungan)" />

      {/* Gapura Paduraksa (Temple Gate) Silhouette at the Bottom */}
      <rect x="75" y="240" width="50" height="55" rx="3" stroke="url(#goldGradientGunungan)" strokeWidth="2" fill="#251E19" />
      <path d="M70 240 L100 215 L130 240 Z" fill="url(#goldGradientGunungan)" />
      <line x1="100" y1="240" x2="100" y2="295" stroke="#120F0D" strokeWidth="2" />

      {/* Side specific highlight if left or right */}
      {side === 'left' && (
        <path d="M100 8 L100 300" stroke="url(#goldGradientGunungan)" strokeWidth="3" />
      )}
      {side === 'right' && (
        <path d="M100 8 L100 300" stroke="url(#goldGradientGunungan)" strokeWidth="3" />
      )}
    </svg>
  )
}

// Surya Majapahit 8-Pointed Star Seal
export const SuryaMajapahitSeal: React.FC<{
  className?: string
  glow?: boolean
}> = ({ className = 'w-24 h-24', glow = true }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {glow && (
        <div className="absolute inset-0 rounded-full bg-amber-500/25 blur-lg animate-pulse" />
      )}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <defs>
          <linearGradient id="suryaGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#8A5A1B" />
            <stop offset="100%" stopColor="#E5C158" />
          </linearGradient>
        </defs>

        {/* 8 Sun Rays */}
        <g stroke="url(#suryaGold)" strokeWidth="2.5" strokeLinecap="round">
          <line x1="50" y1="6" x2="50" y2="20" />
          <line x1="50" y1="80" x2="50" y2="94" />
          <line x1="6" y1="50" x2="20" y2="50" />
          <line x1="80" y1="50" x2="94" y2="50" />
          <line x1="18.9" y1="18.9" x2="28.8" y2="28.8" />
          <line x1="71.2" y1="71.2" x2="81.1" y2="81.1" />
          <line x1="18.9" y1="81.1" x2="28.8" y2="71.2" />
          <line x1="71.2" y1="28.8" x2="81.1" y2="18.9" />
        </g>

        {/* Outer Circular Ring with Dots */}
        <circle cx="50" cy="50" r="32" stroke="url(#suryaGold)" strokeWidth="2" fill="#201914" />
        <circle cx="50" cy="50" r="28" stroke="url(#suryaGold)" strokeWidth="1" strokeDasharray="3 3" fill="none" />

        {/* Center Golden Core */}
        <circle cx="50" cy="50" r="16" fill="url(#suryaGold)" />
        <circle cx="50" cy="50" r="8" fill="#15110E" />
      </svg>
    </div>
  )
}

// Javanese Paduraksa Arch Divider
export const JavaneseDivider: React.FC<{ className?: string }> = ({ className = 'my-4' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-amber-600/60 to-amber-500" />
      <div className="w-2.5 h-2.5 rotate-45 border border-amber-400 bg-amber-600/30" />
      <SuryaMajapahitSeal className="w-8 h-8" glow={false} />
      <div className="w-2.5 h-2.5 rotate-45 border border-amber-400 bg-amber-600/30" />
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-amber-600/60 to-amber-500" />
    </div>
  )
}

// Javanese Corner Border
export const JavaneseCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}> = ({ position }) => {
  const getTransforms = () => {
    switch (position) {
      case 'top-left':
        return 'top-2.5 left-2.5'
      case 'top-right':
        return 'top-2.5 right-2.5 rotate-90'
      case 'bottom-right':
        return 'bottom-2.5 right-2.5 rotate-180'
      case 'bottom-left':
        return 'bottom-2.5 left-2.5 -rotate-90'
    }
  }

  return (
    <div className={`absolute ${getTransforms()} pointer-events-none select-none z-10 w-9 h-9`}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 38 V10 C2 5.58 5.58 2 10 2 H38" stroke="#C8963E" strokeWidth="2" />
        <path d="M7 38 V12 C7 9.24 9.24 7 12 7 H38" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="12" cy="12" r="2.5" fill="#C8963E" />
      </svg>
    </div>
  )
}
