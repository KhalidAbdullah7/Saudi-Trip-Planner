-- CreateEnum
CREATE TYPE "DestinationCategory" AS ENUM ('ATTRACTION', 'RESTAURANT', 'CAFE', 'HOTEL', 'SHOPPING', 'NATURE', 'ADVENTURE', 'EVENT', 'TRANSPORT_HUB');

-- CreateEnum
CREATE TYPE "TripPace" AS ENUM ('RELAXED', 'MODERATE', 'PACKED');

-- CreateEnum
CREATE TYPE "AccommodationTier" AS ENUM ('BUDGET', 'MID_RANGE', 'LUXURY');

-- CreateEnum
CREATE TYPE "TransportPref" AS ENUM ('PUBLIC', 'RENTAL_CAR', 'PRIVATE_DRIVER', 'MIX');

-- CreateEnum
CREATE TYPE "CostCategory" AS ENUM ('LODGING', 'TRANSPORT', 'FOOD', 'COFFEE', 'TICKETS', 'EXPERIENCES', 'SHOPPING', 'MISC');

-- CreateTable
CREATE TABLE "regions" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ar" TEXT NOT NULL,
    "desc_en" TEXT NOT NULL,
    "desc_ar" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinations" (
    "id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ar" TEXT NOT NULL,
    "desc_en" TEXT NOT NULL,
    "desc_ar" TEXT NOT NULL,
    "category" "DestinationCategory" NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "image_url" TEXT,
    "avg_duration_mins" INTEGER NOT NULL DEFAULT 120,
    "price_level" INTEGER NOT NULL DEFAULT 2,
    "tags" TEXT[],
    "google_place_id" TEXT,
    "tripadvisor_url" TEXT,
    "booking_url" TEXT,
    "official_url" TEXT,
    "provider_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trips" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "starting_city" TEXT NOT NULL,
    "party_size" INTEGER NOT NULL DEFAULT 1,
    "pace" "TripPace" NOT NULL DEFAULT 'MODERATE',
    "interests" TEXT[],
    "budget_min_sar" INTEGER NOT NULL,
    "budget_max_sar" INTEGER NOT NULL,
    "accommodation_tier" "AccommodationTier" NOT NULL DEFAULT 'MID_RANGE',
    "transport_pref" "TransportPref" NOT NULL DEFAULT 'MIX',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_days" (
    "id" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,
    "day_number" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "region_slug" TEXT NOT NULL,

    CONSTRAINT "itinerary_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_items" (
    "id" TEXT NOT NULL,
    "day_id" TEXT NOT NULL,
    "destination_id" TEXT,
    "sort_order" INTEGER NOT NULL,
    "start_time" TEXT,
    "end_time" TEXT,
    "title_en" TEXT NOT NULL,
    "title_ar" TEXT NOT NULL,
    "note_en" TEXT,
    "note_ar" TEXT,
    "category" "DestinationCategory" NOT NULL,
    "estimated_cost_sar" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "itinerary_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_breakdowns" (
    "id" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,
    "total_sar" INTEGER NOT NULL,
    "per_person_sar" INTEGER NOT NULL,
    "assumptions" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cost_breakdowns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_items" (
    "id" TEXT NOT NULL,
    "breakdown_id" TEXT NOT NULL,
    "destination_id" TEXT,
    "category" "CostCategory" NOT NULL,
    "label_en" TEXT NOT NULL,
    "label_ar" TEXT NOT NULL,
    "amount_sar" INTEGER NOT NULL,
    "is_editable" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,

    CONSTRAINT "cost_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "regions_slug_key" ON "regions"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "destinations_slug_key" ON "destinations"("slug");

-- CreateIndex
CREATE INDEX "destinations_region_id_idx" ON "destinations"("region_id");

-- CreateIndex
CREATE INDEX "destinations_category_idx" ON "destinations"("category");

-- CreateIndex
CREATE INDEX "trips_session_id_idx" ON "trips"("session_id");

-- CreateIndex
CREATE UNIQUE INDEX "itinerary_days_trip_id_day_number_key" ON "itinerary_days"("trip_id", "day_number");

-- CreateIndex
CREATE UNIQUE INDEX "cost_breakdowns_trip_id_key" ON "cost_breakdowns"("trip_id");

-- AddForeignKey
ALTER TABLE "destinations" ADD CONSTRAINT "destinations_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_days" ADD CONSTRAINT "itinerary_days_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_items" ADD CONSTRAINT "itinerary_items_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "itinerary_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_items" ADD CONSTRAINT "itinerary_items_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_breakdowns" ADD CONSTRAINT "cost_breakdowns_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_items" ADD CONSTRAINT "cost_items_breakdown_id_fkey" FOREIGN KEY ("breakdown_id") REFERENCES "cost_breakdowns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_items" ADD CONSTRAINT "cost_items_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
