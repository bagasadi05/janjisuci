import React, { useMemo } from 'react'

interface StarryAmbianceProps {
  active?: boolean
}

export const StarryAmbiance: React.FC<StarryAmbianceProps> = ({ active = true }) => {
  const stars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.7 + 0.3
    }))
  }, [])

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-[#D7BB83] animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            boxShadow: '0 0 6px rgba(215, 187, 131, 0.8)'
          }}
        />
      ))}
    </div>
  )
}
