// src/App.jsx
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/context/AuthContext'
import PublicLayout from '@/layouts/PublicLayout'
import AdminLayout from '@/layouts/AdminLayout'
import LoadingScreen from '@/components/ui/LoadingScreen'
import ScrollToTop from '@/components/ui/ScrollToTop'

// Lazy-loaded pages (route-level code splitting)
const Home           = lazy(() => import('@/pages/Home'))
const About          = lazy(() => import('@/pages/About'))
const Infrastructure = lazy(() => import('@/pages/Infrastructure'))
const Medical        = lazy(() => import('@/pages/Medical'))
const Team           = lazy(() => import('@/pages/Team'))
const Gallery        = lazy(() => import('@/pages/Gallery'))
const CSR            = lazy(() => import('@/pages/CSR'))
const Donate         = lazy(() => import('@/pages/Donate'))
const Sponsor        = lazy(() => import('@/pages/Sponsor'))
const Contact        = lazy(() => import('@/pages/Contact'))
const NotFound       = lazy(() => import('@/pages/NotFound'))

// Admin pages
const AdminLogin     = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'))
const AdminGallery   = lazy(() => import('@/pages/admin/GalleryManager'))
const AdminTeam      = lazy(() => import('@/pages/admin/TeamManager'))
const AdminCSR       = lazy(() => import('@/pages/admin/CSRManager'))
const AdminContent   = lazy(() => import('@/pages/admin/ContentManager'))

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="infrastructure" element={<Infrastructure />} />
              <Route path="medical" element={<Medical />} />
              <Route path="team" element={<Team />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="csr" element={<CSR />} />
              <Route path="donate" element={<Donate />} />
              <Route path="sponsor" element={<Sponsor />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Admin Routes */}
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="csr" element={<AdminCSR />} />
              <Route path="content" element={<AdminContent />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        {/* Global toast notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'var(--font-body)',
              borderRadius: '8px',
            },
            success: {
              iconTheme: { primary: '#1E3A8A', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#DC2626', secondary: '#fff' },
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  )
}
