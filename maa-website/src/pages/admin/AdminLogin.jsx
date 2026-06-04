// src/pages/admin/AdminLogin.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/context/AuthContext'
import { Lock } from 'lucide-react'

export default function AdminLogin() {
  const { t } = useTranslation()
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // If already logged in, redirect
  if (isAuthenticated) {
    navigate('/admin', { replace: true })
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin', { replace: true })
    } catch {
      setError(t('admin.login.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-forest px-4 relative overflow-hidden">
      {/* Diagonal stripe texture per Style Guide */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
          backgroundSize: '12px 12px',
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
          {/* Logo / Title */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4 border border-forest/10">
              <Lock size={28} strokeWidth={1.5} className="text-forest" aria-hidden="true" />
            </div>
            <h1 className="font-display text-3xl font-bold text-forest">
              {t('admin.login.heading')}
            </h1>
            <p className="text-sm text-charcoal/60 mt-2 font-body">{t('admin.login.tagline')}</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 px-5 py-3 rounded-xl bg-red-50 border border-red-200 text-sm font-semibold text-red-600 font-body">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold text-charcoal mb-2 font-body">
                {t('admin.login.email')}
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-body transition-all outline-none focus:bg-white focus:border-saffron focus:ring-4 focus:ring-saffron/20"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-charcoal mb-2 font-body">
                {t('admin.login.password')}
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-body transition-all outline-none focus:bg-white focus:border-saffron focus:ring-4 focus:ring-saffron/20"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-saffron text-white text-base font-semibold rounded-full shadow-md hover:bg-saffron-dark hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-body mt-2"
            >
              {loading ? 'Authenticating...' : t('admin.login.submit')}
            </button>
          </form>

          <p className="text-xs font-semibold text-charcoal/40 text-center mt-8 font-body tracking-wide">
            DEV ACCESS: admin@maa.org / admin123
          </p>
        </div>
      </div>
    </div>
  )
}
