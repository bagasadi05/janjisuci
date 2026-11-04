import React from 'react'
import { motion, HTMLMotionProps, Variants } from 'motion/react'

export type MotionVariantType =
  | 'fadeUp'
  | 'fadeDown'
  | 'pop'
  | 'slideLeft'
  | 'slideRight'
  | 'zoomIn'
  | 'flipUp'
  | 'expand'
  | 'blurIn'

export const motionItemVariants: Record<MotionVariantType, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 35, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
    }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -28, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
    }
  },
  pop: {
    hidden: { opacity: 0, scale: 0.78, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', damping: 16, stiffness: 170 }
    }
  },
  slideLeft: {
    hidden: { opacity: 0, x: -44, filter: 'blur(3px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  },
  slideRight: {
    hidden: { opacity: 0, x: 44, filter: 'blur(3px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.88, y: 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  },
  flipUp: {
    hidden: { opacity: 0, rotateX: 22, y: 36 },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
    }
  },
  expand: {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
    }
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  }
}

export interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  stagger?: number
  delayChildren?: number
  viewportAmount?: number
  once?: boolean
  className?: string
}

/**
 * Orchestrates staggered entrance animations for child MotionItem components
 * as soon as this section or card enters the viewport.
 */
export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  stagger = 0.12,
  delayChildren = 0.05,
  viewportAmount = 0.15,
  once = true,
  className = '',
  ...props
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delayChildren
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportAmount }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface MotionItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  variant?: MotionVariantType
  className?: string
  customVariants?: Variants
}

/**
 * Child item designed to sit inside a StaggerContainer.
 * Automatically animates in sequence when the container comes into view.
 */
export const MotionItem: React.FC<MotionItemProps> = ({
  children,
  variant = 'fadeUp',
  className = '',
  customVariants,
  ...props
}) => {
  return (
    <motion.div
      variants={customVariants || motionItemVariants[variant]}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  variant?: MotionVariantType
  delay?: number
  viewportAmount?: number
  once?: boolean
  className?: string
  interactive?: boolean
}

/**
 * Standalone scroll reveal element with GPU-accelerated spring/bezier motion.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  viewportAmount = 0.15,
  once = true,
  className = '',
  interactive = false,
  ...props
}) => {
  const baseVariant = motionItemVariants[variant]

  const customVariant: Variants = {
    hidden: baseVariant.hidden,
    visible: {
      ...baseVariant.visible,
      transition: {
        ...(typeof baseVariant.visible === 'object' ? baseVariant.visible.transition : {}),
        delay
      }
    }
  }

  return (
    <motion.div
      variants={customVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportAmount }}
      className={`${className} ${interactive ? 'card-3d-interactive' : ''}`.trim()}
      {...props}
    >
      {children}
    </motion.div>
  )
}

