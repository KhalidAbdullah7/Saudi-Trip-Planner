import type { PlaceProvider } from "./types";
import { GooglePlacesProvider } from "./google-places";
import { TripAdvisorLinkProvider } from "./tripadvisor-link";
import { BookingLinkProvider } from "./booking-link";

/**
 * Provider Registry — central place to register and access data providers.
 *
 * To add a new provider:
 * 1. Create a class implementing PlaceProvider
 * 2. Register it here in the constructor
 * 3. It's immediately available through the registry
 */
class ProviderRegistry {
  private providers = new Map<string, PlaceProvider>();

  constructor() {
    this.register(new GooglePlacesProvider());
    this.register(new TripAdvisorLinkProvider());
    this.register(new BookingLinkProvider());
  }

  register(provider: PlaceProvider) {
    this.providers.set(provider.name, provider);
  }

  get(name: string): PlaceProvider | undefined {
    return this.providers.get(name);
  }

  getAll(): PlaceProvider[] {
    return Array.from(this.providers.values());
  }

  async getAvailable(): Promise<PlaceProvider[]> {
    const checks = await Promise.all(
      this.getAll().map(async (p) => ({
        provider: p,
        available: await p.isAvailable(),
      }))
    );
    return checks.filter((c) => c.available).map((c) => c.provider);
  }
}

export const providerRegistry = new ProviderRegistry();
