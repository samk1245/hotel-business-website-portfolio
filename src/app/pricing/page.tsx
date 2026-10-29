import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PricingCalculatorWidget from "@/components/PricingCalculatorWidget";
import { PRICING_PACKAGES } from "@/data/packages";
import { PRICING_ADDONS } from "@/data/addons";
import { Check, Sparkles, ShieldAlert, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Affordable Hotel Website Packages (From ₹4,999) | Samir Khan",
  description:
    "Affordable, transparent pricing for hotel and resort websites by Samir Khan (Prayagraj). Starter Stay from ₹4,999, Signature Growth Hotel at ₹11,999, Luxury Experience at ₹19,999.",
};

export default function PricingPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "7887087151";

  return (
    <div className="min-h-screen bg-midnight-950 text-ivory-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Affordable & High-ROI • Samir Khan (Prayagraj)</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-ivory-50 tracking-tight">
              Affordable Hotel Website Packages
            </h1>
            <p className="text-sm sm:text-base text-ivory-300/80 mt-4 leading-relaxed">
              Every package is designed to pay for itself in weeks by turning OTA-dependent visitors into direct, commission-free bookers. Starting affordably at ₹4,999 with zero hidden agency markups.
            </p>
          </div>

          {/* 5 Foundational Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {PRICING_PACKAGES.map((pkg) => (
              <div
                key={pkg.key}
                className={`bg-midnight-900/70 border rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-luxury-dark relative ${
                  pkg.isPopular
                    ? "border-gold-500 shadow-gold-subtle bg-midnight-900/90"
                    : "border-charcoal-800 hover:border-gold-500/40"
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-400 to-gold-600 text-midnight-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Top Growth Value
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-ivory-400 font-semibold">
                      Package {pkg.sortOrder}
                    </span>
                    <span className="text-xs text-ivory-300 font-medium bg-charcoal-900 px-2.5 py-0.5 rounded border border-charcoal-700">
                      Up to {pkg.pageLimit} Pages
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl font-semibold text-ivory-50">
                    {pkg.name}
                  </h2>
                  <p className="text-xs text-ivory-400 mt-1 mb-5">{pkg.subtitle}</p>

                  <div className="py-4 border-y border-charcoal-800/80 mb-6">
                    <div className="flex items-baseline space-x-1.5">
                      <span className="font-serif text-4xl font-bold text-gold-400">
                        ₹{pkg.basePrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-ivory-400">onwards</span>
                    </div>
                    <p className="text-[11px] text-ivory-300/70 mt-1">{pkg.description}</p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-[10px] uppercase font-semibold text-gold-400 tracking-wider block">
                      Included Scope:
                    </span>
                    {pkg.highlights.map((h, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-ivory-300">
                        <Check className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-charcoal-800/80">
                  <Link
                    href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                    className={`w-full py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-center transition-all flex items-center justify-center space-x-2 ${
                      pkg.isPopular
                        ? "bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-midnight-950 hover:from-gold-300 hover:to-gold-500 shadow-gold-subtle"
                        : "border border-charcoal-700 hover:border-gold-500 text-ivory-200 hover:text-gold-400 bg-charcoal-900/60"
                    }`}
                  >
                    <span>Choose {pkg.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Calculator Widget */}
          <div className="mb-20">
            <PricingCalculatorWidget />
          </div>

          {/* Itemized Feature Menu */}
          <div className="bg-midnight-900/70 border border-charcoal-800 rounded-2xl p-6 sm:p-10 mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold block mb-1">
                A La Carte Menu
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-ivory-50">
                Itemized Feature Add-On Rates
              </h2>
              <p className="text-xs sm:text-sm text-ivory-300/80 mt-2">
                Affordable rates for individual capabilities, preventing unexpected costs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRICING_ADDONS.map((addon) => (
                <div
                  key={addon.key}
                  className="p-4 rounded-xl bg-charcoal-900/60 border border-charcoal-800 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-xs text-ivory-100 pr-2">
                      {addon.name}
                    </h3>
                    <span className="text-xs font-bold text-gold-400 shrink-0">
                      ₹{addon.price.toLocaleString("en-IN")}
                      {addon.priceType === "RECURRING_MONTHLY" ? "/mo" : ""}
                    </span>
                  </div>
                  <p className="text-[11px] text-ivory-400 leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Transparent Scope Disclaimer */}
          <div className="p-6 rounded-2xl bg-charcoal-900/80 border border-gold-500/20 max-w-3xl mx-auto flex items-start space-x-4 text-xs text-ivory-300 leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <span className="font-semibold text-gold-400 uppercase tracking-wider block">
                Technical Scoping & Third-Party Charges Notice
              </span>
              <p>
                A genuine live booking engine, automated room inventory synchronization, channel manager APIs, and payment gateway transactions (e.g. Razorpay or PhonePe standard processing fees) require separate software licensing directly with those providers. Samir Khan handles complete UI/UX styling, integration, and security testing.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
