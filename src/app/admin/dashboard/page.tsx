import React from "react";
import { getCurrentAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import {
  Users,
  IndianRupee,
  Layers,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Download,
  AlertCircle,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getCurrentAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [totalLeads, newLeads, convertedLeads, projectsCount, recentLeads] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.lead.count({ where: { status: "CONVERTED" } }),
    prisma.project.count(),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-ivory-50">
            Welcome back, {session.name}
          </h1>
          <p className="text-xs text-ivory-400 mt-1">
            Studio Overview • Prayagraj, Uttar Pradesh & Pan-India Pipeline
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/api/leads/export"
            className="inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2.5 rounded-lg border border-charcoal-700 bg-charcoal-900 hover:border-gold-500/50 text-ivory-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-gold-400" />
            <span>Export Leads CSV</span>
          </a>

          <Link
            href="/admin/leads"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-midnight-950 transition-colors shadow-gold-subtle"
          >
            <span>View All Leads</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-xl bg-midnight-900/80 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-ivory-400">
            <span>Total Enquiries</span>
            <Users className="w-4 h-4 text-gold-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-ivory-50">{totalLeads}</div>
          <p className="text-[11px] text-ivory-400">Hotel consultation requests</p>
        </div>

        <div className="p-5 rounded-xl bg-midnight-900/80 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-ivory-400">
            <span>New Leads (Pending Action)</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-amber-400">{newLeads}</div>
          <p className="text-[11px] text-ivory-400">Awaiting concierge callback</p>
        </div>

        <div className="p-5 rounded-xl bg-midnight-900/80 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-ivory-400">
            <span>Converted Hoteliers</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-emerald-400">{convertedLeads}</div>
          <p className="text-[11px] text-ivory-400">Commissions in progress</p>
        </div>

        <div className="p-5 rounded-xl bg-midnight-900/80 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-ivory-400">
            <span>Active Showcases</span>
            <Layers className="w-4 h-4 text-gold-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-gold-400">{projectsCount}</div>
          <p className="text-[11px] text-ivory-400">Interactive live demo flagships</p>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="p-6 rounded-2xl bg-midnight-900/80 border border-charcoal-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-semibold text-ivory-50">
              Recent Hotel Enquiries
            </h2>
            <p className="text-xs text-ivory-400">Latest submissions from hotel owners</p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs text-gold-400 hover:text-gold-300 font-semibold"
          >
            Manage Pipeline →
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="py-12 text-center text-xs text-ivory-400">
            No leads received yet. Test by submitting an enquiry on the homepage lead form.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ivory-300">
              <thead className="bg-charcoal-900/60 uppercase text-[10px] text-ivory-400 font-semibold border-b border-charcoal-800">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Package</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-charcoal-800/40 transition-colors">
                    <td className="py-3 px-4 text-ivory-400">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3 px-4 font-semibold text-ivory-100">
                      {lead.propertyName}
                    </td>
                    <td className="py-3 px-4">{lead.city}</td>
                    <td className="py-3 px-4">
                      {lead.contactName} ({lead.phone})
                    </td>
                    <td className="py-3 px-4 text-gold-400">
                      {lead.selectedPackage || "Custom Scope"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          lead.status === "NEW"
                            ? "bg-amber-950/80 text-amber-400 border border-amber-500/40"
                            : lead.status === "CONVERTED"
                            ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/40"
                            : "bg-charcoal-800 text-ivory-300"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/leads?id=${lead.id}`}
                        className="text-gold-400 hover:underline"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
