"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sun,
  Coffee,
  Wifi,
  Sparkles,
  ArrowLeft,
  MessageCircle,
  MapPin,
  Check,
  CreditCard,
  Building,
} from "lucide-react";

export default function LuminaBoutiqueDemo() {
  const [selectedRoom, setSelectedRoom] = useState<string>("The Studio Loft");

  const rooms = [
    {
      name: "The Artisanal Studio Loft",
      rate: "₹6,800",
      sqft: "420 sq.ft",
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      features: ["Custom Oak Workstation", "1 Gbps Fiber Wi-Fi", "Espresso Machine", "Rain Shower"],
    },
    {
      name: "The Corner Terrace Penthouse",
      rate: "₹11,500",
      sqft: "650 sq.ft",
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      features: ["Private Rooftop Deck", "Cocktail Bar Cabinet", "King Plush Mattress", "Sonos Sound"],
    },
    {
      name: "The Minimalist Cozy Room",
      rate: "₹4,999",
      sqft: "310 sq.ft",
      img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      features: ["Soundproof Double Glazing", "Stream-Ready 55\" OLED", "Artisanal Toiletries", "Ergonomic Chair"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#111215] text-[#ECEFF1] font-sans">
      {/* Top Demo Bar */}
      <div className="bg-[#E5C07B] text-[#111215] py-2 px-4 text-xs font-semibold flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-2">
          <Link href="/demos" className="flex items-center space-x-1 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Concept Prototype: Modern Boutique Hotel</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-[11px] bg-[#111215]/10 px-2 py-0.5 rounded">Minimalist Charcoal & Amber</span>
          <Link href="/#lead-form" className="underline hover:text-black">
            Commission a Website Like This →
          </Link>
        </div>
      </div>

      {/* Hero */}
      <header className="relative min-h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.35]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111215] via-transparent to-[#111215]/50" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6 pt-12">
          <div className="inline-flex items-center space-x-2 text-[#E5C07B] text-xs uppercase tracking-[0.25em] font-semibold">
            <Sun className="w-3.5 h-3.5" />
            <span>C-Scheme, Jaipur / Indiranagar, Bengaluru</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-tight">
            Lumina <br />
            <span className="italic font-light text-[#E5C07B]">Contemporary Boutique Suites</span>
          </h1>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            Designed for curious travelers, founders, and creative nomads. Artisanal interiors, rooftop pour-over coffee, and direct room booking in 60 seconds.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wider">
            <a
              href="#rooms"
              className="px-6 py-3.5 rounded bg-[#E5C07B] text-[#111215] hover:bg-[#d4ad64] transition-colors"
            >
              Explore Rooms & Rates
            </a>
            <a
              href="https://wa.me/919876543210?text=Hello%20Lumina!%20I%20would%20like%20to%20book%20a%20suite."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded border border-[#E5C07B]/40 text-[#E5C07B] hover:bg-[#E5C07B]/10 transition-colors flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </header>

      {/* Room Matrix */}
      <section id="rooms" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#E5C07B] font-semibold">
            Honest Urban Living
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
            Carefully Appointed Suites
          </h2>
          <p className="text-xs sm:text-sm text-white/70">
            No frivolous clutter. High thread-count linens, ultra-fast fiber internet, and acoustic isolation for restful nights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rooms.map((room, idx) => (
            <div
              key={idx}
              className="bg-[#181a20] border border-[#2b2e38] hover:border-[#E5C07B]/40 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={room.img}
                    alt={room.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-[#111215]/90 border border-[#E5C07B]/40 px-2.5 py-1 rounded text-xs font-bold text-[#E5C07B]">
                    {room.rate} <span className="text-[10px] font-normal text-white">/ night</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-white">{room.name}</h3>
                    <p className="text-xs text-[#E5C07B] mt-1">{room.sqft} • City Skyline View</p>
                  </div>

                  <div className="space-y-1.5 border-t border-[#2b2e38] pt-3 text-xs text-white/80">
                    {room.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#E5C07B] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hello Lumina! I want to book ${room.name} (${room.rate}/night).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded border border-[#E5C07B]/40 hover:bg-[#E5C07B] hover:text-[#111215] text-[#E5C07B] text-xs font-semibold uppercase tracking-wider text-center transition-all flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>2-Click WhatsApp Book</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0b0c0e] border-t border-[#2b2e38] text-center text-xs text-white/60">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p>
            This is an interactive concept prototype created by <strong>Grandeur Digital</strong> to demonstrate our Modern Boutique Hotel website architecture.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-2 text-[#E5C07B]">
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
