"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "7887087151";
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, "");

  const defaultMessage =
    "Hello Samir Khan! I am interested in building a website for my hotel to grow direct bookings. Please share your packages.";
  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-end space-x-3">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center space-x-2 bg-midnight-900 text-ivory-100 text-xs py-2 px-3.5 rounded-lg border border-gold-500/30 shadow-luxury-dark animate-bounce duration-1000">
          <span>Need a hotel website quote? Chat with Samir Khan!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-ivory-400 hover:text-ivory-200 transition-colors"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
        aria-label="Contact Samir Khan on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-300 animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-midnight-950" />
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
}
