// src/components/shared/PageHero.jsx
// Reusable page hero per 05_STYLE_GUIDE.md §4.7

/**
 * @param {string} title - Main h1 heading
 * @param {string} subtitle - Supporting text (optional)
 * @param {'forest'|'saffron'} variant - Background colour variant
 */
export default function PageHero({ title, subtitle, variant = 'forest' }) {
  const bgClass = variant === 'saffron' ? 'bg-saffron' : 'bg-forest'

  return (
    <section className={`${bgClass} py-20 md:py-28 relative overflow-hidden`} aria-label="Page hero">
      {/* Diagonal stripe texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] texture-stripe"
        aria-hidden="true"
      />

      <div className="section-wrapper relative text-center">
        <h1
          className="font-display text-4xl md:text-5xl text-white leading-tight"
          style={{ textWrap: 'balance' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-white/75 text-lg mt-4 max-w-2xl mx-auto font-body leading-relaxed"
            style={{ textWrap: 'pretty' }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom wave transition to cream background */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 48h1440V24C1200 0 960 48 720 24S240 0 0 24v24z" fill="#FFF8F0" />
        </svg>
      </div>
    </section>
  )
}
