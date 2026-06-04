// src/components/ui/LoadingScreen.jsx
export default function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream"
      role="status"
      aria-label="Loading page"
    >
      {/* Paw pulse animation */}
      <div className="relative mb-6">
        <span className="text-5xl animate-pulse" aria-hidden="true">🐾</span>
      </div>
      <p className="text-muted text-sm tracking-wide font-medium">Loading…</p>
    </div>
  )
}
