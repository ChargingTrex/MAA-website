// src/app/not-found.js
import Link from 'next/link'

export const metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-cream">
      <div className="text-center px-4">
        <p className="text-8xl font-display text-saffron leading-none">404</p>
        <h2 className="text-2xl md:text-3xl font-display text-forest mb-4">We couldn&apos;t find that page</h2>
        <p className="text-charcoal/70 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/contact" className="btn-secondary">Contact Us</Link>
        </div>
        <p className="text-4xl mt-10" aria-hidden="true">🐾</p>
      </div>
    </div>
  )
}
