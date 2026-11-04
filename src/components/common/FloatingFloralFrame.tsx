import React from 'react'
import { motion } from 'motion/react'

interface FloatingFloralFrameProps {
  variant?: 'gold' | 'sage' | 'navy' | 'maroon'
  className?: string
  children: React.ReactNode
}

export const FloatingFloralFrame: React.FC<FloatingFloralFrameProps> = ({
  variant = 'gold',
  className = '',
  children
}) => {
  const colorMap = {
    gold: {
      primary: '#D4AF37',
      secondary: '#F59E0B',
      border: 'border-amber-400/30',
      bgGlow: 'bg-amber-500/5'
    },
    sage: {
      primary: '#7D8C7C',
      secondary: '#94A3B8',
      border: 'border-emerald-600/30',
      bgGlow: 'bg-emerald-500/5'
    },
    navy: {
      primary: '#38BDF8',
      secondary: '#F59E0B',
      border: 'border-sky-400/30',
      bgGlow: 'bg-sky-500/5'
    },
    maroon: {
      primary: '#F43F5E',
      secondary: '#D4AF37',
      border: 'border-rose-400/30',
      bgGlow: 'bg-rose-500/5'
    }
  }[variant]

  const CornerArt: React.FC<{ flipX?: boolean; flipY?: boolean }> = ({ flipX, flipY }) => (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        scale: [1, 1.05, 1],
        rotate: flipX === flipY ? [0, 1.5, 0] : [0, -1.5, 0]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className="pointer-events-none absolute z-10"
      style={{
        top: flipY ? 'auto' : '-4px',
        bottom: flipY ? '-4px' : 'auto',
        left: flipX ? 'auto' : '-4px',
        right: flipX ? '-4px' : 'auto',
        transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`frameGrad-${variant}`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={colorMap.primary} />
          <stop offset="1" stopColor={colorMap.secondary} stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* Outer corner lines */}
      <path
        d="M2 20 C2 8, 8 2, 20 2"
        stroke={`url(#frameGrad-${variant})`}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M6 24 C6 12, 12 6, 24 6"
        stroke={`url(#frameGrad-${variant})`}
        strokeWidth="1"
        strokeOpacity="0.6"
        strokeLinecap="round"
      />
      {/* Decorative leaf branch */}
      <path
        d="M10 10 C14 14, 18 16, 26 14 C20 18, 16 22, 14 28"
        stroke={`url(#frameGrad-${variant})`}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="2.5" fill={`url(#frameGrad-${variant})`} />
      <circle cx="26" cy="14" r="1.5" fill={`url(#frameGrad-${variant})`} />
      <circle cx="14" cy="28" r="1.5" fill={`url(#frameGrad-${variant})`} />
    </motion.svg>
  )

  return (
    <div className={`relative ${colorMap.border} ${className}`}>
      <CornerArt />
      <CornerArt flipX />
      <CornerArt flipY />
      <CornerArt flipX flipY />
      {children}
    </div>
  )
}

