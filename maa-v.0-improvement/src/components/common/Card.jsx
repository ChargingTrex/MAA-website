import { clsx } from 'clsx'

export default function Card({ children, hover, className = '' }) {
  // Only apply default background if the caller hasn't supplied their own bg-* class
  const hasCustomBg = className.split(' ').some(cls => cls.startsWith('bg-'))
  const baseStyles = clsx(
    'rounded-[2rem] p-8 border shadow-xl transition-all duration-300',
    hasCustomBg
      ? 'border-white/20 shadow-black/10'                                      // custom bg: subtle border/shadow
      : 'bg-white/90 backdrop-blur-md border-white/50 shadow-forest/5'         // default: glassmorphism
  )
  const hoverStyles = hover ? 'hover:shadow-2xl hover:shadow-forest/10 hover:-translate-y-2' : ''

  return (
    <div className={clsx(baseStyles, hoverStyles, className)}>
      {children}
    </div>
  )
}

