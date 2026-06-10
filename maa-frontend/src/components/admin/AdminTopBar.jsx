import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminTopBar() {
  const navigate = useNavigate()
  const { admin, logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/admin/login')
  }

  return (
    <div className="bg-white shadow-soft px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-charcoal">Dashboard</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-charcoal-light">{admin?.email}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  )
}
