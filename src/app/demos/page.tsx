import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Eye, ArrowRight, ShieldCheck, Sparkles, Building, Compass, Sun } from "lucide-react";

export const metadata = {
  title: "Live Hotel Website Demos & Interactive Flagships | Grandeur Digital",
  description:
    "Experience 3 live interactive hotel website prototypes: Luxury Heritage Palace, Alpine Mountain Sanctuary, and Contemporary Urban Boutique.",
};

export default function DemosHubPage() {
  const demos = [
    {
      slug: "heritage-palace",
      title: "The Rajwada Palace & Royal Suites",
      genre: "Luxury Heritage & Palatial Hotels",
      location: "Civil Lines, Prayagraj / Varanasi, UP",
      palette: "Regal Gold, Warm Ivory & Deep Charcoal",
      themeAccent: "from-amber-600/30 to-yellow-900/20",
      description:
        "Engineered for royal heritage properties, havelis, and palace hotels. Highlights ornate stone architecture, high-value wedding banquets, and presidential suites.",
      heroImg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      keyHighlights: [
        "Gold & Ivory Editorial Typography",
        "Royal Darbar Suite Lightbox Carousels",
        "Palace Dining & Destination Wedding Enquiries",
        "Pre-filled VIP WhatsApp Concierge Action"
      ],
      icon: <Building className="w-5 h-5 text-gold-400" />
    },
    {
      slug: "azure-mountain-resort",
      title: "Azure Pines Alpine Resort & Spa",
      genre: "Eco-Luxury Resorts & Nature Retreats",
      location: "Kullu Valley / Mussoorie Foothills, India",
      palette: "Cedar Green, Granite Stone & Alpine Mist",
      themeAccent: "from-emerald-900/30 to-teal-950/20",
      description:
        "Immersive nature-first visual design with full-width cinematic mountain photography, cedar forest chalet tours, and wellness spa appointment requests.",
      heroImg: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      keyHighlights: [
        "Cinematic Full-Width Landscape Visuals",
        "Cedar Forest Chalets with Heated Pool Feature",
        "Trekking & Himalayan Expedition Guide",
        "Direct Room Date & Occupancy Selector"
      ],
      icon: <Compass className="w-5 h-5 text-emerald-400" />
    },
    {
      slug: "lumina-boutique",
      title: "Lumina Contemporary Boutique Suites",
      genre: "Urban Design Hotels & Boutique Stays",
      location: "C-Scheme, Jaipur / Bengaluru, India",
      palette: "Architectural Charcoal, Amber & Minimal Ivory",
      themeAccent: "from-amber-950/30 to-neutral-900/20",
      description:
        "Minimalist, fast-converting urban boutique hotel experience designed for weekend tourists, design enthusiasts, and business travelers.",
      heroImg: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      keyHighlights: [
        "Ultra-Fast Sub-Second Mobile Load Times",
        "Transparent Room Rate Matrix by Season",
        "Rooftop Artisanal Bistro & Co-working Guide",
        "Instant 2-Click WhatsApp Reservation"
      ],
      icon: <Sun className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-midnight-950 text-ivory-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Screen Live Demonstrations</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-ivory-50 tracking-tight">
              Test-Drive Our Live Hotel Experiences
            </h1>
            <p className="text-sm sm:text-base text-ivory-300/80 mt-4 leading-relaxed">
              Open and test three distinct hospitality prototypes. Each experience is built with realistic hotel rooms, menus, maps, and direct enquiry workflows.
            </p>
          </div>

          {/* Demos Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {demos.map((demo) => (
              <div
                key={demo.slug}
                className="bg-midnight-900/70 border border-charcoal-800 hover:border-gold-500/40 rounded-2xl overflow-hidden flex flex-col justify-between shadow-luxury-dark transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-900">
                    <img
                      src={demo.heroImg}
                      alt={demo.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-midnight-950/90 border border-gold-500/40 text-gold-400 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md">
                      Interactive Prototype
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-xs text-gold-400 font-medium mb-1.5">
                      {demo.icon}
                      <span>{demo.genre}</span>
                    </div>

                    <h2 className="font-serif text-xl font-semibold text-ivory-50">
                      {demo.title}
                    </h2>

                    <p className="text-xs text-ivory-400 mt-1 mb-3">{demo.location}</p>

                    <p className="text-xs text-ivory-300/80 leading-relaxed mb-4">
                      {demo.description}
                    </p>

                    <div className="p-3 rounded-lg bg-charcoal-900 border border-charcoal-800 space-y-1.5 mb-2">
                      <span className="text-[10px] uppercase font-semibold text-ivory-400 tracking-wider block">
                        Included Experience Features:
                      </span>
                      {demo.keyHighlights.map((hl, idx) => (
                        <div key={idx} className="text-[11px] text-ivory-300 flex items-center space-x-2">
                          <span className="w-1 h-1 rounded-full bg-gold-400" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/demos/${demo.slug}`}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-midnight-950 font-semibold text-xs tracking-wider uppercase text-center transition-all flex items-center justify-center space-x-2 shadow-gold-subtle"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Launch Live Interactive Demo</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Honest Disclaimer */}
          <div className="mt-14 p-5 rounded-xl bg-charcoal-900 border border-gold-500/20 max-w-2xl mx-auto flex items-start space-x-3 text-xs text-ivory-300">
            <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
            <span>
              <strong>Concept Prototype Notice:</strong> These properties are fictional demonstration concepts developed by Grandeur Digital to showcase layout aesthetics, technical performance, and conversion design. We do not use any hotel's trademarks or protected assets without permission.
            </span>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
