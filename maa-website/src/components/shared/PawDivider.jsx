// src/components/shared/PawDivider.jsx

/**
 * Decorative paw divider per 05_STYLE_GUIDE.md §7.2.
 * Thin saffron/20 horizontal rule with a cream circle containing an SVG paw icon.
 */
export default function PawDivider() {
  return (
    <div className="relative flex items-center my-12" aria-hidden="true">
      <div className="flex-1 border-t-2 border-saffron/20" />
      <div className="mx-4 w-8 h-8 rounded-full bg-cream flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="#F4830F" className="w-5 h-5">
          <path d="M12 13.5C10.34 13.5 9 15.07 9 17c0 1.93 1.34 3.5 3 3.5s3-1.57 3-3.5c0-1.93-1.34-3.5-3-3.5z"/>
          <circle cx="7.5" cy="10.5" r="1.5"/>
          <circle cx="16.5" cy="10.5" r="1.5"/>
          <circle cx="10" cy="7.5" r="1.5"/>
          <circle cx="14" cy="7.5" r="1.5"/>
        </svg>
      </div>
      <div className="flex-1 border-t-2 border-saffron/20" />
    </div>
  )
}
