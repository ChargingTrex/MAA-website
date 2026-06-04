// src/app/page.js — Home page
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import MissionVision from "@/components/home/MissionVision";
import ServicesGrid from "@/components/home/ServicesGrid";
import DonateCallout from "@/components/home/DonateCallout";
import RecentCSR from "@/components/home/RecentCSR";

export const metadata = {
  title: "MAA Saraswati Veterinary Hospital — Free Veterinary Care, Hyderabad",
  description:
    "Compassionate, professional, and completely free veterinary care for all animals in Hyderabad. Surgery, ambulance, diagnostics — at zero cost to owners.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <MissionVision />
      <ServicesGrid />
      <DonateCallout />
      <RecentCSR />
    </>
  );
}
