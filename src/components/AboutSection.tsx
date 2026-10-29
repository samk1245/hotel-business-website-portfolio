import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Compass,
  Smartphone,
  Eye,
  Clock,
  Sparkles,
  MapPin,
  TrendingUp,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function AboutSection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "7887087151";
  const phone = process.env.NEXT_PUBLIC_PHONE || "+91 7887087151";
  const email = process.env.NEXT_PUBLIC_EMAIL || "samirkhan5287914@gmail.com";
  const location = process.env.NEXT_PUBLIC_LOCATION || "Prayagraj, Uttar Pradesh, India";

  const pillars = [
    {
      icon: <TrendingUp className="w-5 h-5 text-gold-400" />,
      title: "Built for Hotel Business Growth",
      description: "My websites are not just digital flyers. Every section, room photo card, and button is engineered to convert visitors into direct, paying guests so you stop losing 18% to 22% on every booking to OTAs.",
    },
    {
      icon: <Smartphone className="w-5 h-5 text-gold-400" />,
      title: "Direct WhatsApp Front-Desk Bookings",
      description: "Indian travelers prefer quick WhatsApp communication. I configure smart booking triggers where guests tap once to send pre-filled dates, room category, and guest counts straight to your reception.",
    },
    {
      icon: <Eye className="w-5 h-5 text-gold-400" />,
      title: "Affordable & Transparent Pricing",
      description: "High-end hotel design doesn't have to cost lakhs. My foundational hotel packages start affordably at ₹4,999 with clear itemized add-on rates and zero hidden agency overheads.",
    },
    {
      icon: <Clock className="w-5 h-5 text-gold-400" />,
      title: "Direct Access to Developer (Prayagraj)",
      description: "You deal directly with me, Samir Khan. From photo curation and rate updates to Google Maps 3-Pack local ranking and domain setup, you get direct, responsive technical care.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-midnight-950 relative overflow-hidden border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (5 cols): Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Meet Your Hotel Web Developer</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ivory-50 tracking-tight leading-tight">
              Hi, I’m Samir Khan. <br />
              <span className="italic font-light text-gold-400">
                Hotel Web Developer from Prayagraj.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-ivory-300/90 leading-relaxed">
              I am a specialized developer based in <strong>Prayagraj, Uttar Pradesh</strong>. I build modern, visually stunning websites for hotels, resorts, guesthouses, homestays, and luxury boutique properties to give them real, sustainable <strong>business growth</strong>.
            </p>

            <p className="text-sm text-ivory-300/80 leading-relaxed">
              When online travel agencies like MakeMyTrip and Booking.com charge 18% to 22% commissions on every occupied room, an independent hotel owner loses significant profits. My mission is to build digital experiences that give travelers the confidence to book directly with your property.
            </p>

            {/* Developer Contact Card */}
            <div className="p-4 rounded-xl bg-midnight-900 border border-gold-500/25 text-xs space-y-2">
              <div className="flex items-center space-x-2 text-ivory-200">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span><strong>Location:</strong> {location}</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp: {whatsappNumber}</span>
              </div>
              <div className="flex items-center space-x-2 text-ivory-300">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Direct Voice Line: {phone}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 text-midnight-950 font-semibold text-xs tracking-wider uppercase shadow-gold-subtle hover:shadow-gold-glow transition-all"
              >
                <span>Schedule a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
                  "Hello Samir Khan! Let's talk about building a website for my hotel."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-3 rounded-lg border border-emerald-500/40 bg-emerald-950/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider hover:bg-emerald-950/40 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Samir</span>
              </a>
            </div>
          </div>

          {/* Right Column (7 cols): Four Core Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-midnight-900/60 border border-charcoal-800 hover:border-gold-500/30 transition-all duration-300 space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-charcoal-800/80 border border-gold-500/20 flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-ivory-100">
                  {pillar.title}
                </h3>
                <p className="text-xs text-ivory-300/80 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
