import { describe, expect, it } from "vitest";

import { buildWhatsAppUrl, normalizeSouthAfricanWhatsAppNumber } from "@/lib/booking";

describe("booking WhatsApp destination", () => {
  it("opens a prepared message for the supplied South African number", () => {
    expect(normalizeSouthAfricanWhatsAppNumber("0601910837")).toBe("27601910837");

    const target = new URL(buildWhatsAppUrl("Hello, I would like to book."));
    expect(target.origin).toBe("https://wa.me");
    expect(target.pathname).toBe("/27601910837");
    expect(target.searchParams.get("text")).toBe("Hello, I would like to book.");
  });
});