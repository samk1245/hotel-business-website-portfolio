import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword, signAdminToken, verifyAdminToken } from "../src/lib/auth";

describe("Admin Authentication & JWT Security", () => {
  it("should securely hash and verify password", async () => {
    const raw = "Admin@Grandeur2026!";
    const hash = await hashPassword(raw);

    expect(hash).not.toBe(raw);
    expect(hash.length).toBeGreaterThan(20);

    const isMatch = await verifyPassword(raw, hash);
    expect(isMatch).toBe(true);

    const isWrongMatch = await verifyPassword("WrongPassword123", hash);
    expect(isWrongMatch).toBe(false);
  });

  it("should sign and verify valid admin JWT payload", () => {
    const payload = {
      userId: "user_12345",
      email: "admin@grandeurlabs.com",
      role: "SUPERADMIN",
      name: "Studio Principal",
    };

    const token = signAdminToken(payload);
    expect(typeof token).toBe("string");

    const decoded = verifyAdminToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe(payload.userId);
    expect(decoded?.email).toBe(payload.email);
    expect(decoded?.role).toBe(payload.role);
  });

  it("should reject tampered or corrupted JWT tokens", () => {
    const badToken = "invalid.token.structure";
    const decoded = verifyAdminToken(badToken);
    expect(decoded).toBeNull();
  });
});
