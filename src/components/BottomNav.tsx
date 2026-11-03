import React, { useState, useEffect } from 'react'
import { Home, Users, Calendar, HeartHandshake, Image as ImageIcon, MessageSquareHeart, Gift } from 'lucide-react'

export const BottomNav: React.FC = () => {
  const [activeNav, setActiveNav] = useState<string>('home')

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'couple', label: 'Mempelai', icon: Users },
    { id: 'events', label: 'Acara', icon: Calendar },
    { id: 'story', label: 'Kisah', icon: HeartHandshake },
    { id: 'gallery', label: 'Galeri', icon: ImageIcon },
    { id: 'rsvp', label: 'Ucapan', icon: MessageSquareHeart },
    { id: 'gift', label: 'Kado', icon: Gift },
  ]

  // Scrollspy: update active nav based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      for (const item of navItems) {
        const el = document.getElementById(item.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setActiveNav(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      aria-label="Navigasi bagian undangan"
      className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-md w-[95%] sm:w-auto px-2 sm:px-4 py-1.5 rounded-full bg-stone-900/90 backdrop-blur-xl border border-amber-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-around sm:gap-1.5"
    >
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeNav === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            className={`relative flex flex-col items-center justify-center min-w-[44px] sm:min-w-[48px] min-h-[44px] py-1 px-1.5 sm:px-3 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              isActive
                ? 'text-amber-300 bg-amber-900/40 scale-105'
                : 'text-stone-400 hover:text-stone-200 active:scale-95'
            }`}
            title={item.label}
          >
            <Icon className="w-4 h-4 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
            <span className="text-[9px] font-sans tracking-tight mt-0.5 hidden sm:inline">
              {item.label}
            </span>
            {isActive && (
              <span className="sm:hidden absolute bottom-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
            )}
          </button>
        )
      })}
    </nav>
  )
}
