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
import { Sparkles, ArrowRight, Eye, ShieldCheck, Check } from "lucide-react";

export const metadata = {
  title: "Grandeur Digital — Premium 3D Hotel Website Development Studio",
  description:
    "We design and develop modern hotel websites that showcase your property, highlight rooms and facilities, build guest confidence, and make it easier for customers to book directly. Based in Prayagraj, UP, India.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-midnight-950 text-ivory-100 flex flex-col justify-between selection:bg-gold-500 selection:text-midnight-950">
      <Navbar />

      <main className="flex-1">
        {/* 1. Cinematic 3D Hero Section */}
        <HeroSection />

        {/* 2. Specialized Hospitality Services Grid (16 Services) */}
        <ServicesSection />

        {/* 3. Portfolio & Case Studies Showcase */}
        <PortfolioSection />

        {/* 4. Live Interactive Demonstrations Callout Banner */}
        <section className="py-16 bg-gradient-to-r from-midnight-900 via-charcoal-900 to-midnight-900 border-y border-gold-500/20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 text-gold-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3 Full-Scale Working Prototypes</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ivory-50">
                Experience Our Live Hotel Prototypes
              </h3>
              <p className="text-xs sm:text-sm text-ivory-300/80 max-w-xl">
                Test-drive our real interactive concepts: The Rajwada Palace (Heritage), Azure Pines (Mountain), and Lumina Suites (Urban Boutique).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/demos"
                className="px-6 py-3 rounded-lg bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold text-xs tracking-wider uppercase transition-colors flex items-center space-x-2 shadow-gold-subtle"
              >
                <Eye className="w-4 h-4" />
                <span>Browse All 3 Demos</span>
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3 rounded-lg border border-charcoal-700 hover:border-gold-500 text-ivory-200 text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                View Packages
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Interactive Pricing Calculator Widget */}
        <section className="py-24 bg-midnight-950 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PricingCalculatorWidget />
          </div>
        </section>

        {/* 6. About & Studio Trust Section */}
        <AboutSection />

        {/* 7. Comprehensive FAQ Accordion */}
        <FaqSection />

        {/* 8. Hotel Owner Lead Generation Consultation Form */}
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
