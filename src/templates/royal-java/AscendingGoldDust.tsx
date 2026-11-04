import React, { useMemo } from 'react'

interface GoldDustProps {
  active?: boolean
}

export const AscendingGoldDust: React.FC<GoldDustProps> = ({ active = true }) => {
  if (!active) return null

  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 7,
      opacity: Math.random() * 0.7 + 0.3
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-amber-300"
          style={{
            left: `${p.left}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: '0 0 8px #F9E79F, 0 0 16px #C8963E',
            animation: `ascendDust ${p.duration}s infinite linear`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}

      <style>{`
        @keyframes ascendDust {
          0% {
            transform: translateY(0) translateX(0) scale(0.6);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(-50vh) translateX(${Math.random() > 0.5 ? '20px' : '-20px'}) scale(1);
            opacity: 1;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-105vh) translateX(${Math.random() > 0.5 ? '-30px' : '30px'}) scale(0.4);
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
