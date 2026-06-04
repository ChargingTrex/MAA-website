// src/utils/helpers.js

/**
 * Copy text to clipboard with fallback
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
      return true
    } catch {
      return false
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

/**
 * Generate initials from a full name
 */
export function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

/**
 * Format a number with locale-aware separators
 */
export function formatNumber(num, locale = 'en-IN') {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Format a date string with locale awareness
 */
export function formatDate(dateStr, locale = 'en', options = {}) {
  const defaults = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateStr).toLocaleDateString(locale, { ...defaults, ...options })
}

/**
 * Truncate text to a maximum length with ellipsis
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '…'
}

/**
 * Generate a placeholder gradient image URL for development
 */
export function placeholderImage(width = 800, height = 600, label = '') {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // Warm saffron-to-forest gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#2C5F2D')
  gradient.addColorStop(1, '#F4830F')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // Add label text
  if (label) {
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.font = `${Math.min(width, height) * 0.06}px "Plus Jakarta Sans", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, width / 2, height / 2)
  }

  return canvas.toDataURL('image/jpeg', 0.85)
}

/**
 * Clamp a number between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}
