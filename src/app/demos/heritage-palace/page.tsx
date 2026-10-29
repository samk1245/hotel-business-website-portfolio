"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Calendar,
  Users,
  MessageCircle,
  Phone,
  MapPin,
  ChevronRight,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
  Utensils,
  Wine,
  Waves,
  Star,
  Check,
} from "lucide-react";

export default function HeritagePalaceDemo() {
  const [selectedSuite, setSelectedSuite] = useState<string>("The Maharani Royal Suite");
  const [checkIn, setCheckIn] = useState<string>("2026-11-15");
  const [checkOut, setCheckOut] = useState<string>("2026-11-18");
  const [guests, setGuests] = useState<string>("2 Adults");
  const [inquirySent, setInquirySent] = useState(false);

  const suites = [
    {
      name: "The Maharani Royal Suite",
      rate: "₹24,500",
      size: "1,150 sq.ft",
      view: "Panoramic Sangam & Courtyard Garden View",
      img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Handcrafted Teak Four-Poster Bed",
        "Italian Marble Bath with Jacuzzi",
        "Private Jharokha Balcony",
        "24-Hour Butler & High Tea Service"
      ]
    },
    {
      name: "The Haveli Courtyard Chamber",
      rate: "₹16,500",
      size: "720 sq.ft",
      view: "Internal Fountain Courtyard",
      img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Restored Antique Stone Arches",
        "Handmade Block-Printed Silks",
        "Rain Shower & Ayurvedic Botanicals",
        "Complimentary Royal Breakfast"
      ]
    },
    {
      name: "The Darbar Executive Suite",
      rate: "₹12,000",
      size: "580 sq.ft",
      view: "Heritage Lawns & Rose Garden",
      img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Artisanal Walnut Wood Desk",
        "High-Speed Wi-Fi & Smart Concierge",
        "Deep Soak Clawfoot Bathtub",
        "Evening Sheesh Mahal Aperitifs"
      ]
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 5000);
  };

  const whatsappInquiryUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hello Rajwada Palace! I wish to check availability for ${selectedSuite} from ${checkIn} to ${checkOut} for ${guests}.`
  )}`;

  return (
    <div className="min-h-screen bg-[#080d1a] text-[#FAF7F0] font-sans">
      {/* Top Demo Bar */}
      <div className="bg-[#D4AF37] text-[#0A1128] py-2 px-4 text-xs font-semibold flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-2">
          <Link href="/demos" className="flex items-center space-x-1 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Concept Prototype: Luxury Heritage Hotel</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-[11px] bg-[#0A1128]/10 px-2 py-0.5 rounded">Gold & Ivory Theme</span>
          <Link href="/#lead-form" className="underline hover:text-black">
            Commission a Website Like This →
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative min-h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.45] scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-[#080d1a]/60" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 pt-12">
          <div className="inline-flex items-center space-x-2 text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Est. 1904 • Prayagraj / Varanasi</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#FAF7F0] leading-tight">
            The Rajwada Palace <br />
            <span className="italic font-light text-[#D4AF37]">& Royal Haveli Suites</span>
          </h1>

          <p className="text-sm sm:text-base text-[#FAF7F0]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Where regal Awadhi heritage meets aristocratic luxury. Walk through 120-year-old carved sandstone archways, unwind in secluded fountain courtyards, and revel in timeless Indian hospitality.
          </p>

          {/* Quick Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wider">
            <a
              href="#suites"
              className="px-6 py-3.5 rounded bg-[#D4AF37] text-[#0A1128] hover:bg-[#b89222] transition-colors"
            >
              Explore Royal Chambers
            </a>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Royal Concierge</span>
            </a>
          </div>
        </div>
      </header>

      {/* Floating Reservation Bar */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
        <form
          onSubmit={handleBookingSubmit}
          className="bg-[#10182b] border border-[#D4AF37]/30 rounded-xl p-4 sm:p-6 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
        >
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1">
              Select Royal Suite
            </label>
            <select
              value={selectedSuite}
              onChange={(e) => setSelectedSuite(e.target.value)}
              className="w-full px-3 py-2.5 rounded bg-[#080d1a] border border-[#23304d] text-xs text-[#FAF7F0] focus:outline-none focus:border-[#D4AF37]"
            >
              {suites.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} ({s.rate}/night)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1">
              Check-In Date
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#080d1a] border border-[#23304d] text-xs text-[#FAF7F0] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-3 py-2.5 rounded bg-[#080d1a] border border-[#23304d] text-xs text-[#FAF7F0] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="1 Adult">1 Adult</option>
              <option value="2 Adults">2 Adults</option>
              <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
              <option value="Family Suite (4 Guests)">Family Suite (4 Guests)</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded bg-[#D4AF37] hover:bg-[#b89222] text-[#0A1128] font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              Check Availability
            </button>
          </div>
        </form>

        {inquirySent && (
          <div className="mt-3 p-3 rounded bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs text-center">
            ✓ Availability enquiry submitted! Concierge desk will respond within 15 minutes.
          </div>
        )}
      </div>

      {/* Royal Suites Showcase Section */}
      <section id="suites" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
            Aristocratic Accommodations
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#FAF7F0]">
            Suites of Regal Distinction
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF7F0]/70">
            Each chamber has been restored with historical accuracy, featuring carved sandstone jharokhas, authentic brass chandeliers, and modern imperial comforts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {suites.map((suite, idx) => (
            <div
              key={idx}
              className="bg-[#10182b] border border-[#23304d] hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={suite.img}
                    alt={suite.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-[#080d1a]/90 border border-[#D4AF37]/40 px-2.5 py-1 rounded text-xs font-bold text-[#D4AF37]">
                    {suite.rate} <span className="text-[10px] font-normal text-white">/ night</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#FAF7F0]">
                      {suite.name}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs text-[#D4AF37] mt-1">
                      <span>{suite.size}</span>
                      <span>•</span>
                      <span>{suite.view}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 border-t border-[#23304d] pt-3 text-xs text-[#FAF7F0]/80">
                    {suite.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hello Rajwada Palace! I am interested in reserving ${suite.name} (${suite.rate}/night). Please assist.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#0A1128] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider text-center transition-all flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Reserve This Suite</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regal Dining & Banquets */}
      <section className="py-20 bg-[#0d1424] border-t border-[#23304d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Royal Awadhi Gastronomy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#FAF7F0]">
              The Sheesh Mahal Dining Hall & Royal Lawns
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/80 leading-relaxed">
              Dine beneath crystal chandeliers with authentic recipes handed down through five generations of royal khansamas. From fragrant Awadhi biryanis and melt-in-mouth Galawat kebabs to bespoke candlelit dinners on the fountain terrace.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded bg-[#10182b] border border-[#23304d] space-y-1">
                <Utensils className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-semibold block text-[#FAF7F0]">Fine Dining Darbar</span>
                <span className="text-[#FAF7F0]/60">Lunch: 12:30 - 15:30 • Dinner: 19:30 - 23:30</span>
              </div>
              <div className="p-3.5 rounded bg-[#10182b] border border-[#23304d] space-y-1">
                <Wine className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-semibold block text-[#FAF7F0]">Royal Lounge & High Tea</span>
                <span className="text-[#FAF7F0]/60">Daily High Tea: 16:30 - 18:30 in Courtyard</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
              alt="Dining Hall"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Demo Notice Banner Footer */}
      <footer className="py-8 bg-[#060a14] border-t border-[#23304d] text-center text-xs text-[#FAF7F0]/60">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p>
            This is an interactive concept prototype created by <strong>Grandeur Digital</strong> to demonstrate our Luxury Heritage website architecture.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-2 text-[#D4AF37]">
            <Link href="/" className="hover:underline">Home</Link>
            <span>•</span>
            <Link href="/demos" className="hover:underline">All Demos</Link>
            <span>•</span>
            <Link href="/#lead-form" className="hover:underline">Request Custom Quote</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
