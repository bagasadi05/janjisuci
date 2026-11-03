import React, { useMemo } from 'react'

interface Petal {
  id: number
  left: string
  animationDuration: string
  animationDelay: string
  size: number
  opacity: number
}

export const FallingPetals: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${(i * 6.5 + Math.random() * 4).toFixed(1)}%`,
      animationDuration: `${(7 + Math.random() * 6).toFixed(1)}s`,
      animationDelay: `${(Math.random() * 8).toFixed(1)}s`,
      size: Math.floor(12 + Math.random() * 12),
      opacity: Number((0.35 + Math.random() * 0.45).toFixed(2)),
    }))
  }, [])

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal-fall absolute"
          style={{
            left: petal.left,
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            opacity: petal.opacity,
          }}
        >
          {/* Subtle rose / sakura petal shape */}
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 30 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 0C25 10 30 25 15 40C0 25 5 10 15 0Z"
              fill="url(#petal-grad)"
            />
            <defs>
              <linearGradient id="petal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F9C6D1" />
                <stop offset="50%" stopColor="#E5989B" />
                <stop offset="100%" stopColor="#B5828C" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  )
}
