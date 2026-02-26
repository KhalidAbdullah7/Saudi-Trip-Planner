import { randomUUID } from "crypto";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { generateItinerary, type TripInput } from "../services/itinerary-engine";

export const tripRoutes = Router();

const createTripSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startingCity: z.string().min(1),
  partySize: z.number().int().min(1).max(20),
  pace: z.enum(["RELAXED", "MODERATE", "PACKED"]),
  interests: z.array(z.string()).min(1),
  budgetMinSar: z.number().int().min(0),
  budgetMaxSar: z.number().int().min(1),
  accommodationTier: z.enum(["BUDGET", "MID_RANGE", "LUXURY"]),
  transportPref: z.enum(["PUBLIC", "RENTAL_CAR", "PRIVATE_DRIVER", "MIX"]),
});

tripRoutes.post("/", async (req, res, next) => {
  try {
    const parsed = createTripSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    }

    const input: TripInput = parsed.data;
    const result = await generateItinerary(input);

    const trip = await prisma.trip.create({
      data: {
        sessionId: (req.headers["x-session-id"] as string) || "anonymous",
        startDate: new Date(input.startDate),
        endDate: new Date(input.endDate),
        startingCity: input.startingCity,
        partySize: input.partySize,
        pace: input.pace,
        interests: input.interests,
        budgetMinSar: input.budgetMinSar,
        budgetMaxSar: input.budgetMaxSar,
        accommodationTier: input.accommodationTier,
        transportPref: input.transportPref,
        itineraryDays: {
          create: result.days.map((day) => ({
            dayNumber: day.dayNumber,
            date: new Date(day.date),
            regionSlug: day.regionSlug,
            items: {
              create: day.items.map((item, idx) => ({
                destination: { connect: { id: item.destinationId } },
                sortOrder: idx,
                startTime: item.startTime,
                endTime: item.endTime,
                titleEn: item.titleEn,
                titleAr: item.titleAr,
                noteEn: item.noteEn,
                noteAr: item.noteAr,
                category: item.category as never,
                estimatedCostSar: item.estimatedCostSar,
              })),
            },
          })),
        },
        costBreakdown: {
          create: {
            totalSar: result.costBreakdown.totalSar,
            perPersonSar: result.costBreakdown.perPersonSar,
            assumptions: result.costBreakdown.assumptions,
            items: {
              create: result.costBreakdown.items.map((ci) => ({
                category: ci.category as never,
                labelEn: ci.labelEn,
                labelAr: ci.labelAr,
                amountSar: ci.amountSar,
                isEditable: ci.isEditable,
                notes: ci.notes,
              })),
            },
          },
        },
      },
      include: {
        itineraryDays: {
          include: {
            items: {
              include: {
                destination: {
                  select: {
                    id: true,
                    nameEn: true,
                    nameAr: true,
                    lat: true,
                    lng: true,
                    googleMapsUrl: true,
                    tripAdvisorUrl: true,
                    officialUrl: true,
                    viatorUrl: true,
                    getYourGuideUrl: true,
                    klookUrl: true,
                  },
                },
              },
            },
          },
        },
        costBreakdown: { include: { items: true } },
      },
    });

    res.status(201).json(trip);
  } catch (err) {
    next(err);
  }
});

tripRoutes.get("/:id", async (req, res, next) => {
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: req.params.id },
      include: {
        itineraryDays: {
          include: {
            items: {
              include: {
                destination: {
                  select: {
                    id: true,
                    nameEn: true,
                    nameAr: true,
                    lat: true,
                    lng: true,
                    googleMapsUrl: true,
                    tripAdvisorUrl: true,
                    officialUrl: true,
                    viatorUrl: true,
                    getYourGuideUrl: true,
                    klookUrl: true,
                  },
                },
              },
              orderBy: { sortOrder: "asc" },
            },
          },
          orderBy: { dayNumber: "asc" },
        },
        costBreakdown: { include: { items: true } },
        savedItineraries: { orderBy: { savedAt: "desc" }, take: 5 },
      },
    });
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.json(trip);
  } catch (err) {
    next(err);
  }
});

tripRoutes.patch("/:id/costs/:costItemId", async (req, res, next) => {
  try {
    const { amountSar } = z.object({ amountSar: z.number().int().min(0) }).parse(req.body);
    const updated = await prisma.costItem.update({
      where: { id: req.params.costItemId },
      data: { amountSar },
    });

    const breakdown = await prisma.costBreakdown.findUnique({
      where: { id: updated.breakdownId },
      include: { items: true, trip: true },
    });

    if (breakdown) {
      const newTotal = breakdown.items.reduce((s, i) => s + i.amountSar, 0);
      await prisma.costBreakdown.update({
        where: { id: breakdown.id },
        data: {
          totalSar: newTotal,
          perPersonSar: Math.round(newTotal / breakdown.trip.partySize),
        },
      });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

tripRoutes.post("/:id/save", async (req, res, next) => {
  try {
    const { title } = z.object({ title: z.string().min(1).max(120).optional() }).parse(req.body ?? {});

    const trip = await prisma.trip.findUnique({ where: { id: req.params.id } });
    if (!trip) return res.status(404).json({ error: "Trip not found" });

    const saved = await prisma.savedItinerary.create({
      data: {
        tripId: trip.id,
        title: title || `Saudi itinerary (${trip.startDate.toISOString().slice(0, 10)})`,
        shareToken: randomUUID().replace(/-/g, "").slice(0, 16),
      },
    });

    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

tripRoutes.get("/saved/:token", async (req, res, next) => {
  try {
    const saved = await prisma.savedItinerary.findUnique({
      where: { shareToken: req.params.token },
      include: {
        trip: {
          include: {
            itineraryDays: {
              include: { items: { include: { destination: true }, orderBy: { sortOrder: "asc" } } },
              orderBy: { dayNumber: "asc" },
            },
            costBreakdown: { include: { items: true } },
          },
        },
      },
    });

    if (!saved) return res.status(404).json({ error: "Saved itinerary not found" });
    res.json(saved);
  } catch (err) {
    next(err);
  }
});

tripRoutes.get("/:id/export/google-maps", async (req, res, next) => {
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: req.params.id },
      include: {
        itineraryDays: {
          include: { items: { include: { destination: true }, orderBy: { sortOrder: "asc" } } },
          orderBy: { dayNumber: "asc" },
        },
      },
    });
    if (!trip) return res.status(404).json({ error: "Trip not found" });

    const points = trip.itineraryDays
      .flatMap((d) => d.items)
      .map((item) => item.destination)
      .filter((d): d is NonNullable<typeof d> => Boolean(d))
      .map((d) => `${d.lat},${d.lng}`);

    const unique = Array.from(new Set(points));
    if (unique.length < 2) {
      return res.status(400).json({ error: "Not enough mapped itinerary points to export." });
    }

    const origin = unique[0];
    const destination = unique[unique.length - 1];
    const maxWaypoints = 8;
    const waypoints = unique.slice(1, -1).slice(0, maxWaypoints).join("|");

    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}${waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : ""}&travelmode=driving`;

    res.json({ url, stopsIncluded: Math.min(unique.length, maxWaypoints + 2), totalStops: unique.length });
  } catch (err) {
    next(err);
  }
});

