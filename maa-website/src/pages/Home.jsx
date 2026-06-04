// src/pages/Home.jsx
import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import MissionVision from '@/components/home/MissionVision'
import ServicesGrid from '@/components/home/ServicesGrid'
import DonateCallout from '@/components/home/DonateCallout'
import RecentCSR from '@/components/home/RecentCSR'
import PawDivider from '@/components/shared/PawDivider'

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <MissionVision />
      <div className="max-w-5xl mx-auto px-4">
        <PawDivider />
      </div>
      <ServicesGrid />
      <DonateCallout />
      <RecentCSR />
    </>
  )
}
