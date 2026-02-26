import axios from "axios";
import { placesCache } from "../lib/cache";
import type {
  PlaceProvider,
  PlaceDetails,
  PlaceSearchParams,
  PlaceReview,
} from "./types";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";

/**
 * Google Places API provider (real implementation).
 *
 * Uses the official Places API — requires a billing-enabled GCP project
 * and the Places API (New) enabled.
 *
 * Rate limiting is handled at the Express middleware level.
 * Responses are cached in-memory to stay within quota.
 */
export class GooglePlacesProvider implements PlaceProvider {
  readonly name = "google-places";
  readonly type = "api" as const;

  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || "";
  }

  async isAvailable(): Promise<boolean> {
    return this.apiKey.length > 0;
  }

  async search(params: PlaceSearchParams): Promise<PlaceDetails[]> {
    const cacheKey = `gp:search:${JSON.stringify(params)}`;
    const cached = placesCache.get<PlaceDetails[]>(cacheKey);
    if (cached) return cached;

    const { data } = await axios.get(`${BASE_URL}/textsearch/json`, {
      params: {
        query: params.query,
        location: params.lat && params.lng ? `${params.lat},${params.lng}` : undefined,
        radius: params.radiusMeters || 5000,
        type: params.type,
        language: params.language || "en",
        key: this.apiKey,
      },
    });

    const results: PlaceDetails[] = (data.results || []).map(
      (r: Record<string, unknown>) => ({
        name: r.name as string,
        rating: r.rating as number | undefined,
        totalRatings: r.user_ratings_total as number | undefined,
        priceLevel: r.price_level as number | undefined,
        address: r.formatted_address as string | undefined,
        lat: (r.geometry as Record<string, Record<string, number>>)?.location?.lat,
        lng: (r.geometry as Record<string, Record<string, number>>)?.location?.lng,
        types: r.types as string[] | undefined,
      })
    );

    placesCache.set(cacheKey, results);
    return results;
  }

  async getDetails(placeId: string): Promise<PlaceDetails | null> {
    const cacheKey = `gp:details:${placeId}`;
    const cached = placesCache.get<PlaceDetails>(cacheKey);
    if (cached) return cached;

    const { data } = await axios.get(`${BASE_URL}/details/json`, {
      params: {
        place_id: placeId,
        fields: [
          "name",
          "rating",
          "user_ratings_total",
          "price_level",
          "formatted_address",
          "formatted_phone_number",
          "website",
          "opening_hours",
          "photos",
          "reviews",
          "geometry",
          "types",
        ].join(","),
        language: "en",
        key: this.apiKey,
      },
    });

    if (!data.result) return null;

    const r = data.result;
    const details: PlaceDetails = {
      name: r.name,
      rating: r.rating,
      totalRatings: r.user_ratings_total,
      priceLevel: r.price_level,
      address: r.formatted_address,
      phone: r.formatted_phone_number,
      website: r.website,
      openingHours: r.opening_hours?.weekday_text,
      photoUrls: (r.photos || []).slice(0, 5).map(
        (p: Record<string, unknown>) =>
          `${BASE_URL}/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${this.apiKey}`
      ),
      reviews: (r.reviews || []).map(
        (rev: Record<string, unknown>): PlaceReview => ({
          author: rev.author_name as string,
          rating: rev.rating as number,
          text: rev.text as string,
          time: new Date((rev.time as number) * 1000).toISOString(),
          language: rev.language as string | undefined,
        })
      ),
      lat: r.geometry?.location?.lat,
      lng: r.geometry?.location?.lng,
      types: r.types,
    };

    placesCache.set(cacheKey, details);
    return details;
  }
}
