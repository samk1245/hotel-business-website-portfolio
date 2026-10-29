"use client";

import React, { useState } from "react";
import { FAQS_DATA } from "@/data/faqs";
import { ChevronDown, HelpCircle, Search, Sparkles } from "lucide-react";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq_1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "pricing", label: "Pricing & Invoices" },
    { id: "development", label: "Timeline & Tech" },
    { id: "booking", label: "Direct Bookings & WhatsApp" },
    { id: "maintenance", label: "Care & Support" },
  ];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-24 bg-midnight-950 relative overflow-hidden border-t border-charcoal-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Honest Answers for Hoteliers</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-ivory-50 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-ivory-300/80 mt-3 leading-relaxed">
            Everything you need to know about pricing, timelines, direct reservations, and hotel website operations.
          </p>

          {/* Search Box */}
          <div className="relative mt-6 max-w-md mx-auto">
            <Search className="w-4 h-4 text-ivory-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search e.g. booking engine, cost, WhatsApp..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-charcoal-900 border border-charcoal-700 text-ivory-100 placeholder-charcoal-500 text-xs focus:outline-none focus:ring-1 focus:ring-gold-400"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gold-500/20 text-gold-300 border-gold-500 font-medium"
                    : "bg-charcoal-900/40 text-ivory-400 border-charcoal-800 hover:border-charcoal-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-xs text-ivory-400 rounded-xl bg-charcoal-900/50 border border-charcoal-800">
              No matching questions found. Please call or WhatsApp our concierge for immediate clarification.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-midnight-900/80 border-gold-500/30 shadow-luxury-dark"
                      : "bg-midnight-900/30 border-charcoal-800/80 hover:border-charcoal-700"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-ivory-100">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gold-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-ivory-300/85 leading-relaxed border-t border-charcoal-800/60 pt-3 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
