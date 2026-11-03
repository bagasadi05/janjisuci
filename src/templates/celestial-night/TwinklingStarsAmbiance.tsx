import React, { useMemo } from 'react'

export const TwinklingStarsAmbiance: React.FC<{ active?: boolean }> = ({ active = true }) => {
  if (!active) return null

  const stars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-amber-200"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            boxShadow: '0 0 6px #F4D06F, 0 0 12px #FFFFFF',
            animation: `twinkle ${s.duration}s infinite ease-in-out`,
            animationDelay: `${s.delay}s`
          }}
        />
      ))}

      {/* Occasional Meteor Streak */}
      <div className="absolute top-10 -left-10 w-48 h-[1px] bg-gradient-to-r from-transparent via-amber-200 to-transparent rotate-45 animate-meteor pointer-events-none opacity-0" />

      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.7);
          }
          50% {
            opacity: 1;
            transform: scale(1.4);
          }
        }
        @keyframes meteor {
          0% {
            transform: translateX(0) translateY(0) rotate(45deg);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) translateY(100vh) rotate(45deg);
            opacity: 0;
          }
        }
        .animate-meteor {
          animation: meteor 10s linear infinite;
        }
      `}</style>
    </div>
  )
}
