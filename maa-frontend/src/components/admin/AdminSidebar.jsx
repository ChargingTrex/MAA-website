import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Image, Users, Heart, FileText, Stethoscope, PackageSearch } from 'lucide-react'

const menuItems = [
  { path: '/admin/dashboard',   label: 'Dashboard',  icon: LayoutDashboard },
  { path: '/admin/gallery',     label: 'Gallery',    icon: Image },
  { path: '/admin/team',        label: 'Team',       icon: Users },
  { path: '/admin/csr',         label: 'CSR',        icon: Heart },
  { path: '/admin/facilities',  label: 'Facilities', icon: Stethoscope },
  { path: '/admin/sponsors',    label: 'Sponsors',   icon: PackageSearch },
]

export default function AdminSidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-forest text-white">
      <div className="p-6">
        <h1 className="text-2xl font-display font-bold">Admin</h1>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 ${
                isActive ? 'bg-saffron text-charcoal' : 'hover:bg-forest-dark'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
