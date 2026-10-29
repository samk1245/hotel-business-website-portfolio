import { describe, it, expect } from "vitest";
import {
  calculateProjectEstimate,
  generateWhatsAppQuoteUrl,
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
    expect(result.packageBasePrice).toBe(4999);
    expect(result.oneTimeTotal).toBe(4999);
    expect(result.monthlyMaintenanceCost).toBe(0);
    expect(result.estimatedDeliveryDays.min).toBe(4);
    expect(result.estimatedDeliveryDays.max).toBe(6);
  });

  it("should calculate Signature Growth Hotel base package without extras", () => {
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
    expect(result.packageName).toBe("Signature Growth Hotel");
    expect(result.packageBasePrice).toBe(11999);
    expect(result.oneTimeTotal).toBe(11999);
  });

  it("should calculate extra pages and room category additions correctly", () => {
    const state: CalculatorState = {
      hotelType: "Business Hotel",
      selectedPackageKey: "signature", // 11,999
      additionalPages: 2, // 2 * 600 = 1200
      additionalRoomCategories: 2, // 2 * 900 = 1800
      selectedAddonKeys: [],
      wantsAdminCms: false,
      wantsMonthlyMaintenance: false,
    };

    const result = calculateProjectEstimate(state);
    expect(result.additionalPagesCost).toBe(1200);
    expect(result.additionalRoomsCost).toBe(1800);
    expect(result.oneTimeTotal).toBe(11999 + 1200 + 1800);
  });

  it("should NOT double-charge for add-ons already included in the selected tier", () => {
    const state: CalculatorState = {
      hotelType: "Luxury Heritage",
      selectedPackageKey: "signature", // 11,999
      additionalPages: 0,
      additionalRoomCategories: 0,
      selectedAddonKeys: [
        "addon_whatsapp_integration", // Included
        "addon_booking_enquiry_form", // Included
        "addon_advanced_gallery",     // Included
        "addon_booking_engine",       // Not included (+ 4500)
      ],
      wantsAdminCms: false,
      wantsMonthlyMaintenance: false,
    };

    const result = calculateProjectEstimate(state);
    expect(result.selectedAddonsCost).toBe(4500);
    expect(result.oneTimeTotal).toBe(11999 + 4500);
  });

  it("should calculate recurring monthly maintenance separately without contaminating one-time total", () => {
    const state: CalculatorState = {
      hotelType: "Nature Resort",
      selectedPackageKey: "luxury", // 19,999
      additionalPages: 0,
      additionalRoomCategories: 0,
      selectedAddonKeys: [],
      wantsAdminCms: false,
      wantsMonthlyMaintenance: true, // + 999/mo
    };

    const result = calculateProjectEstimate(state);
    expect(result.oneTimeTotal).toBe(19999);
    expect(result.monthlyMaintenanceCost).toBe(999);
  });

  it("should generate properly formatted and encoded WhatsApp quote URL with Samir Khan's phone", () => {
    const url = generateWhatsAppQuoteUrl({
      phone: "7887087151",
      hotelName: "Rajwada Palace",
      packageName: "Signature Growth Hotel",
      estimatedTotal: 14999,
      monthlyMaintenance: 999,
    });

    expect(url).toContain("https://wa.me/917887087151");
    expect(url).toContain(encodeURIComponent("Samir Khan"));
    expect(url).toContain(encodeURIComponent("Rajwada Palace"));
    expect(url).toContain(encodeURIComponent("Signature Growth Hotel"));
    expect(url).toContain(encodeURIComponent("14,999"));
  });
});
