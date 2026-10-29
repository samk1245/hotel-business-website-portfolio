"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, ArrowUpRight, ShieldCheck, Phone } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "+919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello Grandeur Digital! I am interested in building a modern website for my hotel. Please share your packages."
  )}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-midnight-950/90 backdrop-blur-md border-b border-gold-500/15 py-3.5 shadow-luxury-dark"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="group flex items-center space-x-3 text-left">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center shadow-gold-subtle transform group-hover:scale-105 transition-transform duration-300">
                <span className="font-serif font-black text-midnight-950 text-xl tracking-tighter">G</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-widest text-ivory-50 uppercase font-semibold">
                  Grandeur<span className="text-gold-400">.</span>
                </span>
                <span className="text-[10px] tracking-wider text-ivory-400 uppercase font-light -mt-1">
                  Hotel Web Architecture
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide text-ivory-200">
              <Link href="/services" className="hover:text-gold-400 transition-colors py-1">
                Services
              </Link>
              <Link href="/portfolio" className="hover:text-gold-400 transition-colors py-1">
                Portfolio
              </Link>
              <Link href="/demos" className="hover:text-gold-400 transition-colors py-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live Demos
              </Link>
              <Link href="/pricing" className="hover:text-gold-400 transition-colors py-1">
                Pricing
              </Link>
              <Link href="/calculator" className="hover:text-gold-400 transition-colors py-1">
                Price Calculator
              </Link>
              <Link href="/about" className="hover:text-gold-400 transition-colors py-1">
                About & Trust
              </Link>
              <Link href="/contact" className="hover:text-gold-400 transition-colors py-1">
                Contact
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-2 rounded-full border border-emerald-500/40 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/40 transition-colors"
                title="Chat with Hospitality Concierge on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <Link
                href="/#lead-form"
                className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-midnight-950 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 rounded hover:from-gold-300 hover:to-gold-500 transition-all duration-300 shadow-gold-subtle hover:shadow-gold-glow"
              >
                <span>Build My Hotel Website</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center space-x-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-ivory-100 hover:text-gold-400 transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-midnight-950/98 border-b border-gold-500/20 px-6 py-6 backdrop-blur-xl animate-fadeIn">
            <div className="flex flex-col space-y-4 text-base font-medium text-ivory-100">
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-400 transition-colors py-1.5 border-b border-charcoal-800"
              >
                Hospitality Services
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-400 transition-colors py-1.5 border-b border-charcoal-800"
              >
                Hotel Portfolio & Case Studies
              </Link>
              <Link
                href="/demos"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-400 transition-colors py-1.5 border-b border-charcoal-800 flex items-center justify-between"
              >
                <span>Live Interactive Demos</span>
                <span className="text-xs bg-emerald-900/60 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  3 Stays
                </span>
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-400 transition-colors py-1.5 border-b border-charcoal-800"
              >
                Transparent Pricing Packages
              </Link>
              <Link
                href="/calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-400 transition-colors py-1.5 border-b border-charcoal-800"
              >
                Interactive Price Calculator
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-400 transition-colors py-1.5 border-b border-charcoal-800"
              >
                About & Trust Philosophy
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-400 transition-colors py-1.5 border-b border-charcoal-800"
              >
                Contact & Location (Prayagraj)
              </Link>

              <div className="pt-4 flex flex-col space-y-3">
                <Link
                  href="/#lead-form"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 text-xs font-semibold uppercase tracking-wider text-midnight-950 bg-gradient-to-r from-gold-400 to-gold-600 rounded shadow-gold-subtle"
                >
                  Build My Hotel Website
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 text-xs font-semibold uppercase tracking-wider text-emerald-400 border border-emerald-500/40 rounded bg-emerald-950/20 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
