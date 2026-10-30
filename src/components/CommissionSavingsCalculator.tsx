"use client";

import React, { useState, useId } from "react";
import { TrendingUp, DollarSign, ShieldAlert, CheckCircle, ArrowRight, MessageCircle, Sparkles, Building } from "lucide-react";

export default function CommissionSavingsCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(300000);
  const [otaPercentage, setOtaPercentage] = useState<number>(18);
  const inputId = useId();

  const monthlyCommission = Math.round(monthlyRevenue * (otaPercentage / 100));
  const yearlyCommission = monthlyCommission * 12;
  const breakEvenDays = Math.max(3, Math.round((11999 / monthlyCommission) * 30));

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "7887087151";
  const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
    `Hello StayCraft! My hotel generates approx ₹${monthlyRevenue.toLocaleString("en-IN")}/month and we lose around ₹${monthlyCommission.toLocaleString("en-IN")}/month in OTA commissions. I want to build a direct booking website with StayCraft.`
  )}`;

  return (
    <section id="savings-calculator" className="py-20 bg-midnight-900/90 border-y border-gold-500/20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <TrendingUp className="w-4 h-4" />
            <span>Interactive Hotel Business Growth Tool</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-ivory-50 tracking-tight">
            How Much Are OTAs Costing Your Hotel?
          </h2>
          <p className="text-xs sm:text-sm text-ivory-300/80 mt-3 leading-relaxed">
            Most hoteliers don't realize they pay for 3 to 5 brand-new websites <span className="text-gold-400 font-semibold">every single month</span> in commissions to MakeMyTrip, Goibibo, and Booking.com.
          </p>
        </div>

        {/* Calculator Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-midnight-950/90 border border-charcoal-800 rounded-2xl p-6 sm:p-10 shadow-luxury-dark backdrop-blur-xl">
          {/* Controls Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-ivory-200">
                  Your Hotel Monthly Booking Volume
                </label>
                <span className="font-serif text-lg font-bold text-gold-400">
                  ₹{monthlyRevenue.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                id={inputId}
                type="range"
                min={50000}
                max={2500000}
                step={25000}
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-2 bg-charcoal-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
              <div className="flex justify-between text-[11px] text-ivory-400 mt-1.5">
                <span>₹50,000 / mo</span>
                <span>₹10,00,000 / mo</span>
                <span>₹25,00,000+ / mo</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-200 mb-2">
                Average OTA Commission Rate Paid
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[15, 18, 22].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setOtaPercentage(rate)}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                      otaPercentage === rate
                        ? "bg-gold-500 text-midnight-950 border-gold-400 shadow-gold-subtle"
                        : "bg-charcoal-900 border-charcoal-700 text-ivory-300 hover:border-charcoal-600"
                    }`}
                  >
                    {rate}% Commission
                  </button>
                ))}
              </div>
            </div>

            {/* StayCraft Value Proposition */}
            <div className="p-4 rounded-xl bg-charcoal-900/70 border border-charcoal-800 text-xs space-y-2 text-ivory-300">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>StayCraft Direct Commission: 0% (You keep 100%)</span>
              </div>
              <p className="text-[11px] text-ivory-400 leading-relaxed">
                By channeling high-intent visitors and repeat guests to your own StayCraft website and WhatsApp concierge, your direct bookings become pure profit.
              </p>
            </div>
          </div>

          {/* Savings Metric Showcase (6 cols) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-charcoal-900 to-midnight-950 p-6 sm:p-8 rounded-2xl border border-gold-500/30 space-y-6 shadow-inner">
            <div className="border-b border-charcoal-800 pb-4">
              <span className="text-[11px] uppercase tracking-wider text-red-400 font-semibold block">
                Estimated OTA Commission Drain
              </span>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-red-400 mt-1">
                -₹{monthlyCommission.toLocaleString("en-IN")}{" "}
                <span className="text-xs font-normal text-ivory-400">/ month</span>
              </div>
              <p className="text-[11px] text-ivory-400 mt-1">
                That is <strong className="text-ivory-200">₹{yearlyCommission.toLocaleString("en-IN")} lost annually</strong> to 3rd party booking portals.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-midnight-900 border border-charcoal-800">
                <span className="text-ivory-400 block text-[10px] uppercase">StayCraft Signature Package</span>
                <span className="font-serif text-lg font-bold text-gold-400">₹11,999</span>
                <span className="text-[10px] text-ivory-400 block">One-time investment</span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40">
                <span className="text-emerald-400 block text-[10px] uppercase font-semibold">Payback Period</span>
                <span className="font-serif text-lg font-bold text-emerald-300">~{breakEvenDays} Days</span>
                <span className="text-[10px] text-emerald-400/80 block">Recovers cost in direct bookings</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-midnight-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Save ₹{monthlyCommission.toLocaleString("en-IN")}/Mo with StayCraft</span>
              </a>
            </div>
          </div>
        </div>

        {/* Comparison Matrix Feature */}
        <div className="mt-14 overflow-x-auto">
          <table className="w-full text-left text-xs text-ivory-300 bg-midnight-950/70 border border-charcoal-800 rounded-xl overflow-hidden">
            <thead className="bg-charcoal-900/90 text-ivory-200 uppercase text-[10px] font-semibold border-b border-charcoal-800">
              <tr>
                <th className="py-3 px-4">Feature & Business Capability</th>
                <th className="py-3 px-4 text-gold-400 font-bold">StayCraft Website</th>
                <th className="py-3 px-4">Standard OTAs (MakeMyTrip / Agoda)</th>
                <th className="py-3 px-4">Generic WordPress Site</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/60">
              <tr>
                <td className="py-3 px-4 font-semibold text-ivory-100">Booking Commission</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">0% (Keep 100% Revenue)</td>
                <td className="py-3 px-4 text-red-400 font-medium">18% – 22% Per Booking</td>
                <td className="py-3 px-4 text-ivory-400">Depends on plugin</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-ivory-100">Guest Data & Contact Ownership</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">100% Direct Yours</td>
                <td className="py-3 px-4 text-ivory-400">Locked inside OTA portal</td>
                <td className="py-3 px-4 text-ivory-300">Stored in database</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-ivory-100">Direct WhatsApp Concierge</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">Smart Pre-filled Routing</td>
                <td className="py-3 px-4 text-red-400">Not Allowed by OTA</td>
                <td className="py-3 px-4 text-ivory-400">Generic unformatted link</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-ivory-100">3D Architectural Experience</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">Interactive WebGL Pavilion</td>
                <td className="py-3 px-4 text-ivory-400">Static thumbnails only</td>
                <td className="py-3 px-4 text-ivory-400">Rarely supported / Slow</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-ivory-100">Mobile Speed & Core Web Vitals</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">&lt; 0.8s Sub-second Next.js</td>
                <td className="py-3 px-4 text-ivory-300">App dependent</td>
                <td className="py-3 px-4 text-red-400">3s – 6s Heavy plugins lag</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-ivory-100">Google Local 3-Pack Schema</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">Hotel Schema.org Built-in</td>
                <td className="py-3 px-4 text-ivory-400">Competes with your brand</td>
                <td className="py-3 px-4 text-ivory-400">Manual setup needed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
