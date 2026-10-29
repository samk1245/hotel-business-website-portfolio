"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HOTEL_SERVICES } from "@/data/services";
import {
  Hotel,
  Cuboid,
  BedDouble,
  Image,
  CalendarCheck,
  CreditCard,
  ShieldCheck,
  MessageCircle,
  MapPin,
  Search,
  Zap,
  RefreshCw,
  Shield,
  TrendingUp,
  Globe,
  Utensils,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

// Icon mapping helper
const iconMap: Record<string, React.ReactNode> = {
  Hotel: <Hotel className="w-5 h-5" />,
  Cuboid: <Cuboid className="w-5 h-5" />,
  BedDouble: <BedDouble className="w-5 h-5" />,
  Image: <Image className="w-5 h-5" />,
  CalendarCheck: <CalendarCheck className="w-5 h-5" />,
  CreditCard: <CreditCard className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  MessageCircle: <MessageCircle className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  RefreshCw: <RefreshCw className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Utensils: <Utensils className="w-5 h-5" />,
};

export default function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All 16 Services" },
    { id: "core", label: "Architecture & Design" },
    { id: "booking", label: "Booking & WhatsApp" },
    { id: "growth", label: "SEO & Performance" },
  ];

  const filteredServices = HOTEL_SERVICES.filter((service) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "core") {
      return ["hotel-resort-web-dev", "luxury-3d-design", "room-suite-showcase", "photo-galleries-virtual-tours", "hotel-website-redesign", "hotel-events-spa-dining"].includes(service.id);
    }
    if (selectedCategory === "booking") {
      return ["booking-enquiry-systems", "direct-online-booking", "online-payment-integration", "whatsapp-booking-integration", "google-maps-location"].includes(service.id);
    }
    if (selectedCategory === "growth") {
      return ["local-technical-seo", "speed-mobile-optimization", "website-maintenance-security", "analytics-conversion-tracking", "multilingual-hotel-websites"].includes(service.id);
    }
    return true;
  });

  return (
    <section id="services" className="py-24 bg-midnight-950 relative overflow-hidden">
      {/* Decorative luxury background lights */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hospitality Specialization</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-ivory-50 tracking-tight">
            Purpose-Built For Hotels, Resorts & Luxury Stays
          </h2>
          <p className="text-sm sm:text-base text-ivory-300/80 mt-4 leading-relaxed">
            We don’t build generic corporate sites. Every layout, button, and interaction is engineered around guest psychology to elevate your property and maximize direct, commission-free reservations.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-4 py-2 rounded-full border transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gold-500 text-midnight-950 font-semibold border-gold-400 shadow-gold-subtle"
                    : "bg-charcoal-900/60 text-ivory-300 border-charcoal-700 hover:border-gold-500/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 16 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-midnight-900/60 border border-charcoal-800 hover:border-gold-500/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-luxury-dark backdrop-blur-sm"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-charcoal-800/80 border border-gold-500/20 text-gold-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-gold-500/10 transition-all duration-300 shadow-inner">
                    {iconMap[service.iconName] || <Hotel className="w-5 h-5" />}
                  </div>

                  <div className="text-right">
                    {service.startingPrice ? (
                      <div>
                        <span className="text-[10px] text-ivory-400 uppercase tracking-wider block">Starting from</span>
                        <span className="font-serif text-base font-bold text-gold-400">
                          ₹{service.startingPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-ivory-400 font-medium">Bespoke Scope</span>
                    )}
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-ivory-100 group-hover:text-gold-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-gold-400/90 font-medium mt-1 mb-3">
                  {service.tagline}
                </p>
                <p className="text-xs text-ivory-300/80 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-1.5 border-t border-charcoal-800/80 pt-4 mb-6">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-[11px] text-ivory-300">
                      <Check className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-4 border-t border-charcoal-800 flex items-center justify-between text-xs">
                <span className="text-ivory-400 text-[11px]">{service.estimatedDays}</span>
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center space-x-1 font-semibold text-gold-400 hover:text-gold-300 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Enquire Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
