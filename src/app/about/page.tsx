import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AboutSection from "@/components/AboutSection";
import LeadContactForm from "@/components/LeadContactForm";

export const metadata = {
  title: "About Our Hospitality Studio & Trust Philosophy | Grandeur Digital",
  description:
    "Learn about our hotel-focused web architecture studio in Prayagraj, UP, India. Honest pricing, direct bookings, mobile-first design, and zero OTA commissions.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-midnight-950 text-ivory-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-24 pb-20">
        <AboutSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <LeadContactForm />
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
