// src/components/shared/SectionHeading.jsx
// Canonical section heading pattern per 05_STYLE_GUIDE.md §4.6

/**
 * @param {string} eyebrow - Small uppercase label above heading (optional)
 * @param {string} heading - Main h2 heading text
 * @param {string} subtext - Supporting paragraph below heading (optional)
 * @param {'center'|'left'} align - Text alignment
 */
export default function SectionHeading({ eyebrow, heading, subtext, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center'
  const accentClass = align === 'left' ? '' : 'mx-auto'

  return (
    <div className={`mb-12 ${alignClass}`}>
      {eyebrow && (
        <span className="text-xs font-semibold text-saffron uppercase tracking-widest font-body">
          {eyebrow}
        </span>
      )}
      <h2
        className="font-display text-3xl md:text-4xl text-forest mt-2 leading-snug"
        style={{ textWrap: 'balance' }}
      >
        {heading}
      </h2>
      {subtext && (
        <p
          className="text-base text-muted max-w-2xl mt-3 font-body leading-relaxed"
          style={{ textWrap: 'pretty', ...(align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}) }}
        >
          {subtext}
        </p>
      )}
      {/* Saffron accent underline */}
      <div className={`w-12 h-1 bg-saffron rounded-full mt-4 ${accentClass}`} aria-hidden="true" />
    </div>
  )
}
