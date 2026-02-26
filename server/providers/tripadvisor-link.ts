import type { PlaceProvider } from "./types";

/**
 * TripAdvisor link-only adapter.
 *
 * Does NOT scrape or call any TripAdvisor API.
 * Stores user-provided or manually curated TripAdvisor URLs
 * alongside destination metadata so users can click through
 * to read reviews on TripAdvisor directly.
 */
export class TripAdvisorLinkProvider implements PlaceProvider {
  readonly name = "tripadvisor";
  readonly type = "link-only" as const;

  async isAvailable(): Promise<boolean> {
    return true; // Link-only — always available
  }

  buildUrl(params: Record<string, string>): string {
    if (params.url) return params.url;
    if (params.locationId) {
      return `https://www.tripadvisor.com/Attraction_Review-g${params.geoId}-d${params.locationId}`;
    }
    return `https://www.tripadvisor.com/Search?q=${encodeURIComponent(params.query || "")}`;
  }
}
