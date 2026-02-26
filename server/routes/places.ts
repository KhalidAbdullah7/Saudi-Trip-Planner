import { Router } from "express";
import { providerRegistry } from "../providers/registry";

export const placesRoutes = Router();

/**
 * GET /api/places/search?q=...&lat=...&lng=...&provider=google-places
 * Searches via the specified provider (defaults to Google Places).
 */
placesRoutes.get("/search", async (req, res, next) => {
  try {
    const { q, lat, lng, radius, type, lang, provider: provName } = req.query;
    const providerName = (provName as string) || "google-places";
    const provider = providerRegistry.get(providerName);

    if (!provider) {
      return res.status(400).json({ error: `Provider "${providerName}" not registered` });
    }
    if (!provider.search) {
      return res.status(400).json({ error: `Provider "${providerName}" does not support search` });
    }
    if (!(await provider.isAvailable())) {
      return res.status(503).json({ error: `Provider "${providerName}" is not configured` });
    }

    const results = await provider.search({
      query: q as string,
      lat: lat ? Number(lat) : undefined,
      lng: lng ? Number(lng) : undefined,
      radiusMeters: radius ? Number(radius) : undefined,
      type: type as string | undefined,
      language: (lang as string) || "en",
    });

    res.json({ provider: providerName, results });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/places/details/:placeId?provider=google-places
 */
placesRoutes.get("/details/:placeId", async (req, res, next) => {
  try {
    const { provider: provName } = req.query;
    const providerName = (provName as string) || "google-places";
    const provider = providerRegistry.get(providerName);

    if (!provider?.getDetails) {
      return res.status(400).json({ error: `Provider "${providerName}" doesn't support details` });
    }

    const details = await provider.getDetails(req.params.placeId);
    if (!details) return res.status(404).json({ error: "Place not found" });

    res.json({ provider: providerName, details });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/places/providers — list registered providers and their status
 */
placesRoutes.get("/providers", async (_req, res, next) => {
  try {
    const all = providerRegistry.getAll();
    const statuses = await Promise.all(
      all.map(async (p) => ({
        name: p.name,
        type: p.type,
        available: await p.isAvailable(),
      }))
    );
    res.json(statuses);
  } catch (err) {
    next(err);
  }
});
