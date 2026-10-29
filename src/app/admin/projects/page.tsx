import React from "react";
import { getCurrentAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Layers, Eye, Plus, Sparkles, MapPin, CheckCircle } from "lucide-react";

export default async function AdminProjectsPage() {
  const session = await getCurrentAdminSession();
  if (!session) redirect("/admin/login");

  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-ivory-50">
            Portfolio & Concept Showcases
          </h1>
          <p className="text-xs text-ivory-400 mt-1">
            Manage live hotel demonstration flagships and client case studies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-midnight-900/80 border border-charcoal-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-900">
                <img
                  src={proj.heroImage}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-midnight-950/90 border border-gold-500/40 text-gold-400 text-[10px] font-semibold px-2 py-0.5 rounded">
                  {proj.isConcept ? "Concept Demo" : "Client Project"}
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="text-[10px] text-ivory-400 uppercase tracking-wider font-semibold">
                  {proj.propertyType}
                </div>
                <h3 className="font-serif text-lg font-semibold text-ivory-100">
                  {proj.title}
                </h3>
                <p className="text-xs text-ivory-400 flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-gold-400" />
                  <span>{proj.location}</span>
                </p>
                <p className="text-xs text-ivory-300/80 line-clamp-2 pt-1">
                  {proj.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-charcoal-800 flex items-center justify-between mt-4">
              <span className="text-[10px] text-emerald-400 font-semibold">Active Online</span>
              {proj.demoUrl && (
                <Link
                  href={proj.demoUrl}
                  target="_blank"
                  className="inline-flex items-center space-x-1 text-xs text-gold-400 hover:underline"
                >
                  <Eye className="w-3 h-3" />
                  <span>Test Demo</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
