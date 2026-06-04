// src/components/shared/PawDivider.jsx
// Decorative paw-print divider — signature element per 05_STYLE_GUIDE.md §0

export default function PawDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-8 ${className}`} aria-hidden="true">
      <div className="flex-1 h-px bg-saffron/20" />
      <span className="text-saffron/50 text-lg select-none">🐾</span>
      <div className="flex-1 h-px bg-saffron/20" />
    </div>
  )
}
