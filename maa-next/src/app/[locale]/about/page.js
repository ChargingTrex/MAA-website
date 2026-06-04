// src/app/about/page.js — Server Component (metadata exported here)
import AboutContent from '@/components/about/AboutContent'

export const metadata = {
  title: 'About Us',
  description:
    "Learn about MAA Saraswati Veterinary Hospital — our story, mission, vision, and the compassionate team behind Hyderabad's free veterinary care since July 2024.",
}

export default function AboutPage() {
  return <AboutContent />
}
