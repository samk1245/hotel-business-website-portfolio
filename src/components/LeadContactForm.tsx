"use client";

import React, { useState } from "react";
import { leadSubmissionSchema, LeadSubmissionInput } from "@/lib/validations";
import { PRICING_PACKAGES } from "@/data/packages";
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  Phone,
  MessageCircle,
  Mail,
  Building2,
  Calendar,
  IndianRupee,
  ShieldCheck,
  Loader2,
} from "lucide-react";

interface Props {
  initialPackage?: string;
  initialEstimatedTotal?: number;
  initialTimeframe?: string;
  initialSelectedAddons?: string[];
}

export default function LeadContactForm({
  initialPackage,
  initialEstimatedTotal,
  initialTimeframe,
  initialSelectedAddons = [],
}: Props) {
  const [formData, setFormData] = useState<LeadSubmissionInput>({
    propertyName: "",
    contactName: "",
    phone: "",
    email: "",
    city: "",
    existingWebsite: "",
    roomCount: "10-25 rooms",
    selectedPackage: initialPackage || "Signature Hotel (₹17,999)",
    selectedAddons: initialSelectedAddons,
    estimatedBudget: "₹15,000 – ₹35,000",
    preferredLaunchDate: "Within 2 to 3 weeks",
    additionalNotes: "",
    estimatedTotal: initialEstimatedTotal,
    calculatedTimeframe: initialTimeframe,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const phone = process.env.NEXT_PUBLIC_PHONE || "+91 98765 43210";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "+919876543210";
  const email = process.env.NEXT_PUBLIC_EMAIL || "concierge@grandeurlabs.com";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrorClean();
    setServerError(null);

    // 1. Client-side Zod validation
    const validation = leadSubmissionSchema.safeParse(formData);
    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      const issues = validation.error.issues;
      issues.forEach((issue) => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setFieldErrors(formattedErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details) {
          const formatted: Record<string, string> = {};
          for (const key in result.details) {
            formatted[key] = result.details[key][0];
          }
          setFieldErrors(formatted);
        }
        setServerError(result.error || "Failed to submit enquiry. Please call or WhatsApp us.");
        setIsSubmitting(false);
        return;
      }

      setSubmitSuccess(result.message || "Thank you! Your hotel inquiry has been received.");
      setIsSubmitting(false);
    } catch {
      setServerError("A network error occurred. Please reach out to our concierge on WhatsApp or phone.");
      setIsSubmitting(false);
    }
  };

  const setFieldErrorClean = () => {
    setFieldErrors({});
  };

  const whatsappDirectUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello Grandeur Digital! I am enquiring for my hotel "${formData.propertyName || "Hotel Name"}". Please assist.`
  )}`;

  return (
    <div id="lead-form" className="w-full max-w-5xl mx-auto scroll-mt-24">
      <div className="bg-midnight-900/90 border border-gold-500/25 rounded-2xl shadow-luxury-dark backdrop-blur-xl overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-midnight-950 via-charcoal-900 to-midnight-950 p-6 sm:p-10 border-b border-gold-500/15 text-center relative">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Dedicated Hospitality Consultation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ivory-50 tracking-tight">
            Commission Your Hotel Website
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-ivory-300/80 mt-2">
            Share your property details to receive a tailored digital proposal, feature blueprint, and fixed-timeline quote within 4 business hours.
          </p>
        </div>

        {/* Form Body or Success State */}
        <div className="p-6 sm:p-10">
          {submitSuccess ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ivory-50">
                  Enquiry Received with Priority
                </h3>
                <p className="text-sm text-ivory-300 max-w-md mx-auto">
                  {submitSuccess}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 max-w-md mx-auto text-left text-xs space-y-1 text-ivory-300">
                <div><strong>Property:</strong> {formData.propertyName}</div>
                <div><strong>Contact:</strong> {formData.contactName} ({formData.phone})</div>
                <div><strong>City:</strong> {formData.city}</div>
                {formData.estimatedTotal && (
                  <div><strong>Estimated Total:</strong> ₹{formData.estimatedTotal.toLocaleString("en-IN")}</div>
                )}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-all flex items-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect Instantly on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitSuccess(null);
                    setFormData({
                      propertyName: "",
                      contactName: "",
                      phone: "",
                      email: "",
                      city: "",
                      existingWebsite: "",
                      roomCount: "10-25 rooms",
                      selectedPackage: "Signature Hotel (₹17,999)",
                      selectedAddons: [],
                      estimatedBudget: "₹15,000 – ₹35,000",
                      preferredLaunchDate: "Within 2 to 3 weeks",
                      additionalNotes: "",
                    });
                  }}
                  className="px-6 py-3 rounded-lg border border-charcoal-700 hover:border-gold-500 text-ivory-300 text-xs font-semibold tracking-wider uppercase transition-all"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {serverError && (
                <div className="p-4 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{serverError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Property Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-200 mb-1.5">
                    Hotel or Property Name <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="propertyName"
                    value={formData.propertyName}
                    onChange={handleChange}
                    placeholder="e.g. Royal Heritage Haveli & Spa"
                    className={`w-full px-4 py-2.5 rounded-lg bg-charcoal-900 border text-ivory-100 placeholder-charcoal-600 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors ${
                      fieldErrors.propertyName ? "border-red-500" : "border-charcoal-700"
                    }`}
                  />
                  {fieldErrors.propertyName && (
                    <p className="text-[11px] text-red-400 mt-1">{fieldErrors.propertyName}</p>
                  )}
                </div>

                {/* Owner / Manager Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-200 mb-1.5">
                    Your Name & Role <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="e.g. Vikramaditya Singh (General Manager)"
                    className={`w-full px-4 py-2.5 rounded-lg bg-charcoal-900 border text-ivory-100 placeholder-charcoal-600 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors ${
                      fieldErrors.contactName ? "border-red-500" : "border-charcoal-700"
                    }`}
                  />
                  {fieldErrors.contactName && (
                    <p className="text-[11px] text-red-400 mt-1">{fieldErrors.contactName}</p>
                  )}
                </div>

                {/* Phone & WhatsApp */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-200 mb-1.5">
                    Phone / WhatsApp Number <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full px-4 py-2.5 rounded-lg bg-charcoal-900 border text-ivory-100 placeholder-charcoal-600 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors ${
                      fieldErrors.phone ? "border-red-500" : "border-charcoal-700"
                    }`}
                  />
                  {fieldErrors.phone && (
                    <p className="text-[11px] text-red-400 mt-1">{fieldErrors.phone}</p>
                  )}
                </div>

                {/* Business Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-200 mb-1.5">
                    Business Email Address <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. gm@royalhaveli.com"
                    className={`w-full px-4 py-2.5 rounded-lg bg-charcoal-900 border text-ivory-100 placeholder-charcoal-600 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors ${
                      fieldErrors.email ? "border-red-500" : "border-charcoal-700"
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-[11px] text-red-400 mt-1">{fieldErrors.email}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-200 mb-1.5">
                    Property City / Location <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Prayagraj / Jaipur / Varanasi / Goa"
                    className={`w-full px-4 py-2.5 rounded-lg bg-charcoal-900 border text-ivory-100 placeholder-charcoal-600 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors ${
                      fieldErrors.city ? "border-red-500" : "border-charcoal-700"
                    }`}
                  />
                  {fieldErrors.city && (
                    <p className="text-[11px] text-red-400 mt-1">{fieldErrors.city}</p>
                  )}
                </div>

                {/* Existing Website */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-200 mb-1.5">
                    Current Website URL (If any)
                  </label>
                  <input
                    type="text"
                    name="existingWebsite"
                    value={formData.existingWebsite || ""}
                    onChange={handleChange}
                    placeholder="https://yourhotel.com (leave blank if new)"
                    className={`w-full px-4 py-2.5 rounded-lg bg-charcoal-900 border text-ivory-100 placeholder-charcoal-600 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors ${
                      fieldErrors.existingWebsite ? "border-red-500" : "border-charcoal-700"
                    }`}
                  />
                  {fieldErrors.existingWebsite && (
                    <p className="text-[11px] text-red-400 mt-1">{fieldErrors.existingWebsite}</p>
                  )}
                </div>

                {/* Room Count */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-200 mb-1.5">
                    Number of Rooms / Suites
                  </label>
                  <select
                    name="roomCount"
                    value={formData.roomCount || "10-25 rooms"}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-charcoal-900 border border-charcoal-700 text-ivory-100 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400"
                  >
                    <option value="1-9 rooms (Homestay / Boutique)">1–9 rooms (Homestay / Boutique)</option>
                    <option value="10-25 rooms (Independent Hotel)">10–25 rooms (Independent Hotel)</option>
                    <option value="26-60 rooms (Mid-scale Hotel / Resort)">26–60 rooms (Mid-scale Hotel / Resort)</option>
                    <option value="60+ rooms (Large Luxury Property)">60+ rooms (Large Luxury Property)</option>
                  </select>
                </div>

                {/* Desired Package */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-200 mb-1.5">
                    Target Package Foundation
                  </label>
                  <select
                    name="selectedPackage"
                    value={formData.selectedPackage || "Signature Hotel (₹17,999)"}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-charcoal-900 border border-charcoal-700 text-ivory-100 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400"
                  >
                    <option value="Starter Stay (₹7,999)">Starter Stay — ₹7,999 onwards (5 Pages)</option>
                    <option value="Signature Hotel (₹17,999)">Signature Hotel — ₹17,999 onwards (8 Pages)</option>
                    <option value="Luxury Experience (₹34,999)">Luxury Experience — ₹34,999 onwards (12 Pages + 3D)</option>
                    <option value="Direct Booking Pro (₹49,999)">Direct Booking Pro — ₹49,999 onwards (Engine + Payments)</option>
                    <option value="Custom 3D Experience (₹59,999)">Custom 3D Experience — ₹59,999 onwards (WebGL Spatial)</option>
                  </select>
                </div>

                {/* Estimated Budget */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-200 mb-1.5">
                    Estimated Budget Allocation
                  </label>
                  <select
                    name="estimatedBudget"
                    value={formData.estimatedBudget || "₹15,000 – ₹35,000"}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-charcoal-900 border border-charcoal-700 text-ivory-100 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400"
                  >
                    <option value="₹7,999 – ₹15,000">₹7,999 – ₹15,000</option>
                    <option value="₹15,000 – ₹35,000">₹15,000 – ₹35,000</option>
                    <option value="₹35,000 – ₹60,000">₹35,000 – ₹60,000</option>
                    <option value="₹60,000+ (Comprehensive Direct Booking / 3D)">₹60,000+ (Direct Booking & 3D)</option>
                  </select>
                </div>

                {/* Preferred Launch Date */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-200 mb-1.5">
                    Target Launch Timeframe
                  </label>
                  <select
                    name="preferredLaunchDate"
                    value={formData.preferredLaunchDate || "Within 2 to 3 weeks"}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-charcoal-900 border border-charcoal-700 text-ivory-100 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400"
                  >
                    <option value="Immediately (Within 7-10 days)">Immediately (Within 7-10 days)</option>
                    <option value="Within 2 to 3 weeks">Within 2 to 3 weeks</option>
                    <option value="Next 30 to 45 days">Next 30 to 45 days</option>
                    <option value="Planning ahead (Next season)">Planning ahead (Next season)</option>
                  </select>
                </div>
              </div>

              {/* Additional Requirements / Specific Features */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-200 mb-1.5">
                  Property Notes, Booking Requirements or Special Features
                </label>
                <textarea
                  name="additionalNotes"
                  rows={4}
                  value={formData.additionalNotes || ""}
                  onChange={handleChange}
                  placeholder="Tell us about your property vision, room types, restaurant, banquet halls, or existing channel manager (e.g. Cloudbeds, Sirvoy, etc.)..."
                  className="w-full px-4 py-3 rounded-lg bg-charcoal-900 border border-charcoal-700 text-ivory-100 placeholder-charcoal-600 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs text-ivory-400">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  <span>Zero Spam Guarantee • Direct NDA Confidentiality</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-midnight-950 font-semibold text-xs tracking-wider uppercase transition-all shadow-gold-subtle flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Consultation Details...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Hotel Consultation Request</span>
                      <Send className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </button>
              </div>

              {/* Direct Touchpoints Bar */}
              <div className="mt-8 pt-6 border-t border-charcoal-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-charcoal-900 border border-charcoal-800 hover:border-emerald-500/50 text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: {whatsappNumber}</span>
                </a>

                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-charcoal-900 border border-charcoal-800 hover:border-gold-500/50 text-ivory-200 hover:text-gold-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>Voice Line: {phone}</span>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-charcoal-900 border border-charcoal-800 hover:border-gold-500/50 text-ivory-200 hover:text-gold-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold-400" />
                  <span>Direct Desk: {email}</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
