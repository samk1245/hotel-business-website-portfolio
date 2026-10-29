import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ServicesSection from "@/components/ServicesSection";
import LeadContactForm from "@/components/LeadContactForm";

export const metadata = {
  title: "16 Specialized Hotel Website Services | Grandeur Digital",
  description:
    "Explore our complete range of hotel web services: 3D design, room showcases, direct booking engines, WhatsApp integration, and local SEO for Prayagraj, UP, and India.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-midnight-950 text-ivory-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-24 pb-20">
        <ServicesSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <LeadContactForm />
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
