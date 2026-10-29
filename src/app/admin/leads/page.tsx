"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Trash2,
  Edit3,
  X,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface Lead {
  id: string;
  propertyName: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
  roomCount: string | null;
  selectedPackage: string | null;
  estimatedBudget: string | null;
  estimatedTotal: number | null;
  calculatedTimeframe: string | null;
  status: string;
  internalNotes: string | null;
  additionalNotes: string | null;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [internalNotesInput, setInternalNotesInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const url = `/api/leads?status=${statusFilter}&search=${encodeURIComponent(search)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      setIsUpdating(true);
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        if (activeLead && activeLead.id === id) {
          setActiveLead({ ...activeLead, status: newStatus });
        }
      }
      setIsUpdating(false);
    } catch {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!activeLead) return;
    try {
      setIsUpdating(true);
      const res = await fetch(`/api/leads/${activeLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: activeLead.status,
          internalNotes: internalNotesInput,
        }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === activeLead.id ? { ...l, internalNotes: internalNotesInput } : l
          )
        );
        setActiveLead({ ...activeLead, internalNotes: internalNotesInput });
      }
      setIsUpdating(false);
    } catch {
      setIsUpdating(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (activeLead?.id === id) setActiveLead(null);
      }
    } catch {
      alert("Failed to delete lead");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-ivory-50">
            Hotel Leads & Inquiries
          </h1>
          <p className="text-xs text-ivory-400 mt-1">
            Track inquiries, update statuses, record private notes, and export pipeline data.
          </p>
        </div>

        <a
          href="/api/leads/export"
          className="inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2.5 rounded-lg border border-charcoal-700 bg-charcoal-900 hover:border-gold-500/50 text-ivory-200 transition-colors self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-gold-400" />
          <span>Export All to CSV</span>
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-midnight-900/80 border border-charcoal-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-ivory-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search hotel, owner, city, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-charcoal-900 border border-charcoal-700 text-ivory-100 placeholder-charcoal-500 text-xs focus:outline-none focus:ring-1 focus:ring-gold-400"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {["ALL", "NEW", "CONTACTED", "IN_DISCUSSION", "CONVERTED", "ARCHIVED"].map(
            (status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  statusFilter === status
                    ? "bg-gold-500 text-midnight-950 font-semibold border-gold-400"
                    : "bg-charcoal-900 text-ivory-300 border-charcoal-700 hover:border-charcoal-600"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-midnight-900/80 border border-charcoal-800 rounded-2xl overflow-hidden shadow-luxury-dark">
        {loading ? (
          <div className="p-16 text-center text-xs text-ivory-400 flex flex-col items-center justify-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-gold-400" />
            <span>Loading hotel inquiries...</span>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-16 text-center text-xs text-ivory-400">
            No hotel inquiries found matching the selected criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ivory-300">
              <thead className="bg-charcoal-900 uppercase text-[10px] text-ivory-400 font-semibold border-b border-charcoal-800">
                <tr>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Hotel / Property</th>
                  <th className="py-3.5 px-4">City</th>
                  <th className="py-3.5 px-4">Contact Person</th>
                  <th className="py-3.5 px-4">Package & Est. Total</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-charcoal-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-ivory-400 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-ivory-100">
                      <div>{lead.propertyName}</div>
                      <span className="text-[10px] text-ivory-400 font-normal">
                        {lead.roomCount || "Rooms unspecified"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">{lead.city}</td>
                    <td className="py-3.5 px-4">
                      <div>{lead.contactName}</div>
                      <div className="flex items-center space-x-2 text-[11px] text-ivory-400 mt-0.5">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:underline flex items-center space-x-0.5"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>{lead.phone}</span>
                        </a>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-gold-400 font-semibold block">
                        {lead.selectedPackage || "Custom Inquiry"}
                      </span>
                      {lead.estimatedTotal && (
                        <span className="text-[10px] text-ivory-400">
                          ₹{lead.estimatedTotal.toLocaleString("en-IN")}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                        className="px-2 py-1 rounded text-[11px] font-semibold bg-charcoal-900 border border-charcoal-700 text-ivory-200 focus:outline-none focus:border-gold-400"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="IN_DISCUSSION">IN_DISCUSSION</option>
                        <option value="CONVERTED">CONVERTED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveLead(lead);
                            setInternalNotesInput(lead.internalNotes || "");
                          }}
                          className="px-2.5 py-1 rounded bg-charcoal-800 hover:bg-gold-500 hover:text-midnight-950 text-ivory-200 text-xs font-semibold transition-colors"
                        >
                          Details
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1 text-red-400 hover:text-red-300"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal / Detail Drawer */}
      {activeLead && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-midnight-900 border border-gold-500/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-charcoal-800 pb-4">
              <div>
                <span className="text-[10px] text-gold-400 font-semibold uppercase tracking-wider">
                  Lead Details • {new Date(activeLead.createdAt).toLocaleString("en-IN")}
                </span>
                <h3 className="font-serif text-2xl font-semibold text-ivory-50 mt-1">
                  {activeLead.propertyName}
                </h3>
                <p className="text-xs text-ivory-400">{activeLead.city}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveLead(null)}
                className="text-ivory-400 hover:text-ivory-100 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <a
                href={`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello ${activeLead.contactName}, thank you for reaching out to Grandeur Digital regarding ${activeLead.propertyName}. I would be delighted to discuss your website.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center justify-center space-x-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${activeLead.phone.replace(/\s+/g, "")}`}
                className="p-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 hover:border-gold-500/50 text-ivory-200 text-xs font-semibold flex items-center justify-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Call Phone</span>
              </a>

              <a
                href={`mailto:${activeLead.email}`}
                className="p-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 hover:border-gold-500/50 text-ivory-200 text-xs font-semibold flex items-center justify-center space-x-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                <span>Send Email</span>
              </a>
            </div>

            {/* Structured Specifications */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-charcoal-900/60 p-4 rounded-xl border border-charcoal-800">
              <div>
                <span className="text-ivory-400 block text-[10px] uppercase">Contact Person</span>
                <span className="font-semibold text-ivory-100">{activeLead.contactName}</span>
              </div>
              <div>
                <span className="text-ivory-400 block text-[10px] uppercase">Rooms Count</span>
                <span className="font-semibold text-ivory-100">{activeLead.roomCount || "N/A"}</span>
              </div>
              <div>
                <span className="text-ivory-400 block text-[10px] uppercase">Selected Package</span>
                <span className="font-semibold text-gold-400">{activeLead.selectedPackage || "Custom"}</span>
              </div>
              <div>
                <span className="text-ivory-400 block text-[10px] uppercase">Budget / Est Total</span>
                <span className="font-semibold text-ivory-100">
                  {activeLead.estimatedTotal ? `₹${activeLead.estimatedTotal.toLocaleString("en-IN")}` : activeLead.estimatedBudget || "Unspecified"}
                </span>
              </div>
            </div>

            {/* Client Notes */}
            {activeLead.additionalNotes && (
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-gold-400 uppercase tracking-wider text-[10px] block">
                  Client Stated Requirements:
                </span>
                <p className="p-3 rounded-lg bg-charcoal-900 border border-charcoal-800 text-ivory-200 leading-relaxed whitespace-pre-wrap">
                  {activeLead.additionalNotes}
                </p>
              </div>
            )}

            {/* Internal Studio Notes */}
            <div className="space-y-2 text-xs pt-2 border-t border-charcoal-800">
              <label className="font-semibold text-ivory-300 uppercase tracking-wider text-[10px] block">
                Private Studio Notes (Calls, Scope Adjustments, Proposed Rates):
              </label>
              <textarea
                rows={3}
                value={internalNotesInput}
                onChange={(e) => setInternalNotesInput(e.target.value)}
                placeholder="e.g. Called owner on 29 Oct, interested in booking engine for 18 suites in Varanasi..."
                className="w-full px-3 py-2 rounded-lg bg-charcoal-900 border border-charcoal-700 text-ivory-100 text-xs focus:outline-none focus:ring-1 focus:ring-gold-400"
              />
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isUpdating}
                className="py-2 px-4 rounded bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold text-xs tracking-wider uppercase transition-colors"
              >
                {isUpdating ? "Saving..." : "Save Internal Notes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
