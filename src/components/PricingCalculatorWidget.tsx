"use client";

import React, { useState, useMemo } from "react";
import { PRICING_PACKAGES } from "@/data/packages";
import { PRICING_ADDONS } from "@/data/addons";
import {
  calculateProjectEstimate,
  generateWhatsAppQuoteUrl,
  PACKAGE_INCLUDED_ADDONS,
} from "@/lib/pricing-calculator";
import { CalculatorState } from "@/lib/types";
import {
  Calculator,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  MessageCircle,
  AlertCircle,
  Check,
} from "lucide-react";

interface Props {
  onApplyToLeadForm?: (state: {
    selectedPackage: string;
    estimatedTotal: number;
    timeframe: string;
    selectedAddons: string[];
  }) => void;
}

export default function PricingCalculatorWidget({ onApplyToLeadForm }: Props) {
  const [hotelType, setHotelType] = useState<string>("Boutique Hotel");
  const [selectedPackageKey, setSelectedPackageKey] = useState<string>("signature");
  const [additionalPages, setAdditionalPages] = useState<number>(0);
  const [additionalRoomCategories, setAdditionalRoomCategories] = useState<number>(0);
  const [selectedAddonKeys, setSelectedAddonKeys] = useState<string[]>([]);
  const [wantsAdminCms, setWantsAdminCms] = useState<boolean>(false);
  const [wantsMonthlyMaintenance, setWantsMonthlyMaintenance] = useState<boolean>(false);
  const [showAppliedToast, setShowAppliedToast] = useState<boolean>(false);

  const calculatorState: CalculatorState = useMemo(
    () => ({
      hotelType,
      selectedPackageKey,
      additionalPages,
      additionalRoomCategories,
      selectedAddonKeys,
      wantsAdminCms,
      wantsMonthlyMaintenance,
    }),
    [
      hotelType,
      selectedPackageKey,
      additionalPages,
      additionalRoomCategories,
      selectedAddonKeys,
      wantsAdminCms,
      wantsMonthlyMaintenance,
    ]
  );

  const estimate = useMemo(() => calculateProjectEstimate(calculatorState), [calculatorState]);
  const includedKeys = useMemo(
    () => new Set(PACKAGE_INCLUDED_ADDONS[selectedPackageKey] || []),
    [selectedPackageKey]
  );

  const handleToggleAddon = (key: string) => {
    setSelectedAddonKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleReset = () => {
    setHotelType("Boutique Hotel");
    setSelectedPackageKey("signature");
    setAdditionalPages(0);
    setAdditionalRoomCategories(0);
    setSelectedAddonKeys([]);
    setWantsAdminCms(false);
    setWantsMonthlyMaintenance(false);
  };

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP || "7887087151";
  const whatsappUrl = generateWhatsAppQuoteUrl({
    phone: whatsappPhone,
    hotelName: `${hotelType} in India`,
    packageName: estimate.packageName,
    estimatedTotal: estimate.oneTimeTotal,
    monthlyMaintenance: estimate.monthlyMaintenanceCost,
    summaryNotes: `${additionalPages} extra pages, ${additionalRoomCategories} extra room categories.`,
  });

  const handleRequestQuote = () => {
    if (onApplyToLeadForm) {
      onApplyToLeadForm({
        selectedPackage: estimate.packageName,
        estimatedTotal: estimate.oneTimeTotal,
        timeframe: `${estimate.estimatedDeliveryDays.min}-${estimate.estimatedDeliveryDays.max} business days`,
        selectedAddons: selectedAddonKeys,
      });
    }

    const leadFormEl = document.getElementById("lead-form");
    if (leadFormEl) {
      leadFormEl.scrollIntoView({ behavior: "smooth" });
    }

    setShowAppliedToast(true);
    setTimeout(() => setShowAppliedToast(false), 4500);
  };

  return (
    <div className="w-full bg-midnight-900/95 border border-gold-500/25 rounded-2xl shadow-luxury-dark backdrop-blur-xl overflow-hidden">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-midnight-950 via-midnight-900 to-midnight-950 p-6 sm:p-8 border-b border-gold-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-gold-400 text-xs tracking-widest uppercase font-semibold mb-1">
            <Calculator className="w-4 h-4" />
            <span>Interactive Hotel Price Estimator</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ivory-50">
            Calculate Your Website Investment
          </h3>
          <p className="text-xs sm:text-sm text-ivory-300/70 mt-1">
            Affordable, transparent pricing tailored to Indian hoteliers. Zero hidden agency markups.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center self-start sm:self-auto space-x-1.5 text-xs text-ivory-300 hover:text-gold-400 transition-colors px-3 py-1.5 rounded-md border border-charcoal-700 bg-charcoal-900/80"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Selections</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Configurator Options (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Property Type */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-300 mb-2">
              1. Select Property Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                "Boutique Hotel",
                "Luxury Heritage",
                "Nature Resort",
                "Homestay / B&B",
                "Business Hotel",
                "Luxury Villa",
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setHotelType(type)}
                  className={`text-xs px-3 py-2 rounded-lg border text-left transition-all ${
                    hotelType === type
                      ? "bg-gold-500/15 border-gold-500 text-gold-300 font-medium"
                      : "bg-charcoal-900/60 border-charcoal-700 text-ivory-300 hover:border-charcoal-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Package Tier */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-ivory-300">
                2. Choose Foundation Package
              </label>
              <span className="text-[11px] text-ivory-400">Includes core pages & direct bookings</span>
            </div>

            <div className="space-y-2">
              {PRICING_PACKAGES.map((pkg) => {
                const isSelected = selectedPackageKey === pkg.key;
                return (
                  <div
                    key={pkg.key}
                    onClick={() => setSelectedPackageKey(pkg.key)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-gold-500/10 border-gold-500 shadow-gold-subtle"
                        : "bg-charcoal-900/40 border-charcoal-800 hover:border-charcoal-700"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "border-gold-400 bg-gold-400" : "border-charcoal-600"
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-midnight-950" />}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-ivory-50">{pkg.name}</span>
                          <span className="text-[11px] text-ivory-400">({pkg.pageLimit} pages)</span>
                          {pkg.isPopular && (
                            <span className="text-[10px] bg-gold-500/20 text-gold-400 px-2 py-0.5 rounded-full border border-gold-500/30">
                              Top Growth Pick
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-ivory-300/70 hidden sm:block">
                          {pkg.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="text-right pl-3 shrink-0">
                      <div className="text-sm font-semibold text-gold-400">
                        ₹{pkg.basePrice.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-ivory-400">onwards</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Scope Extenders: Additional Pages & Suites */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 bg-charcoal-900/60 rounded-xl border border-charcoal-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-ivory-200">Additional Pages</span>
                <span className="text-xs text-gold-400">₹600 / page</span>
              </div>
              <p className="text-[11px] text-ivory-400 mb-3">Beyond foundation page limit</p>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setAdditionalPages((prev) => Math.max(0, prev - 1))}
                  className="w-8 h-8 rounded bg-charcoal-800 border border-charcoal-700 text-ivory-100 flex items-center justify-center hover:bg-charcoal-700 text-sm font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-semibold text-ivory-100">
                  {additionalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setAdditionalPages((prev) => Math.min(15, prev + 1))}
                  className="w-8 h-8 rounded bg-charcoal-800 border border-charcoal-700 text-ivory-100 flex items-center justify-center hover:bg-charcoal-700 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="p-3.5 bg-charcoal-900/60 rounded-xl border border-charcoal-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-ivory-200">Extra Room Showcases</span>
                <span className="text-xs text-gold-400">₹900 / suite</span>
              </div>
              <p className="text-[11px] text-ivory-400 mb-3">Dedicated suite layout & gallery</p>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setAdditionalRoomCategories((prev) => Math.max(0, prev - 1))}
                  className="w-8 h-8 rounded bg-charcoal-800 border border-charcoal-700 text-ivory-100 flex items-center justify-center hover:bg-charcoal-700 text-sm font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-semibold text-ivory-100">
                  {additionalRoomCategories}
                </span>
                <button
                  type="button"
                  onClick={() => setAdditionalRoomCategories((prev) => Math.min(12, prev + 1))}
                  className="w-8 h-8 rounded bg-charcoal-800 border border-charcoal-700 text-ivory-100 flex items-center justify-center hover:bg-charcoal-700 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 4. Specialized Add-ons List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-ivory-300">
                4. Select Optional Feature Add-ons
              </label>
              <span className="text-[11px] text-gold-400">Transparent itemized rates</span>
            </div>

            <div className="space-y-2">
              {PRICING_ADDONS.filter(
                (a) => a.key !== "addon_additional_page" && a.key !== "addon_room_category" && a.key !== "addon_monthly_maintenance"
              ).map((addon) => {
                const isIncluded = includedKeys.has(addon.key);
                const isSelected = selectedAddonKeys.includes(addon.key);

                return (
                  <div
                    key={addon.key}
                    onClick={() => {
                      if (!isIncluded) handleToggleAddon(addon.key);
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      isIncluded
                        ? "bg-charcoal-900/60 border-gold-500/30 cursor-default opacity-90"
                        : isSelected
                        ? "bg-gold-500/10 border-gold-500 cursor-pointer"
                        : "bg-charcoal-900/30 border-charcoal-800/80 hover:border-charcoal-700 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-start space-x-3 pr-2">
                      <input
                        type="checkbox"
                        checked={isIncluded || isSelected}
                        disabled={isIncluded}
                        readOnly
                        className="mt-0.5 rounded border-charcoal-600 text-gold-500 focus:ring-0 shrink-0"
                      />
                      <div>
                        <div className="text-xs font-semibold text-ivory-100 flex items-center gap-1.5">
                          <span>{addon.name}</span>
                          {isIncluded && (
                            <span className="text-[9px] bg-charcoal-800 text-gold-300 px-1.5 py-0.2 rounded font-normal border border-gold-500/30">
                              Included in {estimate.packageName}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-ivory-400">{addon.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {isIncluded ? (
                        <span className="text-xs font-medium text-gold-300">Included</span>
                      ) : (
                        <span className="text-xs font-semibold text-gold-400">
                          +₹{addon.price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Monthly Maintenance Toggle */}
          <div
            onClick={() => setWantsMonthlyMaintenance(!wantsMonthlyMaintenance)}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              wantsMonthlyMaintenance
                ? "bg-gold-500/15 border-gold-500"
                : "bg-charcoal-900/50 border-charcoal-800 hover:border-charcoal-700"
            }`}
          >
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={wantsMonthlyMaintenance}
                readOnly
                className="mt-0.5 rounded border-charcoal-600 text-gold-500 focus:ring-0"
              />
              <div>
                <span className="text-xs font-semibold text-ivory-100 block">
                  Add Monthly Hotel Care & Hosting Plan
                </span>
                <p className="text-[11px] text-ivory-400">
                  Managed cloud hosting, weekly backups, SSL, rate updates & 24/7 uptime.
                </p>
              </div>
            </div>
            <div className="text-right shrink-0 pl-2">
              <span className="text-xs font-semibold text-gold-400">+₹999</span>
              <span className="text-[10px] text-ivory-400 block">/month</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Investment Summary (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-charcoal-900/90 border border-gold-500/20 rounded-xl p-5 sm:p-6 space-y-5 shadow-inner">
            <div className="flex items-center justify-between border-b border-charcoal-700 pb-3">
              <span className="text-xs uppercase tracking-wider text-ivory-400 font-semibold">
                Investment Summary
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-midnight-950 border border-charcoal-700 text-ivory-300">
                {hotelType}
              </span>
            </div>

            {/* Itemized Line Items */}
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1 text-xs">
              {estimate.breakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-ivory-200">
                  <span className="truncate pr-2">{item.name}</span>
                  <span className="font-semibold text-ivory-50 shrink-0">
                    ₹{item.cost.toLocaleString("en-IN")}
                    {item.type === "recurring" ? "/mo" : ""}
                  </span>
                </div>
              ))}
            </div>

            {/* Estimated Timeframe */}
            <div className="pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs text-ivory-300">
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>Estimated Turnaround:</span>
              </div>
              <span className="font-semibold text-ivory-100">
                {estimate.estimatedDeliveryDays.min} – {estimate.estimatedDeliveryDays.max} business days
              </span>
            </div>

            {/* Total Display */}
            <div className="pt-4 border-t border-gold-500/20 space-y-1">
              <div className="text-[11px] text-ivory-400 uppercase tracking-wider">
                Total Estimated Project Investment
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-gold-400 tracking-tight">
                ₹{estimate.oneTimeTotal.toLocaleString("en-IN")}
              </div>
              {estimate.monthlyMaintenanceCost > 0 && (
                <div className="text-xs text-ivory-300 font-medium">
                  + ₹{estimate.monthlyMaintenanceCost.toLocaleString("en-IN")}/month optional care plan
                </div>
              )}
            </div>

            {/* Transparent Scope Disclaimer */}
            <div className="pt-2 flex items-start space-x-2 text-[11px] text-ivory-400/80 leading-relaxed border-t border-charcoal-800">
              <AlertCircle className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
              <span>
                Affordable starting estimate directly by developer Samir Khan in Prayagraj. Live booking engine and gateway provider subscriptions are paid directly to their respective providers.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleRequestQuote}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-midnight-950 font-semibold text-xs tracking-wider uppercase transition-all shadow-gold-subtle flex items-center justify-center space-x-2"
              >
                <span>Request Custom Quote & Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-950/50 text-emerald-400 font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Estimate to Samir Khan (WhatsApp)</span>
              </a>
            </div>

            {showAppliedToast && (
              <div className="p-2.5 rounded bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs text-center animate-fadeIn">
                ✓ Calculation applied! Fill in your property details below to receive your customized proposal.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
