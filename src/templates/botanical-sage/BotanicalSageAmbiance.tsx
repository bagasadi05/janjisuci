import React, { useMemo } from 'react'

interface SageLeaf {
  id: number
  left: string
  animationDuration: string
  animationDelay: string
  size: number
  opacity: number
  variant: 'sage' | 'olive' | 'gold'
  rotation: number
}

export const BotanicalSageAmbiance: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const leaves = useMemo<SageLeaf[]>(() => {
    const variants: ('sage' | 'olive' | 'gold')[] = ['sage', 'sage', 'olive', 'gold']
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.5 + Math.random() * 3).toFixed(1)}%`,
      animationDuration: `${(8 + Math.random() * 6).toFixed(1)}s`,
      animationDelay: `${(Math.random() * 7).toFixed(1)}s`,
      size: Math.floor(16 + Math.random() * 16),
      opacity: Number((0.45 + Math.random() * 0.45).toFixed(2)),
      variant: variants[i % variants.length],
      rotation: Math.floor(Math.random() * 360)
    }))
  }, [])

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {leaves.map((leaf) => {
        const isGold = leaf.variant === 'gold'
        const isOlive = leaf.variant === 'olive'
        const gradId = `leaf-grad-${leaf.id}`

        return (
          <div
            key={leaf.id}
            className="absolute petal-fall motion-reduce:hidden"
            style={{
              left: leaf.left,
              animationDuration: leaf.animationDuration,
              animationDelay: leaf.animationDelay,
              opacity: leaf.opacity
            }}
          >
            <svg
              width={leaf.size}
              height={leaf.size * 1.5}
              viewBox="0 0 32 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: `rotate(${leaf.rotation}deg)`
              }}
            >
              <defs>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  {isGold ? (
                    <>
                      <stop offset="0%" stopColor="#FDE68A" />
                      <stop offset="60%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#92400E" />
                    </>
                  ) : isOlive ? (
                    <>
                      <stop offset="0%" stopColor="#A3B899" />
                      <stop offset="60%" stopColor="#667C5E" />
                      <stop offset="100%" stopColor="#3E4F39" />
                    </>
                  ) : (
                    <>
                      <stop offset="0%" stopColor="#D1DCD0" />
                      <stop offset="50%" stopColor="#829584" />
                      <stop offset="100%" stopColor="#4A5C4C" />
                    </>
                  )}
                </linearGradient>
              </defs>

              {/* Natural Oval Sage Leaf Shape */}
              <path
                d="M16 2 C28 14, 30 32, 16 46 C2 32, 4 14, 16 2 Z"
                fill={`url(#${gradId})`}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
              />
              {/* Subtle Center Vein */}
              <path
                d="M16 6 L16 42"
                stroke={isGold ? '#FEF3C7' : '#FFFFFF'}
                strokeWidth="0.8"
                strokeOpacity="0.4"
                strokeLinecap="round"
              />
              {/* Diagonal Side Veins */}
              <path
                d="M16 16 L22 12 M16 24 L24 19 M16 32 L22 28 M16 16 L10 12 M16 24 L8 19 M16 32 L10 28"
                stroke={isGold ? '#FEF3C7' : '#FFFFFF'}
                strokeWidth="0.6"
                strokeOpacity="0.3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )
      })}

      {/* Floating Gold Sun Dust Specks */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute rounded-full bg-amber-300 animate-float"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              left: `${(i * 8.5 + 4).toFixed(1)}%`,
              top: `${(i * 7.5 + 10).toFixed(1)}%`,
              opacity: 0.35 + (i % 4) * 0.15,
              animationDuration: `${4 + (i % 3) * 2}s`,
              animationDelay: `${i * 0.4}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

