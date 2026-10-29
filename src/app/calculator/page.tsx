import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PricingCalculatorWidget from "@/components/PricingCalculatorWidget";
import LeadContactForm from "@/components/LeadContactForm";
import { Calculator, Sparkles } from "lucide-react";

export const metadata = {
  title: "Interactive Hotel Website Price Calculator | Grandeur Digital",
  description:
    "Estimate the investment for your hotel website in real-time. Select room categories, 3D scenes, direct booking engines, and SEO services.",
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-midnight-950 text-ivory-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Instant Cost Estimator</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-ivory-50 tracking-tight">
              Hotel Website Investment Calculator
            </h1>
            <p className="text-sm sm:text-base text-ivory-300/80 mt-3 leading-relaxed">
              Configure your desired package, room categories, add-on features, and optional maintenance. We automatically prevent duplicate feature charges and calculate estimated turnaround times.
            </p>
          </div>

          <div className="mb-20">
            <PricingCalculatorWidget />
          </div>

          <div className="mt-16">
            <LeadContactForm />
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
