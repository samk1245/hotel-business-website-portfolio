import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CommissionSavingsCalculator from "@/components/CommissionSavingsCalculator";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingCalculatorWidget from "@/components/PricingCalculatorWidget";
import AboutSection from "@/components/AboutSection";
import FaqSection from "@/components/FaqSection";
import LeadContactForm from "@/components/LeadContactForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata = {
  title: "StayCraft — Luxury Hotel Website Architecture & 3D Web Design",
  description:
    "StayCraft designs and develops modern 3D hotel websites that turn online visitors into direct bookings. Founded by Samir Khan in Prayagraj, UP. Starting affordably from ₹4,999 to cut OTA commissions and drive hotel business growth.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-midnight-950 text-ivory-100 flex flex-col justify-between selection:bg-gold-500 selection:text-midnight-950">
      <Navbar />

      <main className="flex-1">
        {/* 1. Cinematic 3D Hero Section */}
        <HeroSection />

        {/* 2. Interactive Direct Booking Commission Savings Calculator (StayCraft Growth Feature) */}
        <CommissionSavingsCalculator />

        {/* 3. Specialized Hospitality Services Grid (16 Services) */}
        <ServicesSection />

        {/* 4. Portfolio & Concept Frameworks Showcase */}
        <PortfolioSection />

        {/* 5. Interactive Pricing Calculator Widget */}
        <section className="py-24 bg-midnight-950 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PricingCalculatorWidget />
          </div>
        </section>

        {/* 6. About StayCraft & Developer Samir Khan (Prayagraj) */}
        <AboutSection />

        {/* 7. Comprehensive FAQ Accordion */}
        <FaqSection />

        {/* 8. Hotel Owner Consultation Request Form */}
        <section className="py-24 bg-midnight-900/60 relative border-t border-charcoal-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LeadContactForm />
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
