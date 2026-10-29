"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Mountain,
  Sun,
  Trees,
  Waves,
  Calendar,
  MessageCircle,
  Phone,
  ArrowLeft,
  Sparkles,
  Check,
  MapPin,
  ShieldAlert,
} from "lucide-react";

export default function AzureMountainResortDemo() {
  const [selectedChalet, setSelectedChalet] = useState<string>("Alpine Pine Chalet");
  const [dates, setDates] = useState<string>("Oct 10 - Oct 14");
  const [inquirySent, setInquirySent] = useState(false);

  const chalets = [
    {
      name: "The Cedar Ridge Panoramic Villa",
      rate: "₹28,000",
      view: "360° Himalayan Valley & Snow Peak View",
      img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      tags: ["Private Heated Infinity Pool", "Fireplace Lounge", "Personal Chef"],
    },
    {
      name: "Alpine Forest Glass Chalet",
      rate: "₹18,500",
      view: "Old-Growth Deodar Pine Canopy",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      tags: ["Floor-to-Ceiling Glass Walls", "Private Cedar Sundeck", "Stargazing Telescope"],
    },
    {
      name: "Mist Valley Stone Cottage",
      rate: "₹13,500",
      view: "River Gorge & Terraced Apple Orchards",
      img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      tags: ["Wood Burning Hearth", "Handmade Woolen Quilts", "Artisanal Mountain Breakfast"],
    },
  ];

  const activities = [
    { title: "Pine Forest Guided Trekking", duration: "3-4 Hours", level: "Moderate" },
    { title: "Cedar Spa & Hot Spring Bathing", duration: "90 Mins", level: "Relaxation" },
    { title: "Starlit Bonfire & Alpine Barbecue", duration: "Evening", level: "All Guests" },
    { title: "Organic Apple Orchard Harvest", duration: "2 Hours", level: "Family Friendly" },
  ];

  return (
    <div className="min-h-screen bg-[#071318] text-[#EDF2F4] font-sans">
      {/* Top Demo Bar */}
      <div className="bg-[#10B981] text-[#041F1A] py-2 px-4 text-xs font-semibold flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-2">
          <Link href="/demos" className="flex items-center space-x-1 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Concept Prototype: Nature & Mountain Resort</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-[11px] bg-[#041F1A]/10 px-2 py-0.5 rounded">Cedar & Granite Theme</span>
          <Link href="/#lead-form" className="underline hover:text-black">
            Commission a Website Like This →
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.4] scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071318] via-transparent to-[#071318]/50" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 pt-12">
          <div className="inline-flex items-center space-x-2 text-[#34D399] text-xs uppercase tracking-[0.25em] font-medium">
            <Trees className="w-4 h-4" />
            <span>Elevation 7,200 Ft • Kullu Foothills / Mussoorie</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-tight">
            Azure Pines <br />
            <span className="italic font-light text-[#34D399]">Alpine Resort & Forest Spa</span>
          </h1>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Immerse your senses in pristine pine forests, heated mountain-edge infinity pools, and handcrafted timber chalets overlooking the snow-crested Himalayas.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wider">
            <a
              href="#chalets"
              className="px-6 py-3.5 rounded bg-[#10B981] text-[#041F1A] hover:bg-[#059669] transition-colors"
            >
              View Chalets & Villas
            </a>
            <a
              href="https://wa.me/919876543210?text=Hello%20Azure%20Pines!%20I%20would%20like%20to%20enquire%20about%20a%20mountain%20retreat."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded border border-[#34D399]/40 text-[#34D399] hover:bg-[#34D399]/10 transition-colors flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Nature Desk</span>
            </a>
          </div>
        </div>
      </header>

      {/* Chalets Section */}
      <section id="chalets" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#34D399] font-semibold">
            Eco-Architectural Lodgings
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
            Chalets Built into the Mountain
          </h2>
          <p className="text-xs sm:text-sm text-white/70">
            Constructed with reclaimed cedar and local river stone, maximizing natural thermal insulation with zero compromise on luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {chalets.map((chalet, idx) => (
            <div
              key={idx}
              className="bg-[#0c1f26] border border-[#1a3842] hover:border-[#34D399]/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={chalet.img}
                    alt={chalet.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-[#071318]/90 border border-[#34D399]/40 px-2.5 py-1 rounded text-xs font-bold text-[#34D399]">
                    {chalet.rate} <span className="text-[10px] font-normal text-white">/ night</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-white">
                      {chalet.name}
                    </h3>
                    <p className="text-xs text-[#34D399] mt-1">{chalet.view}</p>
                  </div>

                  <div className="space-y-1.5 border-t border-[#1a3842] pt-3 text-xs text-white/80">
                    {chalet.tags.map((tag, tidx) => (
                      <div key={tidx} className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hello Azure Pines! I want to book ${chalet.name} (${chalet.rate}/night).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded border border-[#34D399]/40 hover:bg-[#10B981] hover:text-[#041F1A] text-[#34D399] text-xs font-semibold uppercase tracking-wider text-center transition-all flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enquire Availability</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nature Expeditions Grid */}
      <section className="py-20 bg-[#0a1b22] border-t border-[#1a3842]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#34D399] font-semibold">
              Curated Escapes
            </span>
            <h2 className="font-serif text-3xl font-normal text-white mt-1">
              Alpine Activities & Wellness
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((act, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#0c1f26] border border-[#1a3842] space-y-2 hover:border-[#34D399]/40 transition-colors"
              >
                <Compass className="w-5 h-5 text-[#34D399]" />
                <h3 className="font-serif text-base font-semibold text-white">{act.title}</h3>
                <div className="flex items-center justify-between text-xs text-white/60 pt-2 border-t border-[#1a3842]">
                  <span>{act.duration}</span>
                  <span className="text-[#34D399]">{act.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Footer */}
      <footer className="py-8 bg-[#040d10] border-t border-[#1a3842] text-center text-xs text-white/60">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p>
            This is an interactive concept prototype created by <strong>Grandeur Digital</strong> to demonstrate our Nature & Mountain Resort website architecture.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-2 text-[#34D399]">
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
