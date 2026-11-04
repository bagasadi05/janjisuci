import React from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'

export const BotanicalScrollVine: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  })

  // Height percentage
  const heightPercent = useTransform(scaleY, (v) => `${Math.min(100, Math.max(0, v * 100))}%`)

  return (
    <div
      className="hidden md:block fixed left-2 lg:left-3 top-20 bottom-24 w-6 pointer-events-none z-35"
      aria-hidden="true"
    >
      {/* Background Track Line */}
      <div className="absolute left-2.5 top-0 bottom-0 w-[1.5px] bg-amber-900/10 rounded-full" />

      {/* Growing Botanical Golden Stem */}
      <motion.div
        style={{ height: heightPercent }}
        className="absolute left-2.5 top-0 w-[2px] bg-gradient-to-b from-emerald-600 via-amber-500 to-amber-400 rounded-full origin-top shadow-[0_0_8px_rgba(212,175,55,0.4)]"
      />

      {/* Floating Budding Leaf Tip that tracks the scroll progress */}
      <motion.div
        style={{
          top: heightPercent
        }}
        className="absolute left-0.5 -translate-y-1/2 w-5 h-5 flex items-center justify-center transition-transform"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="rotate-45 drop-shadow">
          <path
            d="M12 2C17 7, 20 14, 12 22C4 14, 7 7, 12 2Z"
            fill="url(#vineTipGrad)"
            stroke="#FEF3C7"
            strokeWidth="0.75"
          />
          <defs>
            <linearGradient id="vineTipGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  )
}

