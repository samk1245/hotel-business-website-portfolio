import React from "react";
import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin, Shield, Lock, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "7887087151";
  const phone = process.env.NEXT_PUBLIC_PHONE || "+91 7887087151";
  const email = process.env.NEXT_PUBLIC_EMAIL || "samirkhan5287914@gmail.com";
  const location = process.env.NEXT_PUBLIC_LOCATION || "Prayagraj, Uttar Pradesh, India";
  const coverage = process.env.NEXT_PUBLIC_SERVICE_AREAS || "Prayagraj, Varanasi, Lucknow, Kanpur, Ayodhya, Jaipur & All India";

  const whatsappUrl = `https://wa.me/91${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello Samir Khan! I am interested in building a high-growth website for my hotel."
  )}`;

  return (
    <footer className="bg-midnight-950 border-t border-gold-500/15 text-ivory-300 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-gold-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-charcoal-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center shadow-gold-subtle">
                <span className="font-serif font-black text-midnight-950 text-xl tracking-tighter">SC</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-widest text-ivory-50 uppercase font-semibold">
                  StayCraft<span className="text-gold-400">.</span>
                </span>
                <span className="text-[10px] tracking-wider text-ivory-400 uppercase font-light -mt-1">
                  By Samir Khan • Prayagraj, UP
                </span>
              </div>
            </Link>

            <p className="text-sm text-ivory-300/80 leading-relaxed max-w-sm">
              I am a specialized hotel web developer from <strong>Prayagraj, Uttar Pradesh</strong>. I build fast, high-converting websites for hotels, resorts, and homestays to cut heavy OTA commissions and drive real business growth.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-ivory-300/90">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span><strong>Developer Location:</strong> {location}</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <Shield className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span><strong>Client Coverage:</strong> {coverage}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-wider text-gold-400 font-semibold">
              Explore Services
            </h4>
            <ul className="space-y-2 text-xs text-ivory-300">
              <li>
                <Link href="/services" className="hover:text-gold-400 transition-colors">
                  All 16 Hotel Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-gold-400 transition-colors">
                  Work & Concepts
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gold-400 transition-colors">
                  Affordable Packages (From ₹4,999)
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-gold-400 transition-colors">
                  Interactive Price Estimator
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors">
                  About Samir Khan
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors">
                  Consultation & Quotation
                </Link>
              </li>
            </ul>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-wider text-gold-400 font-semibold">
              Direct Business Growth
            </h4>
            <ul className="space-y-2 text-xs text-ivory-300">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                <span>Zero OTA Commissions (Keep 100%)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                <span>Direct WhatsApp Front-Desk Bookings</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                <span>Google Local 3-Pack Maps Ranking</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                <span>Kumbh & Seasonal Peak Rate Banners</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                <span>Digital QR In-Room Dining Menu</span>
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
                <span>Direct Call: {phone}</span>
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

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-ivory-400/70 space-y-4 md:space-y-0">
          <div>
            &copy; {currentYear} StayCraft by Samir Khan. Hotel Web Architecture & Business Growth • Prayagraj, UP.
          </div>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Affordable Transparent Pricing</span>
            <span>•</span>
            <span>Zero Hidden OTA Commissions</span>
            <span>•</span>
            <span>Direct WhatsApp: 7887087151</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
