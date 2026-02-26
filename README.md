<div align="center">

# 🕌 Saudi Trip Planner

**AI-powered travel itinerary generator for Saudi Arabia**

Plan personalized trips across all 13 regions — with day-by-day schedules, bilingual support (EN/AR), and transparent SAR cost breakdowns.

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## ✨ Features

- **🗺️ Smart Itinerary Generation** — Algorithmically builds day-by-day travel plans based on interests, budget, pace, and party size
- **💰 Transparent Cost Breakdown** — Itemized SAR pricing with editable line items across 8 categories (lodging, transport, food, activities, etc.)
- **🌍 Bilingual (EN/AR)** — Full Arabic and English support with RTL layout, powered by i18next with browser language detection
- **🎨 6 Visual Themes** — 3 color palettes (Desert Sand, Royal Green, Desert Sunset) × 2 modes (light/dark)
- **📍 250+ Destinations** — Curated places across all 13 Saudi regions with ratings, tags, and platform links
- **🔗 Multi-Platform Links** — Direct links to Google Maps, TripAdvisor, Viator, GetYourGuide, Klook, Booking.com, and more
- **💾 Save & Share** — Save itineraries with shareable token links
- **🗺️ Google Maps Export** — Export full itineraries as Google Maps directions
- **🔌 Pluggable Provider System** — Extensible adapter pattern for external data sources (Google Places API, TripAdvisor, Booking.com)
- **📱 Fully Responsive** — Mobile-first design with glass morphism navbar and scroll-reveal animations

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     React Frontend                        │
│   Vite 6 · React 18 · TypeScript · Tailwind CSS 3       │
│   Zustand · TanStack Query · React Router · i18next     │
│   3 Themes × 2 Modes · React Hook Form + Zod            │
├──────────────────────────────────────────────────────────┤
│                   Express API Server                      │
│   Zod Validation · Helmet · CORS · Rate Limiting         │
├───────────────┬──────────────────────────────────────────┤
│   Provider    │  🔍 Google Places API (real search)      │
│   Registry    │  🔗 TripAdvisor (link builder)           │
│   (Pluggable) │  🔗 Booking.com (link builder)           │
│               │  ➕ Extensible for new providers          │
├───────────────┴──────────────────────────────────────────┤
│               PostgreSQL 16 + Prisma ORM                  │
│   13 Regions · 250+ Destinations · 9 Models · 6 Enums   │
│   Itineraries · Cost Breakdowns · Saved Trips            │
└──────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+
- **Docker** (for PostgreSQL) — or a local PostgreSQL 14+ instance
- **Google Places API key** *(optional — app works fully without it)*

### Option A: One-Command Setup (Windows)

```bash
# Double-click run.bat or:
.\run.bat
```

This automatically installs dependencies, sets up the database, seeds data, builds the frontend, and starts the server.

### Option B: Manual Setup

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/saudi-trip-planner.git
cd saudi-trip-planner

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Edit .env — update DATABASE_URL if needed

# 4. Start PostgreSQL (via Docker)
docker compose up -d db

# 5. Set up the database
npx prisma generate
npx prisma migrate deploy
npm run db:seed        # Seeds 13 regions, 250+ destinations, 15 hero slides

# 6. Start development servers
npm run dev            # Starts API (port 3001) + Client (port 5173)
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### Option C: Full Docker Setup

```bash
docker compose up -d
# App available at http://localhost:3001 (includes built frontend)
```

---

## 📁 Project Structure

