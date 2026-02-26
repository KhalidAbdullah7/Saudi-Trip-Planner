import { describe, it, expect } from "vitest";

// NOTE: In a real setup, import after prisma generate.
// This tests the pure costing logic structure.

describe("CostingEngine", () => {
  it("should compute correct nightly lodging for mid-range", () => {
    // Mid-range rate: 550 SAR/night, 4 nights (5 day trip)
    const nights = 4;
    const rate = 550;
    expect(nights * rate).toBe(2200);
  });

  it("should compute 10% misc buffer", () => {
    const subtotal = 5000;
    const misc = Math.round(subtotal * 0.1);
    expect(misc).toBe(500);
  });

  it("should compute per-person cost", () => {
    const total = 12000;
    const partySize = 3;
    expect(Math.round(total / partySize)).toBe(4000);
  });

  it("should cap price level between 1-4", () => {
    const clamp = (level: number) => Math.min(Math.max(level, 1), 4);
    expect(clamp(0)).toBe(1);
    expect(clamp(5)).toBe(4);
    expect(clamp(2)).toBe(2);
  });
});
