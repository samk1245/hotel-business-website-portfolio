import React from "react";
import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin, Shield, Lock, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "+919876543210";
  const phone = process.env.NEXT_PUBLIC_PHONE || "+91 98765 43210";
  const email = process.env.NEXT_PUBLIC_EMAIL || "concierge@grandeurlabs.com";
  const location = process.env.NEXT_PUBLIC_LOCATION || "Prayagraj, Uttar Pradesh, India";
  const coverage = process.env.NEXT_PUBLIC_SERVICE_AREAS || "Prayagraj, Varanasi, Lucknow, Kanpur, Jaipur & All India";

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello Grandeur Digital! I am interested in building a modern website for my hotel."
  )}`;

  return (
    <footer className="bg-midnight-950 border-t border-gold-500/15 text-ivory-300 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-gold-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-charcoal-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center shadow-gold-subtle">
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

            <p className="text-sm text-ivory-300/80 leading-relaxed max-w-sm">
              We design and develop modern hotel websites that showcase your property, highlight your rooms and facilities, build guest confidence, and make it easier for customers to enquire or book directly.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-ivory-300/90">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span><strong>Studio HQ:</strong> {location}</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <Shield className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span><strong>Coverage:</strong> {coverage}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-wider text-gold-400 font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-ivory-300">
              <li>
                <Link href="/services" className="hover:text-gold-400 transition-colors">
                  All 16 Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-gold-400 transition-colors">
                  Portfolio Showcase
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gold-400 transition-colors">
                  Transparent Packages
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-gold-400 transition-colors">
                  Interactive Price Calculator
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors">
                  Our Hospitality Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors">
                  Consultation & Quotation
                </Link>
              </li>
            </ul>
          </div>

          {/* Live Concept Demos */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-wider text-gold-400 font-semibold">
              Interactive Demos
            </h4>
            <ul className="space-y-2 text-xs text-ivory-300">
              <li>
                <Link href="/demos/heritage-palace" className="hover:text-gold-400 transition-colors flex items-center justify-between">
                  <span>Heritage Palace Hotel</span>
                  <ArrowUpRight className="w-3 h-3 text-gold-400/60" />
                </Link>
              </li>
              <li>
                <Link href="/demos/azure-mountain-resort" className="hover:text-gold-400 transition-colors flex items-center justify-between">
                  <span>Alpine Mountain Resort</span>
                  <ArrowUpRight className="w-3 h-3 text-gold-400/60" />
                </Link>
              </li>
              <li>
                <Link href="/demos/lumina-boutique" className="hover:text-gold-400 transition-colors flex items-center justify-between">
                  <span>Contemporary Boutique</span>
                  <ArrowUpRight className="w-3 h-3 text-gold-400/60" />
                </Link>
              </li>
              <li className="pt-2">
                <span className="inline-block text-[10px] text-ivory-400 italic bg-charcoal-900 px-2 py-1 rounded border border-charcoal-700">
                  Concept prototypes clearly labelled
                </span>
              </li>
            </ul>
          </div>

          {/* Direct Contact Actions */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-wider text-gold-400 font-semibold">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-ivory-300">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp: {whatsappNumber}</span>
              </a>

              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="flex items-center space-x-2 hover:text-gold-400 transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0 text-gold-400" />
                <span>Phone: {phone}</span>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center space-x-2 hover:text-gold-400 transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0 text-gold-400" />
                <span className="truncate">{email}</span>
              </a>

              <div className="pt-3">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center space-x-1.5 text-[11px] text-ivory-400 hover:text-gold-400 transition-colors border border-charcoal-800 bg-charcoal-900/60 px-2.5 py-1 rounded"
                >
                  <Lock className="w-3 h-3 text-gold-500/70" />
                  <span>Private Studio Admin</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Honest Legal Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-ivory-400/70 space-y-4 md:space-y-0">
          <div>
            &copy; {currentYear} Grandeur Digital. Built with modern Next.js, Three.js & Tailwind CSS.
          </div>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Transparent Pricing Disclaimer</span>
            <span>•</span>
            <span>Zero Hidden OTA Commissions</span>
            <span>•</span>
            <span>Prayagraj & All India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
