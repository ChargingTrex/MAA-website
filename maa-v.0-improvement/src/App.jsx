import { HashRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/common/Layout'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Infrastructure from './pages/Infrastructure'
import MedicalFacilities from './pages/MedicalFacilities'
import OurTeam from './pages/OurTeam'
import Gallery from './pages/Gallery'
import CSRActivities from './pages/CSRActivities'
import Donate from './pages/Donate'
import Sponsor from './pages/Sponsor'
import Contact from './pages/Contact'

// Admin Pages
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminGallery from './pages/AdminGallery'
import AdminTeam from './pages/AdminTeam'
import AdminCSR from './pages/AdminCSR'
import AdminContent from './pages/AdminContent'
import AdminFacilities from './pages/AdminFacilities'
import AdminSponsor from './pages/AdminSponsor'
import AdminLayout from './components/admin/AdminLayout'

function App() {
  return (
    <HashRouter>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/infrastructure" element={<Infrastructure />} />
              <Route path="/medical-facilities" element={<MedicalFacilities />} />
              <Route path="/our-team" element={<OurTeam />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/csr-activities" element={<CSRActivities />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/sponsor" element={<Sponsor />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard"   element={<AdminDashboard />} />
              <Route path="gallery"     element={<AdminGallery />} />
              <Route path="team"        element={<AdminTeam />} />
              <Route path="csr"         element={<AdminCSR />} />
              <Route path="facilities"  element={<AdminFacilities />} />
              <Route path="sponsors"   element={<AdminSponsor />} />
              <Route path="content"     element={<AdminContent />} />
            </Route>
          </Routes>
          <Toaster position="bottom-right" />
        </AuthProvider>
      </LanguageProvider>
    </HashRouter>
  )
}

export default App
