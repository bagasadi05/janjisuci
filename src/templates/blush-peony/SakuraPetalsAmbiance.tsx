import React, { useMemo } from 'react'

export const SakuraPetalsAmbiance: React.FC<{ active?: boolean }> = ({ active = true }) => {
  if (!active) return null

  const petals = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 10 + 8,
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 5,
      color: ['#F7CAD0', '#FFB3C6', '#FF8FAB', '#FB6F92'][i % 4]
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute opacity-75"
          style={{
            left: `${p.left}%`,
            top: '-20px',
            width: `${p.size}px`,
            height: `${p.size * 1.4}px`,
            backgroundColor: p.color,
            borderRadius: '50% 0 50% 50%',
            animation: `fallSakura ${p.duration}s infinite ease-in-out`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}

      <style>{`
        @keyframes fallSakura {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(50vh) rotate(160deg) scale(1.1) translateX(25px);
          }
          100% {
            transform: translateY(105vh) rotate(320deg) scale(0.7) translateX(-20px);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          span {
            animation: none !important;
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
