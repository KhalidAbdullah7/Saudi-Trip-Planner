import axios from "axios";
import type {
  Region,
  Destination,
  HeroSlide,
  SavedItinerary,
  Trip,
  TripFormData,
} from "../types/api";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export async function fetchRegions(): Promise<Region[]> {
  const { data } = await api.get("/regions");
  return data;
}

export async function fetchRegion(slug: string): Promise<Region & { destinations: Destination[] }> {
  const { data } = await api.get(`/regions/${slug}`);
  return data;
}

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  const { data } = await api.get("/hero-slides");
  return data;
}

export async function fetchDestinations(params?: {
  region?: string;
  category?: string;
  tags?: string;
}): Promise<Destination[]> {
  const { data } = await api.get("/destinations", { params });
  return data;
}

export async function createTrip(formData: TripFormData): Promise<Trip> {
  const { data } = await api.post("/trips", formData);
  return data;
}

export async function fetchTrip(tripId: string): Promise<Trip> {
  const { data } = await api.get(`/trips/${tripId}`);
  return data;
}

export async function saveTrip(tripId: string, title?: string): Promise<SavedItinerary> {
  const { data } = await api.post(`/trips/${tripId}/save`, { title });
  return data;
}

export async function exportTripGoogleMaps(tripId: string): Promise<{ url: string; stopsIncluded: number; totalStops: number }> {
  const { data } = await api.get(`/trips/${tripId}/export/google-maps`);
  return data;
}

export async function updateCostItem(
  tripId: string,
  costItemId: string,
  amountSar: number
): Promise<void> {
  await api.patch(`/trips/${tripId}/costs/${costItemId}`, { amountSar });
}

export async function searchPlaces(query: string, provider = "google-places") {
  const { data } = await api.get("/places/search", {
    params: { q: query, provider },
  });
  return data;
}

export async function getPlaceDetails(placeId: string, provider = "google-places") {
  const { data } = await api.get(`/places/details/${placeId}`, {
    params: { provider },
  });
  return data;
}

