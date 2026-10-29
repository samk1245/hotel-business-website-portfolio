import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LeadContactForm from "@/components/LeadContactForm";
import { MessageCircle, Phone, Mail, MapPin, Sparkles } from "lucide-react";

export const metadata = {
  title: "Contact Samir Khan — Hotel Web Developer in Prayagraj",
  description:
    "Direct contact details for Samir Khan, hotel web developer from Prayagraj, UP. Call or WhatsApp 7887087151, or email samirkhan5287914@gmail.com.",
};

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_PHONE || "+91 7887087151";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "7887087151";
  const email = process.env.NEXT_PUBLIC_EMAIL || "samirkhan5287914@gmail.com";
  const location = process.env.NEXT_PUBLIC_LOCATION || "Prayagraj, Uttar Pradesh, India";

  const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
    "Hello Samir Khan! I would like to discuss building a website for my hotel."
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
              <span>Direct Developer Touchpoints</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-ivory-50 tracking-tight">
              Let's Grow Your Hotel's Direct Bookings
            </h1>
            <p className="text-sm sm:text-base text-ivory-300/80 mt-4 leading-relaxed">
              Reach out directly to me, Samir Khan, in Prayagraj. Whether you manage a 6-room boutique homestay or a large luxury resort, I am ready to build a digital presence that delivers real revenue growth.
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
              <h2 className="font-serif text-lg font-semibold text-ivory-100">WhatsApp Directly</h2>
              <p className="text-xs text-ivory-400">Instant direct response on WhatsApp</p>
              <span className="text-xs font-semibold text-emerald-400 block">7887087151</span>
            </a>

            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="p-6 rounded-2xl bg-midnight-900 border border-charcoal-800 hover:border-gold-500/50 text-center space-y-3 transition-all hover:shadow-lg group"
            >
              <div className="w-12 h-12 rounded-full bg-charcoal-800 border border-gold-500/30 text-gold-400 mx-auto flex items-center justify-center group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-ivory-100">Direct Voice Call</h2>
              <p className="text-xs text-ivory-400">Speak directly with Samir Khan</p>
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
              <p className="text-xs text-ivory-400">Detailed property briefs & proposals</p>
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
