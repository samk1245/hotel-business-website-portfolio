import React from "react";
import { getCurrentAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { IndianRupee, Check, Sparkles, Layers } from "lucide-react";

export default async function AdminPricingPage() {
  const session = await getCurrentAdminSession();
  if (!session) redirect("/admin/login");

  const [packages, addons] = await Promise.all([
    prisma.pricingPackage.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.pricingAddon.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-ivory-50">
          Packages & Feature Pricing Rates
        </h1>
        <p className="text-xs text-ivory-400 mt-1">
          Review base package tiers and itemized feature add-ons.
        </p>
      </div>

      {/* Packages Table */}
      <div className="bg-midnight-900/80 border border-charcoal-800 rounded-2xl overflow-hidden shadow-lg p-6 space-y-4">
        <h2 className="font-serif text-lg font-semibold text-ivory-50 flex items-center space-x-2">
          <IndianRupee className="w-4 h-4 text-gold-400" />
          <span>Foundational Packages</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ivory-300">
            <thead className="bg-charcoal-900 uppercase text-[10px] text-ivory-400 font-semibold border-b border-charcoal-800">
              <tr>
                <th className="py-3 px-4">Tier Key</th>
                <th className="py-3 px-4">Package Name</th>
                <th className="py-3 px-4">Base Price</th>
                <th className="py-3 px-4">Page Limit</th>
                <th className="py-3 px-4">Highlights</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800">
              {packages.map((pkg) => (
                <tr key={pkg.id}>
                  <td className="py-3 px-4 font-mono text-gold-400">{pkg.key}</td>
                  <td className="py-3 px-4 font-semibold text-ivory-100">{pkg.name}</td>
                  <td className="py-3 px-4 font-serif text-gold-400 font-bold">
                    ₹{pkg.basePrice.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-4">{pkg.pageLimit} pages</td>
                  <td className="py-3 px-4 text-ivory-400 text-[11px] truncate max-w-xs">
                    {pkg.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Addons Table */}
      <div className="bg-midnight-900/80 border border-charcoal-800 rounded-2xl overflow-hidden shadow-lg p-6 space-y-4">
        <h2 className="font-serif text-lg font-semibold text-ivory-50 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-gold-400" />
          <span>Itemized Feature Add-On Rates</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ivory-300">
            <thead className="bg-charcoal-900 uppercase text-[10px] text-ivory-400 font-semibold border-b border-charcoal-800">
              <tr>
                <th className="py-3 px-4">Add-on Key</th>
                <th className="py-3 px-4">Feature Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Standard Rate</th>
                <th className="py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800">
              {addons.map((addon) => (
                <tr key={addon.id}>
                  <td className="py-3 px-4 font-mono text-ivory-400 text-[11px]">{addon.key}</td>
                  <td className="py-3 px-4 font-semibold text-ivory-100">{addon.name}</td>
                  <td className="py-3 px-4 uppercase text-[10px] text-gold-400">{addon.category}</td>
                  <td className="py-3 px-4 font-semibold text-ivory-50">
                    ₹{addon.price.toLocaleString("en-IN")}
                    {addon.priceType === "RECURRING_MONTHLY" ? "/mo" : ""}
                  </td>
                  <td className="py-3 px-4 text-ivory-400 text-[11px] truncate max-w-xs">
                    {addon.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