```
saudi-trip-planner/
├── prisma/
│   ├── schema.prisma              # 9 models, 6 enums
│   ├── migrations/                # PostgreSQL migrations
│   └── seed/
│       ├── index.ts               # Seed orchestrator
│       ├── regions.ts             # 13 Saudi regions
│       ├── hero-slides.ts         # Homepage slideshow data
│       └── destinations/          # 250+ destinations across 13 regions
│           ├── riyadh.ts
│           ├── makkah.ts
│           ├── madinah.ts
│           └── ... (13 region files)
│
├── server/
│   ├── index.ts                   # Express entry — middleware + routes + static serving
│   ├── lib/
│   │   ├── prisma.ts              # Prisma singleton client
│   │   └── cache.ts               # In-memory cache (NodeCache, configurable TTL)
│   ├── providers/
│   │   ├── types.ts               # PlaceProvider interface
│   │   ├── registry.ts            # Provider registry (singleton)
│   │   ├── google-places.ts       # Google Places API adapter
│   │   ├── tripadvisor-link.ts    # TripAdvisor link builder
│   │   └── booking-link.ts        # Booking.com link builder
│   ├── services/
│   │   ├── itinerary-engine.ts    # Smart itinerary generation algorithm
│   │   └── costing-engine.ts      # SAR cost estimation engine
│   └── routes/
│       ├── regions.ts             # GET /api/regions
│       ├── destinations.ts        # GET /api/destinations
│       ├── trips.ts               # POST generate, GET fetch, PATCH edit costs
│       ├── places.ts              # Provider-proxied place search
│       └── hero-slides.ts         # GET /api/hero-slides
│
├── src/
│   ├── main.tsx                   # React entry point
│   ├── App.tsx                    # Router configuration
│   ├── index.css                  # Theme CSS variables + Tailwind directives
│   ├── i18n/
│   │   ├── config.ts              # i18next setup
│   │   └── locales/
│   │       ├── en.json            # English translations
│   │       └── ar.json            # Arabic translations
│   ├── types/api.ts               # Shared TypeScript interfaces
│   ├── lib/
│   │   ├── api.ts                 # Axios client (base URL + React Query config)
│   │   └── cn.ts                  # clsx + tailwind-merge utility
│   ├── stores/
│   │   ├── tripStore.ts           # Zustand — trip form + generated trip state
│   │   └── themeStore.ts          # Zustand — theme + dark mode (persisted)
│   ├── providers/
│   │   └── ThemeProvider.tsx      # Applies theme/dark classes to <html>
│   ├── hooks/
│   │   └── useLocalizedField.ts   # Returns EN or AR field based on language
│   ├── components/
│   │   ├── ui/                    # Button, Card, Badge, Input, Select
│   │   ├── layout/                # Navbar (glass morphism), Footer, Layout
│   │   ├── theme/                 # ThemeSwitcher (3 themes × light/dark)
│   │   ├── itinerary/             # DayCard (timeline with timed stops)
│   │   └── budget/                # CostBreakdownPanel (editable line items)
│   └── pages/
│       ├── HomePage.tsx           # Hero slideshow, features, regions, stats
│       ├── PlannerPage.tsx        # 5-step trip wizard with Zod validation
│       ├── ItineraryPage.tsx      # Day-by-day itinerary + cost breakdown
│       └── ExplorePage.tsx        # Destination catalog with filters
│
├── tests/
│   ├── unit/costing-engine.test.ts
│   └── e2e/                       # Playwright e2e tests
│
├── docker-compose.yml             # PostgreSQL + App + Seed containers
├── Dockerfile                     # Multi-stage production build
├── .env.example                   # Environment variable template
├── vite.config.ts                 # Vite config with /api proxy
├── tailwind.config.ts             # Custom Saudi-inspired color palettes
├── tsconfig.json                  # TypeScript config
└── vitest.config.ts               # Test configuration
```

---

## 🧠 How It Works

### Itinerary Generation Algorithm

The engine in `server/services/itinerary-engine.ts` builds itineraries through a multi-step pipeline:

1. **Region Ordering** — Uses haversine distance to cluster the nearest regions to the starting city, allocating ~2 days per region
2. **Destination Scoring** — Ranks destinations by:
   - Interest-tag overlap (+2 per matched tag)
   - Budget fit (+1 for budget-friendly options when budget is tight)
   - Event bonuses (+1 for festivals/events)
3. **Pace-Aware Scheduling** — Fills each day based on selected pace:
   | Pace | Stops/Day | Active Hours |
   |------|-----------|-------------|
   | Relaxed | 3 | 10:00 – 18:00 |
   | Moderate | 5 | 09:00 – 20:00 |
   | Packed | 7 | 08:00 – 22:00 |
4. **Bilingual Notes** — Generates "why it fits" explanations in both EN and AR from matched interest tags
5. **Deduplication** — Tracks used destinations across all days to avoid repeats

### Cost Estimation Engine

The engine in `server/services/costing-engine.ts` uses Saudi-specific 2024–2025 rate tables:

| Category | Budget | Mid-Range | Luxury |
|----------|--------|-----------|--------|
| 🏨 Hotel / night | 250 SAR | 550 SAR | 1,500 SAR |
| 🚗 Transport / day | 50 SAR (public) | 150 SAR (mix) | 600 SAR (private driver) |
| 🍽️ Food / person / day | 80 SAR | 150 SAR | 350 SAR |
| 🎟️ Activities | Per-category × price-level matrix | | |
| 📦 Misc buffer | +10% of subtotal | +10% | +10% |

Outputs: `totalSar`, `perPersonSar`, itemized `CostLineItem[]` (editable), and assumption explanations.

---

## 🗄️ Data Model

| Model | Purpose |
|-------|---------|
| **Region** | 13 Saudi regions with EN/AR names, coordinates, hero images |
| **Destination** | 250+ POIs with categories, tags, ratings, price levels, 11 platform URLs |
| **HeroSlide** | Homepage cinematic slideshow slides |
| **Trip** | User trip preferences (dates, budget, interests, pace, party size) |
| **ItineraryDay** | Day container with date, region assignment |
| **ItineraryItem** | Timed stop with title, notes, category, estimated cost |
| **SavedItinerary** | Saved trip with unique share token |
| **CostBreakdown** | Trip totals (total + per-person SAR) with assumptions |
| **CostItem** | Editable line item (category, label, amount, notes) |

**Enums:** `DestinationCategory` (12 types), `TripPace` (3 levels), `AccommodationTier` (3 tiers), `TransportPref` (4 modes), `CostCategory` (8 categories)

---

