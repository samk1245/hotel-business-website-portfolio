import { describe, it, expect } from "vitest";
import { leadSubmissionSchema, adminLoginSchema } from "../src/lib/validations";

describe("Hotel Owner Lead Validation Schema", () => {
  it("should accept valid hotel consultation submissions", () => {
    const validData = {
      propertyName: "Grand Haveli Suites",
      contactName: "Raghuvendra Pratap",
      phone: "+91 98765 43210",
      email: "gm@grandhaveli.in",
      city: "Prayagraj",
      roomCount: "10-25 rooms",
      selectedPackage: "Signature Hotel (₹17,999)",
      selectedAddons: ["addon_booking_engine"],
      estimatedBudget: "₹15,000 – ₹35,000",
      preferredLaunchDate: "Within 2 to 3 weeks",
      additionalNotes: "Looking to connect with Cloudbeds PMS.",
      estimatedTotal: 25999,
      calculatedTimeframe: "10-14 days",
    };

    const parse = leadSubmissionSchema.safeParse(validData);
    expect(parse.success).toBe(true);
  });

  it("should reject submissions with invalid phone numbers", () => {
    const invalidPhoneData = {
      propertyName: "Mountain Chalet",
      contactName: "Aarav Sharma",
      phone: "123", // Too short
      email: "aarav@chalet.com",
      city: "Manali",
    };

    const parse = leadSubmissionSchema.safeParse(invalidPhoneData);
    expect(parse.success).toBe(false);
    if (!parse.success) {
      expect(parse.error.flatten().fieldErrors.phone).toBeDefined();
    }
  });

  it("should reject submissions with invalid email addresses", () => {
    const invalidEmailData = {
      propertyName: "Boutique Stay",
      contactName: "Sunita Roy",
      phone: "+91 98765 43210",
      email: "not-an-email",
      city: "Jaipur",
    };

    const parse = leadSubmissionSchema.safeParse(invalidEmailData);
    expect(parse.success).toBe(false);
    if (!parse.success) {
      expect(parse.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it("should reject submissions missing required hotel property name", () => {
    const missingNameData = {
      propertyName: "",
      contactName: "Sunita Roy",
      phone: "+91 98765 43210",
      email: "sunita@stay.com",
      city: "Jaipur",
    };

    const parse = leadSubmissionSchema.safeParse(missingNameData);
    expect(parse.success).toBe(false);
  });
});

describe("Admin Login Credentials Schema", () => {
  it("should validate correctly formatted admin login", () => {
    const parse = adminLoginSchema.safeParse({
      email: "admin@grandeurlabs.com",
      password: "SuperSecretPassword123!",
    });
    expect(parse.success).toBe(true);
  });

  it("should reject too short passwords", () => {
    const parse = adminLoginSchema.safeParse({
      email: "admin@grandeurlabs.com",
      password: "123",
    });
    expect(parse.success).toBe(false);
  });
});
