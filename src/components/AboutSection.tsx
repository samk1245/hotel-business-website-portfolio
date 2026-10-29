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
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function AboutSection() {
  const location = process.env.NEXT_PUBLIC_LOCATION || "Prayagraj, Uttar Pradesh, India";
  const coverage = process.env.NEXT_PUBLIC_SERVICE_AREAS || "Prayagraj, Varanasi, Lucknow, Kanpur, Jaipur & Across India";

  const pillars = [
    {
      icon: <Compass className="w-5 h-5 text-gold-400" />,
      title: "100% Hospitality Focused",
      description: "We don't build restaurants on Monday and e-commerce shoe stores on Tuesday. Every line of code, photo layout, and form interaction is tailored specifically for hotels, resorts, and homestays.",
    },
    {
      icon: <Smartphone className="w-5 h-5 text-gold-400" />,
      title: "Mobile-First Direct Revenue",
      description: "Over 82% of travelers book or enquire from phones. Our websites are crafted mobile-first with sub-second speeds, frictionless date pickers, and instant WhatsApp booking triggers.",
    },
    {
      icon: <Eye className="w-5 h-5 text-gold-400" />,
      title: "Radical Pricing Transparency",
      description: "No ambiguous quotes or surprise invoices. Our foundational packages start at ₹7,999 with clear itemized add-on pricing so hoteliers know exactly what they are investing in.",
    },
    {
      icon: <Clock className="w-5 h-5 text-gold-400" />,
      title: "Direct Client Support & Care",
      description: "You deal directly with the senior engineering team. From photo selection and domain registration to Google Search Console and monthly rate updates, we support your digital journey.",
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
              <span>Studio Philosophy & Trust</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ivory-50 tracking-tight leading-tight">
              We Turn Hotels Into Digital Experiences.
            </h2>

            <p className="text-sm sm:text-base text-ivory-300/85 leading-relaxed">
              In an era where Online Travel Agencies (OTAs) take 15% to 25% of your hard-earned room revenue, an independent hotel cannot afford a slow, generic, or outdated website.
            </p>

            <p className="text-sm text-ivory-300/75 leading-relaxed">
              Based in <strong>{location}</strong> and serving hotels across <strong>{coverage}</strong>, we build digital flagships that give guests the confidence to book directly with your front desk.
            </p>

            {/* Location & Contact Badge */}
            <div className="p-4 rounded-xl bg-midnight-900 border border-gold-500/20 text-xs space-y-2">
              <div className="flex items-center space-x-2 text-ivory-200">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Headquarters: Prayagraj (Allahabad), Uttar Pradesh</span>
              </div>
              <div className="flex items-center space-x-2 text-ivory-300">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Direct on-site consultations available across UP & Rajasthan</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 text-midnight-950 font-semibold text-xs tracking-wider uppercase shadow-gold-subtle hover:shadow-gold-glow transition-all"
              >
                <span>Schedule a Property Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
