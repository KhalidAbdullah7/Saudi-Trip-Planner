export interface Region {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  lat: number;
  lng: number;
  imageUrl: string | null;
  _count?: { destinations: number };
}

export interface HeroSlide {
  id: string;
  sortOrder: number;
  imageUrl: string;
  placeName: string;
  placeNameAr: string;
  regionSlug: string;
  attribution: string | null;
}

export interface Destination {
  id: string;
  regionId: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  category: string;
  lat: number;
  lng: number;
  imageUrl: string | null;
  avgDurationMins: number;
  priceLevel: number;
  tags: string[];
  googlePlaceId: string | null;
  tripAdvisorUrl: string | null;
  bookingUrl: string | null;
  officialUrl: string | null;
  googleMapsUrl?: string | null;
  viatorUrl?: string | null;
  getYourGuideUrl?: string | null;
  klookUrl?: string | null;
  region?: Region;
}

export interface Trip {
  id: string;
  startDate: string;
  endDate: string;
  startingCity: string;
  partySize: number;
  pace: string;
  interests: string[];
  budgetMinSar: number;
  budgetMaxSar: number;
  accommodationTier: string;
  transportPref: string;
  itineraryDays: ItineraryDay[];
  costBreakdown: CostBreakdown | null;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  date: string;
  regionSlug: string;
  items: ItineraryItem[];
}

export interface ItineraryItem {
  id: string;
  sortOrder: number;
  startTime: string | null;
  endTime: string | null;
  titleEn: string;
  titleAr: string;
  noteEn: string | null;
  noteAr: string | null;
  category: string;
  estimatedCostSar: number;
  destinationId: string | null;
  destination?: {
    id: string;
    nameEn: string;
    nameAr: string;
    lat: number;
    lng: number;
    googleMapsUrl?: string | null;
    tripAdvisorUrl?: string | null;
    officialUrl?: string | null;
    viatorUrl?: string | null;
    getYourGuideUrl?: string | null;
    klookUrl?: string | null;
  } | null;
}

export interface SavedItinerary {
  id: string;
  tripId: string;
  shareToken: string;
  title: string;
  savedAt: string;
  expiresAt: string | null;
}

export interface CostBreakdown {
  id: string;
  totalSar: number;
  perPersonSar: number;
  items: CostItem[];
  assumptions: Record<string, string> | null;
}

export interface CostItem {
  id: string;
  category: string;
  labelEn: string;
  labelAr: string;
  amountSar: number;
  isEditable: boolean;
  notes: string | null;
}

export interface TripFormData {
  startDate: string;
  endDate: string;
  startingCity: string;
  partySize: number;
  pace: "RELAXED" | "MODERATE" | "PACKED";
  interests: string[];
  budgetMinSar: number;
  budgetMaxSar: number;
  accommodationTier: "BUDGET" | "MID_RANGE" | "LUXURY";
  transportPref: "PUBLIC" | "RENTAL_CAR" | "PRIVATE_DRIVER" | "MIX";
}

