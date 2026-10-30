"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PORTFOLIO_PROJECTS } from "@/data/projects";
import {
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Layers,
  MessageCircle,
  FileText,
  Lock,
} from "lucide-react";

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "7887087151";

  const filterTabs = [
    { id: "ALL", label: "All Projects" },
    { id: "Luxury Heritage", label: "Heritage & Palaces" },
    { id: "Mountain Resort", label: "Resorts & Eco-Stays" },
    { id: "Boutique Hotel", label: "Boutique & Urban" },
  ];

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (activeFilter === "ALL") return true;
    return p.propertyType === activeFilter;
  });

  return (
    <section id="portfolio" className="py-24 bg-midnight-900/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Portfolio & Concept Frameworks</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-ivory-50 tracking-tight">
            High-Converting Hotel Websites Built for Growth
          </h2>
          <p className="text-sm sm:text-base text-ivory-300/80 mt-4 leading-relaxed">
            I build bespoke digital flagships tailored to distinct hospitality property types. Contact me directly for a private live walkthrough and tailored architecture consultation.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`text-xs px-4 py-2 rounded-full border transition-all ${
                  activeFilter === tab.id
                    ? "bg-gold-500 text-midnight-950 font-semibold border-gold-400 shadow-gold-subtle"
                    : "bg-charcoal-900/60 text-ivory-300 border-charcoal-700 hover:border-gold-500/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="card-3d-hover group bg-midnight-950/80 border border-charcoal-800 hover:border-gold-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-luxury-dark"
            >
              <div>
                {/* Hero Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-900">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/20 to-transparent" />

                  {/* Concept Badge */}
                  {project.isConcept && (
                    <div className="absolute top-3 left-3 bg-midnight-950/90 border border-gold-500/40 text-gold-400 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md shadow-md backdrop-blur-md">
                      Concept Framework
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-charcoal-900/80 border border-charcoal-700 text-ivory-200 text-[10px] font-medium px-2.5 py-1 rounded-md backdrop-blur-md">
                    {project.propertyType}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center space-x-1.5 text-xs text-ivory-300">
                    <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-ivory-100 group-hover:text-gold-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-ivory-300/80 leading-relaxed mt-2.5 mb-4">
                    {project.summary}
                  </p>

                  <div className="p-3 rounded-lg bg-charcoal-900/70 border border-charcoal-800 text-[11px] text-ivory-300 space-y-1 mb-4">
                    <span className="font-semibold text-gold-400 uppercase tracking-wider block text-[10px]">
                      Business Growth Objectives:
                    </span>
                    <p className="line-clamp-2">{project.designObjectives}</p>
                  </div>

                  {/* Key Features Chips */}
                  <div className="space-y-1.5 mb-2">
                    <span className="font-semibold text-ivory-400 uppercase tracking-wider block text-[10px]">
                      Implemented Capabilities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.features.slice(0, 3).map((f, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-charcoal-900 border border-charcoal-700 text-ivory-300"
                        >
                          {f}
                        </span>
                      ))}
                      {project.features.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-charcoal-900 text-gold-400">
                          +{project.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Request Private Walkthrough via WhatsApp */}
              <div className="p-6 pt-0 border-t border-charcoal-800/80 flex items-center gap-3 mt-4">
                <a
                  href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
                    `Hello Samir Khan! I am interested in seeing a private live walkthrough/presentation of "${project.title}" (${project.propertyType}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-lg bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold text-xs tracking-wider uppercase text-center transition-colors flex items-center justify-center space-x-1.5 shadow-gold-subtle"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Request Walkthrough</span>
                </a>

                <Link
                  href={`/portfolio/${project.slug}`}
                  className="py-2.5 px-3 rounded-lg border border-charcoal-700 hover:border-gold-500/60 text-ivory-300 text-xs font-semibold tracking-wider uppercase transition-colors"
                  title="View full case study"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Private Walkthrough Banner */}
        <div className="mt-12 p-5 rounded-xl bg-charcoal-900/90 border border-gold-500/30 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-300">
          <div className="flex items-start space-x-3">
            <Lock className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <p>
              <strong>Private Walkthrough Policy:</strong> To protect custom design architecture and client exclusivity, live demo access is provided on a 1-on-1 scheduled screen share or private test link. Reach out to Samir Khan on WhatsApp at <strong>7887087151</strong>.
            </p>
          </div>
          <a
            href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
              "Hello Samir Khan! I would like to schedule a 15-minute live demo walkthrough for my hotel property."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs whitespace-nowrap shrink-0 flex items-center space-x-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
