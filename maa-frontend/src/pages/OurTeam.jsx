import { useState, useEffect } from 'react'
import PageHero from '../components/common/PageHero'
import Card from '../components/common/Card'
import SectionHeading from '../components/common/SectionHeading'
import api from '../services/api'

const BACKEND_URL = 'http://localhost:5000'

const STATIC_TEAM = [
  { name: 'Dr. Rajesh Kumar', title: 'Chief Veterinarian', qualification: 'BVSc & AH', image: '/images/hospital-5.png' },
  { name: 'Dr. Priya Sharma', title: 'Surgery Specialist', qualification: 'MVSc (Surgery)', image: '/images/hospital-5.png' },
  { name: 'Dr. Amit Patel', title: 'Internal Medicine', qualification: 'MVSc (Medicine)', image: '/images/hospital-5.png' },
  { name: 'Nurse Lakshmi', title: 'Head Nurse', qualification: 'Diploma in Veterinary Nursing', image: '/images/hospital-5.png' },
  { name: 'Assistant Ram', title: 'Lab Technician', qualification: 'Certificate in Lab Technology', image: '/images/hospital-5.png' },
  { name: 'Dr. Neha Singh', title: 'Diagnostics', qualification: 'MVSc (Pathology)', image: '/images/hospital-5.png' },
]

export default function OurTeam() {
  const [backendTeam, setBackendTeam] = useState([])

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.get('/team')
        setBackendTeam(res.data)
      } catch {
        // Backend may be offline — just show static team
      }
    }
    fetchTeam()
  }, [])

  // Map backend members into same shape as static
  const dynamicTeam = backendTeam.map(m => ({
    name: m.name,
    title: m.designation,
    qualification: m.qualification || '',
    image: m.photo_path ? `${BACKEND_URL}${m.photo_path}` : '/placeholder-user.jpg',
  }))

  // Backend-added members first, then static
  const allTeam = [...dynamicTeam, ...STATIC_TEAM]

  return (
    <div>
      <PageHero
        title="Meet Our Team"
        subtitle="Dedicated Professionals"
        description="Our experienced and compassionate team of veterinarians and support staff are committed to providing excellent care."
      />

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Expert Team" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTeam.map((member, idx) => (
              <Card key={idx} hover className="overflow-hidden text-center">
                <div className="h-48 overflow-hidden rounded-lg mb-4 bg-gray-200">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-display font-bold text-charcoal mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-saffron mb-2">{member.title}</p>
                <p className="text-xs text-charcoal-light">{member.qualification}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

