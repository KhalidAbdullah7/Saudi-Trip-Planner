import type { PlaceProvider } from "./types";

/**
 * Booking.com / hospitality link-only adapter.
 *
 * Does NOT scrape or call unofficial APIs.
 * Constructs affiliate-safe URLs for accommodation booking.
 * In production, replace with an official Booking.com Affiliate Partner API.
 */
export class BookingLinkProvider implements PlaceProvider {
  readonly name = "booking";
  readonly type = "link-only" as const;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  buildUrl(params: Record<string, string>): string {
    if (params.url) return params.url;
    const query = params.city || params.query || "Saudi Arabia";
    const checkin = params.checkin || "";
    const checkout = params.checkout || "";
    const base = "https://www.booking.com/searchresults.html";
    const qs = new URLSearchParams({ ss: query, checkin, checkout });
    const affiliateId = process.env.BOOKING_AFFILIATE_ID;
    if (affiliateId) qs.set("aid", affiliateId);
    return `${base}?${qs.toString()}`;
  }
}
