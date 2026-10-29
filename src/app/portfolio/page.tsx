import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PortfolioSection from "@/components/PortfolioSection";
import LeadContactForm from "@/components/LeadContactForm";

export const metadata = {
  title: "Hotel Website Portfolio & Architectural Case Studies | Grandeur Digital",
  description:
    "Explore our previous works and concept hotel website designs for luxury heritage havelis, mountain eco-resorts, and modern boutique stays.",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-midnight-950 text-ivory-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-24 pb-20">
        <PortfolioSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <LeadContactForm />
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
