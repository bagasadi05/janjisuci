import React, { useEffect, useRef } from 'react'

interface Reveal3DProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  delay?: 0 | 100 | 200 | 300 | 400 | 500
  interactive?: boolean
  as?: React.ElementType
}

export const Reveal3D: React.FC<Reveal3DProps> = ({
  children,
  className = '',
  delay = 0,
  interactive = false,
  as: Component = 'div',
  ...rest
}) => {
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : ''
  const interactiveClass = interactive ? 'card-3d-interactive' : ''

  return (
    <Component
      ref={elementRef}
      className={`reveal-3d ${delayClass} ${interactiveClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  )
}

/**
 * Hook to automatically observe all cards across any of the 16 invitation templates
 * Gives every content card a smooth 3D perspective scroll reveal and tilt effect!
 */
export function useAutoScrollReveal3D(containerRef?: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    // Small timeout to allow DOM elements from template rendering to mount
    const timer = setTimeout(() => {
      const root = containerRef?.current || document

      // Find all elements marked .reveal-3d or main content cards inside sections
      const cardElements = root.querySelectorAll<HTMLElement>(
        '.reveal-3d, section .rounded-2xl, section .rounded-3xl, section .glass-card, section .glass-card-dark'
      )

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -30px 0px'
        }
      )

      cardElements.forEach((el) => {
        // Skip floating buttons, modals, absolute decorative glows, and navbars
        const isAbsolute = window.getComputedStyle(el).position === 'absolute'
        const isFixed = window.getComputedStyle(el).position === 'fixed'
        const isExcluded = el.closest('nav') || el.closest('#bottom-nav') || el.closest('[role="dialog"]') || el.classList.contains('no-3d')

        if (!isAbsolute && !isFixed && !isExcluded) {
          if (!el.classList.contains('reveal-3d')) {
            el.classList.add('reveal-3d', 'card-3d-interactive')
          }
          if (!el.classList.contains('is-visible')) {
            observer.observe(el)
          }
        }
      })

      return () => {
        observer.disconnect()
      }
    }, 150)

    return () => clearTimeout(timer)
  }, [containerRef])
}
