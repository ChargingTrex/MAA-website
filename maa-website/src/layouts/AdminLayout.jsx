// src/layouts/AdminLayout.jsx
import { Navigate, Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import {
  LayoutDashboard,
  ImageIcon,
  Users,
  HeartHandshake,
  FileText,
  LogOut,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

const SIDEBAR_LINKS = [
  { to: '/admin',         icon: LayoutDashboard, labelKey: 'admin.sidebar.dashboard', end: true },
  { to: '/admin/gallery', icon: ImageIcon,       labelKey: 'admin.sidebar.gallery' },
  { to: '/admin/team',    icon: Users,           labelKey: 'admin.sidebar.team' },
  { to: '/admin/csr',     icon: HeartHandshake,  labelKey: 'admin.sidebar.csr' },
  { to: '/admin/content', icon: FileText,        labelKey: 'admin.sidebar.content' },
]

export default function AdminLayout() {
  const { isAuthenticated, loading, logout, user } = useAuth()
  const { t } = useTranslation()

  // Wait for auth hydration
  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-cream" role="status">
        <p className="text-charcoal/60 text-sm font-body">Loading…</p>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-dvh flex bg-gray-50 font-body">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col bg-forest text-white shrink-0 shadow-xl z-20">
        {/* Sidebar header */}
        <div className="px-6 py-6 border-b border-white/10 relative overflow-hidden">
          {/* Diagonal stripe texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
              backgroundSize: '12px 12px',
            }}
            aria-hidden="true"
          />
          <div className="relative">
            <p className="font-display text-xl font-bold text-saffron-light">MAA Admin</p>
            {user?.name && (
              <p className="text-xs text-white/70 mt-1.5">{user.name}</p>
            )}
          </div>
        </div>

        {/* Sidebar nav */}
        <nav className="flex-1 py-6 px-4 space-y-1.5" aria-label="Admin navigation">
          {SIDEBAR_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white/15 text-white shadow-sm'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                {t(link.labelKey)}
              </NavLink>
            )
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="px-4 pb-6">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
          >
            <LogOut size={18} strokeWidth={1.5} aria-hidden="true" />
            {t('admin.sidebar.logout')}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="md:hidden sticky top-0 z-30 bg-forest text-white px-5 py-4 flex items-center justify-between shadow-md relative overflow-hidden">
          {/* Diagonal stripe texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
              backgroundSize: '12px 12px',
            }}
            aria-hidden="true"
          />
          <span className="font-display text-lg font-bold text-saffron-light relative">MAA Admin</span>
          <button
            onClick={logout}
            className="text-sm font-semibold text-white/80 hover:text-white transition-colors cursor-pointer relative"
          >
            {t('admin.sidebar.logout')}
          </button>
        </header>

        {/* Mobile nav (horizontal scroll) */}
        <div className="md:hidden bg-white shadow-sm z-20">
          <nav className="flex overflow-x-auto scrollbar-hide px-2 gap-1" aria-label="Admin mobile navigation">
            {SIDEBAR_LINKS.map((link) => {
              const Icon = link.icon
              return (
               <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 ${
                      isActive
                        ? 'border-saffron text-saffron'
                        : 'border-transparent text-charcoal/60 hover:text-charcoal'
                    }`
                  }
                >
                  <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                  {t(link.labelKey)}
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Page content scrollable area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-cream/30">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
