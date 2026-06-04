// src/lib/motionVariants.js
// Standard Framer Motion animation variants per 05_STYLE_GUIDE.md §5.2

/** Fade + slide up — most common (cards, headings) */
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

/** Stagger container — wraps grid children */
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

/** Fade in (no movement — overlays, modals) */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

/** Scale in (modals, lightbox) */
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
}

/** Slide in from right (mobile nav drawer) */
export const slideInRight = {
  hidden:  { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit:    { x: '100%', transition: { duration: 0.2 } },
}

/** Slide in from left */
export const slideInLeft = {
  hidden:  { x: '-100%' },
  visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit:    { x: '-100%', transition: { duration: 0.2 } },
}
