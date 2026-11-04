import React from 'react'

export const NavyParticlesAmbiance: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Royal Navy Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px]" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-indigo-600/10 blur-[120px]" />

      {/* Floating subtle star points */}
      {[...Array(18)].map((_, i) => {
        const top = (i * 17) % 100
        const left = (i * 23) % 100
        const delay = (i * 0.4) % 3
        const duration = 2.5 + ((i * 0.3) % 2.5)
        const size = i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5

        return (
          <div
            key={i}
            className="absolute rounded-full bg-amber-200/60 animate-pulse motion-reduce:animate-none shadow-[0_0_8px_rgba(251,191,36,0.5)]"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`
            }}
          />
        )
      })}
    </div>
  )
}
