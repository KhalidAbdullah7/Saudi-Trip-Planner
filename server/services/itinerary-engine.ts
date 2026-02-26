import { prisma } from "../lib/prisma";
import { costingEngine, type CostEstimate } from "./costing-engine";
import type { AccommodationTier, TripPace, TransportPref } from "@prisma/client";

export interface TripInput {
  startDate: string;
  endDate: string;
  startingCity: string;
  partySize: number;
  pace: TripPace;
  interests: string[];
  budgetMinSar: number;
  budgetMaxSar: number;
  accommodationTier: AccommodationTier;
  transportPref: TransportPref;
}

interface GeneratedDay {
  dayNumber: number;
  date: string;
  regionSlug: string;
  items: GeneratedItem[];
}

interface GeneratedItem {
  destinationId: string;
  destinationSlug: string;
  startTime: string;
  endTime: string;
  titleEn: string;
  titleAr: string;
  noteEn: string;
  noteAr: string;
  category: string;
  estimatedCostSar: number;
}

export interface GeneratedItinerary {
  days: GeneratedDay[];
  costBreakdown: CostEstimate;
}

const PACE_CONFIG: Record<TripPace, { maxItemsPerDay: number; startHour: number; endHour: number }> = {
  RELAXED: { maxItemsPerDay: 3, startHour: 10, endHour: 18 },
  MODERATE: { maxItemsPerDay: 5, startHour: 9, endHour: 20 },
  PACKED: { maxItemsPerDay: 7, startHour: 8, endHour: 22 },
};

export async function generateItinerary(input: TripInput): Promise<GeneratedItinerary> {
  const startDate = new Date(input.startDate);
  const endDate = new Date(input.endDate);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const paceConfig = PACE_CONFIG[input.pace];

  const regions = await prisma.region.findMany({ select: { slug: true, lat: true, lng: true } });
  const regionOrder = buildRegionOrder(input.startingCity, totalDays, regions);

  const allDestinations = await prisma.destination.findMany({
    where: {
      OR: [{ tags: { hasSome: input.interests } }, { category: { in: ["RESTAURANT", "CAFE", "EVENT"] } }],
    },
    include: { region: true },
  });

  const destByRegion = new Map<string, typeof allDestinations>();
  for (const d of allDestinations) {
    const list = destByRegion.get(d.region.slug) || [];
    list.push(d);
    destByRegion.set(d.region.slug, list);
  }

  const days: GeneratedDay[] = [];
  const usedSlugs = new Set<string>();

  for (let dayIdx = 0; dayIdx < totalDays; dayIdx++) {
    const regionSlug = regionOrder[dayIdx % regionOrder.length];
    const regionDests = destByRegion.get(regionSlug) || [];
    const dayDate = new Date(startDate);
    dayDate.setDate(dayDate.getDate() + dayIdx);

    const scored = regionDests
      .filter((d) => !usedSlugs.has(d.slug))
      .map((d) => ({
        dest: d,
        score:
          d.tags.reduce((s, t) => s + (input.interests.includes(t) ? 2 : 0), 0)
          + (d.priceLevel <= 2 && input.budgetMaxSar < 5000 ? 1 : 0)
          + (d.category === "EVENT" ? 1 : 0),
      }))
      .sort((a, b) => b.score - a.score);

    const dayItems: GeneratedItem[] = [];
    let currentHour = paceConfig.startHour;

    for (const { dest } of scored) {
      if (dayItems.length >= paceConfig.maxItemsPerDay) break;
      if (currentHour >= paceConfig.endHour) break;

      const durationHours = Math.max(1, Math.ceil(dest.avgDurationMins / 60));
      const endHour = currentHour + durationHours;
      const costSar = costingEngine.estimateItemCost(dest.category, dest.priceLevel, input.partySize);

      dayItems.push({
        destinationId: dest.id,
        destinationSlug: dest.slug,
        startTime: `${String(currentHour).padStart(2, "0")}:00`,
        endTime: `${String(Math.min(endHour, paceConfig.endHour)).padStart(2, "0")}:00`,
        titleEn: dest.nameEn,
        titleAr: dest.nameAr,
        noteEn: buildWhyItFits(dest.tags, input.interests),
        noteAr: buildWhyItFitsAr(dest.tags, input.interests),
        category: dest.category,
        estimatedCostSar: costSar,
      });

      usedSlugs.add(dest.slug);
      currentHour = endHour;
    }

    days.push({
      dayNumber: dayIdx + 1,
      date: dayDate.toISOString().split("T")[0],
      regionSlug,
      items: dayItems,
    });
  }

  const costBreakdown = costingEngine.computeFullBreakdown({
    days,
    totalDays,
    partySize: input.partySize,
    accommodationTier: input.accommodationTier,
    transportPref: input.transportPref,
  });

  return { days, costBreakdown };
}

function buildRegionOrder(
  startingCity: string,
  totalDays: number,
  regions: Array<{ slug: string; lat: number; lng: number }>
): string[] {
  if (regions.length === 0) return Array.from({ length: totalDays }, () => startingCity);

  const startingRegion = regions.find((r) => r.slug === startingCity) ?? regions[0];
  const sortedByDistance = [...regions].sort(
    (a, b) =>
      haversineKm(startingRegion.lat, startingRegion.lng, a.lat, a.lng)
      - haversineKm(startingRegion.lat, startingRegion.lng, b.lat, b.lng)
  );

  const maxRegions = Math.min(sortedByDistance.length, Math.max(3, Math.ceil(totalDays / 2)));
  const selected = sortedByDistance.slice(0, maxRegions);
  const daysPerRegion = Math.max(1, Math.floor(totalDays / selected.length));
  const order: string[] = [];

  for (const region of selected) {
    for (let i = 0; i < daysPerRegion; i++) {
      order.push(region.slug);
    }
  }

  while (order.length < totalDays) order.push(startingRegion.slug);
  return order.slice(0, totalDays);
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 6371 * c;
}

function buildWhyItFits(tags: string[], interests: string[]): string {
  const matched = tags.filter((t) => interests.includes(t));
  if (matched.length === 0) return "A recommended stop in this region.";
  return `Matches your interests: ${matched.join(", ")}.`;
}

function buildWhyItFitsAr(tags: string[], interests: string[]): string {
  const matched = tags.filter((t) => interests.includes(t));
  if (matched.length === 0) return "Recommended stop in this region.";
  return `Matches your interests: ${matched.join(", ")}.`;
}

