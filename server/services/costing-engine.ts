import type { AccommodationTier, TransportPref, DestinationCategory } from "@prisma/client";

// ─── Types ────────────────────────────────────────────────

export interface CostEstimate {
  totalSar: number;
  perPersonSar: number;
  items: CostLineItem[];
  assumptions: Record<string, string>;
}

export interface CostLineItem {
  category: string;
  labelEn: string;
  labelAr: string;
  amountSar: number;
  isEditable: boolean;
  notes?: string;
}

interface BreakdownInput {
  days: {
    dayNumber: number;
    regionSlug: string;
    items: { estimatedCostSar: number; category: string; titleEn: string; titleAr: string }[];
  }[];
  totalDays: number;
  partySize: number;
  accommodationTier: AccommodationTier;
  transportPref: TransportPref;
}

// ─── Rate Tables (SAR) ───────────────────────────────────
// These are realistic 2024-2025 averages for Saudi Arabia.

const HOTEL_RATES_PER_NIGHT: Record<AccommodationTier, { rate: number; label: string }> = {
  BUDGET: { rate: 250, label: "Budget hotel / hostel (~250 SAR/night)" },
  MID_RANGE: { rate: 550, label: "3-4 star hotel (~550 SAR/night)" },
  LUXURY: { rate: 1500, label: "5-star / luxury resort (~1,500 SAR/night)" },
};

const TRANSPORT_DAILY: Record<TransportPref, { rate: number; label: string }> = {
  PUBLIC: { rate: 50, label: "Public transport (metro/bus ~50 SAR/day)" },
  RENTAL_CAR: { rate: 180, label: "Rental car (~180 SAR/day incl. fuel)" },
  PRIVATE_DRIVER: { rate: 600, label: "Private driver (~600 SAR/day)" },
  MIX: { rate: 150, label: "Mixed transport (~150 SAR/day)" },
};

const ITEM_COST_ESTIMATES: Record<string, Record<number, number>> = {
  // category -> priceLevel (1-4) -> per-person SAR
  ATTRACTION: { 1: 0, 2: 75, 3: 150, 4: 300 },
  RESTAURANT: { 1: 40, 2: 80, 3: 150, 4: 350 },
  CAFE: { 1: 20, 2: 35, 3: 50, 4: 80 },
  HOTEL: { 1: 250, 2: 550, 3: 1000, 4: 1500 },
  SHOPPING: { 1: 50, 2: 150, 3: 300, 4: 800 },
  NATURE: { 1: 0, 2: 30, 3: 80, 4: 150 },
  ADVENTURE: { 1: 100, 2: 200, 3: 400, 4: 800 },
  EVENT: { 1: 50, 2: 150, 3: 350, 4: 750 },
  TRANSPORT_HUB: { 1: 0, 2: 0, 3: 0, 4: 0 },
};

const DAILY_FOOD_ALLOWANCE: Record<AccommodationTier, number> = {
  BUDGET: 80,
  MID_RANGE: 150,
  LUXURY: 350,
};

// ─── Engine ───────────────────────────────────────────────

class CostingEngine {
  estimateItemCost(category: DestinationCategory | string, priceLevel: number, partySize: number): number {
    const catRates = ITEM_COST_ESTIMATES[category] || ITEM_COST_ESTIMATES["ATTRACTION"];
    const perPerson = catRates[Math.min(Math.max(priceLevel, 1), 4)] || catRates[2];
    return perPerson * partySize;
  }

  computeFullBreakdown(input: BreakdownInput): CostEstimate {
    const items: CostLineItem[] = [];
    const assumptions: Record<string, string> = {};

    // 1. Lodging
    const hotel = HOTEL_RATES_PER_NIGHT[input.accommodationTier];
    const lodgingTotal = hotel.rate * (input.totalDays - 1); // nights = days - 1
    items.push({
      category: "LODGING",
      labelEn: `Accommodation (${input.totalDays - 1} nights)`,
      labelAr: `الإقامة (${input.totalDays - 1} ليالي)`,
      amountSar: lodgingTotal,
      isEditable: true,
      notes: hotel.label,
    });
    assumptions["lodging"] = hotel.label;

    // 2. Transport
    const transport = TRANSPORT_DAILY[input.transportPref];
    const transportTotal = transport.rate * input.totalDays;
    items.push({
      category: "TRANSPORT",
      labelEn: `Transport (${input.totalDays} days)`,
      labelAr: `النقل (${input.totalDays} أيام)`,
      amountSar: transportTotal,
      isEditable: true,
      notes: transport.label,
    });
    assumptions["transport"] = transport.label;

    // 3. Daily food allowance (beyond restaurants in itinerary)
    const foodAllowance = DAILY_FOOD_ALLOWANCE[input.accommodationTier];
    const foodTotal = foodAllowance * input.totalDays * input.partySize;
    items.push({
      category: "FOOD",
      labelEn: `Daily food allowance (${input.totalDays} days × ${input.partySize} pax)`,
      labelAr: `بدل الطعام اليومي (${input.totalDays} أيام × ${input.partySize} أشخاص)`,
      amountSar: foodTotal,
      isEditable: true,
      notes: `~${foodAllowance} SAR/person/day for meals not in itinerary`,
    });
    assumptions["food"] = `${foodAllowance} SAR/person/day base allowance`;

    // 4. Activity/attraction costs from itinerary items
    let activitiesTotal = 0;
    const activityItems: CostLineItem[] = [];
    for (const day of input.days) {
      for (const item of day.items) {
        if (item.estimatedCostSar > 0) {
          activitiesTotal += item.estimatedCostSar;
          activityItems.push({
            category: item.category === "RESTAURANT" || item.category === "CAFE" ? "FOOD" : "TICKETS",
            labelEn: `Day ${day.dayNumber}: ${item.titleEn}`,
            labelAr: `اليوم ${day.dayNumber}: ${item.titleAr}`,
            amountSar: item.estimatedCostSar,
            isEditable: true,
          });
        }
      }
    }
    items.push(...activityItems);

    // 5. Miscellaneous (10% buffer)
    const subtotal = lodgingTotal + transportTotal + foodTotal + activitiesTotal;
    const misc = Math.round(subtotal * 0.1);
    items.push({
      category: "MISC",
      labelEn: "Miscellaneous & tips (~10%)",
      labelAr: "متنوعات وإكراميات (~10%)",
      amountSar: misc,
      isEditable: true,
    });
    assumptions["misc"] = "10% buffer for tips, SIM card, souvenirs, etc.";

    const totalSar = subtotal + misc;

    return {
      totalSar,
      perPersonSar: Math.round(totalSar / input.partySize),
      items,
      assumptions,
    };
  }
}

export const costingEngine = new CostingEngine();
