import React, { useEffect, useRef } from 'react'

export interface Reveal3DProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  delay?: number
  interactive?: boolean
  as?: React.ElementType
  type?: 'button' | 'submit' | 'reset'
}

/**
 * Reveal3D / RevealCascade Component
 * Smooth floating entrance with de-blurring and staggered cascade delays
 */
export const Reveal3D: React.FC<Reveal3DProps> = ({
  children,
  className = '',
  delay = 0,
  interactive = false,
  as: Component = 'div',
  style,
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
        threshold: 0.08,
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
  const inlineStyle: React.CSSProperties = {
    ...style,
    ...(delay > 0 && !delayClass ? { transitionDelay: `${delay}ms` } : {})
  }

  return (
    <Component
      ref={elementRef}
      className={`reveal-cascade ${delayClass} ${interactiveClass} ${className}`.trim()}
      style={inlineStyle}
      {...rest}
    >
      {children}
    </Component>
  )
}

// Backward compatibility alias
export const RevealCascade = Reveal3D

/**
 * Hook to automatically orchestrate sequential "muncul satu-satu" (cascading stagger)
 * across headings, cards, and grid items in every invitation template!
 */
export function useAutoScrollReveal3D(containerRef?: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    // Small delay to ensure template DOM nodes have mounted
    const timer = setTimeout(() => {
      const root = containerRef?.current || document

      // Find all thematic sections
      const sections = root.querySelectorAll<HTMLElement>('section, main > div, #main-content section')

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
          threshold: 0.06,
          rootMargin: '0px 0px -30px 0px'
        }
      )

      sections.forEach((section) => {
        // Collect key sequential elements within this section
        const candidates = section.querySelectorAll<HTMLElement>(
          'h1, h2, h3, .section-title, p.leading-relaxed, .rounded-2xl, .rounded-3xl, .glass-card, .glass-card-dark, .grid > div, .grid > button, .reveal-3d, .reveal-cascade'
        )

        let staggerIndex = 0

        candidates.forEach((el) => {
          // Exclude absolute decorative graphics, floating navigation, and modals
          const computed = window.getComputedStyle(el)
          const isAbsolute = computed.position === 'absolute'
          const isFixed = computed.position === 'fixed'
          const isExcluded =
            isAbsolute ||
            isFixed ||
            el.closest('nav') ||
            el.closest('#bottom-nav') ||
            el.closest('[role="dialog"]') ||
            el.closest('.fixed') ||
            el.classList.contains('no-reveal')

          if (!isExcluded) {
            // Apply cascade class
            if (!el.classList.contains('reveal-cascade') && !el.classList.contains('reveal-3d')) {
              el.classList.add('reveal-cascade')
            }

            // Assign smart incremental cascade delay (0ms, 120ms, 240ms, 360ms...)
            // so elements enter sequentially ("muncul satu-satu") as user scrolls
            const existingDelay = el.style.transitionDelay
            if (!existingDelay && !el.className.includes('reveal-delay-')) {
              const calculatedDelay = Math.min(staggerIndex * 120, 600)
              el.style.transitionDelay = `${calculatedDelay}ms`
            }

            staggerIndex++

            if (!el.classList.contains('is-visible')) {
              observer.observe(el)
            }
          }
        })
      })

      return () => {
        observer.disconnect()
      }
    }, 180)

    return () => clearTimeout(timer)
  }, [containerRef])
}
