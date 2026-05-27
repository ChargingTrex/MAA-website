// src/layouts/PublicLayout.jsx
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import EmergencyBanner from '@/components/shared/EmergencyBanner'

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <EmergencyBanner />
      <Navbar />
      <main className="flex-1" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
