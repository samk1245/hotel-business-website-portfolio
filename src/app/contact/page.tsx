import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LeadContactForm from "@/components/LeadContactForm";
import { MessageCircle, Phone, Mail, MapPin, ShieldCheck, Clock, Sparkles } from "lucide-react";

export const metadata = {
  title: "Contact Hospitality Concierge | Grandeur Digital",
  description:
    "Commission your hotel website or request a custom proposal. Headquartered in Prayagraj, UP, India, serving hotels and resorts nationwide.",
};

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_PHONE || "+91 98765 43210";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "+919876543210";
  const email = process.env.NEXT_PUBLIC_EMAIL || "concierge@grandeurlabs.com";
  const location = process.env.NEXT_PUBLIC_LOCATION || "Prayagraj, Uttar Pradesh, India";
  const coverage = process.env.NEXT_PUBLIC_SERVICE_AREAS || "Prayagraj, Varanasi, Lucknow, Kanpur, Jaipur & Across India";

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello Grandeur Digital! I would like to schedule a consultation for my hotel property."
  )}`;

  return (
    <div className="min-h-screen bg-midnight-950 text-ivory-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Studio Touchpoints</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-ivory-50 tracking-tight">
              Let's Build Your Hotel Website
            </h1>
            <p className="text-sm sm:text-base text-ivory-300/80 mt-4 leading-relaxed">
              Reach out directly to our engineering desk in Prayagraj. Whether you operate a 6-room boutique homestay or a 100-room luxury resort, we are ready to discuss your property.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-midnight-900 border border-emerald-500/40 hover:border-emerald-400 text-center space-y-3 transition-all hover:shadow-lg group"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-ivory-100">WhatsApp Concierge</h2>
              <p className="text-xs text-ivory-400">Instant response during business hours</p>
              <span className="text-xs font-semibold text-emerald-400 block">{whatsappNumber}</span>
            </a>

            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="p-6 rounded-2xl bg-midnight-900 border border-charcoal-800 hover:border-gold-500/50 text-center space-y-3 transition-all hover:shadow-lg group"
            >
              <div className="w-12 h-12 rounded-full bg-charcoal-800 border border-gold-500/30 text-gold-400 mx-auto flex items-center justify-center group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-ivory-100">Voice Consultation</h2>
              <p className="text-xs text-ivory-400">Speak directly with our senior consultant</p>
              <span className="text-xs font-semibold text-gold-400 block">{phone}</span>
            </a>

            <a
              href={`mailto:${email}`}
              className="p-6 rounded-2xl bg-midnight-900 border border-charcoal-800 hover:border-gold-500/50 text-center space-y-3 transition-all hover:shadow-lg group"
            >
              <div className="w-12 h-12 rounded-full bg-charcoal-800 border border-gold-500/30 text-gold-400 mx-auto flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-ivory-100">Email Proposals</h2>
              <p className="text-xs text-ivory-400">Formal RFP, tenders & detailed briefs</p>
              <span className="text-xs font-semibold text-gold-400 block truncate">{email}</span>
            </a>
          </div>

          {/* Form */}
          <LeadContactForm />
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
