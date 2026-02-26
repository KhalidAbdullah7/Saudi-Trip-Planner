import { PrismaClient } from "@prisma/client";
import { REGIONS } from "./regions";
import { HERO_SLIDES } from "./hero-slides";
import { RIYADH_DESTINATIONS } from "./destinations/riyadh";
import { MAKKAH_DESTINATIONS } from "./destinations/makkah";
import { MADINAH_DESTINATIONS } from "./destinations/madinah";
import { EASTERN_PROVINCE_DESTINATIONS } from "./destinations/eastern-province";
import { ASIR_DESTINATIONS } from "./destinations/asir";
import { TABUK_DESTINATIONS } from "./destinations/tabuk";
import { HAIL_DESTINATIONS } from "./destinations/hail";
import { NORTHERN_BORDERS_DESTINATIONS } from "./destinations/northern-borders";
import { JAZAN_DESTINATIONS } from "./destinations/jazan";
import { AL_BAHA_DESTINATIONS } from "./destinations/al-baha";
import { AL_JAWF_DESTINATIONS } from "./destinations/al-jawf";
import { AL_QASSIM_DESTINATIONS } from "./destinations/al-qassim";
import { NAJRAN_DESTINATIONS } from "./destinations/najran";

const prisma = new PrismaClient();

const DESTINATION_PACKS = [
  ["riyadh", RIYADH_DESTINATIONS],
  ["makkah", MAKKAH_DESTINATIONS],
  ["madinah", MADINAH_DESTINATIONS],
  ["eastern-province", EASTERN_PROVINCE_DESTINATIONS],
  ["asir", ASIR_DESTINATIONS],
  ["tabuk", TABUK_DESTINATIONS],
  ["hail", HAIL_DESTINATIONS],
  ["northern-borders", NORTHERN_BORDERS_DESTINATIONS],
  ["jazan", JAZAN_DESTINATIONS],
  ["al-baha", AL_BAHA_DESTINATIONS],
  ["al-jawf", AL_JAWF_DESTINATIONS],
  ["al-qassim", AL_QASSIM_DESTINATIONS],
  ["najran", NAJRAN_DESTINATIONS],
] as const;

async function main() {
  console.log("Seeding Saudi Trip Planner database...");

  const regions = await Promise.all(
    REGIONS.map((region) =>
      prisma.region.upsert({
        where: { slug: region.slug },
        update: {
          nameEn: region.nameEn,
          nameAr: region.nameAr,
          descEn: region.descEn,
          descAr: region.descAr,
          lat: region.lat,
          lng: region.lng,
          imageUrl: region.imageUrl,
          heroImageUrl: region.heroImageUrl,
          heroCaption: region.heroCaption,
          imageUrls: region.imageUrls,
        },
        create: {
          slug: region.slug,
          nameEn: region.nameEn,
          nameAr: region.nameAr,
          descEn: region.descEn,
          descAr: region.descAr,
          lat: region.lat,
          lng: region.lng,
          imageUrl: region.imageUrl,
          heroImageUrl: region.heroImageUrl,
          heroCaption: region.heroCaption,
          imageUrls: region.imageUrls,
        },
      })
    )
  );

  const regionMap = Object.fromEntries(regions.map((r) => [r.slug, r.id]));

  let totalDestinations = 0;
  for (const [regionSlug, destinations] of DESTINATION_PACKS) {
    const regionId = regionMap[regionSlug];
    if (!regionId) continue;

    for (const destination of destinations) {
      await prisma.destination.upsert({
        where: { slug: destination.slug },
        update: {
          regionId,
          nameEn: destination.nameEn,
          nameAr: destination.nameAr,
          descEn: destination.descEn,
          descAr: destination.descAr,
          category: destination.category,
          lat: destination.lat,
          lng: destination.lng,
          imageUrl: destination.imageUrl,
          heroImageUrl: destination.heroImageUrl,
          imageUrls: destination.imageUrls,
          avgDurationMins: destination.avgDurationMins,
          priceLevel: destination.priceLevel,
          rating: destination.rating,
          reviewCount: destination.reviewCount,
          openingHours: destination.openingHours as never,
          tags: destination.tags,
          googlePlaceId: destination.googlePlaceId,
          tripAdvisorUrl: destination.tripAdvisorUrl,
          officialUrl: destination.officialUrl,
          googleMapsUrl: destination.googleMapsUrl,
          viatorUrl: destination.viatorUrl,
          getYourGuideUrl: destination.getYourGuideUrl,
        },
        create: {
          regionId,
          slug: destination.slug,
          nameEn: destination.nameEn,
          nameAr: destination.nameAr,
          descEn: destination.descEn,
          descAr: destination.descAr,
          category: destination.category,
          lat: destination.lat,
          lng: destination.lng,
          imageUrl: destination.imageUrl,
          heroImageUrl: destination.heroImageUrl,
          imageUrls: destination.imageUrls,
          avgDurationMins: destination.avgDurationMins,
          priceLevel: destination.priceLevel,
          rating: destination.rating,
          reviewCount: destination.reviewCount,
          openingHours: destination.openingHours as never,
          tags: destination.tags,
          googlePlaceId: destination.googlePlaceId,
          tripAdvisorUrl: destination.tripAdvisorUrl,
          officialUrl: destination.officialUrl,
          googleMapsUrl: destination.googleMapsUrl,
          viatorUrl: destination.viatorUrl,
          getYourGuideUrl: destination.getYourGuideUrl,
        },
      });
      totalDestinations += 1;
    }
  }

  await prisma.heroSlide.deleteMany();
  await prisma.heroSlide.createMany({ data: HERO_SLIDES });

  console.log(`Seeded ${regions.length} regions, ${totalDestinations} destinations, and ${HERO_SLIDES.length} hero slides.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

