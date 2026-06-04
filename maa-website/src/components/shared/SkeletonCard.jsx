// src/components/shared/SkeletonCard.jsx

/**
 * Reusable skeleton loading card.
 * @param {number} lines - Number of text lines to show (default 3)
 * @param {boolean} showImage - Whether to show an image placeholder (default true)
 */
export default function SkeletonCard({ lines = 3, showImage = true }) {
  return (
    <div
      className="rounded-xl border border-border bg-white overflow-hidden animate-pulse"
      aria-busy="true"
      aria-label="Loading content"
    >
      {showImage && (
        <div className="w-full aspect-[4/3] bg-bg-subtle" />
      )}
      <div className="p-5 space-y-3">
        <div className="h-4 bg-bg-subtle rounded w-3/4" />
        {Array.from({ length: lines - 1 }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-bg-subtle rounded"
            style={{ width: `${85 - i * 15}%` }}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Grid of skeleton cards for loading states.
 */
export function SkeletonGrid({ count = 6, columns = 3, showImage = true }) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-6`}
      aria-busy="true"
      aria-label="Loading"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} showImage={showImage} />
      ))}
    </div>
  )
}
