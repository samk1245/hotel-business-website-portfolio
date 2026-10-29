import { PRICING_PACKAGES } from "@/data/packages";
import { PRICING_ADDONS } from "@/data/addons";
import { CalculationResult, CalculatorState } from "./types";

/**
 * Mapping of package keys to addon keys that are already included by default
 * in that package tier to prevent double-charging clients.
 */
export const PACKAGE_INCLUDED_ADDONS: Record<string, string[]> = {
  starter: [
    "addon_whatsapp_integration",
    "addon_booking_enquiry_form"
  ],
  signature: [
    "addon_whatsapp_integration",
    "addon_booking_enquiry_form",
    "addon_advanced_gallery",
    "addon_local_seo"
  ],
  luxury: [
    "addon_whatsapp_integration",
    "addon_booking_enquiry_form",
    "addon_advanced_gallery",
    "addon_local_seo",
    "addon_interactive_3d",
    "addon_advanced_animation",
    "addon_virtual_tour",
    "addon_analytics"
  ],
  direct_booking: [
    "addon_whatsapp_integration",
    "addon_booking_enquiry_form",
    "addon_advanced_gallery",
    "addon_local_seo",
    "addon_booking_engine",
    "addon_payment_gateway",
    "addon_analytics"
  ],
  custom_3d: [
    "addon_whatsapp_integration",
    "addon_booking_enquiry_form",
    "addon_advanced_gallery",
    "addon_local_seo",
    "addon_interactive_3d",
    "addon_advanced_animation",
    "addon_virtual_tour",
    "addon_booking_engine",
    "addon_payment_gateway",
    "addon_analytics"
  ]
};

export const BASE_TIMEFRAMES: Record<string, { min: number; max: number }> = {
  starter: { min: 5, max: 7 },
  signature: { min: 10, max: 14 },
  luxury: { min: 18, max: 24 },
  direct_booking: { min: 20, max: 28 },
  custom_3d: { min: 25, max: 35 },
};

export function calculateProjectEstimate(state: CalculatorState): CalculationResult {
  const selectedPkg = PRICING_PACKAGES.find((p) => p.key === state.selectedPackageKey) || PRICING_PACKAGES[1]; // default signature
  const includedKeys = new Set(PACKAGE_INCLUDED_ADDONS[selectedPkg.key] || []);

  const breakdown: CalculationResult["breakdown"] = [];

  // 1. Package Base Price
  breakdown.push({
    name: `${selectedPkg.name} Base Package (${selectedPkg.pageLimit} Pages Included)`,
    cost: selectedPkg.basePrice,
    type: "base"
  });

  // 2. Extra Pages
  const extraPages = Math.max(0, state.additionalPages || 0);
  const additionalPagesCost = extraPages * 1000;
  if (extraPages > 0) {
    breakdown.push({
      name: `${extraPages} Additional Page${extraPages > 1 ? "s" : ""} (₹1,000/page)`,
      cost: additionalPagesCost,
      type: "addon"
    });
  }

  // 3. Extra Room Categories
  const extraRooms = Math.max(0, state.additionalRoomCategories || 0);
  const additionalRoomsCost = extraRooms * 1500;
  if (extraRooms > 0) {
    breakdown.push({
      name: `${extraRooms} Additional Room Category Showcase${extraRooms > 1 ? "s" : ""} (₹1,500/suite)`,
      cost: additionalRoomsCost,
      type: "addon"
    });
  }

  // 4. Selected Add-ons (filter out included ones to prevent double-charging)
  let selectedAddonsCost = 0;
  let addedDays = Math.ceil(extraPages / 2) + Math.ceil(extraRooms / 2);

  const activeAddonKeys = new Set(state.selectedAddonKeys || []);
  if (state.wantsAdminCms) {
    activeAddonKeys.add("addon_admin_dashboard");
  }

  for (const addonKey of activeAddonKeys) {
    const addon = PRICING_ADDONS.find((a) => a.key === addonKey);
    if (!addon) continue;

    // Check if already covered by package
    if (includedKeys.has(addonKey)) {
      continue; // No charge: Included in package!
    }

    if (addon.priceType === "ONE_TIME") {
      selectedAddonsCost += addon.price;
      breakdown.push({
        name: addon.name,
        cost: addon.price,
        type: "addon"
      });

      // add timeframe estimation
      if (addon.key === "addon_booking_engine") addedDays += 4;
      else if (addon.key === "addon_interactive_3d") addedDays += 5;
      else if (addon.key === "addon_admin_dashboard") addedDays += 3;
      else addedDays += 1;
    }
  }

  // 5. Monthly Maintenance (Recurring)
  let monthlyMaintenanceCost = 0;
  if (state.wantsMonthlyMaintenance || activeAddonKeys.has("addon_monthly_maintenance")) {
    const maintenanceAddon = PRICING_ADDONS.find((a) => a.key === "addon_monthly_maintenance");
    monthlyMaintenanceCost = maintenanceAddon ? maintenanceAddon.price : 1499;
    breakdown.push({
      name: "Optional Monthly Hotel Care & Hosting (Recurring)",
      cost: monthlyMaintenanceCost,
      type: "recurring"
    });
  }

  const oneTimeTotal = selectedPkg.basePrice + additionalPagesCost + additionalRoomsCost + selectedAddonsCost;

  const baseDays = BASE_TIMEFRAMES[selectedPkg.key] || { min: 10, max: 14 };
  const estimatedDeliveryDays = {
    min: baseDays.min + addedDays,
    max: baseDays.max + addedDays + (addedDays > 0 ? 2 : 0)
  };

  return {
    packageName: selectedPkg.name,
    packageBasePrice: selectedPkg.basePrice,
    additionalPagesCost,
    additionalRoomsCost,
    selectedAddonsCost,
    oneTimeTotal,
    monthlyMaintenanceCost,
    estimatedDeliveryDays,
    breakdown
  };
}

/**
 * Generates an appropriately encoded WhatsApp click-to-chat URL with inquiry details
 */
export function generateWhatsAppQuoteUrl(options: {
  phone: string;
  hotelName?: string;
  packageName?: string;
  estimatedTotal?: number;
  monthlyMaintenance?: number;
  summaryNotes?: string;
}): string {
  const cleanPhone = options.phone.replace(/[^0-9]/g, "");

  let message = "Hello, I am interested in building a professional website for my hotel.";

  if (options.hotelName) {
    message += `\n\nProperty Name: ${options.hotelName}`;
  }

  if (options.packageName) {
    message += `\nSelected Package: ${options.packageName}`;
  }

  if (options.estimatedTotal) {
    message += `\nEstimated Project Total: ₹${options.estimatedTotal.toLocaleString("en-IN")}`;
  }

  if (options.monthlyMaintenance && options.monthlyMaintenance > 0) {
    message += `\nCare Plan: ₹${options.monthlyMaintenance.toLocaleString("en-IN")}/month`;
  }

  if (options.summaryNotes) {
    message += `\nNotes: ${options.summaryNotes}`;
  }

  message += "\n\nPlease share your detailed proposal and next steps.";

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
