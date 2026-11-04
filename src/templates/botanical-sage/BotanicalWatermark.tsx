import React from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export const BotanicalWatermark: React.FC = () => {
  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 2000], [0, 140])
  const rotateSway = useTransform(scrollY, [0, 2000], [0, 15])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Top Right Organic Foliage Silhouette */}
      <motion.div
        style={{ y: yParallax, rotate: rotateSway }}
        className="absolute -top-16 -right-16 w-80 h-80 opacity-[0.07] select-none"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-emerald-950 fill-current">
          <path d="M100 20 C140 30, 170 70, 160 110 C150 150, 110 180, 70 170 C30 160, 10 120, 20 80 C30 40, 60 10, 100 20 Z" />
          <path d="M120 40 C160 60, 180 100, 160 140 C140 180, 90 190, 60 160 C30 130, 40 80, 70 50 Z" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Mid Left Delicate Eucalyptus Branch */}
      <motion.div
        style={{ y: useTransform(scrollY, [0, 2000], [0, -80]) }}
        className="absolute top-1/3 -left-20 w-72 h-72 opacity-[0.06] select-none"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-amber-900 fill-current">
          <path d="M30 170 Q100 100 170 30" stroke="currentColor" strokeWidth="3" />
          <circle cx="70" cy="130" r="18" />
          <circle cx="100" cy="100" r="22" />
          <circle cx="130" cy="70" r="20" />
          <circle cx="155" cy="45" r="16" />
        </svg>
      </motion.div>

      {/* Lower Right Golden Sunbeam Glow */}
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-gradient-to-tl from-amber-400/10 via-emerald-500/5 to-transparent rounded-full blur-3xl" />
    </div>
  )
}

