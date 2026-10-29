import { describe, it, expect } from "vitest";
import {
  calculateProjectEstimate,
  generateWhatsAppQuoteUrl,
  PACKAGE_INCLUDED_ADDONS,
} from "../src/lib/pricing-calculator";
import { CalculatorState } from "../src/lib/types";

describe("Hotel Website Pricing Calculator Engine", () => {
  it("should calculate Starter Stay base package without extras", () => {
    const state: CalculatorState = {
      hotelType: "Homestay / B&B",
      selectedPackageKey: "starter",
      additionalPages: 0,
      additionalRoomCategories: 0,
      selectedAddonKeys: [],
      wantsAdminCms: false,
      wantsMonthlyMaintenance: false,
    };

    const result = calculateProjectEstimate(state);
    expect(result.packageName).toBe("Starter Stay");
    expect(result.packageBasePrice).toBe(7999);
    expect(result.oneTimeTotal).toBe(7999);
    expect(result.monthlyMaintenanceCost).toBe(0);
    expect(result.estimatedDeliveryDays.min).toBe(5);
    expect(result.estimatedDeliveryDays.max).toBe(7);
  });

  it("should calculate Signature Hotel base package without extras", () => {
    const state: CalculatorState = {
      hotelType: "Boutique Hotel",
      selectedPackageKey: "signature",
      additionalPages: 0,
      additionalRoomCategories: 0,
      selectedAddonKeys: [],
      wantsAdminCms: false,
      wantsMonthlyMaintenance: false,
    };

    const result = calculateProjectEstimate(state);
    expect(result.packageName).toBe("Signature Hotel");
    expect(result.packageBasePrice).toBe(17999);
    expect(result.oneTimeTotal).toBe(17999);
  });

  it("should calculate extra pages and room category additions correctly", () => {
    const state: CalculatorState = {
      hotelType: "Business Hotel",
      selectedPackageKey: "signature", // 17,999
      additionalPages: 3, // + 3,000
      additionalRoomCategories: 2, // + 3,000
      selectedAddonKeys: [],
      wantsAdminCms: false,
      wantsMonthlyMaintenance: false,
    };

    const result = calculateProjectEstimate(state);
    expect(result.additionalPagesCost).toBe(3000);
    expect(result.additionalRoomsCost).toBe(3000);
    expect(result.oneTimeTotal).toBe(17999 + 3000 + 3000);
  });

  it("should NOT double-charge for add-ons already included in the selected tier", () => {
    // Signature Hotel already includes:
    // addon_whatsapp_integration, addon_booking_enquiry_form, addon_advanced_gallery, addon_local_seo
    const state: CalculatorState = {
      hotelType: "Luxury Heritage",
      selectedPackageKey: "signature", // 17,999
      additionalPages: 0,
      additionalRoomCategories: 0,
      selectedAddonKeys: [
        "addon_whatsapp_integration", // Included (Free)
        "addon_booking_enquiry_form", // Included (Free)
        "addon_advanced_gallery",     // Included (Free)
        "addon_booking_engine",       // Not included (+ 8,000)
      ],
      wantsAdminCms: false,
      wantsMonthlyMaintenance: false,
    };

    const result = calculateProjectEstimate(state);
    // Only addon_booking_engine should be billed
    expect(result.selectedAddonsCost).toBe(8000);
    expect(result.oneTimeTotal).toBe(17999 + 8000);
  });

  it("should calculate recurring monthly maintenance separately without contaminating one-time total", () => {
    const state: CalculatorState = {
      hotelType: "Nature Resort",
      selectedPackageKey: "luxury", // 34,999
      additionalPages: 0,
      additionalRoomCategories: 0,
      selectedAddonKeys: [],
      wantsAdminCms: false,
      wantsMonthlyMaintenance: true, // + 1,499/mo
    };

    const result = calculateProjectEstimate(state);
    expect(result.oneTimeTotal).toBe(34999);
    expect(result.monthlyMaintenanceCost).toBe(1499);
  });

  it("should generate properly formatted and encoded WhatsApp quote URL", () => {
    const url = generateWhatsAppQuoteUrl({
      phone: "+91 98765 43210",
      hotelName: "Rajwada Palace",
      packageName: "Signature Hotel",
      estimatedTotal: 23999,
      monthlyMaintenance: 1499,
    });

    expect(url).toContain("https://wa.me/919876543210");
    expect(url).toContain(encodeURIComponent("Rajwada Palace"));
    expect(url).toContain(encodeURIComponent("Signature Hotel"));
    expect(url).toContain(encodeURIComponent("23,999"));
  });
});
