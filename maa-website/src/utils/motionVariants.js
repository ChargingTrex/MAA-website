// src/utils/motionVariants.js
// Standard Framer Motion variants for MAA website

// Fade + slide up (most common — cards, headings, sections)
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

// Stagger container — wraps grid children
export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
}

// Fade in (no movement — overlays, modals)
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

// Scale in (modals, lightbox)
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
}

// Slide in from right (mobile nav drawer)
export const slideInRight = {
  hidden:  { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', stiffness: 400, damping: 35 },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

// Page transition wrapper
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
}
