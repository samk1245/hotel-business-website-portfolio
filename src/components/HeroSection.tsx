"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, MessageCircle, ChevronDown, Sparkles, Building, ShieldCheck, MapPin } from "lucide-react";

// Dynamically import 3D Canvas with ssr: false for optimal performance and graceful client-side rendering
const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full bg-midnight-950 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-gold-400 border-t-transparent animate-spin" />
    </div>
  ),
});

export default function HeroSection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "+919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello Grandeur Digital! I am interested in building an immersive website for my hotel. Please share your portfolio."
  )}`;

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-midnight-950">
      {/* 3D Scene Layer (Absolute Background & Interactive Middle Ground) */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-80 pointer-events-auto">
        <Hero3DCanvas />
      </div>

      {/* Ambient Radial Gradient Lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pointer-events-none">
        {/* Subtle pill tag */}
        <div className="pointer-events-auto inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-midnight-900/90 border border-gold-500/40 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-6 shadow-gold-subtle backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span>Award-Winning Hospitality Digital Architecture</span>
        </div>

        {/* Animated Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-normal text-ivory-50 tracking-tight max-w-4xl leading-[1.1] sm:leading-[1.12]">
          Your Hotel Deserves <br className="hidden sm:inline" />
          <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">
            More Than a Website.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-ivory-300/85 font-light leading-relaxed">
          We build immersive hotel websites that turn online visitors into real guest enquiries.
        </p>

        {/* Coverage Subtitle */}
        <div className="mt-3 flex items-center space-x-2 text-xs text-ivory-400/90 font-medium">
          <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span>Prayagraj • Uttar Pradesh • Jaipur • Serving Hoteliers Nationwide</span>
        </div>

        {/* CTAs */}
        <div className="pointer-events-auto mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Primary CTA */}
          <Link
            href="/#lead-form"
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-midnight-950 font-semibold text-xs tracking-wider uppercase shadow-gold-subtle hover:shadow-gold-glow transition-all flex items-center justify-center space-x-2 group"
          >
            <span>Build My Hotel Website</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/portfolio"
            className="w-full sm:w-auto px-8 py-4 rounded-lg border border-charcoal-700 hover:border-gold-500/60 bg-midnight-900/60 hover:bg-midnight-900 text-ivory-100 font-semibold text-xs tracking-wider uppercase transition-all backdrop-blur-md"
          >
            Explore Our Work
          </Link>

          {/* WhatsApp Direct Action */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-4 rounded-lg border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-950/70 text-emerald-300 font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-2 backdrop-blur-md"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-left max-w-3xl w-full border-t border-charcoal-800/80 pt-8">
          <div className="space-y-1">
            <span className="font-serif text-xl sm:text-2xl font-bold text-gold-400">0%</span>
            <p className="text-[11px] text-ivory-400 leading-tight">Direct booking commissions paid to OTAs</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-xl sm:text-2xl font-bold text-gold-400">&lt; 1.0s</span>
            <p className="text-[11px] text-ivory-400 leading-tight">Core Web Vitals mobile load speed</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-xl sm:text-2xl font-bold text-gold-400">100%</span>
            <p className="text-[11px] text-ivory-400 leading-tight">Asset & domain ownership retained by you</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-xl sm:text-2xl font-bold text-gold-400">₹7,999</span>
            <p className="text-[11px] text-ivory-400 leading-tight">Transparent starter package entry</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="pointer-events-auto mt-12 flex flex-col items-center">
          <a
            href="#services"
            className="text-ivory-400 hover:text-gold-400 transition-colors flex flex-col items-center space-y-1 text-[11px] uppercase tracking-widest font-light"
            aria-label="Scroll to services"
          >
            <span>Discover Services</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
