import React from 'react'
import { motion } from 'motion/react'

interface CalligraphyRevealProps {
  text: string
  className?: string
  delay?: number
  staggerDuration?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span'
  shimmer?: boolean
}

export const CalligraphyReveal: React.FC<CalligraphyRevealProps> = ({
  text,
  className = '',
  delay = 0,
  staggerDuration = 0.04,
  as: Component = 'span',
  shimmer = false
}) => {
  const characters = Array.from(text)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: delay
      }
    }
  }

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 16,
      rotateX: -40,
      filter: 'blur(4px)',
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 120
      }
    }
  }

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={containerVariants}
      className={`inline-block perspective-1000 ${shimmer ? 'relative inline-block' : ''} ${className}`}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={childVariants}
          className="inline-block transform-gpu"
          style={{ transformOrigin: 'bottom center', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      {shimmer && (
        <motion.span
          initial={{ x: '-120%', opacity: 0 }}
          animate={{ x: '160%', opacity: [0, 0.7, 0] }}
          transition={{
            repeat: Infinity,
            repeatDelay: 4,
            duration: 1.8,
            ease: 'easeInOut',
            delay: delay + 0.8
          }}
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent skew-x-12"
          aria-hidden="true"
        />
      )}
    </motion.span>
  )
}

