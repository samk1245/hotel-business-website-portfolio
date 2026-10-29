import React from "react";
import { getCurrentAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Settings, ShieldCheck, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default async function AdminSettingsPage() {
  const session = await getCurrentAdminSession();
  if (!session) redirect("/admin/login");

  const settings = await prisma.businessSetting.findMany({
    orderBy: { key: "asc" },
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-ivory-50">
          Studio Identity & Contact Settings
        </h1>
        <p className="text-xs text-ivory-400 mt-1">
          Configured identity parameters for Prayagraj, UP, and national operations.
        </p>
      </div>

      <div className="bg-midnight-900/80 border border-charcoal-800 rounded-2xl p-6 space-y-6 shadow-lg">
        <div className="space-y-4">
          {settings.map((s) => (
            <div
              key={s.id}
              className="p-4 rounded-xl bg-charcoal-900/60 border border-charcoal-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <span className="font-mono text-[11px] text-gold-400 block">{s.key}</span>
                <span className="text-xs text-ivory-400">{s.description}</span>
              </div>
              <div className="font-semibold text-xs text-ivory-100 bg-midnight-950 px-3 py-1.5 rounded border border-charcoal-700">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-charcoal-900 border border-gold-500/20 text-xs text-ivory-300 flex items-start space-x-3">
          <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
          <span>
            These settings govern the public website headers, phone click-to-call links, WhatsApp routing URLs, and JSON-LD structured data for Google Search.
          </span>
        </div>
      </div>
    </div>
  );
}
