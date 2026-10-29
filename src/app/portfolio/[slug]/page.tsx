import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { PORTFOLIO_PROJECTS } from "@/data/projects";
import {
  ArrowLeft,
  MapPin,
  ExternalLink,
  Eye,
  CheckCircle,
  Building,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Hotel Website Case Study | Grandeur Digital`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-midnight-950 text-ivory-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back breadcrumb */}
          <Link
            href="/portfolio"
            className="inline-flex items-center space-x-1.5 text-xs text-ivory-400 hover:text-gold-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>

          {/* Header Info */}
          <div className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 font-semibold uppercase tracking-wider">
                {project.propertyType}
              </span>
              {project.isConcept && (
                <span className="text-xs px-2.5 py-1 rounded bg-charcoal-900 border border-charcoal-700 text-ivory-300">
                  Concept Demonstration Design
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ivory-50 tracking-tight">
              {project.title}
            </h1>

            <div className="flex items-center space-x-2 text-xs text-ivory-300">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
              <span>{project.location}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-charcoal-800 shadow-luxury-dark mb-12">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Action Callout */}
          <div className="p-6 rounded-2xl bg-midnight-900 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 mb-14 shadow-lg">
            <div>
              <span className="font-serif text-lg font-semibold text-ivory-50 block">
                Experience this property's live digital interface
              </span>
              <p className="text-xs text-ivory-400 mt-0.5">
                Full-screen interactive prototype with rooms, menus, and WhatsApp booking.
              </p>
            </div>

            {project.demoUrl ? (
              <Link
                href={project.demoUrl}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center space-x-2 shadow-gold-subtle"
              >
                <Eye className="w-4 h-4" />
                <span>Launch Live Demo</span>
              </Link>
            ) : (
              <a
                href={project.liveUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center space-x-2 shadow-gold-subtle"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Live Site</span>
              </a>
            )}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-8 space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-ivory-50 mb-3">
                  Property Overview
                </h2>
                <p className="text-sm text-ivory-300/85 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl font-semibold text-ivory-100 mb-3">
                  Design & Architecture Objectives
                </h3>
                <p className="text-xs sm:text-sm text-ivory-300/80 leading-relaxed bg-charcoal-900/60 p-5 rounded-xl border border-charcoal-800">
                  {project.designObjectives}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl font-semibold text-ivory-100 mb-4">
                  Implemented Features & Workflows
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-charcoal-900/40 border border-charcoal-800 flex items-start space-x-2.5 text-xs text-ivory-200"
                    >
                      <CheckCircle className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar (4 cols) */}
            <div className="md:col-span-4 space-y-6">
              <div className="p-6 rounded-xl bg-charcoal-900/80 border border-charcoal-800 space-y-4">
                <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold block">
                  Project Specifications
                </span>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-ivory-400 block text-[10px] uppercase">Property Type</span>
                    <span className="font-medium text-ivory-100">{project.propertyType}</span>
                  </div>
                  <div>
                    <span className="text-ivory-400 block text-[10px] uppercase">Coverage Region</span>
                    <span className="font-medium text-ivory-100">{project.location}</span>
                  </div>
                  <div>
                    <span className="text-ivory-400 block text-[10px] uppercase">Deliverable Format</span>
                    <span className="font-medium text-ivory-100">Next.js WebGL Responsive</span>
                  </div>
                  <div>
                    <span className="text-ivory-400 block text-[10px] uppercase">Status</span>
                    <span className="font-medium text-emerald-400">Concept Prototype Online</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-charcoal-800">
                  <Link
                    href={`/contact?propertyRef=${encodeURIComponent(project.title)}`}
                    className="w-full py-2.5 px-3 rounded bg-gradient-to-r from-gold-400 to-gold-600 text-midnight-950 font-semibold text-xs tracking-wider uppercase block text-center shadow-gold-subtle"
                  >
                    Build Something Similar
                  </Link>
                </div>
              </div>

              {/* Gallery thumbnails */}
              {project.galleryImages.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-ivory-400 font-semibold block">
                    Gallery Previews
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {project.galleryImages.map((img, i) => (
                      <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden border border-charcoal-800">
                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
