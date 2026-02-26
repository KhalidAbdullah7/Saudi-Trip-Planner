import NodeCache from "node-cache";

// In-memory cache with configurable TTLs
export const placesCache = new NodeCache({
  stdTTL: Number(process.env.CACHE_TTL_PLACES) || 3600,
  checkperiod: 600,
  useClones: false,
});

export const itineraryCache = new NodeCache({
  stdTTL: Number(process.env.CACHE_TTL_ITINERARY) || 1800,
  checkperiod: 300,
  useClones: false,
});
