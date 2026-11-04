import React, { useMemo } from 'react'

export const AutumnLeavesAmbiance: React.FC<{ active?: boolean }> = ({ active = true }) => {
  if (!active) return null

  const leaves = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 6 + 7,
      delay: Math.random() * 5,
      color: ['#C06C54', '#DDA15E', '#A0522D', '#8C7A6B'][i % 4],
      rotate: Math.random() * 360
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {leaves.map((l) => (
        <span
          key={l.id}
          className="absolute opacity-80"
          style={{
            left: `${l.left}%`,
            top: '-20px',
            width: `${l.size}px`,
            height: `${l.size * 1.3}px`,
            backgroundColor: l.color,
            borderRadius: '50% 0 50% 50%',
            transform: `rotate(${l.rotate}deg)`,
            animation: `fallLeaves ${l.duration}s infinite ease-in-out`,
            animationDelay: `${l.delay}s`
          }}
        />
      ))}

      <style>{`
        @keyframes fallLeaves {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(25px);
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(-20px);
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
