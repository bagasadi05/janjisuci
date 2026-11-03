import React, { useMemo } from 'react'

export const GoldBokehShimmer: React.FC<{ active?: boolean }> = ({ active = true }) => {
  if (!active) return null

  const orbs = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 5
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {orbs.map((o) => (
        <span
          key={o.id}
          className="absolute rounded-full"
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            width: `${o.size}px`,
            height: `${o.size}px`,
            background: 'radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0) 70%)',
            animation: `bokehPulse ${o.duration}s ease-in-out infinite alternate`,
            animationDelay: `${o.delay}s`
          }}
        />
      ))}
      <style>{`
        @keyframes bokehPulse {
          0% {
            transform: scale(0.8) translateY(0px);
            opacity: 0.2;
          }
          100% {
            transform: scale(1.3) translateY(-30px);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}
