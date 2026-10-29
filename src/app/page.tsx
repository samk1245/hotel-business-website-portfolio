import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingCalculatorWidget from "@/components/PricingCalculatorWidget";
import AboutSection from "@/components/AboutSection";
import FaqSection from "@/components/FaqSection";
import LeadContactForm from "@/components/LeadContactForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Link from "next/link";
import { Sparkles, ArrowRight, MessageCircle, TrendingUp, ShieldCheck, Phone } from "lucide-react";

export const metadata = {
  title: "Samir Khan — Hotel Web Developer from Prayagraj | Direct Bookings & Business Growth",
  description:
    "I am Samir Khan, a hotel website developer from Prayagraj, UP. I build modern, high-converting websites for hotels, resorts, and homestays starting affordably from ₹4,999 to cut OTA commissions and drive direct business growth.",
};

export default function HomePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "7887087151";

  return (
    <div className="min-h-screen bg-midnight-950 text-ivory-100 flex flex-col justify-between selection:bg-gold-500 selection:text-midnight-950">
      <Navbar />

      <main className="flex-1">
        {/* 1. Cinematic 3D Hero Section */}
        <HeroSection />

        {/* 2. OTA Commission Cutter Banner (Hotel Business Growth Feature) */}
        <section className="py-12 bg-gradient-to-r from-emerald-950/80 via-midnight-900 to-emerald-950/80 border-y border-emerald-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Save 18% to 22% on Every Room Booking</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ivory-50">
                Stop Losing Room Revenue to Online Portals
              </h3>
              <p className="text-xs sm:text-sm text-ivory-300/80 max-w-2xl">
                If your hotel does ₹3,00,000 monthly bookings through OTAs, you are paying ₹54,000 to ₹66,000 every single month in commissions. A direct website from Samir Khan pays for itself in the first 30 days.
              </p>
            </div>

            <a
              href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
                "Hello Samir Khan! I want to calculate my hotel's commission savings and discuss a direct website."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-midnight-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss Growth on WhatsApp</span>
            </a>
          </div>
        </section>

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

        {/* 6. About Developer Samir Khan (Prayagraj) */}
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
