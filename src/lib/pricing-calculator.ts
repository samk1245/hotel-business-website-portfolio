import { PRICING_PACKAGES } from "@/data/packages";
import { PRICING_ADDONS } from "@/data/addons";
import { CalculationResult, CalculatorState } from "./types";

/**
 * Mapping of package keys to addon keys that are already included by default
 * in that package tier to prevent duplicate charges.
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
    "addon_local_seo",
    "addon_qr_menu",
    "addon_review_booster"
  ],
  luxury: [
    "addon_whatsapp_integration",
    "addon_booking_enquiry_form",
    "addon_advanced_gallery",
    "addon_local_seo",
    "addon_interactive_3d",
    "addon_advanced_animation",
    "addon_virtual_tour",
    "addon_qr_menu",
    "addon_review_booster"
  ],
  direct_booking: [
    "addon_whatsapp_integration",
    "addon_booking_enquiry_form",
    "addon_advanced_gallery",
    "addon_local_seo",
    "addon_booking_engine",
    "addon_payment_gateway",
    "addon_qr_menu",
    "addon_review_booster"
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
    "addon_qr_menu",
    "addon_review_booster"
  ]
};

export const BASE_TIMEFRAMES: Record<string, { min: number; max: number }> = {
  starter: { min: 4, max: 6 },
  signature: { min: 7, max: 10 },
  luxury: { min: 14, max: 18 },
  direct_booking: { min: 16, max: 22 },
  custom_3d: { min: 20, max: 28 },
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

  // 2. Extra Pages (Affordable ₹600 per extra page)
  const extraPages = Math.max(0, state.additionalPages || 0);
  const additionalPagesCost = extraPages * 600;
  if (extraPages > 0) {
    breakdown.push({
      name: `${extraPages} Additional Page${extraPages > 1 ? "s" : ""} (₹600/page)`,
      cost: additionalPagesCost,
      type: "addon"
    });
  }

  // 3. Extra Room Categories (Affordable ₹900 per suite)
  const extraRooms = Math.max(0, state.additionalRoomCategories || 0);
  const additionalRoomsCost = extraRooms * 900;
  if (extraRooms > 0) {
    breakdown.push({
      name: `${extraRooms} Additional Room Category Showcase${extraRooms > 1 ? "s" : ""} (₹900/suite)`,
      cost: additionalRoomsCost,
      type: "addon"
    });
  }

  // 4. Selected Add-ons
  let selectedAddonsCost = 0;
  let addedDays = Math.ceil(extraPages / 2) + Math.ceil(extraRooms / 2);

  const activeAddonKeys = new Set(state.selectedAddonKeys || []);
  if (state.wantsAdminCms) {
    activeAddonKeys.add("addon_admin_dashboard");
  }

  for (const addonKey of activeAddonKeys) {
    const addon = PRICING_ADDONS.find((a) => a.key === addonKey);
    if (!addon) continue;

    // Check if already covered by foundation package scope
    if (includedKeys.has(addonKey)) {
      continue; // Covered by foundation package!
    }

    if (addon.priceType === "ONE_TIME") {
      selectedAddonsCost += addon.price;
      breakdown.push({
        name: addon.name,
        cost: addon.price,
        type: "addon"
      });

      if (addon.key === "addon_booking_engine") addedDays += 3;
      else if (addon.key === "addon_interactive_3d") addedDays += 4;
      else if (addon.key === "addon_admin_dashboard") addedDays += 2;
      else addedDays += 1;
    }
  }

  // 5. Monthly Maintenance (Recurring)
  let monthlyMaintenanceCost = 0;
  if (state.wantsMonthlyMaintenance || activeAddonKeys.has("addon_monthly_maintenance")) {
    const maintenanceAddon = PRICING_ADDONS.find((a) => a.key === "addon_monthly_maintenance");
    monthlyMaintenanceCost = maintenanceAddon ? maintenanceAddon.price : 999;
    breakdown.push({
      name: "Optional Monthly Hotel Care & Hosting (Recurring)",
      cost: monthlyMaintenanceCost,
      type: "recurring"
    });
  }

  const oneTimeTotal = selectedPkg.basePrice + additionalPagesCost + additionalRoomsCost + selectedAddonsCost;

  const baseDays = BASE_TIMEFRAMES[selectedPkg.key] || { min: 7, max: 10 };
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
  let cleanPhone = options.phone.replace(/[^0-9]/g, "");
  if (!cleanPhone.startsWith("91") && cleanPhone.length === 10) {
    cleanPhone = "91" + cleanPhone;
  }

  let message = "Hello Samir Khan! I am interested in building a website for my hotel to grow direct bookings.";

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

  message += "\n\nPlease share your proposal and let's connect on a brief call.";

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
