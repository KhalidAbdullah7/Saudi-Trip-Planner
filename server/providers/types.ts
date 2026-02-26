/**
 * Provider / Adaptor Interface
 *
 * Every external data source implements this interface.
 * New sources can be added by creating a new class that implements
 * PlaceProvider and registering it in the ProviderRegistry.
 */

export interface PlaceDetails {
  name: string;
  rating?: number;
  totalRatings?: number;
  priceLevel?: number;
  address?: string;
  phone?: string;
  website?: string;
  openingHours?: string[];
  photoUrls?: string[];
  reviews?: PlaceReview[];
  lat?: number;
  lng?: number;
  types?: string[];
}

export interface PlaceReview {
  author: string;
  rating: number;
  text: string;
  time: string;
  language?: string;
}

export interface PlaceSearchParams {
  query: string;
  lat?: number;
  lng?: number;
  radiusMeters?: number;
  type?: string;
  language?: string;
}

export interface LinkMetadata {
  provider: string;
  url: string;
  title?: string;
  lastVerified?: Date;
}

/**
 * Core provider interface — implement this for each data source.
 */
export interface PlaceProvider {
  readonly name: string;
  readonly type: "api" | "link-only" | "manual";

  /** Search for places (API providers only) */
  search?(params: PlaceSearchParams): Promise<PlaceDetails[]>;

  /** Get details for a specific place by provider-specific ID */
  getDetails?(placeId: string): Promise<PlaceDetails | null>;

  /** For link-only providers, construct a URL from metadata */
  buildUrl?(params: Record<string, string>): string;

  /** Health check — is the provider configured and reachable? */
  isAvailable(): Promise<boolean>;
}
