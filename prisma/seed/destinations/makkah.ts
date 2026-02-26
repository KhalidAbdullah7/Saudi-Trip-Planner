export const MAKKAH_DESTINATIONS = [
  // ─── 1. Al-Balad Historic District (UNESCO) - Jeddah ──────────
  {
    slug: "al-balad-historic-district",
    nameEn: "Al-Balad Historic District",
    nameAr: "حي البلد التاريخي",
    descEn:
      "UNESCO World Heritage site featuring centuries-old coral-stone merchant houses with intricately carved wooden rawasheen (balconies), narrow alleyways, and bustling traditional souks.",
    descAr:
      "موقع تراث عالمي لليونسكو يضم بيوت التجار المبنية من الحجر المرجاني منذ قرون بروشانها الخشبية المنحوتة بدقة وأزقتها الضيقة وأسواقها التقليدية النابضة بالحياة.",
    category: "ATTRACTION" as const,
    lat: 21.4848,
    lng: 39.1862,
    avgDurationMins: 180,
    priceLevel: 1,
    rating: 4.5,
    reviewCount: 12840,
    tags: ["culture", "history", "unesco", "photo-spot", "shopping", "architecture"],
    imageUrl:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800",
      "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800",
    ],
    openingHours: {
      mon: "00:00-23:59",
      tue: "00:00-23:59",
      wed: "00:00-23:59",
      thu: "00:00-23:59",
      fri: "00:00-23:59",
      sat: "00:00-23:59",
      sun: "00:00-23:59",
    },
    googlePlaceId: "ChIJH0FqmNPvwxURr0qiRkm4VFk",
    officialUrl: "https://www.jeddahhistoric.sa/",
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.4848,39.1862",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // ─── 2. Jeddah Corniche & Waterfront ──────────────────────────
  {
    slug: "jeddah-corniche-waterfront",
    nameEn: "Jeddah Corniche & Waterfront",
    nameAr: "كورنيش جدة والواجهة البحرية",
    descEn:
      "A 30-kilometer seaside promenade stretching along the Red Sea coast, featuring open-air sculptures, manicured parks, children's play areas, and spectacular sunset views.",
    descAr:
      "ممشى ساحلي بطول 30 كيلومتراً يمتد على طول ساحل البحر الأحمر، يضم منحوتات في الهواء الطلق وحدائق منسقة ومناطق لعب للأطفال وإطلالات غروب خلابة.",
    category: "ATTRACTION" as const,
    lat: 21.5227,
    lng: 39.1460,
    avgDurationMins: 120,
    priceLevel: 1,
    rating: 4.4,
    reviewCount: 18320,
    tags: ["nature", "city", "sunset", "free", "family", "walking"],
    imageUrl:
      "https://images.unsplash.com/photo-1586183189684-9e0c7e2b44e3?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1586183189684-9e0c7e2b44e3?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1586183189684-9e0c7e2b44e3?w=800",
      "https://images.unsplash.com/photo-1537954916-0e4a8e4e1f2c?w=800",
    ],
    openingHours: null,
    googlePlaceId: "ChIJhwo8T9HvwxURTw4kQVEAXhQ",
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.5227,39.1460",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // ─── 3. Floating Mosque (Al Rahma Mosque) - Jeddah ───────────
  {
    slug: "floating-mosque-al-rahma",
    nameEn: "Floating Mosque (Al Rahma Mosque)",
    nameAr: "مسجد الرحمة العائم",
    descEn:
      "An iconic mosque built on stilts over the Red Sea, appearing to float on water during high tide. A stunning architectural landmark and one of Jeddah's most photographed sites.",
    descAr:
      "مسجد شهير مبني على أعمدة فوق البحر الأحمر، يبدو وكأنه يطفو على الماء أثناء المد العالي. معلم معماري مذهل ومن أكثر المواقع تصويراً في جدة.",
    category: "ATTRACTION" as const,
    lat: 21.5108,
    lng: 39.1467,
    avgDurationMins: 45,
    priceLevel: 1,
    rating: 4.6,
    reviewCount: 9750,
    tags: ["culture", "religion", "photo-spot", "architecture", "free"],
    imageUrl:
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?w=800",
    ],
    openingHours: {
      mon: "05:00-22:00",
      tue: "05:00-22:00",
      wed: "05:00-22:00",
      thu: "05:00-22:00",
      fri: "05:00-22:00",
      sat: "05:00-22:00",
      sun: "05:00-22:00",
    },
    googlePlaceId: "ChIJy3bEddfvwxURXw_7Fc_WkdM",
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.5108,39.1467",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // ─── 4. King Fahad Fountain - Jeddah ─────────────────────────
  {
    slug: "king-fahad-fountain",
    nameEn: "King Fahad Fountain",
    nameAr: "نافورة الملك فهد",
    descEn:
      "The world's tallest fountain, launching Red Sea water over 300 meters into the sky. Best viewed after sunset when illuminated by 500 spotlights.",
    descAr:
      "أطول نافورة في العالم، تطلق مياه البحر الأحمر لأكثر من 300 متر في السماء. أفضل مشاهدة لها بعد الغروب عندما تُضاء بـ 500 كشاف.",
    category: "ATTRACTION" as const,
    lat: 21.4969,
    lng: 39.1524,
    avgDurationMins: 30,
    priceLevel: 1,
    rating: 4.5,
    reviewCount: 14200,
    tags: ["landmark", "photo-spot", "free", "night-life", "family"],
    imageUrl:
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800",
    ],
    openingHours: null,
    googlePlaceId: "ChIJ4UX9XdTvwxURGQVMX6MFPQE",
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.4969,39.1524",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // ─── 5. Taif Rose Farm Visit ──────────────────────────────────
  {
    slug: "taif-rose-farm",
    nameEn: "Taif Rose Farm Visit",
    nameAr: "زيارة مزرعة ورد الطائف",
    descEn:
      "Experience the famous Taif rose harvest season (March-April), tour fragrant rose fields, watch traditional rose water distillation, and purchase premium rose oil and rose water.",
    descAr:
      "تجربة موسم حصاد ورد الطائف الشهير (مارس-أبريل)، جولة في حقول الورد العطرة، ومشاهدة تقطير ماء الورد التقليدي، وشراء زيت الورد وماء الورد الفاخر.",
    category: "ATTRACTION" as const,
    lat: 21.2658,
    lng: 40.4089,
    avgDurationMins: 120,
    priceLevel: 1,
    rating: 4.3,
    reviewCount: 3420,
    tags: ["nature", "culture", "shopping", "seasonal", "photo-spot"],
    imageUrl:
      "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800",
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800",
    ],
    openingHours: {
      mon: "07:00-18:00",
      tue: "07:00-18:00",
      wed: "07:00-18:00",
      thu: "07:00-18:00",
      fri: "14:00-18:00",
      sat: "07:00-18:00",
      sun: "07:00-18:00",
    },
    googlePlaceId: null,
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.2658,40.4089",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // ─── 6. Al Shafa Mountain Village - Taif ──────────────────────
  {
    slug: "al-shafa-mountain-village",
    nameEn: "Al Shafa Mountain Village",
    nameAr: "قرية الشفا الجبلية",
    descEn:
      "A cool mountain retreat perched at 2,200 meters above sea level, featuring terraced fruit farms, fragrant rose gardens, panoramic valley views, and a refreshing escape from the heat.",
    descAr:
      "ملاذ جبلي بارد يقع على ارتفاع 2,200 متر فوق سطح البحر، يضم مزارع فواكه مدرجة وحدائق ورد عطرة وإطلالات بانورامية على الوديان وهروب منعش من الحرارة.",
    category: "NATURE" as const,
    lat: 21.0858,
    lng: 40.3168,
    avgDurationMins: 180,
    priceLevel: 1,
    rating: 4.4,
    reviewCount: 5180,
    tags: ["nature", "photo-spot", "cool-climate", "hiking", "family"],
    imageUrl:
      "https://images.unsplash.com/photo-1609796484515-4c7c5e5e0e8e?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1609796484515-4c7c5e5e0e8e?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1609796484515-4c7c5e5e0e8e?w=800",
    ],
    openingHours: null,
    googlePlaceId: null,
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.0858,40.3168",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // ─── 7. Atallah Happy Land Park - Jeddah ─────────────────────
  {
    slug: "atallah-happy-land-park",
    nameEn: "Atallah Happy Land Park",
    nameAr: "حديقة أتالله هابي لاند",
    descEn:
      "Jeddah's largest family amusement park with roller coasters, bumper cars, arcade games, carnival rides, and live entertainment shows spread across a massive outdoor complex.",
    descAr:
      "أكبر مدينة ملاهي عائلية في جدة تضم أفعوانيات وسيارات تصادم وألعاب أركيد وألعاب كرنفالية وعروض ترفيهية حية في مجمع خارجي ضخم.",
    category: "ATTRACTION" as const,
    lat: 21.5439,
    lng: 39.1747,
    avgDurationMins: 180,
    priceLevel: 2,
    rating: 3.9,
    reviewCount: 8630,
    tags: ["family", "entertainment", "kids", "rides"],
    imageUrl:
      "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800",
    ],
    openingHours: {
      mon: "16:00-00:00",
      tue: "16:00-00:00",
      wed: "16:00-00:00",
      thu: "16:00-01:00",
      fri: "16:00-01:00",
      sat: "16:00-01:00",
      sun: "16:00-00:00",
    },
    googlePlaceId: "ChIJO3DVrNzvwxURwKgvC7yGfkc",
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.5439,39.1747",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // ─── 8. Red Sea Mall - Jeddah ────────────────────────────────
  {
    slug: "red-sea-mall",
    nameEn: "Red Sea Mall",
    nameAr: "رد سي مول",
    descEn:
      "One of Jeddah's premier shopping destinations with over 480 stores, an indoor amusement park, ice rink, cinema complex, and a diverse food court featuring international and local cuisines.",
    descAr:
      "أحد أبرز وجهات التسوق في جدة مع أكثر من 480 متجراً ومدينة ملاهي داخلية وحلبة تزلج على الجليد ومجمع سينمائي وساحة طعام متنوعة بمأكولات عالمية ومحلية.",
    category: "SHOPPING" as const,
    lat: 21.6231,
    lng: 39.1172,
    avgDurationMins: 180,
    priceLevel: 3,
    rating: 4.3,
    reviewCount: 22100,
    tags: ["shopping", "entertainment", "family", "food", "indoor"],
    imageUrl:
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800",
    ],
    openingHours: {
      mon: "10:00-00:00",
      tue: "10:00-00:00",
      wed: "10:00-00:00",
      thu: "10:00-01:00",
      fri: "14:00-01:00",
      sat: "10:00-01:00",
      sun: "10:00-00:00",
    },
    googlePlaceId: "ChIJPUuBF4QJwxURNGMt8dF9x7c",
    officialUrl: "https://www.redseamall.com/",
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.6231,39.1172",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // ─── 9. Baeshen Heritage Cafe - Jeddah ────────────────────────
  {
    slug: "baeshen-heritage-cafe",
    nameEn: "Baeshen Heritage Cafe",
    nameAr: "مقهى بيشان التراثي",
    descEn:
      "A traditional Saudi coffee house nestled in Al-Balad's heritage quarter, serving authentic Arabic qahwa, refreshing Saudi chai, and local pastries in a restored coral-stone building.",
    descAr:
      "مقهى سعودي تقليدي يقع في حي البلد التراثي، يقدم القهوة العربية الأصيلة والشاي السعودي المنعش والمعجنات المحلية في مبنى مرمم من الحجر المرجاني.",
    category: "CAFE" as const,
    lat: 21.4856,
    lng: 39.1873,
    avgDurationMins: 60,
    priceLevel: 1,
    rating: 4.2,
    reviewCount: 2840,
    tags: ["coffee", "culture", "traditional", "heritage", "al-balad"],
    imageUrl:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=800",
    ],
    openingHours: {
      mon: "07:00-23:00",
      tue: "07:00-23:00",
      wed: "07:00-23:00",
      thu: "07:00-00:00",
      fri: "14:00-00:00",
      sat: "07:00-00:00",
      sun: "07:00-23:00",
    },
    googlePlaceId: null,
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.4856,39.1873",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // ─── 10. Al Nakheel Beach - Jeddah ────────────────────────────
  {
    slug: "al-nakheel-beach",
    nameEn: "Al Nakheel Beach",
    nameAr: "شاطئ النخيل",
    descEn:
      "A popular public beach along Jeddah's coast offering crystal-clear Red Sea waters, soft sandy shores, family-friendly facilities, and beautiful sunset views over the water.",
    descAr:
      "شاطئ عام شهير على ساحل جدة يوفر مياه البحر الأحمر الصافية وشواطئ رملية ناعمة ومرافق مناسبة للعائلات وإطلالات غروب جميلة فوق الماء.",
    category: "NATURE" as const,
    lat: 21.5783,
    lng: 39.1029,
    avgDurationMins: 180,
    priceLevel: 1,
    rating: 4.0,
    reviewCount: 6420,
    tags: ["beach", "nature", "family", "swimming", "sunset", "free"],
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    ],
    openingHours: null,
    googlePlaceId: null,
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.5783,39.1029",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // ─── 11. Taif Cable Car (Al Hada) ────────────────────────────
  {
    slug: "taif-cable-car-al-hada",
    nameEn: "Taif Cable Car (Al Hada)",
    nameAr: "تلفريك الطائف (الهدا)",
    descEn:
      "A scenic cable car ride ascending the Al Hada escarpment near Taif, offering breathtaking panoramic views of the Hejaz Mountains, terraced farms, and winding mountain roads below.",
    descAr:
      "رحلة تلفريك ذات مناظر خلابة تصعد جرف الهدا قرب الطائف، توفر إطلالات بانورامية مذهلة على جبال الحجاز والمزارع المدرجة والطرق الجبلية المتعرجة أدناه.",
    category: "ADVENTURE" as const,
    lat: 21.3553,
    lng: 40.2858,
    avgDurationMins: 90,
    priceLevel: 2,
    rating: 4.2,
    reviewCount: 4870,
    tags: ["adventure", "views", "photo-spot", "family", "mountains"],
    imageUrl:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    ],
    openingHours: {
      mon: "09:00-21:00",
      tue: "09:00-21:00",
      wed: "09:00-21:00",
      thu: "09:00-23:00",
      fri: "14:00-23:00",
      sat: "09:00-23:00",
      sun: "09:00-21:00",
    },
    googlePlaceId: null,
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.3553,40.2858",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // ─── 12. Fakieh Aquarium - Jeddah ────────────────────────────
  {
    slug: "fakieh-aquarium",
    nameEn: "Fakieh Aquarium",
    nameAr: "أكواريوم فقيه",
    descEn:
      "Jeddah's premier marine attraction featuring Red Sea coral reef exhibits, dolphin and sea lion shows, touch pools, and an underwater tunnel showcasing over 200 species of marine life.",
    descAr:
      "أبرز معلم بحري في جدة يضم معارض الشعاب المرجانية للبحر الأحمر وعروض الدلافين وأسود البحر وأحواض اللمس ونفق تحت الماء يعرض أكثر من 200 نوع من الحياة البحرية.",
    category: "ATTRACTION" as const,
    lat: 21.6102,
    lng: 39.1045,
    avgDurationMins: 120,
    priceLevel: 2,
    rating: 4.1,
    reviewCount: 11500,
    tags: ["family", "kids", "marine", "entertainment", "indoor"],
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    ],
    openingHours: {
      mon: "10:00-22:00",
      tue: "10:00-22:00",
      wed: "10:00-22:00",
      thu: "10:00-23:00",
      fri: "14:00-23:00",
      sat: "10:00-23:00",
      sun: "10:00-22:00",
    },
    googlePlaceId: "ChIJCz-eBYQJwxUR5uWv3sXfVZg",
    officialUrl: "https://www.fakiehaquarium.com/",
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.6102,39.1045",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // ─── 13. Bab Makkah Gate - Jeddah ────────────────────────────
  {
    slug: "bab-makkah-gate",
    nameEn: "Bab Makkah Gate",
    nameAr: "باب مكة",
    descEn:
      "A historic gateway that once marked the eastern entrance to old Jeddah, through which pilgrims passed on their way to Makkah. Now a restored landmark surrounded by traditional market stalls.",
    descAr:
      "بوابة تاريخية كانت تشكل المدخل الشرقي لجدة القديمة، والتي كان يمر عبرها الحجاج في طريقهم إلى مكة المكرمة. الآن معلم مرمم تحيط به أكشاك السوق التقليدية.",
    category: "ATTRACTION" as const,
    lat: 21.4873,
    lng: 39.1912,
    avgDurationMins: 30,
    priceLevel: 1,
    rating: 4.1,
    reviewCount: 4250,
    tags: ["history", "culture", "landmark", "photo-spot", "free"],
    imageUrl:
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800",
    ],
    openingHours: null,
    googlePlaceId: "ChIJi4mZHtPvwxURw3DPaP2Qfkk",
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.4873,39.1912",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // ─── 14. Jeddah Tower (under construction viewing area) ───────
  {
    slug: "jeddah-tower-viewing-area",
    nameEn: "Jeddah Tower (Under Construction Viewing Area)",
    nameAr: "برج جدة (منطقة المشاهدة - قيد الإنشاء)",
    descEn:
      "The future world's tallest building at over 1,000 meters. While still under construction, a designated viewing area allows visitors to witness this record-breaking mega-project taking shape along the Jeddah coastline.",
    descAr:
      "أطول مبنى في العالم مستقبلاً بارتفاع يتجاوز 1,000 متر. رغم أنه لا يزال قيد الإنشاء، تتيح منطقة مشاهدة مخصصة للزوار مشاهدة هذا المشروع العملاق القياسي وهو يتشكل على ساحل جدة.",
    category: "ATTRACTION" as const,
    lat: 21.7258,
    lng: 39.0650,
    avgDurationMins: 30,
    priceLevel: 1,
    rating: 4.0,
    reviewCount: 2150,
    tags: ["landmark", "architecture", "photo-spot", "mega-project"],
    imageUrl:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
    ],
    openingHours: null,
    googlePlaceId: null,
    officialUrl: "https://www.jeddahtower.com/",
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.7258,39.0650",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // ─── 15. Al Tayebat International City Museum - Jeddah ────────
  {
    slug: "al-tayebat-international-city-museum",
    nameEn: "Al Tayebat International City Museum",
    nameAr: "متحف مدينة الطيبات العالمية",
    descEn:
      "A sprawling private museum housed in a stunning Hejazi-style building with 300 rooms showcasing pre-Islamic artifacts, Islamic manuscripts, traditional costumes, and the cultural heritage of Saudi Arabia and the wider Muslim world.",
    descAr:
      "متحف خاص واسع يقع في مبنى مذهل بالطراز الحجازي يضم 300 غرفة تعرض قطعاً أثرية من عصر ما قبل الإسلام ومخطوطات إسلامية وأزياء تقليدية والتراث الثقافي للمملكة العربية السعودية والعالم الإسلامي.",
    category: "ATTRACTION" as const,
    lat: 21.4958,
    lng: 39.1753,
    avgDurationMins: 150,
    priceLevel: 2,
    rating: 4.4,
    reviewCount: 6870,
    tags: ["culture", "history", "museum", "art", "architecture", "heritage"],
    imageUrl:
      "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800",
    heroImageUrl:
      "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800",
    ],
    openingHours: {
      mon: "08:00-12:00",
      tue: "08:00-12:00",
      wed: "08:00-12:00",
      thu: "08:00-12:00",
      fri: "closed",
      sat: "08:00-12:00",
      sun: "08:00-12:00",
    },
    googlePlaceId: "ChIJfWn4ntfvwxURokZ3FPpqmIc",
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.4958,39.1753",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // 16. Jeddah Waterfront (New Corniche)
  {
    slug: "jeddah-new-corniche",
    nameEn: "Jeddah New Corniche & Fountain",
    nameAr: "كورنيش جدة الجديد ونافورة الملك فهد",
    descEn:
      "A stunning 30 km waterfront development featuring the King Fahd Fountain — the world's tallest water jet at 312m. Includes cycling paths, art sculptures, fine dining, and waterfront cafés.",
    descAr:
      "تطوير واجهة بحرية مذهلة بطول 30 كم تضم نافورة الملك فهد — أعلى نافورة مائية في العالم بارتفاع 312 م. يشمل مسارات دراجات ومنحوتات فنية ومطاعم فاخرة ومقاهٍ على الواجهة.",
    category: "ATTRACTION" as const,
    lat: 21.5330,
    lng: 39.1540,
    avgDurationMins: 150,
    priceLevel: 1,
    rating: 4.5,
    reviewCount: 22000,
    tags: ["waterfront", "fountain", "walking", "dining", "sunset", "cycling"],
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    heroImageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920",
    imageUrls: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"],
    openingHours: null,
    googlePlaceId: null,
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.5330,39.1540",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // 17. Jeddah Season Festival
  {
    slug: "jeddah-season-festival",
    nameEn: "Jeddah Season Festival",
    nameAr: "موسم جدة",
    descEn:
      "Saudi Arabia's premier summer entertainment festival featuring international concerts, sporting events, food festivals, carnival rides, and cultural exhibitions across multiple venues in Jeddah.",
    descAr:
      "أبرز مهرجان ترفيهي صيفي في السعودية يضم حفلات موسيقية عالمية وفعاليات رياضية ومهرجانات طعام وألعاب كرنفال ومعارض ثقافية عبر أماكن متعددة في جدة.",
    category: "EVENT" as const,
    lat: 21.5400,
    lng: 39.1800,
    avgDurationMins: 300,
    priceLevel: 2,
    rating: 4.6,
    reviewCount: 15000,
    tags: ["events", "entertainment", "music", "food", "family", "festival"],
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    heroImageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920",
    imageUrls: ["https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800"],
    openingHours: null,
    googlePlaceId: null,
    officialUrl: "https://jeddahseason.sa/",
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.5400,39.1800",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // 18. Taif Rose Farms
  {
    slug: "taif-rose-farms",
    nameEn: "Taif Rose Farms & Distillery",
    nameAr: "مزارع ورد الطائف ومعمل التقطير",
    descEn:
      "The City of Roses — visit Taif's famous Damask rose farms during harvest season (Mar-Apr), watch traditional rose water distillation, and buy premium rose oil and rose-infused products.",
    descAr:
      "مدينة الورد — زر مزارع الورد الدمشقي الشهيرة في الطائف خلال موسم الحصاد (مارس-أبريل) وشاهد تقطير ماء الورد التقليدي واشترِ زيت الورد الفاخر والمنتجات المعطرة بالورد.",
    category: "NATURE" as const,
    lat: 21.2700,
    lng: 40.4200,
    avgDurationMins: 120,
    priceLevel: 2,
    rating: 4.7,
    reviewCount: 6500,
    tags: ["nature", "roses", "seasonal", "shopping", "culture", "farm"],
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800",
    heroImageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1920",
    imageUrls: ["https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800"],
    openingHours: null,
    googlePlaceId: null,
    officialUrl: null,
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g297937-d12270037-Reviews-Taif_Rose-Taif_Makkah_Province.html",
    googleMapsUrl: "https://maps.google.com/?q=21.2700,40.4200",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // 19. Taif Cable Car
  {
    slug: "taif-cable-car-al-hada",
    nameEn: "Taif Al Hada Cable Car",
    nameAr: "تلفريك الطائف الهدا",
    descEn:
      "Scenic cable car ride connecting Al Hada mountain to the valley below, passing over terraced farms, ancient villages, and lush greenery. Spectacular views of the Sarawat escarpment.",
    descAr:
      "رحلة تلفريك خلابة تربط جبل الهدا بالوادي أدناه مرورًا فوق مزارع مدرجة وقرى قديمة وخضرة وارفة. إطلالات مذهلة على جرف السروات.",
    category: "ADVENTURE" as const,
    lat: 21.3550,
    lng: 40.3300,
    avgDurationMins: 60,
    priceLevel: 2,
    rating: 4.3,
    reviewCount: 4800,
    tags: ["adventure", "cable-car", "views", "mountains", "family"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    heroImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920",
    imageUrls: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"],
    openingHours: {
      mon: "10:00-18:00",
      tue: "10:00-18:00",
      wed: "10:00-18:00",
      thu: "10:00-20:00",
      fri: "14:00-20:00",
      sat: "10:00-20:00",
      sun: "10:00-18:00",
    },
    googlePlaceId: null,
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.3550,40.3300",
    viatorUrl: null,
    getYourGuideUrl: null,
  },

  // 20. Red Sea Mall
  {
    slug: "red-sea-mall-jeddah",
    nameEn: "Red Sea Mall",
    nameAr: "رد سي مول",
    descEn:
      "One of Saudi Arabia's largest shopping centers with 480 stores, an indoor ice rink, cinema, family entertainment zone, and international dining options.",
    descAr:
      "أحد أكبر مراكز التسوق في السعودية مع 480 متجرًا وحلبة تزلج داخلية وسينما ومنطقة ترفيه عائلي وخيارات طعام عالمية.",
    category: "SHOPPING" as const,
    lat: 21.6300,
    lng: 39.1150,
    avgDurationMins: 180,
    priceLevel: 2,
    rating: 4.3,
    reviewCount: 28000,
    tags: ["shopping", "entertainment", "dining", "family", "ice-rink"],
    imageUrl: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800",
    heroImageUrl: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1920",
    imageUrls: ["https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800"],
    openingHours: {
      mon: "10:00-00:00",
      tue: "10:00-00:00",
      wed: "10:00-00:00",
      thu: "10:00-01:00",
      fri: "13:00-01:00",
      sat: "10:00-01:00",
      sun: "10:00-00:00",
    },
    googlePlaceId: null,
    officialUrl: "https://www.redseamall.com/",
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.6300,39.1150",
    viatorUrl: null,
    getYourGuideUrl: null,
  },
  {
    slug: "al-shafa-mountain-retreat",
    nameEn: "Al Shafa Mountain Retreat",
    nameAr: "منتجع الشفا الجبلي",
    descEn:
      "Cool highland escape above Taif at 2,500m elevation with panoramic views, wild juniper forests, fruit orchards, and cloud-wrapped hiking trails.",
    descAr:
      "ملاذ مرتفعات باردة فوق الطائف على ارتفاع 2500 متر مع مناظر بانورامية وغابات العرعر البرية وبساتين الفاكهة ومسارات المشي المغلفة بالغيوم.",
    category: "NATURE",
    lat: 21.0800,
    lng: 40.3500,
    avgDurationMins: 240,
    priceLevel: 1,
    rating: 4.5,
    reviewCount: 3400,
    tags: ["mountain", "nature", "hiking", "cool-climate", "views"],
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    heroImageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    ],
    openingHours: null,
    googlePlaceId: null,
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.0800,40.3500",
    viatorUrl: null,
    getYourGuideUrl: null,
  },
  {
    slug: "atallah-happy-land",
    nameEn: "Atallah Happy Land Theme Park",
    nameAr: "ملاهي عطاالله هابي لاند",
    descEn:
      "Jeddah's premier amusement park with roller coasters, water rides, arcade games, and family entertainment. Features a Ferris wheel with Red Sea views.",
    descAr:
      "مدينة الملاهي الأولى في جدة مع أفعوانيات وألعاب مائية وألعاب أركيد وترفيه عائلي. تتميز بعجلة فيريس مع إطلالات على البحر الأحمر.",
    category: "ENTERTAINMENT",
    lat: 21.5400,
    lng: 39.1750,
    avgDurationMins: 240,
    priceLevel: 2,
    rating: 4.1,
    reviewCount: 8500,
    tags: ["theme-park", "family", "rides", "entertainment", "fun"],
    imageUrl: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800",
    heroImageUrl: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800",
    ],
    openingHours: null,
    googlePlaceId: null,
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.5400,39.1750",
    viatorUrl: null,
    getYourGuideUrl: null,
  },
  {
    slug: "desert-designs-gallery",
    nameEn: "Desert Designs Contemporary Art Gallery",
    nameAr: "معرض تصاميم الصحراء للفن المعاصر",
    descEn:
      "Leading Jeddah gallery showcasing contemporary Saudi and Arab art. Features rotating exhibitions, artist talks, and a curated shop with art books and prints.",
    descAr:
      "معرض رائد في جدة يعرض الفن السعودي والعربي المعاصر. يضم معارض متجددة وحوارات مع الفنانين ومتجر منسق بكتب ومطبوعات فنية.",
    category: "CULTURAL",
    lat: 21.5850,
    lng: 39.1600,
    avgDurationMins: 90,
    priceLevel: 1,
    rating: 4.3,
    reviewCount: 1200,
    tags: ["art", "gallery", "contemporary", "culture", "exhibition"],
    imageUrl: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800",
    heroImageUrl: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800",
    ],
    openingHours: null,
    googlePlaceId: null,
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.5850,39.1600",
    viatorUrl: null,
    getYourGuideUrl: null,
  },
  {
    slug: "taif-saiysad-national-park",
    nameEn: "Taif Saiysad National Park",
    nameAr: "منتزه السيسد الوطني بالطائف",
    descEn:
      "Protected highland park near Taif with natural rock formations, baboon colonies, and scenic picnic spots surrounded by acacia and juniper trees.",
    descAr:
      "منتزه مرتفعات محمي بالقرب من الطائف مع تشكيلات صخرية طبيعية ومستعمرات القرود ومناطق نزهة ذات مناظر خلابة محاطة بأشجار السنط والعرعر.",
    category: "NATURE",
    lat: 21.2700,
    lng: 40.4900,
    avgDurationMins: 180,
    priceLevel: 1,
    rating: 4.2,
    reviewCount: 2600,
    tags: ["nature", "park", "wildlife", "hiking", "baboons"],
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
    heroImageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
    ],
    openingHours: null,
    googlePlaceId: null,
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.2700,40.4900",
    viatorUrl: null,
    getYourGuideUrl: null,
  },
  {
    slug: "taif-heritage-village",
    nameEn: "Taif Heritage Village (Bin Abbas Museum)",
    nameAr: "القرية التراثية بالطائف (متحف بن عباس)",
    descEn:
      "Private heritage museum displaying thousands of artifacts from the Taif region including ancient tools, manuscripts, traditional clothing, and old photographs spanning centuries.",
    descAr:
      "متحف تراثي خاص يعرض آلاف القطع الأثرية من منطقة الطائف بما في ذلك أدوات قديمة ومخطوطات وملابس تقليدية وصور فوتوغرافية قديمة تمتد عبر قرون.",
    category: "CULTURAL",
    lat: 21.2830,
    lng: 40.4200,
    avgDurationMins: 90,
    priceLevel: 1,
    rating: 4.4,
    reviewCount: 1900,
    tags: ["museum", "heritage", "history", "artifacts", "culture"],
    imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800",
    heroImageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1920",
    imageUrls: [
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800",
    ],
    openingHours: null,
    googlePlaceId: null,
    officialUrl: null,
    tripAdvisorUrl: null,
    googleMapsUrl: "https://maps.google.com/?q=21.2830,40.4200",
    viatorUrl: null,
    getYourGuideUrl: null,
  },
];