## 🌐 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/regions` | List all regions with destination counts |
| `GET` | `/api/regions/:slug` | Region details + all destinations |
| `GET` | `/api/destinations` | Filter: `?region=`, `?category=`, `?tags=` |
| `GET` | `/api/destinations/:slug` | Single destination with region |
| `GET` | `/api/hero-slides` | Active hero slides (sorted) |
| `POST` | `/api/trips` | Generate itinerary + cost breakdown |
| `GET` | `/api/trips/:id` | Fetch trip with full itinerary |
| `PATCH` | `/api/trips/:id/costs/:costItemId` | Edit a cost line item |
| `POST` | `/api/trips/:id/save` | Save itinerary + generate share token |
| `GET` | `/api/trips/saved/:token` | Fetch trip by share token |
| `GET` | `/api/trips/:id/export/google-maps` | Export as Google Maps directions URL |
| `GET` | `/api/places/search` | Search: `?q=&provider=&lat=&lng=` |
| `GET` | `/api/places/details/:placeId` | Place details via provider |
| `GET` | `/api/places/providers` | List providers + availability |

---

## 🎨 Theme System

**3 color themes × 2 modes = 6 visual combinations:**

| Theme | Inspiration | Colors |
|-------|-------------|--------|
| 🏜️ **Desert Sand** *(default)* | Golden dunes, warm tones | Amber, gold, earth |
| 🟢 **Royal Green** | Saudi flag, national identity | Emerald, forest, gold |
| 🌅 **Desert Sunset** | Orange-red desert twilight | Burnt orange, crimson |

- Toggle light/dark mode with the sun/moon button
- Select theme from the color swatch picker
- Preference persisted to `localStorage`
- CSS custom properties + Tailwind `darkMode: "class"` + `data-theme` attribute

---

## 🌍 Internationalization

| Feature | Implementation |
|---------|---------------|
| Languages | English (LTR) + Arabic (RTL) |
| Detection | Browser language → localStorage cache |
| Toggle | Navbar language switch (instant, no reload) |
| DB Content | Dual columns (`nameEn` / `nameAr`) |
| UI Text | Translation keys via `t()` function |
| RTL | Auto `dir="rtl"` + `lang="ar"` on `<html>` |

---

## 🔌 Provider System

Pluggable adapter pattern — add new data sources without touching existing code:

```typescript
interface PlaceProvider {
  readonly name: string;
  readonly type: "api" | "link-only" | "manual";
  search?(params: PlaceSearchParams): Promise<PlaceDetails[]>;
  getDetails?(placeId: string): Promise<PlaceDetails | null>;
  buildUrl?(params: Record<string, string>): string;
  isAvailable(): Promise<boolean>;
}
```

| Provider | Type | Description |
|----------|------|-------------|
| Google Places | `api` | Real search + details via official API |
| TripAdvisor | `link-only` | URL builder (no scraping) |
| Booking.com | `link-only` | URL builder with affiliate support |

**Adding a new provider:**
1. Create `server/providers/my-provider.ts` implementing `PlaceProvider`
2. Register in `server/providers/registry.ts`
3. Available immediately via `/api/places/search?provider=my-provider`

---

## ⚙️ Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | — | PostgreSQL connection string |
| `PORT` | `3001` | API server port |
| `NODE_ENV` | `development` | Environment mode |
| `CORS_ORIGIN` | `http://localhost:5173` | Allowed CORS origin |
| `GOOGLE_PLACES_API_KEY` | — | *(Optional)* Google Places API key |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |
| `CACHE_TTL_PLACES` | `3600` | Place cache TTL (seconds) |
| `CACHE_TTL_ITINERARY` | `1800` | Itinerary cache TTL (seconds) |
| `BOOKING_AFFILIATE_ID` | — | *(Optional)* Booking.com affiliate ID |

---

## 🧪 Testing

```bash
# Unit tests (Vitest)
npm test

# Watch mode
npm run test:watch

# E2E tests (Playwright)
npm run test:e2e

# Type checking
npm run typecheck
```

---

## 📦 NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start API + client in dev mode (hot reload) |
| `npm run build` | TypeScript compile + Vite production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint check |
| `npm test` | Run unit tests |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:migrate` | Run dev migrations |
| `npm run db:seed` | Seed database with destinations |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:reset` | Reset database + re-seed |

---

## 🐳 Docker

### Development (database only)

```bash
docker compose up -d db
```

### Production (full stack)

```bash
docker compose up -d
# PostgreSQL + App (with migrations + seed) on port 3001
```

The multi-stage Dockerfile produces a minimal Node 20 Alpine image with only production dependencies.

---

## 🛡️ Security

- **Helmet** — HTTP security headers
- **CORS** — Configurable origin whitelist
- **Rate Limiting** — Configurable request throttling
- **Zod Validation** — All API inputs validated with strict schemas
- **Prisma** — Parameterized queries (SQL injection safe)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to your branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for Saudi Arabia**

*Discover the Kingdom — from the ancient ruins of Al-Ula to the coral reefs of the Red Sea*

</div>
